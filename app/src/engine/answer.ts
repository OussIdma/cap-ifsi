/**
 * Lecture des réponses saisies et correction déterministe.
 *
 * Principes tenus ici :
 *  - aucune réponse n'est jugée par un modèle de langage ; tout passe par des
 *    comparaisons exactes sur des rationnels ;
 *  - la virgule et le point sont acceptés quand ils ne sont pas ambigus ;
 *  - une valeur juste dans une mauvaise unité n'est pas une réponse juste ;
 *  - un diagnostic d'erreur n'est proposé que s'il est identifiable. Sinon on
 *    propose des étapes à vérifier.
 */

import {
  absR,
  addR,
  cmpR,
  divR,
  eqR,
  fromDecimalString,
  isIntegerR,
  mulR,
  rat,
  roundR,
  subR,
  toFrench,
  toFractionString,
  type Rational,
  ZERO,
} from './rational'
import { convert, parseUnit, sameQuantity, unitBySymbol, type UnitDef } from './units'

// ---------------------------------------------------------------------------
// Catégories d'erreur du carnet d'erreurs
// ---------------------------------------------------------------------------

export type ErrorTag =
  | 'consigne'
  | 'raisonnement'
  | 'operation'
  | 'virgule'
  | 'unite'
  | 'arrondi'
  | 'format'
  | 'redaction'
  | 'temps'
  | 'inconnu'

export const ERROR_LABELS: Record<ErrorTag, string> = {
  consigne: 'Lecture de la consigne',
  raisonnement: 'Choix du raisonnement',
  operation: 'Opération',
  virgule: 'Virgule et valeur de position',
  unite: 'Unité',
  arrondi: 'Arrondi',
  format: 'Format de la réponse',
  redaction: 'Rédaction',
  temps: 'Gestion du temps',
  inconnu: 'Cause à identifier',
}

// ---------------------------------------------------------------------------
// Description de la réponse attendue
// ---------------------------------------------------------------------------

/** Une réponse fausse fréquente, déclarée par l'auteur de l'exercice. */
export type Pitfall = {
  /** Valeur fausse, écrite comme l'utilisatrice l'écrirait (ex. « 4,17 » ou « 75 g »). */
  readonly answer: string
  readonly tag: ErrorTag
  /** Ce qui s'est probablement passé, en français simple. */
  readonly why: string
}

export type Rounding = {
  readonly places: number
  /** Consigne telle qu'elle apparaît dans l'énoncé. */
  readonly label: string
}

export type NumericSpec = {
  readonly kind: 'numeric'
  readonly value: Rational
  /** Symbole canonique de l'unité attendue. Absent : nombre sans unité. */
  readonly unit?: string
  /**
   * `required`    : l'unité attendue doit être écrite telle quelle.
   * `equivalent`  : toute unité de la même grandeur est acceptée après conversion.
   * `optional`    : l'unité peut être omise ; si elle est écrite elle doit être juste.
   */
  readonly unitPolicy?: 'required' | 'equivalent' | 'optional'
  readonly rounding?: Rounding
  readonly acceptFraction?: boolean
  readonly requireInteger?: boolean
  readonly pitfalls?: readonly Pitfall[]
}

export type FractionSpec = {
  readonly kind: 'fraction'
  readonly value: Rational
  readonly requireIrreducible?: boolean
  readonly acceptDecimal?: boolean
  readonly pitfalls?: readonly Pitfall[]
}

/** Durée : la valeur de référence est toujours en minutes. */
export type DurationSpec = {
  readonly kind: 'duration'
  readonly minutes: Rational
  /** Écriture demandée par la consigne. */
  readonly display: 'hm' | 'decimal-h' | 'min'
  readonly pitfalls?: readonly Pitfall[]
}

/** Heure de la journée, en minutes depuis minuit (0 à 1439). */
export type ClockSpec = {
  readonly kind: 'clock'
  readonly minutesOfDay: number
  readonly pitfalls?: readonly Pitfall[]
}

export type TextSpec = {
  readonly kind: 'text'
  /** Réponses acceptées (comparaison souple : casse, accents, ponctuation ignorées). */
  readonly accept: readonly string[]
  readonly pitfalls?: readonly Pitfall[]
}

