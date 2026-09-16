/**
 * Examens blancs écrits.
 *
 * Format reproduit : rédaction / questions sanitaires et sociales, 30 minutes
 * sur 10 ; calculs simples, 30 minutes sur 10. L'oral, noté sur 20, se prépare
 * séparément. Les seuils appliqués sont ceux de l'article 12 de l'arrêté du
 * 20 février 2026 tel que cité par le cahier des charges : moins de 8/20 à
 * l'écrit ou à l'oral est éliminatoire, et le total doit atteindre 20/40.
 *
 * Les sujets sont originaux. Les exercices de calculs sont produits par les
 * gabarits de l'application avec une graine fixée : l'énoncé et son corrigé
 * sont donc strictement reproductibles après un rechargement.
 *
 * Les compléments M17 à M20 sont volontairement absents : l'article 12 ne crée
 * pas de sous-épreuve de géométrie ni de calcul de débit.
 */

import type { Block, Criterion, ExamPaper } from '../types'
import { p } from '../blocks'

const CRIT_COURT: Criterion[] = [
  {
    id: 'consigne',
    label: 'Respect de la consigne',
    points: 1,
    evidence: ['Le nombre d’éléments demandés est présent', 'La réponse porte bien sur la question posée'],
  },
  {
    id: 'exactitude',
    label: 'Exactitude des notions',
    points: 1,
    evidence: ['Vocabulaire employé correctement', 'Aucune affirmation inventée'],
  },
  {
    id: 'langue',
    label: 'Langue',
    points: 1,
    evidence: ['Phrases complètes', 'Accords courants respectés'],
  },
]

const CRIT_LONG: Criterion[] = [
  {
    id: 'consigne',
    label: 'Respect de la consigne',
    points: 1,
    evidence: ['Chaque verbe de la consigne a reçu une réponse', 'Longueur approximativement respectée'],
  },
  {
    id: 'analyse',
    label: 'Analyse et argumentation',
    points: 3,
    evidence: [
      'Un mécanisme est expliqué, pas seulement constaté',
      'Un exemple concret soutient le propos',
      'Une limite ou une nuance apparaît',
    ],
  },
  {
    id: 'structure',
    label: 'Structure',
    points: 1,
    evidence: ['Plan lisible', 'Phrase finale qui répond à la question'],
  },
  {
    id: 'langue',
    label: 'Langue et posture',
    points: 2,
    evidence: ['Phrases claires', 'Aucun jugement porté sur une personne', 'Orthographe des accords courants'],
  },
]

type MathPick = [templateId: string, seed: number, points: number]

type PaperSpec = {
  n: number
  title: string
  support?: string[]
  shortQ: { instruction: string; reference: string[] }
  longQ: { instruction: string; minWords: number; reference: string[] }
  maths: MathPick[]
}

/** Barème de calculs : huit questions, 10 points. */
const POINTS: number[] = [1, 1, 1, 1, 1, 1, 2, 2]

function paper(spec: PaperSpec): ExamPaper {
  const blocks = (xs?: string[]): Block[] | undefined => xs?.map((t) => p(t))
  return {
    id: `EB${String(spec.n).padStart(2, '0')}`,
    number: spec.n,
    title: spec.title,
    origin: 'Sujet original rédigé pour cette application. Aucune reprise d’annales, reconstituées ou non.',
    review: 'relu-par-le-modele',
    writing: {
      support: blocks(spec.support),
      questions: [
        {
          id: `EB${String(spec.n).padStart(2, '0')}-q1`,
          instruction: spec.shortQ.instruction,
          points: 3,
          minWords: 40,
          criteria: CRIT_COURT,
          reference: spec.shortQ.reference.map((t) => p(t)),
        },
        {
          id: `EB${String(spec.n).padStart(2, '0')}-q2`,
          instruction: spec.longQ.instruction,
          points: 7,
          minWords: spec.longQ.minWords,
          criteria: CRIT_LONG,
          reference: spec.longQ.reference.map((t) => p(t)),
        },
      ],
    },
    maths: spec.maths.map(([templateId, seed, points], i) => ({
      id: `EB${String(spec.n).padStart(2, '0')}-m${i + 1}`,
      templateId,
      seed,
      points,
    })),
  }
}

