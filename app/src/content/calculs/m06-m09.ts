/**
 * Calculs — M06 à M09 : fractions, calculs de fractions, proportionnalité,
 * pourcentages.
 */

import { addR, cmpR, divR, hasFiniteDecimal, mulR, rat, roundR, subR, toFractionString, type Rational } from '@/engine/rational'
import type { ExerciseTemplate, Lesson } from '../types'
import { fr, frInt, key, p, vis, warn, lead } from '../blocks'

const R = (n: number | bigint, d: number | bigint = 1) => rat(BigInt(n), BigInt(d))
const dec = (digits: number, places: number): Rational => rat(BigInt(digits), 10n ** BigInt(places))

// ===========================================================================
// Leçons
// ===========================================================================

export const LESSONS_M06_M09: Lesson[] = [
  {
    skillId: 'M06',
    review: 'relu-par-le-modele',
    explanation: [
      lead('Une fraction, c’est un partage en parts égales. Le bas dit en combien de parts, le haut dit combien on en prend.'),
      p(
        'Dans 3/4, le 4 indique que le tout a été coupé en 4 parts égales. Le 3 indique qu’on en garde 3. Les parts doivent être égales : sinon, la fraction n’a pas de sens.',
      ),
      vis({
        type: 'fraction',
        parts: 4,
        filled: 3,
        label: '3/4',
        caption: 'Le tout est coupé en 4 parts égales ; on en prend 3.',
      }),
      p(
        'Prendre une fraction d’une quantité se fait en deux temps. Pour 3/4 de 240 : on divise d’abord par 4 pour connaître une part (240 ÷ 4 = 60), puis on multiplie par 3 (60 × 3 = 180).',
      ),
      key('Les fractions les plus utiles à connaître par cœur : 1/2 = 0,5 ; 1/4 = 0,25 ; 3/4 = 0,75 ; 1/10 = 0,1 ; 1/5 = 0,2.'),
      warn(
        'Un dénominateur plus grand ne veut pas dire une part plus grande. 1/8 est plus petit que 1/4 : plus on coupe, plus les parts sont fines.',
      ),
    ],
    alternative: [
      p('Pensez à une plaquette de chocolat à 12 carrés.'),
      p(
        'La moitié, c’est 6 carrés. Le quart, c’est 3 carrés. Les trois quarts, c’est 9 carrés. On divise d’abord pour obtenir une part, puis on prend autant de parts que le numérateur l’indique.',
      ),
      vis({
        type: 'fraction-compare',
        bars: [
          { parts: 2, filled: 1, label: '1/2' },
          { parts: 4, filled: 1, label: '1/4' },
          { parts: 8, filled: 1, label: '1/8' },
        ],
        caption: 'Même tout, découpes différentes : plus le dénominateur est grand, plus la part est petite.',
      }),
    ],
    workedExamples: [
      {
        statement: 'Calculer 3/4 de 240.',
        steps: [
          { do: 'Diviser par le dénominateur.', why: 'On cherche d’abord ce que vaut une part sur les quatre.', calc: '240 ÷ 4 = 60' },
          { do: 'Multiplier par le numérateur.', why: 'On prend trois de ces parts.', calc: '60 × 3 = 180' },
          { do: 'Vérifier la plausibilité.', why: '3/4, c’est plus que la moitié (120) et moins que le tout (240). 180 est bien entre les deux.' },
        ],
        conclusion: '3/4 de 240 valent 180.',
      },
    ],
    commonMistakes: [
      { mistake: 'Multiplier par le dénominateur au lieu de diviser.', fix: 'Le dénominateur découpe : il divise.', tag: 'raisonnement' },
      { mistake: 'Croire que 1/8 > 1/4.', fix: 'Comparez à découpe égale : 1/4 = 2/8.', tag: 'raisonnement' },
    ],
  },
  {
    skillId: 'M07',
    review: 'relu-par-le-modele',
    explanation: [
      lead('On n’additionne des parts que si elles ont la même taille.'),
      p(
        'Ajouter 1/4 et 2/4 ne pose pas de problème : les parts sont identiques, on en compte 3 au total, donc 3/4. Le dénominateur ne change pas, parce que la taille des parts ne change pas.',
      ),
      p(
        'Ajouter 1/2 et 1/4 demande d’abord une découpe commune. On remplace 1/2 par 2/4 : c’est la même quantité, coupée plus finement. On peut alors additionner : 2/4 + 1/4 = 3/4.',
      ),
      vis({
        type: 'fraction-compare',
        bars: [
          { parts: 2, filled: 1, label: '1/2' },
          { parts: 4, filled: 2, label: '2/4' },
        ],
        caption: '1/2 et 2/4 recouvrent exactement la même surface.',
      }),
      key('Multiplier le haut et le bas d’une fraction par le même nombre ne change pas sa valeur : on découpe simplement plus finement.'),
      warn('On n’additionne jamais les dénominateurs : 1/2 + 1/4 ne fait pas 2/6.'),
    ],
    alternative: [
      p('Repensez aux euros et aux centimes.'),
      p(
        'Additionner 1/2 € et 1/4 €, c’est additionner 50 centimes et 25 centimes : 75 centimes, soit 3/4 €. On a converti dans une unité commune avant d’additionner, exactement comme on cherche un dénominateur commun.',
      ),
    ],
    workedExamples: [
      {
        statement: 'Une équipe a terminé 1/3 des dossiers le matin et 1/6 l’après-midi. Quelle part a été traitée ?',
        steps: [
          { do: 'Choisir une découpe commune.', why: '6 est un multiple de 3 : on peut tout exprimer en sixièmes.', calc: '1/3 = 2/6' },
          { do: 'Additionner les numérateurs.', why: 'Les parts ont maintenant la même taille.', calc: '2/6 + 1/6 = 3/6' },
          { do: 'Simplifier.', why: '3 et 6 se divisent tous les deux par 3.', calc: '3/6 = 1/2' },
        ],
        conclusion: 'La moitié des dossiers a été traitée.',
      },
    ],
    commonMistakes: [
      { mistake: 'Additionner les dénominateurs.', fix: 'Le dénominateur dit la taille des parts, pas leur nombre.', tag: 'operation' },
      { mistake: 'Oublier de simplifier le résultat.', fix: 'Cherchez un diviseur commun au numérateur et au dénominateur.', tag: 'format' },
    ],
  },
  {
    skillId: 'M08',
    review: 'relu-par-le-modele',
    explanation: [
      lead('Une situation est proportionnelle quand tout varie dans la même proportion : deux fois plus d’un côté, deux fois plus de l’autre.'),
      p(
        'Si 18 articles coûtent 27 €, alors 36 articles coûtent 54 €, et 9 articles coûtent 13,50 €. La méthode la plus sûre est le passage à l’unité : on cherche d’abord ce que vaut un seul article.',
      ),
      vis({
        type: 'proportion',
        topLabel: 'Articles',
        bottomLabel: 'Prix (€)',
        columns: [
          { top: '18', bottom: '27' },
          { top: '1', bottom: '1,50', highlight: true },
          { top: '30', bottom: '45' },
        ],
        caption: 'On descend à l’unité, puis on remonte à la quantité demandée.',
      }),
      key('27 ÷ 18 = 1,50 € par article. Ensuite, 30 × 1,50 = 45 €.'),
      warn(
        'Toutes les situations ne sont pas proportionnelles. L’âge d’une personne et sa taille ne le sont pas : doubler l’âge ne double pas la taille. Vérifiez toujours que le raisonnement a un sens.',
      ),
    ],
    alternative: [
      p('Vous pouvez aussi raisonner par facteur.'),
      p(
        'Pour passer de 18 à 30 articles, on multiplie par 30 ÷ 18, soit environ 1,667. Le prix se multiplie par le même facteur : 27 × 1,667 ≈ 45.',
      ),
      p(
        'Le passage à l’unité reste plus sûr, parce qu’il évite un facteur à décimales longues et que chaque étape reste lisible.',
      ),
    ],
    workedExamples: [
      {
        statement: 'Un groupe consomme 1,5 L d’eau par jour et par personne. Combien pour 7 jours ?',
        steps: [
          { do: 'Identifier ce qui est proportionnel.', why: 'Chaque jour se ressemble : la consommation double si la durée double.' },
          { do: 'Multiplier la consommation quotidienne par le nombre de jours.', why: 'On additionne 7 fois la même quantité.', calc: '1,5 × 7 = 10,5' },
          { do: 'Vérifier l’ordre de grandeur.', why: '10 jours donneraient 15 L ; 7 jours doivent donner un peu plus de 10 L.' },
        ],
        conclusion: 'Il faut 10,5 L pour 7 jours.',
      },
    ],
    commonMistakes: [
      { mistake: 'Appliquer le produit en croix sans vérifier la proportionnalité.', fix: 'Demandez-vous d’abord si doubler l’un double vraiment l’autre.', tag: 'raisonnement' },
      { mistake: 'Inverser le sens du calcul.', fix: 'Vérifiez le résultat : plus d’articles doit donner un prix plus élevé.', tag: 'raisonnement' },
    ],
  },
  {
    skillId: 'M09',
    review: 'relu-par-le-modele',
    explanation: [
      lead('Un pourcentage est une proportion rapportée à 100.'),
      p('15 %, c’est 15 pour 100, autrement dit 15/100, ou encore 0,15. Calculer 15 % d’une quantité, c’est la multiplier par 0,15.'),
      vis({
        type: 'calc-steps',
        steps: [
          { calc: '15 % de 240', why: 'On cherche 15 parts sur 100.' },
          { calc: '= 240 × 15 ÷ 100', why: '15 % vaut 15/100.' },
          { calc: '= 3 600 ÷ 100 = 36', why: 'On peut multiplier d’abord, diviser ensuite : c’est plus simple de tête.' },
        ],
      }),
      p(
        'Trois questions différentes utilisent le même outil : trouver la part (15 % de 240), trouver le taux (36 sur 240, quel pourcentage ?), ou trouver le total (36 représente 15 %, quel est le total ?).',
      ),
      key('Repère utile : 10 % c’est diviser par 10, 5 % c’est la moitié de 10 %, 1 % c’est diviser par 100. 15 % = 10 % + 5 %.'),
      warn(
        'Une hausse de 10 % suivie d’une baisse de 10 % ne ramène pas au point de départ : la baisse s’applique à un montant devenu plus grand.',
      ),
    ],
    alternative: [
      p('Découpez le pourcentage en morceaux faciles.'),
      p('Pour 15 % de 240 : 10 % de 240 font 24. La moitié de 24 fait 12, ce qui correspond à 5 %. 24 + 12 = 36.'),
      p('Cette méthode se fait de tête et permet de contrôler un résultat obtenu à la calculatrice.'),
    ],
    workedExamples: [
      {
        statement: 'Sur 240 repas servis, 36 sont des repas sans sel. Quel pourcentage cela représente-t-il ?',
        steps: [
          { do: 'Écrire la proportion.', why: 'Un pourcentage est une part rapportée au total.', calc: '36 / 240' },
          { do: 'Ramener à une base de 100.', why: 'C’est la définition du pourcentage.', calc: '36 ÷ 240 = 0,15' },
          { do: 'Convertir en pourcentage.', why: 'Multiplier par 100 revient à exprimer la proportion pour 100 repas.', calc: '0,15 × 100 = 15 %' },
        ],
        conclusion: '36 repas sur 240 représentent 15 % du total.',
      },
    ],
    commonMistakes: [
      { mistake: 'Confondre la part et le total.', fix: 'Le total est toujours au dénominateur.', tag: 'raisonnement' },
      { mistake: 'Dire qu’un taux passé de 15 % à 18 % a augmenté de 3 %.', fix: 'Il a augmenté de 3 points ; en pourcentage, la hausse est de 20 %.', tag: 'raisonnement' },
    ],
  },
]