export type ChoiceOption = {
  readonly id: string
  readonly label: string
  /** Pourquoi cette option est juste ou fausse — affiché après réponse. */
  readonly feedback?: string
  readonly tag?: ErrorTag
}

export type ChoiceSpec = {
  readonly kind: 'choice'
  readonly options: readonly ChoiceOption[]
  readonly correct: readonly string[]
  readonly multiple?: boolean
}

export type OrderSpec = {
  readonly kind: 'order'
  readonly items: readonly { id: string; label: string }[]
  readonly correct: readonly string[]
}

export type AnswerSpec =
  | NumericSpec
  | FractionSpec
  | DurationSpec
  | ClockSpec
  | TextSpec
  | ChoiceSpec
  | OrderSpec

// ---------------------------------------------------------------------------
// Résultat de correction
// ---------------------------------------------------------------------------

export type Verdict = {
  readonly correct: boolean
  /** Statut fin, utilisé pour le message et le carnet d'erreurs. */
  readonly status:
    | 'juste'
    | 'juste-autre-unite'
    | 'juste-autre-ecriture'
    | 'unite-fausse'
    | 'format-refuse'
    | 'arrondi'
    | 'faux'
    | 'vide'
    | 'illisible'
  readonly tag?: ErrorTag
  /** Phrase affichée sous la réponse. Toujours factuelle. */
  readonly message: string
  /** Étapes à vérifier, quand la cause n'est pas identifiable. */
  readonly checklist?: readonly string[]
  /** Réponse attendue mise en forme. */
  readonly expected: string
}

// ---------------------------------------------------------------------------
// Lecture d'un nombre saisi
// ---------------------------------------------------------------------------

export type ParsedNumber = {
  readonly value: Rational
  readonly unit?: UnitDef
  readonly unitText?: string
  readonly writtenAsFraction: boolean
  /** Nombre de décimales réellement écrites (pour juger un arrondi demandé). */
  readonly writtenPlaces: number
}

