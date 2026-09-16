/**
 * Calculs — M10 à M12 : longueurs et masses, capacités, heures et durées.
 *
 * Ce sont les compétences les plus rentables à l'écrit : elles reviennent dans
 * presque tous les problèmes et concentrent les erreurs de virgule.
 */

import { addR, divR, mulR, rat, type Rational } from '@/engine/rational'
import { convert, unitBySymbol } from '@/engine/units'
import type { Block, ExerciseTemplate, Lesson } from '../types'
import { conversionVisual, fitsConversionTable, fr, frInt, key, lead, p, timelineVisual, vis, warn } from '../blocks'

const R = (n: number | bigint, d: number | bigint = 1) => rat(BigInt(n), BigInt(d))
const dec = (digits: number, places: number): Rational => rat(BigInt(digits), 10n ** BigInt(places))
const U = (s: string) => unitBySymbol(s)!

const MASSES = ['kg', 'hg', 'dag', 'g', 'dg', 'cg', 'mg']
const LONGUEURS = ['km', 'hm', 'dam', 'm', 'dm', 'cm', 'mm']
const CAPACITES = ['kL', 'hL', 'daL', 'L', 'dL', 'cL', 'mL']

/** Chiffres de la partie entière et de la partie décimale d'un rationnel. */
function digitsOf(value: Rational, maxPlaces = 6): { int: string; frac: string } {
  const s = fr(value, maxPlaces).replace(/ /g, '').replace('−', '-')
  const [i, f] = s.split(',')
  return { int: i ?? '0', frac: f ?? '' }
}

/**
 * Tableau de conversion, uniquement si le nombre y tient sans déborder.
 * Un tableau qui perd un chiffre serait pire que pas de tableau du tout.
 */
function maybeTable(units: string[], value: Rational, unit: string, caption?: string): Block[] {
  const idx = units.indexOf(unit)
  const { int, frac } = digitsOf(value)
  if (idx < 0 || !fitsConversionTable(units, int, idx, frac)) return []
  return [vis(conversionVisual(units, int, idx, caption, frac))]
}

function formatHM(totalMinutes: number): string {
  const h = Math.floor(totalMinutes / 60)
  const m = totalMinutes % 60
  if (h === 0) return `${m} min`
  if (m === 0) return `${h} h`
  return `${h} h ${String(m).padStart(2, '0')}`
}

function clock(minutesOfDay: number): string {
  const h = Math.floor(minutesOfDay / 60) % 24
  const m = minutesOfDay % 60
  return `${h} h ${String(m).padStart(2, '0')}`
}

// ===========================================================================
// Leçons
// ===========================================================================