const m = (ids: string[], seedBase: number): MathPick[] =>
  ids.map((id, i) => [id, seedBase + i * 97, POINTS[i] ?? 1])

export const EXAM_PAPERS: ExamPaper[] = [
  paper({
    n: 1,
    title: 'Examen blanc 1 — Proches aidants et calculs de base',
    support: [
      'Une structure fictive constate que plusieurs proches aidants ne demandent aucune aide, alors que des dispositifs existent sur le territoire. Interrogés, ils déclarent ne pas savoir à qui s’adresser et ne pas vouloir « déranger ».',
    ],
    shortQ: {
      instruction: 'Définissez en deux ou trois phrases ce qu’est un proche aidant, puis citez deux formes d’aide qu’il apporte.',
      reference: [
        'Un proche aidant est une personne qui vient en aide, de manière régulière et non professionnelle, à un proche en perte d’autonomie ou en situation de handicap. Il peut s’agir d’un conjoint, d’un enfant, d’un parent, d’un voisin ou d’un ami.',
        'Deux formes d’aide parmi d’autres : l’aide aux gestes de la vie quotidienne (toilette, repas, déplacements) et l’accompagnement des démarches administratives ou la coordination des intervenants.',
      ],
    },
    longQ: {
      instruction:
        'Expliquez pourquoi des personnes ne demandent pas une aide à laquelle elles ont droit, puis proposez une action pour y remédier.',
      minWords: 150,
      reference: [
        'Le non-recours désigne l’écart entre les droits ouverts et les droits effectivement demandés. Il tient rarement à un refus : il s’explique d’abord par la méconnaissance des dispositifs, ensuite par la complexité des démarches, enfin par des représentations personnelles — le sentiment qu’il serait indigne de demander de l’aide pour s’occuper des siens, ou la crainte du regard porté sur la situation.',
        'Ces trois causes se renforcent. Une personne qui ignore l’existence d’une aide ne la demande pas ; si elle en entend parler et découvre un dossier complexe, elle renonce ; et si elle pense par ailleurs que demander serait un aveu de faiblesse, elle ne reviendra pas sur cette décision.',
        'Une action adaptée consisterait à organiser un repérage systématique : poser à chaque personne accompagnée et à son entourage, lors de l’admission, la question de l’existence d’un aidant, puis remettre une information personnalisée plutôt qu’une affiche collective. La condition de réussite est double : du temps professionnel dégagé pour cette question, et des dispositifs réellement disponibles sur le territoire. Informer sur une aide inaccessible aggraverait le découragement.',
      ],
    },
    maths: m(
      [
        'M01-comparer',
        'M02-addition-decimale',
        'M03-total-repete',
        'M04-arrondi-superieur',
        'M10-masse-simple',
        'M11-litres-ml',
        'M12-minuit',
        'M15-achat-reste',
      ],
      1001,
    ),
  }),
  paper({
    n: 2,
    title: 'Examen blanc 2 — Accès aux soins et proportionnalité',
    support: [
      'Dans un territoire fictif, une structure constate que des rendez-vous ne sont pas honorés. Les personnes concernées disposent le plus souvent de droits ouverts. Les entretiens font apparaître trois éléments : des créneaux situés pendant les heures de travail, un trajet nécessitant deux changements, et des courriers jugés incompréhensibles.',
    ],
    shortQ: {
      instruction: 'Relevez dans le texte deux obstacles à l’accès aux soins, puis indiquez pour chacun qui il concerne en priorité.',
      reference: [
        'Premier obstacle : les créneaux proposés se situent pendant les heures de travail. Il concerne en priorité les personnes en emploi, notamment celles qui ne peuvent pas s’absenter sans perte de revenu.',
        'Second obstacle : le trajet nécessite deux changements de transport. Il concerne en priorité les personnes à mobilité réduite, celles qui n’ont pas de véhicule et celles qui vivent loin de la structure.',
      ],
    },
    longQ: {
      instruction:
        'Expliquez pourquoi lever un seul obstacle ne suffit généralement pas à ramener une personne vers le soin. Donnez un exemple.',
      minWords: 150,
      reference: [
        'Une démarche de soin suppose que plusieurs conditions soient réunies au même moment : disposer de droits ouverts, pouvoir se libérer à l’horaire proposé, pouvoir se déplacer, comprendre ce qui est demandé et pouvoir avancer les frais le cas échéant.',
        'Il suffit qu’une seule condition manque pour que la démarche n’aboutisse pas. C’est pourquoi une réponse partielle laisse la situation inchangée, alors même qu’elle a demandé du travail et des moyens.',
        'Concrètement, proposer un créneau en début de matinée à une personne qui ne peut pas effectuer le trajet ne change rien : elle ne se présentera pas davantage. De même, simplifier un courrier sans modifier l’horaire laisse intacte l’impossibilité de s’absenter.',
        'Il en découle une conséquence pratique : le repérage doit porter sur l’ensemble des freins, ce qui suppose de les demander explicitement lors de la prise de rendez-vous, plutôt que de supposer lequel est déterminant.',
      ],
    },
    maths: m(
      [
        'M08-passage-unite',
        'M09-pourcentage-de',
        'M05-priorites',
        'M06-fraction-de-quantite',
        'M10-longueur',
        'M12-decimal-vers-hm',
        'M13-moyenne',
        'M15-consommation-conditionnement',
      ],
      2002,
    ),
  }),
  paper({
    n: 3,
    title: 'Examen blanc 3 — Vieillissement et conversions',
    shortQ: {
      instruction: 'Expliquez en deux ou trois phrases la différence entre autonomie et indépendance.',
      reference: [
        'L’autonomie est la capacité à décider pour soi-même et à organiser sa vie. L’indépendance est la capacité à réaliser seul les actes de la vie quotidienne.',
        'Les deux varient séparément : une personne peut avoir besoin d’aide pour se lever, donc être dépendante pour ce geste, tout en décidant pleinement de son organisation, donc en restant autonome.',
      ],
    },
    longQ: {
      instruction:
        'Expliquez pourquoi attribuer une difficulté à l’âge peut être un obstacle à la prise en charge. Illustrez par un exemple et proposez une conduite.',
      minWords: 150,
      reference: [
        'Attribuer une difficulté à l’âge — « c’est normal à son âge » — clôt la réflexion. Une fois la cause réputée connue et inévitable, plus personne ne cherche, et une difficulté accessible à une action reste sans réponse.',
        'Dans une situation fictive, une personne de 84 ans sort de moins en moins. L’entourage y voit un effet de l’âge. Une évaluation montre en réalité une baisse de vision non corrigée et une peur de tomber consécutive à une chute sans gravité. Après correction visuelle et accompagnement à la marche, les sorties reprennent.',
        'La conduite attendue consiste à traiter tout changement comme un signal à explorer, et non comme une évolution attendue : décrire précisément ce qui a changé, depuis quand, et transmettre. Rechercher une cause n’empêche pas de conclure qu’il n’y en a pas de traitable ; l’inverse n’est pas vrai.',
      ],
    },
    maths: m(
      [
        'M10-masse-simple',
        'M11-somme-volumes',
        'M12-hm-vers-decimal',
        'M01-dixiemes',
        'M03-par-dix',
        'M04-quotient-reste',
        'M09-trouver-taux',
        'M15-reste-concret',
      ],
      3003,
    ),
  }),
  paper({
    n: 4,
    title: 'Examen blanc 4 — Droits des personnes et calcul de durées',
    shortQ: {
      instruction: 'Citez trois conditions d’un consentement libre et éclairé.',
      reference: [
        'Une information compréhensible, donnée dans un langage adapté à la personne.',
        'Un temps de réflexion suffisant, sans pression ni insistance répétée.',
        'La possibilité réelle de refuser, sans conséquence sur la qualité de la prise en charge.',
      ],
    },
    longQ: {
      instruction:
        'Une personne refuse un soin. Expliquez la conduite professionnelle attendue et justifiez chaque étape.',
      minWords: 160,
      reference: [
        'Le refus de soin est l’exercice d’un droit. Un accord obtenu après une insistance répétée n’est pas un consentement, puisque la condition de liberté n’est plus remplie.',
        'La première étape consiste à chercher à comprendre le refus sans l’interpréter comme une opposition personnelle : une douleur, une fatigue, un sentiment de pudeur ou un moment mal choisi l’expliquent souvent. Comprendre permet de lever un obstacle réel plutôt que de forcer.',
        'La deuxième étape consiste à proposer autrement : différer le soin, modifier la modalité, expliquer à quoi il sert. Cela maintient l’accompagnement sans contrainte.',
        'La troisième étape consiste à transmettre à l’équipe, par écrit, en décrivant les faits et ce qui a été proposé. La transmission permet d’adapter la suite et protège la personne comme le professionnel.',
        'Deux écueils symétriques sont à éviter : insister jusqu’à obtenir un accord, ce qui porterait atteinte au consentement ; et prendre acte du refus sans rien reproposer, ce qui reviendrait à abandonner l’accompagnement.',
      ],
    },
    maths: m(
      [
        'M12-duree-simple',
        'M12-somme-durees',
        'M02-soustraction-emprunt',
        'M05-parentheses',
        'M08-tableau-manquant',
        'M10-comparer-masses',
        'M13-lire-tableau',
        'M14-relation-lineaire',
      ],
      4004,
    ),
  }),
  paper({
    n: 5,
    title: 'Examen blanc 5 — Prévention et pourcentages',
    shortQ: {
      instruction: 'Distinguez prévention primaire, secondaire et tertiaire, en donnant un exemple pour chacune.',
      reference: [
        'Prévention primaire : agir avant l’apparition du problème. Exemple : aménager un logement pour éviter les chutes.',
        'Prévention secondaire : repérer précocement un problème déjà présent mais non manifeste. Exemple : un dépistage.',
        'Prévention tertiaire : limiter les conséquences et les récidives, maintenir l’autonomie. Exemple : un programme de rééducation après un accident de santé.',
      ],
    },
    longQ: {
      instruction:
        'Expliquez pourquoi une action de prévention peut manquer les personnes qu’elle vise, et proposez une façon d’y remédier.',
      minWords: 150,
      reference: [
        'Une action de prévention ne produit d’effet que si elle atteint les personnes concernées. Or le canal choisi opère un tri : une campagne diffusée uniquement en ligne n’atteint pas les personnes sans équipement, sans connexion ou peu à l’aise avec l’écrit ; une affiche en français administratif n’atteint pas celles qui lisent difficilement.',
        'Le résultat est paradoxal : l’action bénéficie d’abord aux publics déjà les mieux informés et les mieux équipés, et l’écart entre les groupes se creuse au lieu de se réduire.',
        'Pour y remédier, il faut choisir le canal en fonction du public visé plutôt que de la facilité de diffusion : information remise en main propre, relais par les professionnels déjà en contact avec les personnes, langage simplifié, et vérification que le message a été compris. Cela suppose d’identifier le public au préalable, ce qui constitue la principale difficulté de mise en œuvre.',
      ],
    },
    maths: m(
      [
        'M09-pourcentage-de',
        'M09-trouver-total',
        'M09-hausse-baisse',
        'M06-fraction-decimal',
        'M03-decimale',
        'M11-nombre-de-contenants',
        'M13-proportion-tableau',
        'M15-achat-reste',
      ],
      5005,
    ),
  }),
  paper({
    n: 6,
    title: 'Examen blanc 6 — Sécurité des soins et vérification des résultats',
    shortQ: {
      instruction: 'Qu’appelle-t-on un presque-accident, et pourquoi son signalement est-il utile ?',
      reference: [
        'Un presque-accident est une erreur rattrapée avant qu’elle n’atteigne la personne.',
        'Son signalement est utile parce qu’il révèle les mêmes causes qu’un accident, sans qu’aucune conséquence ne soit survenue. Il permet donc de corriger l’organisation avant qu’un événement grave ne se produise.',
      ],
    },
    longQ: {
      instruction:
        'Expliquez pourquoi une organisation qui sanctionne les erreurs devient moins sûre. Nuancez votre propos.',
      minWords: 160,
      reference: [
        'Une organisation qui sanctionne les erreurs fait disparaître les signalements, sans faire disparaître les erreurs. L’information cesse de remonter, l’analyse devient impossible, et les causes restent en place.',
        'Le risque devient alors invisible, ce qui est plus dangereux qu’un risque connu : l’organisation se croit sûre parce qu’elle ne déclare plus rien. Les structures qui déclarent beaucoup ne sont pas les moins sûres, ce sont souvent les plus lucides.',
        'Dans une situation fictive, un soin non réalisé est attribué à un oubli individuel. L’analyse collective montre que l’information avait été donnée oralement pendant un pic d’activité et que la fiche de liaison n’était pas accessible depuis le poste. Un temps de transmission protégé et une fiche au point d’usage suppriment la cause.',
        'Cela ne signifie pas qu’aucune responsabilité individuelle n’existe. Un manquement délibéré aux règles ou la dissimulation d’un événement relèvent d’un autre registre. La démarche de sécurité porte sur les erreurs, qui sont involontaires par définition et constituent la très grande majorité des cas.',
      ],
    },
    maths: m(
      [
        'M16-reponse-impossible',
        'M16-controle-unite',
        'M16-etape-fautive-conversion',
        'M02-etape-fautive',
        'M05-erreur-priorite',
        'M10-unite-plausible',
        'M12-heure-arrivee',
        'M14-partage-inegal',
      ],
      6006,
    ),
  }),
  paper({
    n: 7,
    title: 'Examen blanc 7 — Handicap et lecture de données',
    shortQ: {
      instruction: 'Expliquez en deux ou trois phrases ce qu’on entend par « situation de handicap ».',
      reference: [
        'Le handicap résulte de la rencontre entre une altération durable d’une ou plusieurs fonctions et un environnement non adapté.',
        'La même altération produit des conséquences très différentes selon l’environnement : une personne en fauteuil n’est pas empêchée par son fauteuil, mais par l’absence de rampe ou d’ascenseur.',
      ],
    },
    longQ: {
      instruction:
        'Expliquez en quoi rendre un service accessible profite à l’ensemble du public. Donnez un exemple et une limite.',
      minWords: 150,
      reference: [
        'Rendre un service accessible profite à tout le public, parce que les obstacles levés ne gênaient pas uniquement les personnes en situation de handicap : un texte complexe, une signalétique confuse ou un guichet mal placé ralentissent tous les usagers, et n’excluent que les plus exposés.',
        'Dans une structure fictive, la réécriture d’un formulaire en langage simplifié, avec une consigne par ligne, augmente le nombre de dossiers correctement remplis. En bénéficient directement les personnes ayant des difficultés de lecture, mais aussi celles qui maîtrisent mal le français, celles qui sont fatiguées et celles qui sont pressées.',
        'L’accessibilité ne règle cependant pas tout. Elle ne remplace ni l’accompagnement humain lorsque la démarche est complexe, ni les moyens de compensation individuels prévus pour des besoins spécifiques. Elle abaisse le seuil d’entrée sans supprimer les besoins particuliers.',
      ],
    },
    maths: m(
      [
        'M13-lire-tableau',
        'M13-total-tableau',
        'M13-graphique',
        'M08-comparer-offres',
        'M01-lecture-releve',
        'M04-prix-unitaire',
        'M09-trouver-taux',
        'M12-somme-durees',
      ],
      7007,
    ),
  }),
  paper({
    n: 8,
    title: 'Examen blanc 8 — Santé mentale et fractions',
    shortQ: {
      instruction: 'Quelle attitude adopter face à une personne qui exprime une souffrance psychique ? Citez trois éléments.',
      reference: [
        'Écouter sans interpréter ni minimiser ce qui est dit.',
        'Reformuler pour vérifier ce qui a été compris, en s’en tenant aux faits rapportés.',
        'Transmettre sans délai à l’infirmière ou au professionnel compétent, en décrivant précisément les propos et les observations.',
      ],
    },
    longQ: {
      instruction:
        'Expliquez comment la stigmatisation des troubles psychiques peut retarder l’accès aux soins. Proposez une action.',
      minWords: 150,
      reference: [
        'La stigmatisation associe aux troubles psychiques des représentations négatives — dangerosité, faiblesse, incapacité — qui n’ont pas de fondement général. Ces représentations conduisent la personne concernée à craindre d’être étiquetée, donc à différer sa demande d’aide.',
        'Le retard a des conséquences propres : la situation s’aggrave, les répercussions professionnelles et sociales s’installent, et la prise en charge devient plus longue qu’elle ne l’aurait été au début.',
        'Dans une situation fictive, une personne repousse une consultation pendant plusieurs mois par crainte que son entourage professionnel l’apprenne. Lorsqu’elle consulte enfin, l’arrêt de travail est plus long qu’il ne l’aurait été.',
        'Une action possible consiste à intégrer la santé mentale aux temps d’information ordinaires, au même titre que la santé physique, plutôt que d’en faire un sujet à part. Parler de sommeil, de charge mentale et de fatigue dans un cadre banal abaisse le seuil à franchir pour demander de l’aide. Cela suppose que les professionnels disposent d’un relais identifié vers qui orienter.',
      ],
    },
    maths: m(
      [
        'M06-part-du-total',
        'M07-meme-denominateur',
        'M07-denominateur-commun',
        'M07-fraction-fois-nombre',
        'M06-comparer-fractions',
        'M05-arrondi',
        'M10-somme-unites',
        'M15-donnees-inutiles',
      ],
      8008,
    ),
  }),
  paper({
    n: 9,
    title: 'Examen blanc 9 — Numérique en santé et problèmes',
    shortQ: {
      instruction: 'Qu’appelle-t-on l’illectronisme, et pourquoi ne concerne-t-il pas que les personnes âgées ?',
      reference: [
        'L’illectronisme désigne la difficulté à utiliser les outils numériques usuels.',
        'Il ne concerne pas que les personnes âgées parce qu’il dépend aussi de l’équipement disponible, de la qualité de la connexion, de la maîtrise de la langue écrite et de l’habitude d’usage. Une personne jeune sans équipement ou en difficulté avec l’écrit peut être tout autant concernée.',
      ],
    },
    longQ: {
      instruction:
        'Expliquez pourquoi la dématérialisation d’une démarche peut réduire l’accès aux droits, et proposez une mesure d’accompagnement.',
      minWords: 150,
      reference: [
        'La dématérialisation déplace la charge vers l’usager : il lui faut un équipement, une connexion, une adresse électronique, une maîtrise suffisante de l’écrit et la capacité de suivre une procédure sans interlocuteur. Chacune de ces conditions écarte une partie du public.',
        'Une procédure qui existe mais reste inaccessible équivaut, pour la personne concernée, à une procédure inexistante. C’est pourquoi une réforme qui améliore les délais moyens peut en même temps exclure une fraction du public.',
        'Dans une structure fictive, le remplacement de l’accueil téléphonique par une prise de rendez-vous exclusivement en ligne s’accompagne d’une baisse des premiers rendez-vous chez les personnes âgées et chez celles qui lisent difficilement le français.',
        'Une mesure d’accompagnement consiste à maintenir une ligne téléphonique sur des plages identifiées et à proposer une aide au remplissage sur place. La condition de réussite est que cette alternative soit annoncée aussi visiblement que l’outil en ligne : une solution de secours que personne ne connaît ne remplit pas sa fonction.',
      ],
    },
    maths: m(
      [
        'M15-achat-reste',
        'M15-consommation-conditionnement',
        'M15-reste-concret',
        'M14-case-vide',
        'M08-recette',
        'M03-double-article',
        'M11-nombre-de-contenants',
        'M12-minuit',
      ],
      9009,
    ),
  }),
  paper({
    n: 10,
    title: 'Examen blanc 10 — Fin de vie et calcul mental',
    shortQ: {
      instruction: 'Que sont les directives anticipées, et quelle difficulté pratique pose leur mise en œuvre ?',
      reference: [
        'Les directives anticipées expriment par écrit les volontés d’une personne concernant sa fin de vie, pour le cas où elle ne pourrait plus s’exprimer. Elles sont révisables à tout moment.',
        'La difficulté pratique est leur accessibilité : des volontés écrites mais introuvables au moment où elles comptent, notamment la nuit ou le week-end, n’ont aucun effet réel.',
      ],
    },
    longQ: {
      instruction:
        'Expliquez pourquoi l’accompagnement de l’entourage fait partie des soins palliatifs. Donnez un exemple et une limite.',
      minWords: 150,
      reference: [
        'L’accompagnement de l’entourage fait partie des soins palliatifs parce que les proches sont à la fois des acteurs de la présence auprès de la personne et des personnes affectées par la situation. Leur état conditionne ce qu’ils peuvent apporter.',
        'Leurs besoins sont concrets : comprendre ce qui se passe et ce qui va être fait, pouvoir se reposer, savoir à qui s’adresser. Sans ces éléments, l’épuisement s’installe et la présence devient impossible à tenir.',
        'Dans une situation fictive, un conjoint reste présent jour et nuit et refuse toute relève. L’équipe lui propose des temps de relais, l’informe de l’évolution et lui indique un soutien possible après le décès. Sa présence redevient soutenable, ce qui bénéficie aussi à la personne accompagnée.',
        'L’intervention professionnelle a ses limites : elle ne remplace pas les liens familiaux, ne règle pas les conflits anciens qui ressurgissent parfois, et doit respecter le souhait de certains proches de ne pas être accompagnés. Proposer sans imposer reste la règle.',
      ],
    },
    maths: m(
      [
        'M03-ordre-grandeur',
        'M03-par-dix',
        'M02-complement',
        'M04-partage-exact',
        'M05-moyenne-arrondie',
        'M06-lire-schema',
        'M09-points-vs-pourcent',
        'M13-proportion-tableau',
      ],
      10010,
    ),
  }),
  paper({
    n: 11,
    title: 'Examen blanc 11 — Précarité et conversions avancées',
    shortQ: {
      instruction: 'Définissez le renoncement aux soins et citez deux causes non financières.',
      reference: [
        'Le renoncement aux soins désigne le fait de ne pas engager ou de repousser des soins pourtant nécessaires.',
        'Deux causes non financières : les délais d’obtention d’un rendez-vous, incompatibles avec la disponibilité de la personne ; et la complexité des démarches administratives ou la difficulté à comprendre les courriers reçus. On peut aussi citer la distance, les horaires ou la crainte du jugement.',
      ],
    },
    longQ: {
      instruction:
        'Expliquez pourquoi la qualité de l’accueil influence le recours aux soins. Donnez un exemple et une limite.',
      minWords: 150,
      reference: [
        'La qualité de l’accueil influence le recours aux soins parce qu’une consultation se décide en fonction de l’expérience précédente. Une personne qui s’est sentie jugée, examinée sans explication ou pressée repoussera la consultation suivante, parfois de plusieurs années.',
        'Ce mécanisme est d’autant plus fort que la démarche était déjà difficile à engager : une personne en situation de précarité, qui a dû surmonter plusieurs obstacles pour venir, n’a pas de marge pour absorber un accueil désagréable.',
        'Dans une situation fictive, une personne ayant renoncé à tout suivi après une consultation mal vécue reprend un suivi dans une structure où l’on explique chaque geste avant de le faire et où l’on demande systématiquement l’accord. Aucun moyen supplémentaire n’a été mobilisé : seule la manière a changé.',
        'L’accueil ne règle cependant pas les obstacles matériels : délais, distance, horaires, avance de frais. Améliorer la relation sans agir sur ces conditions laisserait de côté une partie du public concerné.',
      ],
    },
    maths: m(
      [
        'M10-masse-simple',
        'M10-longueur',
        'M11-litres-ml',
        'M11-somme-volumes',
        'M12-decimal-vers-hm',
        'M12-hm-vers-decimal',
        'M08-tableau-manquant',
        'M14-relation-lineaire',
      ],
      11011,
    ),
  }),
  paper({
    n: 12,
    title: 'Examen blanc 12 — Sujet transversal',
    support: [
      'Une structure fictive souhaite améliorer l’information des personnes qu’elle accueille. Elle dispose d’un hall d’accueil, d’un site internet, et d’une équipe dont le temps est déjà entièrement occupé. Les personnes accueillies déclarent, pour une grande part, ne pas lire les affiches et ne pas consulter le site.',
    ],
    shortQ: {
      instruction: 'Relevez dans le texte les deux ressources disponibles et la contrainte principale.',
      reference: [
        'Les deux ressources disponibles sont le hall d’accueil et le site internet de la structure.',
        'La contrainte principale est le temps de l’équipe, déjà entièrement occupé : aucune action supplémentaire ne peut reposer sur du temps professionnel non prévu.',
      ],
    },
    longQ: {
      instruction:
        'Proposez une action d’amélioration de l’information, en expliquant pourquoi elle atteindrait le public visé, et indiquez sa principale condition de réussite.',
      minWords: 170,
      reference: [
        'Le texte décrit un problème classique : l’information existe, mais elle n’atteint pas son public. Les affiches et le site supposent que la personne fasse la démarche d’aller chercher l’information, ce que ne font ni les personnes pressées, ni celles qui lisent difficilement, ni celles qui ignorent qu’une aide existe.',
        'Une action possible consiste à remettre l’information en main propre, au moment d’un contact déjà prévu — admission, rendez-vous de suivi, sortie —, sous la forme d’un document court, en langage simplifié, avec une seule information par ligne et un contact identifié.',
        'Cette action atteindrait le public visé parce qu’elle ne demande aucune démarche supplémentaire à la personne : elle s’insère dans un échange qui a déjà lieu. Elle bénéficie en outre à tous les usagers, y compris à ceux qui liraient les affiches, ce qui évite de créer un dispositif séparé.',
        'La condition de réussite principale est qu’elle ne repose pas sur du temps professionnel supplémentaire, puisque celui-ci n’existe pas. Cela suppose que le document soit prêt, court, et remis systématiquement, plutôt que commenté à chaque fois. Une action qui exigerait cinq minutes d’explication par personne ne serait pas tenue au-delà des premières semaines.',
      ],
    },
    maths: m(
      [
        'M01-ranger',
        'M02-deux-etapes',
        'M04-autonomie-stock',
        'M05-parentheses',
        'M08-est-ce-proportionnel',
        'M09-hausse-baisse',
        'M12-duree-simple',
        'M15-consommation-conditionnement',
      ],
      12012,
    ),
  }),
]
