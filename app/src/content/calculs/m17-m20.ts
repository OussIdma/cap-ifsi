/**
 * Calculs — M17 à M20 : compléments.
 *
 * Attention : ces quatre chapitres ne sont pas annoncés comme des épreuves du
 * concours. L'article 12 de l'arrêté ne crée pas de sous-épreuve de géométrie
 * ni de calcul de doses. Ils figurent ici comme compléments, après les
 * compétences prioritaires, et l'application le dit à l'utilisatrice.
 */

import { addR, divR, mulR, rat, type Rational } from '@/engine/rational'
import type { ExerciseTemplate, Lesson } from '../types'
import { fr, frInt, key, lead, p, vis, warn } from '../blocks'

const R = (n: number | bigint, d: number | bigint = 1) => rat(BigInt(n), BigInt(d))
const dec = (digits: number, places: number): Rational => rat(BigInt(digits), 10n ** BigInt(places))

export const LESSONS_M17_M20: Lesson[] = [
  {
    skillId: 'M17',
    review: 'relu-par-le-modele',
    explanation: [
      lead('Périmètre, aire et volume répondent à trois questions différentes.'),
      p(
        'Le périmètre mesure le tour : on additionne les longueurs des côtés, et le résultat est une longueur (m, cm). L’aire mesure la surface couverte : le résultat est en unités carrées (m², cm²). Le volume mesure la place occupée : le résultat est en unités cubes (m³, cm³) ou en litres.',
      ),
      vis({
        type: 'table',
        headers: ['Ce qu’on cherche', 'Formule (rectangle / pavé)', 'Unité du résultat'],
        rows: [
          ['Le tour', 'Périmètre = 2 × (longueur + largeur)', 'm, cm'],
          ['La surface', 'Aire = longueur × largeur', 'm², cm²'],
          ['La place occupée', 'Volume = longueur × largeur × hauteur', 'm³, dm³'],
        ],
      }),
      key('Égalité à retenir : 1 dm³ = 1 L. Un cube de 10 cm de côté contient exactement un litre.'),
      warn(
        'Les conversions d’aires et de volumes ne suivent pas le facteur 10. Entre m² et dm², le facteur est 100. Entre m³ et dm³, il est 1 000.',
      ),
    ],
    alternative: [
      p('Pensez à ce que vous mesureriez concrètement.'),
      p(
        'Pour acheter une plinthe qui fait le tour d’une pièce, c’est le périmètre. Pour acheter de la moquette, c’est l’aire. Pour savoir combien d’eau tient dans une cuve, c’est le volume.',
      ),
      p('Si vous hésitez, demandez-vous dans quelle unité la réponse doit être exprimée : elle indique le calcul à faire.'),
    ],
    workedExamples: [
      {
        statement: 'Une cuve fictive mesure 50 cm de long, 40 cm de large et 30 cm de haut. Combien de litres contient-elle ?',
        steps: [
          { do: 'Calculer le volume en centimètres cubes.', why: 'Les trois dimensions sont déjà en centimètres.', calc: '50 × 40 × 30 = 60 000 cm³' },
          { do: 'Convertir en décimètres cubes.', why: '1 dm³ = 1 000 cm³.', calc: '60 000 ÷ 1 000 = 60 dm³' },
          { do: 'Passer aux litres.', why: '1 dm³ = 1 L, par définition.', calc: '60 L' },
        ],
        conclusion: 'La cuve contient 60 litres.',
      },
    ],
    commonMistakes: [
      { mistake: 'Convertir des cm³ en dm³ en divisant par 10.', fix: 'Pour les volumes, le facteur est 1 000 entre deux rangs voisins.', tag: 'unite' },
      { mistake: 'Donner une aire en mètres au lieu de mètres carrés.', fix: 'Une surface se mesure toujours en unités carrées.', tag: 'unite' },
    ],
  },
  {
    skillId: 'M18',
    review: 'relu-par-le-modele',
    explanation: [
      lead('Relier une quantité et une durée, c’est toujours de la proportionnalité.'),
      p(
        'Une vitesse, une consommation, un débit répondent tous à la même question : combien par unité de temps ? On divise la quantité par la durée, et l’unité du résultat le dit : km/h, L/jour, mL/min.',
      ),
      vis({
        type: 'calc-steps',
        steps: [
          { calc: 'Quantité ÷ durée = quantité par unité de temps', why: 'C’est la définition d’un débit ou d’une vitesse.' },
          { calc: 'Quantité par unité de temps × durée = quantité totale', why: 'Le calcul inverse, quand on cherche un total.' },
          { calc: 'Quantité ÷ (quantité par unité de temps) = durée', why: 'Quand c’est le temps qui manque.' },
        ],
      }),
      key('Avant de calculer, ramenez les deux données à des unités compatibles. Des minutes avec des heures donnent un résultat faux.'),
      warn('120 km en 1 h 30 ne fait pas 120 ÷ 1,30. Il faut écrire 1 h 30 = 1,5 h, ce qui donne 80 km/h.'),
    ],
    alternative: [
      p('Passez systématiquement par « pour une heure » ou « pour un jour ».'),
      p(
        'Si 120 km sont parcourus en 1 h 30, alors 40 km le sont en 30 minutes (la moitié d’une demi-heure de plus ne change rien : on divise par 3). En une heure, cela fait 2 × 40 = 80 km.',
      ),
    ],
    workedExamples: [
      {
        statement: 'Un véhicule parcourt 150 km en 2 h 30. Quelle est sa vitesse moyenne ?',
        steps: [
          { do: 'Convertir la durée en heures décimales.', why: '30 minutes valent une demi-heure, soit 0,5 h.', calc: '2 h 30 = 2,5 h' },
          { do: 'Diviser la distance par la durée.', why: 'La vitesse est une distance par unité de temps.', calc: '150 ÷ 2,5 = 60' },
          { do: 'Écrire l’unité.', why: 'Des kilomètres divisés par des heures donnent des km/h.', calc: '60 km/h' },
        ],
        conclusion: 'La vitesse moyenne est de 60 km/h.',
      },
    ],
    commonMistakes: [
      { mistake: 'Diviser par 2,30 au lieu de 2,5 pour 2 h 30.', fix: 'Convertissez d’abord les minutes en fraction d’heure.', tag: 'virgule' },
      { mistake: 'Oublier l’unité composée du résultat.', fix: 'km/h, L/jour, mL/min : l’unité fait partie de la réponse.', tag: 'unite' },
    ],
  },
  {
    skillId: 'M19',
    review: 'relu-par-le-modele',
    explanation: [
      lead('Une concentration indique une quantité contenue dans un volume donné.'),
      p(
        'Lire « 20 g/L » signifie : un litre de ce mélange contient 20 grammes de produit. C’est une proportionnalité : deux litres en contiennent 40 grammes, un demi-litre en contient 10.',
      ),
      vis({
        type: 'proportion',
        topLabel: 'Volume (L)',
        bottomLabel: 'Quantité (g)',
        columns: [
          { top: '1', bottom: '20' },
          { top: '0,5', bottom: '10' },
          { top: '2,5', bottom: '50', highlight: true },
        ],
        caption: 'La quantité varie proportionnellement au volume.',
      }),
      key('Quantité = concentration × volume. Il suffit que les unités concordent : g/L avec des litres, mg/mL avec des millilitres.'),
      warn(
        'Cette compétence est un exercice de proportionnalité sur des exemples fictifs et non cliniques. Cette application ne sert jamais à préparer un soin réel.',
      ),
    ],
    alternative: [
      p('Traduisez la concentration en une phrase.'),
      p(
        '« Il y a 20 grammes dans chaque litre. » Ensuite, la question devient : combien de litres ? Multipliez par ce nombre de litres. C’est le même raisonnement qu’un prix à l’unité.',
      ),
    ],
    workedExamples: [
      {
        statement: 'Une solution fictive contient 15 g de produit par litre. Quelle quantité dans 0,4 L ?',
        steps: [
          { do: 'Traduire la concentration.', why: 'Chaque litre contient 15 g.', calc: '15 g pour 1 L' },
          { do: 'Multiplier par le volume.', why: 'La quantité est proportionnelle au volume.', calc: '15 × 0,4 = 6' },
          { do: 'Contrôler.', why: '0,4 L est moins d’un litre : la quantité doit être inférieure à 15 g. 6 g est cohérent.' },
        ],
        conclusion: '0,4 L de cette solution contiennent 6 g de produit.',
      },
    ],
    commonMistakes: [
      { mistake: 'Diviser par le volume au lieu de multiplier.', fix: 'Vérifiez le sens : plus de volume, plus de produit.', tag: 'raisonnement' },
      { mistake: 'Mélanger g/L et mg/mL sans convertir.', fix: 'Ramenez d’abord les deux données dans des unités compatibles.', tag: 'unite' },
    ],
  },
  {
    skillId: 'M20',
    review: 'relu-par-le-modele',
    explanation: [
      lead('Un débit relie un volume et une durée : combien de millilitres par heure, ou par minute.'),
      p(
        'Le calcul est toujours le même : volume divisé par durée. La seule difficulté est de convertir la durée dans l’unité attendue avant de diviser.',
      ),
      vis({
        type: 'calc-steps',
        steps: [
          { calc: '500 mL à passer en 2 h 30', why: 'Données de départ.' },
          { calc: '2 h 30 = 2,5 h', why: '30 minutes valent une demi-heure.' },
          { calc: '500 ÷ 2,5 = 200 mL/h', why: 'Le débit est un volume par heure.' },
        ],
      }),
      warn(
        'Complément pédagogique uniquement. Les énoncés sont entièrement fournis, sans aucune donnée à mémoriser. Cette application n’est pas un outil de calcul pour un soin réel, et aucune valeur vue ici ne doit être appliquée à une personne.',
      ),
    ],
    alternative: [
      p('Raisonnez par « pour une heure ».'),
      p('Si 500 mL passent en 2,5 heures, alors en 1 heure il en passe 2,5 fois moins, soit 200 mL. C’est un passage à l’unité.'),
    ],
    workedExamples: [
      {
        statement: 'Exercice fictif : 750 mL doivent s’écouler en 5 heures. Quel débit horaire ?',
        steps: [
          { do: 'Vérifier les unités.', why: 'Le volume est en mL, la durée en heures : le débit sera en mL/h.' },
          { do: 'Diviser.', why: 'Un débit est un volume par unité de temps.', calc: '750 ÷ 5 = 150' },
        ],
        conclusion: 'Le débit est de 150 mL/h.',
      },
    ],
    commonMistakes: [
      { mistake: 'Diviser par 2,30 pour 2 h 30.', fix: '2 h 30 s’écrit 2,5 h en heures décimales.', tag: 'virgule' },
      { mistake: 'Confondre mL/h et mL/min.', fix: 'Il y a un facteur 60 entre les deux.', tag: 'unite' },
    ],
  },
]

