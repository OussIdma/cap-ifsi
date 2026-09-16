/**
 * Unités utilisées par les exercices de calculs.
 *
 * Chaque unité appartient à une grandeur (`quantity`) et possède un facteur
 * exact vers l'unité de référence de cette grandeur. Les facteurs sont des
 * rationnels : aucune conversion ne passe par un flottant.
 */

import { divR, mulR, rat, type Rational } from './rational'

export type Quantity =
  | 'longueur'
  | 'masse'
  | 'capacite'
  | 'duree'
  | 'monnaie'
  | 'aire'
  | 'volume'
  | 'sansUnite'
  | 'objet'

export type UnitDef = {
  /** Symbole canonique affiché. */
  readonly symbol: string
  readonly quantity: Quantity
  /** Facteur vers l'unité de référence de la grandeur. */
  readonly toBase: Rational
  /** Nom au singulier / pluriel, pour les phrases de correction. */
  readonly one: string
  readonly many: string
  /** Écritures acceptées en saisie (minuscules, sans accents). */
  readonly aliases: readonly string[]
}

const U = (
  symbol: string,
  quantity: Quantity,
  toBase: Rational,
  one: string,
  many: string,
  aliases: string[],
): UnitDef => ({ symbol, quantity, toBase, one, many, aliases })

/** Unités de référence : m, g, L, min, €, m², m³. */
export const UNITS: readonly UnitDef[] = [
  // Longueurs — référence : le mètre
  U('km', 'longueur', rat(1000n), 'kilomètre', 'kilomètres', ['km', 'kilometre', 'kilometres']),
  U('m', 'longueur', rat(1n), 'mètre', 'mètres', ['m', 'metre', 'metres']),
  U('dm', 'longueur', rat(1n, 10n), 'décimètre', 'décimètres', ['dm', 'decimetre', 'decimetres']),
  U('cm', 'longueur', rat(1n, 100n), 'centimètre', 'centimètres', ['cm', 'centimetre', 'centimetres']),
  U('mm', 'longueur', rat(1n, 1000n), 'millimètre', 'millimètres', ['mm', 'millimetre', 'millimetres']),

  // Masses — référence : le gramme
  U('t', 'masse', rat(1000000n), 'tonne', 'tonnes', ['t', 'tonne', 'tonnes']),
  U('kg', 'masse', rat(1000n), 'kilogramme', 'kilogrammes', ['kg', 'kilo', 'kilos', 'kilogramme', 'kilogrammes']),
  U('g', 'masse', rat(1n), 'gramme', 'grammes', ['g', 'gramme', 'grammes']),
  U('dg', 'masse', rat(1n, 10n), 'décigramme', 'décigrammes', ['dg', 'decigramme', 'decigrammes']),
  U('cg', 'masse', rat(1n, 100n), 'centigramme', 'centigrammes', ['cg', 'centigramme', 'centigrammes']),
  U('mg', 'masse', rat(1n, 1000n), 'milligramme', 'milligrammes', ['mg', 'milligramme', 'milligrammes']),
  U('µg', 'masse', rat(1n, 1000000n), 'microgramme', 'microgrammes', ['ug', 'µg', 'mcg', 'microgramme', 'microgrammes']),

  // Capacités — référence : le litre
  U('L', 'capacite', rat(1n), 'litre', 'litres', ['l', 'litre', 'litres']),
  U('dL', 'capacite', rat(1n, 10n), 'décilitre', 'décilitres', ['dl', 'decilitre', 'decilitres']),
  U('cL', 'capacite', rat(1n, 100n), 'centilitre', 'centilitres', ['cl', 'centilitre', 'centilitres']),
  U('mL', 'capacite', rat(1n, 1000n), 'millilitre', 'millilitres', ['ml', 'millilitre', 'millilitres']),

  // Durées — référence : la minute
  U('j', 'duree', rat(1440n), 'jour', 'jours', ['j', 'jour', 'jours']),
  U('h', 'duree', rat(60n), 'heure', 'heures', ['h', 'heure', 'heures']),
  U('min', 'duree', rat(1n), 'minute', 'minutes', ['min', 'mn', 'minute', 'minutes']),
  U('s', 'duree', rat(1n, 60n), 'seconde', 'secondes', ['s', 'sec', 'seconde', 'secondes']),

  // Monnaie — référence : l'euro
  U('€', 'monnaie', rat(1n), 'euro', 'euros', ['€', 'e', 'eur', 'euro', 'euros']),
  U('c€', 'monnaie', rat(1n, 100n), 'centime', 'centimes', ['c', 'ct', 'cts', 'centime', 'centimes']),

  // Aires — référence : le mètre carré
  U('km²', 'aire', rat(1000000n), 'kilomètre carré', 'kilomètres carrés', ['km2', 'km²']),
  U('m²', 'aire', rat(1n), 'mètre carré', 'mètres carrés', ['m2', 'm²']),
  U('dm²', 'aire', rat(1n, 100n), 'décimètre carré', 'décimètres carrés', ['dm2', 'dm²']),
  U('cm²', 'aire', rat(1n, 10000n), 'centimètre carré', 'centimètres carrés', ['cm2', 'cm²']),

  // Volumes géométriques — référence : le mètre cube
  U('m³', 'volume', rat(1n), 'mètre cube', 'mètres cubes', ['m3', 'm³']),
  U('dm³', 'volume', rat(1n, 1000n), 'décimètre cube', 'décimètres cubes', ['dm3', 'dm³']),
  U('cm³', 'volume', rat(1n, 1000000n), 'centimètre cube', 'centimètres cubes', ['cm3', 'cm³']),
]