// ===========================================================================
// Gabarits
// ===========================================================================

const FRACTIONS_USUELLES = [
  { num: 1, den: 2, mot: 'la moitié' },
  { num: 1, den: 4, mot: 'le quart' },
  { num: 3, den: 4, mot: 'les trois quarts' },
  { num: 1, den: 3, mot: 'le tiers' },
  { num: 2, den: 3, mot: 'les deux tiers' },
  { num: 1, den: 5, mot: 'le cinquième' },
  { num: 1, den: 10, mot: 'le dixième' },
] as const

export const TEMPLATES_M06_M09: ExerciseTemplate[] = [
  // ---------------------------------------------------------------- M06 ---
  {
    id: 'M06-fraction-de-quantite',
    skillId: 'M06',
    level: 'decouverte',
    structure: 'fraction-d-une-quantite',
    version: 1,
    review: 'teste-automatiquement',
    seconds: 55,
    generate: (rng) => {
      const f = rng.pick(FRACTIONS_USUELLES)
      const base = f.den * rng.int(5, 30)
      const part = (base / f.den) * f.num
      return {
        prompt: [
          p(`Un établissement fictif sert ${frInt(base)} repas par semaine.`),
          vis({ type: 'fraction', parts: f.den, filled: f.num, label: `${f.num}/${f.den}`, caption: `${f.mot} du total` }),
        ],
        question: `Combien cela représente-t-il de repas si ${f.mot} des repas sont livrés le matin ?`,
        answer: {
          kind: 'numeric',
          value: R(part),
          pitfalls: [
            { answer: String(base * f.den), tag: 'raisonnement' as const, why: `Vous avez multiplié par ${f.den} au lieu de diviser. Le dénominateur découpe le tout : il divise.` },
            // Quand le numerateur vaut 1, « une seule part » EST la reponse.
            ...(f.num === 1
              ? []
              : [
                  {
                    answer: String(base / f.den),
                    tag: 'consigne' as const,
                    why: `Vous avez calculé une seule part sur ${f.den}. La question en demande ${f.num}.`,
                  },
                ]),
          ],
        },
        hints: [
          `Commencez par chercher ce que vaut une seule part sur ${f.den}.`,
          `Divisez ${frInt(base)} par ${f.den}, puis multipliez le résultat par ${f.num}.`,
        ],
        alternative: [
          p(`Imaginez les ${frInt(base)} repas rangés en ${f.den} paquets égaux.`),
          p(`Chaque paquet contient ${frInt(base / f.den)} repas. On en prend ${f.num}, soit ${frInt(part)} repas.`),
        ],
        solution: [
          { text: 'Chercher une part.', calc: `${frInt(base)} ÷ ${f.den} = ${frInt(base / f.den)}`, why: 'Le dénominateur indique le nombre de parts égales.' },
          { text: 'Prendre le nombre de parts demandé.', calc: `${frInt(base / f.den)} × ${f.num} = ${frInt(part)}`, why: 'Le numérateur indique combien de parts on garde.' },
          { text: 'Contrôler.', why: `${f.num}/${f.den} est ${f.num * 2 === f.den ? 'exactement la moitié' : f.num * 2 < f.den ? 'moins de la moitié' : 'plus de la moitié'} du total ; ${frInt(part)} est cohérent avec ${frInt(base)}.` },
        ],
        conclusion: `${f.mot.charAt(0).toUpperCase() + f.mot.slice(1)} de ${frInt(base)} repas, c’est ${frInt(part)} repas.`,
        placeholder: 'Nombre de repas',
        keyboard: 'decimal',
      }
    },
  },
  {
    id: 'M06-lire-schema',
    skillId: 'M06',
    level: 'decouverte',
    structure: 'lire-une-fraction-sur-un-schema',
    version: 1,
    review: 'teste-automatiquement',
    seconds: 45,
    generate: (rng) => {
      const den = rng.pick([4, 5, 6, 8, 10])
      const num = rng.int(1, den - 1)
      return {
        prompt: [
          p('Observez le schéma ci-dessous.'),
          vis({ type: 'fraction', parts: den, filled: num, caption: 'La bande est coupée en parts égales. Les parts colorées sont comptées.' }),
        ],
        question: 'Quelle fraction de la bande est colorée ? Écrivez-la sous la forme a/b.',
        answer: {
          kind: 'fraction',
          value: R(num, den),
          acceptDecimal: false,
          pitfalls: [
            { answer: `${num}/${den - num}`, tag: 'raisonnement', why: 'Vous avez comparé les parts colorées aux parts blanches. Une fraction compare toujours la partie au tout, pas une partie à l’autre.' },
            { answer: `${den}/${num}`, tag: 'format', why: 'Le numérateur et le dénominateur sont inversés : le nombre total de parts se met en bas.' },
          ],
        },
        hints: [
          'Comptez d’abord en combien de parts égales la bande entière est coupée.',
          'Ce nombre total va en bas de la fraction. Le nombre de parts colorées va en haut.',
        ],
        alternative: [
          p('Lisez la fraction comme une phrase.'),
          p(`« ${num} parts sur ${den} », cela s’écrit ${num}/${den}. Le mot « sur » correspond au trait de fraction.`),
        ],
        solution: [
          { text: `La bande est coupée en ${den} parts égales.`, why: 'Ce nombre devient le dénominateur.' },
          { text: `${num} parts sont colorées.`, why: 'Ce nombre devient le numérateur.' },
          {
            text:
              toFractionString(R(num, den)) === `${num}/${den}`
                ? `La fraction est donc ${num}/${den}.`
                : `La fraction est donc ${num}/${den}, qui se simplifie en ${toFractionString(R(num, den))}. Les deux écritures sont acceptées.`,
            why: 'On compare toujours la partie au tout.',
          },
        ],
        placeholder: 'Exemple : 3/4',
        keyboard: 'text',
      }
    },
  },
  {
    id: 'M06-fraction-decimal',
    skillId: 'M06',
    level: 'entrainement',
    structure: 'fraction-vers-decimal',
    version: 1,
    review: 'teste-automatiquement',
    seconds: 45,
    generate: (rng) => {
      const choices = [
        { num: 1, den: 2, dec: dec(5, 1) },
        { num: 1, den: 4, dec: dec(25, 2) },
        { num: 3, den: 4, dec: dec(75, 2) },
        { num: 1, den: 5, dec: dec(2, 1) },
        { num: 2, den: 5, dec: dec(4, 1) },
        { num: 1, den: 10, dec: dec(1, 1) },
        { num: 3, den: 10, dec: dec(3, 1) },
        { num: 1, den: 8, dec: dec(125, 3) },
      ]
      const c = rng.pick(choices)
      return {
        prompt: [p(`On veut écrire la fraction ${c.num}/${c.den} en écriture décimale.`)],
        question: `Quelle est l’écriture décimale de ${c.num}/${c.den} ?`,
        answer: {
          kind: 'numeric',
          value: c.dec,
          acceptFraction: false,
          pitfalls: [
            { answer: `${c.num},${c.den}`, tag: 'virgule', why: 'Une fraction n’est pas un nombre à virgule qu’on lit de gauche à droite. Le trait de fraction est une division : il faut la calculer.' },
          ],
        },
        hints: [
          'Le trait de fraction est un signe de division.',
          `Divisez ${c.num} par ${c.den}.`,
        ],
        alternative: [
          p('Cherchez une fraction équivalente sur 10, 100 ou 1 000.'),
          p(`${c.num}/${c.den} = ${fr(mulR(c.dec, R(100)))}/100, ce qui se lit directement ${fr(c.dec)}.`),
        ],
        solution: [
          { text: 'Effectuer la division.', calc: `${c.num} ÷ ${c.den} = ${fr(c.dec)}`, why: 'Le trait de fraction indique une division.' },
        ],
        placeholder: 'Exemple : 0,75',
        keyboard: 'decimal',
      }
    },
  },
  {
    id: 'M06-comparer-fractions',
    skillId: 'M06',
    level: 'entrainement',
    structure: 'comparer-deux-fractions',
    version: 1,
    review: 'teste-automatiquement',
    seconds: 55,
    generate: (rng) => {
      const pairs = [
        [R(1, 2), R(1, 3)],
        [R(1, 4), R(1, 8)],
        [R(2, 3), R(3, 4)],
        [R(3, 5), R(1, 2)],
        [R(2, 5), R(1, 2)],
        [R(5, 8), R(3, 4)],
      ]
      const [x, y] = rng.pick(pairs)
      const [a, b] = rng.chance(0.5) ? [x!, y!] : [y!, x!]
      const bigger = cmpR(a, b) > 0 ? a : b
      return {
        prompt: [
          p('Deux parts sont proposées.'),
          vis({
            type: 'fraction-compare',
            bars: [
              { parts: Number(a.d), filled: Number(a.n), label: toFractionString(a) },
              { parts: Number(b.d), filled: Number(b.n), label: toFractionString(b) },
            ],
          }),
        ],
        question: 'Quelle est la plus grande des deux fractions ?',
        answer: {
          kind: 'choice',
          options: [
            {
              id: 'a',
              label: toFractionString(a),
              feedback: cmpR(a, b) > 0 ? '' : `Non : ramenées au même dénominateur, ${toFractionString(a)} vaut ${fr(mulR(a, R(Number(a.d * b.d))))}/${a.d * b.d} contre ${fr(mulR(b, R(Number(a.d * b.d))))}/${a.d * b.d}.`,
              tag: 'raisonnement',
            },
            {
              id: 'b',
              label: toFractionString(b),
              feedback: cmpR(b, a) > 0 ? '' : `Non : ramenées au même dénominateur, ${toFractionString(b)} vaut ${fr(mulR(b, R(Number(a.d * b.d))))}/${a.d * b.d} contre ${fr(mulR(a, R(Number(a.d * b.d))))}/${a.d * b.d}.`,
              tag: 'raisonnement',
            },
          ],
          correct: [cmpR(a, b) > 0 ? 'a' : 'b'],
        },
        hints: [
          'On ne peut comparer des parts que si elles ont la même taille.',
          `Cherchez un dénominateur commun aux deux fractions, par exemple ${a.d * b.d}.`,
        ],
        alternative: [
          p('Convertissez les deux fractions en écriture décimale.'),
          p(`${toFractionString(a)} = ${fr(a, 4)} et ${toFractionString(b)} = ${fr(b, 4)}. La comparaison devient immédiate.`),
        ],
        solution: [
          { text: 'Mettre au même dénominateur.', calc: `${toFractionString(a)} = ${fr(mulR(a, R(Number(a.d * b.d))))}/${a.d * b.d} et ${toFractionString(b)} = ${fr(mulR(b, R(Number(a.d * b.d))))}/${a.d * b.d}`, why: 'Des parts de même taille se comparent en comptant les numérateurs.' },
          { text: `La plus grande est ${toFractionString(bigger)}.`, why: 'Elle a le plus grand numérateur à dénominateur égal.' },
        ],
      }
    },
  },
  {
    id: 'M06-part-du-total',
    skillId: 'M06',
    level: 'epreuve',
    structure: 'exprimer-une-part-en-fraction',
    version: 1,
    transfer: true,
    review: 'teste-automatiquement',
    seconds: 80,
    generate: (rng) => {
      const den = rng.pick([4, 5, 6, 8])
      const num = rng.int(1, den - 1)
      const unit = rng.int(4, 15)
      const total = den * unit
      const part = num * unit
      return {
        prompt: [
          p(`Sur ${frInt(total)} personnes présentes à une réunion d’information, ${frInt(part)} ont posé une question.`),
        ],
        question: 'Quelle fraction du groupe a posé une question ? Donnez la fraction la plus simple possible, sous la forme a/b.',
        answer: {
          kind: 'fraction',
          value: R(part, total),
          acceptDecimal: false,
          pitfalls: [
            { answer: `${part}/${total - part}`, tag: 'raisonnement', why: 'Vous avez comparé ceux qui ont posé une question à ceux qui n’en ont pas posé. La fraction compare la partie au groupe entier.' },
          ],
        },
        hints: [
          'Le tout, ici, c’est le nombre total de personnes présentes.',
          `Écrivez ${frInt(part)}/${frInt(total)}, puis cherchez un nombre qui divise à la fois le haut et le bas.`,
        ],
        alternative: [
          p('Cherchez combien de groupes égaux on peut former.'),
          p(
            `${frInt(total)} personnes peuvent se répartir en ${den} groupes de ${unit}. Les ${frInt(part)} personnes concernées représentent ${num} de ces groupes, soit ${num}/${den}.`,
          ),
        ],
        solution: [
          { text: 'Écrire la fraction brute.', calc: `${frInt(part)}/${frInt(total)}`, why: 'La partie au-dessus, le tout en dessous.' },
          { text: 'Simplifier par le diviseur commun.', calc: `${frInt(part)} ÷ ${unit} = ${num} et ${frInt(total)} ÷ ${unit} = ${den}`, why: 'Diviser le haut et le bas par le même nombre ne change pas la valeur.' },
          { text: `Fraction simplifiée : ${toFractionString(R(part, total))}.`, why: 'C’est l’écriture la plus lisible.' },
        ],
        placeholder: 'Exemple : 3/4',
        keyboard: 'text',
      }
    },
  },

  // ---------------------------------------------------------------- M07 ---
  {
    id: 'M07-meme-denominateur',
    skillId: 'M07',
    level: 'decouverte',
    structure: 'addition-fractions-meme-denominateur',
    version: 1,
    review: 'teste-automatiquement',
    seconds: 50,
    generate: (rng) => {
      const den = rng.pick([5, 6, 8, 10, 12])
      const a = rng.int(1, den - 2)
      const b = rng.int(1, den - 1 - a)
      const sum = R(a + b, den)
      return {
        prompt: [p(`Une équipe a traité ${a}/${den} des dossiers le matin et ${b}/${den} l’après-midi.`)],
        question: 'Quelle part des dossiers a été traitée en tout ? Donnez la fraction la plus simple.',
        answer: {
          kind: 'fraction',
          value: sum,
          acceptDecimal: false,
          pitfalls: [
            { answer: `${a + b}/${den + den}`, tag: 'operation', why: 'Vous avez additionné les dénominateurs. Le dénominateur indique la taille des parts : elle ne change pas quand on en compte davantage.' },
          ],
        },
        hints: [
          'Les deux fractions ont déjà le même dénominateur : les parts sont de même taille.',
          'Additionnez seulement les numérateurs et gardez le même dénominateur, puis simplifiez si possible.',
        ],
        alternative: [
          p('Comptez des parts, comme on compte des objets identiques.'),
          p(`${a} parts plus ${b} parts, cela fait ${a + b} parts. Chaque part vaut toujours 1/${den}.`),
        ],
        solution: [
          { text: 'Additionner les numérateurs.', calc: `${a}/${den} + ${b}/${den} = ${a + b}/${den}`, why: 'Les parts ont la même taille.' },
          { text: `Simplifier si possible : ${toFractionString(sum)}.`, why: 'On divise le haut et le bas par leur diviseur commun.' },
        ],
        placeholder: 'Exemple : 3/4',
        keyboard: 'text',
      }
    },
  },
  {
    id: 'M07-denominateur-commun',
    skillId: 'M07',
    level: 'entrainement',
    structure: 'addition-fractions-denominateurs-multiples',
    version: 1,
    review: 'teste-automatiquement',
    seconds: 75,
    generate: (rng) => {
      const small = rng.pick([2, 3, 4])
      const factor = rng.pick([2, 3, 4])
      const big = small * factor
      const a = 1
      const b = rng.int(1, big - factor - 1 > 0 ? big - factor - 1 : 1)
      const sum = addR(R(a, small), R(b, big))
      return {
        prompt: [p(`Une tâche a été réalisée à ${a}/${small} lundi, puis ${b}/${big} mardi.`)],
        question: 'Quelle part a été réalisée en tout ? Donnez la fraction la plus simple.',
        answer: {
          kind: 'fraction',
          value: sum,
          acceptDecimal: false,
          pitfalls: [
            { answer: `${a + b}/${small + big}`, tag: 'operation', why: 'Vous avez additionné séparément les numérateurs et les dénominateurs. Il faut d’abord rendre les parts de même taille.' },
          ],
        },
        hints: [
          `Les parts n’ont pas la même taille : des ${small}èmes et des ${big}èmes.`,
          `${big} est un multiple de ${small} : transformez ${a}/${small} en ${big}èmes en multipliant haut et bas par ${factor}.`,
        ],
        alternative: [
          p('Redécoupez la plus grosse part.'),
          p(
            `Une part sur ${small} vaut exactement ${factor} parts sur ${big}. Une fois tout exprimé en ${big}èmes, l’addition se fait en comptant les parts.`,
          ),
        ],
        solution: [
          { text: 'Mettre au même dénominateur.', calc: `${a}/${small} = ${a * factor}/${big}`, why: `Multiplier haut et bas par ${factor} ne change pas la valeur.` },
          { text: 'Additionner les numérateurs.', calc: `${a * factor}/${big} + ${b}/${big} = ${a * factor + b}/${big}`, why: 'Les parts sont maintenant identiques.' },
          { text: `Simplifier : ${toFractionString(sum)}.`, why: 'On cherche le plus grand diviseur commun.' },
        ],
        placeholder: 'Exemple : 5/6',
        keyboard: 'text',
      }
    },
  },
  {
    id: 'M07-fraction-fois-nombre',
    skillId: 'M07',
    level: 'entrainement',
    structure: 'fraction-multipliee-par-un-nombre',
    version: 1,
    review: 'teste-automatiquement',
    seconds: 60,
    generate: (rng) => {
      const den = rng.pick([2, 3, 4, 5])
      const num = rng.int(1, den - 1)
      // La question demande une écriture décimale : le résultat doit donc en
      // avoir une exacte. Sans ce filtre, 1/3 × 7 donnait 2,333… — un énoncé
      // qu'aucune saisie ne pouvait réussir.
      const times = rng.pick(
        [3, 4, 5, 6, 7, 8, 9, 10, 11, 12].filter((t) => hasFiniteDecimal(mulR(R(num, den), R(t)))),
      )
      const result = mulR(R(num, den), R(times))
      return {
        prompt: [p(`Chaque flacon contient ${num}/${den} de litre. On en prépare ${times}.`)],
        question: 'Quel volume total cela représente-t-il, en litres ? Donnez le résultat en écriture décimale.',
        answer: {
          kind: 'numeric',
          value: result,
          unit: 'L',
          unitPolicy: 'optional',
          pitfalls: [
            { answer: `${num * times}/${den * times}`, tag: 'operation', why: 'Vous avez multiplié le haut et le bas. Multiplier les deux ne change pas la valeur : cela revient à ne rien faire.' },
          ],
        },
        hints: [
          'Multiplier par un nombre entier, c’est répéter la même quantité.',
          `Multipliez seulement le numérateur : ${num} × ${times}, en gardant le dénominateur ${den}. Convertissez ensuite en écriture décimale.`,
        ],
        alternative: [
          p('Passez par l’écriture décimale dès le départ.'),
          p(`${num}/${den} = ${fr(R(num, den), 4)} L. Multiplié par ${times}, cela donne ${fr(result, 4)} L.`),
        ],
        solution: [
          { text: 'Multiplier le numérateur.', calc: `${num}/${den} × ${times} = ${num * times}/${den}`, why: 'On répète la même part plusieurs fois : le nombre de parts augmente, pas leur taille.' },
          { text: 'Convertir en écriture décimale.', calc: `${num * times}/${den} = ${fr(result, 4)}`, why: 'Le trait de fraction est une division.' },
        ],
        conclusion: `Le volume total est de ${fr(result, 4)} L.`,
        placeholder: 'Exemple : 1,5',
        keyboard: 'decimal',
        suffix: 'L',
      }
    },
  },
  {
    id: 'M07-part-restante',
    skillId: 'M07',
    level: 'epreuve',
    structure: 'part-restante-apres-deux-prelevements',
    version: 1,
    transfer: true,
    review: 'teste-automatiquement',
    seconds: 90,
    generate: (rng) => {
      const den = rng.pick([6, 8, 10, 12])
      const a = rng.int(1, Math.floor(den / 2))
      const b = rng.int(1, den - a - 1)
      const rest = subR(R(1), addR(R(a, den), R(b, den)))
      return {
        prompt: [
          p(`Un lot de fournitures est réparti entre trois services. Le premier reçoit ${a}/${den} du lot, le deuxième ${b}/${den}.`),
          vis({
            type: 'fraction-compare',
            bars: [
              { parts: den, filled: a, label: `1ᵉʳ service : ${a}/${den}` },
              { parts: den, filled: b, label: `2ᵉ service : ${b}/${den}` },
            ],
          }),
        ],
        question: 'Quelle fraction du lot revient au troisième service ? Donnez la fraction la plus simple.',
        answer: {
          kind: 'fraction',
          value: rest,
          acceptDecimal: false,
          pitfalls:
            2 * (a + b) === den
              ? []
              : [
                  {
                    answer: `${a + b}/${den}`,
                    tag: 'consigne' as const,
                    why: 'Vous avez calculé la part des deux premiers services. La question porte sur ce qui reste.',
                  },
                ],
        },
        hints: [
          'Le lot entier vaut 1, c’est-à-dire une fraction dont le numérateur égale le dénominateur.',
          `Écrivez le tout comme ${den}/${den}, puis retirez les deux parts déjà attribuées.`,
        ],
        alternative: [
          p('Comptez les parts qui restent sur le schéma.'),
          p(
            `Le lot compte ${den} parts. ${a} sont prises par le premier service, ${b} par le deuxième. Il en reste ${den - a - b}, soit ${den - a - b}/${den}.`,
          ),
        ],
        solution: [
          { text: 'Écrire le tout en fraction.', calc: `1 = ${den}/${den}`, why: 'Une fraction dont le haut égale le bas vaut exactement le tout.' },
          { text: 'Additionner les parts attribuées.', calc: `${a}/${den} + ${b}/${den} = ${a + b}/${den}`, why: 'Les parts ont la même taille.' },
          { text: 'Soustraire du tout.', calc: `${den}/${den} − ${a + b}/${den} = ${den - a - b}/${den} = ${toFractionString(rest)}`, why: 'Ce qui reste est le tout diminué de ce qui est pris.' },
        ],
        placeholder: 'Exemple : 1/3',
        keyboard: 'text',
      }
    },
  },

  // ---------------------------------------------------------------- M08 ---
  {
    id: 'M08-passage-unite',
    skillId: 'M08',
    level: 'decouverte',
    structure: 'proportionnalite-passage-a-l-unite',
    version: 1,
    review: 'teste-automatiquement',
    seconds: 65,
    generate: (rng) => {
      const unitPrice = dec(rng.pick([50, 75, 120, 150, 250, 300]), 2)
      const q1 = rng.pick([6, 8, 12, 18, 20])
      const q2 = rng.pick([15, 24, 30, 36, 45])
      const p1 = mulR(unitPrice, R(q1))
      const p2 = mulR(unitPrice, R(q2))
      return {
        prompt: [
          p(`${q1} articles identiques coûtent ${fr(p1)} €.`),
          vis({
            type: 'proportion',
            topLabel: 'Articles',
            bottomLabel: 'Prix (€)',
            columns: [
              { top: String(q1), bottom: fr(p1) },
              { top: '1', bottom: '?', highlight: true },
              { top: String(q2), bottom: '?' },
            ],
          }),
        ],
        question: `Combien coûtent ${q2} de ces articles, en euros ?`,
        answer: {
          kind: 'numeric',
          value: p2,
          unit: '€',
          unitPolicy: 'optional',
          pitfalls: [
            { answer: fr(addR(p1, R(q2 - q1))), tag: 'raisonnement', why: 'Vous avez ajouté la différence de quantité au prix. Dans une situation proportionnelle, on multiplie, on n’ajoute pas.' },
          ],
        },
        hints: [
          'Cherchez d’abord ce que coûte un seul article.',
          `Divisez ${fr(p1)} par ${q1}, puis multipliez le résultat par ${q2}.`,
        ],
        alternative: [
          p('Passez par un facteur.'),
          p(
            `Pour aller de ${q1} à ${q2} articles, on multiplie par ${fr(divR(R(q2), R(q1)), 4)}. Le prix se multiplie par le même facteur.`,
          ),
        ],
        solution: [
          { text: 'Passer à l’unité.', calc: `${fr(p1)} ÷ ${q1} = ${fr(unitPrice)} €`, why: 'Le prix d’un article est la clé de tout le reste.' },
          { text: 'Remonter à la quantité demandée.', calc: `${fr(unitPrice)} × ${q2} = ${fr(p2)} €`, why: 'Chaque article coûte le même prix.' },
          { text: 'Vérifier le sens.', why: `${q2} ${q2 > q1 ? '>' : '<'} ${q1}, donc le prix doit être ${q2 > q1 ? 'plus élevé' : 'plus bas'} : c’est bien le cas.` },
        ],
        conclusion: `${q2} articles coûtent ${fr(p2)} €.`,
        placeholder: 'Exemple : 45',
        keyboard: 'decimal',
        suffix: '€',
      }
    },
  },
  {
    id: 'M08-tableau-manquant',
    skillId: 'M08',
    level: 'entrainement',
    structure: 'valeur-manquante-dans-un-tableau',
    version: 1,
    review: 'teste-automatiquement',
    seconds: 70,
    generate: (rng) => {
      const perUnit = rng.pick([3, 4, 5, 6, 8])
      const cols = [rng.int(2, 5), rng.int(6, 9), rng.int(10, 16)]
      const hidden = rng.int(0, 2)
      const answer = R(cols[hidden]! * perUnit)
      return {
        prompt: [
          p('Ce tableau est un tableau de proportionnalité : chaque colonne suit la même règle.'),
          vis({
            type: 'proportion',
            topLabel: 'Personnes',
            bottomLabel: 'Portions',
            columns: cols.map((c, i) => ({
              top: String(c),
              bottom: i === hidden ? '?' : String(c * perUnit),
              highlight: i === hidden,
            })),
          }),
        ],
        question: 'Quelle valeur manque dans le tableau ?',
        answer: {
          kind: 'numeric',
          value: answer,
          pitfalls: [
            { answer: String(cols[hidden]! + perUnit), tag: 'raisonnement', why: 'Vous avez additionné. Dans un tableau de proportionnalité, on passe d’une ligne à l’autre en multipliant toujours par le même nombre.' },
          ],
        },
        hints: [
          'Regardez une colonne complète : quel calcul fait passer de la ligne du haut à celle du bas ?',
          `Divisez une valeur du bas par la valeur du haut correspondante : vous trouverez toujours le même nombre.`,
        ],
        alternative: [
          p('Cherchez la valeur pour une seule personne.'),
          p(`Une personne correspond à ${perUnit} portions. Il suffit ensuite de multiplier par le nombre de personnes.`),
        ],
        solution: [
          { text: 'Trouver le coefficient.', calc: `${cols[(hidden + 1) % 3]! * perUnit} ÷ ${cols[(hidden + 1) % 3]} = ${perUnit}`, why: 'Dans un tableau de proportionnalité, ce rapport est constant.' },
          { text: 'Appliquer le coefficient à la colonne manquante.', calc: `${cols[hidden]} × ${perUnit} = ${fr(answer)}`, why: 'La même règle vaut pour toutes les colonnes.' },
        ],
        placeholder: 'Nombre',
        keyboard: 'decimal',
      }
    },
  },
  {
    id: 'M08-est-ce-proportionnel',
    skillId: 'M08',
    level: 'entrainement',
    structure: 'reconnaitre-une-situation-proportionnelle',
    version: 1,
    review: 'teste-automatiquement',
    seconds: 55,
    generate: (rng) => {
      const situations = [
        { text: 'Le prix payé et le nombre d’articles identiques achetés.', prop: true, why: 'Deux fois plus d’articles coûtent exactement deux fois plus cher.' },
        { text: 'L’âge d’une personne et sa taille.', prop: false, why: 'Doubler l’âge ne double pas la taille : la croissance n’est pas proportionnelle au temps.' },
        { text: 'La distance parcourue et la durée, à vitesse constante.', prop: true, why: 'À vitesse constante, deux fois plus de temps donne deux fois plus de distance.' },
        { text: 'Le nombre de personnes présentes et la durée d’une réunion.', prop: false, why: 'Rien n’impose que la durée augmente avec le nombre de personnes.' },
        { text: 'La quantité de linge et le nombre de machines nécessaires.', prop: true, why: 'Si chaque machine traite la même quantité, le nombre de machines suit la quantité.' },
        { text: 'La température extérieure et le jour du mois.', prop: false, why: 'Aucune règle multiplicative ne relie ces deux grandeurs.' },
      ]
      const picked = rng.sample(situations, 4)
      const target = rng.pick(picked)
      return {
        prompt: [p('Une situation est proportionnelle si, quand une grandeur est multipliée par un nombre, l’autre est multipliée par le même nombre.')],
        question: target.prop
          ? 'Parmi ces situations, laquelle est proportionnelle ?'
          : 'Parmi ces situations, laquelle n’est PAS proportionnelle ?',
        answer: {
          kind: 'choice',
          options: picked.map((s, i) => ({
            id: `s${i}`,
            label: s.text,
            feedback: s === target ? '' : s.why,
            tag: 'raisonnement',
          })),
          correct: [`s${picked.indexOf(target)}`],
        },
        hints: [
          'Posez-vous la question : si je double la première grandeur, la seconde double-t-elle forcément ?',
          'Cherchez une situation où le rapport entre les deux grandeurs reste toujours le même.',
        ],
        alternative: [
          p('Testez avec des nombres.'),
          p('Prenez une valeur, doublez-la, et demandez-vous ce qui arrive à l’autre grandeur. Si le résultat n’est pas doublé, il n’y a pas proportionnalité.'),
        ],
        solution: [
          { text: `Réponse : « ${target.text} »`, why: target.why },
        ],
      }
    },
  },
  {
    id: 'M08-recette',
    skillId: 'M08',
    level: 'entrainement',
    structure: 'adapter-une-quantite-au-nombre-de-personnes',
    version: 1,
    review: 'teste-automatiquement',
    seconds: 75,
    generate: (rng) => {
      const forPeople = rng.pick([4, 6, 8])
      const grams = rng.pick([200, 240, 300, 360, 450])
      // Même exigence : une quantité en grammes doit tomber juste. Sans ce
      // filtre, 200 g pour 6 personnes portés à 10 donnaient 333,333… g.
      const target = rng.pick(
        [10, 12, 15, 18, 20].filter((t) => hasFiniteDecimal(mulR(divR(R(grams), R(forPeople)), R(t)))),
      )
      const result = mulR(divR(R(grams), R(forPeople)), R(target))
      return {
        prompt: [p(`Une recette prévoit ${frInt(grams)} g d’un ingrédient pour ${forPeople} personnes.`)],
        question: `Quelle quantité faut-il pour ${target} personnes, en grammes ?`,
        answer: {
          kind: 'numeric',
          value: result,
          unit: 'g',
          unitPolicy: 'optional',
          pitfalls: [
            { answer: fr(addR(R(grams), R(target - forPeople))), tag: 'raisonnement', why: 'Vous avez ajouté la différence de personnes à la quantité. Une recette se multiplie, elle ne s’additionne pas.' },
          ],
        },
        hints: [
          'Cherchez d’abord la quantité nécessaire pour une seule personne.',
          `Divisez ${frInt(grams)} par ${forPeople}, puis multipliez par ${target}.`,
        ],
        alternative: [
          p('Raisonnez par multiples de la recette.'),
          p(
            `${target} personnes, c’est ${fr(divR(R(target), R(forPeople)), 4)} fois ${forPeople} personnes. Multipliez la quantité par ce même facteur.`,
          ),
        ],
        solution: [
          { text: 'Quantité pour une personne.', calc: `${frInt(grams)} ÷ ${forPeople} = ${fr(divR(R(grams), R(forPeople)), 4)} g`, why: 'Le passage à l’unité rend toutes les autres quantités faciles à calculer.' },
          { text: 'Quantité pour le groupe demandé.', calc: `${fr(divR(R(grams), R(forPeople)), 4)} × ${target} = ${fr(result, 4)} g`, why: 'Chaque personne reçoit la même quantité.' },
        ],
        conclusion: `Il faut ${fr(result, 4)} g pour ${target} personnes.`,
        placeholder: 'Exemple : 600',
        keyboard: 'decimal',
        suffix: 'g',
      }
    },
  },
  {
    id: 'M08-comparer-offres',
    skillId: 'M08',
    level: 'epreuve',
    structure: 'comparer-deux-offres-par-le-prix-unitaire',
    version: 1,
    transfer: true,
    review: 'teste-automatiquement',
    seconds: 100,
    generate: (rng) => {
      const unitA = dec(rng.int(120, 260), 2)
      const qtyA = rng.pick([6, 8, 10, 12])
      const qtyB = rng.pick([15, 20, 24, 25])
      // On construit B strictement moins cher ou plus cher à l'unité, jamais égal.
      const cheaperB = rng.chance(0.5)
      const unitB = cheaperB ? subR(unitA, dec(rng.int(10, 40), 2)) : addR(unitA, dec(rng.int(10, 40), 2))
      const priceA = mulR(unitA, R(qtyA))
      const priceB = mulR(unitB, R(qtyB))
      return {
        prompt: [
          p('Deux fournisseurs proposent le même article.'),
          vis({
            type: 'table',
            headers: ['Offre', 'Quantité', 'Prix total'],
            rows: [
              ['Offre A', `${qtyA} articles`, `${fr(priceA)} €`],
              ['Offre B', `${qtyB} articles`, `${fr(priceB)} €`],
            ],
          }),
        ],
        question: 'Quelle offre est la plus avantageuse à l’unité ?',
        answer: {
          kind: 'choice',
          options: [
            {
              id: 'A',
              label: `Offre A (${fr(unitA)} € l’unité)`,
              feedback: cheaperB ? `L’offre A revient à ${fr(unitA)} € l’unité, contre ${fr(unitB)} € pour l’offre B.` : '',
              tag: 'raisonnement',
            },
            {
              id: 'B',
              label: `Offre B (${fr(unitB)} € l’unité)`,
              feedback: cheaperB ? '' : `L’offre B revient à ${fr(unitB)} € l’unité, contre ${fr(unitA)} € pour l’offre A.`,
              tag: 'raisonnement',
            },
          ],
          correct: [cheaperB ? 'B' : 'A'],
        },
        hints: [
          'On ne peut pas comparer directement deux prix si les quantités sont différentes.',
          'Ramenez chaque offre au prix d’un seul article, puis comparez ces deux prix.',
        ],
        alternative: [
          p('Comparez à quantité identique plutôt qu’à l’unité.'),
          p(
            `Calculez ce que coûteraient ${qtyA * qtyB} articles chez chaque fournisseur. Le raisonnement est le même, mais évite les centimes.`,
          ),
        ],
        solution: [
          { text: 'Prix unitaire de l’offre A.', calc: `${fr(priceA)} ÷ ${qtyA} = ${fr(unitA)} €`, why: 'Passage à l’unité.' },
          { text: 'Prix unitaire de l’offre B.', calc: `${fr(priceB)} ÷ ${qtyB} = ${fr(unitB)} €`, why: 'Même méthode, pour pouvoir comparer.' },
          { text: `L’offre ${cheaperB ? 'B' : 'A'} est la moins chère à l’unité.`, why: 'Le prix total seul ne dit rien : c’est le prix par article qui compte.' },
        ],
      }
    },
  },

  // ---------------------------------------------------------------- M09 ---
  {
    id: 'M09-pourcentage-de',
    skillId: 'M09',
    level: 'decouverte',
    structure: 'calculer-un-pourcentage-d-une-quantite',
    version: 1,
    review: 'teste-automatiquement',
    seconds: 55,
    generate: (rng) => {
      const rate = rng.pick([5, 10, 15, 20, 25, 30, 40, 75])
      const total = rng.pick([80, 120, 160, 200, 240, 300, 360, 400])
      const part = mulR(R(total), R(rate, 100))
      return {
        prompt: [p(`Un établissement fictif sert ${frInt(total)} repas par jour.`)],
        question: `Combien de repas représentent ${rate} % du total ?`,
        answer: {
          kind: 'numeric',
          value: part,
          pitfalls: [
            { answer: String(rate), tag: 'consigne', why: `${rate} est le taux, pas la quantité. Il faut appliquer ce taux aux ${frInt(total)} repas.` },
            { answer: fr(mulR(R(total), R(rate))), tag: 'virgule', why: 'Vous avez multiplié par le taux sans diviser par 100. Un pourcentage est une part sur cent.' },
          ],
        },
        hints: [
          `${rate} %, cela veut dire ${rate} pour 100.`,
          `Calculez ${frInt(total)} × ${rate}, puis divisez par 100. Ou bien : 10 % de ${frInt(total)} font ${fr(divR(R(total), R(10)))}, et déduisez-en ${rate} %.`,
        ],
        alternative: [
          p('Décomposez le pourcentage en morceaux simples.'),
          p(
            `10 % de ${frInt(total)} = ${fr(divR(R(total), R(10)))}. 1 % = ${fr(divR(R(total), R(100)))}. En combinant ces repères, on obtient ${rate} % sans calculatrice.`,
          ),
        ],
        solution: [
          { text: 'Traduire le pourcentage en fraction.', calc: `${rate} % = ${rate}/100`, why: 'C’est la définition : une part pour cent.' },
          { text: 'Appliquer au total.', calc: `${frInt(total)} × ${rate} ÷ 100 = ${fr(part)}`, why: 'On prend la part correspondante du total.' },
          { text: 'Vérifier la plausibilité.', why: `${rate} % est ${rate < 50 ? 'moins' : rate > 50 ? 'plus' : 'exactement'} que la moitié : ${fr(part)} est cohérent avec ${frInt(total)}.` },
        ],
        conclusion: `${rate} % de ${frInt(total)} repas, c’est ${fr(part)} repas.`,
        placeholder: 'Nombre de repas',
        keyboard: 'decimal',
      }
    },
  },
  {
    id: 'M09-trouver-taux',
    skillId: 'M09',
    level: 'entrainement',
    structure: 'retrouver-le-taux',
    version: 1,
    review: 'teste-automatiquement',
    seconds: 65,
    generate: (rng) => {
      const rate = rng.pick([5, 10, 12, 15, 20, 25, 40, 60])
      // Le nombre de personnes doit rester entier : « 9,6 personnes » n'a pas
      // de sens, et la valeur passerait à BigInt qui refuse les décimaux.
      const totals = [80, 120, 160, 200, 240, 300, 400, 500].filter((n) => (n * rate) % 100 === 0)
      const total = rng.pick(totals)
      const part = (total * rate) / 100
      return {
        prompt: [p(`Sur ${frInt(total)} personnes interrogées, ${frInt(part)} déclarent utiliser les transports en commun.`)],
        question: 'Quel pourcentage du groupe cela représente-t-il ?',
        answer: {
          kind: 'numeric',
          value: R(rate),
          pitfalls: [
            { answer: String(part), tag: 'consigne' as const, why: 'Vous avez redonné le nombre de personnes. La question demande une proportion exprimée pour 100.' },
            ...(rate === 10
              ? []
              : [
                  {
                    answer: fr(divR(R(total), R(part))),
                    tag: 'raisonnement' as const,
                    why: 'La division a été faite dans le mauvais sens. Le total se met au dénominateur.',
                  },
                ]),
          ],
        },
        hints: [
          'Un pourcentage compare une partie à un total.',
          `Divisez ${frInt(part)} par ${frInt(total)}, puis multipliez par 100.`,
        ],
        alternative: [
          p('Cherchez combien cela ferait sur 100 personnes.'),
          p(
            `Si ${frInt(total)} personnes donnent ${frInt(part)} réponses, alors 100 personnes en donneraient ${rate}. C’est exactement ce que veut dire « ${rate} % ».`,
          ),
        ],
        solution: [
          { text: 'Écrire la proportion.', calc: `${frInt(part)} ÷ ${frInt(total)} = ${fr(R(part, total), 4)}`, why: 'La partie sur le tout.' },
          { text: 'Exprimer pour 100.', calc: `${fr(R(part, total), 4)} × 100 = ${rate} %`, why: 'Un pourcentage est une proportion ramenée à une base de 100.' },
        ],
        conclusion: `Cela représente ${rate} % du groupe.`,
        placeholder: 'Exemple : 15',
        keyboard: 'decimal',
        suffix: '%',
      }
    },
  },
  {
    id: 'M09-trouver-total',
    skillId: 'M09',
    level: 'entrainement',
    structure: 'retrouver-le-total',
    version: 1,
    review: 'teste-automatiquement',
    seconds: 75,
    generate: (rng) => {
      const rate = rng.pick([10, 20, 25, 40, 50])
      const total = rng.pick([80, 120, 160, 200, 240, 300, 400])
      const part = (total * rate) / 100
      return {
        prompt: [p(`${frInt(part)} dossiers ont été traités, ce qui représente ${rate} % du total à traiter.`)],
        question: 'Combien y a-t-il de dossiers au total ?',
        answer: {
          kind: 'numeric',
          value: R(total),
          pitfalls: [
            { answer: fr(mulR(R(part), R(rate, 100))), tag: 'raisonnement', why: `Vous avez appliqué ${rate} % au nombre de dossiers déjà traités. Or ces ${frInt(part)} dossiers SONT déjà les ${rate} % : il faut remonter au total, donc diviser.` },
          ],
        },
        hints: [
          'Ici, la partie est connue et le total est inconnu : le calcul se fait dans l’autre sens.',
          `Si ${rate} % valent ${frInt(part)}, alors 1 % vaut ${frInt(part)} ÷ ${rate}. Le total correspond à 100 %.`,
        ],
        alternative: [
          p('Passez par 1 %.'),
          p(`${frInt(part)} ÷ ${rate} = ${fr(divR(R(part), R(rate)))} pour 1 %. En multipliant par 100, on obtient le total : ${frInt(total)}.`),
        ],
        solution: [
          { text: 'Valeur de 1 %.', calc: `${frInt(part)} ÷ ${rate} = ${fr(divR(R(part), R(rate)))}`, why: 'On ramène d’abord à une seule unité de pourcentage.' },
          { text: 'Valeur de 100 %.', calc: `${fr(divR(R(part), R(rate)))} × 100 = ${frInt(total)}`, why: 'Le total correspond toujours à 100 %.' },
          { text: 'Vérifier.', calc: `${rate} % de ${frInt(total)} = ${frInt(part)}`, why: 'On retombe bien sur la donnée de départ.' },
        ],
        conclusion: `Il y a ${frInt(total)} dossiers au total.`,
        placeholder: 'Nombre de dossiers',
        keyboard: 'decimal',
      }
    },
  },
  {
    id: 'M09-hausse-baisse',
    skillId: 'M09',
    level: 'entrainement',
    structure: 'appliquer-une-hausse-ou-une-baisse',
    version: 1,
    review: 'teste-automatiquement',
    seconds: 70,
    generate: (rng) => {
      const rate = rng.pick([5, 10, 15, 20, 25])
      const base = rng.pick([40, 60, 80, 120, 200, 240])
      const up = rng.chance(0.5)
      const delta = (base * rate) / 100
      const result = up ? base + delta : base - delta
      return {
        prompt: [p(`Le prix d’un abonnement de transport fictif est de ${frInt(base)} €. Il ${up ? 'augmente' : 'diminue'} de ${rate} %.`)],
        question: 'Quel est le nouveau prix, en euros ?',
        answer: {
          kind: 'numeric',
          value: R(result * 100, 100),
          unit: '€',
          unitPolicy: 'optional',
          pitfalls: [
            { answer: fr(R(delta * 100, 100)), tag: 'consigne', why: `Vous avez donné la variation (${fr(R(delta * 100, 100))} €), pas le nouveau prix. Il faut ${up ? 'ajouter' : 'retirer'} cette variation au prix de départ.` },
            { answer: fr(R((up ? base - delta : base + delta) * 100, 100)), tag: 'raisonnement', why: `Le sens est inversé : une ${up ? 'hausse' : 'baisse'} rend le prix ${up ? 'plus élevé' : 'plus bas'}.` },
          ],
        },
        hints: [
          'Calculez d’abord de combien d’euros le prix change.',
          `${rate} % de ${frInt(base)} donne la variation. ${up ? 'Ajoutez-la' : 'Retirez-la'} ensuite au prix de départ.`,
        ],
        alternative: [
          p('Utilisez un coefficient multiplicateur.'),
          p(
            `${up ? `Augmenter de ${rate} %` : `Diminuer de ${rate} %`} revient à multiplier par ${fr(R(up ? 100 + rate : 100 - rate, 100))}. Ici : ${frInt(base)} × ${fr(R(up ? 100 + rate : 100 - rate, 100))} = ${fr(R(result * 100, 100))} €.`,
          ),
        ],
        solution: [
          { text: 'Calculer la variation.', calc: `${rate} % de ${frInt(base)} = ${fr(R(delta * 100, 100))} €`, why: 'Une hausse ou une baisse s’applique toujours au montant de départ.' },
          { text: `${up ? 'Ajouter' : 'Retirer'} la variation.`, calc: `${frInt(base)} ${up ? '+' : '−'} ${fr(R(delta * 100, 100))} = ${fr(R(result * 100, 100))} €`, why: `Une ${up ? 'hausse' : 'baisse'} ${up ? 'augmente' : 'diminue'} le prix.` },
        ],
        conclusion: `Le nouveau prix est de ${fr(R(result * 100, 100))} €.`,
        placeholder: 'Exemple : 66',
        keyboard: 'decimal',
        suffix: '€',
      }
    },
  },
  {
    id: 'M09-points-vs-pourcent',
    skillId: 'M09',
    level: 'epreuve',
    structure: 'distinguer-points-et-pourcentage',
    version: 1,
    review: 'teste-automatiquement',
    seconds: 70,
    generate: (rng) => {
      const before = rng.pick([10, 15, 20, 25, 40])
      const after = before + rng.pick([3, 5, 10])
      const points = after - before
      const relative = roundR(mulR(divR(R(points), R(before)), R(100)), 1)
      return {
        prompt: [
          p(`Dans une enquête fictive, la part de personnes déclarant se déplacer à pied passe de ${before} % à ${after} % en un an.`),
        ],
        question: 'Comment décrire correctement cette évolution ?',
        answer: {
          kind: 'choice',
          options: [
            {
              id: 'points',
              label: `Une hausse de ${points} points de pourcentage.`,
              feedback: '',
            },
            {
              id: 'pourcent',
              label: `Une hausse de ${points} %.`,
              feedback: `Dire « ${points} % » laisse entendre que la valeur a augmenté de ${points} % de sa propre valeur, ce qui ferait ${fr(mulR(R(before), R(100 + points, 100)), 2)} %. L’écart entre deux pourcentages se dit en points.`,
              tag: 'raisonnement',
            },
            {
              id: 'relatif',
              label: `Une hausse de ${fr(relative)} %.`,
              feedback: `Cette valeur est la hausse relative : ${points} rapporté à ${before}. Elle est exacte si l’on précise « hausse relative », mais la description directe de l’écart se dit en points.`,
              tag: 'raisonnement',
            },
          ],
          correct: ['points'],
        },
        hints: [
          'L’écart entre deux pourcentages ne se dit pas de la même façon que la variation d’une quantité.',
          'Quand on compare deux taux, l’écart s’exprime en « points de pourcentage ».',
        ],
        alternative: [
          p('Prenez un exemple chiffré.'),
          p(
            `Sur 1 000 personnes, ${before} % font ${before * 10} personnes et ${after} % en font ${after * 10}. L’écart est de ${points * 10} personnes, soit ${points} points de pourcentage. Rapporté au départ, cela représente une hausse relative de ${fr(relative)} %.`,
          ),
        ],
        solution: [
          { text: `L’écart vaut ${after} − ${before} = ${points}.`, why: 'C’est une différence entre deux taux.' },
          { text: 'Une différence entre deux pourcentages s’exprime en points.', why: 'Cela évite de confondre l’écart absolu et la variation relative.' },
          { text: `La hausse relative, elle, vaut ${points} ÷ ${before} × 100 ≈ ${fr(relative)} %.`, why: 'Les deux informations sont justes mais ne disent pas la même chose.' },
        ],
      }
    },
  },
]