export const TEMPLATES_M17_M20: ExerciseTemplate[] = [
  {
    id: 'M17-perimetre-aire',
    skillId: 'M17',
    level: 'decouverte',
    structure: 'perimetre-ou-aire-d-un-rectangle',
    version: 1,
    review: 'teste-automatiquement',
    seconds: 60,
    generate: (rng) => {
      const L = rng.int(3, 14)
      const l = rng.int(2, L - 1)
      const askArea = rng.chance(0.5)
      const perimeter = 2 * (L + l)
      const area = L * l
      return {
        prompt: [
          p(`Une salle rectangulaire fictive mesure ${L} m de long et ${l} m de large.`),
          p(askArea ? 'Formule fournie : aire = longueur × largeur.' : 'Formule fournie : périmètre = 2 × (longueur + largeur).'),
        ],
        question: askArea ? 'Quelle est l’aire de la salle, en mètres carrés ?' : 'Quel est le périmètre de la salle, en mètres ?',
        answer: {
          kind: 'numeric',
          value: R(askArea ? area : perimeter),
          unit: askArea ? 'm²' : 'm',
          unitPolicy: 'optional',
          pitfalls: [
            {
              answer: String(askArea ? perimeter : area),
              tag: 'consigne',
              why: askArea
                ? 'Vous avez calculé le tour de la salle. L’aire mesure la surface : on multiplie la longueur par la largeur.'
                : 'Vous avez calculé la surface. Le périmètre mesure le tour : on additionne les côtés.',
            },
          ],
        },
        hints: [
          askArea ? 'L’aire mesure la surface couverte, comme de la moquette.' : 'Le périmètre mesure le tour, comme une plinthe le long des murs.',
          askArea ? `Multipliez ${L} par ${l}.` : `Additionnez les quatre côtés : ${L} + ${l} + ${L} + ${l}.`,
        ],
        alternative: [
          p('Vérifiez par l’unité attendue.'),
          p(
            askArea
              ? 'Une réponse en mètres carrés vient forcément d’une multiplication de deux longueurs.'
              : 'Une réponse en mètres vient forcément d’une addition de longueurs.',
          ),
        ],
        solution: askArea
          ? [{ text: 'Appliquer la formule de l’aire.', calc: `${L} × ${l} = ${area} m²`, why: 'Une surface est le produit de deux longueurs.' }]
          : [{ text: 'Appliquer la formule du périmètre.', calc: `2 × (${L} + ${l}) = ${perimeter} m`, why: 'Le tour additionne les quatre côtés.' }],
        conclusion: askArea ? `L’aire vaut ${area} m².` : `Le périmètre vaut ${perimeter} m.`,
        placeholder: 'Valeur',
        keyboard: 'decimal',
        suffix: askArea ? 'm²' : 'm',
      }
    },
  },
  {
    id: 'M17-conversion-aire',
    skillId: 'M17',
    level: 'entrainement',
    structure: 'conversion-d-une-aire',
    version: 1,
    review: 'teste-automatiquement',
    seconds: 65,
    generate: (rng) => {
      const value = rng.int(2, 45)
      const toSmall = rng.chance(0.5)
      const result = toSmall ? R(value * 10000) : R(value, 10000)
      return {
        prompt: [
          p(`Une surface mesure ${value} ${toSmall ? 'm\u00b2' : 'cm\u00b2'}.`),
          p('Rappel fourni : 1 m\u00b2 = 10 000 cm\u00b2. Pour les aires, le facteur entre deux rangs voisins est 100, pas 10.'),
        ],
        question: toSmall ? 'Combien cela fait-il en centim\u00e8tres carr\u00e9s ?' : 'Combien cela fait-il en m\u00e8tres carr\u00e9s ?',
        answer: {
          kind: 'numeric',
          value: result,
          unit: toSmall ? 'cm\u00b2' : 'm\u00b2',
          unitPolicy: 'optional',
          pitfalls: [
            {
              answer: toSmall ? String(value * 100) : fr(R(value, 100)),
              tag: 'unite',
              why: 'Vous avez utilis\u00e9 le facteur 100 au lieu de 10 000. Entre le m\u00e8tre et le centim\u00e8tre il y a deux rangs, donc 100 \u00d7 100 pour une aire.',
            },
          ],
        },
        hints: [
          'Une aire se mesure en unit\u00e9s carr\u00e9es : le facteur de conversion est \u00e9lev\u00e9 au carr\u00e9.',
          `1 m = 100 cm, donc 1 m\u00b2 = 100 \u00d7 100 = 10 000 cm\u00b2. ${toSmall ? 'Multipliez' : 'Divisez'} par 10 000.`,
        ],
        alternative: [
          p('Repr\u00e9sentez un carr\u00e9 de 1 m de c\u00f4t\u00e9.'),
          p('Il mesure 100 cm sur 100 cm. On peut donc y ranger 100 \u00d7 100 = 10 000 petits carr\u00e9s de 1 cm de c\u00f4t\u00e9.'),
        ],
        solution: [
          { text: 'Passer par le c\u00f4t\u00e9.', calc: '1 m = 100 cm, donc 1 m\u00b2 = 10 000 cm\u00b2', why: 'Une aire multiplie deux longueurs : le facteur est \u00e9lev\u00e9 au carr\u00e9.' },
          { text: `${toSmall ? 'Multiplier' : 'Diviser'} par 10 000.`, calc: `${value} ${toSmall ? '\u00d7' : '\u00f7'} 10 000 = ${fr(result)}`, why: 'Le sens suit la taille de l\u2019unit\u00e9 vis\u00e9e.' },
        ],
        conclusion: `${value} ${toSmall ? 'm\u00b2' : 'cm\u00b2'} = ${fr(result)} ${toSmall ? 'cm\u00b2' : 'm\u00b2'}.`,
        placeholder: 'Valeur',
        keyboard: 'decimal',
        suffix: toSmall ? 'cm\u00b2' : 'm\u00b2',
      }
    },
  },
  {
    id: 'M17-volume-litres',
    skillId: 'M17',
    level: 'epreuve',
    structure: 'volume-d-un-pave-converti-en-litres',
    version: 1,
    transfer: true,
    review: 'teste-automatiquement',
    seconds: 100,
    generate: (rng) => {
      const a = rng.pick([20, 30, 40, 50])
      const b = rng.pick([20, 30, 40, 50])
      const c = rng.pick([10, 20, 30])
      const cm3 = a * b * c
      const litres = R(cm3, 1000)
      return {
        prompt: [
          p(`Une cuve fictive en forme de pavé mesure ${a} cm × ${b} cm × ${c} cm.`),
          p('Formules fournies : volume = longueur × largeur × hauteur ; 1 dm³ = 1 000 cm³ ; 1 dm³ = 1 L.'),
        ],
        question: 'Combien de litres cette cuve peut-elle contenir ?',
        answer: {
          kind: 'numeric',
          value: litres,
          unit: 'L',
          unitPolicy: 'optional',
          pitfalls: [
            { answer: frInt(cm3), tag: 'unite', why: 'Ce résultat est en centimètres cubes. La question demande des litres : il reste à diviser par 1 000.' },
            { answer: fr(R(cm3, 10)), tag: 'unite', why: 'Pour les volumes, le facteur entre deux rangs voisins est 1 000, pas 10.' },
          ],
        },
        hints: [
          'Calculez d’abord le volume dans l’unité des dimensions données.',
          '1 000 cm³ font 1 dm³, et 1 dm³ vaut exactement 1 litre.',
        ],
        alternative: [
          p('Convertissez les dimensions avant de multiplier.'),
          p(
            `${a} cm = ${fr(R(a, 10))} dm, ${b} cm = ${fr(R(b, 10))} dm, ${c} cm = ${fr(R(c, 10))} dm. Le produit donne directement ${fr(litres)} dm³, soit ${fr(litres)} L.`,
          ),
        ],
        solution: [
          { text: 'Calculer le volume en cm³.', calc: `${a} × ${b} × ${c} = ${frInt(cm3)} cm³`, why: 'Les trois dimensions sont en centimètres.' },
          { text: 'Convertir en litres.', calc: `${frInt(cm3)} ÷ 1 000 = ${fr(litres)} L`, why: '1 000 cm³ = 1 dm³ = 1 L.' },
        ],
        conclusion: `La cuve contient ${fr(litres)} litres.`,
        placeholder: 'Valeur en litres',
        keyboard: 'decimal',
        suffix: 'L',
      }
    },
  },
  {
    id: 'M18-consommation-simple',
    skillId: 'M18',
    level: 'decouverte',
    structure: 'quantite-par-jour',
    version: 1,
    review: 'teste-automatiquement',
    seconds: 50,
    generate: (rng) => {
      const days = rng.pick([4, 5, 6, 8, 10])
      const perDay = rng.pick([3, 5, 6, 8, 12])
      const total = days * perDay
      return {
        prompt: [p(`En ${days} jours, une r\u00e9serve de ${total} litres a \u00e9t\u00e9 enti\u00e8rement utilis\u00e9e, de fa\u00e7on r\u00e9guli\u00e8re.`)],
        question: 'Quelle quantit\u00e9 a \u00e9t\u00e9 utilis\u00e9e par jour, en litres ?',
        answer: {
          kind: 'numeric',
          value: R(perDay),
          unit: 'L',
          unitPolicy: 'optional',
          pitfalls: [
            { answer: String(total * days), tag: 'raisonnement', why: 'Vous avez multipli\u00e9. La consommation d\u2019une seule journ\u00e9e est forc\u00e9ment plus petite que la r\u00e9serve totale.' },
          ],
        },
        hints: [
          'La consommation d\u2019un jour est plus petite que la r\u00e9serve totale : ce ne peut pas \u00eatre une multiplication.',
          `Divisez ${total} par ${days}.`,
        ],
        alternative: [
          p('Raisonnez par r\u00e9partition \u00e9gale.'),
          p(`Les ${total} litres se r\u00e9partissent \u00e9galement sur ${days} jours : chaque jour re\u00e7oit la m\u00eame part.`),
        ],
        solution: [
          { text: 'Diviser la quantit\u00e9 totale par la dur\u00e9e.', calc: `${total} \u00f7 ${days} = ${perDay}`, why: 'Une quantit\u00e9 par unit\u00e9 de temps s\u2019obtient par division.' },
          { text: 'V\u00e9rifier.', calc: `${perDay} \u00d7 ${days} = ${total} L`, why: 'On retombe sur la r\u00e9serve de d\u00e9part.' },
        ],
        conclusion: `La consommation est de ${perDay} litres par jour.`,
        placeholder: 'Valeur en litres',
        keyboard: 'decimal',
        suffix: 'L/jour',
      }
    },
  },
  {
    id: 'M18-vitesse-moyenne',
    skillId: 'M18',
    level: 'entrainement',
    structure: 'vitesse-moyenne-avec-duree-en-h-min',
    version: 1,
    review: 'teste-automatiquement',
    seconds: 85,
    generate: (rng) => {
      const speed = rng.pick([40, 50, 60, 70, 80])
      // Jamais un multiple de 4 : la duree comporte toujours des minutes,
      // sinon le piege « ecrire 2,30 h » donnerait la bonne reponse.
      const quarters = rng.pick([2, 3, 5, 6, 7, 9, 10])
      const hours = R(quarters, 4)
      const distance = mulR(R(speed), hours)
      const h = Math.floor(quarters / 4)
      const m = (quarters % 4) * 15
      return {
        prompt: [p(`Un trajet de ${fr(distance)} km est effectué en ${h > 0 ? `${h} h${m ? ` ${m}` : ''}` : `${m} min`}.`)],
        question: 'Quelle est la vitesse moyenne, en kilomètres par heure ?',
        answer: {
          kind: 'numeric',
          value: R(speed),
          pitfalls: [
            {
              answer: fr(divR(distance, addR(R(h), R(m, 100))), 2),
              tag: 'virgule',
              why: `Vous avez utilisé ${h},${String(m).padStart(2, '0')} h comme durée. Or ${m} minutes valent ${fr(R(m, 60), 4)} heure, pas ${fr(R(m, 100))}.`,
            },
          ],
        },
        hints: [
          'Une vitesse est une distance divisée par une durée, exprimée en heures.',
          `Convertissez d’abord la durée en heures décimales : ${m} min = ${fr(R(m, 60), 4)} h.`,
        ],
        alternative: [
          p('Passez par « pour une heure ».'),
          p(
            `Sur ${fr(hours, 4)} h, on parcourt ${fr(distance)} km. En divisant les deux par ${fr(hours, 4)}, on obtient la distance parcourue en une heure.`,
          ),
        ],
        solution: [
          { text: 'Convertir la durée en heures décimales.', calc: `${h > 0 ? `${h} h${m ? ` ${m}` : ''}` : `${m} min`} = ${fr(hours, 4)} h`, why: 'Une heure vaut 60 minutes, pas 100.' },
          { text: 'Diviser la distance par la durée.', calc: `${fr(distance)} ÷ ${fr(hours, 4)} = ${speed}`, why: 'La vitesse est une distance par unité de temps.' },
        ],
        conclusion: `La vitesse moyenne est de ${speed} km/h.`,
        placeholder: 'Exemple : 60',
        keyboard: 'decimal',
        suffix: 'km/h',
      }
    },
  },
  {
    id: 'M18-consommation',
    skillId: 'M18',
    level: 'epreuve',
    structure: 'consommation-par-jour-et-duree-d-autonomie',
    version: 1,
    transfer: true,
    review: 'teste-automatiquement',
    seconds: 95,
    generate: (rng) => {
      const perDay = dec(rng.pick([12, 15, 18, 25, 32]), 1)
      const days = rng.int(5, 14)
      const stock = mulR(perDay, R(days))
      return {
        prompt: [p(`Une réserve contient ${fr(stock)} litres de produit. La consommation est de ${fr(perDay)} litres par jour.`)],
        question: 'Pendant combien de jours la réserve permet-elle de tenir ?',
        answer: {
          kind: 'numeric',
          value: R(days),
          pitfalls: [
            { answer: fr(mulR(stock, perDay)), tag: 'raisonnement', why: 'Vous avez multiplié. Le nombre de jours s’obtient en cherchant combien de fois la consommation quotidienne tient dans la réserve : c’est une division.' },
          ],
        },
        hints: [
          'Cherchez combien de fois la consommation d’une journée tient dans la réserve.',
          `Divisez ${fr(stock)} par ${fr(perDay)}.`,
        ],
        alternative: [
          p('Avancez jour par jour.'),
          p(`Après 1 jour il reste ${fr(mulR(perDay, R(days - 1)))} L, après 2 jours ${fr(mulR(perDay, R(Math.max(0, days - 2))))} L, et ainsi de suite jusqu’à épuisement.`),
        ],
        solution: [
          { text: 'Diviser la réserve par la consommation quotidienne.', calc: `${fr(stock)} ÷ ${fr(perDay)} = ${days}`, why: 'On cherche le nombre de journées contenues dans la réserve.' },
          { text: 'Vérifier.', calc: `${days} × ${fr(perDay)} = ${fr(stock)} L`, why: 'On retombe sur la réserve de départ.' },
        ],
        conclusion: `La réserve couvre ${days} jours.`,
        placeholder: 'Nombre de jours',
        keyboard: 'decimal',
      }
    },
  },
  {
    id: 'M19-lire-concentration',
    skillId: 'M19',
    level: 'decouverte',
    structure: 'lire-une-concentration',
    version: 1,
    review: 'teste-automatiquement',
    seconds: 45,
    generate: (rng) => {
      const c = rng.pick([5, 8, 10, 12, 20, 25])
      const litres = rng.pick([2, 3, 4, 5])
      return {
        prompt: [p(`Une solution de nettoyage fictive est indiqu\u00e9e \u00e0 ${c} g/L.`)],
        question: `Quelle quantit\u00e9 de produit contiennent ${litres} litres de cette solution, en grammes ?`,
        answer: {
          kind: 'numeric',
          value: R(c * litres),
          unit: 'g',
          unitPolicy: 'optional',
          pitfalls: [
            { answer: String(c), tag: 'consigne', why: `${c} g correspond \u00e0 un seul litre. La question porte sur ${litres} litres.` },
          ],
        },
        hints: [
          `\u00ab ${c} g/L \u00bb se lit : chaque litre contient ${c} grammes.`,
          `Multipliez ${c} par le nombre de litres, c\u2019est-\u00e0-dire ${litres}.`,
        ],
        alternative: [
          p('Comptez litre par litre.'),
          p(`1 L : ${c} g. 2 L : ${c * 2} g. On continue jusqu\u2019\u00e0 ${litres} litres.`),
        ],
        solution: [
          { text: 'Traduire la concentration.', calc: `${c} g pour 1 L`, why: 'Une concentration est une quantit\u00e9 par unit\u00e9 de volume.' },
          { text: 'Multiplier par le volume.', calc: `${c} \u00d7 ${litres} = ${c * litres} g`, why: 'La quantit\u00e9 est proportionnelle au volume.' },
        ],
        conclusion: `${litres} L contiennent ${c * litres} g de produit.`,
        placeholder: 'Valeur en grammes',
        keyboard: 'decimal',
        suffix: 'g',
      }
    },
  },
  {
    id: 'M19-concentration',
    skillId: 'M19',
    level: 'entrainement',
    structure: 'quantite-contenue-dans-un-volume',
    version: 1,
    review: 'teste-automatiquement',
    seconds: 80,
    generate: (rng) => {
      const concentration = rng.pick([5, 10, 15, 20, 25, 40]) // g/L
      const volume = dec(rng.pick([25, 40, 50, 75, 125, 200, 250]), 2) // L
      const quantity = mulR(R(concentration), volume)
      return {
        prompt: [
          p(
            `Une solution de nettoyage fictive contient ${concentration} g de produit par litre. On en prépare ${fr(volume)} L.`,
          ),
        ],
        question: 'Quelle quantité de produit contient cette préparation, en grammes ?',
        answer: {
          kind: 'numeric',
          value: quantity,
          unit: 'g',
          unitPolicy: 'optional',
          pitfalls: [
            { answer: fr(divR(R(concentration), volume), 3), tag: 'raisonnement', why: 'Vous avez divisé. Plus le volume est grand, plus la quantité de produit est grande : il faut multiplier.' },
          ],
        },
        hints: [
          `« ${concentration} g par litre » veut dire que chaque litre contient ${concentration} g.`,
          `Multipliez ${concentration} par le nombre de litres, c’est-à-dire ${fr(volume)}.`,
        ],
        alternative: [
          p('Dressez un tableau de proportionnalité.'),
          p(`Ligne du haut : le volume en litres. Ligne du bas : la quantité en grammes. 1 L ↔ ${concentration} g, donc ${fr(volume)} L ↔ ${fr(quantity)} g.`),
        ],
        solution: [
          { text: 'Traduire la concentration.', calc: `${concentration} g pour 1 L`, why: 'Une concentration est une quantité par unité de volume.' },
          { text: 'Multiplier par le volume.', calc: `${concentration} × ${fr(volume)} = ${fr(quantity)} g`, why: 'La quantité est proportionnelle au volume.' },
          { text: 'Contrôler.', why: `${fr(volume)} L est ${volume.n < volume.d ? 'moins' : 'plus'} qu’un litre : la quantité doit être ${volume.n < volume.d ? 'inférieure' : 'supérieure'} à ${concentration} g.` },
        ],
        conclusion: `La préparation contient ${fr(quantity)} g de produit.`,
        placeholder: 'Valeur en grammes',
        keyboard: 'decimal',
        suffix: 'g',
      }
    },
  },
  {
    id: 'M19-mg-par-ml',
    skillId: 'M19',
    level: 'epreuve',
    structure: 'concentration-en-mg-par-ml',
    version: 1,
    transfer: true,
    review: 'teste-automatiquement',
    seconds: 100,
    generate: (rng) => {
      const gPerL = rng.pick([2, 4, 5, 8, 10, 20])
      const mgPerMl = gPerL // 1 g/L = 1 mg/mL
      return {
        prompt: [
          p(`Une solution fictive est indiquée à ${gPerL} g/L.`),
          p('Rappels fournis : 1 g = 1 000 mg ; 1 L = 1 000 mL.'),
        ],
        question: 'Quelle est cette concentration exprimée en milligrammes par millilitre ?',
        answer: {
          kind: 'numeric',
          value: R(mgPerMl),
          pitfalls: [
            { answer: String(gPerL * 1000), tag: 'unite', why: 'Vous avez converti les grammes en milligrammes mais pas les litres en millilitres. Les deux conversions se compensent exactement.' },
            { answer: fr(R(gPerL, 1000)), tag: 'unite', why: 'Vous avez converti les litres mais pas les grammes. Les deux facteurs 1 000 s’annulent.' },
          ],
        },
        hints: [
          'Il y a deux conversions à faire : une sur la quantité, une sur le volume.',
          'Multipliez la quantité par 1 000 et divisez le volume par 1 000 : regardez ce qui se passe.',
        ],
        alternative: [
          p('Prenez un exemple chiffré.'),
          p(
            `${gPerL} g dans 1 L, cela fait ${frInt(gPerL * 1000)} mg dans 1 000 mL. Pour 1 mL, on divise par 1 000 : il reste ${mgPerMl} mg.`,
          ),
        ],
        solution: [
          { text: 'Convertir la quantité.', calc: `${gPerL} g = ${frInt(gPerL * 1000)} mg`, why: '1 g vaut 1 000 mg.' },
          { text: 'Convertir le volume.', calc: `1 L = 1 000 mL`, why: '1 L vaut 1 000 mL.' },
          { text: 'Simplifier.', calc: `${frInt(gPerL * 1000)} mg / 1 000 mL = ${mgPerMl} mg/mL`, why: 'Les deux facteurs 1 000 se compensent : g/L et mg/mL donnent le même nombre.' },
        ],
        conclusion: `${gPerL} g/L équivaut à ${mgPerMl} mg/mL.`,
        placeholder: 'Valeur',
        keyboard: 'decimal',
        suffix: 'mg/mL',
      }
    },
  },
  {
    id: 'M20-debit-simple',
    skillId: 'M20',
    level: 'decouverte',
    structure: 'debit-avec-duree-entiere',
    version: 1,
    review: 'teste-automatiquement',
    seconds: 55,
    generate: (rng) => {
      const hours = rng.pick([2, 3, 4, 5, 6])
      const rate = rng.pick([50, 75, 100, 125, 150])
      const volume = hours * rate
      return {
        prompt: [
          p(`Exercice p\u00e9dagogique enti\u00e8rement fictif : ${volume} mL doivent s\u2019\u00e9couler r\u00e9guli\u00e8rement en ${hours} heures.`),
          p('Aucune donn\u00e9e n\u2019est \u00e0 m\u00e9moriser et ce calcul ne doit jamais servir \u00e0 pr\u00e9parer un soin r\u00e9el.'),
        ],
        question: 'Quel est le d\u00e9bit, en millilitres par heure ?',
        answer: {
          kind: 'numeric',
          value: R(rate),
          pitfalls: [
            { answer: String(volume * hours), tag: 'raisonnement', why: 'Vous avez multipli\u00e9. Le volume \u00e9coul\u00e9 en une heure est plus petit que le volume total.' },
          ],
        },
        hints: [
          'Un d\u00e9bit horaire est un volume divis\u00e9 par un nombre d\u2019heures.',
          `Divisez ${volume} par ${hours}.`,
        ],
        alternative: [
          p('Raisonnez par \u00ab pour une heure \u00bb.'),
          p(`En ${hours} heures il passe ${volume} mL. En une heure, il en passe ${hours} fois moins.`),
        ],
        solution: [
          { text: 'Diviser le volume par la dur\u00e9e.', calc: `${volume} \u00f7 ${hours} = ${rate}`, why: 'Un d\u00e9bit est un volume par unit\u00e9 de temps.' },
          { text: 'V\u00e9rifier.', calc: `${rate} \u00d7 ${hours} = ${volume} mL`, why: 'On retrouve le volume total.' },
        ],
        conclusion: `Le d\u00e9bit est de ${rate} mL/h.`,
        placeholder: 'Valeur',
        keyboard: 'decimal',
        suffix: 'mL/h',
      }
    },
  },
  {
    id: 'M20-debit-horaire',
    skillId: 'M20',
    level: 'entrainement',
    structure: 'debit-horaire-a-partir-d-un-volume-et-d-une-duree',
    version: 1,
    review: 'teste-automatiquement',
    seconds: 85,
    generate: (rng) => {
      const rate = rng.pick([60, 80, 100, 120, 160, 200, 240])
      // Duree jamais entiere en heures, pour la meme raison qu'en M18.
      const quarters = rng.pick([2, 3, 5, 6, 7, 9, 10])
      const hours = R(quarters, 4)
      const volume = mulR(R(rate), hours)
      const h = Math.floor(quarters / 4)
      const m = (quarters % 4) * 15
      const durationText = h > 0 ? `${h} h${m ? ` ${m}` : ''}` : `${m} min`
      return {
        prompt: [
          p(`Exercice pédagogique, entièrement fictif : ${fr(volume)} mL doivent s’écouler régulièrement en ${durationText}.`),
          p('Aucune donnée n’est à mémoriser et ce calcul ne doit jamais servir à préparer un soin réel.'),
        ],
        question: 'Quel est le débit, en millilitres par heure ?',
        answer: {
          kind: 'numeric',
          value: R(rate),
          pitfalls: [
            {
              answer: fr(divR(volume, addR(R(h), R(m, 100))), 2),
              tag: 'virgule',
              why: `Vous avez utilisé ${h},${String(m).padStart(2, '0')} h. Or ${m} minutes valent ${fr(R(m, 60), 4)} heure.`,
            },
          ],
        },
        hints: [
          'Un débit horaire est un volume divisé par une durée exprimée en heures.',
          `Convertissez d’abord ${durationText} en heures décimales, puis divisez le volume par ce nombre.`,
        ],
        alternative: [
          p('Raisonnez par « pour une heure ».'),
          p(`En ${fr(hours, 4)} h il passe ${fr(volume)} mL. En une heure, il en passe ${fr(hours, 4)} fois moins.`),
        ],
        solution: [
          { text: 'Convertir la durée.', calc: `${durationText} = ${fr(hours, 4)} h`, why: 'Les minutes deviennent une fraction d’heure.' },
          { text: 'Diviser le volume par la durée.', calc: `${fr(volume)} ÷ ${fr(hours, 4)} = ${rate}`, why: 'Un débit est un volume par unité de temps.' },
        ],
        conclusion: `Le débit est de ${rate} mL/h.`,
        placeholder: 'Valeur',
        keyboard: 'decimal',
        suffix: 'mL/h',
      }
    },
  },
  {
    id: 'M20-debit-minute',
    skillId: 'M20',
    level: 'epreuve',
    structure: 'conversion-d-un-debit-horaire-en-debit-par-minute',
    version: 1,
    transfer: true,
    review: 'teste-automatiquement',
    seconds: 90,
    generate: (rng) => {
      const perHour = rng.pick([60, 120, 180, 240, 300, 360])
      const perMinute = R(perHour, 60)
      return {
        prompt: [
          p(`Exercice pédagogique fictif : un débit est réglé à ${perHour} mL/h.`),
          p('Rappel fourni : 1 heure = 60 minutes.'),
        ],
        question: 'Combien de millilitres s’écoulent en une minute ?',
        answer: {
          kind: 'numeric',
          value: perMinute,
          pitfalls: [
            { answer: String(perHour * 60), tag: 'raisonnement', why: 'Vous avez multiplié par 60. En une minute, il passe forcément moins de liquide qu’en une heure.' },
          ],
        },
        hints: [
          'Une minute est plus courte qu’une heure : le volume écoulé sera plus petit.',
          'Divisez le débit horaire par 60.',
        ],
        alternative: [
          p('Vérifiez par l’opération inverse.'),
          p(`Si ${fr(perMinute)} mL passent chaque minute, alors en 60 minutes il passe ${fr(perMinute)} × 60 = ${perHour} mL. On retombe bien sur le débit horaire.`),
        ],
        solution: [
          { text: 'Diviser par 60.', calc: `${perHour} ÷ 60 = ${fr(perMinute)}`, why: 'Une heure contient 60 minutes.' },
          { text: 'Contrôler le sens.', why: 'Le débit par minute doit être plus petit que le débit par heure.' },
        ],
        conclusion: `Le débit est de ${fr(perMinute)} mL par minute.`,
        placeholder: 'Valeur',
        keyboard: 'decimal',
        suffix: 'mL/min',
      }
    },
  },
]

