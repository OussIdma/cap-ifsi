/**
 * Référentiel de compétences.
 *
 * Identifiants repris du cahier des charges : M01-M20 (calculs), F01-F12
 * (français), H01-H24 (culture sanitaire et sociale), O01-O12 (entretien).
 * `status` distingue ce que l'arrêté cite explicitement de ce qui relève d'un
 * choix pédagogique de cette application.
 */

import type { Skill, Subject } from './types'

export const SKILLS: readonly Skill[] = [
  // -------------------------------------------------------------------------
  // Calculs
  // -------------------------------------------------------------------------
  {
    id: 'M01',
    subject: 'calculs',
    title: 'Lire et comparer les nombres',
    purpose: 'Savoir ce que vaut chaque chiffre dans un nombre, pour ne jamais se tromper de rang ni de virgule.',
    objectives: [
      'Lire et écrire un nombre entier ou décimal',
      'Comparer et ranger des nombres décimaux',
      'Dire ce que représente chaque chiffre selon sa place',
    ],
    prerequisites: [],
    priority: 'P1',
    status: 'socle-national',
  },
  {
    id: 'M02',
    subject: 'calculs',
    title: 'Addition et soustraction',
    purpose: 'Ajouter et retirer des quantités, y compris avec des virgules, sans perdre une retenue en route.',
    objectives: [
      'Poser une addition et une soustraction avec des décimaux',
      'Gérer retenues et emprunts',
      'Vérifier un résultat par l’opération inverse',
    ],
    prerequisites: ['M01'],
    priority: 'P1',
    status: 'socle-national',
  },
  {
    id: 'M03',
    subject: 'calculs',
    title: 'Multiplication',
    purpose: 'Calculer un total quand la même quantité se répète, et multiplier par 10, 100 ou 1 000 sans hésiter.',
    objectives: [
      'Maîtriser les tables jusqu’à 9',
      'Poser une multiplication avec décimaux',
      'Multiplier et diviser par 10, 100, 1 000',
      'Estimer un ordre de grandeur avant de calculer',
    ],
    prerequisites: ['M01', 'M02'],
    priority: 'P1',
    status: 'socle-national',
  },
  {
    id: 'M04',
    subject: 'calculs',
    title: 'Division',
    purpose: 'Partager équitablement ou trouver combien de fois une quantité tient dans une autre.',
    objectives: [
      'Distinguer partage et groupement',
      'Poser une division, lire quotient et reste',
      'Décider quoi faire du reste selon la situation',
    ],
    prerequisites: ['M03'],
    priority: 'P1',
    status: 'socle-national',
  },
  {
    id: 'M05',
    subject: 'calculs',
    title: 'Décimaux, priorités et arrondis',
    purpose: 'Calculer une expression dans le bon ordre et arrondir seulement quand la consigne le demande.',
    objectives: [
      'Appliquer les priorités opératoires et les parenthèses',
      'Arrondir à un rang demandé',
      'Donner un ordre de grandeur avant le calcul exact',
    ],
    prerequisites: ['M02', 'M03', 'M04'],
    priority: 'P1',
    status: 'socle-national',
  },
  {
    id: 'M06',
    subject: 'calculs',
    title: 'Fractions usuelles',
    purpose: 'Comprendre ce que veut dire « la moitié », « le quart », « les trois quarts » d’une quantité.',
    objectives: [
      'Lire une fraction comme un partage en parts égales',
      'Relier 1/2, 1/4, 3/4, 1/10 à leur écriture décimale',
      'Calculer une fraction d’une quantité',
      'Comparer et simplifier des fractions simples',
    ],
    prerequisites: ['M01', 'M04'],
    priority: 'P1',
    status: 'socle-national',
  },
  {
    id: 'M07',
    subject: 'calculs',
    title: 'Calculer avec des fractions',
    purpose: 'Additionner ou multiplier des parts pour répondre à une question concrète.',
    objectives: [
      'Additionner des fractions de même dénominateur',
      'Mettre au même dénominateur dans les cas simples',
      'Multiplier une fraction par un nombre',
    ],
    prerequisites: ['M06'],
    priority: 'P2',
    status: 'preparation-pedagogique',
  },
  {
    id: 'M08',
    subject: 'calculs',
    title: 'Proportionnalité',
    purpose: 'Passer d’une quantité connue à une quantité inconnue quand tout augmente dans la même proportion.',
    objectives: [
      'Reconnaître une situation proportionnelle',
      'Utiliser le passage à l’unité',
      'Construire et lire un tableau de proportionnalité',
      'Comprendre le produit en croix plutôt que l’appliquer sans réfléchir',
    ],
    prerequisites: ['M03', 'M04', 'M06'],
    priority: 'P1',
    status: 'socle-national',
  },
  {
    id: 'M09',
    subject: 'calculs',
    title: 'Pourcentages',
    purpose: 'Calculer une part, un taux ou un total, et comprendre une hausse ou une baisse.',
    objectives: [
      'Calculer un pourcentage d’une quantité',
      'Retrouver le taux à partir de la part et du total',
      'Retrouver le total à partir de la part et du taux',
      'Appliquer une hausse ou une baisse',
      'Distinguer « pourcentage » et « points »',
    ],
    prerequisites: ['M08'],
    priority: 'P1',
    status: 'socle-national',
  },
  {
    id: 'M10',
    subject: 'calculs',
    title: 'Longueurs et masses',
    purpose: 'Passer des kilogrammes aux grammes et aux milligrammes sans décaler la virgule au mauvais endroit.',
    objectives: [
      'Convertir km, m, cm, mm',
      'Convertir kg, g, mg',
      'Additionner des mesures écrites dans des unités différentes',
    ],
    prerequisites: ['M05'],
    priority: 'P1',
    status: 'socle-national',
  },
  {
    id: 'M11',
    subject: 'calculs',
    title: 'Capacités et volumes usuels',
    purpose: 'Manipuler litres, décilitres, centilitres et millilitres dans des situations de tous les jours.',
    objectives: ['Convertir L, dL, cL, mL', 'Comparer et additionner des volumes', 'Estimer un volume plausible'],
    prerequisites: ['M05'],
    priority: 'P1',
    status: 'socle-national',
  },
  {
    id: 'M12',
    subject: 'calculs',
    title: 'Heures et durées',
    purpose: 'Calculer une durée, une heure d’arrivée, et passer des heures décimales aux heures et minutes.',
    objectives: [
      'Calculer une durée entre deux horaires, minuit compris',
      'Convertir heures décimales ↔ heures et minutes',
      'Additionner des durées',
    ],
    prerequisites: ['M02', 'M05'],
    priority: 'P1',
    status: 'socle-national',
  },
  {
    id: 'M13',
    subject: 'calculs',
    title: 'Tableaux, graphiques et moyennes',
    purpose: 'Extraire l’information utile d’un tableau ou d’un graphique et en tirer une phrase juste.',
    objectives: [
      'Lire un axe, une unité, une légende',
      'Calculer une somme, une moyenne simple, une proportion',
      'Rédiger une phrase de lecture exacte',
    ],
    prerequisites: ['M02', 'M08', 'M09'],
    priority: 'P2',
    status: 'preparation-pedagogique',
  },
  {
    id: 'M14',
    subject: 'calculs',
    title: 'Retrouver une valeur inconnue',
    purpose: 'Remonter un calcul à l’envers quand c’est le départ, et non l’arrivée, qui manque.',
    objectives: [
      'Utiliser l’opération inverse',
      'Résoudre une relation simple du type a × x + b = c',
      'Vérifier la valeur trouvée dans l’énoncé',
    ],
    prerequisites: ['M02', 'M08'],
    priority: 'P2',
    status: 'preparation-pedagogique',
  },
  {
    id: 'M15',
    subject: 'calculs',
    title: 'Problèmes à plusieurs étapes',
    purpose: 'Organiser un problème long : trier les données, choisir les opérations, conclure par une phrase.',
    objectives: [
      'Repérer les données utiles et inutiles',
      'Enchaîner deux ou trois opérations',
      'Traiter un reste ou un arrondi concret',
      'Conclure par une phrase qui répond à la question',
    ],
    prerequisites: ['M08', 'M10', 'M12'],
    priority: 'P1',
    status: 'socle-national',
  },
  {
    id: 'M16',
    subject: 'calculs',
    title: 'Vérifier son raisonnement',
    purpose: 'Repérer soi-même une réponse impossible avant de rendre sa copie.',
    objectives: [
      'Contrôler l’ordre de grandeur',
      'Contrôler l’unité et le sens de la réponse',
      'Repérer l’étape fautive dans un calcul écrit',
    ],
    prerequisites: ['M05', 'M10'],
    priority: 'P1',
    status: 'preparation-pedagogique',
  },
  {
    id: 'M17',
    subject: 'calculs',
    title: 'Périmètres, aires et volumes simples',
    purpose: 'Calculer une surface ou un volume quand la formule est donnée.',
    objectives: ['Appliquer une formule fournie', 'Convertir des unités carrées et cubiques', 'Relier dm³ et litre'],
    prerequisites: ['M10', 'M11'],
    priority: 'P3',
    status: 'complement',
  },
  {
    id: 'M18',
    subject: 'calculs',
    title: 'Vitesse, débit et consommation',
    purpose: 'Relier une quantité et une durée : combien par heure, combien en tout, combien de temps.',
    objectives: ['Calculer une quantité par unité de temps', 'Ramener deux données à une unité commune'],
    prerequisites: ['M08', 'M12'],
    priority: 'P2',
    status: 'preparation-pedagogique',
  },
  {
    id: 'M19',
    subject: 'calculs',
    title: 'Concentration : quantité par volume',
    purpose: 'Lire une quantité par volume et calculer la quantité correspondante, sur des exemples non cliniques.',
    objectives: ['Lire une concentration écrite g/L ou mg/mL', 'Calculer la quantité contenue dans un volume donné'],
    prerequisites: ['M08', 'M10', 'M11'],
    priority: 'P2',
    status: 'preparation-pedagogique',
  },
  {
    id: 'M20',
    subject: 'calculs',
    title: 'Initiation aux calculs de débit (complément)',
    purpose:
      'Appliquer conversions et proportionnalité à des énoncés entièrement donnés. Complément pédagogique, jamais un outil de soin.',
    objectives: ['Calculer un débit horaire à partir d’un volume et d’une durée', 'Vérifier l’unité du résultat'],
    prerequisites: ['M08', 'M12'],
    priority: 'P3',
    status: 'complement',
  },

  // -------------------------------------------------------------------------
  // Français
  // -------------------------------------------------------------------------
  {
    id: 'F01',
    subject: 'francais',
    title: 'Comprendre la consigne',
    purpose: 'Savoir exactement ce qu’on vous demande d’écrire, pour ne pas perdre des points sur un hors-sujet.',
    objectives: [
      'Distinguer citer, relever, définir, expliquer, résumer, comparer, analyser, argumenter, proposer',
      'Repérer le nombre de réponses attendues et la longueur demandée',
      'Reconnaître un hors-sujet',
    ],
    prerequisites: [],
    priority: 'P1',
    status: 'socle-national',
  },
  {
    id: 'F02',
    subject: 'francais',
    title: 'Lire activement un texte',
    purpose: 'Trouver rapidement l’idée principale et les informations utiles dans un texte qu’on découvre.',
    objectives: ['Repérer thème et idée centrale', 'Repérer les acteurs et leur rôle', 'Sélectionner les informations utiles'],
    prerequisites: ['F01'],
    priority: 'P1',
    status: 'socle-national',
  },
  {
    id: 'F03',
    subject: 'francais',
    title: 'Vocabulaire',
    purpose: 'Comprendre un mot d’après son contexte et employer le mot juste dans une réponse professionnelle.',
    objectives: ['Expliquer un mot dans son contexte', 'Remplacer un mot par un équivalent', 'Employer le vocabulaire sanitaire courant'],
    prerequisites: ['F02'],
    priority: 'P1',
    status: 'socle-national',
  },
  {
    id: 'F04',
    subject: 'francais',
    title: 'Reformuler',
    purpose: 'Redire une idée avec ses propres mots sans en changer le sens ni recopier.',
    objectives: ['Reformuler une phrase', 'Reformuler un paragraphe', 'Repérer une reformulation qui déforme le sens'],
    prerequisites: ['F03'],
    priority: 'P1',
    status: 'socle-national',
  },
  {
    id: 'F05',
    subject: 'francais',
    title: 'Résumer',
    purpose: 'Garder l’essentiel dans une longueur imposée, sans ajouter son avis.',
    objectives: ['Hiérarchiser les informations', 'Respecter une longueur', 'Ne pas ajouter d’opinion personnelle'],
    prerequisites: ['F04'],
    priority: 'P1',
    status: 'socle-national',
  },
  {
    id: 'F06',
    subject: 'francais',
    title: 'Analyser : causes, conséquences, enjeux',
    purpose: 'Expliquer pourquoi une situation existe et ce qu’elle produit, au lieu de la décrire seulement.',
    objectives: ['Distinguer cause et conséquence', 'Identifier acteurs et obstacles', 'Passer du tableau d’analyse au paragraphe'],
    prerequisites: ['F02'],
    priority: 'P1',
    status: 'socle-national',
  },
  {
    id: 'F07',
    subject: 'francais',
    title: 'Argumenter',
    purpose: 'Défendre une idée avec une explication et un exemple, et savoir reconnaître une limite.',
    objectives: ['Construire idée → explication → exemple', 'Nuancer', 'Proposer une action réaliste'],
    prerequisites: ['F06'],
    priority: 'P1',
    status: 'socle-national',
  },
  {
    id: 'F08',
    subject: 'francais',
    title: 'Organiser sa réponse',
    purpose: 'Construire un plan proportionné pour qu’un correcteur suive votre raisonnement sans effort.',
    objectives: ['Bâtir un plan en deux ou trois parties', 'Enchaîner les idées', 'Conclure brièvement'],
    prerequisites: ['F07'],
    priority: 'P1',
    status: 'socle-national',
  },
  {
    id: 'F09',
    subject: 'francais',
    title: 'Orthographe essentielle',
    purpose: 'Éviter les fautes qui gênent la lecture : accords, conjugaisons usuelles, homophones fréquents.',
    objectives: ['Accorder sujet-verbe et nom-adjectif', 'Choisir entre a/à, ou/où, ces/ses, c’est/s’est', 'Écrire les participes passés courants'],
    prerequisites: [],
    priority: 'P1',
    status: 'socle-national',
  },
  {
    id: 'F10',
    subject: 'francais',
    title: 'Phrases claires et ponctuation',
    purpose: 'Écrire des phrases complètes, courtes et sans ambiguïté.',
    objectives: ['Écrire une phrase complète', 'Ponctuer correctement', 'Supprimer répétitions et ambiguïtés'],
    prerequisites: ['F09'],
    priority: 'P1',
    status: 'socle-national',
  },
  {
    id: 'F11',
    subject: 'francais',
    title: 'Répondre en professionnelle',
    purpose: 'Relier une situation à la posture soignante sans juger la personne ni dépasser son rôle.',
    objectives: ['Décrire des faits avant d’interpréter', 'Rester dans son champ de compétence', 'Proposer une orientation adaptée'],
    prerequisites: ['F07'],
    priority: 'P1',
    status: 'socle-national',
  },
  {
    id: 'F12',
    subject: 'francais',
    title: 'Écrire en temps limité',
    purpose: 'Finir sa copie en 30 minutes, relecture comprise.',
    objectives: ['Répartir son temps selon le barème', 'Faire un plan en trois minutes', 'Garder trois minutes de relecture'],
    prerequisites: ['F08'],
    priority: 'P1',
    status: 'preparation-pedagogique',
  },

  // -------------------------------------------------------------------------
  // Culture sanitaire, médico-sociale et sociale
  // -------------------------------------------------------------------------
  ...(
    [
      ['H01', 'Santé et prévention', 'Comprendre ce qu’on appelle « santé » et à quoi sert la prévention.'],
      ['H02', 'Système de santé', 'Savoir qui fait quoi entre la ville, l’hôpital et le domicile.'],
      ['H03', 'Vieillissement et autonomie', 'Parler de l’avancée en âge sans confondre âge, maladie et dépendance.'],
      ['H04', 'Proches aidants', 'Comprendre ce que vivent les proches qui accompagnent au quotidien.'],
      ['H05', 'Handicap', 'Parler du handicap en termes de situation et d’accessibilité, pas de déficit.'],
      ['H06', 'Précarité et accès aux soins', 'Repérer ce qui empêche concrètement de se soigner.'],
      ['H07', 'Santé mentale', 'Aborder la santé mentale sans stigmatisation et savoir orienter.'],
      ['H08', 'Addictions', 'Accompagner sans moraliser, avec la réduction des risques.'],
      ['H09', 'Alimentation et activité physique', 'Relier alimentation, mouvement et santé, sans prescrire.'],
      ['H10', 'Maladies chroniques', 'Comprendre ce que change une maladie qui dure.'],
      ['H11', 'Infections et vaccination', 'Expliquer transmission, hygiène et information fiable.'],
      ['H12', 'Qualité et sécurité des soins', 'Parler des erreurs comme d’un sujet d’organisation, pas de faute individuelle.'],
      ['H13', 'Droits des personnes et éthique', 'Situer dignité, consentement, confidentialité dans le quotidien.'],
      ['H14', 'Bientraitance et violences', 'Savoir repérer, prévenir et alerter correctement.'],
      ['H15', 'Fin de vie et soins palliatifs', 'Accompagner le confort et l’entourage, dans un cadre légal daté.'],
      ['H16', 'Enfance, adolescence et familles', 'Repères de développement, prévention et protection.'],
      ['H17', 'Santé des femmes et santé sexuelle', 'Prévention, accès et accompagnement, sans jugement.'],
      ['H18', 'Travail et santé des professionnels', 'Comprendre l’usure professionnelle et ce qui la prévient.'],
      ['H19', 'Environnement et santé', 'Relier chaleur, pollution et vulnérabilités.'],
      ['H20', 'Numérique en santé', 'Confidentialité, exclusion numérique et esprit critique.'],
      ['H21', 'Communication interculturelle', 'Se faire comprendre malgré la langue et les représentations.'],
      ['H22', 'Démographie et organisation des soins', 'Relier besoins de la population et organisation, sans prendre parti.'],
      ['H23', 'Information fiable et esprit critique', 'Distinguer un fait d’une opinion, vérifier une source et une date.'],
      ['H24', 'Sujets transversaux d’actualité', 'Travailler un sujet récent sans prétendre deviner le sujet du jour J.'],
    ] as const
  ).map(
    ([id, title, purpose]): Skill => ({
      id,
      subject: 'sante',
      title,
      purpose,
      objectives: [
        'Définir le sujet en une phrase simple',
        'Employer le vocabulaire juste',
        'Citer un enjeu et le rôle des professionnels',
        'Écrire un court paragraphe argumenté',
      ],
      prerequisites: [],
      priority: 'P1',
      status: 'socle-national',
    }),
  ),

  // -------------------------------------------------------------------------
  // Entretien professionnel
  // -------------------------------------------------------------------------
  {
    id: 'O01',
    subject: 'oral',
    title: 'Se présenter',
    purpose: 'Dire qui vous êtes professionnellement en deux minutes, sans réciter un CV.',
    objectives: ['Présenter son parcours dans un ordre logique', 'Relier parcours et projet', 'Tenir la durée demandée'],
    prerequisites: [],
    priority: 'P1',
    status: 'socle-national',
  },
  {
    id: 'O02',
    subject: 'oral',
    title: 'Expliquer sa motivation',
    purpose: 'Dire pourquoi infirmière et pourquoi maintenant, avec des faits, pas des formules.',
    objectives: ['Appuyer la motivation sur des faits vécus', 'Expliquer le « pourquoi maintenant »', 'Éviter les phrases toutes faites'],
    prerequisites: ['O01'],
    priority: 'P1',
    status: 'socle-national',
  },
  {
    id: 'O03',
    subject: 'oral',
    title: 'Connaître le métier visé',
    purpose: 'Montrer ce qui change entre aide-soignante et infirmière, y compris les responsabilités.',
    objectives: ['Situer rôle propre et rôle prescrit', 'Distinguer collaboration et dépassement de compétence', 'Nommer des responsabilités concrètes'],
    prerequisites: ['O02'],
    priority: 'P1',
    status: 'socle-national',
  },
  {
    id: 'O04',
    subject: 'oral',
    title: 'Raconter une expérience',
    purpose: 'Structurer un récit professionnel : contexte, rôle, actions, résultat, apprentissage.',
    objectives: ['Suivre une trame de récit', 'Distinguer faits et interprétation', 'Anonymiser systématiquement'],
    prerequisites: ['O01'],
    priority: 'P1',
    status: 'socle-national',
  },
  {
    id: 'O05',
    subject: 'oral',
    title: 'Relation et communication',
    purpose: 'Expliquer comment vous parlez à une personne en difficulté, et comment vous accueillez un refus.',
    objectives: ['Décrire une adaptation de communication', 'Respecter un refus', 'Expliquer sans juger'],
    prerequisites: ['O04'],
    priority: 'P1',
    status: 'socle-national',
  },
  {
    id: 'O06',
    subject: 'oral',
    title: 'Travail en équipe',
    purpose: 'Montrer que vous transmettez, que vous acceptez le désaccord et que vous signalez une erreur.',
    objectives: ['Décrire une transmission utile', 'Gérer un désaccord', 'Signaler une erreur sans se dédouaner'],
    prerequisites: ['O04'],
    priority: 'P1',
    status: 'socle-national',
  },
  {
    id: 'O07',
    subject: 'oral',
    title: 'Reprendre des études',
    purpose: 'Rassurer sur votre méthode de travail et votre capacité à demander de l’aide.',
    objectives: ['Décrire sa méthode de révision', 'Nommer un point faible et le plan associé', 'Savoir demander de l’aide'],
    prerequisites: ['O02'],
    priority: 'P1',
    status: 'socle-national',
  },
  {
    id: 'O08',
    subject: 'oral',
    title: 'Réalisme du projet',
    purpose: 'Montrer que l’organisation, le financement et les stages ont été anticipés.',
    objectives: ['Distinguer soutien de l’employeur et financement confirmé', 'Anticiper transport, garde, horaires', 'Dire ce qui reste à confirmer'],
    prerequisites: ['O07'],
    priority: 'P1',
    status: 'socle-national',
  },
  {
    id: 'O09',
    subject: 'oral',
    title: 'Connaître la formation',
    purpose: 'Savoir comment s’articulent cours, travaux dirigés et stages.',
    objectives: ['Décrire l’alternance cours / stages', 'Citer des compétences du référentiel', 'Dire ce qu’on ignore encore'],
    prerequisites: ['O03'],
    priority: 'P1',
    status: 'socle-national',
  },
  {
    id: 'O10',
    subject: 'oral',
    title: 'Prise de recul',
    purpose: 'Analyser ce que vous feriez autrement : c’est ce qui distingue une réponse mûre.',
    objectives: ['Identifier une limite personnelle', 'Proposer une amélioration concrète', 'Éviter l’autocritique stérile'],
    prerequisites: ['O04'],
    priority: 'P1',
    status: 'socle-national',
  },
  {
    id: 'O11',
    subject: 'oral',
    title: 'Répondre à l’imprévu',
    purpose: 'Garder une méthode quand la question surprend ou quand vous ne savez pas.',
    objectives: ['Structurer une réponse improvisée', 'Dire « je ne sais pas » utilement', 'Proposer comment vérifier'],
    prerequisites: ['O05'],
    priority: 'P1',
    status: 'preparation-pedagogique',
  },
  {
    id: 'O12',
    subject: 'oral',
    title: 'Simulation complète',
    purpose: 'Enchaîner présentation et relances dans le temps de l’épreuve.',
    objectives: ['Tenir le format présentation + échange', 'Rester cohérente d’une réponse à l’autre', 'Gérer le temps'],
    prerequisites: ['O01', 'O02', 'O03', 'O04'],
    priority: 'P1',
    status: 'socle-national',
  },
]

const BY_ID = new Map(SKILLS.map((s) => [s.id, s]))

export function getSkill(id: string): Skill | undefined {
  return BY_ID.get(id)
}

export function skillsOf(subject: Subject): Skill[] {
  return SKILLS.filter((s) => s.subject === subject)
}

export function skillTitle(id: string): string {
  return BY_ID.get(id)?.title ?? id
}

/** Ordre pédagogique : les prérequis d'abord. */
export function orderedSkills(subject: Subject): Skill[] {
  const list = skillsOf(subject)
  const done = new Set<string>()
  const out: Skill[] = []
  let guard = 0
  while (out.length < list.length && guard++ < 100) {
    for (const s of list) {
      if (done.has(s.id)) continue
      if (s.prerequisites.every((p) => done.has(p) || !BY_ID.has(p) || getSkill(p)?.subject !== subject)) {
        out.push(s)
        done.add(s.id)
      }
    }
  }
  for (const s of list) if (!done.has(s.id)) out.push(s)
  return out
}

