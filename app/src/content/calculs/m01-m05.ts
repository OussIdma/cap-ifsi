/**
 * Calculs — M01 à M05 : lire les nombres, les quatre opérations, priorités.
 *
 * Chaque gabarit produit un énoncé complet, deux indices qui n'annoncent pas la
 * réponse, une explication alternative et une correction pas à pas.
 */

import { addR, divR, mulR, rat, roundR, subR, toFrench, toNumber, type Rational } from '@/engine/rational'
import type { ExerciseTemplate, Lesson } from '../types'
import { fr, frInt, key, p, vis, warn, conversionVisual, lead } from '../blocks'

const R = (n: number | bigint, d: number | bigint = 1) => rat(BigInt(n), BigInt(d))

/** Décimal à partir de centièmes : dec(1875, 2) = 18,75 */
const dec = (digits: number, places: number): Rational => rat(BigInt(digits), 10n ** BigInt(places))

// ===========================================================================
// Leçons
// ===========================================================================

export const LESSONS_M01_M05: Lesson[] = [
  {
    skillId: 'M01',
    review: 'relu-par-le-modele',
    explanation: [
      lead('Dans un nombre, ce n’est pas le chiffre qui compte, c’est la place qu’il occupe.'),
      p(
        'Dans 347, le 3 ne vaut pas « trois » : il vaut trois centaines, soit 300. Chaque fois qu’on avance d’une place vers la gauche, la valeur est multipliée par 10. Chaque fois qu’on avance d’une place vers la droite, elle est divisée par 10.',
      ),
      p(
        'La virgule ne sépare pas deux nombres. Elle marque simplement l’endroit où l’on passe des unités entières aux parties d’unité : les dixièmes, les centièmes, les millièmes.',
      ),
      vis(
        conversionVisual(
          ['centaines', 'dizaines', 'unités', 'dixièmes', 'centièmes'],
          '347',
          2,
          'Le nombre 347,25 placé dans un tableau de position.',
          '25',
        ),
      ),
      key(
        'Pour comparer deux décimaux, on compare d’abord la partie entière. Si elle est identique, on compare les dixièmes, puis les centièmes, dans cet ordre.',
      ),
      warn(
        '3,5 est plus grand que 3,45. On ne compare pas le nombre de chiffres après la virgule : 5 dixièmes valent 50 centièmes, contre 45 centièmes.',
      ),
    ],
    alternative: [
      p('Imaginez de la monnaie. 1 euro, c’est 10 pièces de 10 centimes, ou 100 pièces de 1 centime.'),
      p(
        'Écrire 3,45 €, c’est écrire 3 euros, 4 pièces de 10 centimes et 5 pièces de 1 centime. Écrire 3,5 €, c’est 3 euros et 5 pièces de 10 centimes, donc 50 centimes.',
      ),
      p('50 centimes, c’est plus que 45 centimes. Donc 3,5 est plus grand que 3,45.'),
      key('Pour comparer, ramenez tout au même nombre de décimales : 3,50 contre 3,45. La comparaison devient évidente.'),
    ],
    workedExamples: [
      {
        statement: 'Ranger dans l’ordre croissant : 8,7 — 8,07 — 8,70 — 8,7 1.',
        steps: [
          {
            do: 'Écrire tous les nombres avec le même nombre de décimales : 8,70 — 8,07 — 8,70 — 8,71.',
            why: 'Ajouter un zéro à droite de la partie décimale ne change pas la valeur, mais rend la comparaison directe.',
          },
          {
            do: 'Comparer les parties entières : elles valent toutes 8.',
            why: 'On ne peut départager qu’à égalité de partie entière.',
          },
          {
            do: 'Comparer les centièmes : 07 < 70 = 70 < 71.',
            why: 'Une fois toutes les écritures alignées, le nombre après la virgule se compare comme un entier.',
          },
        ],
        conclusion: 'Ordre croissant : 8,07 < 8,7 = 8,70 < 8,71.',
      },
    ],
    commonMistakes: [
      {
        mistake: 'Croire que 8,07 est plus grand que 8,7 parce qu’il a plus de chiffres.',
        fix: 'Alignez les décimales : 8,07 contre 8,70.',
        tag: 'virgule',
      },
      {
        mistake: 'Lire 3,5 comme « trois virgule cinq » sans savoir ce que vaut le 5.',
        fix: 'Le 5 occupe la place des dixièmes : il vaut 5/10, soit un demi.',
        tag: 'virgule',
      },
    ],
  },
  {
    skillId: 'M02',
    review: 'relu-par-le-modele',
    explanation: [
      lead('Additionner et soustraire des décimaux, c’est additionner et soustraire des choses de même rang.'),
      p(
        'On aligne les virgules les unes sous les autres. Les unités sous les unités, les dixièmes sous les dixièmes. Si une écriture a moins de décimales, on complète avec des zéros.',
      ),
      vis({
        type: 'calc-steps',
        steps: [
          { calc: '  18,75', why: 'On aligne la virgule.' },
          { calc: '+  6,80', why: '6,8 s’écrit aussi 6,80 : cela ne change pas sa valeur.' },
          { calc: '= 25,55', why: 'On additionne colonne par colonne, de droite à gauche.' },
        ],
      }),
      key(
        'Pour vérifier une soustraction, ajoutez le résultat au nombre retiré : vous devez retrouver le nombre de départ.',
      ),
      warn('Écrire 18,75 + 6,8 en alignant 75 sous 8 donne un résultat faux. C’est la virgule qui sert de repère, pas la fin du nombre.'),
    ],
    alternative: [
      p('Pensez à deux tiroirs : celui des euros et celui des centimes.'),
      p(
        '18,75 €, c’est 18 euros et 75 centimes. 6,80 €, c’est 6 euros et 80 centimes. Les euros vont avec les euros : 18 + 6 = 24. Les centimes vont avec les centimes : 75 + 80 = 155 centimes.',
      ),
      p('155 centimes, c’est 1 euro et 55 centimes. On ajoute cet euro au tiroir des euros : 24 + 1 = 25, et il reste 55 centimes.'),
      key('Résultat : 25,55 €. La retenue n’est rien d’autre qu’un tiroir qui déborde.'),
    ],
    workedExamples: [
      {
        statement: 'Un service note 12,4 litres de solution hydroalcoolique en stock. Il en reçoit 7,85 litres. Quel est le nouveau stock ?',
        steps: [
          { do: 'Écrire 12,40 au lieu de 12,4.', why: 'Pour aligner les centièmes et ne pas se tromper de colonne.', calc: '12,40 + 7,85' },
          { do: 'Additionner les centièmes : 0 + 5 = 5.', why: 'On commence toujours par la droite.' },
          { do: 'Additionner les dixièmes : 4 + 8 = 12, on pose 2 et on retient 1.', why: '12 dixièmes, c’est 1 unité et 2 dixièmes.' },
          { do: 'Additionner les unités : 12 + 7 + 1 de retenue = 20.', why: 'La retenue vient du dépassement précédent.' },
        ],
        conclusion: 'Le nouveau stock est de 20,25 litres.',
      },
    ],
    commonMistakes: [
      { mistake: 'Aligner les nombres à droite au lieu d’aligner les virgules.', fix: 'Complétez avec des zéros : 6,8 devient 6,80.', tag: 'virgule' },
      { mistake: 'Oublier la retenue.', fix: 'Vérifiez en refaisant le calcul dans l’autre sens.', tag: 'operation' },
    ],
  },
  {
    skillId: 'M03',
    review: 'relu-par-le-modele',
    explanation: [
      lead('Multiplier, c’est ajouter plusieurs fois la même quantité, en une seule opération.'),
      p(
        'Si un carton contient 24 gants et que vous avez 7 cartons, vous pourriez additionner 24 sept fois. La multiplication fait ce travail d’un coup : 24 × 7 = 168.',
      ),
      p(
        'Multiplier par 10, 100 ou 1 000 déplace simplement la virgule vers la droite : d’un rang, de deux rangs, de trois rangs. 3,5 × 10 = 35 ; 3,5 × 100 = 350.',
      ),
      vis({
        type: 'calc-steps',
        steps: [
          { calc: '2,4 × 10 = 24', why: 'Chaque chiffre monte d’un rang : les dixièmes deviennent des unités.' },
          { calc: '2,4 × 100 = 240', why: 'Deux rangs. On complète avec un zéro.' },
          { calc: '2,4 ÷ 10 = 0,24', why: 'Dans l’autre sens, chaque chiffre descend d’un rang.' },
        ],
      }),
      key(
        'Avant de poser une multiplication, estimez : 24 × 7, c’est proche de 25 × 7 = 175. Si vous trouvez 1 680 ou 16,8, vous saurez immédiatement qu’il y a une erreur de rang.',
      ),
    ],
    alternative: [
      p('Voyez une multiplication comme un rectangle.'),
      p(
        'Pour 24 × 7, dessinez un rectangle de 24 de large et 7 de haut. Vous pouvez le couper en deux : un morceau de 20 × 7 = 140, et un morceau de 4 × 7 = 28. Total : 168.',
      ),
      p('C’est exactement ce que fait la multiplication posée, colonne par colonne : elle découpe le rectangle.'),
      key('Découper en dizaines et unités permet de multiplier de tête, sans poser l’opération.'),
    ],
    workedExamples: [
      {
        statement: 'Un service commande 14 boîtes de 250 compresses. Combien de compresses en tout ?',
        steps: [
          { do: 'Estimer : 14 × 250, c’est un peu moins que 15 × 250 = 3 750.', why: 'L’estimation sert de garde-fou.' },
          { do: 'Découper : 14 = 10 + 4.', why: 'Multiplier par 10 est immédiat.', calc: '250 × 10 = 2 500' },
          { do: 'Calculer la seconde partie.', why: 'Il reste 4 boîtes.', calc: '250 × 4 = 1 000' },
          { do: 'Additionner les deux morceaux.', why: 'Le rectangle complet est la somme des deux morceaux.', calc: '2 500 + 1 000 = 3 500' },
        ],
        conclusion: 'Il y a 3 500 compresses, ce qui est bien proche de l’estimation de 3 750.',
      },
    ],
    commonMistakes: [
      { mistake: 'Ajouter un zéro à 2,4 pour le multiplier par 10 et écrire 2,40.', fix: 'Ajouter un zéro ne marche que pour les entiers. Déplacez la virgule : 24.', tag: 'virgule' },
      { mistake: 'Oublier de décaler la deuxième ligne d’une multiplication posée.', fix: 'La deuxième ligne multiplie par des dizaines : elle se décale d’un rang.', tag: 'operation' },
    ],
  },
  {
    skillId: 'M04',
    review: 'relu-par-le-modele',
    explanation: [
      lead('Une division répond à deux questions différentes. Savoir laquelle est posée évite la moitié des erreurs.'),
      p(
        'Premier sens, le partage : 60 compresses réparties équitablement entre 4 chariots. On cherche combien il y en a par chariot. 60 ÷ 4 = 15 compresses par chariot.',
      ),
      p(
        'Deuxième sens, le groupement : 60 compresses rangées par paquets de 4. On cherche combien de paquets on peut faire. 60 ÷ 4 = 15 paquets. Le calcul est le même, mais la réponse ne désigne pas la même chose.',
      ),
      key(
        'Le reste d’une division n’est pas toujours à ignorer. Selon la situation, on le laisse de côté, on l’arrondit au-dessus, ou on le mentionne.',
      ),
      vis({
        type: 'table',
        headers: ['Situation', 'Que faire du reste ?'],
        rows: [
          ['Combien de boîtes remplies complètement ?', 'On ignore le reste.'],
          ['Combien de boîtes faut-il acheter ?', 'On ajoute une boîte pour le reste.'],
          ['Combien chacun reçoit-il ?', 'On indique le reste séparément.'],
        ],
        caption: 'Le reste se traite selon la question, pas selon une règle unique.',
      }),
    ],
    alternative: [
      p('Prenez 50 objets et des boîtes de 12.'),
      p('Une boîte : 12. Deux : 24. Trois : 36. Quatre : 48. Il reste 2 objets qui n’ont pas de boîte.'),
      p(
        'Si la question est « combien de boîtes pleines ? », la réponse est 4. Si la question est « combien de boîtes faut-il acheter ? », la réponse est 5, parce que les 2 objets restants doivent bien être rangés quelque part.',
      ),
      warn('La calculatrice affiche 4,1666… Ce nombre ne veut rien dire ici : on n’achète pas 0,17 boîte.'),
    ],
    workedExamples: [
      {
        statement: '50 protège-matelas sont vendus par boîtes de 12. Combien de boîtes faut-il commander ?',
        steps: [
          { do: 'Poser la division 50 ÷ 12.', why: 'On cherche combien de paquets de 12 tiennent dans 50 : c’est un groupement.' },
          { do: 'Calculer : 12 × 4 = 48, il reste 2.', why: '12 × 5 = 60, donc 5 boîtes seraient trop pour un remplissage complet.', calc: '50 = 12 × 4 + 2' },
          { do: 'Décider du sort du reste.', why: 'Les 2 protège-matelas restants doivent être livrés : il faut une boîte supplémentaire.' },
        ],
        conclusion: 'Il faut commander 5 boîtes. 4 boîtes seraient insuffisantes, et la réponse 4,17 n’a pas de sens pour un objet qu’on achète entier.',
      },
    ],
    commonMistakes: [
      { mistake: 'Répondre 4,17 boîtes.', fix: 'Un conditionnement s’achète entier : arrondissez au-dessus.', tag: 'raisonnement' },
      { mistake: 'Confondre le quotient et le reste.', fix: 'Le quotient répond à la question, le reste est ce qui n’a pas pu être réparti.', tag: 'raisonnement' },
    ],
  },
  {
    skillId: 'M05',
    review: 'relu-par-le-modele',
    explanation: [
      lead('Quand plusieurs opérations se suivent, l’ordre n’est pas libre.'),
      p('On calcule d’abord ce qui est entre parenthèses. Ensuite les multiplications et les divisions, de gauche à droite. Enfin les additions et les soustractions.'),
      vis({
        type: 'calc-steps',
        steps: [
          { calc: '5 + 3 × 4', why: 'La multiplication passe avant l’addition.' },
          { calc: '= 5 + 12', why: 'On calcule 3 × 4 en premier.' },
          { calc: '= 17', why: 'Et non 32, qu’on obtiendrait en calculant de gauche à droite.' },
        ],
      }),
      p(
        'Arrondir, c’est choisir le nombre le plus proche à un rang donné. Pour arrondir au dixième, on regarde le chiffre des centièmes : s’il vaut 5 ou plus, on monte ; sinon on garde.',
      ),
      key('N’arrondissez qu’à la fin. Un arrondi fait au milieu d’un calcul se propage et fausse le résultat final.'),
    ],
    alternative: [
      p('Voyez les opérations comme des niveaux de force.'),
      p(
        'Les parenthèses sont les plus fortes : elles s’imposent. Viennent ensuite la multiplication et la division. L’addition et la soustraction sont les plus faibles : elles attendent leur tour.',
      ),
      p('Dans 5 + 3 × 4, la multiplication « 3 × 4 » est un bloc soudé. On ne peut pas le casser pour prendre le 3 avec le 5.'),
      key('Pour lever tout doute, écrivez vous-même les parenthèses : 5 + (3 × 4).'),
    ],
    workedExamples: [
      {
        statement: 'Calculer (12,5 + 7,5) ÷ 4 + 3, puis arrondir au dixième.',
        steps: [
          { do: 'Calculer la parenthèse.', why: 'Les parenthèses passent avant tout.', calc: '12,5 + 7,5 = 20' },
          { do: 'Effectuer la division.', why: 'Division avant addition.', calc: '20 ÷ 4 = 5' },
          { do: 'Effectuer l’addition.', why: 'C’est la dernière opération dans l’ordre de priorité.', calc: '5 + 3 = 8' },
          { do: 'Arrondir au dixième.', why: 'Le résultat est déjà un entier : 8,0.', calc: '8' },
        ],
        conclusion: 'Le résultat est 8.',
      },
    ],
    commonMistakes: [
      { mistake: 'Calculer de gauche à droite sans regarder les opérations.', fix: 'Repérez d’abord les multiplications et divisions et soulignez-les.', tag: 'operation' },
      { mistake: 'Arrondir chaque étape.', fix: 'Gardez les décimales jusqu’au résultat final.', tag: 'arrondi' },
    ],
  },
]

