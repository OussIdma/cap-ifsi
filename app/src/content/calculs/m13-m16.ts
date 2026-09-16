/**
 * Calculs — M13 à M16 : lire des données, retrouver une inconnue, problèmes à
 * plusieurs étapes, vérification du raisonnement.
 */

import { addR, divR, mulR, rat, roundR, subR, type Rational } from '@/engine/rational'
import type { ExerciseTemplate, Lesson } from '../types'
import { fr, frInt, key, lead, p, vis, warn } from '../blocks'

const R = (n: number | bigint, d: number | bigint = 1) => rat(BigInt(n), BigInt(d))
const dec = (digits: number, places: number): Rational => rat(BigInt(digits), 10n ** BigInt(places))

// ===========================================================================
// Leçons
// ===========================================================================

export const LESSONS_M13_M16: Lesson[] = [
  {
    skillId: 'M13',
    review: 'relu-par-le-modele',
    explanation: [
      lead('Avant de calculer sur un tableau ou un graphique, il faut savoir exactement ce qu’on lit.'),
      p(
        'Trois questions à se poser systématiquement : que représente chaque ligne ou chaque colonne ? Dans quelle unité les valeurs sont-elles exprimées ? La période couverte est-elle la même partout ?',
      ),
      p(
        'La moyenne est la valeur que chaque élément aurait si le total était réparti également. On additionne tout, puis on divise par le nombre d’éléments. Elle ne dit rien des écarts : deux séries très différentes peuvent avoir la même moyenne.',
      ),
      vis({
        type: 'table',
        headers: ['Série', 'Valeurs', 'Moyenne'],
        rows: [
          ['A', '10 · 10 · 10', '10'],
          ['B', '2 · 10 · 18', '10'],
        ],
        caption: 'Même moyenne, réalités très différentes : la moyenne résume, elle n’explique pas.',
      }),
      key('Une phrase de lecture correcte contient la valeur, l’unité, l’élément concerné et la période. Sans cela, elle n’est pas vérifiable.'),
      warn('Ne comparez jamais deux barres d’un graphique sans regarder l’axe : un axe qui ne part pas de zéro exagère les écarts.'),
    ],
    alternative: [
      p('Prenez l’habitude de reformuler une case de tableau à voix haute.'),
      p('« En semaine 2, on a servi 120 repas. » Cette phrase contient tout : la période, la quantité, l’objet compté.'),
      p('Si vous ne pouvez pas construire cette phrase, c’est que vous n’avez pas encore compris le tableau.'),
    ],
    workedExamples: [
      {
        statement: 'Trois relevés : 118, 124 et 130 repas. Calculer la moyenne.',
        steps: [
          { do: 'Additionner toutes les valeurs.', why: 'La moyenne part toujours du total.', calc: '118 + 124 + 130 = 372' },
          { do: 'Diviser par le nombre de relevés.', why: 'On répartit le total également.', calc: '372 ÷ 3 = 124' },
          { do: 'Vérifier.', why: 'La moyenne doit toujours tomber entre la plus petite et la plus grande valeur : 118 ≤ 124 ≤ 130.' },
        ],
        conclusion: 'La moyenne est de 124 repas par relevé.',
      },
    ],
    commonMistakes: [
      { mistake: 'Diviser par le mauvais nombre d’éléments.', fix: 'Comptez les valeurs, pas les lignes du tableau.', tag: 'raisonnement' },
      { mistake: 'Oublier l’unité dans la phrase de réponse.', fix: 'Une valeur sans unité n’a pas de sens.', tag: 'unite' },
    ],
  },
  {
    skillId: 'M14',
    review: 'relu-par-le-modele',
    explanation: [
      lead('Quand c’est le départ qui manque, on remonte le calcul à l’envers.'),
      p(
        'Chaque opération a une opération inverse. L’addition se défait par la soustraction, la multiplication par la division. C’est le seul outil nécessaire pour retrouver une valeur inconnue simple.',
      ),
      vis({
        type: 'calc-steps',
        steps: [
          { calc: '? + 12 = 30', why: 'Pour retrouver le nombre de départ, on retire 12.' },
          { calc: '? = 30 − 12 = 18', why: 'On vérifie : 18 + 12 = 30.' },
          { calc: '4 × ? = 52', why: 'Ici la multiplication se défait par la division.' },
          { calc: '? = 52 ÷ 4 = 13', why: 'Vérification : 4 × 13 = 52.' },
        ],
      }),
      p(
        'Quand deux opérations se suivent, on les défait dans l’ordre inverse. Pour 3 × ? + 5 = 26, on retire d’abord 5, puis on divise par 3.',
      ),
      key('Terminez toujours par une vérification : replacez la valeur trouvée dans l’énoncé de départ.'),
    ],
    alternative: [
      p('Voyez le calcul comme un chemin aller-retour.'),
      p(
        'À l’aller : je pars du nombre cherché, je le multiplie par 3, puis j’ajoute 5, et j’arrive à 26. Au retour, je refais le chemin en sens inverse : je retire 5, puis je divise par 3. Je retombe sur le point de départ.',
      ),
      key('Le retour se fait toujours dans l’ordre inverse de l’aller. C’est ce qui évite de diviser avant de soustraire.'),
    ],
    workedExamples: [
      {
        statement: 'Une commande coûte 5 € de frais de port, plus 3 € par article. Le total est de 26 €. Combien d’articles ?',
        steps: [
          { do: 'Écrire la relation.', why: 'Mettre l’énoncé en équation clarifie ce qu’on cherche.', calc: '3 × n + 5 = 26' },
          { do: 'Retirer les frais fixes.', why: 'Les 5 € ne dépendent pas du nombre d’articles.', calc: '3 × n = 21' },
          { do: 'Diviser par le prix unitaire.', why: 'On défait la multiplication.', calc: 'n = 7' },
          { do: 'Vérifier dans l’énoncé.', why: '3 × 7 + 5 = 26 : c’est bien le total annoncé.' },
        ],
        conclusion: 'La commande contient 7 articles.',
      },
    ],
    commonMistakes: [
      { mistake: 'Diviser avant de soustraire.', fix: 'On défait les opérations dans l’ordre inverse de l’aller.', tag: 'operation' },
      { mistake: 'Ne pas vérifier la valeur trouvée.', fix: 'Replacez-la dans l’énoncé : c’est un contrôle gratuit.', tag: 'raisonnement' },
    ],
  },
  {
    skillId: 'M15',
    review: 'relu-par-le-modele',
    explanation: [
      lead('Un problème long n’est pas un problème difficile : c’est une suite de problèmes courts.'),
      p('Quatre gestes suffisent, dans cet ordre : repérer la question, trier les données, enchaîner les calculs, conclure par une phrase.'),
      vis({
        type: 'table',
        headers: ['Geste', 'Ce qu’on écrit'],
        rows: [
          ['1. La question', 'Je souligne ce qui est demandé, et dans quelle unité.'],
          ['2. Les données', 'Je liste les nombres utiles. Je barre ceux qui ne servent pas.'],
          ['3. Les étapes', 'J’écris chaque calcul sur une ligne, avec son unité.'],
          ['4. La conclusion', 'Je réponds par une phrase complète.'],
        ],
      }),
      key('Un énoncé peut contenir des données inutiles. Ce n’est pas un piège déloyal : c’est ce qui se passe dans la réalité.'),
      warn('Ne calculez jamais avant d’avoir lu la question. Beaucoup d’erreurs viennent d’un calcul juste qui ne répond pas à la question posée.'),
    ],
    alternative: [
      p('Une autre entrée : partez de la fin.'),
      p(
        'Demandez-vous ce qu’il vous faudrait connaître pour répondre immédiatement à la question. Puis demandez-vous comment obtenir cette information. Vous remontez ainsi jusqu’aux données de l’énoncé.',
      ),
      p('Cette méthode évite de calculer tout ce qui est calculable, au lieu de calculer ce qui est utile.'),
    ],
    workedExamples: [
      {
        statement:
          'Un service achète 14 boîtes de 25 gants à 3,20 € la boîte, et 6 flacons à 4,50 €. Le budget est de 100 €. Combien reste-t-il ?',
        steps: [
          { do: 'Repérer la question : ce qui reste sur le budget, en euros.', why: 'Le nombre de gants (25 par boîte) ne sert pas ici.' },
          { do: 'Calculer le coût des boîtes.', why: 'Le prix se répète pour chaque boîte.', calc: '14 × 3,20 = 44,80 €' },
          { do: 'Calculer le coût des flacons.', why: 'Même raisonnement.', calc: '6 × 4,50 = 27 €' },
          { do: 'Additionner puis retirer du budget.', why: 'Ce qui reste, c’est le budget moins la dépense totale.', calc: '44,80 + 27 = 71,80 ; 100 − 71,80 = 28,20 €' },
        ],
        conclusion: 'Il reste 28,20 € sur le budget. Le nombre de gants par boîte était une donnée inutile.',
      },
    ],
    commonMistakes: [
      { mistake: 'Utiliser toutes les données parce qu’elles sont là.', fix: 'Vérifiez que chaque nombre sert à répondre à la question posée.', tag: 'consigne' },
      { mistake: 'S’arrêter à l’avant-dernière étape.', fix: 'Relisez la question avant d’écrire la réponse.', tag: 'consigne' },
    ],
  },
  {
    skillId: 'M16',
    review: 'relu-par-le-modele',
    explanation: [
      lead('Une réponse fausse se repère souvent sans refaire le calcul.'),
      p('Quatre contrôles rapides suffisent à éliminer la plupart des erreurs graves :'),
      vis({
        type: 'table',
        headers: ['Contrôle', 'Question à se poser'],
        rows: [
          ['Le sens', 'Le résultat devait-il être plus grand ou plus petit que le point de départ ?'],
          ['L’ordre de grandeur', 'Un calcul approché donne-t-il un résultat proche ?'],
          ['L’unité', 'La réponse est-elle dans l’unité demandée par la consigne ?'],
          ['La plausibilité', 'Ce nombre a-t-il un sens dans la vie réelle ?'],
        ],
      }),
      key('Ces contrôles prennent quinze secondes et rattrapent la majorité des erreurs de virgule et de conversion.'),
      warn('Un résultat juste dans la mauvaise unité reste une réponse fausse. Relisez toujours l’unité demandée.'),
    ],
    alternative: [
      p('Transformez le contrôle en une seule phrase.'),
      p('« J’ai trouvé X unité, ce qui est cohérent parce que… » Si vous ne parvenez pas à finir cette phrase, quelque chose ne va pas.'),
    ],
    workedExamples: [
      {
        statement: 'Une candidate écrit : « 2,5 kg = 25 g ». Repérer et corriger l’erreur.',
        steps: [
          { do: 'Contrôler le sens.', why: 'Le gramme est plus petit que le kilogramme : le nombre doit devenir plus grand, pas plus petit.' },
          { do: 'Compter les rangs.', why: 'kg → hg → dag → g : trois rangs, donc un facteur 1 000.' },
          { do: 'Corriger.', why: '2,5 × 1 000 = 2 500.', calc: '2,5 kg = 2 500 g' },
        ],
        conclusion: 'L’erreur portait sur le nombre de rangs : le facteur est 1 000, pas 10.',
      },
    ],
    commonMistakes: [
      { mistake: 'Faire confiance à la calculatrice sans contrôler l’ordre de grandeur.', fix: 'Une touche mal appuyée ne se voit que par l’estimation.', tag: 'operation' },
      { mistake: 'Rendre une copie sans relire l’unité demandée.', fix: 'Soulignez l’unité dans la consigne avant de commencer.', tag: 'unite' },
    ],
  },
]