const BY_ALIAS = new Map<string, UnitDef>()
const BY_SYMBOL = new Map<string, UnitDef>()
for (const u of UNITS) {
  BY_SYMBOL.set(u.symbol, u)
  for (const a of u.aliases) {
    // Le premier gagne : l'ordre du tableau donne la priorité (ex. « l » → L).
    if (!BY_ALIAS.has(a)) BY_ALIAS.set(a, u)
  }
}

/** Retire les accents et met en minuscules, pour comparer des saisies. */
export function normalizeToken(s: string): string {
  return s
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .trim()
}

export function unitBySymbol(symbol: string): UnitDef | undefined {
  return BY_SYMBOL.get(symbol)
}

/**
 * Reconnaît une unité écrite par l'utilisatrice.
 * Attention : « l » minuscule est ambigu en typographie mais jamais en usage
 * scolaire français, on l'accepte comme litre.
 */
export function parseUnit(raw: string): UnitDef | undefined {
  const t = raw.trim()
  if (!t) return undefined
  if (BY_SYMBOL.has(t)) return BY_SYMBOL.get(t)
  // Les symboles avec majuscule significative d'abord (L, dL, cL, mL).
  const exact = UNITS.find((u) => u.symbol === t)
  if (exact) return exact
  return BY_ALIAS.get(normalizeToken(t))
}

/** Convertit une valeur d'une unité vers une autre de la même grandeur. */
export function convert(value: Rational, from: UnitDef, to: UnitDef): Rational {
  if (from.quantity !== to.quantity) {
    throw new Error(`Conversion impossible entre ${from.symbol} et ${to.symbol}`)
  }
  return divR(mulR(value, from.toBase), to.toBase)
}

/** Même grandeur physique ? */
export function sameQuantity(a: UnitDef, b: UnitDef): boolean {
  return a.quantity === b.quantity
}

/** Nom lisible de l'unité, accordé au nombre. */
export function unitName(u: UnitDef, plural: boolean): string {
  return plural ? u.many : u.one
}

/** Toutes les unités d'une grandeur, de la plus grande à la plus petite. */
export function unitsOf(q: Quantity): UnitDef[] {
  return UNITS.filter((u) => u.quantity === q)
}