// ===========================================================================
// Contextes fictifs, non cliniques
// ===========================================================================

const OBJETS = [
  { s: 'gant à usage unique', pl: 'gants à usage unique' },
  { s: 'compresse', pl: 'compresses' },
  { s: 'serviette', pl: 'serviettes' },
  { s: 'gobelet', pl: 'gobelets' },
  { s: 'stylo', pl: 'stylos' },
  { s: 'classeur', pl: 'classeurs' },
  { s: 'protège-matelas', pl: 'protège-matelas' },
  { s: 'sachet de thé', pl: 'sachets de thé' },
] as const

const LIEUX = [
  'le service de jour',
  'la salle de pause',
  'le vestiaire',
  'la lingerie',
  'la réserve du deuxième étage',
  'le local de matériel',
] as const

// ===========================================================================
// Gabarits
// ===========================================================================

export const TEMPLATES_M01_M05: ExerciseTemplate[] = [
  // ---------------------------------------------------------------- M01 ---
  {
    id: 'M01-comparer',
    skillId: 'M01',
    level: 'decouverte',
    structure: 'comparer-deux-decimaux',
    version: 1,
    review: 'teste-automatiquement',
    seconds: 40,
    generate: (rng) => {
      const whole = rng.int(2, 9)
      const a = dec(whole * 100 + rng.int(1, 9), 2) // ex. 8,07
      const b = dec(whole * 10 + rng.int(1, 9), 1) // ex. 8,7
      const bigger = a.n * b.d > b.n * a.d ? a : b
      return {
        prompt: [p(`Deux relevés indiquent ${fr(a)} et ${fr(b)}.`)],
        question: 'Quel est le plus grand des deux nombres ?',
        answer: {
          kind: 'choice',
          options: [
            { id: 'a', label: fr(a), feedback: comparisonFeedback(a, b, bigger === a), tag: 'virgule' },
            { id: 'b', label: fr(b), feedback: comparisonFeedback(b, a, bigger === b), tag: 'virgule' },
          ],
          correct: [bigger === a ? 'a' : 'b'],
        },
        hints: [
          'Les deux nombres ont la même partie entière. Ce qui les sépare se joue après la virgule.',
          'Écrivez les deux nombres avec le même nombre de décimales, en complétant par un zéro à droite si besoin.',
        ],
        alternative: [
          p(`Transformez en centimes : ${fr(a)} € donne ${fr(mulR(a, R(100)))} centimes, et ${fr(b)} € donne ${fr(mulR(b, R(100)))} centimes.`),
          p('Avec la même unité des deux côtés, la comparaison devient une comparaison d’entiers.'),
        ],
        solution: [
          { text: 'Aligner les décimales.', calc: `${fr(a)} et ${fr(b)} s’écrivent ${fr(a)} et ${toFrench(b)}0`, why: 'Un zéro à droite de la partie décimale ne change pas la valeur.' },
          { text: 'Comparer les centièmes une fois alignés.', why: 'À partie entière égale, c’est la partie décimale qui départage.' },
        ],
        conclusion: `Le plus grand est ${fr(bigger)}.`,
      }
    },
  },
  {
    id: 'M01-ranger',
    skillId: 'M01',
    level: 'entrainement',
    structure: 'ranger-quatre-decimaux',
    version: 1,
    review: 'teste-automatiquement',
    seconds: 70,
    generate: (rng) => {
      const whole = rng.int(3, 9)
      const raw = [
        dec(whole * 100 + rng.int(1, 9), 2),
        dec(whole * 10 + rng.int(1, 4), 1),
        dec(whole * 10 + rng.int(5, 9), 1),
        dec(whole * 100 + rng.int(60, 99), 2),
      ]
      const items = raw.map((v, i) => ({ id: `n${i}`, label: fr(v), value: v }))
      const sorted = [...items].sort((x, y) => Number(x.value.n * y.value.d - y.value.n * x.value.d))
      const shown = rng.shuffle(items)
      return {
        prompt: [p('Quatre mesures ont été relevées dans le même service.')],
        question: 'Rangez ces nombres du plus petit au plus grand.',
        answer: {
          kind: 'order',
          items: shown.map((i) => ({ id: i.id, label: i.label })),
          correct: sorted.map((i) => i.id),
        },
        hints: [
          'Commencez par regarder la partie entière : ici, elle est la même partout.',
          'Réécrivez chaque nombre avec deux décimales, puis comparez comme des entiers.',
        ],
        alternative: [
          p('Écrivez les quatre nombres les uns sous les autres, virgules alignées.'),
          p('Comparez colonne par colonne, en partant de la gauche. La première colonne où les chiffres diffèrent décide du classement.'),
        ],
        solution: [
          { text: 'Aligner toutes les écritures sur deux décimales.', why: 'Sans cela, on compare des dixièmes avec des centièmes.' },
          { text: `Ordre obtenu : ${sorted.map((i) => i.label).join(' < ')}.`, why: 'La comparaison se fait ensuite comme sur des entiers.' },
        ],
      }
    },
  },
  {
    id: 'M01-valeur-position',
    skillId: 'M01',
    level: 'decouverte',
    structure: 'valeur-du-chiffre',
    version: 1,
    review: 'teste-automatiquement',
    seconds: 45,
    generate: (rng) => {
      const d1 = rng.int(1, 9)
      const d2 = rng.int(1, 9)
      const d3 = rng.int(1, 9)
      const d4 = rng.int(1, 9)
      const value = dec(d1 * 1000 + d2 * 100 + d3 * 10 + d4, 2)
      const positions = [
        { idx: 0, digit: d1, name: 'dizaines', worth: rat(BigInt(d1) * 10n) },
        { idx: 1, digit: d2, name: 'unités', worth: rat(BigInt(d2)) },
        { idx: 2, digit: d3, name: 'dixièmes', worth: rat(BigInt(d3), 10n) },
        { idx: 3, digit: d4, name: 'centièmes', worth: rat(BigInt(d4), 100n) },
      ]
      const chosen = rng.pick(positions)
      return {
        prompt: [
          p(`On écrit le nombre ${fr(value)}.`),
          vis(
            conversionVisual(
              ['dizaines', 'unités', 'dixièmes', 'centièmes'],
              `${d1}${d2}`,
              1,
              'Le nombre placé dans le tableau de position.',
              `${d3}${d4}`,
            ),
          ),
        ],
        question: `Que vaut le chiffre ${chosen.digit} placé à la position des ${chosen.name} ?`,
        answer: {
          kind: 'numeric',
          value: chosen.worth,
          // Sur la colonne des unites, « lire le chiffre » donne la bonne
          // reponse : le piege n'existe pas et n'est donc pas propose.
          pitfalls:
            chosen.name === 'unités'
              ? []
              : [
                  {
                    answer: String(chosen.digit),
                    tag: 'virgule' as const,
                    why: `Le chiffre s’écrit ${chosen.digit}, mais il ne vaut ${chosen.digit} que s’il est à la place des unités. Ici il occupe la place des ${chosen.name}.`,
                  },
                ],
        },
        hints: [
          'Un chiffre ne vaut pas la même chose selon la colonne qu’il occupe.',
          'Les dizaines valent 10 fois l’unité, les dixièmes valent un dixième d’unité, les centièmes un centième.',
        ],
        alternative: [
          p('Repensez à de la monnaie : un 3 dans la colonne des dixièmes, ce sont 3 pièces de 10 centimes, donc 0,30 €.'),
          p('Un 3 dans la colonne des dizaines, ce sont 3 billets de 10 euros, donc 30 €. Même chiffre, valeurs très différentes.'),
        ],
        solution: [
          { text: `Repérer la colonne : les ${chosen.name}.`, why: 'C’est la position qui fixe la valeur.' },
          { text: `Multiplier le chiffre par la valeur de la colonne.`, calc: `${chosen.digit} × ${chosen.name === 'dizaines' ? '10' : chosen.name === 'unités' ? '1' : chosen.name === 'dixièmes' ? '0,1' : '0,01'} = ${fr(chosen.worth)}`, why: 'C’est la définition même de la numération de position.' },
        ],
        placeholder: 'Exemple : 0,3',
        keyboard: 'decimal',
      }
    },
  },
  {
    id: 'M01-dixiemes',
    skillId: 'M01',
    level: 'entrainement',
    structure: 'combien-de-dixiemes',
    version: 1,
    review: 'teste-automatiquement',
    seconds: 50,
    generate: (rng) => {
      const unit = rng.pick(['dixièmes', 'centièmes'] as const)
      const places = unit === 'dixièmes' ? 1 : 2
      const whole = rng.int(1, 9)
      const frac = places === 1 ? rng.int(1, 9) : rng.int(11, 99) | 1
      const value = dec(whole * 10 ** places + frac, places)
      const count = mulR(value, rat(10n ** BigInt(places)))
      return {
        prompt: [p(`On considère le nombre ${fr(value)}.`)],
        question: `Combien de ${unit} contient ce nombre au total ?`,
        answer: {
          kind: 'numeric',
          value: count,
          pitfalls: [
            {
              answer: String(frac),
              tag: 'consigne',
              why: `Vous avez compté seulement les ${unit} écrits après la virgule. La question porte sur le nombre total, partie entière comprise : chaque unité contient ${10 ** places} ${unit}.`,
            },
          ],
        },
        hints: [
          `Commencez par un cas simple : combien de ${unit} dans 1 tout seul ?`,
          `Une unité vaut ${10 ** places} ${unit}. Multipliez donc le nombre entier de départ par ${10 ** places}.`,
        ],
        alternative: [
          p(`Un euro vaut 100 centimes. Donc ${fr(value)} euros valent ${fr(count)} centimes si l’on compte en centièmes.`),
          p('Convertir en « petites unités », c’est exactement multiplier par 10 ou par 100.'),
        ],
        solution: [
          { text: `Multiplier par ${10 ** places}.`, calc: `${fr(value)} × ${10 ** places} = ${fr(count)}`, why: `Chaque unité contient ${10 ** places} ${unit}.` },
        ],
        placeholder: 'Nombre entier',
        keyboard: 'decimal',
      }
    },
  },
  {
    id: 'M01-lecture-releve',
    skillId: 'M01',
    level: 'epreuve',
    structure: 'lire-un-releve-et-comparer',
    version: 1,
    transfer: true,
    review: 'teste-automatiquement',
    seconds: 80,
    generate: (rng) => {
      const days = ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi']
      const values = days.map(() => dec(rng.int(120, 199), 2))
      const maxIdx = values.reduce((best, v, i) => (v.n * values[best]!.d > values[best]!.n * v.d ? i : best), 0)
      const minIdx = values.reduce((best, v, i) => (v.n * values[best]!.d < values[best]!.n * v.d ? i : best), 0)
      const askMax = rng.chance(0.5)
      const target = askMax ? maxIdx : minIdx
      return {
        prompt: [
          p('Une équipe note chaque jour la quantité de solution hydroalcoolique utilisée, en litres.'),
          vis({
            type: 'table',
            headers: ['Jour', 'Quantité (L)'],
            rows: days.map((d, i) => [d, fr(values[i]!)]),
            align: ['left', 'right'],
          }),
        ],
        question: askMax ? 'Quel jour la quantité utilisée est-elle la plus élevée ?' : 'Quel jour la quantité utilisée est-elle la plus faible ?',
        answer: {
          kind: 'choice',
          options: days.map((d, i) => ({
            id: d,
            label: d,
            feedback:
              i === target
                ? ''
                : `${fr(values[i]!)} L n’est pas la valeur ${askMax ? 'la plus élevée' : 'la plus faible'} : comparez les parties décimales une fois alignées.`,
            tag: 'virgule',
          })),
          correct: [days[target]!],
        },
        hints: [
          'Toutes les valeurs ont la même partie entière ou presque : regardez ce qui suit la virgule.',
          'Alignez mentalement toutes les valeurs sur deux décimales avant de comparer.',
        ],
        alternative: [
          p('Convertissez tout en millilitres : multipliez chaque valeur par 1 000.'),
          p('Comparer des entiers évite toute hésitation sur la virgule.'),
        ],
        solution: [
          { text: 'Comparer les parties entières, puis les décimales.', why: 'La partie entière prime toujours.' },
          { text: `La valeur ${askMax ? 'maximale' : 'minimale'} est ${fr(values[target]!)} L, le ${days[target]}.`, why: 'C’est la seule qui ne soit dépassée par aucune autre dans le sens demandé.' },
        ],
      }
    },
  },

  // ---------------------------------------------------------------- M02 ---
  {
    id: 'M02-addition-decimale',
    skillId: 'M02',
    level: 'decouverte',
    structure: 'addition-deux-decimaux',
    version: 1,
    review: 'teste-automatiquement',
    seconds: 55,
    generate: (rng) => {
      const a = dec(rng.int(500, 3500), 2)
      const b = dec(rng.int(10, 99), 1)
      const total = addR(a, b)
      return {
        prompt: [
          p(`Le stock de ${rng.pick(LIEUX)} contient ${fr(a)} litres de produit. Une livraison apporte ${fr(b)} litres supplémentaires.`),
        ],
        question: 'Quel est le stock total, en litres ?',
        answer: {
          kind: 'numeric',
          value: total,
          unit: 'L',
          unitPolicy: 'optional',
          pitfalls: [
            {
              answer: fr(addR(a, mulR(b, R(1, 10)))),
              tag: 'virgule',
              why: 'Les chiffres ont été alignés à droite au lieu d’aligner les virgules. Complétez d’abord la seconde valeur avec un zéro.',
            },
          ],
        },
        hints: [
          'Écrivez les deux nombres l’un sous l’autre, virgules alignées.',
          `Complétez ${fr(b)} avec un zéro pour avoir deux décimales des deux côtés, puis additionnez colonne par colonne.`,
        ],
        alternative: [
          p('Séparez les litres entiers et les centilitres.'),
          p('Additionnez les entiers d’un côté, les parties décimales de l’autre, puis rassemblez en reportant l’éventuel dépassement.'),
        ],
        solution: [
          { text: 'Aligner les virgules et compléter par un zéro.', calc: `${fr(a)} + ${toFrench(b)}0`, why: 'On additionne des dixièmes avec des dixièmes, des centièmes avec des centièmes.' },
          { text: 'Additionner colonne par colonne, de droite à gauche.', calc: `= ${fr(total)}`, why: 'Chaque dépassement de 10 donne une retenue au rang supérieur.' },
        ],
        conclusion: `Le stock total est de ${fr(total)} litres.`,
        placeholder: 'Exemple : 20,25',
        keyboard: 'decimal',
        suffix: 'L',
      }
    },
  },
  {
    id: 'M02-soustraction-emprunt',
    skillId: 'M02',
    level: 'entrainement',
    structure: 'soustraction-avec-emprunt',
    version: 1,
    review: 'teste-automatiquement',
    seconds: 60,
    generate: (rng) => {
      const a = dec(rng.int(4000, 9000), 2)
      const b = dec(rng.int(1000, 3500), 2)
      const diff = subR(a, b)
      return {
        prompt: [p(`Un budget de formation s’élève à ${fr(a)} €. Une dépense de ${fr(b)} € a déjà été engagée.`)],
        question: 'Combien reste-t-il, en euros ?',
        answer: {
          kind: 'numeric',
          value: diff,
          unit: '€',
          unitPolicy: 'optional',
          pitfalls: [
            { answer: fr(addR(a, b)), tag: 'raisonnement', why: 'Vous avez additionné au lieu de soustraire. « Il reste » demande de retirer la dépense du budget.' },
          ],
        },
        hints: [
          'La question demande ce qui reste : on retire la dépense du budget.',
          'Posez la soustraction avec les virgules alignées. Quand un chiffre du haut est plus petit que celui du bas, empruntez une unité au rang de gauche.',
        ],
        alternative: [
          p('Procédez par étapes, comme quand on rend la monnaie.'),
          p(`Partez de ${fr(b)} et montez jusqu’à ${fr(a)} : d’abord jusqu’à l’euro entier suivant, puis par dizaines d’euros, puis le reste. La somme de ces sauts est la réponse.`),
        ],
        solution: [
          { text: 'Poser la soustraction, virgules alignées.', calc: `${fr(a)} − ${fr(b)}`, why: 'Les rangs doivent se correspondre.' },
          { text: 'Soustraire de droite à gauche, en empruntant si nécessaire.', calc: `= ${fr(diff)}`, why: 'Emprunter revient à transformer une unité du rang supérieur en dix unités du rang courant.' },
          { text: 'Vérifier par l’addition inverse.', calc: `${fr(diff)} + ${fr(b)} = ${fr(a)}`, why: 'Si l’on retrouve le budget de départ, la soustraction est juste.' },
        ],
        conclusion: `Il reste ${fr(diff)} €.`,
        placeholder: 'Exemple : 43,50',
        keyboard: 'decimal',
        suffix: '€',
      }
    },
  },
  {
    id: 'M02-complement',
    skillId: 'M02',
    level: 'entrainement',
    structure: 'trouver-le-complement',
    version: 1,
    review: 'teste-automatiquement',
    seconds: 55,
    generate: (rng) => {
      const target = dec(rng.int(200, 600) * 10, 2)
      const known = dec(rng.int(50, 180) * 10, 2)
      const missing = subR(target, known)
      return {
        prompt: [p(`Une commande doit atteindre exactement ${fr(target)} €. Le panier contient déjà pour ${fr(known)} €.`)],
        question: 'Quelle somme manque-t-il, en euros ?',
        answer: {
          kind: 'numeric',
          value: missing,
          unit: '€',
          unitPolicy: 'optional',
          pitfalls: [
            { answer: fr(addR(target, known)), tag: 'raisonnement', why: 'Vous avez additionné les deux montants. Ce qui manque, c’est l’écart entre l’objectif et ce qui est déjà atteint.' },
          ],
        },
        hints: [
          'Il s’agit d’un écart : entre ce qu’on a et ce qu’on veut atteindre.',
          'Écrivez la relation : somme déjà atteinte + somme manquante = objectif. Puis isolez la somme manquante.',
        ],
        alternative: [
          p('C’est le raisonnement de la monnaie rendue.'),
          p(`Si vous donnez ${fr(target)} € et que l’article coûte ${fr(known)} €, on vous rend l’écart. C’est la même opération.`),
        ],
        solution: [
          { text: 'Écrire la relation.', calc: `${fr(known)} + ? = ${fr(target)}`, why: 'Formuler l’égalité évite de choisir l’opération au hasard.' },
          { text: 'Isoler la valeur inconnue.', calc: `? = ${fr(target)} − ${fr(known)} = ${fr(missing)}`, why: 'L’opération inverse de l’addition est la soustraction.' },
        ],
        conclusion: `Il manque ${fr(missing)} €.`,
        placeholder: 'Exemple : 125,50',
        keyboard: 'decimal',
        suffix: '€',
      }
    },
  },
  {
    id: 'M02-etape-fautive',
    skillId: 'M02',
    level: 'epreuve',
    structure: 'reperer-etape-fautive',
    version: 1,
    review: 'teste-automatiquement',
    seconds: 80,
    generate: (rng) => {
      const a = dec(rng.int(1200, 2400), 2)
      const b = dec(rng.int(300, 900), 1)
      const good = addR(a, b)
      const badAlign = addR(a, mulR(b, R(1, 10)))
      return {
        prompt: [
          p('Voici le calcul écrit par une candidate. Le résultat est faux.'),
          vis({
            type: 'calc-steps',
            steps: [
              { calc: `Étape 1 : on veut calculer ${fr(a)} + ${fr(b)}` },
              { calc: `Étape 2 : on écrit ${fr(a)} et ${fr(b)} l’un sous l’autre, alignés sur le dernier chiffre` },
              { calc: `Étape 3 : on additionne colonne par colonne` },
              { calc: `Étape 4 : on obtient ${fr(badAlign)}` },
            ],
          }),
        ],
        question: 'À quelle étape l’erreur a-t-elle été commise ?',
        answer: {
          kind: 'choice',
          options: [
            { id: '1', label: 'Étape 1 : l’opération choisie', feedback: 'L’opération est bonne : on cherche bien un total, donc une addition.', tag: 'raisonnement' },
            { id: '2', label: 'Étape 2 : la façon d’aligner les nombres', feedback: '' },
            { id: '3', label: 'Étape 3 : l’addition colonne par colonne', feedback: 'Le calcul colonne par colonne est correct en lui-même. Le problème vient de ce que les colonnes ne correspondent pas aux mêmes rangs.', tag: 'operation' },
            { id: '4', label: 'Étape 4 : la lecture du résultat', feedback: 'Le résultat écrit est bien celui qu’on obtient avec l’alignement de l’étape 2. L’erreur est donc avant.', tag: 'raisonnement' },
          ],
          correct: ['2'],
        },
        hints: [
          'Reprenez chaque étape et demandez-vous laquelle est déjà fausse avant même de calculer.',
          'Quand on additionne des décimaux, ce sont les virgules qui doivent être alignées, pas les derniers chiffres.',
        ],
        alternative: [
          p(`Estimez d’abord : ${fr(a)} + ${fr(b)}, c’est proche de ${frInt(Math.round(toNumber(a)) + Math.round(toNumber(b)))}.`),
          p(`Le résultat ${fr(badAlign)} est bien trop petit, ce qui montre qu’un rang a été décalé.`),
        ],
        solution: [
          { text: 'Aligner sur le dernier chiffre revient à additionner des dixièmes avec des centièmes.', why: 'Les colonnes ne représentent alors plus la même valeur.' },
          { text: `L’addition correcte donne ${fr(good)}.`, calc: `${fr(a)} + ${toFrench(b)}0 = ${fr(good)}`, why: 'Une fois les virgules alignées, chaque colonne a un sens.' },
        ],
      }
    },
  },
  {
    id: 'M02-deux-etapes',
    skillId: 'M02',
    level: 'epreuve',
    structure: 'depenses-cumulees-et-reste',
    version: 1,
    transfer: true,
    review: 'teste-automatiquement',
    seconds: 95,
    generate: (rng) => {
      const budget = dec(rng.int(15000, 30000), 2)
      const d1 = dec(rng.int(2000, 6000), 2)
      const d2 = dec(rng.int(1500, 5000), 2)
      const spent = addR(d1, d2)
      const left = subR(budget, spent)
      return {
        prompt: [
          p(
            `Une équipe dispose de ${fr(budget)} € pour l’année. Elle a acheté du matériel pour ${fr(d1)} €, puis des fournitures pour ${fr(d2)} €.`,
          ),
        ],
        question: 'Combien reste-t-il sur le budget, en euros ?',
        answer: {
          kind: 'numeric',
          value: left,
          unit: '€',
          unitPolicy: 'optional',
          pitfalls: [
            { answer: fr(subR(budget, d1)), tag: 'consigne', why: 'Vous n’avez retiré qu’une seule des deux dépenses. L’énoncé en mentionne deux.' },
            { answer: fr(spent), tag: 'consigne', why: 'Vous avez calculé le total dépensé. La question porte sur ce qui reste.' },
          ],
        },
        hints: [
          'Il y a deux dépenses : commencez par savoir combien a été dépensé en tout.',
          'Ensuite seulement, retirez ce total du budget de départ.',
        ],
        alternative: [
          p('Vous pouvez aussi retirer les dépenses l’une après l’autre.'),
          p(`${fr(budget)} − ${fr(d1)} = ${fr(subR(budget, d1))}, puis ${fr(subR(budget, d1))} − ${fr(d2)} = ${fr(left)}. Le résultat est le même.`),
        ],
        solution: [
          { text: 'Additionner les deux dépenses.', calc: `${fr(d1)} + ${fr(d2)} = ${fr(spent)}`, why: 'Le total dépensé est la somme des achats.' },
          { text: 'Retirer ce total du budget.', calc: `${fr(budget)} − ${fr(spent)} = ${fr(left)}`, why: 'Ce qui reste, c’est le budget moins tout ce qui a été engagé.' },
          { text: 'Vérifier l’ordre de grandeur.', why: `Le reste doit être inférieur au budget et positif : ${fr(left)} € est cohérent.` },
        ],
        conclusion: `Il reste ${fr(left)} € sur le budget.`,
        placeholder: 'Exemple : 118,40',
        keyboard: 'decimal',
        suffix: '€',
      }
    },
  },

  // ---------------------------------------------------------------- M03 ---
  {
    id: 'M03-total-repete',
    skillId: 'M03',
    level: 'decouverte',
    structure: 'total-quantite-repetee',
    version: 1,
    review: 'teste-automatiquement',
    seconds: 50,
    generate: (rng) => {
      const obj = rng.pick(OBJETS)
      const parBoite = rng.pick([12, 20, 24, 25, 50, 100])
      const boites = rng.int(6, 18)
      const total = rat(BigInt(parBoite * boites))
      return {
        prompt: [p(`Une commande contient ${boites} boîtes de ${parBoite} ${obj.pl}.`)],
        question: `Combien de ${obj.pl} au total ?`,
        answer: {
          kind: 'numeric',
          value: total,
          pitfalls: [
            { answer: String(parBoite + boites), tag: 'raisonnement', why: 'Vous avez additionné le nombre de boîtes et le contenu d’une boîte. Ici, la même quantité se répète : c’est une multiplication.' },
          ],
        },
        hints: [
          `Une boîte contient ${parBoite} ${obj.pl}. Il y en a ${boites}. La même quantité se répète.`,
          `Découpez si besoin : ${boites} = ${Math.floor(boites / 10) * 10} + ${boites % 10}. Multipliez chaque morceau par ${parBoite}, puis additionnez.`,
        ],
        alternative: [
          p(`Dessinez un rectangle de ${boites} colonnes et ${parBoite} lignes.`),
          p('Le nombre de cases du rectangle est exactement le total cherché. C’est ce que calcule la multiplication.'),
        ],
        solution: [
          { text: 'Estimer avant de calculer.', calc: `${boites} × ${parBoite} ≈ ${frInt(Math.round((boites * parBoite) / 100) * 100)}`, why: 'Une estimation permet de repérer une erreur de rang.' },
          { text: 'Multiplier.', calc: `${boites} × ${parBoite} = ${fr(total)}`, why: 'La multiplication additionne la même quantité autant de fois qu’il y a de boîtes.' },
        ],
        conclusion: `Il y a ${fr(total)} ${obj.pl}.`,
        placeholder: 'Nombre entier',
        keyboard: 'decimal',
      }
    },
  },
  {
    id: 'M03-par-dix',
    skillId: 'M03',
    level: 'decouverte',
    structure: 'multiplier-par-puissance-de-dix',
    version: 1,
    review: 'teste-automatiquement',
    seconds: 35,
    generate: (rng) => {
      const value = dec(rng.int(105, 989), 2)
      const power = rng.pick([10, 100, 1000])
      const multiply = rng.chance(0.6)
      const result = multiply ? mulR(value, rat(BigInt(power))) : divR(value, rat(BigInt(power)))
      const rangs = power === 10 ? 'un rang' : power === 100 ? 'deux rangs' : 'trois rangs'
      return {
        prompt: [p(`On part du nombre ${fr(value)}.`)],
        question: multiply ? `Combien vaut ${fr(value)} × ${frInt(power)} ?` : `Combien vaut ${fr(value)} ÷ ${frInt(power)} ?`,
        answer: {
          kind: 'numeric',
          value: result,
          pitfalls: [
            {
              answer: multiply ? fr(divR(value, rat(BigInt(power)))) : fr(mulR(value, rat(BigInt(power)))),
              tag: 'virgule',
              why: multiply
                ? 'La virgule a été déplacée vers la gauche. Multiplier rend le nombre plus grand : elle se déplace vers la droite.'
                : 'La virgule a été déplacée vers la droite. Diviser rend le nombre plus petit : elle se déplace vers la gauche.',
            },
          ],
        },
        hints: [
          multiply ? 'Multiplier par 10, 100 ou 1 000 rend le nombre plus grand.' : 'Diviser par 10, 100 ou 1 000 rend le nombre plus petit.',
          `Déplacez la virgule de ${rangs} vers la ${multiply ? 'droite' : 'gauche'}, en complétant par des zéros si nécessaire.`,
        ],
        alternative: [
          p('Ne déplacez pas la virgule : faites glisser les chiffres.'),
          p(
            multiply
              ? `Chaque chiffre monte de ${rangs} dans le tableau de position : les dixièmes deviennent des unités, les unités des dizaines.`
              : `Chaque chiffre descend de ${rangs} : les unités deviennent des dixièmes, les dixièmes des centièmes.`,
          ),
        ],
        solution: [
          { text: `Déplacer la virgule de ${rangs} vers la ${multiply ? 'droite' : 'gauche'}.`, calc: `${fr(value)} ${multiply ? '×' : '÷'} ${frInt(power)} = ${fr(result)}`, why: `Multiplier ou diviser par ${frInt(power)} change simplement le rang de chaque chiffre.` },
        ],
        placeholder: 'Exemple : 24,5',
        keyboard: 'decimal',
      }
    },
  },
  {
    id: 'M03-decimale',
    skillId: 'M03',
    level: 'entrainement',
    structure: 'multiplication-decimale',
    version: 1,
    review: 'teste-automatiquement',
    seconds: 70,
    generate: (rng) => {
      const unitPrice = dec(rng.int(125, 895), 2)
      const qty = rng.int(4, 15)
      const total = mulR(unitPrice, rat(BigInt(qty)))
      const cents = mulR(unitPrice, R(100))
      const obj = rng.pick(OBJETS)
      return {
        prompt: [p(`Un ${obj.s} coûte ${fr(unitPrice)} €. Le service en commande ${qty}.`)],
        question: 'Quel est le montant total de la commande, en euros ?',
        answer: {
          kind: 'numeric',
          value: total,
          unit: '€',
          unitPolicy: 'optional',
          pitfalls: [
            { answer: fr(mulR(total, R(1, 100))), tag: 'virgule', why: 'Le nombre de décimales du résultat n’est pas le bon. Dans une multiplication, le résultat a autant de décimales que l’ensemble des facteurs.' },
          ],
        },
        hints: [
          'Le prix se répète autant de fois qu’il y a d’articles.',
          `Multipliez d’abord sans virgule : ${fr(cents)} × ${qty}. Placez ensuite deux décimales dans le résultat, comme dans le prix unitaire.`,
        ],
        alternative: [
          p('Comptez en centimes pour éviter la virgule.'),
          p(
            `${fr(unitPrice)} €, c’est ${fr(cents)} centimes. ${fr(cents)} × ${qty} = ${fr(mulR(cents, rat(BigInt(qty))))} centimes, soit ${fr(total)} €.`,
          ),
        ],
        solution: [
          { text: 'Multiplier en ignorant provisoirement la virgule.', calc: `${fr(cents)} × ${qty} = ${fr(mulR(cents, rat(BigInt(qty))))}`, why: 'On retrouve un calcul sur des entiers, plus sûr.' },
          { text: 'Replacer deux décimales.', calc: `= ${fr(total)} €`, why: 'Le prix unitaire avait deux décimales ; le nombre d’articles n’en a aucune.' },
        ],
        conclusion: `La commande coûte ${fr(total)} €.`,
        placeholder: 'Exemple : 34,50',
        keyboard: 'decimal',
        suffix: '€',
      }
    },
  },
  {
    id: 'M03-ordre-grandeur',
    skillId: 'M03',
    level: 'entrainement',
    structure: 'choisir-ordre-de-grandeur',
    version: 1,
    review: 'teste-automatiquement',
    seconds: 45,
    generate: (rng) => {
      const a = rng.int(18, 49)
      const b = rng.int(19, 62)
      const exact = a * b
      const good = Math.round(exact / 100) * 100
      const options = rng.shuffle([
        { id: 'ok', label: `environ ${frInt(good)}` },
        { id: 'x10', label: `environ ${frInt(good * 10)}` },
        { id: 'd10', label: `environ ${frInt(Math.round(good / 10))}` },
      ])
      return {
        prompt: [p(`On veut calculer ${a} × ${b} sans poser l’opération.`)],
        question: 'Quel est l’ordre de grandeur du résultat ?',
        answer: {
          kind: 'choice',
          options: options.map((o) => ({
            id: o.id,
            label: o.label,
            feedback:
              o.id === 'ok'
                ? ''
                : o.id === 'x10'
                  ? 'Cette valeur est dix fois trop grande : vérifiez le nombre de chiffres du résultat.'
                  : 'Cette valeur est dix fois trop petite : vérifiez le nombre de chiffres du résultat.',
            tag: 'virgule',
          })),
          correct: ['ok'],
        },
        hints: [
          'Remplacez chaque nombre par un nombre rond proche.',
          `${a} est proche de ${Math.round(a / 10) * 10}, et ${b} de ${Math.round(b / 10) * 10}. Multipliez ces deux nombres ronds.`,
        ],
        alternative: [
          p('Comptez les chiffres plutôt que les valeurs.'),
          p(`Deux nombres à deux chiffres donnent un résultat à trois ou quatre chiffres. Ici, ${a} × ${b} = ${frInt(exact)}.`),
        ],
        solution: [
          { text: 'Arrondir les deux facteurs.', calc: `${Math.round(a / 10) * 10} × ${Math.round(b / 10) * 10} = ${frInt(Math.round(a / 10) * 10 * Math.round(b / 10) * 10)}`, why: 'Un ordre de grandeur suffit pour repérer une erreur de rang.' },
          { text: 'Comparer au résultat exact.', calc: `${a} × ${b} = ${frInt(exact)}`, why: 'L’estimation ne remplace pas le calcul : elle le contrôle.' },
        ],
      }
    },
  },
  {
    id: 'M03-double-article',
    skillId: 'M03',
    level: 'epreuve',
    structure: 'total-deux-articles',
    version: 1,
    transfer: true,
    review: 'teste-automatiquement',
    seconds: 90,
    generate: (rng) => {
      const o1 = rng.pick(OBJETS)
      let o2 = rng.pick(OBJETS)
      if (o2.s === o1.s) o2 = OBJETS[(OBJETS.indexOf(o1) + 1) % OBJETS.length]!
      const p1 = dec(rng.int(150, 480), 2)
      const p2 = dec(rng.int(90, 320), 2)
      const q1 = rng.int(5, 14)
      const q2 = rng.int(6, 16)
      const total = addR(mulR(p1, rat(BigInt(q1))), mulR(p2, rat(BigInt(q2))))
      return {
        prompt: [
          p(
            `Une commande comprend ${q1} ${o1.pl} à ${fr(p1)} € l’unité et ${q2} ${o2.pl} à ${fr(p2)} € l’unité.`,
          ),
        ],
        question: 'Quel est le montant total de la commande, en euros ?',
        answer: {
          kind: 'numeric',
          value: total,
          unit: '€',
          unitPolicy: 'optional',
          pitfalls: [
            {
              answer: fr(mulR(addR(p1, p2), rat(BigInt(q1 + q2)))),
              tag: 'raisonnement',
              why: 'Vous avez additionné les prix puis multiplié par le nombre total d’articles. Cela ne fonctionne que si les quantités sont identiques, ce qui n’est pas le cas ici.',
            },
          ],
        },
        hints: [
          'Traitez les deux articles séparément avant de rassembler.',
          'Calculez d’abord le coût des premiers articles, puis celui des seconds, et seulement ensuite la somme.',
        ],
        alternative: [
          p('Dressez un petit tableau à deux lignes : article, prix unitaire, quantité, sous-total.'),
          p('Le total de la commande est la somme de la colonne « sous-total ». Cette présentation évite les mélanges.'),
        ],
        solution: [
          { text: 'Premier sous-total.', calc: `${q1} × ${fr(p1)} = ${fr(mulR(p1, rat(BigInt(q1))))} €`, why: 'Le prix unitaire se répète autant de fois qu’il y a d’articles.' },
          { text: 'Deuxième sous-total.', calc: `${q2} × ${fr(p2)} = ${fr(mulR(p2, rat(BigInt(q2))))} €`, why: 'Même raisonnement pour le second article.' },
          { text: 'Somme des deux sous-totaux.', calc: `${fr(mulR(p1, rat(BigInt(q1))))} + ${fr(mulR(p2, rat(BigInt(q2))))} = ${fr(total)} €`, why: 'Le total de la commande rassemble les deux lignes.' },
        ],
        conclusion: `La commande coûte ${fr(total)} €.`,
        placeholder: 'Exemple : 84,30',
        keyboard: 'decimal',
        suffix: '€',
      }
    },
  },

  // ---------------------------------------------------------------- M04 ---
  {
    id: 'M04-partage-exact',
    skillId: 'M04',
    level: 'decouverte',
    structure: 'partage-exact',
    version: 1,
    review: 'teste-automatiquement',
    seconds: 45,
    generate: (rng) => {
      const parts = rng.int(3, 9)
      const each = rng.int(6, 25)
      const total = parts * each
      const obj = rng.pick(OBJETS)
      return {
        prompt: [p(`${total} ${obj.pl} sont répartis équitablement entre ${parts} chariots.`)],
        question: `Combien de ${obj.pl} par chariot ?`,
        answer: {
          kind: 'numeric',
          value: rat(BigInt(each)),
          pitfalls: [
            { answer: String(total - parts), tag: 'raisonnement', why: 'Vous avez soustrait. Répartir équitablement, c’est diviser : chaque chariot reçoit la même part.' },
          ],
        },
        hints: [
          'Répartir équitablement veut dire que chaque chariot reçoit la même quantité.',
          `Cherchez le nombre qui, multiplié par ${parts}, donne ${total}.`,
        ],
        alternative: [
          p('Procédez par essais organisés.'),
          p(`Si chaque chariot recevait 10, il faudrait ${parts * 10}. ${parts * 10 > total ? 'C’est trop' : 'C’est trop peu'}. Ajustez jusqu’à retrouver ${total}.`),
        ],
        solution: [
          { text: 'Poser la division.', calc: `${total} ÷ ${parts} = ${each}`, why: 'C’est un partage : on cherche la part de chacun.' },
          { text: 'Vérifier par la multiplication.', calc: `${parts} × ${each} = ${total}`, why: 'Si l’on retrouve le total de départ, la division est juste.' },
        ],
        conclusion: `Chaque chariot reçoit ${each} ${obj.pl}.`,
        placeholder: 'Nombre entier',
        keyboard: 'decimal',
      }
    },
  },
  {
    id: 'M04-quotient-reste',
    skillId: 'M04',
    level: 'entrainement',
    structure: 'quotient-et-reste',
    version: 1,
    review: 'teste-automatiquement',
    seconds: 65,
    generate: (rng) => {
      const perBox = rng.pick([6, 8, 12, 15])
      const q = rng.int(4, 11)
      const r = rng.int(1, perBox - 1)
      const total = perBox * q + r
      const obj = rng.pick(OBJETS)
      return {
        prompt: [p(`${total} ${obj.pl} sont rangés dans des boîtes de ${perBox}.`)],
        question: 'Combien de boîtes peut-on remplir complètement ?',
        answer: {
          kind: 'numeric',
          value: rat(BigInt(q)),
          requireInteger: true,
          pitfalls: [
            { answer: String(q + 1), tag: 'consigne' as const, why: `La question porte sur les boîtes complètes. La dernière boîte ne contiendrait que ${r} ${r > 1 ? obj.pl : obj.s} : elle n’est pas pleine.` },
            // Le reste ne constitue un piege que s'il differe du quotient.
            ...(r === q
              ? []
              : [
                  {
                    answer: String(r),
                    tag: 'consigne' as const,
                    why: 'Vous avez donné le reste, c’est-à-dire ce qui n’entre pas dans une boîte complète. La question porte sur le nombre de boîtes.',
                  },
                ]),
          ],
        },
        hints: [
          'Cherchez combien de fois une boîte pleine tient dans le total.',
          `Multipliez ${perBox} par différents nombres jusqu’à approcher ${total} sans le dépasser.`,
        ],
        alternative: [
          p('Comptez de boîte en boîte.'),
          p(`${perBox}, ${perBox * 2}, ${perBox * 3}… On s’arrête avant de dépasser ${total}. Ce qui dépasse forme le reste.`),
        ],
        solution: [
          { text: 'Poser la division euclidienne.', calc: `${total} = ${perBox} × ${q} + ${r}`, why: 'Le quotient donne les boîtes pleines, le reste ce qui ne rentre pas.' },
          { text: `Répondre à la question posée : ${q} boîtes pleines.`, why: `Il reste ${r} ${r > 1 ? obj.pl : obj.s} en dehors des boîtes complètes.` },
        ],
        conclusion: `On remplit ${q} boîtes complètes, et il reste ${r} ${r > 1 ? obj.pl : obj.s}.`,
        placeholder: 'Nombre entier',
        keyboard: 'decimal',
      }
    },
  },
  {
    id: 'M04-arrondi-superieur',
    skillId: 'M04',
    level: 'entrainement',
    structure: 'conditionnement-arrondi-au-dessus',
    version: 1,
    review: 'teste-automatiquement',
    seconds: 70,
    generate: (rng) => {
      const perBox = rng.pick([12, 15, 20, 24])
      const boxes = rng.int(3, 8)
      const needed = perBox * (boxes - 1) + rng.int(1, perBox - 1)
      const exact = divR(rat(BigInt(needed)), rat(BigInt(perBox)))
      const obj = rng.pick(OBJETS)
      const answer = Math.ceil(needed / perBox)
      return {
        prompt: [p(`Il faut ${needed} ${obj.pl}. Ils sont vendus uniquement par boîtes de ${perBox}.`)],
        question: 'Combien de boîtes faut-il commander ?',
        answer: {
          kind: 'numeric',
          value: rat(BigInt(answer)),
          requireInteger: true,
          pitfalls: [
            { answer: fr(exact, 2), tag: 'raisonnement', why: `Une boîte s’achète entière : ${fr(exact, 2)} boîte n’existe pas. Il faut arrondir au-dessus.` },
            { answer: String(answer - 1), tag: 'raisonnement', why: `Avec ${answer - 1} boîtes, on obtient ${perBox * (answer - 1)} ${obj.pl}, ce qui est insuffisant pour en avoir ${needed}.` },
          ],
        },
        hints: [
          'Commencez par regarder combien de boîtes pleines couvrent presque le besoin.',
          'Une boîte ne se coupe pas : s’il reste des articles à fournir, il faut une boîte de plus.',
        ],
        alternative: [
          p('Comptez en avançant boîte par boîte.'),
          p(
            `1 boîte : ${perBox}. 2 boîtes : ${perBox * 2}. On continue jusqu’à atteindre ou dépasser ${needed}. La première valeur qui atteint le besoin donne la réponse.`,
          ),
        ],
        solution: [
          { text: 'Diviser le besoin par le conditionnement.', calc: `${needed} ÷ ${perBox} = ${fr(exact, 4)}`, why: 'Cela donne le nombre théorique de boîtes.' },
          { text: 'Arrondir au-dessus, car on achète des boîtes entières.', calc: `${answer} boîtes`, why: `${answer - 1} boîtes ne fourniraient que ${perBox * (answer - 1)} ${obj.pl}.` },
          { text: 'Vérifier.', calc: `${answer} × ${perBox} = ${perBox * answer} ≥ ${needed}`, why: 'Le besoin est couvert, avec un petit surplus inévitable.' },
        ],
        conclusion: `Il faut commander ${answer} boîtes.`,
        placeholder: 'Nombre entier de boîtes',
        keyboard: 'decimal',
      }
    },
  },
  {
    id: 'M04-prix-unitaire',
    skillId: 'M04',
    level: 'entrainement',
    structure: 'prix-a-l-unite',
    version: 1,
    review: 'teste-automatiquement',
    seconds: 60,
    generate: (rng) => {
      const qty = rng.pick([4, 5, 8, 10, 20, 25])
      const unit = dec(rng.int(120, 640), 2)
      const total = mulR(unit, rat(BigInt(qty)))
      const obj = rng.pick(OBJETS)
      return {
        prompt: [p(`Un lot de ${qty} ${obj.pl} coûte ${fr(total)} €.`)],
        question: 'Quel est le prix d’un seul article, en euros ?',
        answer: {
          kind: 'numeric',
          value: unit,
          unit: '€',
          unitPolicy: 'optional',
          pitfalls: [
            { answer: fr(mulR(total, rat(BigInt(qty)))), tag: 'raisonnement', why: 'Vous avez multiplié au lieu de diviser. Le prix d’un article est forcément plus petit que le prix du lot.' },
          ],
        },
        hints: [
          'Le prix d’un article est plus petit que celui du lot : l’opération ne peut pas être une multiplication.',
          'Divisez le prix total par le nombre d’articles du lot.',
        ],
        alternative: [
          p('Passez par des sous-lots.'),
          p(`La moitié du lot coûte ${fr(divR(total, R(2)))} €. Continuez à diviser jusqu’à arriver à un seul article.`),
        ],
        solution: [
          { text: 'Diviser le prix du lot par le nombre d’articles.', calc: `${fr(total)} ÷ ${qty} = ${fr(unit)} €`, why: 'C’est un passage à l’unité : on cherche ce que coûte un seul exemplaire.' },
          { text: 'Vérifier.', calc: `${qty} × ${fr(unit)} = ${fr(total)} €`, why: 'On doit retrouver le prix du lot.' },
        ],
        conclusion: `Un ${obj.s} coûte ${fr(unit)} €.`,
        placeholder: 'Exemple : 1,25',
        keyboard: 'decimal',
        suffix: '€',
      }
    },
  },
  {
    id: 'M04-autonomie-stock',
    skillId: 'M04',
    level: 'epreuve',
    structure: 'duree-d-autonomie-d-un-stock',
    version: 1,
    transfer: true,
    review: 'teste-automatiquement',
    seconds: 90,
    generate: (rng) => {
      const perDay = rng.pick([12, 15, 18, 24, 30])
      const days = rng.int(4, 12)
      const extra = rng.int(1, perDay - 1)
      const stock = perDay * days + extra
      const obj = rng.pick(OBJETS)
      return {
        prompt: [p(`Le stock compte ${frInt(stock)} ${obj.pl}. On en utilise ${perDay} par jour.`)],
        question: 'Pendant combien de jours entiers le stock permet-il de tenir ?',
        answer: {
          kind: 'numeric',
          value: rat(BigInt(days)),
          requireInteger: true,
          pitfalls: [
            { answer: String(days + 1), tag: 'raisonnement', why: `Le ${days + 1}ᵉ jour, il ne resterait que ${extra} ${extra > 1 ? obj.pl : obj.s}, ce qui ne suffit pas pour une journée complète de ${perDay}.` },
          ],
        },
        hints: [
          'Cherchez combien de fois la consommation quotidienne tient dans le stock.',
          `Divisez le stock par ${perDay}, puis regardez si le reste permet une journée complète.`,
        ],
        alternative: [
          p('Comptez par paliers.'),
          p(`Après 1 jour : ${frInt(stock - perDay)}. Après 2 jours : ${frInt(stock - 2 * perDay)}. On s’arrête quand il ne reste plus de quoi tenir une journée entière.`),
        ],
        solution: [
          { text: 'Diviser le stock par la consommation quotidienne.', calc: `${frInt(stock)} ÷ ${perDay} = ${days} et il reste ${extra}`, why: 'C’est un groupement : combien de « journées » tiennent dans le stock.' },
          { text: 'Le reste ne fait pas une journée entière.', calc: `${extra} < ${perDay}`, why: 'La question porte sur les jours complets.' },
        ],
        conclusion: `Le stock couvre ${days} jours entiers, avec ${extra} ${extra > 1 ? obj.pl : obj.s} restants.`,
        placeholder: 'Nombre de jours',
        keyboard: 'decimal',
      }
    },
  },

  // ---------------------------------------------------------------- M05 ---
  {
    id: 'M05-priorites',
    skillId: 'M05',
    level: 'decouverte',
    structure: 'priorites-sans-parentheses',
    version: 1,
    review: 'teste-automatiquement',
    seconds: 45,
    generate: (rng) => {
      const a = rng.int(3, 19)
      const b = rng.int(2, 9)
      const c = rng.int(2, 9)
      const result = rat(BigInt(a + b * c))
      const wrong = rat(BigInt((a + b) * c))
      return {
        prompt: [p('Calculez cette expression en respectant l’ordre des opérations.')],
        question: `${a} + ${b} × ${c} = ?`,
        answer: {
          kind: 'numeric',
          value: result,
          pitfalls: [
            { answer: fr(wrong), tag: 'operation', why: `Vous avez calculé de gauche à droite : (${a} + ${b}) × ${c}. Or la multiplication passe avant l’addition.` },
          ],
        },
        hints: [
          'Toutes les opérations ne se valent pas : l’une doit être faite avant l’autre.',
          'La multiplication et la division passent avant l’addition et la soustraction.',
        ],
        alternative: [
          p('Écrivez vous-même les parenthèses qui manquent.'),
          p(`${a} + ${b} × ${c} veut dire ${a} + (${b} × ${c}). Le bloc « ${b} × ${c} » est soudé : on ne peut pas prendre le ${b} avec le ${a}.`),
        ],
        solution: [
          { text: 'Effectuer d’abord la multiplication.', calc: `${b} × ${c} = ${b * c}`, why: 'Elle est prioritaire sur l’addition.' },
          { text: 'Effectuer ensuite l’addition.', calc: `${a} + ${b * c} = ${fr(result)}`, why: 'L’addition se fait en dernier.' },
        ],
        placeholder: 'Résultat',
        keyboard: 'decimal',
      }
    },
  },
  {
    id: 'M05-parentheses',
    skillId: 'M05',
    level: 'entrainement',
    structure: 'expression-avec-parentheses',
    version: 1,
    review: 'teste-automatiquement',
    seconds: 60,
    generate: (rng) => {
      const a = rng.int(10, 40)
      const b = rng.int(4, 20)
      const d = rng.pick([2, 4, 5])
      const e = rng.int(2, 12)
      const sum = a + b
      const value = addR(divR(rat(BigInt(sum)), rat(BigInt(d))), rat(BigInt(e)))
      return {
        prompt: [p('Calculez en respectant les parenthèses et l’ordre des opérations.')],
        question: `(${a} + ${b}) ÷ ${d} + ${e} = ?`,
        answer: {
          kind: 'numeric',
          value,
          pitfalls: [
            {
              answer: fr(divR(rat(BigInt(sum)), rat(BigInt(d + e)))),
              tag: 'operation',
              why: `Vous avez divisé par ${d} + ${e}. Or il n’y a pas de parenthèses autour de « ${d} + ${e} » : la division ne porte que sur ${d}.`,
            },
          ],
        },
        hints: [
          'Repérez ce qui est entre parenthèses : c’est ce qui se calcule en premier.',
          'Ensuite la division, et seulement en dernier l’addition finale.',
        ],
        alternative: [
          p('Traitez la parenthèse comme un seul nombre.'),
          p(`Une fois ${a} + ${b} = ${sum} calculé, l’expression devient ${sum} ÷ ${d} + ${e}, beaucoup plus simple à lire.`),
        ],
        solution: [
          { text: 'Calculer la parenthèse.', calc: `${a} + ${b} = ${sum}`, why: 'Les parenthèses sont toujours prioritaires.' },
          { text: 'Effectuer la division.', calc: `${sum} ÷ ${d} = ${fr(divR(rat(BigInt(sum)), rat(BigInt(d))))}`, why: 'La division passe avant l’addition restante.' },
          { text: 'Ajouter le dernier terme.', calc: `${fr(divR(rat(BigInt(sum)), rat(BigInt(d))))} + ${e} = ${fr(value)}`, why: 'L’addition se fait en dernier.' },
        ],
        placeholder: 'Résultat',
        keyboard: 'decimal',
      }
    },
  },
  {
    id: 'M05-arrondi',
    skillId: 'M05',
    level: 'entrainement',
    structure: 'arrondir-a-un-rang-demande',
    version: 1,
    review: 'teste-automatiquement',
    seconds: 55,
    generate: (rng) => {
      const total = rng.int(230, 980)
      const parts = rng.pick([3, 6, 7, 9, 11])
      const exact = divR(rat(BigInt(total)), rat(BigInt(parts)))
      const places = rng.pick([1, 2])
      const rounded = roundR(exact, places)
      const label = places === 1 ? 'un arrondi au dixième' : 'un arrondi au centième'
      return {
        prompt: [p(`On partage ${frInt(total)} € entre ${parts} personnes.`)],
        question: `Quelle est la part de chacune, arrondie ${places === 1 ? 'au dixième' : 'au centième'} d’euro ?`,
        answer: {
          kind: 'numeric',
          value: rounded,
          unit: '€',
          unitPolicy: 'optional',
          rounding: { places, label },
        },
        hints: [
          'Faites d’abord la division complète, sans arrondir.',
          `Pour arrondir ${places === 1 ? 'au dixième' : 'au centième'}, regardez le chiffre juste après : s’il vaut 5 ou plus, on monte d’une unité au rang demandé.`,
        ],
        alternative: [
          p('Regardez le premier chiffre écarté.'),
          p(
            `La division donne ${fr(exact, 5)}… Le chiffre situé juste après le rang demandé décide : 5 ou plus, on monte ; moins de 5, on garde. Ici on obtient ${fr(rounded)}.`,
          ),
        ],
        solution: [
          { text: 'Effectuer la division sans arrondir.', calc: `${frInt(total)} ÷ ${parts} = ${fr(exact, 5)}…`, why: 'Arrondir trop tôt fausserait la suite.' },
          { text: `Arrondir ${places === 1 ? 'au dixième' : 'au centième'}.`, calc: `≈ ${fr(rounded)} €`, why: 'On choisit la valeur la plus proche au rang demandé.' },
        ],
        conclusion: `Chaque part vaut environ ${fr(rounded)} €.`,
        placeholder: 'Exemple : 12,3',
        keyboard: 'decimal',
        suffix: '€',
      }
    },
  },
  {
    id: 'M05-moyenne-arrondie',
    skillId: 'M05',
    level: 'epreuve',
    structure: 'moyenne-puis-arrondi',
    version: 1,
    transfer: true,
    review: 'teste-automatiquement',
    seconds: 85,
    generate: (rng) => {
      const values = [rng.int(28, 62), rng.int(28, 62), rng.int(28, 62)]
      const sum = values.reduce((a, b) => a + b, 0)
      const exact = divR(rat(BigInt(sum)), R(3))
      const rounded = roundR(exact, 1)
      return {
        prompt: [
          p('Trois relevés hebdomadaires du nombre de repas servis dans un établissement fictif.'),
          vis({
            type: 'table',
            headers: ['Semaine', 'Repas servis'],
            rows: values.map((v, i) => [`Semaine ${i + 1}`, String(v)]),
            align: ['left', 'right'],
          }),
        ],
        question: 'Quelle est la moyenne des trois semaines, arrondie au dixième ?',
        answer: {
          kind: 'numeric',
          value: rounded,
          rounding: { places: 1, label: 'un arrondi au dixième' },
          pitfalls: [
            { answer: String(sum), tag: 'consigne', why: 'Vous avez donné le total des trois semaines. Une moyenne se calcule en divisant ce total par le nombre de semaines.' },
          ],
        },
        hints: [
          'Une moyenne se calcule en deux temps : d’abord un total, ensuite un partage.',
          'Additionnez les trois valeurs, divisez par 3, puis arrondissez seulement à la fin.',
        ],
        alternative: [
          p('La moyenne est la valeur que chaque semaine aurait si le total était réparti également.'),
          p(`Ici, ${frInt(sum)} repas répartis sur 3 semaines donnent ${fr(exact, 4)} repas par semaine.`),
        ],
        solution: [
          { text: 'Additionner les trois relevés.', calc: `${values.join(' + ')} = ${frInt(sum)}`, why: 'La moyenne part toujours du total.' },
          { text: 'Diviser par le nombre de relevés.', calc: `${frInt(sum)} ÷ 3 = ${fr(exact, 5)}`, why: 'On répartit le total également entre les semaines.' },
          { text: 'Arrondir au dixième, comme demandé.', calc: `≈ ${fr(rounded)}`, why: 'L’arrondi se fait une seule fois, à la fin.' },
        ],
        conclusion: `La moyenne est d’environ ${fr(rounded)} repas par semaine.`,
        placeholder: 'Exemple : 45,3',
        keyboard: 'decimal',
      }
    },
  },
  {
    id: 'M05-erreur-priorite',
    skillId: 'M05',
    level: 'epreuve',
    structure: 'reperer-erreur-de-priorite',
    version: 1,
    review: 'teste-automatiquement',
    seconds: 70,
    generate: (rng) => {
      const a = rng.int(6, 24)
      const b = rng.int(3, 9)
      const c = rng.int(2, 8)
      const good = a + b * c
      const bad = (a + b) * c
      return {
        prompt: [
          p('Deux candidates calculent la même expression et trouvent deux résultats différents.'),
          vis({
            type: 'table',
            headers: ['Candidate', 'Calcul écrit', 'Résultat'],
            rows: [
              ['A', `${a} + ${b} = ${a + b}, puis × ${c}`, String(bad)],
              ['B', `${b} × ${c} = ${b * c}, puis + ${a}`, String(good)],
            ],
          }),
        ],
        question: `Laquelle a correctement calculé ${a} + ${b} × ${c} ?`,
        answer: {
          kind: 'choice',
          options: [
            {
              id: 'A',
              label: 'Candidate A',
              feedback: 'Elle a calculé de gauche à droite. Cela reviendrait à écrire des parenthèses qui ne figurent pas dans l’expression.',
              tag: 'operation',
            },
            { id: 'B', label: 'Candidate B', feedback: '' },
          ],
          correct: ['B'],
        },
        hints: [
          'Regardez dans quel ordre chacune a effectué les opérations.',
          'Sans parenthèses, la multiplication se fait avant l’addition.',
        ],
        alternative: [
          p('Remplacez l’expression par une situation concrète.'),
          p(
            `Vous avez ${a} € en poche et vous achetez ${c} articles à ${b} € : vous dépensez ${b * c} €… Non, vous en avez ${a} et vous ajoutez ${c} lots de ${b}. Le total est ${good}, pas ${bad}.`,
          ),
        ],
        solution: [
          { text: 'Identifier l’opération prioritaire.', calc: `${b} × ${c} = ${b * c}`, why: 'La multiplication passe avant l’addition.' },
          { text: 'Terminer par l’addition.', calc: `${a} + ${b * c} = ${good}`, why: 'C’est le résultat de la candidate B.' },
        ],
      }
    },
  },
]

function comparisonFeedback(chosen: Rational, other: Rational, isRight: boolean): string {
  if (isRight) return ''
  return `${fr(chosen)} est plus petit que ${fr(other)}. Complétez les décimales : ${fr(chosen)} et ${fr(other)} ne se comparent bien qu’une fois écrits avec le même nombre de chiffres après la virgule.`
}