// ===========================================================================
// Gabarits
// ===========================================================================

const SERVICES = ['Service A', 'Service B', 'Service C', 'Service D'] as const
const MOIS = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin'] as const

export const TEMPLATES_M13_M16: ExerciseTemplate[] = [
  // ---------------------------------------------------------------- M13 ---
  {
    id: 'M13-lire-tableau',
    skillId: 'M13',
    level: 'decouverte',
    structure: 'lire-une-valeur-dans-un-tableau',
    version: 1,
    review: 'teste-automatiquement',
    seconds: 45,
    generate: (rng) => {
      const rows = rng.sample([...SERVICES], 3)
      const months = rng.sample([...MOIS], 3)
      const grid = rows.map(() => months.map(() => rng.int(40, 180)))
      const ri = rng.int(0, 2)
      const ci = rng.int(0, 2)
      return {
        prompt: [
          p('Nombre de repas servis, relevés dans un établissement fictif.'),
          vis({
            type: 'table',
            headers: ['Service', ...months],
            rows: rows.map((r, i) => [r, ...grid[i]!.map(String)]),
            align: ['left', 'right', 'right', 'right'],
          }),
        ],
        question: `Combien de repas le ${rows[ri]} a-t-il servis en ${months[ci]} ?`,
        answer: {
          kind: 'numeric',
          value: R(grid[ri]![ci]!),
          pitfalls: [
            {
              answer: String(grid[(ri + 1) % 3]![ci]!),
              tag: 'consigne',
              why: `Cette valeur est celle du ${rows[(ri + 1) % 3]}, pas du ${rows[ri]}. Vérifiez la ligne avant de lire la case.`,
            },
          ],
        },
        hints: [
          'Repérez d’abord la bonne ligne, puis la bonne colonne.',
          `Suivez la ligne « ${rows[ri]} » avec le doigt jusqu’à la colonne « ${months[ci]} ».`,
        ],
        alternative: [
          p('Lisez le tableau comme une phrase.'),
          p(`« Le ${rows[ri]}, en ${months[ci]}, a servi … repas. » La case cherchée se trouve au croisement de ces deux informations.`),
        ],
        solution: [
          { text: `Ligne « ${rows[ri]} », colonne « ${months[ci]} ».`, calc: `${grid[ri]![ci]} repas`, why: 'Une case de tableau se lit toujours au croisement d’une ligne et d’une colonne.' },
        ],
        placeholder: 'Nombre de repas',
        keyboard: 'decimal',
      }
    },
  },
  {
    id: 'M13-total-tableau',
    skillId: 'M13',
    level: 'entrainement',
    structure: 'total-d-une-ligne-de-tableau',
    version: 1,
    review: 'teste-automatiquement',
    seconds: 60,
    generate: (rng) => {
      const months = rng.sample([...MOIS], 4)
      const values = months.map(() => rng.int(60, 190))
      const total = values.reduce((a, b) => a + b, 0)
      return {
        prompt: [
          p('Nombre d’entretiens réalisés par un service fictif.'),
          vis({
            type: 'table',
            headers: ['Mois', 'Entretiens'],
            rows: months.map((m, i) => [m, String(values[i])]),
            align: ['left', 'right'],
          }),
        ],
        question: 'Combien d’entretiens ont été réalisés au total sur ces quatre mois ?',
        answer: { kind: 'numeric', value: R(total) },
        hints: [
          'Un total s’obtient en additionnant toutes les valeurs de la colonne.',
          'Additionnez deux par deux pour limiter les erreurs, puis additionnez les deux sous-totaux.',
        ],
        alternative: [
          p('Regroupez les nombres qui se complètent.'),
          p('Cherchez des paires dont la somme est ronde : cela simplifie beaucoup l’addition de tête.'),
        ],
        solution: [
          { text: 'Additionner les quatre valeurs.', calc: `${values.join(' + ')} = ${frInt(total)}`, why: 'Le total est la somme de toutes les lignes.' },
        ],
        conclusion: `Le total est de ${frInt(total)} entretiens.`,
        placeholder: 'Nombre',
        keyboard: 'decimal',
      }
    },
  },
  {
    id: 'M13-moyenne',
    skillId: 'M13',
    level: 'entrainement',
    structure: 'moyenne-d-une-serie',
    version: 1,
    review: 'teste-automatiquement',
    seconds: 70,
    generate: (rng) => {
      const n = rng.pick([4, 5])
      const mean = rng.int(100, 160)
      // On construit des écarts dont la somme est nulle : la moyenne est exacte.
      const deltas: number[] = []
      let sum = 0
      for (let i = 0; i < n - 1; i++) {
        const d = rng.int(-20, 20)
        deltas.push(d)
        sum += d
      }
      deltas.push(-sum)
      const values = deltas.map((d) => mean + d)
      const total = values.reduce((a, b) => a + b, 0)
      return {
        prompt: [
          p('Relevés hebdomadaires du nombre de passages dans un accueil fictif.'),
          vis({
            type: 'table',
            headers: ['Semaine', 'Passages'],
            rows: values.map((v, i) => [`Semaine ${i + 1}`, String(v)]),
            align: ['left', 'right'],
          }),
        ],
        question: 'Quelle est la moyenne hebdomadaire des passages ?',
        answer: {
          kind: 'numeric',
          value: R(mean),
          pitfalls: [
            { answer: String(total), tag: 'consigne', why: 'Vous avez donné le total. Une moyenne s’obtient en divisant ce total par le nombre de semaines.' },
            { answer: String(Math.round(total / (n - 1))), tag: 'operation', why: `Vous avez divisé par ${n - 1} au lieu de ${n}. Comptez les valeurs du tableau.` },
          ],
        },
        hints: [
          'Une moyenne se calcule en deux temps : le total, puis le partage.',
          `Additionnez les ${n} valeurs, puis divisez par ${n}.`,
        ],
        alternative: [
          p('La moyenne est la valeur que chaque semaine aurait si les passages étaient répartis également.'),
          p(`Ici, ${frInt(total)} passages répartis sur ${n} semaines donnent ${mean} passages par semaine.`),
        ],
        solution: [
          { text: 'Additionner les valeurs.', calc: `${values.join(' + ')} = ${frInt(total)}`, why: 'La moyenne part du total.' },
          { text: 'Diviser par le nombre de relevés.', calc: `${frInt(total)} ÷ ${n} = ${mean}`, why: 'On répartit le total également.' },
          { text: 'Contrôler.', why: `La moyenne doit se situer entre ${Math.min(...values)} et ${Math.max(...values)} : c’est bien le cas.` },
        ],
        conclusion: `La moyenne est de ${mean} passages par semaine.`,
        placeholder: 'Nombre',
        keyboard: 'decimal',
      }
    },
  },
  {
    id: 'M13-graphique',
    skillId: 'M13',
    level: 'entrainement',
    structure: 'lire-un-graphique-en-barres',
    version: 1,
    review: 'teste-automatiquement',
    seconds: 60,
    generate: (rng) => {
      const months = rng.sample([...MOIS], 4)
      const values = months.map(() => rng.int(2, 18) * 10)
      const maxIdx = values.indexOf(Math.max(...values))
      const askDiff = rng.chance(0.5)
      const minIdx = values.indexOf(Math.min(...values))
      const diff = values[maxIdx]! - values[minIdx]!
      return {
        prompt: [
          p('Nombre d’ateliers de prévention organisés dans une structure fictive.'),
          vis({
            type: 'bars',
            label: 'Ateliers par mois',
            items: months.map((m, i) => ({ name: m, value: values[i]! })),
            caption: 'Chaque barre correspond à un mois. L’axe part de zéro.',
          }),
        ],
        question: askDiff
          ? 'Quel est l’écart entre le mois le plus actif et le mois le moins actif ?'
          : `Combien d’ateliers ont été organisés en ${months[maxIdx]} ?`,
        answer: askDiff
          ? { kind: 'numeric', value: R(diff) }
          : { kind: 'numeric', value: R(values[maxIdx]!) },
        hints: [
          askDiff ? 'Repérez d’abord la plus grande et la plus petite barre.' : 'Repérez la barre du mois demandé, puis lisez sa hauteur sur l’axe.',
          askDiff ? 'L’écart est la différence entre ces deux valeurs.' : 'Chaque graduation de l’axe correspond à un même nombre d’ateliers.',
        ],
        alternative: [
          p('Reconstruisez le tableau à partir du graphique.'),
          p('Notez chaque mois et sa valeur sur une ligne. Vous retombez sur un tableau, plus simple à exploiter.'),
        ],
        solution: askDiff
          ? [
              { text: `Valeur maximale : ${values[maxIdx]} en ${months[maxIdx]}.`, why: 'C’est la barre la plus haute.' },
              { text: `Valeur minimale : ${values[minIdx]} en ${months[minIdx]}.`, why: 'C’est la barre la plus basse.' },
              { text: 'Calculer l’écart.', calc: `${values[maxIdx]} − ${values[minIdx]} = ${diff}`, why: 'Un écart est une différence.' },
            ]
          : [{ text: `La barre de ${months[maxIdx]} atteint ${values[maxIdx]}.`, why: 'On lit la hauteur de la barre sur l’axe vertical.' }],
        placeholder: 'Nombre',
        keyboard: 'decimal',
      }
    },
  },
  {
    id: 'M13-proportion-tableau',
    skillId: 'M13',
    level: 'epreuve',
    structure: 'proportion-calculee-depuis-un-tableau',
    version: 1,
    transfer: true,
    review: 'teste-automatiquement',
    seconds: 100,
    generate: (rng) => {
      const rate = rng.pick([10, 20, 25, 40, 50])
      const total = rng.pick([80, 120, 160, 200, 240, 400])
      const part = (total * rate) / 100
      const other = total - part
      return {
        prompt: [
          p('Résultat d’une enquête fictive auprès des personnes accueillies.'),
          vis({
            type: 'table',
            headers: ['Réponse', 'Nombre de personnes'],
            rows: [
              ['Vient à pied', String(part)],
              ['Vient autrement', String(other)],
              ['Total', String(total)],
            ],
            align: ['left', 'right'],
          }),
        ],
        question: 'Quel pourcentage des personnes vient à pied ?',
        answer: {
          kind: 'numeric',
          value: R(rate),
          pitfalls: [
            { answer: String(part), tag: 'consigne', why: 'Vous avez redonné le nombre de personnes. La question demande une proportion exprimée en pourcentage.' },
            { answer: fr(roundR(mulR(divR(R(part), R(other)), R(100)), 1)), tag: 'raisonnement', why: 'Vous avez comparé les deux réponses entre elles. Un pourcentage se calcule toujours par rapport au total.' },
          ],
        },
        hints: [
          'Un pourcentage compare une partie au total, jamais deux parties entre elles.',
          `Divisez ${part} par ${total}, puis multipliez par 100.`,
        ],
        alternative: [
          p('Ramenez à 100 personnes.'),
          p(`Si ${total} personnes donnent ${part} réponses « à pied », alors 100 personnes en donneraient ${rate}. C’est la définition du pourcentage.`),
        ],
        solution: [
          { text: 'Repérer le total dans le tableau.', calc: `${total} personnes`, why: 'C’est la référence du calcul.' },
          { text: 'Calculer la proportion.', calc: `${part} ÷ ${total} = ${fr(R(part, total), 4)}`, why: 'La partie sur le tout.' },
          { text: 'Exprimer en pourcentage.', calc: `× 100 = ${rate} %`, why: 'Un pourcentage est une proportion pour cent.' },
        ],
        conclusion: `${rate} % des personnes viennent à pied.`,
        placeholder: 'Exemple : 25',
        keyboard: 'decimal',
        suffix: '%',
      }
    },
  },

  // ---------------------------------------------------------------- M14 ---
  {
    id: 'M14-case-vide',
    skillId: 'M14',
    level: 'decouverte',
    structure: 'operation-a-trou',
    version: 1,
    review: 'teste-automatiquement',
    seconds: 45,
    generate: (rng) => {
      const kind = rng.pick(['plus', 'moins', 'fois'] as const)
      if (kind === 'fois') {
        const a = rng.int(3, 12)
        const x = rng.int(4, 25)
        return {
          prompt: [p('Retrouvez le nombre caché.')],
          question: `${a} × ? = ${a * x}`,
          answer: {
            kind: 'numeric',
            value: R(x),
            pitfalls: [{ answer: String(a * x * a), tag: 'operation', why: 'Vous avez multiplié au lieu de diviser. Pour défaire une multiplication, on divise.' }],
          },
          hints: ['Quelle opération défait une multiplication ?', `Divisez ${frInt(a * x)} par ${a}.`],
          alternative: [
            p('Procédez par essais organisés.'),
            p(`${a} × 10 = ${a * 10}. C’est ${a * 10 > a * x ? 'trop' : 'trop peu'}. Ajustez jusqu’à retrouver ${frInt(a * x)}.`),
          ],
          solution: [
            { text: 'Utiliser l’opération inverse.', calc: `${frInt(a * x)} ÷ ${a} = ${x}`, why: 'La division défait la multiplication.' },
            { text: 'Vérifier.', calc: `${a} × ${x} = ${frInt(a * x)}`, why: 'On retombe sur l’énoncé.' },
          ],
          placeholder: 'Nombre',
          keyboard: 'decimal',
        }
      }
      // On garde a < x pour que le piège « soustraire au lieu d'ajouter »
      // produise un nombre positif, donc une saisie réaliste.
      const a = dec(rng.int(120, 400), 1)
      const x = dec(rng.int(450, 900), 1)
      const total = kind === 'plus' ? addR(a, x) : addR(x, a)
      return {
        prompt: [p('Retrouvez le nombre caché.')],
        question: kind === 'plus' ? `${fr(a)} + ? = ${fr(total)}` : `? − ${fr(a)} = ${fr(x)}`,
        answer: {
          kind: 'numeric',
          value: kind === 'plus' ? x : total,
          pitfalls: [
            {
              answer: kind === 'plus' ? fr(addR(a, total)) : fr(subR(x, a)),
              tag: 'operation',
              why: kind === 'plus'
                ? 'Vous avez additionné au lieu de soustraire. Pour retrouver un terme manquant d’une addition, on retire l’autre terme du total.'
                : 'Vous avez soustrait au lieu d’additionner. Ici c’est le nombre de départ qui manque : il faut le reconstituer.',
            },
          ],
        },
        hints: [
          kind === 'plus' ? 'Quelle opération défait une addition ?' : 'Le nombre cherché est celui d’avant la soustraction : il est donc plus grand que le résultat.',
          kind === 'plus' ? `Retirez ${fr(a)} du total.` : `Ajoutez ${fr(a)} au résultat ${fr(x)}.`,
        ],
        alternative: [
          p('Reformulez l’égalité avec vos mots.'),
          p(
            kind === 'plus'
              ? `« J’avais ${fr(a)}, j’ai ajouté quelque chose, j’arrive à ${fr(total)}. » Ce quelque chose est l’écart entre les deux.`
              : `« J’avais un montant, j’ai retiré ${fr(a)}, il me reste ${fr(x)}. » Le montant de départ est donc ${fr(x)} + ${fr(a)}.`,
          ),
        ],
        solution: [
          {
            text: 'Utiliser l’opération inverse.',
            calc: kind === 'plus' ? `${fr(total)} − ${fr(a)} = ${fr(x)}` : `${fr(x)} + ${fr(a)} = ${fr(total)}`,
            why: kind === 'plus' ? 'La soustraction défait l’addition.' : 'L’addition défait la soustraction.',
          },
          { text: 'Vérifier en replaçant la valeur.', why: 'On doit retomber exactement sur l’énoncé.' },
        ],
        placeholder: 'Nombre',
        keyboard: 'decimal',
      }
    },
  },
  {
    id: 'M14-relation-lineaire',
    skillId: 'M14',
    level: 'entrainement',
    structure: 'relation-ax-plus-b',
    version: 1,
    review: 'teste-automatiquement',
    seconds: 85,
    generate: (rng) => {
      const unit = dec(rng.pick([250, 320, 450, 500, 640]), 2)
      const fixed = dec(rng.pick([300, 450, 500, 700]), 2)
      const n = rng.int(4, 14)
      const total = addR(mulR(unit, R(n)), fixed)
      return {
        prompt: [
          p(`Une commande comporte des frais de livraison fixes de ${fr(fixed)} € et coûte ${fr(unit)} € par article.`),
          p(`Le montant total facturé est de ${fr(total)} €.`),
        ],
        question: 'Combien d’articles ont été commandés ?',
        answer: {
          kind: 'numeric',
          value: R(n),
          requireInteger: true,
          pitfalls: [
            {
              answer: fr(divR(total, unit), 2),
              tag: 'operation',
              why: 'Vous avez divisé le total par le prix unitaire sans retirer d’abord les frais fixes. Les frais ne dépendent pas du nombre d’articles.',
            },
          ],
        },
        hints: [
          'Une partie du total ne dépend pas du nombre d’articles : repérez-la.',
          `Retirez d’abord les ${fr(fixed)} € de frais, puis divisez ce qui reste par ${fr(unit)} €.`,
        ],
        alternative: [
          p('Faites le chemin dans l’autre sens.'),
          p(
            `À l’aller : nombre d’articles → multiplié par ${fr(unit)} → plus ${fr(fixed)} → ${fr(total)}. Au retour, on défait dans l’ordre inverse : on retire ${fr(fixed)}, puis on divise par ${fr(unit)}.`,
          ),
        ],
        solution: [
          { text: 'Retirer les frais fixes.', calc: `${fr(total)} − ${fr(fixed)} = ${fr(subR(total, fixed))} €`, why: 'Cette part du total est indépendante du nombre d’articles.' },
          { text: 'Diviser par le prix unitaire.', calc: `${fr(subR(total, fixed))} ÷ ${fr(unit)} = ${n}`, why: 'On défait la multiplication.' },
          { text: 'Vérifier.', calc: `${n} × ${fr(unit)} + ${fr(fixed)} = ${fr(total)} €`, why: 'On retombe sur le montant facturé.' },
        ],
        conclusion: `${n} articles ont été commandés.`,
        placeholder: 'Nombre d’articles',
        keyboard: 'decimal',
      }
    },
  },
  {
    id: 'M14-partage-inegal',
    skillId: 'M14',
    level: 'epreuve',
    structure: 'partage-avec-ecart-connu',
    version: 1,
    transfer: true,
    review: 'teste-automatiquement',
    seconds: 110,
    generate: (rng) => {
      const small = rng.int(12, 60)
      const gap = rng.int(4, 30)
      const total = small * 2 + gap
      return {
        prompt: [
          p(`Deux services se partagent ${frInt(total)} dossiers. Le service B en traite ${gap} de plus que le service A.`),
        ],
        question: 'Combien de dossiers le service A traite-t-il ?',
        answer: {
          kind: 'numeric',
          value: R(small),
          pitfalls: [
            { answer: String(Math.round(total / 2)), tag: 'consigne', why: 'Vous avez partagé en deux parts égales. Or l’énoncé précise que le service B en traite davantage.' },
            { answer: String(small + gap), tag: 'consigne', why: 'C’est la part du service B. La question porte sur le service A.' },
          ],
        },
        hints: [
          'Les deux parts ne sont pas égales : l’une dépasse l’autre d’un écart connu.',
          `Retirez d’abord l’écart de ${gap} du total. Ce qui reste se partage alors en deux parts égales.`,
        ],
        alternative: [
          p('Représentez les deux parts par deux barres.'),
          p(
            `La barre de B dépasse celle de A de ${gap}. Si on coupe ce dépassement, les deux barres deviennent égales et totalisent ${frInt(total - gap)}. Chacune vaut donc ${small}.`,
          ),
        ],
        solution: [
          { text: 'Retirer l’écart du total.', calc: `${frInt(total)} − ${gap} = ${frInt(total - gap)}`, why: 'On se ramène à deux parts égales.' },
          { text: 'Partager en deux.', calc: `${frInt(total - gap)} ÷ 2 = ${small}`, why: 'C’est la part du service A, le plus petit des deux.' },
          { text: 'Vérifier.', calc: `${small} + ${small + gap} = ${frInt(total)}`, why: 'La somme des deux parts doit redonner le total.' },
        ],
        conclusion: `Le service A traite ${small} dossiers, le service B en traite ${small + gap}.`,
        placeholder: 'Nombre de dossiers',
        keyboard: 'decimal',
      }
    },
  },

  // ---------------------------------------------------------------- M15 ---
  {
    id: 'M15-deux-etapes-simple',
    skillId: 'M15',
    level: 'decouverte',
    structure: 'total-puis-reste-en-deux-etapes',
    version: 1,
    review: 'teste-automatiquement',
    seconds: 75,
    generate: (rng) => {
      const unit = rng.pick([3, 4, 5, 6, 8])
      const qty = rng.int(4, 12)
      const spent = unit * qty
      // La somme donnée dépasse toujours la dépense : un reste négatif
      // rendrait l'énoncé incohérent.
      const given = Math.ceil((spent + 5) / 10) * 10
      const left = given - spent
      return {
        prompt: [
          p(`On ach\u00e8te ${qty} articles \u00e0 ${unit} \u20ac l\u2019unit\u00e9. On paie avec ${given} \u20ac.`),
        ],
        question: 'Combien reste-t-il, en euros ?',
        answer: {
          kind: 'numeric',
          value: R(left),
          unit: '\u20ac',
          unitPolicy: 'optional',
          pitfalls: [
            { answer: String(spent), tag: 'consigne', why: 'Vous avez donn\u00e9 le montant d\u00e9pens\u00e9. La question porte sur ce qui reste.' },
          ],
        },
        hints: [
          'Il y a deux \u00e9tapes : combien on d\u00e9pense, puis combien il reste.',
          `Multipliez ${unit} par ${qty}, puis retirez ce total de ${given}.`,
        ],
        alternative: [
          p('Proc\u00e9dez article par article.'),
          p(`Apr\u00e8s un article il reste ${given - unit} \u20ac, apr\u00e8s deux il reste ${given - 2 * unit} \u20ac, et ainsi de suite. La multiplication fait ce travail d\u2019un coup.`),
        ],
        solution: [
          { text: 'Calculer la d\u00e9pense.', calc: `${qty} \u00d7 ${unit} = ${spent} \u20ac`, why: 'Le m\u00eame prix se r\u00e9p\u00e8te pour chaque article.' },
          { text: 'Retirer la d\u00e9pense de la somme donn\u00e9e.', calc: `${given} \u2212 ${spent} = ${left} \u20ac`, why: 'Ce qui reste est la somme donn\u00e9e moins la d\u00e9pense.' },
        ],
        conclusion: `Il reste ${left} \u20ac.`,
        placeholder: 'Exemple : 20',
        keyboard: 'decimal',
        suffix: '\u20ac',
      }
    },
  },
  {
    id: 'M15-achat-reste',
    skillId: 'M15',
    level: 'entrainement',
    structure: 'deux-achats-puis-reste-sur-budget',
    version: 1,
    review: 'teste-automatiquement',
    seconds: 110,
    generate: (rng) => {
      const price1 = dec(rng.int(220, 480), 2)
      const q1 = rng.int(8, 18)
      const price2 = dec(rng.int(300, 650), 2)
      const q2 = rng.int(3, 9)
      const perBox = rng.pick([25, 50, 100])
      const spent = addR(mulR(price1, R(q1)), mulR(price2, R(q2)))
      // Le budget est choisi au-dessus de la dépense : un reste négatif
      // rendrait l'énoncé incohérent.
      const spentCents = Number(mulR(spent, R(100)).n)
      const budget = R(Math.ceil(spentCents / 5000) * 50 + 50)
      const left = subR(budget, spent)
      return {
        prompt: [
          p(
            `Un service dispose de ${fr(budget)} € pour ses fournitures. Il achète ${q1} boîtes de ${perBox} gants à ${fr(price1)} € la boîte, puis ${q2} flacons à ${fr(price2)} € l’unité.`,
          ),
        ],
        question: 'Combien reste-t-il sur le budget, en euros ?',
        answer: {
          kind: 'numeric',
          value: left,
          unit: '€',
          unitPolicy: 'optional',
          pitfalls: [
            { answer: fr(spent), tag: 'consigne', why: 'Vous avez calculé le total dépensé. La question porte sur ce qui reste.' },
            { answer: fr(subR(budget, mulR(price1, R(q1)))), tag: 'consigne', why: 'Vous n’avez retiré qu’une des deux dépenses.' },
          ],
        },
        hints: [
          `La question porte sur ce qui reste. Le nombre de gants par boîte (${perBox}) n’est pas utile ici.`,
          'Calculez chaque dépense séparément, additionnez-les, puis retirez le total du budget.',
        ],
        alternative: [
          p('Retirez les dépenses l’une après l’autre.'),
          p(
            `${fr(budget)} − ${fr(mulR(price1, R(q1)))} = ${fr(subR(budget, mulR(price1, R(q1))))}, puis on retire ${fr(mulR(price2, R(q2)))}. Le résultat est identique.`,
          ),
        ],
        solution: [
          { text: 'Trier les données.', why: `Le nombre de gants par boîte est une donnée inutile pour cette question.` },
          { text: 'Coût des boîtes.', calc: `${q1} × ${fr(price1)} = ${fr(mulR(price1, R(q1)))} €`, why: 'Le prix se répète pour chaque boîte.' },
          { text: 'Coût des flacons.', calc: `${q2} × ${fr(price2)} = ${fr(mulR(price2, R(q2)))} €`, why: 'Même raisonnement.' },
          { text: 'Dépense totale puis reste.', calc: `${fr(spent)} dépensés, ${fr(budget)} − ${fr(spent)} = ${fr(left)} €`, why: 'Ce qui reste est le budget moins la dépense.' },
        ],
        conclusion: `Il reste ${fr(left)} € sur le budget.`,
        placeholder: 'Exemple : 28,20',
        keyboard: 'decimal',
        suffix: '€',
      }
    },
  },
  {
    id: 'M15-consommation-conditionnement',
    skillId: 'M15',
    level: 'epreuve',
    structure: 'consommation-puis-conditionnement',
    version: 1,
    review: 'teste-automatiquement',
    seconds: 120,
    generate: (rng) => {
      const perPerson = rng.int(3, 8)
      const people = rng.int(12, 40)
      const days = rng.int(3, 7)
      const perBox = rng.pick([50, 100, 200])
      const totalNeeded = perPerson * people * days
      const boxes = Math.ceil(totalNeeded / perBox)
      return {
        prompt: [
          p(
            `Dans une structure fictive, chaque personne utilise ${perPerson} serviettes par jour. La structure accueille ${people} personnes et organise un séjour de ${days} jours.`,
          ),
          p(`Les serviettes sont conditionnées par paquets de ${perBox}.`),
        ],
        question: 'Combien de paquets faut-il commander ?',
        answer: {
          kind: 'numeric',
          value: R(boxes),
          requireInteger: true,
          pitfalls: [
            ...(totalNeeded === boxes
              ? []
              : [
                  {
                    answer: String(totalNeeded),
                    tag: 'consigne' as const,
                    why: 'C’est le nombre total de serviettes. La question porte sur le nombre de paquets.',
                  },
                ]),
            // Si la division tombe juste, « ne pas arrondir » n'est pas une erreur.
            ...(totalNeeded % perBox === 0
              ? []
              : [
                  {
                    answer: fr(divR(R(totalNeeded), R(perBox)), 2),
                    tag: 'raisonnement' as const,
                    why: 'Un paquet s’achète entier : il faut arrondir au-dessus.',
                  },
                ]),
          ],
        },
        hints: [
          'Il y a trois étapes : par personne et par jour, puis pour tout le groupe et toute la durée, puis en paquets.',
          `Calculez ${perPerson} × ${people} × ${days}, puis divisez par ${perBox} et arrondissez au-dessus.`,
        ],
        alternative: [
          p('Avancez par paliers.'),
          p(
            `Une journée pour tout le groupe : ${perPerson} × ${people} = ${frInt(perPerson * people)} serviettes. Sur ${days} jours : ${frInt(totalNeeded)}. Reste à convertir en paquets.`,
          ),
        ],
        solution: [
          { text: 'Besoin quotidien du groupe.', calc: `${perPerson} × ${people} = ${frInt(perPerson * people)} serviettes par jour`, why: 'Chaque personne consomme la même quantité.' },
          { text: 'Besoin total.', calc: `${frInt(perPerson * people)} × ${days} = ${frInt(totalNeeded)} serviettes`, why: 'Chaque jour se ressemble.' },
          { text: 'Conversion en paquets.', calc: `${frInt(totalNeeded)} ÷ ${perBox} = ${fr(divR(R(totalNeeded), R(perBox)), 3)}`, why: 'On cherche combien de paquets couvrent ce besoin.' },
          { text: `Arrondir au-dessus : ${boxes} paquets.`, why: 'Un paquet entamé doit être acheté en entier.' },
        ],
        conclusion: `Il faut commander ${boxes} paquets pour couvrir ${frInt(totalNeeded)} serviettes.`,
        placeholder: 'Nombre de paquets',
        keyboard: 'decimal',
      }
    },
  },
  {
    id: 'M15-donnees-inutiles',
    skillId: 'M15',
    level: 'entrainement',
    structure: 'trier-les-donnees-utiles',
    version: 1,
    review: 'teste-automatiquement',
    seconds: 70,
    generate: (rng) => {
      const people = rng.int(15, 45)
      const price = dec(rng.int(180, 420), 2)
      const meals = rng.int(2, 3)
      const room = rng.int(3, 8)
      const total = mulR(price, R(people * meals))
      return {
        prompt: [
          p(
            `Une journée de formation fictive réunit ${people} personnes dans ${room} salles. Chaque personne prend ${meals} collations. Une collation coûte ${fr(price)} €.`,
          ),
          p('On cherche le coût total des collations.'),
        ],
        question: 'Quelle donnée de l’énoncé n’est PAS utile pour répondre ?',
        answer: {
          kind: 'choice',
          options: [
            { id: 'people', label: `Le nombre de personnes (${people})`, feedback: 'Cette donnée est nécessaire : le coût dépend du nombre de personnes.', tag: 'consigne' },
            { id: 'rooms', label: `Le nombre de salles (${room})`, feedback: '' },
            { id: 'meals', label: `Le nombre de collations par personne (${meals})`, feedback: 'Cette donnée est nécessaire : elle multiplie le nombre de collations.', tag: 'consigne' },
            { id: 'price', label: `Le prix d’une collation (${fr(price)} €)`, feedback: 'Cette donnée est nécessaire : sans prix, aucun coût ne peut être calculé.', tag: 'consigne' },
          ],
          correct: ['rooms'],
        },
        hints: [
          'Reprenez la question : quel calcul permet d’y répondre ?',
          'Une donnée est inutile si elle n’apparaît dans aucun des calculs nécessaires.',
        ],
        alternative: [
          p('Écrivez le calcul complet avant de choisir.'),
          p(`Coût = nombre de personnes × collations par personne × prix, soit ${people} × ${meals} × ${fr(price)} = ${fr(total)} €. Le nombre de salles n’y figure pas.`),
        ],
        solution: [
          { text: 'Écrire le calcul qui répond à la question.', calc: `${people} × ${meals} × ${fr(price)} = ${fr(total)} €`, why: 'Seules les données présentes dans ce calcul sont utiles.' },
          { text: 'Le nombre de salles n’intervient nulle part.', why: 'Il décrit l’organisation de la journée, pas le coût des collations.' },
        ],
      }
    },
  },
  {
    id: 'M15-reste-concret',
    skillId: 'M15',
    level: 'epreuve',
    structure: 'reste-concret-a-interpreter',
    version: 1,
    transfer: true,
    review: 'teste-automatiquement',
    seconds: 110,
    generate: (rng) => {
      const seats = rng.pick([8, 9, 12])
      const people = seats * rng.int(3, 7) + rng.int(1, seats - 1)
      const vehicles = Math.ceil(people / seats)
      const lastCount = people - seats * (vehicles - 1)
      return {
        prompt: [p(`${people} personnes doivent être transportées. Chaque véhicule peut prendre ${seats} personnes.`)],
        question: 'Combien de véhicules faut-il prévoir ?',
        answer: {
          kind: 'numeric',
          value: R(vehicles),
          requireInteger: true,
          pitfalls: [
            { answer: String(vehicles - 1), tag: 'raisonnement', why: `Avec ${vehicles - 1} véhicules, seules ${seats * (vehicles - 1)} personnes seraient transportées : il en resterait ${people - seats * (vehicles - 1)}.` },
            { answer: fr(divR(R(people), R(seats)), 2), tag: 'raisonnement', why: 'Un véhicule ne se coupe pas en morceaux : il faut arrondir au-dessus.' },
          ],
        },
        hints: [
          'Regardez combien de véhicules pleins on peut former, puis ce qu’il advient des personnes restantes.',
          `Divisez ${people} par ${seats}. Le reste doit aussi être transporté.`,
        ],
        alternative: [
          p('Comptez véhicule par véhicule.'),
          p(`1 véhicule : ${seats} personnes. 2 : ${seats * 2}. On continue jusqu’à atteindre ou dépasser ${people}.`),
        ],
        solution: [
          { text: 'Diviser.', calc: `${people} ÷ ${seats} = ${Math.floor(people / seats)} et il reste ${people % seats}`, why: 'Le quotient donne les véhicules pleins.' },
          { text: `Le reste de ${people % seats} ${people % seats > 1 ? 'personnes doit' : 'personne doit'} aussi voyager.`, why: 'On ne laisse personne sur place : un véhicule supplémentaire est nécessaire.' },
          { text: `Total : ${vehicles} véhicules.`, why: `Le dernier véhicule ne transportera que ${lastCount} ${lastCount > 1 ? 'personnes' : 'personne'}.` },
        ],
        conclusion: `Il faut ${vehicles} véhicules ; le dernier sera occupé par ${lastCount} ${lastCount > 1 ? 'personnes' : 'personne'}.`,
        placeholder: 'Nombre de véhicules',
        keyboard: 'decimal',
      }
    },
  },

  // ---------------------------------------------------------------- M16 ---
  {
    id: 'M16-reponse-impossible',
    skillId: 'M16',
    level: 'decouverte',
    structure: 'reperer-une-reponse-impossible',
    version: 1,
    review: 'teste-automatiquement',
    seconds: 55,
    generate: (rng) => {
      const budget = rng.pick([100, 150, 200])
      const spent = rng.int(30, 90)
      const right = budget - spent
      const options = rng.shuffle([
        { id: 'ok', label: `${right} €`, bad: '' },
        { id: 'sup', label: `${budget + spent} €`, bad: 'Ce montant dépasse le budget de départ : ce qui reste ne peut pas être plus grand que ce qu’on avait.' },
        { id: 'neg', label: `−${spent} €`, bad: 'Un reste négatif signifierait un découvert, ce que l’énoncé ne mentionne pas.' },
      ])
      return {
        prompt: [p(`Un budget de ${budget} € est entamé par une dépense de ${spent} €. On cherche ce qui reste.`)],
        question: 'Quelle réponse est plausible, sans même poser le calcul ?',
        answer: {
          kind: 'choice',
          options: options.map((o) => ({ id: o.id, label: o.label, feedback: o.bad, tag: 'raisonnement' })),
          correct: ['ok'],
        },
        hints: [
          'Ce qui reste après une dépense est forcément plus petit que le budget de départ.',
          'Éliminez les réponses qui n’ont pas de sens avant de calculer.',
        ],
        alternative: [
          p('Encadrez la réponse avant de la calculer.'),
          p(`Le reste est forcément compris entre 0 et ${budget} €. Toute réponse hors de cet intervalle est fausse.`),
        ],
        solution: [
          { text: 'Encadrer.', calc: `0 ≤ reste ≤ ${budget}`, why: 'On ne peut pas rendre plus que ce qu’on avait, ni obtenir un reste négatif sans découvert.' },
          { text: 'Calculer.', calc: `${budget} − ${spent} = ${right} €`, why: 'La seule réponse de l’intervalle était la bonne.' },
        ],
      }
    },
  },
  {
    id: 'M16-controle-unite',
    skillId: 'M16',
    level: 'entrainement',
    structure: 'controler-l-unite-d-un-resultat',
    version: 1,
    review: 'teste-automatiquement',
    seconds: 60,
    generate: (rng) => {
      const cases = [
        { calc: 'Un trajet de 1,2 km', wrong: '1,2 m', right: '1 200 m', why: 'Le mètre est plus petit que le kilomètre : le nombre doit devenir plus grand.' },
        { calc: 'Une masse de 0,45 kg', wrong: '4,5 g', right: '450 g', why: 'Entre kg et g il y a trois rangs, donc un facteur 1 000.' },
        { calc: 'Un volume de 2,5 L', wrong: '25 mL', right: '2 500 mL', why: 'Entre L et mL il y a trois rangs, donc un facteur 1 000.' },
        { calc: 'Une longueur de 35 cm', wrong: '3,5 m', right: '0,35 m', why: 'Le mètre est plus grand que le centimètre : le nombre doit devenir plus petit.' },
      ]
      const c = rng.pick(cases)
      const options = rng.shuffle([c.right, c.wrong])
      return {
        prompt: [p(`${c.calc}. Une candidate doit donner cette mesure dans une autre unité.`)],
        question: 'Quelle conversion est correcte ?',
        answer: {
          kind: 'choice',
          options: options.map((o) => ({ id: o, label: o, feedback: o === c.right ? '' : c.why, tag: 'unite' })),
          correct: [c.right],
        },
        hints: [
          'Demandez-vous si le nombre doit devenir plus grand ou plus petit.',
          'Comptez ensuite les rangs entre les deux unités : chaque rang vaut un facteur 10.',
        ],
        alternative: [
          p('Testez avec un repère connu.'),
          p('1 km = 1 000 m ; 1 kg = 1 000 g ; 1 L = 1 000 mL ; 1 m = 100 cm. Appliquez le même facteur au nombre donné.'),
        ],
        solution: [{ text: `La conversion correcte est ${c.right}.`, why: c.why }],
      }
    },
  },
  {
    id: 'M16-etape-fautive-conversion',
    skillId: 'M16',
    level: 'epreuve',
    structure: 'reperer-l-etape-fautive-d-une-conversion',
    version: 1,
    transfer: true,
    review: 'teste-automatiquement',
    seconds: 90,
    generate: (rng) => {
      const litres = dec(rng.int(12, 48), 1)
      const ml = R(rng.pick([150, 250, 350, 450]))
      const wrongTotal = addR(litres, ml)
      const rightTotal = addR(mulR(litres, R(1000)), ml)
      return {
        prompt: [
          p('Voici la copie d’une candidate. Le résultat annoncé est faux.'),
          vis({
            type: 'calc-steps',
            steps: [
              { calc: `Étape 1 : on veut additionner ${fr(litres)} L et ${fr(ml)} mL.` },
              { calc: `Étape 2 : on additionne directement ${fr(litres)} + ${fr(ml)}.` },
              { calc: `Étape 3 : on obtient ${fr(wrongTotal)}.` },
              { calc: `Étape 4 : on écrit « ${fr(wrongTotal)} mL ».` },
            ],
          }),
        ],
        question: 'Quelle est la première étape fautive ?',
        answer: {
          kind: 'choice',
          options: [
            { id: '1', label: 'Étape 1', feedback: 'L’étape 1 ne fait que reformuler l’énoncé : elle est correcte.', tag: 'consigne' },
            { id: '2', label: 'Étape 2', feedback: '' },
            { id: '3', label: 'Étape 3', feedback: 'L’addition posée à l’étape 3 est exacte ; c’est ce qu’elle additionne qui ne va pas.', tag: 'operation' },
            { id: '4', label: 'Étape 4', feedback: 'L’unité écrite à la fin est cohérente avec ce qui précède. L’erreur est apparue plus tôt.', tag: 'unite' },
          ],
          correct: ['2'],
        },
        hints: [
          'Reprenez chaque étape et cherchez la première qui n’a pas de sens.',
          'On ne peut additionner que des quantités écrites dans la même unité.',
        ],
        alternative: [
          p('Contrôlez par l’ordre de grandeur.'),
          p(
            `${fr(litres)} L font déjà ${fr(mulR(litres, R(1000)))} mL. Le résultat annoncé, ${fr(wrongTotal)} mL, est bien plus petit : c’est impossible.`,
          ),
        ],
        solution: [
          { text: 'L’étape 2 additionne des litres et des millilitres.', why: 'Ce sont deux unités différentes : l’addition n’a pas de sens.' },
          { text: 'Conversion préalable.', calc: `${fr(litres)} L = ${fr(mulR(litres, R(1000)))} mL`, why: 'Trois rangs séparent L et mL.' },
          { text: 'Addition correcte.', calc: `${fr(mulR(litres, R(1000)))} + ${fr(ml)} = ${fr(rightTotal)} mL`, why: 'Les deux volumes sont maintenant comparables.' },
        ],
      }
    },
  },
]