const SPACES = /[\s   ']/g

export class ParseError extends Error {
  constructor(
    message: string,
    readonly tag: ErrorTag = 'format',
  ) {
    super(message)
  }
}

/** Sépare la partie numérique de la partie unité d'une saisie. */
function splitNumberAndUnit(raw: string): { num: string; unit: string } {
  const s = raw.trim()
  // On avance tant que le caractère peut appartenir au nombre.
  let i = 0
  while (i < s.length && /[0-9+\-.,/\s   ']/.test(s[i]!)) i++
  // Un espace final appartient à la séparation, pas au nombre.
  return { num: s.slice(0, i).trim(), unit: s.slice(i).trim() }
}

/**
 * Lit un nombre écrit en français ou en notation anglaise quand il n'y a pas
 * d'ambiguïté. Lève une ParseError explicite sinon.
 */
export function parseNumberText(raw: string): { value: Rational; writtenAsFraction: boolean; writtenPlaces: number } {
  // Le signe moins typographique (U+2212) est accepté comme un moins ordinaire.
  let s = raw.replace(/\u2212/g, '-').replace(SPACES, '')
  if (!s) throw new ParseError('Aucun nombre saisi.')

  // Fraction a/b
  const frac = /^([+-]?\d+(?:[.,]\d+)?)\/(\d+(?:[.,]\d+)?)$/.exec(s)
  if (frac) {
    const a = parseSimpleDecimal(frac[1]!)
    const b = parseSimpleDecimal(frac[2]!)
    if (b.value.n === 0n) throw new ParseError('Le dénominateur ne peut pas être zéro.')
    return { value: divR(a.value, b.value), writtenAsFraction: true, writtenPlaces: 0 }
  }

  const hasComma = s.includes(',')
  const hasDot = s.includes('.')
  if (hasComma && hasDot) {
    throw new ParseError(
      "Écriture ambiguë : il y a à la fois une virgule et un point. Écrivez le nombre avec un seul séparateur décimal, par exemple 1,5.",
    )
  }
  const sep = hasComma ? ',' : hasDot ? '.' : ''
  if (sep) {
    const count = s.split(sep).length - 1
    if (count > 1) {
      throw new ParseError(
        `Écriture ambiguë : il y a ${count} séparateurs « ${sep} ». Écrivez un seul séparateur décimal.`,
      )
    }
  }
  const r = parseSimpleDecimal(s)
  return { value: r.value, writtenAsFraction: false, writtenPlaces: r.places }
}

function parseSimpleDecimal(s: string): { value: Rational; places: number } {
  const t = s.replace(',', '.')
  if (!/^[+-]?(\d+(\.\d*)?|\.\d+)$/.test(t)) {
    throw new ParseError(`« ${s} » n'est pas un nombre lisible.`)
  }
  // Les zeros finaux n'ajoutent pas de precision : 4,1700 vaut 4,17.
  const dot = t.indexOf('.')
  const frac = dot === -1 ? '' : t.slice(dot + 1).replace(/0+$/, '')
  return { value: fromDecimalString(t), places: frac.length }
}

/** Lit « 75 mg », « 0,075 g », « 1 750 mL », « 12 » … */
export function parseQuantity(raw: string): ParsedNumber {
  const { num, unit } = splitNumberAndUnit(raw)
  const parsed = parseNumberText(num)
  if (!unit) {
    return { ...parsed }
  }
  const u = parseUnit(unit)
  if (!u) {
    return { ...parsed, unitText: unit }
  }
  return { ...parsed, unit: u, unitText: unit }
}

// ---------------------------------------------------------------------------
// Durées
// ---------------------------------------------------------------------------

/**
 * Lit une durée et la renvoie en minutes.
 * Accepte : « 1h30 », « 1 h 30 », « 1 h 30 min », « 95 min », « 1,5 h », « 90 ».
 * `defaultUnit` sert quand seul un nombre est écrit.
 */
export function parseDurationMinutes(
  raw: string,
  defaultUnit: 'h' | 'min',
): { minutes: Rational; form: 'hm' | 'decimal-h' | 'min' | 'nu'; hours?: bigint; mins?: Rational } {
  const s = raw.replace(/[   ]/g, ' ').trim().toLowerCase()
  if (!s) throw new ParseError('Aucune durée saisie.')

  // Forme heures + minutes : 1h30, 1 h 30, 1 h 30 min, 1 heure 30 minutes
  const hm = /^(\d+)\s*(?:h|heures?)\s*(\d{1,2})?\s*(?:min|mn|minutes?)?$/.exec(s)
  if (hm) {
    const h = BigInt(hm[1]!)
    const mtxt = hm[2]
    if (mtxt === undefined) {
      return { minutes: rat(h * 60n), form: 'hm', hours: h, mins: ZERO }
    }
    const m = BigInt(mtxt)
    if (m > 59n) {
      throw new ParseError(
        `Dans une écriture heures-minutes, la partie minutes doit rester entre 0 et 59 (vous avez écrit ${m}).`,
      )
    }
    return { minutes: rat(h * 60n + m), form: 'hm', hours: h, mins: rat(m) }
  }

  // Forme décimale avec unité : 1,5 h / 90 min
  const withUnit = /^([+-]?[\d\s.,]+)\s*(h|heures?|min|mn|minutes?)$/.exec(s)
  if (withUnit) {
    const v = parseNumberText(withUnit[1]!).value
    const isHour = /^h/.test(withUnit[2]!)
    return { minutes: isHour ? mulR(v, rat(60n)) : v, form: isHour ? 'decimal-h' : 'min' }
  }

  // Nombre seul
  const v = parseNumberText(s).value
  return { minutes: defaultUnit === 'h' ? mulR(v, rat(60n)) : v, form: 'nu' }
}

/** Lit une heure de la journée : « 14h30 », « 14 h 30 », « 0 h 15 ». */
export function parseClock(raw: string): number {
  const s = raw.replace(/[   ]/g, ' ').trim().toLowerCase()
  const m = /^(\d{1,2})\s*(?:h|heures?|:)\s*(\d{1,2})?\s*(?:min|minutes?)?$/.exec(s)
  if (!m) throw new ParseError("Écrivez l'heure sous la forme 14 h 30.")
  const h = Number(m[1])
  const mm = m[2] === undefined ? 0 : Number(m[2])
  if (h > 23) throw new ParseError("L'heure doit être comprise entre 0 et 23.")
  if (mm > 59) throw new ParseError('Les minutes doivent être comprises entre 0 et 59.')
  return h * 60 + mm
}

// ---------------------------------------------------------------------------
// Mise en forme des réponses attendues
// ---------------------------------------------------------------------------

export function formatMinutesAsHM(minutes: Rational): string {
  const neg = minutes.n < 0n
  const abs = absR(minutes)
  const total = abs.d === 1n ? abs.n : null
  if (total === null) {
    // Durée non entière en minutes : on affiche les minutes décimales.
    return `${toFrench(minutes)} min`
  }
  const h = total / 60n
  const m = total % 60n
  const body = h === 0n ? `${m} min` : m === 0n ? `${h} h` : `${h} h ${m.toString().padStart(2, '0')}`
  return (neg ? '−' : '') + body
}

export function formatClock(minutesOfDay: number): string {
  const h = Math.floor(minutesOfDay / 60) % 24
  const m = minutesOfDay % 60
  return `${h} h ${String(m).padStart(2, '0')}`
}

export function formatExpected(spec: AnswerSpec): string {
  switch (spec.kind) {
    case 'numeric': {
      const u = spec.unit ? ` ${spec.unit}` : ''
      return `${toFrench(spec.value)}${u}`
    }
    case 'fraction':
      return toFractionString(spec.value)
    case 'duration':
      return spec.display === 'hm'
        ? formatMinutesAsHM(spec.minutes)
        : spec.display === 'decimal-h'
          ? `${toFrench(divR(spec.minutes, rat(60n)))} h`
          : `${toFrench(spec.minutes)} min`
    case 'clock':
      return formatClock(spec.minutesOfDay)
    case 'text':
      return spec.accept[0] ?? ''
    case 'choice':
      return spec.options
        .filter((o) => spec.correct.includes(o.id))
        .map((o) => o.label)
        .join(' · ')
    case 'order':
      return spec.correct
        .map((id) => spec.items.find((i) => i.id === id)?.label ?? id)
        .join(' → ')
  }
}

// ---------------------------------------------------------------------------
// Correction
// ---------------------------------------------------------------------------

const GENERIC_CHECKLIST = [
  "Relisez la consigne : que demande-t-elle exactement, et dans quelle unité ?",
  "Vérifiez l'opération choisie : cherchez-vous un total, une part, une différence ou un nombre de paquets ?",
  "Refaites le calcul ligne par ligne, sans sauter d'étape.",
  "Comparez votre résultat à un ordre de grandeur : est-il plausible ?",
]

function normalizeLoose(s: string): string {
  return s
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
}

/** Cherche une réponse fausse déclarée par l'auteur. */
function matchPitfall(pitfalls: readonly Pitfall[] | undefined, raw: string): Pitfall | undefined {
  if (!pitfalls?.length) return undefined
  const target = normalizeLoose(raw)
  for (const p of pitfalls) {
    if (normalizeLoose(p.answer) === target) return p
    // Comparaison numérique quand les deux côtés sont lisibles.
    try {
      const a = parseQuantity(raw)
      const b = parseQuantity(p.answer)
      const sameUnit =
        (!a.unit && !b.unit) || (a.unit && b.unit && a.unit.symbol === b.unit.symbol)
      if (sameUnit && eqR(a.value, b.value)) return p
    } catch {
      /* comparaison textuelle seule */
    }
  }
  return undefined
}

/** Le nombre saisi est-il la bonne valeur décalée d'une puissance de 10 ? */
function powerOfTenShift(given: Rational, expected: Rational): number | null {
  if (expected.n === 0n || given.n === 0n) return null
  const ratio = divR(given, expected)
  for (const k of [-6, -5, -4, -3, -2, -1, 1, 2, 3, 4, 5, 6]) {
    if (eqR(ratio, rat(10n ** BigInt(Math.abs(k)), 1n)) && k > 0) return k
    if (eqR(ratio, rat(1n, 10n ** BigInt(Math.abs(k)))) && k < 0) return k
  }
  return null
}

function gradeNumeric(spec: NumericSpec, raw: string): Verdict {
  const expected = formatExpected(spec)
  const trimmed = raw.trim()
  if (!trimmed) {
    return { correct: false, status: 'vide', message: 'Aucune réponse saisie.', expected }
  }

  const pit = matchPitfall(spec.pitfalls, trimmed)

  let parsed: ParsedNumber
  try {
    parsed = parseQuantity(trimmed)
  } catch (e) {
    const err = e as ParseError
    return {
      correct: false,
      status: 'illisible',
      tag: err.tag ?? 'format',
      message: err.message,
      expected,
    }
  }

  const wantUnit = spec.unit ? unitBySymbol(spec.unit) : undefined
  const policy = spec.unitPolicy ?? (spec.unit ? 'equivalent' : 'optional')

  // 1. Unité écrite mais inconnue du moteur.
  if (parsed.unitText && !parsed.unit) {
    return {
      correct: false,
      status: 'format-refuse',
      tag: 'format',
      message: `L'unité « ${parsed.unitText} » n'est pas reconnue. Écrivez par exemple 75 mg, 1,5 L ou 2,40 €.`,
      expected,
    }
  }

  // 2. Unité d'une autre grandeur : c'est une erreur de lecture de la consigne.
  if (parsed.unit && wantUnit && !sameQuantity(parsed.unit, wantUnit)) {
    return {
      correct: false,
      status: 'unite-fausse',
      tag: 'consigne',
      message: `La question attend ${describeQuantity(wantUnit)}, or « ${parsed.unit.symbol} » mesure ${describeQuantity(parsed.unit)}.`,
      expected,
    }
  }

  // 3. Valeur ramenée dans l'unité attendue.
  let valueInExpectedUnit = parsed.value
  if (parsed.unit && wantUnit) {
    valueInExpectedUnit = convert(parsed.value, parsed.unit, wantUnit)
  }

  const exact = eqR(valueInExpectedUnit, spec.value)

  // 4. Unité manquante alors qu'elle est exigée.
  if (exact && wantUnit && policy === 'required' && !parsed.unit) {
    return {
      correct: false,
      status: 'format-refuse',
      tag: 'unite',
      message: `La valeur est juste, mais la consigne demande de préciser l'unité : ${spec.unit}.`,
      expected,
    }
  }

  // 5. Unité différente mais équivalente.
  if (exact && wantUnit && parsed.unit && parsed.unit.symbol !== wantUnit.symbol) {
    if (policy === 'required') {
      return {
        correct: false,
        status: 'unite-fausse',
        tag: 'unite',
        message: `${toFrench(parsed.value)} ${parsed.unit.symbol} vaut bien la même quantité, mais la consigne demande la réponse en ${wantUnit.symbol} : ${expected}.`,
        expected,
      }
    }
    return {
      correct: true,
      status: 'juste-autre-unite',
      message: `Juste. ${toFrench(parsed.value)} ${parsed.unit.symbol} et ${expected} désignent la même quantité.`,
      expected,
    }
  }

  // 6. Arrondi demande : la valeur attendue est deja arrondie.
  //    Une reponse non arrondie n'est pas conforme a la consigne, meme si le
  //    calcul est juste : on le dit sans la traiter comme une erreur de calcul.
  if (spec.rounding && !exact && !parsed.writtenAsFraction) {
    if (eqR(roundR(valueInExpectedUnit, spec.rounding.places), spec.value)) {
      return {
        correct: false,
        status: 'arrondi',
        tag: 'arrondi',
        message: `Votre calcul est bon, mais la consigne demande ${spec.rounding.label}. Reponse attendue : ${expected}.`,
        expected,
      }
    }
  }

  if (exact) {
    if (spec.requireInteger && !isIntegerR(valueInExpectedUnit)) {
      return {
        correct: false,
        status: 'format-refuse',
        tag: 'format',
        message: 'La consigne attend un nombre entier.',
        expected,
      }
    }
    if (parsed.writtenAsFraction && spec.acceptFraction === false) {
      return {
        correct: false,
        status: 'format-refuse',
        tag: 'format',
        message: "La consigne attend une écriture décimale, pas une fraction.",
        expected,
      }
    }
    return {
      correct: true,
      status: parsed.writtenAsFraction ? 'juste-autre-ecriture' : 'juste',
      message: 'Juste.',
      expected,
    }
  }

  // 7. Non exact : la valeur brute est-elle juste mais dans la mauvaise unité ?
  if (wantUnit && parsed.unit && eqR(parsed.value, spec.value) && parsed.unit.symbol !== wantUnit.symbol) {
    return {
      correct: false,
      status: 'unite-fausse',
      tag: 'unite',
      message: `Le nombre est juste, mais l'unité ne l'est pas : ${toFrench(parsed.value)} ${parsed.unit.symbol} ne vaut pas ${expected}. Reprenez la conversion.`,
      expected,
    }
  }

  // 8. Faute déclarée par l'auteur.
  if (pit) {
    return {
      correct: false,
      status: 'faux',
      tag: pit.tag,
      message: pit.why,
      expected,
    }
  }

  // 9. Décalage d'une puissance de dix : erreur de virgule ou de conversion.
  const shift = powerOfTenShift(valueInExpectedUnit, spec.value)
  if (shift !== null) {
    const factor = 10 ** Math.abs(shift)
    const sens = shift > 0 ? `${factor} fois trop grand` : `${factor} fois trop petit`
    return {
      correct: false,
      status: 'faux',
      tag: 'virgule',
      message: `Votre résultat est ${sens}. C'est une erreur de virgule ou de conversion : recomptez les rangs entre les deux unités, ou replacez la virgule.`,
      expected,
    }
  }

  // 10. Arrondi trop tôt : la valeur arrondie de l'attendu correspond.
  for (const places of [0, 1, 2, 3]) {
    if (eqR(valueInExpectedUnit, roundR(spec.value, places)) && !eqR(spec.value, roundR(spec.value, places))) {
      return {
        correct: false,
        status: 'arrondi',
        tag: 'arrondi',
        message: `Vous avez arrondi le résultat, alors que la consigne attend ${expected}. Gardez toutes les décimales jusqu'à la fin du calcul.`,
        expected,
      }
    }
  }

  // 11. Écart très faible : arrondi intermédiaire probable.
  const gap = absR(subR(valueInExpectedUnit, spec.value))
  const reference = absR(spec.value)
  if (reference.n !== 0n && cmpR(mulR(gap, rat(100n)), reference) < 0 && gap.n !== 0n) {
    return {
      correct: false,
      status: 'faux',
      tag: 'arrondi',
      message: `Vous êtes très proche : écart de ${toFrench(gap, 4)}. Un arrondi fait trop tôt dans le calcul suffit à produire cet écart.`,
      expected,
    }
  }

  return {
    correct: false,
    status: 'faux',
    tag: 'inconnu',
    message: "La réponse ne correspond pas. La cause n'est pas identifiable automatiquement.",
    checklist: GENERIC_CHECKLIST,
    expected,
  }
}

function describeQuantity(u: UnitDef): string {
  switch (u.quantity) {
    case 'longueur':
      return 'une longueur'
    case 'masse':
      return 'une masse'
    case 'capacite':
      return 'une capacité'
    case 'duree':
      return 'une durée'
    case 'monnaie':
      return 'un prix'
    case 'aire':
      return 'une aire'
    case 'volume':
      return 'un volume'
    default:
      return 'une quantité'
  }
}

function gradeFraction(spec: FractionSpec, raw: string): Verdict {
  const expected = formatExpected(spec)
  const trimmed = raw.trim()
  if (!trimmed) return { correct: false, status: 'vide', message: 'Aucune réponse saisie.', expected }
  let parsed
  try {
    parsed = parseNumberText(trimmed)
  } catch (e) {
    const err = e as ParseError
    return { correct: false, status: 'illisible', tag: 'format', message: err.message, expected }
  }
  if (!eqR(parsed.value, spec.value)) {
    const pit = matchPitfall(spec.pitfalls, trimmed)
    if (pit) return { correct: false, status: 'faux', tag: pit.tag, message: pit.why, expected }
    return {
      correct: false,
      status: 'faux',
      tag: 'inconnu',
      message: "La fraction ne correspond pas à la valeur attendue.",
      checklist: [
        'Vérifiez ce que représente le dénominateur : en combien de parts égales le tout est-il partagé ?',
        'Vérifiez le numérateur : combien de ces parts sont concernées ?',
        'Si vous avez simplifié, refaites la simplification étape par étape.',
      ],
      expected,
    }
  }
  if (!parsed.writtenAsFraction && spec.acceptDecimal === false) {
    return {
      correct: false,
      status: 'format-refuse',
      tag: 'format',
      message: 'La consigne attend une fraction, écrite sous la forme a/b.',
      expected,
    }
  }
  return { correct: true, status: 'juste', message: 'Juste.', expected }
}

function gradeDuration(spec: DurationSpec, raw: string): Verdict {
  const expected = formatExpected(spec)
  const trimmed = raw.trim()
  if (!trimmed) return { correct: false, status: 'vide', message: 'Aucune réponse saisie.', expected }

  let parsed
  try {
    parsed = parseDurationMinutes(trimmed, spec.display === 'decimal-h' ? 'h' : spec.display === 'min' ? 'min' : 'min')
  } catch (e) {
    const err = e as ParseError
    return { correct: false, status: 'illisible', tag: 'format', message: err.message, expected }
  }

  if (eqR(parsed.minutes, spec.minutes)) {
    if (spec.display === 'decimal-h' && parsed.form === 'hm') {
      return {
        correct: false,
        status: 'format-refuse',
        tag: 'format',
        message: `C'est bien cette durée, mais la consigne demande une écriture en heures décimales : ${expected}.`,
        expected,
      }
    }
    if (spec.display === 'hm' && parsed.form === 'decimal-h') {
      return {
        correct: true,
        status: 'juste-autre-ecriture',
        message: `Juste. ${expected} et votre écriture décimale représentent la même durée.`,
        expected,
      }
    }
    return { correct: true, status: 'juste', message: 'Juste.', expected }
  }

  const pit = matchPitfall(spec.pitfalls, trimmed)
  if (pit) return { correct: false, status: 'faux', tag: pit.tag, message: pit.why, expected }

  // Confusion classique : écrire les minutes après la virgule (1 h 30 → « 1,30 h »).
  if (spec.display === 'decimal-h' && parsed.form !== 'hm') {
    const totalMin = spec.minutes
    const h = totalMin.d === 1n ? totalMin.n / 60n : null
    const m = totalMin.d === 1n ? totalMin.n % 60n : null
    if (h !== null && m !== null && m !== 0n) {
      const wrong = addR(rat(h), rat(m, 100n))
      const given = divR(parsed.minutes, rat(60n))
      if (eqR(given, wrong)) {
        return {
          correct: false,
          status: 'faux',
          tag: 'virgule',
          message: `Vous avez recopié les minutes après la virgule. Or « ,${m} » ne veut pas dire « ${m} minutes » : la partie décimale est une fraction d'heure. ${m} minutes sur 60, cela fait ${toFrench(divR(rat(m), rat(60n)), 4)} heure. La réponse est ${expected}.`,
          expected,
        }
      }
    }
  }

  const diff = subR(parsed.minutes, spec.minutes)
  if (eqR(absR(diff), rat(60n))) {
    return {
      correct: false,
      status: 'faux',
      tag: 'operation',
      message: `Il y a exactement une heure d'écart. Vérifiez le passage d'une heure à l'autre, en particulier si la durée traverse minuit.`,
      expected,
    }
  }

  return {
    correct: false,
    status: 'faux',
    tag: 'inconnu',
    message: "La durée ne correspond pas.",
    checklist: [
      'Repérez le point de départ et le point d\'arrivée.',
      'Avancez d\'abord jusqu\'à l\'heure entière suivante, puis comptez le reste.',
      'Rappel : une heure vaut 60 minutes, pas 100.',
    ],
    expected,
  }
}

function gradeClock(spec: ClockSpec, raw: string): Verdict {
  const expected = formatExpected(spec)
  const trimmed = raw.trim()
  if (!trimmed) return { correct: false, status: 'vide', message: 'Aucune réponse saisie.', expected }
  let v: number
  try {
    v = parseClock(trimmed)
  } catch (e) {
    return { correct: false, status: 'illisible', tag: 'format', message: (e as ParseError).message, expected }
  }
  if (v === spec.minutesOfDay) return { correct: true, status: 'juste', message: 'Juste.', expected }
  const pit = matchPitfall(spec.pitfalls, trimmed)
  if (pit) return { correct: false, status: 'faux', tag: pit.tag, message: pit.why, expected }
  if (Math.abs(v - spec.minutesOfDay) === 720) {
    return {
      correct: false,
      status: 'faux',
      tag: 'raisonnement',
      message: `Il y a 12 heures d'écart : vérifiez matin et après-midi. L'heure attendue est ${expected}.`,
      expected,
    }
  }
  return {
    correct: false,
    status: 'faux',
    tag: 'inconnu',
    message: "L'heure ne correspond pas.",
    checklist: [
      'Partez de l\'heure de départ et ajoutez d\'abord les heures entières.',
      'Ajoutez ensuite les minutes ; si le total dépasse 60, retenez une heure de plus.',
      'Vérifiez si vous passez minuit.',
    ],
    expected,
  }
}

function gradeText(spec: TextSpec, raw: string): Verdict {
  const expected = formatExpected(spec)
  const trimmed = raw.trim()
  if (!trimmed) return { correct: false, status: 'vide', message: 'Aucune réponse saisie.', expected }
  const t = normalizeLoose(trimmed)
  if (spec.accept.some((a) => normalizeLoose(a) === t)) {
    return { correct: true, status: 'juste', message: 'Juste.', expected }
  }
  const pit = matchPitfall(spec.pitfalls, trimmed)
  if (pit) return { correct: false, status: 'faux', tag: pit.tag, message: pit.why, expected }
  return {
    correct: false,
    status: 'faux',
    tag: 'inconnu',
    message: 'Ce n\'est pas la réponse attendue.',
    expected,
  }
}

function gradeChoice(spec: ChoiceSpec, given: readonly string[]): Verdict {
  const expected = formatExpected(spec)
  if (!given.length) return { correct: false, status: 'vide', message: 'Aucune réponse choisie.', expected }
  const want = [...spec.correct].sort().join('|')
  const got = [...given].sort().join('|')
  if (want === got) return { correct: true, status: 'juste', message: 'Juste.', expected }
  const firstWrong = given.find((id) => !spec.correct.includes(id))
  const opt = spec.options.find((o) => o.id === firstWrong)
  return {
    correct: false,
    status: 'faux',
    tag: opt?.tag ?? 'raisonnement',
    message: opt?.feedback ?? 'Ce choix ne correspond pas à la consigne.',
    expected,
  }
}

function gradeOrder(spec: OrderSpec, given: readonly string[]): Verdict {
  const expected = formatExpected(spec)
  if (given.length !== spec.items.length) {
    return { correct: false, status: 'vide', message: 'Classement incomplet.', expected }
  }
  if (given.join('|') === spec.correct.join('|')) {
    return { correct: true, status: 'juste', message: 'Juste.', expected }
  }
  const firstBad = given.findIndex((id, i) => id !== spec.correct[i])
  const label = spec.items.find((it) => it.id === given[firstBad])?.label ?? ''
  return {
    correct: false,
    status: 'faux',
    tag: 'raisonnement',
    message: `L'ordre se sépare du bon dès la position ${firstBad + 1} (« ${label} »).`,
    expected,
  }
}

/** Point d'entrée unique de la correction. */
export function grade(spec: AnswerSpec, response: string | readonly string[]): Verdict {
  switch (spec.kind) {
    case 'numeric':
      return gradeNumeric(spec, typeof response === 'string' ? response : response.join(' '))
    case 'fraction':
      return gradeFraction(spec, typeof response === 'string' ? response : response.join(' '))
    case 'duration':
      return gradeDuration(spec, typeof response === 'string' ? response : response.join(' '))
    case 'clock':
      return gradeClock(spec, typeof response === 'string' ? response : response.join(' '))
    case 'text':
      return gradeText(spec, typeof response === 'string' ? response : response.join(' '))
    case 'choice':
      return gradeChoice(spec, typeof response === 'string' ? (response ? [response] : []) : response)
    case 'order':
      return gradeOrder(spec, typeof response === 'string' ? (response ? response.split('|') : []) : response)
  }
}