export const LESSONS_M10_M12: Lesson[] = [
  {
    skillId: 'M10',
    review: 'relu-par-le-modele',
    explanation: [
      lead('Changer d’unité ne change pas la quantité : cela change seulement la façon de l’écrire.'),
      p(
        'Les unités de masse et de longueur sont organisées par rangs. Entre deux rangs voisins, le rapport est toujours 10. Entre le kilogramme et le gramme, il y a trois rangs, donc un rapport de 1 000.',
      ),
      vis(
        conversionVisual(
          MASSES,
          '0',
          0,
          'Le tableau des masses : chaque colonne vaut dix fois la suivante.',
          '075',
        ),
      ),
      p(
        'Pour convertir, on place le nombre dans le tableau en mettant son dernier chiffre entier dans la colonne de son unité, puis on déplace la virgule jusqu’à la colonne visée.',
      ),
      key('0,075 g se lit : 0 gramme, 0 décigramme, 7 centigrammes, 5 milligrammes. Soit 75 mg.'),
      warn(
        'Multiplier ou diviser au hasard par 10 ou par 1 000 est la première source d’erreur. Comptez toujours les rangs entre les deux unités avant de déplacer la virgule.',
      ),
    ],
    alternative: [
      p('Une autre façon de faire : convertir toujours vers la plus petite unité en premier.'),
      p(
        'Pour passer de grammes à milligrammes, il y a trois rangs. On multiplie donc par 1 000 : 0,075 × 1 000 = 75. Pour faire l’inverse, on divise par 1 000.',
      ),
      p(
        'Vérifiez ensuite le sens : une petite unité donne un grand nombre. 0,075 g doit forcément donner plus de 0,075 en milligrammes. 75 mg est cohérent ; 0,000075 mg ne l’est pas.',
      ),
    ],
    workedExamples: [
      {
        statement: 'Convertir 0,075 g en milligrammes.',
        steps: [
          { do: 'Compter les rangs entre g et mg.', why: 'g → dg → cg → mg : trois rangs.', calc: '3 rangs' },
          { do: 'Décider du sens.', why: 'Le milligramme est plus petit que le gramme : le nombre devient plus grand, donc on multiplie.' },
          { do: 'Multiplier par 1 000.', why: 'Trois rangs correspondent à 10 × 10 × 10.', calc: '0,075 × 1 000 = 75' },
          { do: 'Contrôler.', why: '75 mg, c’est bien moins d’un dixième de gramme : l’ordre de grandeur est cohérent.' },
        ],
        conclusion: '0,075 g = 75 mg.',
      },
    ],
    commonMistakes: [
      { mistake: 'Multiplier par 100 au lieu de 1 000 entre g et mg.', fix: 'Écrivez le tableau : g, dg, cg, mg. Trois sauts, donc 1 000.', tag: 'unite' },
      { mistake: 'Convertir dans le mauvais sens.', fix: 'Petite unité ⇒ grand nombre. Vérifiez toujours ce point.', tag: 'unite' },
    ],
  },
  {
    skillId: 'M11',
    review: 'relu-par-le-modele',
    explanation: [
      lead('Les capacités fonctionnent exactement comme les masses : des rangs, et un facteur 10 entre deux rangs voisins.'),
      p('Un litre vaut 10 décilitres, 100 centilitres, 1 000 millilitres. Une bouteille d’eau de 50 cL contient donc 500 mL, soit un demi-litre.'),
      vis(conversionVisual(CAPACITES, '1', 3, '1,5 L placé dans le tableau des capacités.', '500')),
      key('Pour additionner des volumes écrits dans des unités différentes, convertissez d’abord tout dans la même unité.'),
      warn('1,5 L + 250 mL ne fait pas 1,75 L. Convertissez : 1 500 mL + 250 mL = 1 750 mL, soit 1,75 L. Ici le résultat coïncide, mais seulement parce qu’on a bien converti.'),
    ],
    alternative: [
      p('Repères concrets qui évitent la plupart des erreurs :'),
      p(
        'Une petite bouteille d’eau : 50 cL, soit 500 mL. Un verre : environ 20 cL, soit 200 mL. Une grande bouteille : 1,5 L, soit 1 500 mL.',
      ),
      p('Si votre résultat dit qu’un verre contient 2 litres, il y a une erreur de rang quelque part.'),
    ],
    workedExamples: [
      {
        statement: 'Additionner 1,5 L et 250 mL, et donner le résultat en millilitres.',
        steps: [
          { do: 'Choisir une unité commune.', why: 'On ne peut additionner que des quantités écrites dans la même unité. Le millilitre est demandé.' },
          { do: 'Convertir 1,5 L en millilitres.', why: 'Trois rangs entre L et mL, vers une unité plus petite : on multiplie par 1 000.', calc: '1,5 × 1 000 = 1 500 mL' },
          { do: 'Additionner.', why: 'Les deux quantités sont maintenant comparables.', calc: '1 500 + 250 = 1 750 mL' },
        ],
        conclusion: '1,5 L + 250 mL = 1 750 mL, soit 1,75 L.',
      },
    ],
    commonMistakes: [
      { mistake: 'Additionner 1,5 et 250 sans convertir.', fix: 'Une unité commune d’abord, l’addition ensuite.', tag: 'unite' },
      { mistake: 'Confondre cL et mL.', fix: 'Il y a un rang d’écart : 1 cL = 10 mL.', tag: 'unite' },
    ],
  },
  {
    skillId: 'M12',
    review: 'relu-par-le-modele',
    explanation: [
      lead('Le temps ne se compte pas en base 10 : une heure vaut 60 minutes, pas 100.'),
      p(
        'C’est la seule difficulté réelle, mais elle explique presque toutes les erreurs. Écrire « 1,30 h » pour 1 h 30 est faux : la partie après la virgule est une fraction d’heure, pas un nombre de minutes.',
      ),
      vis({
        type: 'calc-steps',
        steps: [
          { calc: '30 minutes = 30/60 d’heure = 0,5 h', why: 'La moitié de 60 minutes, c’est la moitié d’une heure.' },
          { calc: '1 h 30 = 1,5 h', why: 'Une heure entière, plus une demi-heure.' },
          { calc: '45 minutes = 45/60 = 0,75 h', why: 'Trois quarts d’heure.' },
          { calc: '1,75 h = 1 h + 0,75 × 60 min = 1 h 45', why: 'On reconvertit la partie décimale en minutes.' },
        ],
      }),
      p(
        'Pour calculer une durée entre deux horaires, la méthode la plus sûre consiste à avancer par paliers : d’abord jusqu’à l’heure entière suivante, puis d’heure en heure, puis les minutes restantes.',
      ),
      key('De 22 h 40 à 0 h 15 : de 22 h 40 à 23 h, il y a 20 min. De 23 h à 0 h, il y a 1 h. De 0 h à 0 h 15, il y a 15 min. Total : 1 h 35.'),
      warn('Poser la soustraction 0 h 15 − 22 h 40 donne un résultat négatif absurde. Quand on passe minuit, on avance par paliers.'),
    ],
    alternative: [
      p('Autre méthode : tout convertir en minutes depuis minuit.'),
      p(
        '22 h 40 correspond à 22 × 60 + 40 = 1 360 minutes. 0 h 15 le lendemain correspond à 24 × 60 + 15 = 1 455 minutes. La différence vaut 95 minutes, soit 1 h 35.',
      ),
      p('Cette méthode demande plus de calculs mais ne se trompe jamais de sens, y compris au passage de minuit.'),
    ],
    workedExamples: [
      {
        statement: 'Une intervention fictive commence à 22 h 40 et se termine à 0 h 15. Quelle est sa durée ?',
        visual: timelineVisual(
          22 * 60,
          24 * 60 + 60,
          [
            { at: 22 * 60 + 40, label: '22 h 40', strong: true },
            { at: 23 * 60, label: '23 h' },
            { at: 24 * 60, label: '0 h' },
            { at: 24 * 60 + 15, label: '0 h 15', strong: true },
          ],
          [
            { from: 22 * 60 + 40, to: 23 * 60, label: '20 min' },
            { from: 23 * 60, to: 24 * 60, label: '1 h' },
            { from: 24 * 60, to: 24 * 60 + 15, label: '15 min' },
          ],
          'On avance par paliers : jusqu’à l’heure ronde, puis d’heure en heure, puis les minutes.',
        ),
        steps: [
          { do: 'Aller jusqu’à l’heure entière suivante.', why: 'Cela évite toute soustraction avec emprunt.', calc: '22 h 40 → 23 h : 20 min' },
          { do: 'Avancer d’heure en heure.', why: 'Chaque palier vaut exactement 60 minutes.', calc: '23 h → 0 h : 1 h' },
          { do: 'Ajouter les minutes restantes.', why: 'Il reste à aller de 0 h à 0 h 15.', calc: '0 h → 0 h 15 : 15 min' },
          { do: 'Additionner les paliers.', why: '20 + 60 + 15 = 95 minutes.', calc: '95 min = 1 h 35' },
        ],
        conclusion: 'La durée est de 1 h 35.',
      },
    ],
    commonMistakes: [
      { mistake: 'Écrire 1,30 h pour 1 h 30.', fix: '30 minutes valent 0,5 heure : 1 h 30 = 1,5 h.', tag: 'virgule' },
      { mistake: 'Soustraire directement quand on passe minuit.', fix: 'Avancez par paliers, ou comptez en minutes depuis minuit.', tag: 'raisonnement' },
    ],
  },
]

