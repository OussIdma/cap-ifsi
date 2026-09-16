/**
 * Fiches H09 à H16. Contenus originaux, exemples entièrement fictifs.
 */

import type { HealthSheet } from '../types'
import { REF, sheet } from './builder'

export const FICHES_H09_H16: HealthSheet[] = [
  sheet({
    id: 'H09',
    title: 'Alimentation et activité physique',
    purpose: 'Relier alimentation, mouvement et santé, sans prescrire.',
    def: [
      'L’alimentation et l’activité physique font partie des déterminants de santé sur lesquels il est possible d’agir, à condition de tenir compte des contraintes réelles des personnes : budget, temps, équipement de cuisine, mobilité, habitudes culturelles.',
      'La dénutrition est un déficit d’apports par rapport aux besoins. Elle est fréquente chez les personnes âgées et souvent sous-repérée, parce qu’elle peut exister chez une personne de forte corpulence. Elle fragilise la cicatrisation, la force musculaire et augmente le risque de chute.',
      'La sédentarité — temps passé assis ou allongé en éveil — est distincte du manque d’activité physique. Une personne peut pratiquer une activité et rester par ailleurs très sédentaire. Les deux ont des effets propres.',
    ],
    vocab: [
      { term: 'Dénutrition', def: 'Déficit d’apports nutritionnels par rapport aux besoins de l’organisme.' },
      { term: 'Sédentarité', def: 'Temps passé assis ou allongé en éveil, en dehors du sommeil.' },
      { term: 'Activité physique', def: 'Tout mouvement produisant une dépense d’énergie, y compris la marche et les tâches domestiques.' },
      { term: 'Équilibre alimentaire', def: 'Répartition des apports permettant de couvrir les besoins sur la durée, et non à chaque repas.' },
      { term: 'Perte d’appétit', def: 'Réduction de l’envie de manger, signal à explorer et non à banaliser.' },
    ],
    stakes: [
      'Les conseils généraux produisent peu d’effet quand ils ignorent les contraintes. Recommander des produits frais à une personne sans réfrigérateur ni budget revient à lui signifier qu’elle ne fait pas ce qu’il faut.',
      'Chez une personne âgée, une perte d’appétit n’est pas anodine. Elle peut signaler une douleur, un problème dentaire, un effet de traitement, une dépression ou un isolement qui rend le repas sans intérêt.',
      'L’activité physique utile n’est pas forcément sportive. La marche, le ménage, le jardinage comptent. Le présenter ainsi rend l’objectif atteignable et évite le découragement.',
    ],
    example: [
      'Exemple fictif : une personne âgée vivant seule perd du poids sur trois mois. L’équipe constate qu’elle ne cuisine plus depuis le décès de son conjoint, et qu’elle mange debout, rapidement, une fois par jour.',
      'Plutôt qu’un conseil nutritionnel, la réponse porte sur le contexte : portage de repas, invitation à un repas collectif hebdomadaire, et signalement au médecin pour rechercher une cause médicale associée. Le poids se stabilise.',
    ],
    pros: [
      'L’aide-soignante observe ce qui est réellement mangé, ce qui reste dans l’assiette, les difficultés de mastication ou de déglutition. Cette observation est une donnée clinique, à transmettre.',
      'L’infirmière évalue le risque de dénutrition, surveille le poids, alerte le médecin et coordonne avec le diététicien lorsque c’est possible.',
      'Aucun professionnel ne prescrit de régime individuel en dehors de son champ de compétence. L’information générale est possible ; l’adaptation individuelle relève du médecin ou du diététicien.',
    ],
    questions: [
      {
        q: 'Pourquoi une perte d’appétit chez une personne âgée doit-elle être explorée ?',
        choices: [
          { label: 'Parce qu’elle peut signaler une douleur, un effet de traitement, un problème dentaire ou un isolement', ok: true },
          { label: 'Parce qu’elle est normale avec l’âge', why: 'La banaliser conduit à ne pas rechercher une cause qui pourrait être traitée.' },
          { label: 'Parce qu’elle indique toujours une dépression', why: 'La dépression est une cause possible parmi d’autres : conclure trop vite ferme la recherche.' },
        ],
        explain:
          'Une perte d’appétit est un signal, pas un diagnostic. Elle appelle une recherche de cause, d’autant qu’elle expose à la dénutrition et à ses conséquences.',
      },
      {
        q: 'Sédentarité et manque d’activité physique, est-ce la même chose ?',
        choices: [
          { label: 'Non : on peut pratiquer une activité et rester très sédentaire le reste du temps', ok: true },
          { label: 'Oui, ce sont deux mots pour la même réalité', why: 'Ce sont deux notions distinctes, avec des effets propres sur la santé.' },
        ],
        explain:
          'La sédentarité mesure le temps passé assis ou allongé en éveil. Réduire ce temps et augmenter l’activité physique sont deux objectifs différents, qui se cumulent.',
      },
    ],
    argument: {
      prompt:
        'Expliquez pourquoi un conseil nutritionnel général peut rester sans effet, et proposez une approche plus adaptée.',
      guidance: [
        'Posez votre idée.',
        'Expliquez ce qui bloque concrètement.',
        'Donnez un exemple fictif.',
        'Proposez une approche, en précisant sa limite.',
      ],
      reference: [
        'Un conseil nutritionnel général reste souvent sans effet parce qu’il suppose des conditions matérielles et sociales qui ne sont pas toujours réunies : budget, équipement, capacité à cuisiner, envie de manger. Rappeler ce qu’il faudrait manger n’agit sur aucune de ces conditions.',
        'Dans une situation fictive, une personne âgée qui ne cuisine plus depuis un deuil mange une fois par jour, debout. Lui expliquer l’équilibre alimentaire ne change rien : ce qui manque n’est pas l’information, c’est le cadre du repas.',
        'Une approche plus adaptée consiste à explorer d’abord le contexte — qui prépare, avec quoi, dans quelles conditions, avec qui — puis à agir sur ce contexte : portage de repas, repas partagé, recherche d’une cause médicale à la perte d’appétit. Cette approche demande du temps d’échange, ce qui constitue sa principale limite en pratique.',
      ],
    },
    sources: [REF.spf, REF.has, REF.ministere],
  }),

  sheet({
    id: 'H10',
    title: 'Maladies chroniques',
    purpose: 'Comprendre ce que change une maladie qui dure.',
    def: [
      'Une maladie chronique est une affection de longue durée, évolutive, qui retentit sur la vie quotidienne. Diabète, insuffisance cardiaque, bronchopneumopathie chronique obstructive, maladies rhumatismales, insuffisance rénale en sont des exemples.',
      'La personne vit avec sa maladie entre les consultations, et c’est elle qui réalise l’essentiel des gestes de soin : prises de traitement, surveillance, adaptation de l’activité. On parle parfois de « travail du malade » pour désigner cette charge quotidienne, souvent invisible.',
      'L’éducation thérapeutique du patient est une démarche structurée qui aide la personne à comprendre sa maladie, à repérer les signes d’alerte et à agir. Elle est distincte d’une simple information : elle part de ce que la personne sait déjà et de ce qu’elle souhaite.',
    ],
    vocab: [
      { term: 'Maladie chronique', def: 'Affection de longue durée, évolutive, retentissant sur la vie quotidienne.' },
      { term: 'Affection de longue durée (ALD)', def: 'Dispositif administratif ouvrant une prise en charge spécifique de certains soins.' },
      { term: 'Éducation thérapeutique', def: 'Démarche structurée aidant la personne à gérer sa maladie au quotidien.' },
      { term: 'Adhésion au traitement', def: 'Degré auquel la personne suit le traitement convenu avec elle.' },
      { term: 'Signe d’alerte', def: 'Manifestation qui doit conduire à consulter sans attendre.' },
    ],
    stakes: [
      'Le terme « mauvaise observance » désigne souvent un problème mal compris : effets indésirables non dits, complexité du schéma, coût, absence de sens perçu, lassitude. Le traiter comme une désobéissance empêche d’en chercher la cause.',
      'Une maladie chronique a un retentissement social : emploi, relations, image de soi, projets. Ce retentissement est parfois plus lourd que les symptômes eux-mêmes.',
      'La coordination compte particulièrement : plusieurs spécialistes, un médecin traitant, des professionnels paramédicaux, parfois plusieurs structures. Sans point de synthèse, la personne devient elle-même son seul coordinateur.',
    ],
    example: [
      'Exemple fictif : une personne vivant avec un diabète depuis dix ans cesse une partie de son traitement. Interrogée sans reproche, elle explique que les horaires de prise sont incompatibles avec son travail posté et qu’elle n’ose pas le dire.',
      'Le médecin ajuste le schéma pour l’adapter aux horaires réels. L’observance s’améliore. La difficulté n’était ni un manque de motivation ni un défaut d’information, mais une organisation incompatible avec la vie de la personne.',
    ],
    pros: [
      'Les professionnels de proximité recueillent ce que la personne ne dit pas en consultation : difficultés réelles, effets gênants, renoncements silencieux.',
      'L’infirmière participe à l’éducation thérapeutique, vérifie la compréhension, repère les signes d’alerte et relaie vers le médecin les difficultés d’adaptation du traitement.',
      'La personne reste décisionnaire. Le rôle des professionnels est de l’outiller, pas de contrôler sa vie.',
    ],
    questions: [
      {
        q: 'Que traduit le plus souvent une « mauvaise observance » ?',
        choices: [
          { label: 'Une difficulté concrète non exprimée : effets indésirables, horaires, coût, perte de sens', ok: true },
          { label: 'Un refus délibéré de se soigner', why: 'Le refus existe, mais il est minoritaire. Partir de cette hypothèse empêche de chercher la cause réelle.' },
          { label: 'Un manque d’information', why: 'L’information manque parfois, mais beaucoup de personnes bien informées interrompent malgré tout un traitement mal adapté à leur vie.' },
        ],
        explain:
          'Chercher la difficulté concrète avant de conclure à un refus permet la plupart du temps de trouver un ajustement possible.',
      },
      {
        q: 'Qu’est-ce qui distingue l’éducation thérapeutique d’une simple information ?',
        choices: [
          { label: 'Elle part de ce que la personne sait et souhaite, et vise à la rendre capable d’agir', ok: true },
          { label: 'Elle est plus longue', why: 'La durée n’est pas le critère : c’est la démarche qui diffère.' },
          { label: 'Elle est réservée aux médecins', why: 'Elle est portée par une équipe pluriprofessionnelle formée.' },
        ],
        explain:
          'Informer, c’est transmettre un contenu. L’éducation thérapeutique construit avec la personne des compétences utilisables dans sa vie quotidienne.',
      },
    ],
    argument: {
      prompt:
        'Expliquez pourquoi parler de « mauvaise observance » peut empêcher de comprendre une situation. Proposez une autre façon d’aborder le sujet.',
      guidance: [
        'Analysez ce que le mot sous-entend.',
        'Expliquez l’effet sur la relation et sur la recherche de cause.',
        'Donnez un exemple fictif.',
        'Proposez une formulation et une démarche alternatives.',
      ],
      reference: [
        'Parler de « mauvaise observance » attribue la difficulté à la personne et suggère un manquement de sa part. Cette formulation clôt la recherche : si le problème est la personne, il n’y a plus rien à chercher du côté du traitement, de son organisation ou de son coût.',
        'Dans une situation fictive, une personne en travail posté interrompt une partie de son traitement parce que les horaires de prise sont incompatibles avec ses nuits. Qualifiée de « peu observante », elle n’ose plus aborder le sujet. Interrogée sans reproche, elle explique la difficulté en deux minutes, et un ajustement du schéma résout le problème.',
        'Une autre approche consiste à demander concrètement comment se passe la prise du traitement au quotidien, plutôt que si elle est bien suivie. La question ouvre sur les obstacles réels et rend l’ajustement possible. Elle demande cependant du temps de consultation, qui n’est pas toujours disponible.',
      ],
    },
    sources: [REF.has, REF.ameli, REF.drees],
  }),

  sheet({
    id: 'H11',
    title: 'Infections et vaccination',
    purpose: 'Expliquer transmission, hygiène et information fiable.',
    def: [
      'Une infection résulte de la pénétration et de la multiplication d’un agent infectieux dans l’organisme. La transmission peut être directe, de personne à personne, ou indirecte, par des objets, des mains, de l’eau ou des aliments.',
      'L’hygiène des mains est la mesure de prévention la plus efficace en collectivité. La friction hydro-alcoolique est privilégiée lorsque les mains ne sont pas visiblement souillées ; le lavage à l’eau et au savon reste nécessaire dans certaines situations.',
      'La vaccination protège la personne vaccinée et contribue à limiter la circulation de l’agent infectieux. Le calendrier vaccinal et les obligations évoluent : ils doivent être vérifiés à la source officielle et datés, sans jamais reprendre de mémoire une règle ancienne.',
    ],
    vocab: [
      { term: 'Transmission directe', def: 'Passage de l’agent infectieux d’une personne à une autre, sans intermédiaire.' },
      { term: 'Transmission indirecte', def: 'Passage par un objet, une surface, les mains, l’eau ou un aliment.' },
      { term: 'Précautions standard', def: 'Mesures appliquées à tous, en permanence, quel que soit le statut infectieux connu.' },
      { term: 'Infection associée aux soins', def: 'Infection survenant au cours ou au décours d’une prise en charge.' },
      { term: 'Calendrier vaccinal', def: 'Document officiel indiquant les vaccinations recommandées et leur calendrier ; révisé régulièrement.' },
    ],
    stakes: [
      'Les précautions standard s’appliquent à tous et en permanence, précisément parce que le statut infectieux d’une personne n’est pas toujours connu. Les réserver aux situations « à risque » les rend inefficaces.',
      'L’observance des gestes d’hygiène dépend de l’organisation autant que des individus : disponibilité des produits, temps disponible, aménagement des locaux.',
      'L’information sur la vaccination circule beaucoup et de façon inégale. Savoir citer une source officielle et sa date vaut mieux que réciter un contenu appris il y a plusieurs années.',
    ],
    example: [
      'Exemple fictif : dans un établissement, les flacons de solution hydro-alcoolique sont disponibles à l’entrée des couloirs mais pas dans les chambres. L’observance des frictions au point d’utilisation est faible.',
      'Le repositionnement des flacons à l’entrée de chaque chambre améliore nettement la pratique, sans qu’aucune consigne supplémentaire n’ait été donnée. L’organisation matérielle explique une part importante du comportement.',
    ],
    pros: [
      'L’aide-soignante applique les précautions standard et signale les ruptures d’approvisionnement ou les obstacles matériels qu’elle rencontre.',
      'L’infirmière assure une part de la prévention du risque infectieux, informe les personnes et les proches, et participe au signalement des événements.',
      'Toute information donnée sur la vaccination doit renvoyer à une source officielle et actuelle. En cas de doute, il est préférable d’orienter vers le médecin plutôt que d’affirmer.',
    ],
    questions: [
      {
        q: 'À qui s’appliquent les précautions standard ?',
        choices: [
          { label: 'À toutes les personnes, en permanence', ok: true },
          { label: 'Uniquement aux personnes dont on sait qu’elles sont porteuses d’un agent infectieux', why: 'Le statut infectieux n’est pas toujours connu : réserver les précautions aux cas identifiés les rend inopérantes.' },
          { label: 'Uniquement en période d’épidémie', why: 'Elles sont permanentes, par définition.' },
        ],
        explain:
          'Les précautions standard existent justement parce qu’on ne peut pas savoir à l’avance qui est porteur. Leur caractère systématique fait leur efficacité.',
      },
      {
        q: 'Comment répondre à une question précise sur le calendrier vaccinal ?',
        choices: [
          { label: 'En renvoyant à la source officielle en vigueur et en orientant vers le médecin', ok: true },
          { label: 'En citant ce qu’on a appris en formation il y a quelques années', why: 'Le calendrier évolue : une information ancienne peut être devenue inexacte.' },
          { label: 'En cherchant la réponse sur un forum', why: 'La fiabilité d’une source est le premier critère : un forum n’en est pas une.' },
        ],
        explain:
          'Sur une règle susceptible d’évoluer, la bonne réponse professionnelle consiste à indiquer où se trouve l’information à jour, plutôt que d’affirmer de mémoire.',
      },
    ],
    argument: {
      prompt:
        'Expliquez pourquoi l’organisation matérielle influence l’application des gestes d’hygiène. Donnez un exemple et une limite.',
      guidance: [
        'Posez la thèse.',
        'Expliquez le mécanisme.',
        'Donnez un exemple fictif.',
        'Indiquez ce que l’organisation ne suffit pas à régler.',
      ],
      reference: [
        'L’application des gestes d’hygiène dépend fortement de l’organisation matérielle, parce qu’un geste doit pouvoir être réalisé au moment précis où il est nécessaire. Si le produit n’est pas à portée de main, le geste suppose un déplacement, donc du temps, et il est abandonné dans les situations chargées.',
        'Dans un établissement fictif, les flacons de solution hydro-alcoolique étaient placés à l’entrée des couloirs. Leur repositionnement à l’entrée de chaque chambre a amélioré la pratique sans consigne supplémentaire : l’obstacle n’était pas la connaissance de la règle, mais la distance au produit.',
        'L’organisation ne règle cependant pas tout. Elle ne remplace ni la formation initiale, ni les temps d’analyse des pratiques, ni un effectif suffisant. Un flacon bien placé ne compense pas une charge de travail qui rend impossible le respect des temps de soin.',
      ],
    },
    sources: [REF.spf, REF.has, REF.ministere],
  }),

  sheet({
    id: 'H12',
    title: 'Qualité et sécurité des soins',
    purpose: 'Parler des erreurs comme d’un sujet d’organisation, pas de faute individuelle.',
    def: [
      'Un événement indésirable associé aux soins est un événement défavorable survenant au cours d’une prise en charge et qui n’est pas lié à l’évolution naturelle de l’état de santé. Certains sont évitables.',
      'L’analyse moderne des erreurs repose sur une idée simple : un événement grave résulte presque toujours d’un enchaînement de facteurs — organisation, communication, charge de travail, conception du matériel — et non d’une seule défaillance individuelle.',
      'La culture de sécurité désigne un fonctionnement où signaler une erreur ou un presque-accident est attendu et protégé, parce que c’est la condition pour comprendre et corriger. Une culture punitive produit du silence, pas de la sécurité.',
    ],
    vocab: [
      { term: 'Événement indésirable', def: 'Événement défavorable survenu au cours d’une prise en charge.' },
      { term: 'Presque-accident', def: 'Situation où l’erreur a été rattrapée avant d’atteindre la personne.' },
      { term: 'Culture de sécurité', def: 'Fonctionnement collectif favorisant le signalement et l’analyse plutôt que la sanction.' },
      { term: 'Retour d’expérience', def: 'Analyse collective d’un événement pour en tirer des mesures concrètes.' },
      { term: 'Traçabilité', def: 'Possibilité de retrouver ce qui a été fait, par qui et quand.' },
    ],
    stakes: [
      'Sanctionner le signalement fait disparaître l’information, pas le risque. Les organisations qui déclarent beaucoup ne sont pas les moins sûres : ce sont souvent les plus lucides.',
      'Les transmissions sont un point critique. Une information transmise oralement dans un couloir, sans trace écrite, est une information perdue à la relève suivante.',
      'La charge de travail est un facteur de risque en soi. L’analyse d’un événement qui s’arrête à « il fallait être plus vigilant » passe à côté des causes modifiables.',
    ],
    example: [
      'Exemple fictif : une erreur de transmission conduit à ce qu’un soin ne soit pas réalisé. L’analyse collective montre que l’information avait été donnée oralement pendant un moment de forte activité, sans trace écrite, et que la fiche de liaison n’était pas accessible depuis le poste concerné.',
      'Les mesures retenues sont organisationnelles : un temps de transmission protégé, et une fiche accessible au point d’usage. Personne n’est sanctionné, et le risque diminue réellement.',
    ],
    pros: [
      'L’aide-soignante signale ce qu’elle constate, y compris les presque-accidents. Ce signalement ne met pas en cause une personne : il documente une situation.',
      'L’infirmière participe à l’analyse des événements, assure la traçabilité des soins et veille à la qualité des transmissions.',
      'Dire « je me suis trompée » relève de la compétence professionnelle, pas de l’aveu. C’est ce qui permet de rattraper et d’éviter la répétition.',
    ],
    questions: [
      {
        q: 'Pourquoi une organisation qui sanctionne les signalements devient-elle moins sûre ?',
        choices: [
          { label: 'Parce que les erreurs cessent d’être signalées, sans cesser de se produire', ok: true },
          { label: 'Parce que les professionnels travaillent moins bien', why: 'Le mécanisme n’est pas la qualité du travail mais la disparition de l’information.' },
          { label: 'Parce que les sanctions coûtent cher', why: 'Ce n’est pas l’argument de sécurité.' },
        ],
        explain:
          'La sanction supprime le signalement, donc la possibilité d’analyser et de corriger. Le risque reste, mais il devient invisible.',
      },
      {
        q: 'Qu’est-ce qu’un presque-accident ?',
        choices: [
          { label: 'Une erreur rattrapée avant d’atteindre la personne', ok: true },
          { label: 'Un événement sans gravité', why: 'La gravité potentielle peut être élevée : c’est le rattrapage qui a évité la conséquence.' },
          { label: 'Une erreur commise volontairement', why: 'L’intention n’entre pas dans la définition.' },
        ],
        explain:
          'Les presque-accidents sont précieux : ils révèlent les mêmes causes que les accidents, sans conséquence pour la personne. Les signaler est le meilleur moyen de prévenir.',
      },
    ],
    argument: {
      prompt:
        'Expliquez pourquoi analyser une erreur en cherchant les causes d’organisation est plus efficace que de désigner un responsable. Donnez un exemple et une limite.',
      guidance: [
        'Posez votre position.',
        'Expliquez ce que produit chacune des deux approches.',
        'Donnez un exemple fictif.',
        'Précisez ce que cette approche ne signifie pas.',
      ],
      reference: [
        'Analyser une erreur en cherchant les causes d’organisation est plus efficace parce que cela agit sur ce qui peut être modifié. Désigner un responsable règle la question de la culpabilité, mais laisse en place le contexte qui a rendu l’erreur possible : la même situation reproduira le même événement avec une autre personne.',
        'Dans une situation fictive, un soin non réalisé est d’abord attribué à un oubli individuel. L’analyse collective montre que l’information avait été donnée oralement pendant un pic d’activité et que la fiche de liaison n’était pas accessible depuis le poste. Deux mesures — un temps de transmission protégé et une fiche au point d’usage — suppriment la cause.',
        'Cette approche ne signifie pas qu’il n’existe aucune responsabilité individuelle. Un manquement délibéré aux règles ou la dissimulation d’un événement relèvent d’un autre registre. La démarche de sécurité vise les erreurs, qui sont involontaires par définition, et qui constituent la très grande majorité des cas.',
      ],
    },
    sources: [REF.has, REF.ministere],
  }),

  sheet({
    id: 'H13',
    title: 'Droits des personnes et éthique',
    purpose: 'Situer dignité, consentement, confidentialité dans le quotidien.',
    def: [
      'La loi du 4 mars 2002 relative aux droits des malades a posé plusieurs principes : droit à l’information, consentement libre et éclairé, accès au dossier médical, droit à la dignité, non-discrimination. Le contenu exact et les évolutions ultérieures doivent être vérifiés sur le texte en vigueur.',
      'Le consentement suppose trois conditions : une information compréhensible, un temps de réflexion, et la possibilité de refuser sans conséquence sur la qualité de la prise en charge. Un accord obtenu sous pression n’est pas un consentement.',
      'Le secret professionnel s’impose à l’ensemble des professionnels. Le partage d’informations entre membres de l’équipe de soin est possible dans la limite de ce qui est nécessaire à la prise en charge : ce n’est pas une autorisation générale de tout dire à tous.',
    ],
    vocab: [
      { term: 'Consentement libre et éclairé', def: 'Accord donné sans contrainte, après une information compréhensible.' },
      { term: 'Secret professionnel', def: 'Obligation de ne pas divulguer les informations connues dans l’exercice professionnel.' },
      { term: 'Personne de confiance', def: 'Personne désignée par écrit pour accompagner et être consultée si la personne ne peut plus s’exprimer.' },
      { term: 'Directives anticipées', def: 'Volontés écrites concernant les soins, à prendre en compte si la personne ne peut plus s’exprimer.' },
      { term: 'Dignité', def: 'Principe selon lequel toute personne mérite considération, quel que soit son état.' },
    ],
    stakes: [
      'Les atteintes à la dignité passent rarement par des gestes spectaculaires. Elles se logent dans le quotidien : parler de la personne en sa présence comme si elle était absente, laisser une porte ouverte pendant un soin, tutoyer sans y avoir été invité.',
      'Le respect du refus est un point difficile. Il oblige à distinguer ce qui relève de la protection de la personne et ce qui relève de notre propre inconfort face à sa décision.',
      'La confidentialité est fragilisée par les lieux de passage : couloirs, ascenseurs, salles d’attente. Beaucoup de ruptures de confidentialité sont involontaires et purement matérielles.',
    ],
    example: [
      'Exemple fictif : lors d’un soin, deux professionnels échangent au sujet de l’organisation du service, en présence de la personne, sans jamais s’adresser à elle. Aucune information confidentielle n’est divulguée, mais la personne est traitée comme un objet de soin.',
      'Une pratique simple corrige cela : s’adresser à la personne au début du soin, expliquer ce qui va être fait, et réserver les échanges de service à un autre moment. Cela ne coûte rien et change la nature de la relation.',
    ],
    pros: [
      'Demander l’accord avant d’entrer, expliquer le soin, fermer la porte, couvrir la personne : ce sont des gestes de droit autant que de confort.',
      'L’infirmière recueille le consentement, informe dans un langage compréhensible, vérifie que l’information a été comprise et trace ce qui a été dit.',
      'Toute l’équipe est tenue au secret professionnel, y compris dans les espaces communs et en dehors du service.',
    ],
    questions: [
      {
        q: 'Un accord obtenu après une insistance répétée est-il un consentement ?',
        choices: [
          { label: 'Non : le consentement doit être libre, donc sans pression', ok: true },
          { label: 'Oui, puisque la personne a fini par accepter', why: 'L’acceptation obtenue sous pression ne remplit pas la condition de liberté.' },
          { label: 'Oui, si le soin est nécessaire', why: 'La nécessité du soin ne supprime pas l’exigence de consentement ; elle impose d’expliquer et de rechercher une alternative.' },
        ],
        explain:
          'Trois conditions définissent le consentement : information compréhensible, absence de contrainte, possibilité réelle de refuser. L’insistance répétée annule la deuxième.',
      },
      {
        q: 'Le partage d’informations au sein de l’équipe de soin est-il illimité ?',
        choices: [
          { label: 'Non : il se limite à ce qui est nécessaire à la prise en charge', ok: true },
          { label: 'Oui, entre professionnels tout peut être dit', why: 'Le secret professionnel s’applique aussi entre professionnels : seul le nécessaire est partagé.' },
          { label: 'Non, aucun partage n’est possible', why: 'Le partage nécessaire à la continuité des soins est prévu.' },
        ],
        explain:
          'Le partage est encadré par la finalité : il doit servir la prise en charge. Cela exclut les informations sans rapport avec le soin.',
      },
    ],
    argument: {
      prompt:
        'Expliquez comment le respect de la dignité se joue dans des gestes quotidiens. Donnez deux exemples et une limite.',
      guidance: [
        'Posez l’idée : la dignité se joue dans l’ordinaire.',
        'Donnez deux exemples concrets et fictifs.',
        'Expliquez pourquoi ces détails comptent.',
        'Indiquez une situation où l’application est plus difficile.',
      ],
      reference: [
        'Le respect de la dignité se joue moins dans les grandes déclarations que dans des gestes quotidiens, parce que c’est leur répétition qui construit la façon dont une personne se sent considérée.',
        'Deux exemples fictifs le montrent. Dans le premier, deux professionnels échangent sur l’organisation du service pendant un soin, sans jamais s’adresser à la personne présente : aucune information confidentielle n’est divulguée, mais la personne est traitée comme un objet. Dans le second, une porte laissée entrouverte pendant une toilette expose l’intimité sans qu’aucune intention négative n’existe.',
        'Ces gestes comptent parce qu’ils sont perçus immédiatement par la personne, alors qu’ils sont souvent invisibles pour les professionnels, pris dans leur activité. L’application devient plus difficile lorsque les locaux ne permettent pas l’intimité ou lorsque la charge de travail impose des soins à plusieurs dans l’urgence. Nommer ces contraintes en équipe vaut mieux que de faire peser la question sur la seule bonne volonté de chacun.',
      ],
    },
    sources: [REF.legifrance, REF.has, REF.ministere],
  }),

  sheet({
    id: 'H14',
    title: 'Bientraitance et violences',
    purpose: 'Savoir repérer, prévenir et alerter correctement.',
    def: [
      'La bientraitance est une démarche collective et continue d’adaptation des pratiques au respect de la personne. Elle ne se réduit pas à l’absence de maltraitance : c’est un questionnement permanent sur ce que l’organisation produit concrètement.',
      'La maltraitance recouvre des formes variées : physique, psychologique, financière, négligence active ou passive, privation de droits. Beaucoup de situations relèvent de la négligence, c’est-à-dire de ce qui n’est pas fait, plutôt que d’un acte délibéré.',
      'Le signalement des situations de danger est une obligation. Les modalités diffèrent selon le public — mineur, majeur vulnérable — et selon le cadre d’exercice. Les circuits internes et externes doivent être connus à l’avance, pas recherchés au moment de l’urgence.',
    ],
    vocab: [
      { term: 'Bientraitance', def: 'Démarche collective d’adaptation permanente des pratiques au respect de la personne.' },
      { term: 'Négligence', def: 'Absence de réponse à un besoin, par omission plutôt que par acte.' },
      { term: 'Majeur vulnérable', def: 'Personne majeure dont l’état la rend incapable de se protéger.' },
      { term: 'Signalement', def: 'Transmission à l’autorité compétente d’une situation de danger ou de risque.' },
      { term: 'Maltraitance institutionnelle', def: 'Maltraitance produite par le fonctionnement d’une organisation, sans intention individuelle.' },
    ],
    stakes: [
      'La maltraitance institutionnelle est la plus difficile à voir, parce qu’elle résulte d’habitudes collectives : horaires imposés, soins réalisés à la chaîne, absence de choix laissé à la personne. Personne n’en est individuellement l’auteur.',
      'Le doute ne doit pas empêcher d’alerter. Il n’appartient pas au professionnel qui constate d’établir la réalité des faits : son rôle est de transmettre ce qu’il a observé, en termes factuels.',
      'Décrire précisément ce qui a été vu ou entendu, sans interprétation, est ce qui rend un signalement utilisable. Une appréciation générale ne permet aucune vérification.',
    ],
    example: [
      'Exemple fictif : dans un service, les toilettes sont systématiquement réalisées entre 6 h et 8 h pour tenir le planning, y compris pour des personnes qui souhaitent se lever plus tard. Aucune intention de nuire n’existe.',
      'L’effet n’en est pas moins une privation de choix qui se répète chaque jour. Le sujet est porté en réunion d’équipe, et une organisation par vagues est mise en place, avec un recueil des préférences. Le repérage est passé par la question : « et si c’était moi ? »',
    ],
    pros: [
      'L’aide-soignante décrit précisément ce qu’elle observe : faits, heures, propos rapportés entre guillemets, sans interprétation.',
      'L’infirmière et l’encadrement organisent la transmission vers le circuit compétent et accompagnent la personne concernée.',
      'Signaler n’est ni une accusation ni une trahison de l’équipe : c’est une obligation professionnelle qui protège aussi les collègues.',
    ],
    questions: [
      {
        q: 'Qu’est-ce que la maltraitance institutionnelle ?',
        choices: [
          { label: 'Une maltraitance produite par le fonctionnement de l’organisation, sans intention individuelle', ok: true },
          { label: 'Une maltraitance commise par la direction', why: 'Elle ne désigne pas un auteur particulier mais un mode de fonctionnement collectif.' },
          { label: 'Une maltraitance commise dans un établissement plutôt qu’à domicile', why: 'Le lieu n’est pas le critère : c’est l’origine organisationnelle.' },
        ],
        explain:
          'Des habitudes collectives — horaires rigides, soins standardisés, absence de choix — peuvent produire des effets maltraitants sans qu’aucune personne n’ait eu l’intention de nuire.',
      },
      {
        q: 'Faut-il être certain des faits pour signaler ?',
        choices: [
          { label: 'Non : il faut décrire précisément ce qui a été observé, l’établissement des faits ne relève pas de celui qui signale', ok: true },
          { label: 'Oui, sinon le signalement est abusif', why: 'Exiger la certitude reviendrait à ne jamais signaler, puisque la vérification n’appartient pas au professionnel de terrain.' },
          { label: 'Oui, sauf pour les mineurs', why: 'Le principe de description factuelle vaut pour tous les publics.' },
        ],
        explain:
          'Le rôle du professionnel est de transmettre des observations factuelles. L’évaluation et la vérification relèvent des autorités compétentes.',
      },
    ],
    argument: {
      prompt:
        'Expliquez pourquoi la bientraitance ne se réduit pas à l’absence de maltraitance. Donnez un exemple et une limite.',
      guidance: [
        'Distinguez les deux notions.',
        'Expliquez ce que la démarche de bientraitance ajoute.',
        'Donnez un exemple fictif d’organisation à interroger.',
        'Indiquez une contrainte réelle.',
      ],
      reference: [
        'La bientraitance ne se réduit pas à l’absence de maltraitance, parce qu’une organisation peut ne commettre aucun acte répréhensible tout en produisant, par ses habitudes, des effets contraires au respect de la personne. Ne pas nuire est un minimum ; la bientraitance suppose d’interroger régulièrement ce que les pratiques produisent réellement.',
        'Dans un service fictif, les toilettes sont réalisées entre 6 h et 8 h pour tenir le planning, y compris pour des personnes qui souhaiteraient se lever plus tard. Aucun professionnel n’a l’intention de nuire, et pourtant le choix est retiré chaque jour. Le repérage est venu d’une question posée en réunion : accepterait-on cette organisation pour soi-même ?',
        'La principale limite est matérielle. Recueillir les préférences et organiser les soins par vagues demande du temps et un effectif suffisant. Reconnaître cette contrainte en équipe est préférable à un discours de bientraitance qui reposerait uniquement sur la bonne volonté individuelle, car celui-ci finit par culpabiliser des professionnels sans leur donner de marge d’action.',
      ],
    },
    sources: [REF.has, REF.ministere, REF.legifrance],
  }),

  sheet({
    id: 'H15',
    title: 'Fin de vie et soins palliatifs',
    purpose: 'Accompagner le confort et l’entourage, dans un cadre légal daté.',
    def: [
      'Les soins palliatifs sont des soins actifs et continus visant à soulager la douleur et les autres symptômes, à préserver la qualité de vie et à accompagner la personne et son entourage. Ils ne se limitent pas aux derniers jours : ils peuvent être associés tôt à un traitement actif.',
      'Le cadre légal français a évolué en plusieurs étapes, notamment avec les lois de 2005 et de 2016. Il porte notamment sur le refus de l’obstination déraisonnable, les directives anticipées, la personne de confiance et la sédation profonde et continue dans des conditions précises. Le contenu exact doit être vérifié sur le texte en vigueur avant toute affirmation.',
      'Les directives anticipées expriment par écrit les volontés d’une personne concernant sa fin de vie, pour le cas où elle ne pourrait plus s’exprimer. Elles sont révisables à tout moment.',
    ],
    vocab: [
      { term: 'Soins palliatifs', def: 'Soins actifs visant le confort et la qualité de vie, associés ou non à un traitement curatif.' },
      { term: 'Obstination déraisonnable', def: 'Poursuite de traitements inutiles ou disproportionnés au regard du bénéfice attendu.' },
      { term: 'Directives anticipées', def: 'Volontés écrites relatives aux soins de fin de vie.' },
      { term: 'Personne de confiance', def: 'Personne désignée pour accompagner et être consultée si la personne ne peut plus s’exprimer.' },
      { term: 'Accompagnement de l’entourage', def: 'Soutien apporté aux proches pendant et après la fin de vie.' },
    ],
    stakes: [
      'Associer les soins palliatifs uniquement à la toute fin de vie retarde leur mise en œuvre et prive la personne d’un soulagement possible plus tôt.',
      'L’entourage fait partie de l’accompagnement. Les proches présents ont des besoins d’information, de repos et parfois de soutien après le décès.',
      'Les questions de fin de vie touchent aux convictions personnelles des professionnels. Le cadre professionnel consiste à respecter les volontés exprimées par la personne, indépendamment de ses propres convictions.',
    ],
    example: [
      'Exemple fictif : une personne exprime le souhait de ne pas être transférée aux urgences en cas d’aggravation, et souhaite rester dans son lieu de vie. Elle a rédigé des directives anticipées et désigné une personne de confiance.',
      'L’équipe s’assure que ces documents sont accessibles, connus de tous les intervenants, y compris la nuit et le week-end, et que la personne de confiance est identifiée. L’essentiel du travail consiste à rendre la volonté exprimée réellement opérante au moment où elle comptera.',
    ],
    pros: [
      'L’aide-soignante est très présente auprès de la personne et repère les signes d’inconfort, y compris chez une personne qui ne peut plus les exprimer verbalement.',
      'L’infirmière évalue et surveille les symptômes, administre les traitements prescrits, informe, soutient l’entourage et participe aux réunions de concertation.',
      'Savoir se taire et rester présent fait partie de l’accompagnement. Les formules toutes faites destinées à rassurer produisent souvent l’effet inverse.',
    ],
    questions: [
      {
        q: 'Les soins palliatifs concernent-ils uniquement les derniers jours de vie ?',
        choices: [
          { label: 'Non : ils peuvent être associés tôt, y compris avec un traitement actif', ok: true },
          { label: 'Oui, ils commencent quand les traitements s’arrêtent', why: 'Cette représentation retarde leur mise en œuvre et prive d’un soulagement possible plus tôt.' },
        ],
        explain:
          'Les soins palliatifs visent le confort et la qualité de vie. Ils peuvent accompagner un traitement actif, parfois plusieurs mois ou années.',
      },
      {
        q: 'Que doit faire une équipe des directives anticipées rédigées par une personne ?',
        choices: [
          { label: 'S’assurer qu’elles sont accessibles et connues de tous les intervenants, y compris la nuit', ok: true },
          { label: 'Les conserver dans un dossier administratif', why: 'Un document inaccessible au moment décisif n’a aucun effet.' },
          { label: 'Les appliquer uniquement si l’équipe est d’accord', why: 'Les directives anticipées ne sont pas soumises à l’accord de l’équipe ; leur portée est définie par la loi en vigueur.' },
        ],
        explain:
          'L’enjeu pratique est l’accessibilité. Des volontés écrites mais introuvables au moment où elles comptent n’ont pas d’effet réel.',
      },
    ],
    argument: {
      prompt:
        'Expliquez pourquoi l’accompagnement de l’entourage fait partie des soins palliatifs. Donnez un exemple et une limite.',
      guidance: [
        'Posez l’idée.',
        'Expliquez le mécanisme : en quoi l’entourage est concerné.',
        'Donnez un exemple fictif.',
        'Indiquez une limite de l’intervention professionnelle.',
      ],
      reference: [
        'L’accompagnement de l’entourage fait partie des soins palliatifs parce que les proches sont à la fois des acteurs de la présence auprès de la personne et des personnes affectées par la situation. Leur état influence directement ce qu’ils peuvent apporter, et leurs besoins d’information et de repos sont réels.',
        'Dans une situation fictive, un conjoint reste présent jour et nuit, refuse toute relève et s’épuise. L’équipe lui propose des temps de relais, l’informe de ce qui se passe et de ce qui va être fait, et lui indique un soutien possible après le décès. Sa présence redevient soutenable, ce qui bénéficie aussi à la personne accompagnée.',
        'L’intervention professionnelle a cependant ses limites. Elle ne remplace pas les liens familiaux, ne règle pas les conflits anciens qui ressurgissent parfois dans ces moments, et doit respecter le souhait de certains proches de ne pas être accompagnés. Proposer sans imposer reste la règle.',
      ],
    },
    sources: [REF.legifrance, REF.has, REF.ministere],
  }),

  sheet({
    id: 'H16',
    title: 'Enfance, adolescence et familles',
    purpose: 'Repères de développement, prévention et protection.',
    def: [
      'Le développement de l’enfant suit des étapes générales, mais avec une variabilité importante entre enfants. Les repères servent à détecter un écart durable, pas à juger un enfant sur une date précise.',
      'La protection de l’enfance repose sur un principe : toute personne ayant connaissance d’une situation de danger ou de risque de danger doit transmettre l’information. Les circuits — information préoccupante, signalement — doivent être connus avant d’en avoir besoin.',
      'La prévention en périnatalité et en petite enfance mobilise notamment la protection maternelle et infantile, la médecine scolaire et les professionnels de ville. L’objectif est le repérage précoce et l’accompagnement, pas le contrôle des familles.',
    ],
    vocab: [
      { term: 'PMI', def: 'Protection maternelle et infantile : service départemental de prévention et de suivi.' },
      { term: 'Information préoccupante', def: 'Transmission d’éléments faisant craindre qu’un enfant soit en danger ou en risque de l’être.' },
      { term: 'Signalement', def: 'Transmission directe à l’autorité judiciaire, dans les situations les plus graves.' },
      { term: 'Repères de développement', def: 'Étapes générales servant à repérer un écart durable, avec une large variabilité normale.' },
      { term: 'Soutien à la parentalité', def: 'Actions visant à accompagner les parents dans leur rôle, sans s’y substituer.' },
    ],
    stakes: [
      'Le repérage précoce est décisif, mais il doit éviter deux écueils : passer à côté d’une situation de danger, et stigmatiser une famille sur la base d’un élément isolé.',
      'Les adolescents constituent un public dont les besoins de santé sont souvent mal couverts, entre pédiatrie et médecine adulte. La confidentialité y joue un rôle particulier dans le recours aux soins.',
      'Accompagner une famille suppose de reconnaître ses compétences avant ses difficultés. Une posture perçue comme un contrôle produit l’évitement, donc moins de repérage.',
    ],
    example: [
      'Exemple fictif : dans une structure d’accueil, un enfant présente depuis plusieurs semaines un retrait marqué et des troubles du sommeil signalés par le parent. Aucun élément isolé n’est alarmant, mais l’ensemble persiste.',
      'L’équipe ne conclut pas seule. Elle décrit précisément ce qu’elle observe, échange avec le parent sans le mettre en cause, et transmet ses observations au professionnel compétent afin qu’une évaluation soit conduite.',
    ],
    pros: [
      'Les professionnels en contact quotidien avec l’enfant sont souvent les mieux placés pour remarquer un changement durable.',
      'L’infirmière, en milieu scolaire ou en structure, participe au repérage, à l’accompagnement et à la transmission vers les circuits compétents.',
      'Décrire des faits datés et répétés vaut mieux qu’une impression générale : c’est ce qui permet une évaluation utile.',
    ],
    questions: [
      {
        q: 'Que faire face à un ensemble d’observations préoccupantes, sans certitude ?',
        choices: [
          { label: 'Décrire précisément les faits observés et les transmettre au circuit compétent', ok: true },
          { label: 'Attendre d’avoir une preuve', why: 'La preuve n’appartient pas au professionnel de terrain : attendre revient à laisser la situation se poursuivre.' },
          { label: 'Interroger directement l’enfant pour établir les faits', why: 'Le recueil de la parole de l’enfant relève de professionnels formés ; des questions mal conduites peuvent altérer un futur recueil.' },
        ],
        explain:
          'Le rôle est d’observer, de décrire factuellement et de transmettre. L’évaluation relève des services compétents.',
      },
      {
        q: 'À quoi servent les repères de développement ?',
        choices: [
          { label: 'À repérer un écart durable, en tenant compte d’une large variabilité normale', ok: true },
          { label: 'À vérifier qu’un enfant est dans la norme à une date précise', why: 'La variabilité entre enfants est importante : un écart ponctuel n’a pas de valeur en soi.' },
        ],
        explain:
          'Les repères sont des outils de vigilance. C’est la persistance d’un écart, et non un décalage ponctuel, qui justifie une évaluation.',
      },
    ],
    argument: {
      prompt:
        'Expliquez pourquoi une posture de contrôle vis-à-vis des familles peut nuire au repérage des difficultés. Proposez une autre approche.',
      guidance: [
        'Posez votre position.',
        'Expliquez l’effet du contrôle perçu.',
        'Donnez un exemple fictif.',
        'Proposez une approche, avec sa limite.',
      ],
      reference: [
        'Une posture de contrôle nuit au repérage parce qu’elle produit l’évitement. Une famille qui redoute d’être jugée ou sanctionnée limite ses échanges avec les professionnels, manque des rendez-vous et tait les difficultés. Les professionnels perdent alors l’accès aux informations dont dépend précisément le repérage.',
        'Dans une situation fictive, un parent cesse de signaler les troubles du sommeil de son enfant après avoir eu le sentiment qu’on mettait en cause son organisation familiale. Le point de vigilance disparaît des échanges, sans que la difficulté ait été résolue.',
        'Une autre approche consiste à partir des compétences de la famille et de ce qu’elle identifie elle-même comme difficile, avant de proposer un appui. Cette posture ne supprime cependant pas l’obligation de transmettre lorsqu’un danger est repéré : accompagner et protéger ne s’opposent pas, mais la seconde obligation prime lorsqu’elle est engagée.',
      ],
    },
    sources: [REF.ministere, REF.has, REF.drees],
  }),
]
