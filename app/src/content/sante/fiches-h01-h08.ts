/**
 * Fiches H01 à H08.
 *
 * Contenus originaux. Aucun exemple ne correspond à une personne réelle.
 * Les chiffres précis sont volontairement absents : ils ne peuvent être publiés
 * qu'après vérification à la source primaire, avec leur date.
 */

import type { HealthSheet } from '../types'
import { REF, sheet } from './builder'

export const FICHES_H01_H08: HealthSheet[] = [
  sheet({
    id: 'H01',
    title: 'Santé et prévention',
    purpose: 'Comprendre ce qu’on appelle « santé » et à quoi sert la prévention.',
    def: [
      'La santé ne se réduit pas à l’absence de maladie. L’Organisation mondiale de la santé la définit comme un état complet de bien-être physique, mental et social. Cette définition, souvent discutée parce qu’elle paraît inatteignable, a le mérite de rappeler qu’une personne peut vivre avec une maladie chronique et être en bonne santé au sens large.',
      'La prévention regroupe toutes les actions qui visent à éviter qu’un problème de santé survienne, à le repérer tôt, ou à en limiter les conséquences. On distingue habituellement trois temps : agir avant (prévention primaire), repérer tôt (prévention secondaire), limiter les séquelles et maintenir l’autonomie (prévention tertiaire).',
      'Les déterminants de santé sont l’ensemble des facteurs qui influencent l’état de santé d’une population : conditions de vie et de travail, revenus, logement, éducation, environnement, accès aux soins, comportements individuels. Les comportements ne sont qu’une partie du tableau, et ils dépendent eux-mêmes des autres facteurs.',
    ],
    vocab: [
      { term: 'Déterminant de santé', def: 'Facteur qui influence l’état de santé d’une personne ou d’une population.' },
      { term: 'Prévention primaire', def: 'Agir avant l’apparition du problème, par exemple par la vaccination ou l’aménagement d’un logement.' },
      { term: 'Prévention secondaire', def: 'Repérer précocement, par exemple par un dépistage.' },
      { term: 'Prévention tertiaire', def: 'Limiter les conséquences et les récidives, maintenir l’autonomie.' },
      { term: 'Promotion de la santé', def: 'Démarche plus large qui vise à donner aux personnes les moyens d’agir sur leur propre santé.' },
      { term: 'Éducation pour la santé', def: 'Actions d’information et d’accompagnement qui aident à comprendre et à décider.' },
    ],
    stakes: [
      'Raisonner en termes de déterminants évite deux erreurs symétriques. La première consiste à tout ramener aux comportements individuels, ce qui conduit à culpabiliser des personnes dont les marges de manœuvre sont faibles. La seconde consiste à nier toute part individuelle, ce qui rend l’accompagnement impossible.',
      'La prévention a un coût immédiat et des bénéfices différés. C’est ce décalage qui explique qu’elle soit souvent la première à être reportée quand les moyens manquent, alors même qu’elle évite des prises en charge plus lourdes ensuite.',
      'Une action de prévention n’atteint pas automatiquement les personnes les plus concernées. Une campagne diffusée uniquement en ligne, ou rédigée dans une langue complexe, peut au contraire creuser les écarts entre les publics.',
    ],
    example: [
      'Exemple fictif : une résidence pour personnes âgées constate plusieurs chutes en fin de journée. Plutôt que de rappeler aux résidents d’être prudents, l’équipe recherche les causes : éclairage insuffisant dans un couloir, tapis mal fixé, chaussures inadaptées, horaire des déplacements qui coïncide avec un moment de fatigue.',
      'Les actions retenues sont concrètes : renforcement de l’éclairage, retrait du tapis, proposition d’un atelier équilibre, et information des familles sur le choix des chaussures. Le problème est traité par l’environnement autant que par le comportement.',
    ],
    pros: [
      'L’aide-soignante est souvent la première à repérer un changement : une personne qui se déplace moins, qui mange moins, qui s’isole. Ce repérage n’a de valeur que s’il est transmis.',
      'L’infirmière évalue, coordonne et relie ces observations à un projet de soin. Elle conduit aussi des actions d’éducation pour la santé, en expliquant à la personne ce qui se passe et ce qu’elle peut faire.',
      'La prévention est un travail d’équipe qui inclut aussi le médecin, le kinésithérapeute, l’ergothérapeute, le travailleur social et, très souvent, les proches.',
    ],
    questions: [
      {
        q: 'Une campagne de dépistage relève de quelle forme de prévention ?',
        choices: [
          { label: 'La prévention secondaire', ok: true },
          { label: 'La prévention primaire', why: 'La prévention primaire agit avant l’apparition du problème. Un dépistage cherche un problème déjà présent, mais pas encore repéré.' },
          { label: 'La prévention tertiaire', why: 'La prévention tertiaire intervient après le diagnostic, pour limiter les conséquences.' },
        ],
        explain:
          'Le dépistage vise à repérer tôt un problème qui existe déjà mais qui n’a pas encore de manifestation, afin d’agir avant qu’il ne s’aggrave. C’est la définition de la prévention secondaire.',
      },
      {
        q: 'Parmi ces éléments, lequel n’est pas un déterminant de santé ?',
        choices: [
          { label: 'La couleur des murs d’un cabinet médical', ok: true },
          { label: 'Le niveau de revenu', why: 'Le revenu conditionne le logement, l’alimentation, le renoncement aux soins : c’est un déterminant majeur.' },
          { label: 'Les conditions de travail', why: 'Elles influencent la santé physique et mentale de façon durable.' },
          { label: 'L’accès aux transports', why: 'Il conditionne concrètement la possibilité de se rendre à un rendez-vous.' },
        ],
        explain:
          'Un déterminant de santé influence réellement l’état de santé d’une population. Les revenus, le travail et la mobilité en font partie ; un choix décoratif, non.',
      },
      {
        q: 'Pourquoi une campagne diffusée uniquement en ligne peut-elle creuser les inégalités ?',
        choices: [
          { label: 'Parce qu’elle n’atteint pas les personnes sans équipement, sans connexion ou peu à l’aise avec le numérique', ok: true },
          { label: 'Parce que les informations en ligne sont toujours fausses', why: 'La fiabilité dépend de la source, pas du support.' },
          { label: 'Parce que le numérique coûte plus cher que le papier', why: 'Le coût n’est pas le mécanisme en cause ici : c’est l’accès du public visé.' },
        ],
        explain:
          'Une action de prévention ne produit d’effet que si elle atteint les personnes concernées. Si le canal choisi exclut une partie du public, l’écart entre les groupes se creuse au lieu de se réduire.',
      },
    ],
    argument: {
      prompt:
        'Expliquez pourquoi agir sur l’environnement peut être plus efficace que de rappeler aux personnes d’être prudentes. Appuyez-vous sur un exemple, et indiquez une limite de ce raisonnement.',
      guidance: [
        'Commencez par une phrase qui pose votre position.',
        'Expliquez le mécanisme : pourquoi un rappel verbal seul produit peu d’effet.',
        'Donnez un exemple concret et fictif.',
        'Terminez par une limite honnête : ce que l’action sur l’environnement ne règle pas.',
      ],
      reference: [
        'Agir sur l’environnement est souvent plus efficace qu’un rappel à la prudence, parce qu’un rappel suppose que la personne dispose déjà des moyens de changer son comportement. Or ce n’est pas toujours le cas : une personne fatiguée en fin de journée ne devient pas plus vigilante parce qu’on le lui demande.',
        'Dans une résidence fictive, plusieurs chutes se produisaient dans un couloir mal éclairé. Renforcer l’éclairage et retirer un tapis mal fixé a supprimé la cause, sans rien exiger des résidents. L’effet est immédiat et bénéficie à tout le monde, y compris aux personnes qui n’auraient pas entendu ou retenu le message.',
        'Cette approche a toutefois ses limites. Elle ne remplace pas l’accompagnement individuel : certaines situations relèvent d’un problème d’équilibre, de vue ou de traitement, qui demande une évaluation professionnelle. Agir sur l’environnement et accompagner la personne se complètent plutôt qu’ils ne s’opposent.',
      ],
    },
    sources: [REF.spf, REF.has, REF.ministere],
  }),

  sheet({
    id: 'H02',
    title: 'Système de santé : qui fait quoi',
    purpose: 'Savoir qui fait quoi entre la ville, l’hôpital et le domicile.',
    def: [
      'Le système de santé français associe des professionnels libéraux, des établissements de santé publics et privés, des établissements médico-sociaux et des services à domicile. Leur financement repose principalement sur l’Assurance maladie, complétée par les organismes complémentaires et une participation de la personne.',
      'On distingue habituellement trois niveaux. Les soins de ville : médecin traitant, infirmier libéral, pharmacien, kinésithérapeute. Les établissements de santé : hôpitaux et cliniques, pour les situations qui demandent un plateau technique ou une surveillance continue. Le secteur médico-social : structures et services qui accompagnent dans la durée, notamment le handicap et le grand âge.',
      'Le parcours de santé désigne l’enchaînement de ces interventions pour une même personne. Sa qualité dépend moins de chaque acteur pris isolément que de la façon dont l’information circule entre eux.',
    ],
    vocab: [
      { term: 'Soins de ville', def: 'Soins réalisés hors établissement, par des professionnels souvent libéraux.' },
      { term: 'Médecin traitant', def: 'Médecin déclaré par la personne, qui coordonne son suivi et oriente vers les spécialistes.' },
      { term: 'Secteur médico-social', def: 'Structures et services d’accompagnement dans la durée (handicap, grand âge, protection de l’enfance).' },
      { term: 'ARS', def: 'Agence régionale de santé : pilote l’organisation de l’offre de soins dans une région.' },
      { term: 'Parcours de santé', def: 'Enchaînement des interventions autour d’une personne, dans le temps.' },
      { term: 'Coordination', def: 'Organisation des interventions de plusieurs professionnels pour éviter les ruptures.' },
    ],
    stakes: [
      'Les ruptures de parcours se produisent surtout aux points de passage : sortie d’hospitalisation, changement de domicile, passage d’un service à un autre. C’est à ces moments que l’information se perd et qu’une personne se retrouve sans relais.',
      'La répartition des professionnels sur le territoire n’est pas homogène. Dans certaines zones, le délai d’obtention d’un rendez-vous conduit à différer des soins, puis parfois à y renoncer.',
      'Comprendre qui fait quoi n’est pas une question théorique : c’est ce qui permet d’orienter correctement une personne qui pose une question, plutôt que de la renvoyer d’un service à l’autre.',
    ],
    example: [
      'Exemple fictif : à sa sortie d’hospitalisation, une personne âgée doit continuer des soins à domicile. Plusieurs acteurs interviennent : le service hospitalier qui prépare la sortie, le médecin traitant qui reprend le suivi, un infirmier libéral pour les soins, un service d’aide à domicile pour les actes de la vie quotidienne, et la famille.',
      'Si la lettre de liaison n’arrive pas au médecin traitant, celui-ci ignore ce qui a été fait. Si l’infirmier libéral n’est pas prévenu à temps, les soins s’interrompent. La qualité du parcours tient à ces transmissions, davantage qu’à la compétence de chacun pris séparément.',
    ],
    pros: [
      'L’aide-soignante participe à la continuité en signalant ce qu’elle observe et en transmettant précisément, à l’écrit comme à l’oral.',
      'L’infirmière assure une part importante de la coordination : elle relie les intervenants, organise les soins, alerte quand un relais manque et explique le parcours à la personne et à ses proches.',
      'Le travailleur social intervient sur l’accès aux droits et aux aides, qui conditionne souvent la faisabilité du retour à domicile.',
    ],
    questions: [
      {
        q: 'À quel moment le risque de rupture de parcours est-il le plus élevé ?',
        choices: [
          { label: 'Lors des passages d’un lieu de prise en charge à un autre', ok: true },
          { label: 'Pendant une hospitalisation', why: 'Pendant l’hospitalisation, la personne est sous surveillance continue dans un même lieu : l’information circule plus facilement.' },
          { label: 'Lors d’une consultation de routine', why: 'Une consultation isolée comporte moins de points de transmission.' },
        ],
        explain:
          'Les transitions — sortie d’hôpital, changement de service, retour à domicile — sont les moments où l’information doit passer d’une équipe à une autre. C’est là qu’elle se perd le plus souvent.',
      },
      {
        q: 'Quel est le rôle du médecin traitant ?',
        choices: [
          { label: 'Assurer le suivi habituel et orienter vers les autres professionnels', ok: true },
          { label: 'Réaliser tous les soins techniques à domicile', why: 'Les soins à domicile sont principalement réalisés par les infirmiers libéraux et les services de soins à domicile.' },
          { label: 'Décider seul de l’organisation de l’offre de soins régionale', why: 'Cette mission relève de l’ARS, pas d’un professionnel en particulier.' },
        ],
        explain:
          'Le médecin traitant est le point d’entrée et de coordination du suivi. Il oriente vers les spécialistes et centralise l’information sur la personne.',
      },
    ],
    argument: {
      prompt:
        'Expliquez pourquoi la qualité d’un parcours de santé dépend autant de la transmission d’informations que de la compétence de chaque professionnel. Donnez un exemple et une limite.',
      guidance: [
        'Posez d’abord ce que vous défendez.',
        'Expliquez ce qui se passe concrètement quand une information ne circule pas.',
        'Illustrez par une situation fictive de sortie d’hospitalisation.',
        'Nuancez : la transmission ne suffit pas à elle seule.',
      ],
      reference: [
        'Un parcours de santé repose sur plusieurs intervenants qui ne se rencontrent jamais. Leur compétence individuelle ne suffit donc pas : c’est la circulation de l’information qui permet à chacun de savoir ce qui a déjà été fait, ce qui reste à faire et ce qui doit être surveillé.',
        'Dans une situation fictive de sortie d’hospitalisation, l’absence de lettre de liaison conduit le médecin traitant à ignorer un changement de traitement. Le suivi reprend sur des bases erronées, alors que chaque professionnel a correctement fait son travail.',
        'La transmission ne règle cependant pas tout. Si aucun infirmier libéral n’est disponible sur le secteur, l’information la plus complète ne créera pas le relais manquant. Coordination et moyens disponibles vont de pair.',
      ],
    },
    sources: [REF.ameli, REF.drees, REF.ministere],
  }),

  sheet({
    id: 'H03',
    title: 'Vieillissement et autonomie',
    purpose: 'Parler de l’avancée en âge sans confondre âge, maladie et dépendance.',
    def: [
      'Le vieillissement est un processus progressif et normal. Il ne se confond ni avec la maladie ni avec la dépendance : de nombreuses personnes âgées vivent sans perte d’autonomie notable, tandis qu’une perte d’autonomie peut survenir à tout âge.',
      'L’autonomie désigne la capacité à décider pour soi-même. L’indépendance désigne la capacité à réaliser seul les gestes de la vie quotidienne. Une personne peut être dépendante pour se lever tout en restant pleinement autonome dans ses choix : confondre les deux conduit à décider à sa place.',
      'La perte d’autonomie résulte le plus souvent d’une combinaison de facteurs : maladies chroniques, troubles sensoriels, environnement inadapté, isolement social, effets d’un événement de santé aigu. Plusieurs de ces facteurs sont modifiables.',
    ],
    vocab: [
      { term: 'Autonomie', def: 'Capacité à décider pour soi-même et à organiser sa vie.' },
      { term: 'Indépendance', def: 'Capacité à réaliser seul les actes de la vie quotidienne.' },
      { term: 'Perte d’autonomie', def: 'Réduction de la capacité à décider ou à agir, nécessitant un accompagnement.' },
      { term: 'Maintien à domicile', def: 'Ensemble des aides permettant de continuer à vivre chez soi.' },
      { term: 'EHPAD', def: 'Établissement d’hébergement pour personnes âgées dépendantes.' },
      { term: 'Isolement social', def: 'Rareté durable des relations et des contacts, distincte du fait de vivre seul par choix.' },
    ],
    stakes: [
      'La majorité des personnes souhaitent vieillir chez elles. Le maintien à domicile suppose cependant une combinaison de conditions : logement adapté, aides humaines disponibles, entourage, et parfois adaptation du financement.',
      'L’isolement social a des effets propres sur la santé. Il réduit le repérage précoce des difficultés : une personne isolée n’a personne pour remarquer qu’elle mange moins ou qu’elle se déplace moins.',
      'Les représentations sur l’âge influencent les pratiques. Attribuer automatiquement une difficulté à l’âge — « c’est normal à son âge » — conduit à ne pas rechercher une cause qui pourrait être traitée.',
    ],
    example: [
      'Exemple fictif : une personne de 84 ans vivant seule sort de moins en moins. L’entourage attribue ce retrait à l’âge. Une évaluation montre en réalité une baisse de vision non corrigée et une peur de tomber consécutive à une chute sans gravité.',
      'La correction visuelle et un accompagnement à la marche permettent une reprise progressive des sorties. Ce qui avait été interprété comme un effet inévitable de l’âge était en fait accessible à une action.',
    ],
    pros: [
      'L’aide-soignante observe au quotidien des signaux précoces : appétit, déplacements, hygiène, humeur, participation aux activités. Elle est souvent la première à pouvoir dire « quelque chose a changé ».',
      'L’infirmière évalue ces observations, recherche des causes possibles, alerte le médecin et participe à la construction du projet d’accompagnement avec la personne.',
      'La décision appartient à la personne. Le rôle des professionnels est de l’informer, de proposer, et d’accepter un refus tout en laissant la porte ouverte.',
    ],
    questions: [
      {
        q: 'Une personne a besoin d’aide pour se lever mais décide seule de son emploi du temps. Comment décrire sa situation ?',
        choices: [
          { label: 'Elle est dépendante pour certains gestes, mais autonome dans ses décisions', ok: true },
          { label: 'Elle a perdu son autonomie', why: 'L’autonomie concerne la capacité à décider, qui est ici préservée.' },
          { label: 'Elle est indépendante', why: 'L’indépendance suppose de réaliser seule les gestes : ce n’est pas le cas ici.' },
        ],
        explain:
          'Autonomie et indépendance varient séparément. Confondre les deux conduit à décider à la place d’une personne qui est parfaitement en mesure de le faire.',
      },
      {
        q: 'Pourquoi faut-il se méfier de l’explication « c’est normal à son âge » ?',
        choices: [
          { label: 'Parce qu’elle fait renoncer à chercher une cause qui pourrait être traitée', ok: true },
          { label: 'Parce que le vieillissement n’a aucun effet sur la santé', why: 'Le vieillissement a des effets réels : ce n’est pas ce que conteste la fiche.' },
          { label: 'Parce que l’âge ne se mesure pas', why: 'Ce n’est pas la question : le problème est l’arrêt de la recherche de cause.' },
        ],
        explain:
          'Attribuer une difficulté à l’âge clôt la réflexion. Une baisse de vision, un effet de traitement ou une peur après une chute sont des causes identifiables et sur lesquelles on peut agir.',
      },
    ],
    argument: {
      prompt:
        'Expliquez pourquoi il est important de distinguer autonomie et indépendance dans l’accompagnement d’une personne âgée. Donnez un exemple concret et une limite.',
      guidance: [
        'Définissez brièvement les deux termes.',
        'Expliquez ce que change concrètement la confusion entre les deux.',
        'Donnez un exemple fictif.',
        'Indiquez une situation où la distinction devient plus délicate.',
      ],
      reference: [
        'Distinguer autonomie et indépendance évite de décider à la place d’une personne sous prétexte qu’elle a besoin d’aide. L’indépendance concerne les gestes, l’autonomie concerne les choix : une personne peut avoir besoin d’aide pour se lever tout en décidant pleinement de son organisation, de ses sorties et de ses soins.',
        'Dans une situation fictive, une personne accompagnée pour la toilette se voit imposer un horaire au motif qu’elle « ne peut pas faire seule ». Le besoin d’aide a été confondu avec une incapacité à choisir. Lui demander son horaire préféré ne coûte rien et respecte sa décision.',
        'La distinction devient plus difficile lorsque des troubles cognitifs altèrent la capacité à décider. Dans ce cas, le rôle des professionnels est de rechercher les préférences exprimées antérieurement et de solliciter les proches, plutôt que de décider seuls.',
      ],
    },
    sources: [REF.cnsa, REF.drees, REF.has],
  }),

  sheet({
    id: 'H04',
    title: 'Proches aidants',
    purpose: 'Comprendre ce que vivent les proches qui accompagnent au quotidien.',
    def: [
      'Un proche aidant est une personne qui vient en aide, de manière régulière et non professionnelle, à un proche en perte d’autonomie ou en situation de handicap. Il peut s’agir d’un conjoint, d’un enfant, d’un parent, d’un voisin ou d’un ami.',
      'Cette aide recouvre des réalités très différentes : aide aux gestes quotidiens, surveillance, soutien moral, démarches administratives, coordination des intervenants, transport. Beaucoup d’aidants ne se reconnaissent pas dans ce terme et disent simplement « je m’occupe de ma mère ».',
      'La reconnaissance du statut d’aidant s’est développée, avec des dispositifs comme le droit au répit, le congé de proche aidant ou l’aide à la formation. Les conditions d’accès et les montants doivent être vérifiés à la source, car ils évoluent.',
    ],
    vocab: [
      { term: 'Proche aidant', def: 'Personne qui aide régulièrement un proche, sans être un professionnel.' },
      { term: 'Répit', def: 'Temps de pause organisé pour l’aidant, pendant lequel la personne aidée est accompagnée autrement.' },
      { term: 'Accueil de jour', def: 'Structure accueillant la personne quelques heures ou quelques journées par semaine.' },
      { term: 'Hébergement temporaire', def: 'Accueil en établissement pour une durée limitée.' },
      { term: 'Épuisement de l’aidant', def: 'Fatigue physique et psychique durable liée à la charge d’accompagnement.' },
      { term: 'Non-recours', def: 'Fait de ne pas demander une aide à laquelle on a pourtant droit.' },
    ],
    stakes: [
      'La charge est d’abord cumulative : elle s’ajoute souvent à une activité professionnelle et à une vie familiale. Elle est aussi continue, sans horaire ni relève, ce qui la distingue d’un travail.',
      'L’épuisement s’installe progressivement et se remarque tard. L’aidant renonce d’abord à ses loisirs, puis à ses relations, puis parfois à ses propres soins. Quand il consulte, la situation est souvent déjà dégradée.',
      'Le non-recours aux aides est fréquent. Les raisons sont multiples : méconnaissance des dispositifs, complexité des démarches, sentiment que « c’est normal de s’occuper des siens », crainte du regard, ou refus de la personne aidée.',
    ],
    example: [
      'Exemple fictif : une personne accompagne son parent depuis trois ans tout en travaillant à temps plein. Elle a d’abord cessé ses activités du week-end, puis réduit ses contacts avec ses amis. Elle dort mal et repousse ses propres rendez-vous médicaux.',
      'Lors d’une consultation pour son parent, une infirmière lui demande simplement comment elle-même va. L’échange permet d’évoquer un accueil de jour deux demi-journées par semaine, et de l’orienter vers une plateforme de répit. La solution n’est pas spectaculaire, mais elle rend la situation soutenable.',
    ],
    pros: [
      'Poser la question à l’aidant — « et vous, comment allez-vous ? » — fait partie du travail. Beaucoup d’aidants n’évoquent jamais leur propre situation si personne ne la leur demande.',
      'L’infirmière repère les signes d’épuisement, informe sur les dispositifs existants et oriente vers les professionnels compétents, notamment le travailleur social.',
      'L’aidant détient une connaissance fine de la personne : habitudes, préférences, signes d’alerte. L’associer améliore la qualité de l’accompagnement, à condition de ne pas lui transférer des tâches professionnelles.',
    ],
    questions: [
      {
        q: 'Pourquoi l’épuisement d’un proche aidant est-il souvent repéré tardivement ?',
        choices: [
          { label: 'Parce qu’il s’installe progressivement et que l’aidant ne se plaint pas spontanément', ok: true },
          { label: 'Parce qu’il apparaît brutalement, sans signe préalable', why: 'C’est l’inverse : les signes existent, mais ils sont discrets et progressifs.' },
          { label: 'Parce que les aidants refusent toute aide', why: 'Certains refusent, d’autres ignorent simplement que des aides existent. Ce n’est pas l’explication principale du repérage tardif.' },
        ],
        explain:
          'L’épuisement se construit par renoncements successifs, peu visibles de l’extérieur. Comme l’attention se porte sur la personne aidée, l’aidant n’est interrogé sur sa propre situation que si un professionnel y pense.',
      },
      {
        q: 'Qu’appelle-t-on « non-recours » ?',
        choices: [
          { label: 'Le fait de ne pas demander une aide à laquelle on a droit', ok: true },
          { label: 'Le fait qu’une aide soit refusée par l’administration', why: 'Un refus administratif est une décision ; le non-recours désigne une absence de demande.' },
          { label: 'Le fait qu’une aide n’existe pas', why: 'Le non-recours suppose au contraire que l’aide existe.' },
        ],
        explain:
          'Le non-recours désigne l’écart entre les droits ouverts et les droits effectivement demandés. Il s’explique par la méconnaissance, la complexité des démarches ou des représentations personnelles.',
      },
    ],
    argument: {
      prompt:
        'Une structure souhaite mieux accompagner les proches aidants. Expliquez deux difficultés qu’ils peuvent rencontrer, puis proposez une action adaptée.',
      guidance: [
        'Traitez deux difficultés distinctes, pas deux formulations de la même.',
        'Pour chacune, expliquez le mécanisme, pas seulement le constat.',
        'Proposez ensuite une action concrète : qui, quoi, quand, où.',
        'Terminez par une condition de réussite de cette action.',
      ],
      reference: [
        'La première difficulté tient à la continuité de la charge. L’accompagnement d’un proche ne comporte ni horaire ni relève : l’aidant reste disponible en permanence, souvent en plus de son travail. Cette absence de coupure produit une fatigue qui s’installe lentement et que l’aidant finit par considérer comme normale.',
        'La seconde difficulté est la méconnaissance des dispositifs. Beaucoup d’aidants ignorent l’existence de l’accueil de jour, de l’hébergement temporaire ou du congé de proche aidant. S’ajoutent la complexité des démarches et l’idée répandue qu’il serait indigne de demander de l’aide pour s’occuper des siens.',
        'Une action adaptée consisterait à organiser une permanence mensuelle d’information sur les aides, tenue par un travailleur social dans les locaux de la structure, avec une invitation remise directement aux aidants identifiés plutôt qu’une simple affiche. La réussite suppose deux conditions : du temps professionnel réellement dégagé, et des places disponibles dans les dispositifs proposés. Informer sur une aide inaccessible produirait l’effet inverse de celui recherché.',
      ],
      minWords: 120,
    },
    sources: [REF.cnsa, REF.ministere, REF.drees],
  }),

  sheet({
    id: 'H05',
    title: 'Handicap',
    purpose: 'Parler du handicap en termes de situation et d’accessibilité, pas de déficit.',
    def: [
      'La loi du 11 février 2005 définit le handicap comme une limitation d’activité ou une restriction de participation à la vie en société, subie dans son environnement par une personne en raison d’une altération durable d’une ou plusieurs fonctions. La formulation est importante : le handicap résulte de la rencontre entre une situation personnelle et un environnement.',
      'Cette approche est dite situationnelle. Une même altération produit des conséquences très différentes selon que l’environnement est adapté ou non : une personne en fauteuil n’est pas empêchée par son fauteuil mais par l’absence de rampe.',
      'Les formes de handicap sont diverses : moteur, sensoriel, cognitif, psychique, polyhandicap, ainsi que les maladies chroniques invalidantes. Une grande partie des situations de handicap ne sont pas visibles.',
    ],
    vocab: [
      { term: 'Situation de handicap', def: 'Résultat de la rencontre entre une altération de fonction et un environnement non adapté.' },
      { term: 'Accessibilité', def: 'Ensemble des aménagements permettant à chacun d’accéder aux lieux, aux services et à l’information.' },
      { term: 'Compensation', def: 'Moyens mis en place pour réduire les conséquences d’une altération (aides techniques, humaines, aménagements).' },
      { term: 'MDPH', def: 'Maison départementale des personnes handicapées : guichet d’accès aux droits et aux orientations.' },
      { term: 'Inclusion', def: 'Organisation de la société permettant la participation de tous, sans dispositif séparé.' },
      { term: 'Handicap invisible', def: 'Situation de handicap qui ne se voit pas, par exemple liée à une maladie chronique ou à un trouble psychique.' },
    ],
    stakes: [
      'Déplacer le regard du déficit vers la situation change l’action. Si le problème est la personne, on cherche à la « réparer ». Si le problème est la rencontre avec l’environnement, on cherche aussi à modifier l’environnement.',
      'L’accessibilité ne se limite pas aux rampes et aux ascenseurs. Elle concerne aussi l’information : documents en langage simplifié, signalétique lisible, interprétation en langue des signes, délais de parole respectés.',
      'Les situations de handicap invisible exposent à la suspicion. Une personne qui utilise une place réservée sans fauteuil peut se voir interpellée ; c’est une source de fatigue supplémentaire, ajoutée à la situation elle-même.',
    ],
    example: [
      'Exemple fictif : une structure d’accueil remet à toutes les personnes un formulaire en petits caractères, rédigé en langage administratif. Une personne ayant des difficultés de lecture repart sans l’avoir rempli et renonce à sa démarche.',
      'La structure fait alors deux choses : elle produit une version en langage simplifié, avec une phrase par ligne, et elle propose systématiquement une aide au remplissage. Le taux de dossiers complets augmente pour tout le monde, pas seulement pour les personnes concernées au départ.',
    ],
    pros: [
      'Les professionnels s’adressent à la personne elle-même, et non à son accompagnant. Cela paraît évident et c’est pourtant l’une des remarques les plus fréquemment formulées par les personnes concernées.',
      'L’infirmière adapte sa communication : temps de parole, supports visuels, reformulation, vérification de la compréhension. Elle recueille le consentement de la personne, quelle que soit sa situation.',
      'L’aide-soignante participe à l’aménagement concret du quotidien et signale les obstacles matériels qu’elle constate.',
    ],
    questions: [
      {
        q: 'Selon l’approche situationnelle, qu’est-ce qui crée le handicap ?',
        choices: [
          { label: 'La rencontre entre une altération de fonction et un environnement non adapté', ok: true },
          { label: 'Uniquement l’altération de la fonction', why: 'C’est l’approche par le déficit, que la définition légale a précisément dépassée.' },
          { label: 'Uniquement le regard des autres', why: 'Le regard social joue un rôle, mais la définition porte sur la limitation d’activité et la restriction de participation.' },
        ],
        explain:
          'La définition légale insiste sur la limitation « subie dans son environnement ». Le handicap ne se situe ni entièrement dans la personne, ni entièrement à l’extérieur : il naît de leur rencontre.',
      },
      {
        q: 'Pourquoi un document en langage simplifié bénéficie-t-il à tous ?',
        choices: [
          { label: 'Parce qu’un texte clair est plus rapide à comprendre pour n’importe quel lecteur', ok: true },
          { label: 'Parce qu’il est plus court', why: 'Il n’est pas forcément plus court : il est mieux construit.' },
          { label: 'Parce qu’il évite d’avoir à accompagner les personnes', why: 'Un document clair ne remplace pas l’accompagnement, il le facilite.' },
        ],
        explain:
          'Une adaptation pensée pour un public précis profite souvent à l’ensemble des usagers. C’est l’un des arguments centraux de la démarche d’accessibilité.',
      },
    ],
    argument: {
      prompt:
        'Expliquez en quoi rendre un service accessible profite à l’ensemble du public, et non aux seules personnes en situation de handicap. Donnez un exemple et une limite.',
      guidance: [
        'Posez la thèse en une phrase.',
        'Expliquez le mécanisme.',
        'Donnez un exemple fictif précis.',
        'Indiquez ce que l’accessibilité ne suffit pas à résoudre.',
      ],
      reference: [
        'Rendre un service accessible profite à tout le public, parce que les obstacles levés ne gênaient pas uniquement les personnes en situation de handicap. Un texte administratif complexe, une signalétique confuse ou un guichet difficile d’accès ralentissent tous les usagers ; ils excluent seulement les plus exposés.',
        'Dans une structure fictive, la réécriture d’un formulaire en langage simplifié, avec une consigne par ligne, augmente le nombre de dossiers correctement remplis. Les personnes ayant des difficultés de lecture en bénéficient directement, mais aussi celles qui maîtrisent mal le français, celles qui sont fatiguées et celles qui sont pressées.',
        'L’accessibilité ne règle toutefois pas tout. Elle ne remplace pas l’accompagnement humain lorsque la démarche est complexe, ni les moyens de compensation individuels prévus pour des besoins spécifiques. Elle abaisse le seuil d’entrée, elle ne supprime pas les besoins particuliers.',
      ],
    },
    sources: [REF.legifrance, REF.cnsa, REF.ministere],
  }),

  sheet({
    id: 'H06',
    title: 'Précarité et accès aux soins',
    purpose: 'Repérer ce qui empêche concrètement de se soigner.',
    def: [
      'La précarité désigne une instabilité durable qui fragilise l’accès aux droits, au logement, à l’emploi et aux soins. Elle ne se réduit pas à un niveau de revenu : elle combine incertitude, cumul de difficultés et perte progressive de ressources sociales.',
      'Le renoncement aux soins désigne le fait de ne pas engager ou de repousser des soins pourtant nécessaires. Il peut être financier, mais aussi lié aux délais, à la distance, aux horaires, à la complexité administrative ou à la crainte du jugement.',
      'Des dispositifs existent pour réduire ces obstacles, notamment la complémentaire santé solidaire et les permanences d’accès aux soins de santé. Leurs conditions doivent être vérifiées auprès des organismes compétents, car elles évoluent.',
    ],
    vocab: [
      { term: 'Précarité', def: 'Instabilité durable fragilisant l’accès aux droits et aux soins.' },
      { term: 'Renoncement aux soins', def: 'Fait de repousser ou d’abandonner des soins nécessaires.' },
      { term: 'Non-recours', def: 'Fait de ne pas demander une aide à laquelle on a droit.' },
      { term: 'PASS', def: 'Permanence d’accès aux soins de santé : dispositif hospitalier d’accueil des personnes en difficulté.' },
      { term: 'Complémentaire santé solidaire', def: 'Dispositif réduisant ou supprimant le reste à charge sous conditions de ressources.' },
      { term: 'Reste à charge', def: 'Part des dépenses de santé qui demeure à la charge de la personne.' },
    ],
    stakes: [
      'Les obstacles se cumulent. Une personne peut avoir des droits ouverts, mais ne pas pouvoir se déplacer, ni s’absenter de son travail, ni comprendre le courrier reçu. Traiter un seul obstacle laisse souvent la situation inchangée.',
      'Le report de soins transforme des problèmes simples en situations complexes. Une difficulté traitée tôt demande moins de moyens qu’une situation dégradée prise en charge en urgence.',
      'La façon dont une personne est accueillie influence son retour. Une question perçue comme un jugement suffit à décourager une démarche déjà difficile à engager.',
    ],
    example: [
      'Exemple fictif : une personne en emploi précaire repousse un rendez-vous de suivi. Elle a des droits ouverts, mais les horaires proposés tombent pendant son travail, le cabinet est à trois quarts d’heure de transport, et elle ne peut pas avancer les frais.',
      'La structure propose alors des créneaux en début de matinée, informe sur le tiers payant et oriente vers un professionnel plus proche. Aucune de ces mesures n’est spectaculaire, mais leur combinaison lève effectivement les obstacles.',
    ],
    pros: [
      'Les professionnels de proximité sont bien placés pour repérer un renoncement : rendez-vous repoussés, traitement non renouvelé, réponses évasives sur les démarches.',
      'L’infirmière explore les obstacles concrets sans supposer qu’ils sont financiers, informe sur les dispositifs et oriente vers le travailleur social ou la permanence d’accès aux soins.',
      'Le travailleur social intervient sur l’ouverture des droits, qui conditionne souvent tout le reste.',
    ],
    questions: [
      {
        q: 'Le renoncement aux soins est-il toujours financier ?',
        choices: [
          { label: 'Non : les délais, la distance, les horaires et la complexité administrative jouent aussi', ok: true },
          { label: 'Oui, il est toujours lié au coût', why: 'Le coût est un facteur important, mais une personne dont les droits sont ouverts peut renoncer pour d’autres raisons.' },
          { label: 'Non, il est toujours lié à un manque de motivation', why: 'Attribuer le renoncement à la motivation individuelle revient à ignorer les obstacles concrets.' },
        ],
        explain:
          'Le renoncement résulte souvent d’un cumul d’obstacles. C’est pourquoi une réponse purement financière ne suffit pas toujours à ramener une personne vers le soin.',
      },
      {
        q: 'Pourquoi traiter un seul obstacle est-il souvent insuffisant ?',
        choices: [
          { label: 'Parce que les obstacles se cumulent et qu’il suffit qu’un seul demeure pour empêcher la démarche', ok: true },
          { label: 'Parce que les dispositifs sont mal conçus', why: 'La fiche ne porte pas ce jugement : elle décrit un cumul d’obstacles.' },
          { label: 'Parce que les personnes changent d’avis', why: 'Ce n’est pas le mécanisme décrit.' },
        ],
        explain:
          'Une démarche de soin suppose que toutes les conditions soient réunies en même temps : droits, transport, disponibilité, compréhension. Un obstacle restant bloque l’ensemble.',
      },
    ],
    argument: {
      prompt:
        'Expliquez pourquoi lever un seul obstacle à l’accès aux soins ne suffit souvent pas. Illustrez par un exemple et proposez une piste d’amélioration.',
      guidance: [
        'Posez d’abord l’idée du cumul d’obstacles.',
        'Expliquez pourquoi un obstacle restant bloque toute la démarche.',
        'Donnez un exemple fictif avec au moins deux obstacles.',
        'Proposez une piste réaliste, en précisant qui agit.',
      ],
      reference: [
        'Accéder à un soin suppose que plusieurs conditions soient réunies au même moment : avoir des droits ouverts, pouvoir se déplacer, être disponible à l’horaire proposé, comprendre les démarches et pouvoir avancer les frais. Il suffit qu’une seule de ces conditions manque pour que la démarche n’aboutisse pas, quelle que soit la volonté de la personne.',
        'Dans une situation fictive, une personne dispose de droits ouverts mais ne peut s’absenter de son travail aux horaires proposés et ne peut pas avancer les frais. Résoudre uniquement la question financière laisserait le problème d’horaire intact, et le rendez-vous ne serait toujours pas honoré.',
        'Une piste consisterait à recueillir systématiquement, lors de la prise de rendez-vous, les contraintes de la personne — horaires, transport, avance de frais — et à proposer d’emblée une solution pour chacune. Cela suppose du temps de secrétariat et une bonne connaissance des dispositifs disponibles sur le territoire.',
      ],
    },
    sources: [REF.ameli, REF.drees, REF.ministere],
  }),

  sheet({
    id: 'H07',
    title: 'Santé mentale',
    purpose: 'Aborder la santé mentale sans stigmatisation et savoir orienter.',
    def: [
      'La santé mentale n’est pas l’absence de trouble psychique. Elle désigne un état de bien-être permettant de faire face aux difficultés ordinaires de la vie, de travailler et de contribuer à la vie collective. Elle varie au cours de l’existence, comme la santé physique.',
      'On distingue la détresse psychologique, qui est une réaction à une situation difficile, et les troubles psychiques, qui répondent à des critères diagnostiques et relèvent d’une prise en charge spécialisée. Les deux peuvent coexister.',
      'La stigmatisation désigne l’ensemble des représentations négatives associées aux troubles psychiques. Elle a des effets concrets : retard de consultation, isolement, difficultés d’accès au logement et à l’emploi, et parfois moindre attention portée aux problèmes de santé physique.',
    ],
    vocab: [
      { term: 'Santé mentale', def: 'État de bien-être permettant de faire face aux difficultés ordinaires de la vie.' },
      { term: 'Détresse psychologique', def: 'Réaction de souffrance face à une situation difficile, sans constituer nécessairement un trouble.' },
      { term: 'Trouble psychique', def: 'Ensemble de manifestations répondant à des critères diagnostiques.' },
      { term: 'Stigmatisation', def: 'Représentations négatives conduisant à mettre à l’écart une personne ou un groupe.' },
      { term: 'CMP', def: 'Centre médico-psychologique : structure publique de consultation en santé mentale.' },
      { term: 'Réhabilitation psychosociale', def: 'Accompagnement visant à soutenir l’autonomie et la participation sociale.' },
    ],
    stakes: [
      'Les troubles psychiques sont fréquents et souvent invisibles. Les supposer rares conduit à ne pas les envisager face à une personne qui va mal.',
      'La stigmatisation retarde la demande d’aide. Une personne qui craint d’être étiquetée attend, et consulte quand la situation s’est aggravée.',
      'Les personnes vivant avec un trouble psychique ont aussi des besoins de santé physique, parfois moins bien pris en compte. Attribuer systématiquement une plainte physique au trouble psychique est une erreur documentée et dangereuse.',
    ],
    example: [
      'Exemple fictif : une personne accompagnée dit à une aide-soignante qu’elle « ne voit plus l’intérêt de grand-chose » depuis plusieurs semaines. Elle mange moins et ne participe plus aux activités.',
      'L’aide-soignante ne cherche pas à rassurer par une formule toute faite. Elle écoute, reformule ce qu’elle a entendu sans interpréter, demande si la personne souhaite en parler à quelqu’un, et transmet précisément à l’infirmière le jour même. Écouter et transmettre sont ici l’action attendue.',
    ],
    pros: [
      'Le rôle de l’aide-soignante est d’écouter sans juger, de décrire ce qu’elle observe en termes factuels et de transmettre sans délai. Elle ne pose pas de diagnostic et ne minimise pas.',
      'L’infirmière évalue, oriente vers le médecin ou une structure spécialisée, et participe au suivi. Elle veille aussi à ce que les besoins de santé physique ne soient pas négligés.',
      'Les formules du type « il faut vous secouer » ou « d’autres vont plus mal » sont à éviter : elles renforcent le sentiment de ne pas être entendu.',
    ],
    questions: [
      {
        q: 'Quelle attitude est la plus adaptée face à une personne qui exprime une souffrance psychique ?',
        choices: [
          { label: 'Écouter, reformuler sans interpréter, et transmettre à l’infirmière', ok: true },
          { label: 'Rassurer en disant que cela va passer', why: 'Cette réponse ferme l’échange et laisse la personne seule avec sa souffrance.' },
          { label: 'Chercher soi-même la cause et proposer une solution', why: 'L’évaluation relève de professionnels habilités ; proposer une solution sans évaluation peut être inadapté.' },
        ],
        explain:
          'Écouter et transmettre sont pleinement dans le rôle. Interpréter, minimiser ou décider d’une conduite à tenir ne le sont pas.',
      },
      {
        q: 'Pourquoi faut-il se méfier d’attribuer une plainte physique au trouble psychique d’une personne ?',
        choices: [
          { label: 'Parce que cela peut retarder le repérage d’un problème de santé physique réel', ok: true },
          { label: 'Parce que les troubles psychiques n’ont aucun effet sur le corps', why: 'Ils peuvent en avoir : ce n’est pas ce que dit la fiche.' },
          { label: 'Parce que les plaintes physiques sont toujours prioritaires', why: 'Aucune hiérarchie automatique n’est pertinente : chaque plainte doit être évaluée.' },
        ],
        explain:
          'Ce biais est documenté : les plaintes des personnes suivies en psychiatrie sont parfois rapportées trop vite à leur trouble, ce qui retarde le diagnostic de problèmes somatiques.',
      },
    ],
    argument: {
      prompt:
        'Expliquez comment la stigmatisation des troubles psychiques peut retarder l’accès aux soins. Donnez un exemple et proposez une action.',
      guidance: [
        'Définissez brièvement la stigmatisation.',
        'Expliquez par quel mécanisme elle retarde la demande d’aide.',
        'Donnez un exemple fictif.',
        'Proposez une action réaliste au niveau d’une structure.',
      ],
      reference: [
        'La stigmatisation associe aux troubles psychiques des représentations négatives — dangerosité, faiblesse, incapacité — qui n’ont pas de fondement général. Ces représentations conduisent la personne concernée à craindre d’être étiquetée, et donc à différer sa demande d’aide, parfois jusqu’à ce que la situation devienne difficile à redresser.',
        'Dans une situation fictive, une personne repousse une consultation pendant plusieurs mois parce qu’elle redoute que son entourage professionnel l’apprenne. Lorsqu’elle consulte enfin, l’arrêt de travail est plus long qu’il ne l’aurait été au début.',
        'Au niveau d’une structure, une action possible consiste à intégrer la santé mentale aux temps d’information ordinaires, au même titre que la santé physique, plutôt que d’en faire un sujet à part. Parler de sommeil, de charge mentale et de fatigue dans un cadre banal réduit le seuil à franchir pour demander de l’aide. Cela suppose que les professionnels eux-mêmes disposent d’un relais identifié vers qui orienter.',
      ],
    },
    sources: [REF.spf, REF.has, REF.ministere],
  }),

  sheet({
    id: 'H08',
    title: 'Addictions',
    purpose: 'Accompagner sans moraliser, avec la réduction des risques.',
    def: [
      'Une addiction se caractérise par une perte de contrôle sur une consommation ou un comportement, qui se poursuit malgré des conséquences négatives. Elle peut concerner des substances (tabac, alcool, médicaments détournés, drogues illicites) ou des comportements (jeux d’argent, écrans).',
      'On distingue usage, usage à risque, usage nocif et dépendance. Cette gradation est utile : elle évite de traiter toute consommation comme une addiction, et permet d’intervenir avant l’installation de la dépendance.',
      'La réduction des risques est une approche qui vise à limiter les dommages liés à une consommation, sans exiger l’arrêt comme préalable. Elle ne s’oppose pas au sevrage : elle permet de garder un lien avec des personnes qui ne sont pas en mesure d’arrêter à ce moment-là.',
    ],
    vocab: [
      { term: 'Usage à risque', def: 'Consommation qui expose à des dommages, sans qu’ils soient encore survenus.' },
      { term: 'Dépendance', def: 'Besoin de consommer, avec perte de contrôle et symptômes en cas d’arrêt.' },
      { term: 'Réduction des risques', def: 'Ensemble des actions visant à limiter les dommages, sans exiger l’arrêt.' },
      { term: 'Sevrage', def: 'Arrêt de la consommation, souvent accompagné médicalement.' },
      { term: 'CSAPA', def: 'Centre de soins, d’accompagnement et de prévention en addictologie.' },
      { term: 'Rechute', def: 'Reprise de la consommation après une période d’arrêt ; fait partie du parcours et ne signe pas un échec définitif.' },
    ],
    stakes: [
      'Le discours moralisateur est contre-productif. Il provoque le retrait de la personne, qui cesse d’évoquer sa consommation, alors même que la relation est ce qui rend l’accompagnement possible.',
      'La rechute fait partie du parcours. La présenter comme un échec personnel décourage la reprise d’un accompagnement, alors qu’une reprise rapide limite les dommages.',
      'Les addictions s’inscrivent souvent dans un contexte social : conditions de travail, isolement, précarité, antécédents. Les traiter comme un simple défaut de volonté conduit à passer à côté de ce contexte.',
    ],
    example: [
      'Exemple fictif : une personne accompagnée évoque une consommation d’alcool quotidienne. Elle dit ne pas envisager d’arrêter. Le professionnel n’insiste pas sur l’arrêt et ne porte pas de jugement.',
      'Il demande comment elle vit cette consommation, informe sur les risques concrets, notamment l’interaction avec certains traitements, et indique où trouver un accompagnement si elle le souhaite un jour. Le lien est maintenu, et l’information est disponible au moment où elle deviendra utile.',
    ],
    pros: [
      'L’aide-soignante peut recueillir une parole sans la commenter, et transmettre. Elle n’a ni à évaluer la consommation, ni à convaincre d’arrêter.',
      'L’infirmière évalue, informe sur les risques, oriente vers l’addictologie et surveille les interactions avec les traitements. Elle travaille sur ce que la personne accepte, pas sur ce qui serait idéal.',
      'Le respect de la confidentialité est déterminant. Une information sur une consommation qui circulerait au-delà de l’équipe de soin romprait durablement la confiance.',
    ],
    questions: [
      {
        q: 'Que vise la réduction des risques ?',
        choices: [
          { label: 'Limiter les dommages liés à une consommation, sans exiger l’arrêt comme préalable', ok: true },
          { label: 'Obtenir l’arrêt immédiat de la consommation', why: 'C’est l’objectif du sevrage, qui est une autre démarche.' },
          { label: 'Encourager la consommation', why: 'Réduire les dommages n’est pas encourager : c’est agir sur les conséquences.' },
        ],
        explain:
          'La réduction des risques permet d’agir même lorsque l’arrêt n’est pas envisageable, et de maintenir le lien avec la personne. Elle prépare souvent une démarche de sevrage ultérieure.',
      },
      {
        q: 'Comment considérer une rechute ?',
        choices: [
          { label: 'Comme une étape possible du parcours, qui appelle une reprise rapide de l’accompagnement', ok: true },
          { label: 'Comme un échec qui met fin à l’accompagnement', why: 'Cette lecture décourage la personne de revenir, ce qui aggrave les dommages.' },
          { label: 'Comme la preuve d’un manque de volonté', why: 'C’est un jugement moral, contraire à la compréhension actuelle des addictions.' },
        ],
        explain:
          'La rechute est fréquente dans les parcours d’addiction. Ce qui compte est le délai de reprise de l’accompagnement, pas l’absence de rechute.',
      },
    ],
    argument: {
      prompt:
        'Expliquez pourquoi une attitude moralisatrice nuit à l’accompagnement d’une personne présentant une addiction. Donnez un exemple et une limite à votre raisonnement.',
      guidance: [
        'Posez votre position en une phrase.',
        'Expliquez l’effet concret du jugement sur la relation.',
        'Illustrez par une situation fictive.',
        'Indiquez ce que l’absence de jugement ne signifie pas.',
      ],
      reference: [
        'Une attitude moralisatrice nuit à l’accompagnement parce qu’elle rompt le lien qui le rend possible. Une personne qui se sent jugée cesse d’évoquer sa consommation ; le professionnel perd alors l’information dont il aurait besoin pour informer sur les risques, surveiller les interactions médicamenteuses et proposer une aide au bon moment.',
        'Dans une situation fictive, une personne interrogée sur sa consommation d’alcool s’entend répondre qu’elle « devrait faire un effort ». Elle déclare ensuite ne plus boire, ce qui est faux, et l’équipe ne dispose plus d’aucune donnée fiable. Le jugement n’a pas modifié la consommation : il a supprimé la possibilité d’en parler.',
        'Ne pas juger ne signifie pas ne rien dire. Le professionnel informe sur les risques concrets, propose un accompagnement et dit clairement ce qui est dangereux. La différence tient à ce qu’il s’adresse à la consommation et à ses conséquences, non à la valeur de la personne.',
      ],
    },
    sources: [REF.spf, REF.has, REF.ministere],
  }),
]
