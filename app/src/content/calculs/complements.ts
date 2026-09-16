/**
 * Calculs — structures complémentaires.
 *
 * Ce fichier ajoute des structures de problème réellement différentes, pas des
 * variantes de nombres : chaque gabarit pose une question qu'aucun autre ne
 * pose. Il complète les chapitres prioritaires du socle.
 */

import { addR, divR, mulR, rat, roundR, subR, type Rational } from '@/engine/rational'
import { convert, unitBySymbol } from '@/engine/units'
import type { ExerciseTemplate } from '../types'
import { fr, frInt, p, vis } from '../blocks'

const R = (n: number | bigint, d: number | bigint = 1) => rat(BigInt(n), BigInt(d))
const dec = (digits: number, places: number): Rational => rat(BigInt(digits), 10n ** BigInt(places))
const U = (s: string) => unitBySymbol(s)!

const formatHM = (m: number) => {
  const h = Math.floor(m / 60)
  const mm = m % 60
  return h === 0 ? `${mm} min` : mm === 0 ? `${h} h` : `${h} h ${String(mm).padStart(2, '0')}`
}
const clock = (m: number) => `${Math.floor(m / 60) % 24} h ${String(m % 60).padStart(2, '0')}`

export const TEMPLATES_COMPLEMENTS: ExerciseTemplate[] = [
  // --------------------------------------------------------------- M02 ---
  {
    id: 'M02-complement-centaine',
    skillId: 'M02',
    level: 'decouverte',
    structure: 'complement-a-la-centaine',
    version: 1,
    review: 'teste-automatiquement',
    seconds: 40,
    generate: (rng) => {
      const cents = rng.step(1100, 8900, 25)
      const v = dec(cents, 2)
      const target = Math.ceil(cents / 10000) * 100
      const missing = subR(R(target), v)
      return {
        prompt: [p(`Un panier contient pour ${fr(v)} €.`)],
        question: `Combien manque-t-il pour atteindre ${target} € ?`,
        answer: {
          kind: 'numeric',
          value: missing,
          unit: '€',
          unitPolicy: 'optional',
          pitfalls: [
            { answer: fr(addR(R(target), v)), tag: 'raisonnement', why: 'Vous avez additionné. Ce qui manque est l’écart entre le panier et l’objectif.' },
          ],
        },
        hints: [
          'Il s’agit de l’écart entre ce qu’on a et ce qu’on veut atteindre.',
          `Montez d’abord jusqu’à l’euro entier suivant, puis complétez jusqu’à ${target} €.`,
        ],
        alternative: [
          p('Procédez comme pour rendre la monnaie.'),
          p(
            `De ${fr(v)} € à ${Math.ceil(cents / 100)} €, il manque ${fr(subR(R(Math.ceil(cents / 100)), v))} €. De ${Math.ceil(cents / 100)} € à ${target} €, il manque encore ${target - Math.ceil(cents / 100)} €.`,
          ),
        ],
        solution: [
          { text: 'Écrire la relation.', calc: `${fr(v)} + ? = ${target}`, why: 'Formuler l’égalité évite de choisir l’opération au hasard.' },
          { text: 'Isoler ce qui manque.', calc: `${target} − ${fr(v)} = ${fr(missing)} €`, why: 'La soustraction défait l’addition.' },
        ],
        conclusion: `Il manque ${fr(missing)} €.`,
        placeholder: 'Exemple : 12,75',
        keyboard: 'decimal',
        suffix: '€',
      }
    },
  },
  {
    id: 'M02-somme-de-trois',
    skillId: 'M02',
    level: 'entrainement',
    structure: 'addition-de-trois-decimaux',
    version: 1,
    review: 'teste-automatiquement',
    seconds: 60,
    generate: (rng) => {
      const a = dec(rng.int(150, 950), 2)
      const b = dec(rng.int(20, 95), 1)
      const c = dec(rng.int(200, 900), 2)
      const total = addR(addR(a, b), c)
      return {
        prompt: [p(`Trois relevés successifs indiquent ${fr(a)} L, ${fr(b)} L et ${fr(c)} L.`)],
        question: 'Quel est le total, en litres ?',
        answer: { kind: 'numeric', value: total, unit: 'L', unitPolicy: 'optional' },
        hints: [
          'Écrivez les trois nombres l’un sous l’autre, virgules alignées.',
          'Complétez avec des zéros pour avoir partout deux décimales, puis additionnez colonne par colonne.',
        ],
        alternative: [
          p('Additionnez deux par deux.'),
          p(`${fr(a)} + ${fr(b)} = ${fr(addR(a, b))}, puis ajoutez ${fr(c)}. Deux petites additions valent mieux qu’une grande.`),
        ],
        solution: [
          { text: 'Aligner les virgules.', why: 'On additionne des dixièmes avec des dixièmes.' },
          { text: 'Additionner.', calc: `${fr(a)} + ${fr(b)} + ${fr(c)} = ${fr(total)} L`, why: 'Chaque dépassement de 10 donne une retenue.' },
        ],
        conclusion: `Le total est de ${fr(total)} L.`,
        placeholder: 'Exemple : 24,75',
        keyboard: 'decimal',
        suffix: 'L',
      }
    },
  },

  // --------------------------------------------------------------- M03 ---
  {
    id: 'M03-par-un-demi',
    skillId: 'M03',
    level: 'entrainement',
    structure: 'multiplier-par-un-nombre-inferieur-a-un',
    version: 1,
    review: 'teste-automatiquement',
    seconds: 55,
    generate: (rng) => {
      const factor = rng.pick([
        { r: R(1, 2), label: '0,5' },
        { r: R(1, 4), label: '0,25' },
        { r: R(1, 10), label: '0,1' },
        { r: R(3, 4), label: '0,75' },
      ])
      const base = rng.step(40, 480, 4)
      const result = mulR(R(base), factor.r)
      return {
        prompt: [p(`On calcule ${frInt(base)} × ${factor.label}.`)],
        question: 'Quel est le résultat ?',
        answer: {
          kind: 'numeric',
          value: result,
          pitfalls: [
            { answer: fr(divR(R(base), factor.r)), tag: 'raisonnement', why: `Multiplier par ${factor.label}, qui est plus petit que 1, rend le résultat plus petit que ${frInt(base)}, pas plus grand.` },
          ],
        },
        hints: [
          `${factor.label} est plus petit que 1 : le résultat sera plus petit que ${frInt(base)}.`,
          `${factor.label} correspond à ${fr(factor.r)} : prenez cette part de ${frInt(base)}.`,
        ],
        alternative: [
          p('Traduisez le facteur en fraction.'),
          p(`Multiplier par ${factor.label}, c’est prendre ${fr(factor.r)} de la quantité, soit ${fr(result)}.`),
        ],
        solution: [
          { text: 'Traduire en fraction.', calc: `${factor.label} = ${fr(factor.r)}`, why: 'Les fractions usuelles se calculent de tête.' },
          { text: 'Appliquer.', calc: `${frInt(base)} × ${factor.label} = ${fr(result)}`, why: 'Le résultat est bien inférieur au nombre de départ.' },
        ],
        placeholder: 'Résultat',
        keyboard: 'decimal',
      }
    },
  },
  {
    id: 'M03-cout-par-personne',
    skillId: 'M03',
    level: 'epreuve',
    structure: 'cout-total-par-personne-et-par-jour',
    version: 1,
    transfer: true,
    review: 'teste-automatiquement',
    seconds: 95,
    generate: (rng) => {
      const perDay = dec(rng.step(250, 750, 25), 2)
      const people = rng.int(8, 25)
      const days = rng.int(3, 9)
      const total = mulR(mulR(perDay, R(people)), R(days))
      return {
        prompt: [
          p(`Un repas coûte ${fr(perDay)} € par personne et par jour. ${people} personnes sont accueillies pendant ${days} jours.`),
        ],
        question: 'Quel est le coût total, en euros ?',
        answer: {
          kind: 'numeric',
          value: total,
          unit: '€',
          unitPolicy: 'optional',
          pitfalls: [
            { answer: fr(mulR(perDay, R(people))), tag: 'consigne', why: `C’est le coût d’une seule journée. L’énoncé porte sur ${days} jours.` },
            { answer: fr(mulR(perDay, R(days))), tag: 'consigne', why: `C’est le coût d’une seule personne sur ${days} jours. Il y en a ${people}.` },
          ],
        },
        hints: [
          'Il y a deux multiplications à enchaîner : le nombre de personnes, puis le nombre de jours.',
          `Calculez d’abord le coût d’une journée pour tout le groupe, puis multipliez par ${days}.`,
        ],
        alternative: [
          p('Comptez en repas.'),
          p(`${people} personnes pendant ${days} jours font ${people * days} repas. Chacun coûte ${fr(perDay)} €.`),
        ],
        solution: [
          { text: 'Coût d’une journée pour le groupe.', calc: `${fr(perDay)} × ${people} = ${fr(mulR(perDay, R(people)))} €`, why: 'Le prix est le même pour chaque personne.' },
          { text: 'Coût sur toute la période.', calc: `${fr(mulR(perDay, R(people)))} × ${days} = ${fr(total)} €`, why: 'Chaque jour se ressemble.' },
        ],
        conclusion: `Le coût total est de ${fr(total)} €.`,
        placeholder: 'Exemple : 540',
        keyboard: 'decimal',
        suffix: '€',
      }
    },
  },

  // --------------------------------------------------------------- M04 ---
  {
    id: 'M04-division-decimale',
    skillId: 'M04',
    level: 'entrainement',
    structure: 'division-avec-quotient-decimal',
    version: 1,
    review: 'teste-automatiquement',
    seconds: 60,
    generate: (rng) => {
      const parts = rng.pick([2, 4, 5, 8])
      const quotient = dec(rng.int(125, 985), 2)
      const total = mulR(quotient, R(parts))
      return {
        prompt: [p(`Une somme de ${fr(total)} € est partagée équitablement entre ${parts} personnes.`)],
        question: 'Quelle est la part de chacune, en euros ?',
        answer: {
          kind: 'numeric',
          value: quotient,
          unit: '€',
          unitPolicy: 'optional',
          pitfalls: [
            { answer: fr(mulR(total, R(parts))), tag: 'raisonnement', why: 'Vous avez multiplié. Une part est forcément plus petite que la somme totale.' },
          ],
        },
        hints: [
          'Une part est plus petite que le total : l’opération est une division.',
          `Divisez ${fr(total)} par ${parts}. Le quotient peut comporter des décimales : cela ne pose aucun problème pour une somme d’argent.`,
        ],
        alternative: [
          p('Divisez en plusieurs fois.'),
          p(parts === 4 ? 'Diviser par 4, c’est diviser deux fois par 2.' : `Diviser par ${parts} peut se faire en une fois, ou en passant par des étapes plus simples.`),
        ],
        solution: [
          { text: 'Poser la division.', calc: `${fr(total)} ÷ ${parts} = ${fr(quotient)} €`, why: 'C’est un partage équitable.' },
          { text: 'Vérifier.', calc: `${parts} × ${fr(quotient)} = ${fr(total)} €`, why: 'On retrouve la somme de départ.' },
        ],
        conclusion: `Chaque part vaut ${fr(quotient)} €.`,
        placeholder: 'Exemple : 12,45',
        keyboard: 'decimal',
        suffix: '€',
      }
    },
  },
  {
    id: 'M04-reste-a-repartir',
    skillId: 'M04',
    level: 'epreuve',
    structure: 'que-faire-du-reste',
    version: 1,
    transfer: true,
    review: 'teste-automatiquement',
    seconds: 80,
    generate: (rng) => {
      const per = rng.pick([4, 6, 8])
      const groups = rng.int(5, 12)
      const rest = rng.int(1, per - 1)
      const total = per * groups + rest
      const situation = rng.pick([
        { q: `Combien de tables complètes de ${per} personnes peut-on former ?`, answer: groups, why: 'La question porte sur les tables complètes : le reste ne forme pas une table pleine.' },
        { q: `Combien de tables faut-il installer pour que tout le monde soit assis ?`, answer: groups + 1, why: 'Personne ne doit rester debout : une table supplémentaire est nécessaire pour le reste.' },
      ])
      return {
        prompt: [p(`${total} personnes sont attendues. Chaque table accueille ${per} personnes.`)],
        question: situation.q,
        answer: {
          kind: 'numeric',
          value: R(situation.answer),
          requireInteger: true,
          pitfalls: [
            {
              answer: String(situation.answer === groups ? groups + 1 : groups),
              tag: 'consigne',
              why: situation.why,
            },
          ],
        },
        hints: [
          'Le calcul est le même dans les deux cas : c’est la question qui change ce qu’on fait du reste.',
          `Divisez ${total} par ${per}, puis relisez la question pour décider du sort du reste.`,
        ],
        alternative: [
          p('Comptez table par table.'),
          p(`${per}, ${per * 2}, ${per * 3}… On s’arrête avant de dépasser ${total}. Il reste ${rest} personnes : la question dit quoi en faire.`),
        ],
        solution: [
          { text: 'Poser la division.', calc: `${total} = ${per} × ${groups} + ${rest}`, why: 'Le quotient donne les tables pleines, le reste les personnes restantes.' },
          { text: 'Relire la question.', why: situation.why },
        ],
        conclusion: `Réponse : ${situation.answer} tables.`,
        placeholder: 'Nombre de tables',
        keyboard: 'decimal',
      }
    },
  },

  // --------------------------------------------------------------- M05 ---
  {
    id: 'M05-trois-operations',
    skillId: 'M05',
    level: 'epreuve',
    structure: 'expression-a-trois-operations',
    version: 1,
    review: 'teste-automatiquement',
    seconds: 75,
    generate: (rng) => {
      const a = rng.int(20, 60)
      const b = rng.int(2, 9)
      const c = rng.int(2, 9)
      const exact = R(a + b * c - c)
      return {
        prompt: [p('Calculez en respectant l’ordre des opérations.')],
        question: `${a} + ${b} × ${c} − ${c} = ?`,
        answer: {
          kind: 'numeric',
          value: exact,
          pitfalls: [
            { answer: String((a + b) * c - c), tag: 'operation', why: `Vous avez calculé de gauche à droite : (${a} + ${b}) × ${c}. La multiplication passe avant l’addition.` },
            { answer: String(a + b * (c - c)), tag: 'operation', why: `Vous avez traité « ${c} − ${c} » comme un bloc. Sans parenthèses, la soustraction se fait en dernier, après la multiplication.` },
          ],
        },
        hints: [
          'Repérez d’abord l’opération prioritaire.',
          `Calculez ${b} × ${c}, puis effectuez l’addition et la soustraction de gauche à droite.`,
        ],
        alternative: [
          p('Écrivez vous-même les parenthèses manquantes.'),
          p(`${a} + ${b} × ${c} − ${c} signifie ${a} + (${b} × ${c}) − ${c}.`),
        ],
        solution: [
          { text: 'Multiplication d’abord.', calc: `${b} × ${c} = ${b * c}`, why: 'Elle est prioritaire.' },
          { text: 'Puis addition et soustraction, de gauche à droite.', calc: `${a} + ${b * c} − ${c} = ${fr(exact)}`, why: 'Elles sont de même niveau : on les effectue dans l’ordre d’écriture.' },
        ],
        placeholder: 'Résultat',
        keyboard: 'decimal',
      }
    },
  },
  {
    id: 'M05-arrondi-unite',
    skillId: 'M05',
    level: 'decouverte',
    structure: 'arrondir-a-l-unite',
    version: 1,
    review: 'teste-automatiquement',
    seconds: 40,
    generate: (rng) => {
      const cents = rng.int(150, 9950)
      const v = dec(cents, 2)
      const rounded = roundR(v, 0)
      return {
        prompt: [p(`Un relevé indique ${fr(v)}.`)],
        question: 'Arrondissez ce nombre à l’unité.',
        answer: {
          kind: 'numeric',
          value: rounded,
          rounding: { places: 0, label: 'un arrondi à l’unité' },
          pitfalls: [
            { answer: String(Math.floor(cents / 100)), tag: 'arrondi', why: 'Vous avez supprimé les décimales au lieu d’arrondir. Regardez le chiffre des dixièmes : s’il vaut 5 ou plus, on monte.' },
          ],
        },
        hints: [
          'Arrondir n’est pas supprimer les décimales : c’est choisir le nombre entier le plus proche.',
          'Regardez le chiffre des dixièmes. S’il vaut 5 ou plus, la partie entière augmente de 1.',
        ],
        alternative: [
          p('Encadrez le nombre.'),
          p(`${fr(v)} est compris entre ${Math.floor(cents / 100)} et ${Math.floor(cents / 100) + 1}. Le plus proche des deux est ${fr(rounded)}.`),
        ],
        solution: [
          { text: 'Regarder le chiffre des dixièmes.', why: 'C’est lui qui décide.' },
          { text: 'Choisir l’entier le plus proche.', calc: `${fr(v)} ≈ ${fr(rounded)}`, why: 'Par convention, 5 fait monter.' },
        ],
        placeholder: 'Nombre entier',
        keyboard: 'decimal',
      }
    },
  },

  // --------------------------------------------------------------- M06 ---
  {
    id: 'M06-retrouver-le-tout',
    skillId: 'M06',
    level: 'epreuve',
    structure: 'retrouver-le-tout-a-partir-d-une-fraction',
    version: 1,
    transfer: true,
    review: 'teste-automatiquement',
    seconds: 85,
    generate: (rng) => {
      const den = rng.pick([3, 4, 5, 6])
      const num = rng.int(1, den - 1)
      const unit = rng.int(6, 22)
      const part = num * unit
      const total = den * unit
      return {
        prompt: [p(`${part} personnes ont répondu à une enquête, ce qui représente ${num}/${den} du groupe.`)],
        question: 'Combien de personnes compte le groupe entier ?',
        answer: {
          kind: 'numeric',
          value: R(total),
          pitfalls: [
            { answer: String(part * den), tag: 'raisonnement', why: `Vous avez multiplié la part par ${den}. Mais cette part représente ${num} parts, pas une seule : il faut d’abord trouver ce que vaut une part.` },
          ],
        },
        hints: [
          `Les ${part} personnes correspondent à ${num} parts sur ${den}.`,
          `Cherchez d’abord ce que vaut une seule part : divisez ${part} par ${num}. Multipliez ensuite par ${den}.`,
        ],
        alternative: [
          p('Raisonnez avec un schéma.'),
          p(
            `Dessinez ${den} cases égales. ${num} cases contiennent ${part} personnes, donc une case en contient ${unit}. Les ${den} cases en contiennent ${total}.`,
          ),
        ],
        solution: [
          { text: 'Valeur d’une part.', calc: `${part} ÷ ${num} = ${unit}`, why: `Les ${part} personnes représentent ${num} parts.` },
          { text: 'Valeur du tout.', calc: `${unit} × ${den} = ${total}`, why: 'Le tout compte toutes les parts.' },
          { text: 'Vérifier.', calc: `${num}/${den} de ${total} = ${part}`, why: 'On retombe sur la donnée de départ.' },
        ],
        conclusion: `Le groupe compte ${total} personnes.`,
        placeholder: 'Nombre de personnes',
        keyboard: 'decimal',
      }
    },
  },
  {
    id: 'M06-fraction-de-duree',
    skillId: 'M06',
    level: 'entrainement',
    structure: 'fraction-d-une-duree',
    version: 1,
    review: 'teste-automatiquement',
    seconds: 55,
    generate: (rng) => {
      const f = rng.pick([
        { num: 1, den: 2, mot: 'la moitié' },
        { num: 1, den: 4, mot: 'le quart' },
        { num: 3, den: 4, mot: 'les trois quarts' },
        { num: 1, den: 3, mot: 'le tiers' },
      ])
      const hours = rng.pick([1, 2, 3])
      const totalMin = hours * 60
      const part = (totalMin / f.den) * f.num
      return {
        prompt: [p(`Une activité dure ${hours} heure${hours > 1 ? 's' : ''}.`)],
        question: `Combien de temps représente ${f.mot} de cette durée ?`,
        answer: {
          kind: 'duration',
          minutes: R(part),
          display: 'hm',
          pitfalls: [
            { answer: `${f.num * hours} h`, tag: 'raisonnement', why: `Vous avez appliqué la fraction au nombre d’heures sans tenir compte du dénominateur. ${f.mot} de ${totalMin} minutes vaut ${part} minutes.` },
          ],
        },
        hints: [
          `Convertissez d’abord la durée en minutes : ${hours} h = ${totalMin} min.`,
          `Divisez ${totalMin} par ${f.den}, puis multipliez par ${f.num}.`,
        ],
        alternative: [
          p('Passez par des repères connus.'),
          p('La moitié d’une heure est 30 min, le quart 15 min, les trois quarts 45 min. Il suffit ensuite de multiplier par le nombre d’heures.'),
        ],
        solution: [
          { text: 'Convertir en minutes.', calc: `${hours} h = ${totalMin} min`, why: 'Une heure vaut 60 minutes.' },
          { text: 'Prendre la fraction.', calc: `${totalMin} ÷ ${f.den} × ${f.num} = ${part} min`, why: 'Le dénominateur découpe, le numérateur compte les parts.' },
        ],
        conclusion: `${f.mot.charAt(0).toUpperCase() + f.mot.slice(1)} de ${hours} h vaut ${formatHM(part)}.`,
        placeholder: 'Exemple : 45 min',
        keyboard: 'text',
      }
    },
  },

  // --------------------------------------------------------------- M08 ---
  {
    id: 'M08-consommation-proportionnelle',
    skillId: 'M08',
    level: 'entrainement',
    structure: 'consommation-proportionnelle-sur-une-duree',
    version: 1,
    review: 'teste-automatiquement',
    seconds: 70,
    generate: (rng) => {
      const perDay = dec(rng.pick([15, 25, 5, 75, 125]), 1)
      const days = rng.int(4, 14)
      const total = mulR(perDay, R(days))
      return {
        prompt: [p(`Une consommation quotidienne régulière s’élève à ${fr(perDay)} L par jour.`)],
        question: `Quelle quantité est consommée en ${days} jours, en litres ?`,
        answer: {
          kind: 'numeric',
          value: total,
          unit: 'L',
          unitPolicy: 'optional',
          pitfalls: [
            { answer: fr(addR(perDay, R(days))), tag: 'raisonnement', why: 'Vous avez additionné la consommation et le nombre de jours. Ce sont deux grandeurs différentes : la consommation se répète chaque jour, donc on multiplie.' },
          ],
        },
        hints: [
          'La même quantité se répète chaque jour.',
          `Multipliez ${fr(perDay)} par ${days}.`,
        ],
        alternative: [
          p('Vérifiez par un ordre de grandeur.'),
          p(`Sur 10 jours, on consommerait ${fr(mulR(perDay, R(10)))} L. Le résultat pour ${days} jours doit être ${days > 10 ? 'un peu plus' : 'un peu moins'}.`),
        ],
        solution: [
          { text: 'Multiplier la consommation quotidienne par la durée.', calc: `${fr(perDay)} × ${days} = ${fr(total)} L`, why: 'La situation est proportionnelle.' },
        ],
        conclusion: `La consommation totale est de ${fr(total)} L.`,
        placeholder: 'Exemple : 10,5',
        keyboard: 'decimal',
        suffix: 'L',
      }
    },
  },
  {
    id: 'M08-quatrieme-proportionnelle',
    skillId: 'M08',
    level: 'epreuve',
    structure: 'quatrieme-proportionnelle-inverse',
    version: 1,
    transfer: true,
    review: 'teste-automatiquement',
    seconds: 95,
    generate: (rng) => {
      const unitPrice = dec(rng.pick([120, 150, 250, 300, 450]), 2)
      const budget = R(rng.pick([60, 90, 120, 150, 180]))
      const exact = divR(budget, unitPrice)
      const count = Math.floor(Number(exact.n) / Number(exact.d))
      return {
        prompt: [p(`Un article coûte ${fr(unitPrice)} €. On dispose de ${fr(budget)} €.`)],
        question: 'Combien d’articles entiers peut-on acheter au maximum ?',
        answer: {
          kind: 'numeric',
          value: R(count),
          requireInteger: true,
          pitfalls: [
            { answer: String(count + 1), tag: 'raisonnement', why: `Avec ${count + 1} articles, le total serait de ${fr(mulR(unitPrice, R(count + 1)))} €, ce qui dépasse le budget.` },
            ...(exact.d === 1n
              ? []
              : [{ answer: fr(exact, 2), tag: 'raisonnement' as const, why: 'On ne peut pas acheter une fraction d’article : il faut arrondir vers le bas.' }]),
          ],
        },
        hints: [
          'Cherchez combien de fois le prix d’un article tient dans le budget.',
          `Divisez ${fr(budget)} par ${fr(unitPrice)}, puis arrondissez vers le bas : le budget ne peut pas être dépassé.`,
        ],
        alternative: [
          p('Avancez par paliers.'),
          p(`10 articles coûteraient ${fr(mulR(unitPrice, R(10)))} €. Ajustez ensuite vers le haut ou vers le bas.`),
        ],
        solution: [
          { text: 'Diviser le budget par le prix unitaire.', calc: `${fr(budget)} ÷ ${fr(unitPrice)} = ${fr(exact, 4)}`, why: 'On cherche combien d’articles tiennent dans le budget.' },
          { text: 'Arrondir vers le bas.', calc: `${count} articles`, why: 'Contrairement au cas des conditionnements, ici le budget est une limite à ne pas dépasser.' },
          { text: 'Vérifier.', calc: `${count} × ${fr(unitPrice)} = ${fr(mulR(unitPrice, R(count)))} € ≤ ${fr(budget)} €`, why: 'Le budget est respecté.' },
        ],
        conclusion: `On peut acheter ${count} articles.`,
        placeholder: 'Nombre d’articles',
        keyboard: 'decimal',
      }
    },
  },

  // --------------------------------------------------------------- M09 ---
  {
    id: 'M09-part-en-fraction-et-pourcent',
    skillId: 'M09',
    level: 'entrainement',
    structure: 'passer-d-une-fraction-a-un-pourcentage',
    version: 1,
    review: 'teste-automatiquement',
    seconds: 55,
    generate: (rng) => {
      const f = rng.pick([
        { num: 1, den: 2, pct: 50 },
        { num: 1, den: 4, pct: 25 },
        { num: 3, den: 4, pct: 75 },
        { num: 1, den: 5, pct: 20 },
        { num: 2, den: 5, pct: 40 },
        { num: 1, den: 10, pct: 10 },
        { num: 3, den: 10, pct: 30 },
      ])
      return {
        prompt: [p(`Une part représente ${f.num}/${f.den} d’un ensemble.`)],
        question: 'Quel pourcentage cela représente-t-il ?',
        answer: {
          kind: 'numeric',
          value: R(f.pct),
          pitfalls: [
            { answer: String(f.num * f.den), tag: 'operation', why: 'Vous avez multiplié le numérateur par le dénominateur. Un pourcentage s’obtient en divisant, puis en multipliant par 100.' },
          ],
        },
        hints: [
          'Un pourcentage est une proportion rapportée à 100.',
          `Divisez ${f.num} par ${f.den}, puis multipliez par 100.`,
        ],
        alternative: [
          p('Cherchez une fraction équivalente sur 100.'),
          p(`${f.num}/${f.den} = ${f.pct}/100, ce qui se lit directement ${f.pct} %.`),
        ],
        solution: [
          { text: 'Calculer la proportion.', calc: `${f.num} ÷ ${f.den} = ${fr(R(f.num, f.den), 4)}`, why: 'Le trait de fraction est une division.' },
          { text: 'Exprimer pour 100.', calc: `× 100 = ${f.pct} %`, why: 'C’est la définition du pourcentage.' },
        ],
        conclusion: `${f.num}/${f.den} correspond à ${f.pct} %.`,
        placeholder: 'Exemple : 25',
        keyboard: 'decimal',
        suffix: '%',
      }
    },
  },
  {
    id: 'M09-reduction',
    skillId: 'M09',
    level: 'epreuve',
    structure: 'prix-apres-remise',
    version: 1,
    transfer: true,
    review: 'teste-automatiquement',
    seconds: 85,
    generate: (rng) => {
      const rate = rng.pick([10, 20, 25, 30])
      const price = rng.pick([40, 60, 80, 120, 160, 200])
      const discount = (price * rate) / 100
      const final = price - discount
      return {
        prompt: [p(`Un article coûte ${frInt(price)} €. Une remise de ${rate} % est appliquée.`)],
        question: 'Quel est le prix à payer, en euros ?',
        answer: {
          kind: 'numeric',
          value: R(final),
          unit: '€',
          unitPolicy: 'optional',
          pitfalls: [
            { answer: String(discount), tag: 'consigne', why: `${discount} € est le montant de la remise, pas le prix à payer. Il faut retirer la remise du prix de départ.` },
            { answer: String(price + discount), tag: 'raisonnement', why: 'Une remise diminue le prix : elle ne s’ajoute pas.' },
          ],
        },
        hints: [
          'Calculez d’abord le montant de la remise.',
          `${rate} % de ${frInt(price)} €, puis retirez ce montant du prix de départ.`,
        ],
        alternative: [
          p('Passez par le coefficient.'),
          p(`Une remise de ${rate} % revient à payer ${100 - rate} % du prix, soit ${frInt(price)} × ${fr(R(100 - rate, 100))} = ${final} €.`),
        ],
        solution: [
          { text: 'Montant de la remise.', calc: `${rate} % de ${frInt(price)} = ${discount} €`, why: 'La remise s’applique au prix de départ.' },
          { text: 'Prix à payer.', calc: `${frInt(price)} − ${discount} = ${final} €`, why: 'La remise se retire du prix.' },
        ],
        conclusion: `Le prix à payer est de ${final} €.`,
        placeholder: 'Exemple : 48',
        keyboard: 'decimal',
        suffix: '€',
      }
    },
  },

  // --------------------------------------------------------------- M10 ---
  {
    id: 'M10-perimetre-unites-mixtes',
    skillId: 'M10',
    level: 'epreuve',
    structure: 'somme-de-longueurs-en-unites-mixtes',
    version: 1,
    transfer: true,
    review: 'teste-automatiquement',
    seconds: 85,
    generate: (rng) => {
      const m = dec(rng.int(12, 48), 1)
      const cm = R(rng.int(15, 95))
      const mm = R(rng.int(100, 900))
      const totalCm = addR(addR(convert(m, U('m'), U('cm')), cm), convert(mm, U('mm'), U('cm')))
      return {
        prompt: [p(`Trois morceaux mesurent respectivement ${fr(m)} m, ${fr(cm)} cm et ${fr(mm)} mm.`)],
        question: 'Quelle est la longueur totale, en centimètres ?',
        answer: {
          kind: 'numeric',
          value: totalCm,
          unit: 'cm',
          unitPolicy: 'optional',
          pitfalls: [
            { answer: fr(addR(addR(m, cm), mm)), tag: 'unite', why: 'Vous avez additionné des mètres, des centimètres et des millimètres sans convertir. Les trois nombres ne mesurent pas la même chose.' },
          ],
        },
        hints: [
          'Choisissez une unité commune avant d’additionner : la question demande des centimètres.',
          `${fr(m)} m = ${fr(convert(m, U('m'), U('cm')))} cm, et ${fr(mm)} mm = ${fr(convert(mm, U('mm'), U('cm')))} cm.`,
        ],
        alternative: [
          p('Convertissez tout en millimètres.'),
          p(`Vous obtenez ${fr(convert(totalCm, U('cm'), U('mm')))} mm, soit ${fr(totalCm)} cm. Le résultat est identique.`),
        ],
        solution: [
          { text: 'Convertir les mètres.', calc: `${fr(m)} m = ${fr(convert(m, U('m'), U('cm')))} cm`, why: '1 m vaut 100 cm.' },
          { text: 'Convertir les millimètres.', calc: `${fr(mm)} mm = ${fr(convert(mm, U('mm'), U('cm')))} cm`, why: '10 mm valent 1 cm.' },
          { text: 'Additionner.', calc: `= ${fr(totalCm)} cm`, why: 'Les trois longueurs sont maintenant comparables.' },
        ],
        conclusion: `La longueur totale est de ${fr(totalCm)} cm.`,
        placeholder: 'Valeur en cm',
        keyboard: 'decimal',
        suffix: 'cm',
      }
    },
  },

  // --------------------------------------------------------------- M11 ---
  {
    id: 'M11-capacite-totale',
    skillId: 'M11',
    level: 'entrainement',
    structure: 'capacite-totale-d-un-lot',
    version: 1,
    review: 'teste-automatiquement',
    seconds: 65,
    generate: (rng) => {
      const perBottle = rng.pick([R(25, 100), R(33, 100), R(5, 10), R(75, 100), R(15, 10)])
      const count = rng.int(6, 24)
      const totalL = mulR(perBottle, R(count))
      return {
        prompt: [p(`Un carton contient ${count} bouteilles de ${fr(perBottle)} L.`)],
        question: 'Quel volume total contient le carton, en litres ?',
        answer: {
          kind: 'numeric',
          value: totalL,
          unit: 'L',
          unitPolicy: 'optional',
          pitfalls: [
            { answer: fr(divR(R(count), perBottle), 2), tag: 'raisonnement', why: 'Vous avez divisé. Le volume total est plus grand que celui d’une bouteille : on multiplie.' },
          ],
        },
        hints: [
          'Le même volume se répète pour chaque bouteille.',
          `Multipliez ${fr(perBottle)} par ${count}.`,
        ],
        alternative: [
          p('Comptez en millilitres.'),
          p(`${fr(perBottle)} L = ${fr(convert(perBottle, U('L'), U('mL')))} mL. Multiplié par ${count}, cela donne ${fr(convert(totalL, U('L'), U('mL')))} mL, soit ${fr(totalL)} L.`),
        ],
        solution: [
          { text: 'Multiplier.', calc: `${fr(perBottle)} × ${count} = ${fr(totalL)} L`, why: 'Chaque bouteille contient la même quantité.' },
        ],
        conclusion: `Le carton contient ${fr(totalL)} L.`,
        placeholder: 'Exemple : 9',
        keyboard: 'decimal',
        suffix: 'L',
      }
    },
  },
  {
    id: 'M11-verres-par-bouteille',
    skillId: 'M11',
    level: 'epreuve',
    structure: 'nombre-de-portions-dans-un-contenant',
    version: 1,
    transfer: true,
    review: 'teste-automatiquement',
    seconds: 80,
    generate: (rng) => {
      const bottleL = rng.pick([R(1), R(15, 10), R(2), R(75, 100)])
      const glassMl = rng.pick([150, 200, 250])
      const bottleMl = convert(bottleL, U('L'), U('mL'))
      const exact = divR(bottleMl, R(glassMl))
      const full = Math.floor(Number(exact.n) / Number(exact.d))
      return {
        prompt: [p(`Une bouteille contient ${fr(bottleL)} L. Chaque verre contient ${glassMl} mL.`)],
        question: 'Combien de verres pleins peut-on servir avec une bouteille ?',
        answer: {
          kind: 'numeric',
          value: R(full),
          requireInteger: true,
          pitfalls: [
            { answer: fr(bottleMl), tag: 'consigne', why: 'C’est le volume de la bouteille en millilitres, pas le nombre de verres.' },
            ...(exact.d === 1n
              ? []
              : [{ answer: fr(exact, 2), tag: 'raisonnement' as const, why: 'Un verre plein est un verre entier : on arrondit vers le bas.' }]),
          ],
        },
        hints: [
          'Les deux volumes ne sont pas dans la même unité : commencez par les rendre comparables.',
          `${fr(bottleL)} L = ${fr(bottleMl)} mL. Divisez ensuite par ${glassMl}.`,
        ],
        alternative: [
          p('Comptez verre par verre.'),
          p(`1 verre : ${glassMl} mL. 2 verres : ${glassMl * 2} mL. On continue jusqu’à approcher ${fr(bottleMl)} mL sans le dépasser.`),
        ],
        solution: [
          { text: 'Convertir la bouteille.', calc: `${fr(bottleL)} L = ${fr(bottleMl)} mL`, why: '1 L vaut 1 000 mL.' },
          { text: 'Diviser par la contenance d’un verre.', calc: `${fr(bottleMl)} ÷ ${glassMl} = ${fr(exact, 3)}`, why: 'On cherche combien de verres tiennent dans la bouteille.' },
          { text: `Arrondir vers le bas : ${full} verres pleins.`, why: 'Un verre incomplet n’est pas un verre plein.' },
        ],
        conclusion: `On peut servir ${full} verres pleins.`,
        placeholder: 'Nombre de verres',
        keyboard: 'decimal',
      }
    },
  },

  // --------------------------------------------------------------- M12 ---
  {
    id: 'M12-heure-de-depart',
    skillId: 'M12',
    level: 'entrainement',
    structure: 'heure-de-depart-a-retrouver',
    version: 1,
    review: 'teste-automatiquement',
    seconds: 70,
    generate: (rng) => {
      const arrival = rng.int(8, 20) * 60 + rng.pick([0, 15, 30, 45])
      const duration = rng.int(1, 3) * 60 + rng.pick([10, 20, 25, 35, 40, 50])
      const start = ((arrival - duration) % 1440 + 1440) % 1440
      return {
        prompt: [p(`Un rendez-vous a lieu à ${clock(arrival)}. Le trajet dure ${formatHM(duration)}.`)],
        question: 'À quelle heure faut-il partir pour arriver à l’heure ?',
        answer: {
          kind: 'clock',
          minutesOfDay: start,
          pitfalls: [
            { answer: clock((arrival + duration) % 1440), tag: 'raisonnement', why: 'Vous avez ajouté la durée. Pour retrouver l’heure de départ, il faut la retirer de l’heure d’arrivée.' },
          ],
        },
        hints: [
          'On cherche un point de départ : on remonte le temps.',
          `Retirez d’abord les heures entières de ${clock(arrival)}, puis les minutes.`,
        ],
        alternative: [
          p('Comptez en minutes depuis minuit.'),
          p(`${clock(arrival)} correspond à ${frInt(arrival)} min. On retire ${frInt(duration)} min, ce qui donne ${frInt(start)} min, soit ${clock(start)}.`),
        ],
        solution: [
          { text: 'Retirer les heures.', calc: `${clock(arrival)} − ${Math.floor(duration / 60)} h = ${clock(((arrival - Math.floor(duration / 60) * 60) % 1440 + 1440) % 1440)}`, why: 'Les heures se retirent directement.' },
          { text: 'Retirer les minutes.', calc: `− ${duration % 60} min → ${clock(start)}`, why: 'Si les minutes manquent, on emprunte une heure.' },
        ],
        conclusion: `Il faut partir à ${clock(start)}.`,
        placeholder: 'Exemple : 14 h 30',
        keyboard: 'text',
      }
    },
  },
  {
    id: 'M12-duree-avec-pause',
    skillId: 'M12',
    level: 'epreuve',
    structure: 'duree-de-travail-hors-pause',
    version: 1,
    transfer: true,
    review: 'teste-automatiquement',
    seconds: 95,
    generate: (rng) => {
      const start = rng.int(6, 9) * 60 + rng.pick([0, 15, 30, 45])
      const total = rng.int(6, 9) * 60 + rng.pick([0, 15, 30])
      const pause = rng.pick([30, 45, 60])
      const end = start + total
      const worked = total - pause
      return {
        prompt: [
          p(`Une journée de travail fictive commence à ${clock(start)} et se termine à ${clock(end % 1440)}, avec une pause de ${pause} minutes.`),
          vis({
            type: 'timeline',
            from: Math.floor(start / 60) * 60,
            to: Math.ceil(end / 60) * 60,
            marks: [
              { at: start, label: clock(start), strong: true },
              { at: end, label: clock(end % 1440), strong: true },
            ],
            spans: [{ from: start, to: end, label: 'présence' }],
            caption: 'La présence inclut la pause ; le temps travaillé ne l’inclut pas.',
          }),
        ],
        question: 'Quel est le temps de travail effectif, hors pause ?',
        answer: {
          kind: 'duration',
          minutes: R(worked),
          display: 'hm',
          pitfalls: [
            { answer: formatHM(total), tag: 'consigne', why: 'C’est la durée de présence. La question porte sur le temps de travail, qui exclut la pause.' },
          ],
        },
        hints: [
          'Calculez d’abord la durée entre le début et la fin.',
          `Retirez ensuite les ${pause} minutes de pause.`,
        ],
        alternative: [
          p('Procédez en deux temps.'),
          p(`De ${clock(start)} à ${clock(end % 1440)}, il y a ${formatHM(total)}. En retirant ${pause} min, il reste ${formatHM(worked)}.`),
        ],
        solution: [
          { text: 'Durée de présence.', calc: `${clock(start)} → ${clock(end % 1440)} : ${formatHM(total)}`, why: 'On avance par paliers depuis l’heure de début.' },
          { text: 'Retirer la pause.', calc: `${formatHM(total)} − ${pause} min = ${formatHM(worked)}`, why: 'La pause ne compte pas comme temps de travail.' },
        ],
        conclusion: `Le temps de travail effectif est de ${formatHM(worked)}.`,
        placeholder: 'Exemple : 7 h 15',
        keyboard: 'text',
      }
    },
  },

  // --------------------------------------------------------------- M13 ---
  {
    id: 'M13-double-entree',
    skillId: 'M13',
    level: 'entrainement',
    structure: 'lire-un-tableau-a-double-entree',
    version: 1,
    review: 'teste-automatiquement',
    seconds: 65,
    generate: (rng) => {
      const rows = ['Matin', 'Après-midi', 'Soir']
      const cols = rng.sample(['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi'], 3)
      const grid = rows.map(() => cols.map(() => rng.int(5, 40)))
      const ci = rng.int(0, 2)
      const totalCol = grid.reduce((n, r) => n + r[ci]!, 0)
      return {
        prompt: [
          p('Nombre d’appels reçus par un accueil fictif.'),
          vis({
            type: 'table',
            headers: ['Moment', ...cols],
            rows: rows.map((r, i) => [r, ...grid[i]!.map(String)]),
            align: ['left', 'right', 'right', 'right'],
          }),
        ],
        question: `Combien d’appels ont été reçus au total le ${cols[ci]} ?`,
        answer: {
          kind: 'numeric',
          value: R(totalCol),
          pitfalls: [
            { answer: String(grid[0]![ci]), tag: 'consigne', why: 'Vous n’avez lu qu’une seule case. La question porte sur le total de la journée, donc sur les trois moments.' },
          ],
        },
        hints: [
          'Un total de journée se lit sur toute une colonne.',
          `Additionnez les trois valeurs de la colonne « ${cols[ci]} ».`,
        ],
        alternative: [
          p('Recopiez la colonne à part.'),
          p(`Matin, après-midi, soir : ${grid.map((r) => r[ci]).join(', ')}. Il ne reste qu’à additionner.`),
        ],
        solution: [
          { text: 'Repérer la colonne.', why: 'Une double entrée se lit au croisement d’une ligne et d’une colonne.' },
          { text: 'Additionner les trois moments.', calc: `${grid.map((r) => r[ci]).join(' + ')} = ${totalCol}`, why: 'La journée est la somme de ses moments.' },
        ],
        conclusion: `${totalCol} appels ont été reçus le ${cols[ci]}.`,
        placeholder: 'Nombre',
        keyboard: 'decimal',
      }
    },
  },
  {
    id: 'M13-comparer-moyennes',
    skillId: 'M13',
    level: 'epreuve',
    structure: 'comparer-deux-moyennes',
    version: 1,
    transfer: true,
    review: 'teste-automatiquement',
    seconds: 95,
    generate: (rng) => {
      const meanA = rng.int(20, 40)
      const meanB = meanA + rng.pick([3, 5, 8])
      const a = [meanA - 4, meanA, meanA + 4]
      const b = [meanB - 6, meanB, meanB + 6]
      return {
        prompt: [
          p('Deux services fictifs relèvent le nombre d’entretiens réalisés sur trois semaines.'),
          vis({
            type: 'table',
            headers: ['Service', 'Semaine 1', 'Semaine 2', 'Semaine 3'],
            rows: [
              ['Service A', ...a.map(String)],
              ['Service B', ...b.map(String)],
            ],
            align: ['left', 'right', 'right', 'right'],
          }),
        ],
        question: 'Quelle est la moyenne hebdomadaire du service B ?',
        answer: {
          kind: 'numeric',
          value: R(meanB),
          pitfalls: [
            { answer: String(b.reduce((x, y) => x + y, 0)), tag: 'consigne', why: 'Vous avez donné le total. Une moyenne s’obtient en divisant ce total par le nombre de semaines.' },
            { answer: String(meanA), tag: 'consigne', why: 'C’est la moyenne du service A. La question porte sur le service B.' },
          ],
        },
        hints: [
          'Repérez d’abord la bonne ligne du tableau.',
          `Additionnez les trois valeurs du service B, puis divisez par 3.`,
        ],
        alternative: [
          p('Utilisez la valeur centrale.'),
          p(`Les trois valeurs du service B sont réparties symétriquement autour de ${meanB} : la moyenne est donc ${meanB}. Vérifiez ensuite par le calcul.`),
        ],
        solution: [
          { text: 'Additionner la ligne du service B.', calc: `${b.join(' + ')} = ${b.reduce((x, y) => x + y, 0)}`, why: 'La moyenne part du total.' },
          { text: 'Diviser par 3.', calc: `${b.reduce((x, y) => x + y, 0)} ÷ 3 = ${meanB}`, why: 'Trois semaines relevées.' },
          { text: 'Contrôler.', why: `La moyenne doit se situer entre ${Math.min(...b)} et ${Math.max(...b)}.` },
        ],
        conclusion: `La moyenne du service B est de ${meanB} entretiens par semaine.`,
        placeholder: 'Nombre',
        keyboard: 'decimal',
      }
    },
  },

  // --------------------------------------------------------------- M14 ---
  {
    id: 'M14-verifier-une-solution',
    skillId: 'M14',
    level: 'entrainement',
    structure: 'verifier-une-valeur-proposee',
    version: 1,
    review: 'teste-automatiquement',
    seconds: 65,
    generate: (rng) => {
      const a = rng.int(3, 9)
      const b = rng.int(5, 30)
      const x = rng.int(4, 15)
      const c = a * x + b
      const wrong = x + rng.pick([1, 2, 3])
      return {
        prompt: [
          p(`On cherche le nombre qui vérifie : ${a} × ? + ${b} = ${c}.`),
          p(`Une candidate propose ${wrong}.`),
        ],
        question: 'Sa proposition est-elle correcte ?',
        answer: {
          kind: 'choice',
          options: [
            {
              id: 'non',
              label: `Non : ${a} × ${wrong} + ${b} donne ${a * wrong + b}, pas ${c}`,
            },
            {
              id: 'oui',
              label: 'Oui, la proposition vérifie l’égalité',
              feedback: `Non : en remplaçant, on obtient ${a} × ${wrong} + ${b} = ${a * wrong + b}, alors que l’énoncé annonce ${c}.`,
              tag: 'raisonnement',
            },
          ],
          correct: ['non'],
        },
        hints: [
          'Vérifier une proposition ne demande pas de résoudre : il suffit de remplacer.',
          `Remplacez le point d’interrogation par ${wrong} et calculez.`,
        ],
        alternative: [
          p('Résolvez pour comparer.'),
          p(`En retirant ${b} puis en divisant par ${a}, on trouve ${x}. La proposition était ${wrong}.`),
        ],
        solution: [
          { text: 'Remplacer et calculer.', calc: `${a} × ${wrong} + ${b} = ${a * wrong + b}`, why: 'C’est la vérification la plus rapide.' },
          { text: 'Comparer au résultat annoncé.', calc: `${a * wrong + b} ≠ ${c}`, why: 'La proposition ne convient donc pas.' },
          { text: 'La bonne valeur.', calc: `(${c} − ${b}) ÷ ${a} = ${x}`, why: 'On défait les opérations dans l’ordre inverse.' },
        ],
      }
    },
  },

  // --------------------------------------------------------------- M15 ---
  {
    id: 'M15-taux-et-conditionnement',
    skillId: 'M15',
    level: 'epreuve',
    structure: 'pourcentage-puis-conditionnement',
    version: 1,
    transfer: true,
    review: 'teste-automatiquement',
    seconds: 120,
    generate: (rng) => {
      const total = rng.pick([120, 160, 200, 240, 300])
      const rate = rng.pick([25, 40, 50, 75])
      const concerned = (total * rate) / 100
      const perBox = rng.pick([12, 15, 20])
      const boxes = Math.ceil(concerned / perBox)
      return {
        prompt: [
          p(
            `Une structure accueille ${frInt(total)} personnes. ${rate} % d’entre elles participent à un atelier. Chaque participant reçoit un livret, conditionné par paquets de ${perBox}.`,
          ),
        ],
        question: 'Combien de paquets de livrets faut-il commander ?',
        answer: {
          kind: 'numeric',
          value: R(boxes),
          requireInteger: true,
          pitfalls: [
            { answer: String(concerned), tag: 'consigne', why: 'C’est le nombre de participants, pas le nombre de paquets.' },
            { answer: String(Math.ceil(total / perBox)), tag: 'consigne', why: `Vous avez compté un livret pour les ${frInt(total)} personnes accueillies. Seules ${rate} % participent à l’atelier.` },
          ],
        },
        hints: [
          'Trois étapes : le nombre de participants, puis le nombre de livrets, puis le nombre de paquets.',
          `Calculez ${rate} % de ${frInt(total)}, puis divisez par ${perBox} et arrondissez au-dessus.`,
        ],
        alternative: [
          p('Vérifiez chaque étape par un ordre de grandeur.'),
          p(`${rate} % de ${frInt(total)} est ${rate < 50 ? 'moins' : rate > 50 ? 'plus' : 'exactement'} que la moitié : ${concerned} est cohérent. Il faut ensuite un peu plus de ${Math.floor(concerned / perBox)} paquets.`),
        ],
        solution: [
          { text: 'Nombre de participants.', calc: `${rate} % de ${frInt(total)} = ${concerned}`, why: 'Le pourcentage s’applique au total accueilli.' },
          { text: 'Nombre de paquets nécessaires.', calc: `${concerned} ÷ ${perBox} = ${fr(divR(R(concerned), R(perBox)), 3)}`, why: 'Un livret par participant.' },
          { text: `Arrondir au-dessus : ${boxes} paquets.`, why: 'Un paquet s’achète entier ; il ne doit manquer aucun livret.' },
        ],
        conclusion: `Il faut commander ${boxes} paquets.`,
        placeholder: 'Nombre de paquets',
        keyboard: 'decimal',
      }
    },
  },

  // --------------------------------------------------------------- M16 ---
  {
    id: 'M16-choisir-le-resultat-plausible',
    skillId: 'M16',
    level: 'entrainement',
    structure: 'choisir-entre-deux-resultats',
    version: 1,
    review: 'teste-automatiquement',
    seconds: 55,
    generate: (rng) => {
      const cases = [
        {
          q: 'Une personne parcourt 12 km en 2 heures. Quelle vitesse moyenne ?',
          ok: '6 km/h',
          ko: '24 km/h',
          why: '24 km/h correspondrait à une multiplication : on parcourrait 48 km en 2 heures, ce qui contredit l’énoncé.',
        },
        {
          q: 'Un flacon de 250 mL est réparti en doses de 25 mL. Combien de doses ?',
          ok: '10 doses',
          ko: '6 250 doses',
          why: '6 250 vient d’une multiplication : le nombre de doses ne peut pas dépasser le volume total exprimé dans la même unité.',
        },
        {
          q: 'Un budget de 200 € est réduit de 10 %. Quel est le nouveau montant ?',
          ok: '180 €',
          ko: '220 €',
          why: 'Une réduction diminue le montant : 220 € correspondrait à une hausse.',
        },
        {
          q: 'Une recette pour 4 personnes demande 200 g. Combien pour 2 personnes ?',
          ok: '100 g',
          ko: '400 g',
          why: 'Deux fois moins de personnes demandent deux fois moins d’ingrédient, pas deux fois plus.',
        },
      ]
      const c = rng.pick(cases)
      const options = rng.shuffle([c.ok, c.ko])
      return {
        prompt: [p(c.q), p('Deux résultats sont proposés. Un seul est plausible.')],
        question: 'Quel résultat retenir, sans poser le calcul complet ?',
        answer: {
          kind: 'choice',
          options: options.map((o) => ({ id: o, label: o, feedback: o === c.ok ? '' : c.why, tag: 'raisonnement' })),
          correct: [c.ok],
        },
        hints: [
          'Demandez-vous si le résultat doit être plus grand ou plus petit que les données de départ.',
          'Un seul des deux résultats va dans le bon sens.',
        ],
        alternative: [
          p('Testez mentalement l’opération inverse.'),
          p('Reprenez le résultat proposé et remontez à l’énoncé : l’un des deux ne redonne pas les données de départ.'),
        ],
        solution: [
          { text: `Le résultat plausible est ${c.ok}.`, why: c.why },
          { text: 'Ce contrôle prend quelques secondes.', why: 'Il rattrape la majorité des erreurs de sens et de rang.' },
        ],
      }
    },
  },
]