// ===========================================================================
// Gabarits
// ===========================================================================

export const TEMPLATES_M10_M12: ExerciseTemplate[] = [
  // ---------------------------------------------------------------- M10 ---
  {
    id: 'M10-masse-simple',
    skillId: 'M10',
    level: 'decouverte',
    structure: 'conversion-de-masse',
    version: 1,
    review: 'teste-automatiquement',
    seconds: 45,
    generate: (rng) => {
      const pairs: [string, string][] = [
        ['g', 'mg'],
        ['kg', 'g'],
        ['mg', 'g'],
        ['g', 'kg'],
        ['kg', 'mg'],
      ]
      const [from, to] = rng.pick(pairs)
      const digits = rng.int(15, 985)
      const places = rng.pick([1, 2, 3])
      const value = dec(digits, places)
      const result = convert(value, U(from!), U(to!))
      const ranks = Math.abs(MASSES.indexOf(from!) - MASSES.indexOf(to!))
      const bigger = MASSES.indexOf(to!) > MASSES.indexOf(from!)
      return {
        prompt: [
          p(`Une étiquette indique ${fr(value)} ${from}.`),
          ...maybeTable(MASSES, value, from!, 'Placez la valeur dans le tableau, puis lisez-la dans la colonne visée.'),
        ],
        question: `Combien cela fait-il en ${to} ?`,
        answer: {
          kind: 'numeric',
          value: result,
          unit: to,
          unitPolicy: 'optional',
          pitfalls: [
            {
              answer: fr(bigger ? divR(value, R(10n ** BigInt(ranks))) : mulR(value, R(10n ** BigInt(ranks)))),
              tag: 'unite',
              why: bigger
                ? `Le ${to} est plus petit que le ${from} : le nombre doit devenir plus grand, pas plus petit.`
                : `Le ${to} est plus grand que le ${from} : le nombre doit devenir plus petit, pas plus grand.`,
            },
          ],
        },
        hints: [
          `Comptez les colonnes entre ${from} et ${to} dans le tableau : ${MASSES.join(' · ')}.`,
          `Il y a ${ranks} ${ranks > 1 ? 'rangs' : 'rang'}, donc un facteur ${frInt(10 ** ranks)}. Le ${to} étant ${bigger ? 'plus petit' : 'plus grand'}, le nombre devient ${bigger ? 'plus grand' : 'plus petit'}.`,
        ],
        alternative: [
          p('Lisez le nombre à voix haute en nommant chaque colonne.'),
          p(
            `${fr(value)} ${from}, c’est ${fr(result)} ${to}. Il suffit de déplacer la virgule de ${ranks} ${ranks > 1 ? 'rangs' : 'rang'} vers la ${bigger ? 'droite' : 'gauche'}, en complétant par des zéros si nécessaire.`,
          ),
        ],
        solution: [
          { text: `Compter les rangs entre ${from} et ${to}.`, calc: `${ranks} ${ranks > 1 ? 'rangs' : 'rang'}`, why: 'Chaque rang correspond à un facteur 10.' },
          { text: `${bigger ? 'Multiplier' : 'Diviser'} par ${frInt(10 ** ranks)}.`, calc: `${fr(value)} ${bigger ? '×' : '÷'} ${frInt(10 ** ranks)} = ${fr(result)}`, why: `Le ${to} est ${bigger ? 'plus petit' : 'plus grand'} que le ${from}.` },
        ],
        conclusion: `${fr(value)} ${from} = ${fr(result)} ${to}.`,
        placeholder: `Valeur en ${to}`,
        keyboard: 'decimal',
        suffix: to,
      }
    },
  },
  {
    id: 'M10-longueur',
    skillId: 'M10',
    level: 'decouverte',
    structure: 'conversion-de-longueur',
    version: 1,
    review: 'teste-automatiquement',
    seconds: 45,
    generate: (rng) => {
      const pairs: [string, string][] = [
        ['m', 'cm'],
        ['km', 'm'],
        ['cm', 'mm'],
        ['m', 'mm'],
        ['cm', 'm'],
      ]
      const [from, to] = rng.pick(pairs)
      const value = dec(rng.int(12, 975), rng.pick([1, 2]))
      const result = convert(value, U(from!), U(to!))
      const ranks = Math.abs(LONGUEURS.indexOf(from!) - LONGUEURS.indexOf(to!))
      const bigger = LONGUEURS.indexOf(to!) > LONGUEURS.indexOf(from!)
      return {
        prompt: [
          p(`Un plan indique une longueur de ${fr(value)} ${from}.`),
          ...maybeTable(LONGUEURS, value, from!, 'Tableau des longueurs.'),
        ],
        question: `Combien cela fait-il en ${to} ?`,
        answer: { kind: 'numeric', value: result, unit: to, unitPolicy: 'optional' },
        hints: [
          `Repérez les deux colonnes dans le tableau : ${LONGUEURS.join(' · ')}.`,
          `${ranks} ${ranks > 1 ? 'rangs séparent' : 'rang sépare'} ces unités, donc un facteur ${frInt(10 ** ranks)}.`,
        ],
        alternative: [
          p('Prenez un repère connu.'),
          p('1 m = 100 cm = 1 000 mm, et 1 km = 1 000 m. Toutes les autres conversions se déduisent de ces deux égalités.'),
        ],
        solution: [
          { text: `${bigger ? 'Multiplier' : 'Diviser'} par ${frInt(10 ** ranks)}.`, calc: `${fr(value)} ${from} = ${fr(result)} ${to}`, why: `Il y a ${ranks} ${ranks > 1 ? 'rangs' : 'rang'} entre les deux unités.` },
        ],
        conclusion: `${fr(value)} ${from} = ${fr(result)} ${to}.`,
        placeholder: `Valeur en ${to}`,
        keyboard: 'decimal',
        suffix: to,
      }
    },
  },
  {
    id: 'M10-somme-unites',
    skillId: 'M10',
    level: 'entrainement',
    structure: 'addition-de-masses-en-unites-differentes',
    version: 1,
    review: 'teste-automatiquement',
    seconds: 70,
    generate: (rng) => {
      const kg = dec(rng.int(12, 48), 1)
      const g = R(rng.int(150, 900))
      const totalG = addR(convert(kg, U('kg'), U('g')), g)
      return {
        prompt: [p(`Un colis pèse ${fr(kg)} kg. On y ajoute un contenu de ${fr(g)} g.`)],
        question: 'Quelle est la masse totale, en grammes ?',
        answer: {
          kind: 'numeric',
          value: totalG,
          unit: 'g',
          unitPolicy: 'optional',
          pitfalls: [
            { answer: fr(addR(kg, g)), tag: 'unite', why: 'Vous avez additionné des kilogrammes avec des grammes sans convertir. Il faut d’abord écrire les deux masses dans la même unité.' },
          ],
        },
        hints: [
          'On ne peut additionner que des quantités écrites dans la même unité.',
          `Convertissez d’abord ${fr(kg)} kg en grammes : il y a trois rangs entre kg et g.`,
        ],
        alternative: [
          p('Vous pouvez aussi convertir dans l’autre sens.'),
          p(
            `${fr(g)} g = ${fr(convert(g, U('g'), U('kg')))} kg. La somme vaut alors ${fr(addR(kg, convert(g, U('g'), U('kg'))))} kg, soit ${fr(totalG)} g. Le résultat est le même.`,
          ),
        ],
        solution: [
          { text: 'Convertir les kilogrammes en grammes.', calc: `${fr(kg)} × 1 000 = ${fr(convert(kg, U('kg'), U('g')))} g`, why: 'Trois rangs séparent kg et g.' },
          { text: 'Additionner.', calc: `${fr(convert(kg, U('kg'), U('g')))} + ${fr(g)} = ${fr(totalG)} g`, why: 'Les deux masses sont maintenant dans la même unité.' },
        ],
        conclusion: `La masse totale est de ${fr(totalG)} g, soit ${fr(convert(totalG, U('g'), U('kg')))} kg.`,
        placeholder: 'Valeur en grammes',
        keyboard: 'decimal',
        suffix: 'g',
      }
    },
  },
  {
    id: 'M10-unite-plausible',
    skillId: 'M10',
    level: 'entrainement',
    structure: 'choisir-l-unite-plausible',
    version: 1,
    review: 'teste-automatiquement',
    seconds: 45,
    generate: (rng) => {
      const cases = [
        { obj: 'un comprimé effervescent', value: 500, right: 'mg', wrong: ['kg', 'g'], why: 'Un comprimé de 500 g pèserait un demi-kilo.' },
        { obj: 'une bouteille d’eau pleine', value: 1500, right: 'g', wrong: ['mg', 'kg'], why: 'Une bouteille de 1 500 kg serait plus lourde qu’une voiture.' },
        { obj: 'un lit médicalisé', value: 120, right: 'kg', wrong: ['g', 'mg'], why: 'Un lit de 120 g ne tiendrait pas debout.' },
        { obj: 'la hauteur d’une porte', value: 2, right: 'm', wrong: ['km', 'cm'], why: 'Une porte de 2 cm ne laisserait passer personne.' },
        { obj: 'l’épaisseur d’une feuille de papier', value: 1, right: 'mm', wrong: ['m', 'cm'], why: 'Une feuille de 1 m d’épaisseur n’existe pas.' },
      ]
      const c = rng.pick(cases)
      const options = rng.shuffle([c.right, ...c.wrong])
      return {
        prompt: [p('Une mesure a été relevée, mais l’unité a été effacée.')],
        question: `Quelle unité convient pour ${c.obj}, mesuré à ${frInt(c.value)} … ?`,
        answer: {
          kind: 'choice',
          options: options.map((o) => ({
            id: o,
            label: `${frInt(c.value)} ${o}`,
            feedback: o === c.right ? '' : c.why,
            tag: 'unite',
          })),
          correct: [c.right],
        },
        hints: [
          'Comparez à un objet que vous connaissez bien.',
          'Testez chaque unité : laquelle donne une valeur qui a du sens dans la vie réelle ?',
        ],
        alternative: [
          p('Procédez par élimination en convertissant.'),
          p('Convertissez la valeur proposée dans une unité familière. Si le résultat est absurde, l’unité est fausse.'),
        ],
        solution: [
          { text: `L’unité correcte est le ${c.right}.`, why: c.why },
        ],
      }
    },
  },
  {
    id: 'M10-comparer-masses',
    skillId: 'M10',
    level: 'epreuve',
    structure: 'comparer-deux-mesures-d-unites-differentes',
    version: 1,
    transfer: true,
    review: 'teste-automatiquement',
    seconds: 75,
    generate: (rng) => {
      const baseG = rng.int(250, 1800)
      const a = R(baseG) // en g
      const deltaG = rng.int(30, 200)
      const bG = rng.chance(0.5) ? baseG + deltaG : baseG - deltaG
      const b = convert(R(bG), U('g'), U('kg'))
      const aIsBigger = baseG > bG
      return {
        prompt: [
          p('Deux colis sont pesés avec des balances différentes.'),
          vis({
            type: 'table',
            headers: ['Colis', 'Masse affichée'],
            rows: [
              ['Colis A', `${fr(a)} g`],
              ['Colis B', `${fr(b)} kg`],
            ],
          }),
        ],
        question: 'Quel colis est le plus lourd ?',
        answer: {
          kind: 'choice',
          options: [
            {
              id: 'A',
              label: 'Le colis A',
              feedback: aIsBigger ? '' : `Converti, le colis B pèse ${fr(convert(b, U('kg'), U('g')))} g, contre ${fr(a)} g pour le colis A.`,
              tag: 'unite',
            },
            {
              id: 'B',
              label: 'Le colis B',
              feedback: aIsBigger ? `Converti, le colis B pèse ${fr(convert(b, U('kg'), U('g')))} g, contre ${fr(a)} g pour le colis A.` : '',
              tag: 'unite',
            },
          ],
          correct: [aIsBigger ? 'A' : 'B'],
        },
        hints: [
          'Les deux masses ne sont pas écrites dans la même unité : on ne peut pas les comparer telles quelles.',
          'Convertissez les deux valeurs en grammes avant de comparer.',
        ],
        alternative: [
          p('Vous pouvez aussi tout convertir en kilogrammes.'),
          p(`${fr(a)} g = ${fr(convert(a, U('g'), U('kg')))} kg, à comparer avec ${fr(b)} kg. Le sens de la comparaison est le même.`),
        ],
        solution: [
          { text: 'Convertir dans une unité commune.', calc: `${fr(b)} kg = ${fr(convert(b, U('kg'), U('g')))} g`, why: 'Comparer deux nombres écrits dans des unités différentes n’a pas de sens.' },
          { text: `Comparer : ${fr(a)} g et ${fr(convert(b, U('kg'), U('g')))} g.`, why: `Le colis ${aIsBigger ? 'A' : 'B'} est le plus lourd.` },
        ],
      }
    },
  },

  // ---------------------------------------------------------------- M11 ---
  {
    id: 'M11-litres-ml',
    skillId: 'M11',
    level: 'decouverte',
    structure: 'conversion-de-capacite',
    version: 1,
    review: 'teste-automatiquement',
    seconds: 45,
    generate: (rng) => {
      const pairs: [string, string][] = [
        ['L', 'mL'],
        ['mL', 'L'],
        ['cL', 'mL'],
        ['L', 'cL'],
        ['dL', 'mL'],
      ]
      const [from, to] = rng.pick(pairs)
      const value = dec(rng.int(15, 950), rng.pick([1, 2]))
      const result = convert(value, U(from!), U(to!))
      const ranks = Math.abs(CAPACITES.indexOf(from!) - CAPACITES.indexOf(to!))
      const bigger = CAPACITES.indexOf(to!) > CAPACITES.indexOf(from!)
      return {
        prompt: [
          p(`Un contenant porte l’indication ${fr(value)} ${from}.`),
          ...maybeTable(CAPACITES, value, from!, 'Tableau des capacités.'),
        ],
        question: `Combien cela fait-il en ${to} ?`,
        answer: { kind: 'numeric', value: result, unit: to, unitPolicy: 'optional' },
        hints: [
          `Situez les deux unités dans le tableau : ${CAPACITES.join(' · ')}.`,
          `${ranks} ${ranks > 1 ? 'rangs séparent' : 'rang sépare'} ces unités, soit un facteur ${frInt(10 ** ranks)} dans le sens ${bigger ? 'de la multiplication' : 'de la division'}.`,
        ],
        alternative: [
          p('Gardez trois repères en tête.'),
          p('1 L = 1 000 mL. 1 L = 100 cL. 1 cL = 10 mL. Toute conversion de capacité se déduit de ces trois égalités.'),
        ],
        solution: [
          { text: `${bigger ? 'Multiplier' : 'Diviser'} par ${frInt(10 ** ranks)}.`, calc: `${fr(value)} ${from} = ${fr(result)} ${to}`, why: 'Chaque rang correspond à un facteur 10.' },
        ],
        conclusion: `${fr(value)} ${from} = ${fr(result)} ${to}.`,
        placeholder: `Valeur en ${to}`,
        keyboard: 'decimal',
        suffix: to,
      }
    },
  },
  {
    id: 'M11-somme-volumes',
    skillId: 'M11',
    level: 'entrainement',
    structure: 'addition-de-volumes-en-unites-differentes',
    version: 1,
    review: 'teste-automatiquement',
    seconds: 65,
    generate: (rng) => {
      const litres = dec(rng.int(10, 35), 1)
      const ml = R(rng.pick([125, 150, 200, 250, 330, 500]))
      const totalMl = addR(convert(litres, U('L'), U('mL')), ml)
      return {
        prompt: [p(`On verse ${fr(litres)} L dans un récipient, puis ${fr(ml)} mL.`)],
        question: 'Quel volume total obtient-on, en millilitres ?',
        answer: {
          kind: 'numeric',
          value: totalMl,
          unit: 'mL',
          unitPolicy: 'optional',
          pitfalls: [
            { answer: fr(addR(litres, ml)), tag: 'unite', why: 'Vous avez additionné des litres et des millilitres sans convertir : les deux nombres ne mesurent pas la même chose.' },
          ],
        },
        hints: [
          'Choisissez d’abord une unité commune. L’énoncé demande le résultat en millilitres.',
          `${fr(litres)} L font ${fr(convert(litres, U('L'), U('mL')))} mL : il y a trois rangs entre L et mL.`,
        ],
        alternative: [
          p('Vous pouvez raisonner en litres.'),
          p(
            `${fr(ml)} mL = ${fr(convert(ml, U('mL'), U('L')))} L. La somme vaut ${fr(addR(litres, convert(ml, U('mL'), U('L'))))} L, soit ${fr(totalMl)} mL.`,
          ),
        ],
        solution: [
          { text: 'Convertir les litres en millilitres.', calc: `${fr(litres)} × 1 000 = ${fr(convert(litres, U('L'), U('mL')))} mL`, why: '1 L vaut 1 000 mL.' },
          { text: 'Additionner.', calc: `${fr(convert(litres, U('L'), U('mL')))} + ${fr(ml)} = ${fr(totalMl)} mL`, why: 'Les deux volumes sont maintenant comparables.' },
        ],
        conclusion: `Le volume total est de ${fr(totalMl)} mL, soit ${fr(convert(totalMl, U('mL'), U('L')))} L.`,
        placeholder: 'Valeur en mL',
        keyboard: 'decimal',
        suffix: 'mL',
      }
    },
  },
  {
    id: 'M11-nombre-de-contenants',
    skillId: 'M11',
    level: 'epreuve',
    structure: 'nombre-de-contenants-necessaires',
    version: 1,
    transfer: true,
    review: 'teste-automatiquement',
    seconds: 100,
    generate: (rng) => {
      const perDay = dec(rng.pick([10, 15, 20, 25]), 1) // L/jour
      const days = rng.int(4, 10)
      const bottle = rng.pick([R(75, 100), R(5, 10), R(15, 10), R(1)]) // L
      const total = mulR(perDay, R(days))
      const exact = divR(total, bottle)
      const needed = Math.ceil(Number(exact.n) / Number(exact.d))
      return {
        prompt: [
          p(
            `Une personne boit ${fr(perDay)} L d’eau par jour. Elle part ${days} jours. L’eau est vendue en bouteilles de ${fr(bottle)} L.`,
          ),
        ],
        question: 'Combien de bouteilles faut-il prévoir au minimum ?',
        answer: {
          kind: 'numeric',
          value: R(needed),
          requireInteger: true,
          pitfalls: [
            ...(exact.d === 1n
              ? []
              : [
                  {
                    answer: fr(exact, 2),
                    tag: 'raisonnement' as const,
                    why: 'Une bouteille s’achète entière. Il faut arrondir au nombre entier supérieur.',
                  },
                ]),
            ...(fr(total) === String(needed)
              ? []
              : [
                  {
                    answer: fr(total),
                    tag: 'consigne' as const,
                    why: 'Vous avez donné le volume total en litres. La question porte sur le nombre de bouteilles.',
                  },
                ]),
          ],
        },
        hints: [
          'Il y a deux étapes : le volume total nécessaire, puis le nombre de bouteilles.',
          `Calculez ${fr(perDay)} × ${days}, puis divisez ce volume par ${fr(bottle)} L.`,
        ],
        alternative: [
          p('Raisonnez d’abord jour par jour.'),
          p(
            `Chaque jour, ${fr(perDay)} L correspondent à ${fr(divR(perDay, bottle), 3)} bouteilles. Sur ${days} jours, cela fait ${fr(exact, 3)} bouteilles, qu’il faut arrondir au-dessus.`,
          ),
        ],
        solution: [
          { text: 'Calculer le volume total.', calc: `${fr(perDay)} × ${days} = ${fr(total)} L`, why: 'La consommation est la même chaque jour.' },
          { text: 'Diviser par la contenance d’une bouteille.', calc: `${fr(total)} ÷ ${fr(bottle)} = ${fr(exact, 4)}`, why: 'On cherche combien de bouteilles tiennent dans ce volume.' },
          { text: `Arrondir au-dessus : ${needed} bouteilles.`, why: 'Une bouteille partiellement nécessaire doit quand même être achetée.' },
        ],
        conclusion: `Il faut prévoir ${needed} bouteilles pour couvrir ${fr(total)} L.`,
        placeholder: 'Nombre de bouteilles',
        keyboard: 'decimal',
      }
    },
  },

  // ---------------------------------------------------------------- M12 ---
  {
    id: 'M12-duree-simple',
    skillId: 'M12',
    level: 'decouverte',
    structure: 'duree-entre-deux-horaires',
    version: 1,
    review: 'teste-automatiquement',
    seconds: 55,
    generate: (rng) => {
      const startH = rng.int(7, 17)
      const startM = rng.pick([0, 10, 15, 20, 30, 40, 45, 50])
      const durationMin = rng.int(1, 5) * 60 + rng.pick([5, 10, 15, 20, 25, 35, 40, 50])
      const start = startH * 60 + startM
      const end = start + durationMin
      return {
        prompt: [
          p(`Une réunion commence à ${clock(start)} et se termine à ${clock(end)}.`),
          vis(
            timelineVisual(
              Math.floor(start / 60) * 60,
              Math.ceil(end / 60) * 60,
              [
                { at: start, label: clock(start), strong: true },
                { at: end, label: clock(end), strong: true },
              ],
              [{ from: start, to: end, label: '?' }],
              'Repérez le début, la fin, puis avancez par paliers.',
            ),
          ),
        ],
        question: 'Quelle est la durée de la réunion ?',
        answer: { kind: 'duration', minutes: R(durationMin), display: 'hm' },
        hints: [
          'Commencez par avancer jusqu’à l’heure entière suivante.',
          'Comptez ensuite les heures entières, puis les minutes restantes, et additionnez les trois morceaux.',
        ],
        alternative: [
          p('Convertissez tout en minutes depuis minuit.'),
          p(
            `${clock(start)} correspond à ${frInt(start)} minutes, ${clock(end)} à ${frInt(end)} minutes. La différence vaut ${frInt(durationMin)} minutes, soit ${formatHM(durationMin)}.`,
          ),
        ],
        solution: [
          { text: 'Aller jusqu’à l’heure entière suivante.', calc: `${clock(start)} → ${clock(Math.ceil(start / 60) * 60)} : ${(60 - (start % 60)) % 60} min`, why: 'Cela évite tout emprunt.' },
          { text: 'Compter les heures entières.', why: 'Chaque palier vaut 60 minutes.' },
          { text: 'Ajouter les minutes restantes puis additionner.', calc: `Total : ${formatHM(durationMin)}`, why: 'La somme des paliers donne la durée.' },
        ],
        conclusion: `La réunion dure ${formatHM(durationMin)}.`,
        placeholder: 'Exemple : 1 h 35',
        keyboard: 'text',
      }
    },
  },
  {
    id: 'M12-minuit',
    skillId: 'M12',
    level: 'entrainement',
    structure: 'duree-traversant-minuit',
    version: 1,
    review: 'teste-automatiquement',
    seconds: 80,
    generate: (rng) => {
      const startH = rng.int(21, 23)
      const startM = rng.pick([5, 10, 15, 20, 25, 30, 35, 40, 45, 50])
      const endH = rng.int(0, 2)
      const endM = rng.pick([0, 5, 10, 15, 20, 25, 30, 40, 45])
      const start = startH * 60 + startM
      const end = (endH + 24) * 60 + endM
      const duration = end - start
      return {
        prompt: [
          p(`Une permanence fictive commence à ${clock(start)} et se termine à ${clock(end % 1440)} le lendemain.`),
          vis(
            timelineVisual(
              startH * 60,
              (endH + 24) * 60 + 60,
              [
                { at: start, label: clock(start), strong: true },
                { at: 24 * 60, label: 'minuit' },
                { at: end, label: clock(end % 1440), strong: true },
              ],
              [
                { from: start, to: 24 * 60, label: `${24 * 60 - start} min` },
                { from: 24 * 60, to: end, label: `${end - 24 * 60} min` },
              ],
              'Le passage de minuit se traite en deux morceaux.',
            ),
          ),
        ],
        question: 'Quelle est la durée totale de cette permanence ?',
        answer: {
          kind: 'duration',
          minutes: R(duration),
          display: 'hm',
          pitfalls: [
            {
              answer: formatHM(Math.abs(start - (end - 24 * 60))),
              tag: 'raisonnement',
              why: 'La soustraction a été faite comme si les deux horaires étaient le même jour. Quand on passe minuit, il faut compter en deux morceaux.',
            },
          ],
        },
        hints: [
          'Les deux horaires ne sont pas le même jour : une soustraction directe donnerait un résultat négatif ou absurde.',
          'Coupez le calcul en deux : du début jusqu’à minuit, puis de minuit jusqu’à la fin.',
        ],
        alternative: [
          p('Comptez en minutes depuis minuit, en ajoutant 24 heures à l’horaire de fin.'),
          p(
            `Début : ${frInt(start)} minutes. Fin : ${frInt(end)} minutes (soit ${endH} h ${String(endM).padStart(2, '0')} le lendemain). Différence : ${frInt(duration)} minutes, soit ${formatHM(duration)}.`,
          ),
        ],
        solution: [
          { text: 'Du début jusqu’à minuit.', calc: `${clock(start)} → 0 h : ${formatHM(24 * 60 - start)}`, why: 'Premier morceau, entièrement dans la journée de départ.' },
          { text: 'De minuit jusqu’à la fin.', calc: `0 h → ${clock(end % 1440)} : ${formatHM(end - 24 * 60)}`, why: 'Deuxième morceau, dans la journée suivante.' },
          { text: 'Additionner les deux morceaux.', calc: `${formatHM(24 * 60 - start)} + ${formatHM(end - 24 * 60)} = ${formatHM(duration)}`, why: 'La durée totale est la somme des deux parties.' },
        ],
        conclusion: `La permanence dure ${formatHM(duration)}.`,
        placeholder: 'Exemple : 1 h 35',
        keyboard: 'text',
      }
    },
  },
  {
    id: 'M12-decimal-vers-hm',
    skillId: 'M12',
    level: 'entrainement',
    structure: 'heures-decimales-vers-heures-minutes',
    version: 1,
    review: 'teste-automatiquement',
    seconds: 60,
    generate: (rng) => {
      const h = rng.int(1, 6)
      const frac = rng.pick([25, 5, 75, 2, 4, 6, 8]) // .25 .5 .75 .2 .4 .6 .8
      const places = frac >= 10 ? 2 : 1
      const value = addR(R(h), dec(frac, places))
      const minutes = Number(mulR(value, R(60)).n) / Number(mulR(value, R(60)).d)
      const fracMinutes = minutes - h * 60
      return {
        prompt: [p(`Un logiciel de planning affiche une durée de ${fr(value)} h.`)],
        question: 'Écrivez cette durée en heures et minutes.',
        answer: {
          kind: 'duration',
          minutes: R(Math.round(minutes)),
          display: 'hm',
          pitfalls: [
            {
              answer: `${h} h ${String(frac).padEnd(2, '0')}`,
              tag: 'virgule',
              why: `La partie décimale n’est pas un nombre de minutes. ${fr(dec(frac, places))} heure vaut ${fr(dec(frac, places))} × 60 = ${Math.round(fracMinutes)} minutes.`,
            },
          ],
        },
        hints: [
          'La partie entière donne directement les heures.',
          'La partie après la virgule est une fraction d’heure : multipliez-la par 60 pour obtenir des minutes.',
        ],
        alternative: [
          p('Passez par les fractions connues.'),
          p('0,25 h = un quart d’heure = 15 min. 0,5 h = une demi-heure = 30 min. 0,75 h = trois quarts d’heure = 45 min.'),
        ],
        solution: [
          { text: 'Séparer partie entière et partie décimale.', calc: `${fr(value)} = ${h} + ${fr(dec(frac, places))}`, why: 'Les heures entières se lisent directement.' },
          { text: 'Convertir la partie décimale en minutes.', calc: `${fr(dec(frac, places))} × 60 = ${Math.round(fracMinutes)} min`, why: 'Une heure vaut 60 minutes, pas 100.' },
          { text: `Réunir : ${formatHM(Math.round(minutes))}.`, why: 'La durée est bien la même, écrite autrement.' },
        ],
        conclusion: `${fr(value)} h = ${formatHM(Math.round(minutes))}.`,
        placeholder: 'Exemple : 1 h 45',
        keyboard: 'text',
      }
    },
  },
  {
    id: 'M12-hm-vers-decimal',
    skillId: 'M12',
    level: 'entrainement',
    structure: 'heures-minutes-vers-heures-decimales',
    version: 1,
    review: 'teste-automatiquement',
    seconds: 60,
    generate: (rng) => {
      const h = rng.int(1, 7)
      const m = rng.pick([6, 12, 15, 18, 24, 30, 36, 42, 45, 48, 54])
      const total = h * 60 + m
      return {
        prompt: [p(`Une durée de travail est notée ${h} h ${String(m).padStart(2, '0')}.`)],
        question: 'Écrivez cette durée en heures décimales.',
        answer: {
          kind: 'duration',
          minutes: R(total),
          display: 'decimal-h',
          pitfalls: [
            {
              answer: `${h},${String(m).padStart(2, '0')}`,
              tag: 'virgule',
              why: `Recopier les minutes après la virgule est faux : ${m} minutes valent ${m} ÷ 60 = ${fr(divR(R(m), R(60)), 4)} heure.`,
            },
          ],
        },
        hints: [
          'La partie décimale d’une durée est une fraction d’heure, pas un nombre de minutes.',
          `Divisez ${m} par 60 pour savoir quelle fraction d’heure représentent ces minutes.`,
        ],
        alternative: [
          p('Repères à connaître :'),
          p('15 min = 0,25 h ; 30 min = 0,5 h ; 45 min = 0,75 h ; 6 min = 0,1 h ; 12 min = 0,2 h.'),
        ],
        solution: [
          { text: 'Convertir les minutes en fraction d’heure.', calc: `${m} ÷ 60 = ${fr(divR(R(m), R(60)), 4)}`, why: 'Une heure vaut 60 minutes.' },
          { text: 'Ajouter les heures entières.', calc: `${h} + ${fr(divR(R(m), R(60)), 4)} = ${fr(divR(R(total), R(60)), 4)} h`, why: 'On additionne des heures avec des heures.' },
        ],
        conclusion: `${h} h ${String(m).padStart(2, '0')} = ${fr(divR(R(total), R(60)), 4)} h.`,
        placeholder: 'Exemple : 1,5',
        keyboard: 'decimal',
        suffix: 'h',
      }
    },
  },
  {
    id: 'M12-heure-arrivee',
    skillId: 'M12',
    level: 'entrainement',
    structure: 'heure-d-arrivee-apres-une-duree',
    version: 1,
    review: 'teste-automatiquement',
    seconds: 65,
    generate: (rng) => {
      const start = rng.int(6, 21) * 60 + rng.pick([0, 10, 20, 25, 35, 40, 50])
      const duration = rng.int(1, 4) * 60 + rng.pick([15, 25, 35, 45, 50])
      const end = (start + duration) % 1440
      return {
        prompt: [p(`Un trajet part à ${clock(start)} et dure ${formatHM(duration)}.`)],
        question: 'À quelle heure arrive-t-on ?',
        answer: { kind: 'clock', minutesOfDay: end },
        hints: [
          'Ajoutez d’abord les heures entières, puis les minutes.',
          'Si le total des minutes dépasse 60, retirez 60 et ajoutez une heure.',
        ],
        alternative: [
          p('Comptez en minutes depuis minuit.'),
          p(
            `${clock(start)} = ${frInt(start)} min. On ajoute ${frInt(duration)} min, ce qui donne ${frInt(start + duration)} min. En divisant par 60 : ${Math.floor(((start + duration) % 1440) / 60)} h et ${(start + duration) % 60} min.`,
          ),
        ],
        solution: [
          { text: 'Ajouter les heures.', calc: `${clock(start)} + ${Math.floor(duration / 60)} h = ${clock((start + Math.floor(duration / 60) * 60) % 1440)}`, why: 'Les heures s’ajoutent directement.' },
          { text: 'Ajouter les minutes.', calc: `+ ${duration % 60} min → ${clock(end)}`, why: 'Si les minutes dépassent 60, on convertit en une heure de plus.' },
        ],
        conclusion: `On arrive à ${clock(end)}.`,
        placeholder: 'Exemple : 14 h 30',
        keyboard: 'text',
      }
    },
  },
  {
    id: 'M12-somme-durees',
    skillId: 'M12',
    level: 'epreuve',
    structure: 'somme-de-plusieurs-durees',
    version: 1,
    transfer: true,
    review: 'teste-automatiquement',
    seconds: 100,
    generate: (rng) => {
      const parts = [rng.int(20, 55), rng.int(20, 55), rng.int(25, 50), rng.int(15, 45)]
      const total = parts.reduce((a, b) => a + b, 0)
      const labels = ['Première étape', 'Deuxième étape', 'Troisième étape', 'Quatrième étape']
      return {
        prompt: [
          p('Une tournée fictive comporte quatre étapes, dont voici les durées.'),
          vis({
            type: 'table',
            headers: ['Étape', 'Durée'],
            rows: parts.map((m, i) => [labels[i]!, `${m} min`]),
            align: ['left', 'right'],
          }),
        ],
        question: 'Quelle est la durée totale de la tournée, en heures et minutes ?',
        answer: {
          kind: 'duration',
          minutes: R(total),
          display: 'hm',
          // Le piège « découper par centaines » n'est proposé que s'il produit
          // une écriture lisible et différente de la bonne réponse.
          pitfalls:
            total >= 120 && total % 100 <= 59 && total % 100 !== total % 60
              ? [
                  {
                    answer: `${Math.floor(total / 100)} h ${total % 100}`,
                    tag: 'virgule',
                    why: 'Le total en minutes a été découpé par centaines. Une heure vaut 60 minutes : c’est par 60 qu’il faut diviser.',
                  },
                ]
              : [],
        },
        hints: [
          'Additionnez d’abord toutes les durées en minutes.',
          `Divisez ensuite le total par 60 : le quotient donne les heures, le reste donne les minutes.`,
        ],
        alternative: [
          p('Regroupez les durées par paires qui font une heure ronde.'),
          p('Par exemple, 35 min + 25 min = 1 h. Cette méthode limite les grands nombres et les erreurs de retenue.'),
        ],
        solution: [
          { text: 'Additionner les minutes.', calc: `${parts.join(' + ')} = ${total} min`, why: 'Toutes les durées sont déjà dans la même unité.' },
          { text: 'Convertir en heures et minutes.', calc: `${total} ÷ 60 = ${Math.floor(total / 60)} et il reste ${total % 60}`, why: 'Une heure vaut 60 minutes.' },
        ],
        conclusion: `La tournée dure ${formatHM(total)}.`,
        placeholder: 'Exemple : 2 h 15',
        keyboard: 'text',
      }
    },
  },
]

