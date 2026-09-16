/**
 * Fiches H17 à H24. Contenus originaux, exemples entièrement fictifs.
 */

import type { HealthSheet } from '../types'
import { REF, sheet } from './builder'

export const FICHES_H17_H24: HealthSheet[] = [
  sheet({
    id: 'H17',
    title: 'Santé des femmes et santé sexuelle',
    purpose: 'Prévention, accès et accompagnement, sans jugement.',
    def: [
      'La santé sexuelle est définie comme un état de bien-être physique, mental et social en lien avec la sexualité. Elle suppose l’accès à l’information, à la prévention, à la contraception, au dépistage et à des soins respectueux, sans contrainte ni discrimination.',
      'Plusieurs dispositifs organisent cet accès en France : centres de santé sexuelle, dépistage des infections sexuellement transmissibles, suivi gynécologique, dépistages organisés de certains cancers. Les conditions, les âges et les prises en charge évoluent et doivent être vérifiés à la source.',
      'Les violences faites aux femmes — physiques, psychologiques, sexuelles, économiques — constituent un enjeu de santé publique. Les professionnels de santé sont en position de repérage, ce qui suppose de savoir poser la question et de connaître les relais.',
    ],
    vocab: [
      { term: 'Santé sexuelle', def: 'Bien-être physique, mental et social en lien avec la sexualité.' },
      { term: 'Dépistage organisé', def: 'Programme national proposant un dépistage à une population définie.' },
      { term: 'Contraception', def: 'Ensemble des moyens permettant d’éviter une grossesse non désirée.' },
      { term: 'Violences conjugales', def: 'Violences exercées au sein du couple, sous des formes physiques, psychologiques, sexuelles ou économiques.' },
      { term: 'Confidentialité', def: 'Condition d’accès aux soins, particulièrement déterminante pour les publics jeunes.' },
    ],
    stakes: [
      'Le renoncement au suivi gynécologique s’explique souvent par des expériences antérieures mal vécues, la crainte du jugement ou des contraintes pratiques. La qualité de l’accueil conditionne le retour.',
      'Le repérage des violences suppose de poser la question de façon systématique et neutre, en dehors de la présence du conjoint. Attendre une révélation spontanée conduit à passer à côté de la plupart des situations.',
      'L’information doit être adaptée sans être infantilisante. Une personne peut avoir une connaissance partielle et fausse sans que cela reflète son niveau d’instruction.',
    ],
    example: [
      'Exemple fictif : une structure met en place une question systématique sur les violences, posée à toutes les personnes reçues, seule, dans un cadre neutre : « Vous arrive-t-il de ne pas vous sentir en sécurité chez vous ? »',
      'La question est posée à tout le monde, ce qui évite de cibler quelqu’un. Les professionnels disposent d’une liste de relais, préparée à l’avance. Le repérage augmente sans que l’entretien soit allongé.',
    ],
    pros: [
      'Les professionnels adoptent une posture neutre : pas de jugement sur les pratiques, pas de supposition sur l’orientation ni sur la situation familiale.',
      'L’infirmière informe, oriente, participe au dépistage et connaît les relais spécialisés. Elle veille à la confidentialité de l’entretien.',
      'En cas de révélation de violences, le rôle est d’écouter, de noter précisément, d’informer sur les recours et d’orienter — pas d’enquêter ni de conseiller une conduite personnelle.',
    ],
    questions: [
      {
        q: 'Pourquoi poser la question des violences de façon systématique plutôt que ciblée ?',
        choices: [
          { label: 'Parce que cela évite de désigner quelqu’un et permet de repérer des situations invisibles', ok: true },
          { label: 'Parce que cela fait gagner du temps', why: 'Le temps n’est pas l’argument : c’est la fiabilité du repérage.' },
          { label: 'Parce que la loi l’impose dans tous les cas', why: 'La fiche ne l’affirme pas : la question relève de recommandations professionnelles, à vérifier à la source.' },
        ],
        explain:
          'Une question posée à toutes les personnes ne stigmatise personne et ne suppose pas un repérage préalable, qui est précisément ce qui fait défaut.',
      },
      {
        q: 'Que faire en cas de révélation de violences ?',
        choices: [
          { label: 'Écouter, noter précisément les propos, informer des recours et orienter', ok: true },
          { label: 'Conseiller à la personne de quitter son domicile immédiatement', why: 'Le choix appartient à la personne ; un départ mal préparé peut aussi l’exposer. Le rôle est d’informer et d’orienter.' },
          { label: 'Contacter directement le conjoint pour vérifier', why: 'Cette démarche mettrait la personne en danger et sort totalement du rôle professionnel.' },
        ],
        explain:
          'La conduite professionnelle consiste à recueillir, informer et orienter vers les dispositifs compétents, en respectant les décisions de la personne.',
      },
    ],
    argument: {
      prompt:
        'Expliquez en quoi la qualité de l’accueil influence le recours au suivi de santé. Donnez un exemple et une limite.',
      guidance: ['Posez l’idée.', 'Expliquez le mécanisme.', 'Donnez un exemple fictif.', 'Indiquez ce que l’accueil ne suffit pas à régler.'],
      reference: [
        'La qualité de l’accueil influence directement le recours aux soins, parce qu’une consultation se décide en fonction de l’expérience précédente. Une personne qui s’est sentie jugée, examinée sans explication ou pressée repoussera la consultation suivante, parfois de plusieurs années.',
        'Dans une situation fictive, une personne ayant renoncé à tout suivi gynécologique après une consultation mal vécue reprend un suivi dans une structure où l’on explique chaque geste avant de le faire et où l’on demande systématiquement l’accord. Aucun moyen supplémentaire n’a été mobilisé : seule la manière a changé.',
        'L’accueil ne règle cependant pas les obstacles matériels : délais, distance, horaires, avance de frais. Améliorer la relation sans agir sur ces conditions laisserait de côté une partie du public concerné.',
      ],
    },
    sources: [REF.spf, REF.has, REF.ministere],
  }),

  sheet({
    id: 'H18',
    title: 'Travail et santé des professionnels',
    purpose: 'Comprendre l’usure professionnelle et ce qui la prévient.',
    def: [
      'La santé au travail dépend des conditions d’exercice : charge physique, horaires, rythme, marges d’autonomie, soutien de l’équipe, reconnaissance, sens du travail. Les métiers du soin cumulent plusieurs facteurs de contrainte.',
      'L’épuisement professionnel se caractérise par un épuisement émotionnel, une prise de distance excessive vis-à-vis du travail et un sentiment de perte d’efficacité. Il est le résultat d’une exposition prolongée à des contraintes, pas d’une fragilité individuelle.',
      'Les troubles musculo-squelettiques sont fréquents dans les métiers du soin. Leur prévention passe par les équipements, l’organisation et la formation aux gestes, plus que par la seule vigilance individuelle.',
    ],
    vocab: [
      { term: 'Usure professionnelle', def: 'Altération progressive de la santé liée à une exposition durable à des contraintes de travail.' },
      { term: 'Épuisement professionnel', def: 'État associant épuisement émotionnel, distance excessive et sentiment d’inefficacité.' },
      { term: 'Troubles musculo-squelettiques', def: 'Atteintes des articulations, muscles et tendons liées aux contraintes physiques du travail.' },
      { term: 'Prévention des risques professionnels', def: 'Démarche d’identification et de réduction des risques liés au travail.' },
      { term: 'Collectif de travail', def: 'Ressource majeure de protection : possibilité de demander de l’aide et d’échanger sur les difficultés.' },
    ],
    stakes: [
      'Présenter l’épuisement comme un problème de résistance individuelle empêche d’agir sur les causes et culpabilise les personnes concernées.',
      'Le collectif de travail joue un rôle protecteur documenté. Quand il se délite — équipes instables, absence de temps d’échange — les difficultés deviennent individuelles.',
      'La santé des professionnels a un effet direct sur la qualité des soins. Ce n’est pas une question annexe : absentéisme, turnover et fatigue affectent la continuité de la prise en charge.',
    ],
    example: [
      'Exemple fictif : une équipe signale une fatigue croissante. L’analyse montre que les temps de transmission ont été supprimés pour gagner du temps, ce qui a supprimé le seul moment d’échange collectif de la journée.',
      'Le rétablissement d’un temps de transmission protégé de quinze minutes améliore à la fois la circulation de l’information et le sentiment de soutien. Ce qui paraissait un gain de temps produisait en réalité de l’isolement.',
    ],
    pros: [
      'Demander de l’aide n’est pas un aveu de faiblesse : c’est une pratique professionnelle qui protège la personne accompagnée autant que le professionnel.',
      'Le service de santé au travail et l’encadrement sont des interlocuteurs sur ces questions, au même titre que l’équipe.',
      'Une personne en reconversion, comme une aide-soignante entrant en formation infirmière, gagne à identifier tôt ses points d’appui : organisation, soutien de l’employeur, ressources de l’équipe.',
    ],
    questions: [
      {
        q: 'L’épuisement professionnel est-il le signe d’une fragilité individuelle ?',
        choices: [
          { label: 'Non : il résulte d’une exposition prolongée à des contraintes de travail', ok: true },
          { label: 'Oui, certaines personnes y sont prédisposées', why: 'Réduire l’épuisement à une caractéristique individuelle empêche d’agir sur les conditions de travail.' },
        ],
        explain:
          'La définition met l’accent sur l’exposition prolongée. C’est ce qui justifie une démarche de prévention collective plutôt qu’un accompagnement uniquement individuel.',
      },
      {
        q: 'Pourquoi supprimer un temps de transmission peut-il dégrader la situation ?',
        choices: [
          { label: 'Parce que c’est souvent le seul moment d’échange collectif, qui a un rôle protecteur', ok: true },
          { label: 'Parce que cela fait perdre du temps', why: 'C’est l’inverse : la suppression visait à en gagner. L’effet négatif porte sur le collectif.' },
        ],
        explain:
          'Le collectif de travail protège. Supprimer les espaces où il se construit isole les professionnels, même si l’organisation paraît plus efficace sur le papier.',
      },
    ],
    argument: {
      prompt:
        'Expliquez pourquoi la santé des professionnels est aussi une question de qualité des soins. Donnez un exemple et une limite.',
      guidance: ['Posez l’idée.', 'Expliquez le lien.', 'Donnez un exemple fictif.', 'Indiquez une limite.'],
      reference: [
        'La santé des professionnels est une question de qualité des soins parce que les deux dépendent des mêmes conditions. Une équipe épuisée dispose de moins de temps d’échange, de moins de disponibilité relationnelle et de plus de turnover ; la continuité de la prise en charge s’en trouve directement affectée.',
        'Dans une situation fictive, la suppression d’un temps de transmission de quinze minutes est décidée pour gagner du temps. Six mois plus tard, l’équipe signale une fatigue accrue et des informations perdues entre les relèves. Le rétablissement de ce temps améliore simultanément le climat de travail et la fiabilité des transmissions.',
        'Ce raisonnement a une limite : il ne doit pas conduire à ne s’intéresser à la santé des professionnels que pour ses effets sur les soins. Elle constitue un objectif en soi, indépendamment de son rendement.',
      ],
    },
    sources: [REF.ministere, REF.has, REF.drees],
  }),

  sheet({
    id: 'H19',
    title: 'Environnement et santé',
    purpose: 'Relier chaleur, pollution et vulnérabilités.',
    def: [
      'L’environnement influence la santé par de multiples voies : qualité de l’air, température, bruit, qualité de l’eau, exposition à des substances, qualité du logement. Ces expositions sont inégalement réparties dans la population.',
      'Les vagues de chaleur ont des effets documentés, particulièrement chez les personnes âgées, les nourrissons, les personnes atteintes de maladies chroniques et les personnes isolées ou mal logées. Certains traitements majorent le risque.',
      'La notion de vulnérabilité est ici centrale : elle ne dépend pas seulement de l’état de santé, mais aussi du logement, de l’isolement social et de la possibilité de se protéger.',
    ],
    vocab: [
      { term: 'Vague de chaleur', def: 'Période de températures anormalement élevées, avec effets sanitaires documentés.' },
      { term: 'Îlot de chaleur urbain', def: 'Différence de température entre une zone urbaine dense et sa périphérie.' },
      { term: 'Qualité de l’air intérieur', def: 'Composition de l’air des espaces clos, influencée par l’aération et les produits utilisés.' },
      { term: 'Précarité énergétique', def: 'Difficulté à chauffer ou rafraîchir son logement pour des raisons financières.' },
      { term: 'Vulnérabilité', def: 'Exposition accrue aux effets d’un facteur environnemental, liée à l’état de santé et aux conditions de vie.' },
    ],
    stakes: [
      'Les effets d’une vague de chaleur dépendent moins de la température elle-même que de la capacité à s’en protéger : logement, isolement, accès à un lieu frais, possibilité de s’hydrater.',
      'Les personnes isolées cumulent les risques : personne ne remarque une dégradation, et personne ne propose d’aide.',
      'Les conseils généraux — boire, se rafraîchir — sont utiles mais insuffisants s’ils ne s’accompagnent pas d’un repérage actif des personnes les plus exposées.',
    ],
    example: [
      'Exemple fictif : une commune établit avant l’été une liste de personnes isolées qui acceptent d’être contactées en cas de forte chaleur. Un appel quotidien est organisé pendant l’épisode, et un lieu frais est identifié.',
      'Le dispositif repose sur un recensement préparé à l’avance et sur l’accord des personnes. Improvisé pendant l’épisode, il n’atteindrait pas les personnes les plus isolées, faute de savoir qui elles sont.',
    ],
    pros: [
      'Les professionnels intervenant à domicile repèrent des conditions de logement invisibles autrement : chaleur excessive, absence de volets, impossibilité d’aérer.',
      'L’infirmière adapte la surveillance en période de forte chaleur, en tenant compte des traitements et de l’état de santé, et alerte quand la situation le nécessite.',
      'Le signalement de conditions de logement problématiques relève aussi du rôle, en lien avec le travailleur social.',
    ],
    questions: [
      {
        q: 'Qu’est-ce qui détermine principalement le risque lié à une vague de chaleur ?',
        choices: [
          { label: 'La capacité à s’en protéger : logement, isolement, accès à un lieu frais', ok: true },
          { label: 'Uniquement la température extérieure', why: 'À température égale, les effets diffèrent fortement selon les conditions de vie.' },
          { label: 'Uniquement l’âge', why: 'L’âge est un facteur, mais il n’explique pas seul les écarts observés.' },
        ],
        explain:
          'La vulnérabilité résulte de la combinaison entre l’état de santé et les conditions concrètes de vie. C’est pourquoi le repérage porte autant sur le logement et l’isolement que sur l’âge.',
      },
      {
        q: 'Pourquoi un dispositif de veille doit-il être préparé avant l’épisode ?',
        choices: [
          { label: 'Parce qu’il faut savoir à l’avance qui contacter, et avoir leur accord', ok: true },
          { label: 'Parce que c’est plus économique', why: 'Le coût n’est pas l’argument principal.' },
        ],
        explain:
          'Les personnes les plus isolées sont précisément celles qu’on ne trouve pas dans l’urgence. Le recensement préalable est la condition d’efficacité.',
      },
    ],
    argument: {
      prompt:
        'Expliquez pourquoi les conseils de prévention ne suffisent pas en période de forte chaleur. Proposez une action complémentaire.',
      guidance: ['Posez l’idée.', 'Expliquez la limite des conseils.', 'Donnez un exemple fictif.', 'Proposez une action avec sa condition de réussite.'],
      reference: [
        'Les conseils de prévention — boire régulièrement, rester au frais, aérer la nuit — ne suffisent pas, parce qu’ils supposent des conditions matérielles qui ne sont pas toujours réunies. Une personne vivant sous les toits, sans volets, et qui ne sort plus, ne peut appliquer aucun de ces conseils, quelle que soit sa bonne volonté.',
        'Dans une commune fictive, l’information avait été largement diffusée, mais les situations les plus critiques concernaient des personnes isolées que personne n’avait contactées. Les conseils avaient atteint ceux qui pouvaient déjà se protéger.',
        'Une action complémentaire consiste à constituer avant l’été, avec leur accord, une liste des personnes isolées à contacter, et à organiser des appels quotidiens pendant l’épisode. La réussite suppose que le recensement soit fait à l’avance : improvisé pendant la vague de chaleur, il manquerait précisément les personnes les plus isolées.',
      ],
    },
    sources: [REF.spf, REF.ministere],
  }),

  sheet({
    id: 'H20',
    title: 'Numérique en santé',
    purpose: 'Confidentialité, exclusion numérique et esprit critique.',
    def: [
      'Le numérique en santé recouvre la prise de rendez-vous en ligne, le dossier médical partagé, la télésanté, les outils de coordination entre professionnels et les applications destinées aux personnes.',
      'L’illectronisme désigne la difficulté à utiliser les outils numériques. Il concerne une part non négligeable de la population et ne se réduit pas à l’âge : il dépend de l’équipement, de la connexion, de la maîtrise de la langue écrite et de l’habitude.',
      'Les données de santé sont des données sensibles au sens du règlement général sur la protection des données. Leur traitement est encadré ; les règles applicables doivent être vérifiées sur les sources officielles.',
    ],
    vocab: [
      { term: 'Illectronisme', def: 'Difficulté à utiliser les outils numériques usuels.' },
      { term: 'Télésanté', def: 'Ensemble des pratiques de santé à distance, dont la téléconsultation.' },
      { term: 'Donnée de santé', def: 'Information relative à la santé d’une personne, soumise à une protection renforcée.' },
      { term: 'Dossier médical partagé', def: 'Espace numérique regroupant des informations de santé accessibles aux professionnels autorisés.' },
      { term: 'Fracture numérique', def: 'Écart d’accès et d’usage des outils numériques entre groupes de population.' },
    ],
    stakes: [
      'Le passage au tout numérique crée un obstacle supplémentaire pour les personnes déjà éloignées des démarches. Maintenir une alternative — téléphone, guichet — n’est pas un confort mais une condition d’accès aux droits.',
      'La confidentialité se joue aussi dans des gestes matériels : écran visible depuis un couloir, session non fermée, échanges par messagerie non sécurisée.',
      'L’information de santé disponible en ligne est de qualité très inégale. Savoir orienter vers des sources fiables fait partie du rôle professionnel, tout comme savoir dire qu’on ne sait pas.',
    ],
    example: [
      'Exemple fictif : une structure remplace l’accueil téléphonique par une prise de rendez-vous exclusivement en ligne. Le nombre de premiers rendez-vous diminue chez les personnes de plus de 75 ans et chez celles qui ne maîtrisent pas le français écrit.',
      'Le rétablissement d’une ligne téléphonique quelques heures par jour, en complément de l’outil en ligne, rétablit l’accès sans supprimer le gain d’organisation pour les autres usagers.',
    ],
    pros: [
      'Proposer une alternative non numérique fait partie de l’accueil. Le refus ou l’incapacité d’utiliser un outil n’a pas à être justifié par la personne.',
      'L’infirmière veille à la confidentialité des supports numériques et explique à la personne ce qui est enregistré et qui peut y accéder.',
      'Orienter vers une source fiable, ou dire clairement qu’on va vérifier, vaut mieux qu’une réponse approximative.',
    ],
    questions: [
      {
        q: 'Pourquoi maintenir une alternative non numérique est-il nécessaire ?',
        choices: [
          { label: 'Parce que sans elle, une partie du public perd l’accès à ses droits', ok: true },
          { label: 'Parce que le numérique est peu fiable', why: 'La fiabilité technique n’est pas la question ici : c’est l’accès du public.' },
          { label: 'Parce que cela coûte moins cher', why: 'Ce n’est pas l’argument avancé.' },
        ],
        explain:
          'Une procédure existante mais inaccessible équivaut, pour la personne concernée, à une procédure inexistante.',
      },
      {
        q: 'L’illectronisme concerne-t-il uniquement les personnes âgées ?',
        choices: [
          { label: 'Non : il dépend aussi de l’équipement, de la connexion et de la maîtrise de l’écrit', ok: true },
          { label: 'Oui, il est lié à l’âge', why: 'L’âge est un facteur parmi d’autres, et il ne suffit pas à expliquer les difficultés observées.' },
        ],
        explain:
          'Supposer que seules les personnes âgées sont concernées conduit à ne pas proposer d’aide à d’autres publics qui en auraient besoin.',
      },
    ],
    argument: {
      prompt:
        'Expliquez pourquoi la dématérialisation d’une démarche peut réduire l’accès aux droits. Proposez une mesure d’accompagnement.',
      guidance: ['Posez l’idée.', 'Expliquez le mécanisme.', 'Donnez un exemple fictif.', 'Proposez une mesure et sa condition.'],
      reference: [
        'La dématérialisation d’une démarche peut réduire l’accès aux droits, parce qu’elle déplace la charge vers l’usager : il lui faut un équipement, une connexion, une adresse électronique, une maîtrise suffisante de l’écrit et la capacité de suivre une procédure sans interlocuteur. Chacune de ces conditions élimine une partie du public.',
        'Dans une structure fictive, le remplacement de l’accueil téléphonique par une prise de rendez-vous exclusivement en ligne s’accompagne d’une baisse des premiers rendez-vous chez les personnes âgées et chez celles qui ne lisent pas facilement le français. La procédure existe toujours, mais elle est devenue inaccessible pour elles.',
        'Une mesure d’accompagnement consiste à maintenir une ligne téléphonique sur des plages identifiées et à proposer une aide au remplissage sur place. La condition de réussite est que cette alternative soit annoncée aussi visiblement que l’outil en ligne : une solution de secours que personne ne connaît ne remplit pas sa fonction.',
      ],
    },
    sources: [REF.ministere, REF.ameli, REF.drees],
  }),

  sheet({
    id: 'H21',
    title: 'Communication interculturelle',
    purpose: 'Se faire comprendre malgré la langue et les représentations.',
    def: [
      'La communication interculturelle en santé désigne l’ensemble des ajustements permettant de se comprendre lorsque la langue, les références culturelles ou les représentations de la maladie diffèrent.',
      'La barrière de la langue est le premier obstacle, mais pas le seul. Les représentations de la maladie, du corps, de la douleur et de la place de la famille varient et influencent la façon dont une personne exprime ce qu’elle ressent.',
      'Le recours à un interprète professionnel est recommandé plutôt que la traduction par un proche, en particulier un enfant : le proche filtre, résume et peut être placé dans une position difficile.',
    ],
    vocab: [
      { term: 'Interprétariat professionnel', def: 'Intervention d’un interprète formé, tenu à la confidentialité et à la neutralité.' },
      { term: 'Littératie en santé', def: 'Capacité à trouver, comprendre et utiliser une information de santé.' },
      { term: 'Représentation de la maladie', def: 'Façon dont une personne se explique sa maladie, ses causes et son évolution.' },
      { term: 'Reformulation', def: 'Vérification de la compréhension en demandant à la personne de redire ce qu’elle a compris.' },
      { term: 'Stéréotype', def: 'Généralisation appliquée à une personne au motif de son appartenance supposée à un groupe.' },
    ],
    stakes: [
      'Confier la traduction à un enfant place celui-ci dans une position inadaptée et prive l’échange de fiabilité. Cette pratique reste fréquente faute d’organisation.',
      'Les stéréotypes culturels conduisent à supposer des comportements au lieu de les vérifier. La question « qu’est-ce qui est important pour vous ? » remplace avantageusement toute supposition.',
      'Vérifier la compréhension en demandant une reformulation est plus fiable que demander « avez-vous compris ? », question à laquelle la plupart des gens répondent oui.',
    ],
    example: [
      'Exemple fictif : une consultation est traduite par la fille adolescente d’une personne. Plusieurs informations sensibles ne sont pas transmises, et l’adolescente se trouve chargée d’annoncer des éléments difficiles.',
      'La structure organise ensuite le recours à un service d’interprétariat par téléphone. La consultation dure quelques minutes de plus, mais l’information passe réellement dans les deux sens et l’adolescente retrouve sa place.',
    ],
    pros: [
      'Parler lentement, avec des phrases courtes et un vocabulaire simple, aide tout le monde, y compris les personnes francophones.',
      'L’infirmière vérifie la compréhension par la reformulation, adapte ses supports et sollicite un interprète quand c’est nécessaire.',
      'Demander plutôt que supposer : les préférences d’une personne ne se déduisent ni de son nom, ni de son origine supposée.',
    ],
    questions: [
      {
        q: 'Pourquoi éviter de faire traduire par un enfant de la famille ?',
        choices: [
          { label: 'Parce que cela le place dans une position inadaptée et rend la transmission peu fiable', ok: true },
          { label: 'Parce que les enfants parlent mal les deux langues', why: 'Ce n’est pas le problème : beaucoup sont bilingues. Les difficultés portent sur le rôle et la fidélité de la transmission.' },
          { label: 'Parce que c’est interdit par la loi', why: 'La fiche n’affirme pas d’interdiction légale : il s’agit d’une recommandation professionnelle.' },
        ],
        explain:
          'Un proche filtre, résume et protège. Un enfant se voit en outre confier des informations et un rôle qui ne lui reviennent pas.',
      },
      {
        q: 'Comment vérifier efficacement qu’une information a été comprise ?',
        choices: [
          { label: 'En demandant à la personne de redire avec ses mots ce qu’elle a compris', ok: true },
          { label: 'En demandant « avez-vous compris ? »', why: 'La plupart des personnes répondent oui, par politesse ou par gêne, sans que la compréhension soit assurée.' },
          { label: 'En remettant un document écrit', why: 'Le document complète, mais ne vérifie rien par lui-même.' },
        ],
        explain:
          'La reformulation par la personne est le seul moyen simple de constater ce qui est réellement passé.',
      },
    ],
    argument: {
      prompt:
        'Expliquez pourquoi supposer des préférences à partir de l’origine d’une personne est une erreur professionnelle. Donnez un exemple et une alternative.',
      guidance: ['Posez l’idée.', 'Expliquez l’erreur de raisonnement.', 'Donnez un exemple fictif.', 'Proposez une pratique alternative.'],
      reference: [
        'Supposer les préférences d’une personne à partir de son origine est une erreur professionnelle, parce que cela revient à appliquer à un individu une généralisation qui ne le concerne peut-être pas. Deux personnes du même pays, de la même famille parfois, peuvent avoir des attentes opposées.',
        'Dans une situation fictive, une équipe organise un accompagnement en supposant qu’une personne souhaiterait la présence permanente de sa famille. L’intéressée souhaitait au contraire des temps seule, qu’elle n’a pas osé demander parce que l’organisation semblait déjà décidée.',
        'L’alternative est simple et tient en une question posée dès le début : « qu’est-ce qui est important pour vous dans la façon dont nous vous accompagnons ? » Cette question ne coûte rien, elle s’applique à tout le monde, et elle remplace toutes les suppositions par une information vérifiée.',
      ],
    },
    sources: [REF.has, REF.ministere],
  }),

  sheet({
    id: 'H22',
    title: 'Démographie et organisation des soins',
    purpose: 'Relier besoins de la population et organisation, sans prendre parti.',
    def: [
      'L’évolution démographique française se caractérise par un allongement de l’espérance de vie et un vieillissement de la population. Ces évolutions modifient la nature des besoins de soins : davantage de situations chroniques et de besoins d’accompagnement dans la durée.',
      'La démographie des professionnels de santé évolue elle aussi : nombre de professionnels formés, répartition sur le territoire, modes d’exercice, part du temps partiel. Ces éléments conditionnent l’offre disponible localement.',
      'Les chiffres relatifs à ces évolutions doivent toujours être cités avec leur source et leur date. Ils évoluent, et une donnée ancienne peut conduire à un raisonnement faux.',
    ],
    vocab: [
      { term: 'Espérance de vie', def: 'Durée de vie moyenne d’une génération dans les conditions de mortalité observées.' },
      { term: 'Vieillissement de la population', def: 'Augmentation de la part des personnes âgées dans la population totale.' },
      { term: 'Densité médicale', def: 'Nombre de professionnels rapporté à la population d’un territoire.' },
      { term: 'Exercice coordonné', def: 'Organisation associant plusieurs professionnels autour d’une patientèle commune.' },
      { term: 'Continuité des soins', def: 'Organisation garantissant une réponse aux besoins en dehors des horaires habituels.' },
    ],
    stakes: [
      'Les besoins évoluent vers l’accompagnement durable plutôt que vers l’épisode de soin isolé. Cela déplace l’enjeu vers la coordination et le suivi.',
      'Les écarts entre territoires sont importants. Une moyenne nationale ne décrit correctement aucune situation locale.',
      'Le sujet est politiquement discuté. Un écrit de concours attend une analyse des mécanismes, pas une prise de position partisane.',
    ],
    example: [
      'Exemple fictif : dans un territoire, le nombre de personnes suivies pour une maladie chronique augmente, tandis que plusieurs médecins partent en retraite sans être remplacés.',
      'La réponse locale combine plusieurs leviers : exercice coordonné entre professionnels, protocoles permettant à d’autres professionnels de prendre en charge certaines situations, et organisation de consultations avancées. Aucune mesure isolée ne suffit.',
    ],
    pros: [
      'Comprendre l’organisation locale permet d’orienter correctement une personne, plutôt que de la renvoyer vers une structure saturée ou inadaptée.',
      'L’infirmière occupe une place croissante dans la coordination et dans certaines prises en charge protocolées.',
      'Sur ces sujets, le rôle du professionnel est d’expliquer l’organisation existante, pas de commenter les choix politiques devant les personnes accompagnées.',
    ],
    questions: [
      {
        q: 'Pourquoi une moyenne nationale décrit-elle mal une situation locale ?',
        choices: [
          { label: 'Parce que les écarts entre territoires sont importants', ok: true },
          { label: 'Parce que les moyennes sont toujours fausses', why: 'Une moyenne n’est pas fausse : elle résume, ce qui est différent.' },
        ],
        explain:
          'Une moyenne masque la dispersion. Sur des sujets d’offre de soins, deux territoires peuvent avoir des réalités opposées autour d’une même moyenne.',
      },
      {
        q: 'Comment traiter ce type de sujet dans un écrit de concours ?',
        choices: [
          { label: 'En expliquant les mécanismes et en citant ses sources, sans prendre parti politiquement', ok: true },
          { label: 'En affirmant ce qui devrait être fait par le gouvernement', why: 'Un écrit de sélection attend une analyse, pas une prise de position partisane.' },
          { label: 'En évitant complètement le sujet', why: 'Le sujet relève pleinement de la culture sanitaire et sociale attendue.' },
        ],
        explain:
          'Le correcteur évalue la capacité d’analyse. Une position personnelle nuancée et argumentée est recevable ; un discours partisan ne l’est pas.',
      },
    ],
    argument: {
      prompt:
        'Expliquez pourquoi l’allongement de l’espérance de vie modifie la nature des besoins de soins. Donnez un exemple et une nuance.',
      guidance: ['Posez l’idée.', 'Expliquez le déplacement des besoins.', 'Donnez un exemple fictif.', 'Apportez une nuance.'],
      reference: [
        'L’allongement de l’espérance de vie modifie la nature des besoins de soins, parce qu’il s’accompagne d’une part croissante de situations chroniques. Le besoin se déplace de l’épisode aigu, ponctuel et hospitalier, vers un accompagnement durable qui associe plusieurs professionnels sur des années.',
        'Dans un territoire fictif, l’augmentation du nombre de personnes suivies pour une maladie chronique n’appelle pas davantage de lits d’hospitalisation mais davantage de coordination : suivi régulier, éducation thérapeutique, articulation entre ville et hôpital, et soutien aux proches.',
        'Une nuance s’impose : vieillissement n’est pas synonyme de dépendance. Une part importante des personnes âgées vit sans perte d’autonomie notable, et raisonner comme si l’âge impliquait mécaniquement un besoin de soins conduirait à surestimer certains besoins tout en négligeant ceux d’autres publics.',
      ],
    },
    sources: [REF.insee, REF.drees, REF.ministere],
  }),

  sheet({
    id: 'H23',
    title: 'Information fiable et esprit critique',
    purpose: 'Distinguer un fait d’une opinion, vérifier une source et une date.',
    def: [
      'Un fait est vérifiable : il peut être confronté à une source. Une opinion exprime un point de vue. Les deux sont légitimes dans un écrit, à condition d’être distingués.',
      'Évaluer une information suppose quatre questions : qui l’a produite, quand, sur quelle base, et dans quel but. Une information sans auteur ni date ne peut pas être évaluée.',
      'Les sources institutionnelles — Santé publique France, Haute Autorité de santé, ministères, Assurance maladie, DREES, INSEE, Légifrance — sont à privilégier pour les règles, les recommandations et les chiffres.',
    ],
    vocab: [
      { term: 'Source primaire', def: 'Document d’origine produisant l’information (texte de loi, étude, rapport officiel).' },
      { term: 'Source secondaire', def: 'Document qui reprend et commente une source primaire.' },
      { term: 'Biais de confirmation', def: 'Tendance à retenir surtout ce qui confirme ce que l’on pense déjà.' },
      { term: 'Corrélation', def: 'Lien statistique entre deux variables, qui n’établit pas à lui seul une cause.' },
      { term: 'Date de mise à jour', def: 'Élément indispensable pour juger de la validité d’une information réglementaire ou chiffrée.' },
    ],
    stakes: [
      'Citer un chiffre sans date est risqué : les données évoluent, et une donnée ancienne peut soutenir un raisonnement devenu faux.',
      'Confondre corrélation et causalité est l’erreur la plus fréquente sur les sujets de santé. Deux phénomènes qui évoluent ensemble ne s’expliquent pas forcément l’un l’autre.',
      'Dire « je ne sais pas, je vais vérifier » est une réponse professionnelle. Affirmer une règle de mémoire, sur un sujet qui évolue, ne l’est pas.',
    ],
    example: [
      'Exemple fictif : un document affirme qu’une aide est accessible sous certaines conditions de ressources. Le document ne porte aucune date et ne cite aucune source.',
      'La vérification sur le site de l’organisme compétent montre que les conditions ont été modifiées. L’information n’était pas fausse au moment où elle a été écrite : elle est devenue inexacte, ce qui est indétectable sans date.',
    ],
    pros: [
      'Avant de transmettre une information réglementaire à une personne, il est prudent de vérifier sa date de mise à jour.',
      'L’infirmière oriente vers des sources fiables et explique comment les reconnaître, ce qui relève aussi de l’éducation pour la santé.',
      'Reconnaître une incertitude renforce la crédibilité professionnelle au lieu de l’affaiblir.',
    ],
    questions: [
      {
        q: 'Deux phénomènes évoluent ensemble. Que peut-on en conclure ?',
        choices: [
          { label: 'Qu’il existe une corrélation, ce qui ne suffit pas à établir une cause', ok: true },
          { label: 'Que le premier cause le second', why: 'C’est l’erreur classique : une corrélation peut venir d’un troisième facteur ou du hasard.' },
          { label: 'Qu’il n’y a aucun lien', why: 'La corrélation existe : elle n’établit simplement pas sa nature.' },
        ],
        explain:
          'Établir une causalité demande d’autres éléments : mécanisme plausible, antériorité, élimination des facteurs de confusion.',
      },
      {
        q: 'Pourquoi la date d’une information est-elle déterminante ?',
        choices: [
          { label: 'Parce qu’une information exacte à une date donnée peut être devenue inexacte', ok: true },
          { label: 'Parce que les informations anciennes sont toujours fausses', why: 'Elles ne le sont pas toujours : la date permet simplement de le vérifier.' },
        ],
        explain:
          'Sur les règles de droit, les dispositifs et les chiffres, la date est ce qui permet de savoir si l’information est encore applicable.',
      },
    ],
    argument: {
      prompt:
        'Expliquez pourquoi citer une source et une date est indispensable sur un sujet sanitaire. Donnez un exemple et une limite.',
      guidance: ['Posez l’idée.', 'Expliquez le mécanisme.', 'Donnez un exemple fictif.', 'Indiquez ce que la citation de source ne garantit pas.'],
      reference: [
        'Citer une source et une date est indispensable, parce que les règles, les dispositifs et les chiffres évoluent. Sans ces deux éléments, il est impossible de savoir si une information est encore applicable, et impossible pour un lecteur de la vérifier.',
        'Dans une situation fictive, un document interne indique des conditions de ressources pour l’accès à une aide, sans date ni source. Les conditions ont été modifiées depuis. L’information n’était pas fausse au moment de sa rédaction : elle est devenue inexacte, ce qui était indétectable en l’absence de date.',
        'Citer une source ne garantit toutefois pas la qualité du raisonnement. On peut citer correctement une donnée et en tirer une conclusion abusive, par exemple en confondant corrélation et causalité. La rigueur sur les sources est nécessaire, elle n’est pas suffisante.',
      ],
    },
    sources: [REF.spf, REF.has, REF.insee, REF.legifrance],
  }),

  sheet({
    id: 'H24',
    title: 'Travailler un sujet d’actualité',
    purpose: 'Travailler un sujet récent sans prétendre deviner le sujet du jour J.',
    def: [
      'Un sujet d’actualité en santé n’est pas un sujet qu’il faudrait avoir mémorisé. C’est un support sur lequel on attend une méthode : comprendre, situer, analyser, argumenter.',
      'Aucune préparation ne peut prédire le sujet proposé. En revanche, une méthode stable permet de traiter n’importe quel sujet du champ sanitaire et social, même inconnu.',
      'La méthode tient en cinq temps : identifier de quoi il s’agit, dire qui est concerné, expliquer les mécanismes en jeu, situer le rôle des professionnels, formuler une position nuancée.',
    ],
    vocab: [
      { term: 'Problématique', def: 'Question centrale que pose un sujet, au-delà de son thème.' },
      { term: 'Enjeu', def: 'Ce qui est en question : ce qu’on risque de perdre ou de gagner.' },
      { term: 'Acteurs', def: 'Personnes et institutions concernées ou en capacité d’agir.' },
      { term: 'Position nuancée', def: 'Prise de position qui reconnaît une limite ou une objection.' },
      { term: 'Veille', def: 'Suivi régulier de quelques sources fiables, plutôt que lecture massive et ponctuelle.' },
    ],
    stakes: [
      'Chercher à mémoriser un maximum de sujets produit une connaissance fragile et anxiogène. Une méthode applicable partout est plus solide et plus rassurante.',
      'Les sujets du champ sanitaire et social se recoupent largement. Maîtriser une dizaine de notions transversales — prévention, accès aux soins, autonomie, coordination, inégalités — permet de traiter la plupart des sujets.',
      'Une veille régulière et légère sur deux ou trois sources fiables vaut mieux qu’une accumulation de dernière minute.',
    ],
    example: [
      'Exemple fictif : un sujet porte sur les difficultés d’accès aux soins dans un territoire rural. La candidate ne connaît aucun chiffre précis sur ce territoire.',
      'Elle applique la méthode : de quoi s’agit-il, qui est concerné, quels mécanismes — distance, délais, transport, démographie professionnelle —, quel rôle des professionnels, quelle position nuancée. Elle produit une copie solide sans citer un seul chiffre, en s’appuyant sur des mécanismes qu’elle maîtrise.',
    ],
    pros: [
      'Savoir dire ce qu’on ignore, tout en montrant comment on le vérifierait, est valorisé à l’écrit comme à l’oral.',
      'Les mécanismes comptent davantage que les chiffres. Un chiffre approximatif affaiblit une copie ; un mécanisme bien expliqué la renforce.',
      'La position nuancée n’est pas une absence de position : c’est une position qui reconnaît ses limites.',
    ],
    questions: [
      {
        q: 'Faut-il mémoriser un maximum de sujets d’actualité ?',
        choices: [
          { label: 'Non : mieux vaut maîtriser une méthode applicable à n’importe quel sujet', ok: true },
          { label: 'Oui, c’est le seul moyen d’être prête', why: 'Aucune mémorisation ne peut couvrir tous les sujets possibles, et une connaissance apprise sans méthode se restitue mal.' },
        ],
        explain:
          'Les sujets varient, la méthode non. Cinq questions — quoi, qui, pourquoi, quel rôle, quelle position — permettent de traiter un sujet inconnu.',
      },
      {
        q: 'Que faire si l’on ne connaît aucun chiffre sur le sujet proposé ?',
        choices: [
          { label: 'Construire la réponse sur les mécanismes et les acteurs, sans inventer de chiffre', ok: true },
          { label: 'Donner un ordre de grandeur approximatif pour montrer qu’on connaît le sujet', why: 'Un chiffre inexact décrédibilise l’ensemble de la copie. Mieux vaut ne pas en citer.' },
          { label: 'Rendre une copie plus courte', why: 'L’absence de chiffre n’empêche pas de développer une analyse complète.' },
        ],
        explain:
          'Une copie sans chiffre mais avec des mécanismes clairs est solide. Une copie avec un chiffre inventé ne l’est pas.',
      },
    ],
    argument: {
      prompt:
        'Expliquez pourquoi une méthode d’analyse est plus utile qu’une mémorisation de sujets. Donnez un exemple et une limite.',
      guidance: ['Posez l’idée.', 'Expliquez pourquoi.', 'Donnez un exemple fictif.', 'Indiquez la limite.'],
      reference: [
        'Une méthode d’analyse est plus utile qu’une mémorisation de sujets, parce qu’aucune liste ne peut couvrir l’ensemble des sujets possibles. Une méthode stable — identifier le sujet, nommer les personnes concernées, expliquer les mécanismes, situer le rôle des professionnels, formuler une position nuancée — s’applique à un sujet inconnu comme à un sujet préparé.',
        'Dans une situation fictive, une candidate reçoit un sujet sur l’accès aux soins en zone rurale sans connaître de données sur ce territoire. En appliquant la méthode, elle traite la distance, les délais, le transport et la démographie professionnelle, et produit une copie complète sans citer un seul chiffre.',
        'La limite est réelle : une méthode ne remplace pas totalement les connaissances. Sans repères sur les notions transversales du champ — prévention, autonomie, coordination, inégalités — la méthode tournerait à vide. Il faut les deux, mais les notions transversales sont peu nombreuses, contrairement aux sujets possibles.',
      ],
    },
    sources: [REF.spf, REF.has, REF.drees, REF.insee],
  }),
]
