/**
 * Sujets rédigés — sous-épreuve « rédaction et questions sanitaires et
 * sociales », 30 minutes, notée sur 10 dans le format retenu.
 *
 * Tous les sujets sont originaux. Aucun n'est repris d'annales protégées.
 * Chaque sujet propose un corrigé de référence présenté comme UNE réponse
 * recevable, d'autres réponses acceptables, et une comparaison entre une copie
 * faible et une copie solide.
 */

import type { Criterion, WrittenTask } from '../types'
import { p } from '../blocks'

/** Barème pédagogique sur 10, choix de conception de cette application. */
export const BAREME: Criterion[] = [
  {
    id: 'consigne',
    label: 'Compréhension et respect de la consigne',
    points: 2,
    evidence: [
      'Le nombre d’éléments demandés est présent',
      'Chaque verbe de la consigne a reçu une réponse',
      'La longueur demandée est approximativement respectée',
    ],
  },
  {
    id: 'connaissances',
    label: 'Pertinence et connaissances mobilisées',
    points: 2,
    evidence: [
      'Le vocabulaire du champ sanitaire et social est employé correctement',
      'Aucun chiffre ni aucune règle inventés',
      'Les notions employées sont justes',
    ],
  },
  {
    id: 'analyse',
    label: 'Analyse et argumentation',
    points: 3,
    evidence: [
      'Au moins une cause ou un mécanisme est expliqué, pas seulement constaté',
      'Un exemple concret soutient le propos',
      'Une limite, une nuance ou une objection apparaît',
    ],
  },
  {
    id: 'structure',
    label: 'Structure de la réponse',
    points: 1,
    evidence: ['Un plan lisible', 'Une phrase finale qui répond à la question posée'],
  },
  {
    id: 'langue',
    label: 'Langue et lisibilité',
    points: 2,
    evidence: [
      'Phrases complètes et claires',
      'Accords sujet-verbe et homophones courants maîtrisés',
      'Aucun jugement porté sur une personne',
    ],
  },
]

export type Spec = {
  id: string
  skills: string[]
  title: string
  level?: 'decouverte' | 'entrainement' | 'epreuve'
  support?: string[]
  instruction: string
  minutes?: number
  minWords?: number
  maxWords?: number
  guidance: string[]
  reference: string[]
  weak: string
  weakWhy: string
  strong: string
  strongWhy: string
  difference: string
  other: string[]
}

export const task = (s: Spec): WrittenTask => ({
  id: s.id,
  skillIds: s.skills,
  title: s.title,
  level: s.level ?? 'entrainement',
  support: s.support?.map((t) => p(t)),
  instruction: s.instruction,
  minutes: s.minutes ?? 30,
  minWords: s.minWords ?? 150,
  maxWords: s.maxWords,
  guidance: s.guidance,
  criteria: BAREME,
  reference: s.reference.map((t) => p(t)),
  comparison: {
    weak: { text: s.weak, comment: s.weakWhy },
    strong: { text: s.strong, comment: s.strongWhy },
    difference: s.difference,
  },
  otherAcceptable: s.other,
  origin: 'Sujet original rédigé pour cette application. Aucune reprise d’annales.',
  review: 'relu-par-le-modele',
})

export const WRITTEN_TASKS: WrittenTask[] = [
  task({
    id: 'W01',
    skills: ['F06', 'F07', 'H04'],
    title: 'Accompagner les proches aidants',
    level: 'decouverte',
    instruction:
      'Une structure souhaite mieux accompagner les proches aidants. Expliquez deux difficultés qu’ils peuvent rencontrer, puis proposez une action adaptée.',
    guidance: [
      'Deux difficultés distinctes, pas deux formulations de la même.',
      'Pour chacune, expliquez le mécanisme et pas seulement le constat.',
      'Terminez par une action concrète : qui fait quoi, quand, où.',
      'Répartition conseillée : 5 min de lecture et de plan, 22 min de rédaction, 3 min de relecture.',
    ],
    reference: [
      'Les proches aidants rencontrent d’abord une difficulté liée à la continuité de la charge. Accompagner un proche ne comporte ni horaire ni relève : la disponibilité est permanente et s’ajoute le plus souvent à une activité professionnelle. Cette absence de coupure produit une fatigue qui s’installe lentement, et que l’aidant finit par considérer comme normale.',
      'La seconde difficulté tient à la méconnaissance des dispositifs. Beaucoup ignorent l’existence de l’accueil de jour, de l’hébergement temporaire ou du congé de proche aidant. S’y ajoutent la complexité des démarches et l’idée répandue qu’il serait indigne de demander de l’aide pour s’occuper des siens. Il en résulte un non-recours important, alors même que des droits sont ouverts.',
      'Une action adaptée consisterait à organiser une permanence mensuelle d’information sur les aides, tenue par un travailleur social dans les locaux de la structure, avec une invitation remise directement aux aidants identifiés plutôt qu’une simple affiche. Sa réussite suppose deux conditions : du temps professionnel réellement dégagé, et des places disponibles dans les dispositifs proposés. Informer sur une aide inaccessible produirait l’effet inverse de celui recherché.',
    ],
    weak:
      'Les aidants sont fatigués car ils s’occupent beaucoup de leur proche. C’est difficile pour eux. Ils ne connaissent pas toujours les aides. Il faudrait mieux les informer et les aider davantage.',
    weakWhy:
      'Les deux difficultés sont citées mais jamais expliquées : on ne sait pas pourquoi la fatigue s’installe, ni pourquoi les aides sont méconnues. La proposition finale est un souhait, pas une action : rien n’indique qui agit, ni comment.',
    strong:
      'La première difficulté est la continuité de la charge : l’accompagnement ne comporte ni horaire ni relève, et il s’ajoute souvent à un emploi. Faute de coupure, la fatigue devient durable. La seconde est le non-recours : des aides existent, mais les aidants les ignorent ou renoncent devant la complexité des démarches. Une permanence mensuelle d’information, tenue par un travailleur social et annoncée par une invitation individuelle, répondrait aux deux difficultés, à condition que des places soient réellement disponibles.',
    strongWhy:
      'Chaque difficulté est nommée puis expliquée par un mécanisme. L’action proposée précise l’acteur, la fréquence et le canal, et elle est reliée aux deux difficultés. La condition de réussite montre que la faisabilité a été pensée.',
    difference:
      'Ce qui change n’est pas la longueur mais la présence d’un « parce que » derrière chaque affirmation, et le caractère concret de la proposition. La seconde copie pourrait être mise en œuvre telle quelle ; la première ne dit à personne quoi faire.',
    other: [
      'Retenir l’isolement social comme seconde difficulté, en expliquant comment les renoncements successifs y conduisent.',
      'Proposer comme action un repérage systématique des aidants lors de l’admission, avec une question posée à chacun.',
      'Proposer un groupe d’échange entre aidants animé par un professionnel, en précisant sa fréquence et ses conditions.',
    ],
  }),

  task({
    id: 'W02',
    skills: ['F05', 'F06', 'H06'],
    title: 'Obstacles à l’accès aux soins',
    support: [
      'Dans un territoire fictif, une structure constate que des rendez-vous ne sont pas honorés. Les personnes concernées disposent le plus souvent de droits ouverts. Les entretiens font apparaître trois éléments : les créneaux proposés se situent pendant les heures de travail, le trajet demande deux changements de transport, et plusieurs personnes déclarent ne pas avoir compris les courriers reçus.',
    ],
    instruction:
      'Après avoir relevé deux obstacles évoqués dans le texte, expliquez pourquoi lever un seul d’entre eux ne suffirait pas.',
    guidance: [
      'Commencez par relever : reprenez les éléments du texte, sans les commenter.',
      'Passez ensuite à l’explication : le second travail porte sur le cumul, pas sur chaque obstacle séparément.',
      'Un exemple concret rend l’explication plus solide.',
    ],
    reference: [
      'Le texte signale plusieurs obstacles. Les créneaux de rendez-vous se situent pendant les heures de travail des personnes concernées. Le trajet demande deux changements de transport. Enfin, plusieurs personnes déclarent ne pas avoir compris les courriers reçus.',
      'Lever un seul de ces obstacles ne suffirait pas, parce qu’une démarche de soin suppose que toutes les conditions soient réunies au même moment. Il faut pouvoir se libérer, pouvoir se déplacer et comprendre ce qui est demandé. Si une seule de ces conditions manque, le rendez-vous n’est pas honoré, quelle que soit la volonté de la personne.',
      'Concrètement, proposer un créneau en début de matinée à une personne qui n’a pas compris le courrier d’information ne change rien : elle ne se présentera pas davantage. De même, simplifier le courrier sans modifier l’horaire laisse intacte l’impossibilité de s’absenter. C’est la raison pour laquelle le repérage doit porter sur l’ensemble des obstacles, et non sur celui qui paraît le plus évident.',
    ],
    weak:
      'Les obstacles sont les horaires et les transports. Si on enlève un obstacle il en reste un autre donc ça ne marche pas. Il faut tout régler en même temps.',
    weakWhy:
      'Le relevé est correct mais très bref. L’explication tourne en rond : elle répète l’énoncé au lieu d’expliquer pourquoi le cumul bloque la démarche. Aucun exemple ne vient appuyer le propos.',
    strong:
      'Deux obstacles apparaissent : des créneaux situés pendant les heures de travail, et un trajet nécessitant deux changements. Lever un seul obstacle ne suffit pas, car une démarche de soin exige que toutes les conditions soient réunies au même moment. Proposer un créneau matinal à une personne qui ne peut pas faire le trajet laisse la situation inchangée : la personne ne viendra pas davantage. C’est pourquoi le repérage doit porter sur l’ensemble des freins, y compris la compréhension des courriers, que le texte mentionne aussi.',
    strongWhy:
      'Le relevé est net, l’explication repose sur un mécanisme énoncé clairement, et l’exemple montre concrètement ce qui se passe. La dernière phrase tire une conséquence pratique.',
    difference:
      'La copie solide explique le mécanisme du cumul puis l’illustre. La copie faible affirme la même conclusion sans jamais la démontrer.',
    other: [
      'Retenir la compréhension des courriers comme second obstacle, en expliquant l’effet d’un écrit administratif complexe.',
      'Structurer la réponse en montrant qu’il suffit d’une condition manquante pour annuler toutes les autres.',
    ],
  }),

  task({
    id: 'W03',
    skills: ['F07', 'F11', 'H13'],
    title: 'Respect du refus',
    instruction:
      'Une personne accompagnée refuse un soin d’hygiène. Expliquez la conduite professionnelle attendue et justifiez-la.',
    guidance: [
      'Commencez par ce que dit le droit : le refus est un droit de la personne.',
      'Décrivez ensuite la conduite, étape par étape.',
      'Justifiez : dites pourquoi chaque étape est nécessaire.',
      'N’oubliez pas la transmission.',
    ],
    reference: [
      'Un refus de soin est l’exercice d’un droit. Le consentement doit être libre et éclairé : un accord obtenu après une insistance répétée n’est pas un consentement, puisque la condition de liberté n’est plus remplie.',
      'La conduite attendue comporte plusieurs étapes. Il s’agit d’abord de chercher à comprendre le refus, sans l’interpréter comme une opposition personnelle : une douleur, une fatigue, un sentiment de pudeur ou un moment mal choisi expliquent souvent la situation. Il s’agit ensuite de proposer autrement : différer le soin, modifier la modalité, expliquer à quoi il sert. Il s’agit enfin de transmettre à l’équipe, à l’écrit, en décrivant les faits et ce qui a été proposé.',
      'Chaque étape a une justification. Comprendre permet de lever un obstacle réel plutôt que de forcer. Proposer autrement maintient l’accompagnement sans contrainte. Transmettre permet à l’équipe d’adapter la suite et protège la personne comme le professionnel. À l’inverse, insister jusqu’à obtenir un accord porterait atteinte au consentement, et prendre acte du refus sans jamais rien reproposer reviendrait à abandonner l’accompagnement.',
    ],
    weak:
      'Il faut respecter la personne et ne pas la forcer. On peut essayer de lui expliquer pourquoi c’est important et revenir plus tard. Si elle refuse encore on prévient l’infirmière.',
    weakWhy:
      'La conduite décrite n’est pas fausse, mais rien n’est justifié : on ne sait pas pourquoi le refus doit être respecté, ni ce qu’apporte chaque étape. La notion de consentement n’apparaît pas.',
    strong:
      'Le refus est l’exercice d’un droit : le consentement doit être libre, et un accord obtenu sous insistance n’en est pas un. La conduite consiste d’abord à chercher la raison du refus, qui tient souvent à une douleur, à la fatigue ou au moment choisi. Elle consiste ensuite à proposer autrement : différer, changer de modalité, expliquer l’intérêt du soin. Elle se termine par une transmission écrite décrivant les faits et ce qui a été proposé, afin que l’équipe adapte la suite. Insister jusqu’à l’accord annulerait le consentement ; ne rien reproposer reviendrait à abandonner l’accompagnement.',
    strongWhy:
      'La réponse s’appuie sur la notion de consentement, décrit les étapes et justifie chacune. Elle nomme les deux écueils symétriques, ce qui montre que la question a été comprise dans sa complexité.',
    difference:
      'La copie solide relie chaque geste à un principe. La copie faible décrit une pratique sans savoir sur quoi elle repose, ce qui la rend fragile dès qu’une relance demande « pourquoi ? ».',
    other: [
      'Insister sur la traçabilité écrite du refus et de ce qui a été proposé.',
      'Développer la distinction entre refus ponctuel et refus répété, qui appelle une évaluation.',
    ],
  }),

  task({
    id: 'W04',
    skills: ['F06', 'F07', 'H03'],
    title: 'Autonomie et maintien à domicile',
    instruction:
      'Expliquez pourquoi il ne faut pas confondre autonomie et indépendance dans l’accompagnement d’une personne âgée. Illustrez par un exemple et indiquez une limite.',
    guidance: [
      'Définissez les deux termes en une phrase chacun.',
      'Expliquez ce que la confusion produit concrètement.',
      'Donnez un exemple fictif.',
      'Terminez par une situation où la distinction est plus difficile à appliquer.',
    ],
    reference: [
      'L’autonomie désigne la capacité à décider pour soi-même. L’indépendance désigne la capacité à réaliser seul les actes de la vie quotidienne. Les deux varient séparément : une personne peut avoir besoin d’aide pour se lever tout en décidant pleinement de son organisation.',
      'Confondre les deux conduit à décider à la place de la personne au motif qu’elle a besoin d’aide. C’est une atteinte à ses droits, et c’est aussi une perte d’efficacité : une organisation imposée sans tenir compte des préférences est moins bien acceptée et produit des refus.',
      'Dans une situation fictive, une personne accompagnée pour la toilette se voit imposer un horaire parce qu’elle « ne peut pas faire seule ». Le besoin d’aide a été confondu avec une incapacité à choisir. Lui demander son horaire préféré ne coûte rien et respecte sa décision.',
      'La distinction devient plus difficile lorsque des troubles cognitifs altèrent la capacité à décider. Dans ce cas, la conduite consiste à rechercher les préférences exprimées antérieurement, à solliciter la personne de confiance et les proches, et à associer la personne autant que son état le permet — plutôt qu’à décider seuls au nom de son intérêt supposé.',
    ],
    weak:
      'L’autonomie c’est quand on peut faire les choses tout seul. Il ne faut pas décider à la place des personnes âgées, il faut leur demander leur avis. Par exemple pour la toilette.',
    weakWhy:
      'La définition de l’autonomie est inexacte : elle décrit en réalité l’indépendance. La distinction demandée n’est donc pas faite. L’exemple est amorcé mais pas développé, et aucune limite n’est envisagée.',
    strong:
      'L’autonomie est la capacité de décider pour soi ; l’indépendance est la capacité de faire seul. Les deux varient séparément, ce qui explique qu’une personne aidée pour se lever puisse organiser entièrement sa journée. Les confondre conduit à décider à sa place au motif qu’elle a besoin d’aide : dans un service fictif, un horaire de toilette est imposé sans qu’on ait jamais demandé sa préférence. La distinction devient plus délicate en cas de troubles cognitifs ; la conduite consiste alors à rechercher les volontés exprimées antérieurement et à solliciter la personne de confiance, plutôt qu’à décider seuls.',
    strongWhy:
      'Les deux définitions sont exactes et distinctes. Le mécanisme de la confusion est expliqué, l’exemple est précis, et la limite retenue est réellement difficile, ce qui montre une compréhension fine.',
    difference:
      'La copie solide tient sur une définition juste. Dès que la définition est inexacte, comme dans la première copie, tout le raisonnement qui suit perd sa valeur, même si l’intention est bonne.',
    other: [
      'Illustrer par le choix du lieu de vie plutôt que par la toilette.',
      'Retenir comme limite les situations d’urgence, où la décision doit être prise rapidement.',
    ],
  }),

  task({
    id: 'W05',
    skills: ['F07', 'H20'],
    title: 'Dématérialisation et accès aux droits',
    level: 'epreuve',
    instruction:
      'Une structure envisage de supprimer son accueil téléphonique au profit d’une prise de rendez-vous exclusivement en ligne. Donnez votre avis argumenté.',
    guidance: [
      'Une position claire dès la première phrase.',
      'Deux arguments au moins, chacun expliqué.',
      'Une objection envisagée et traitée.',
      'Une conclusion qui tranche, sans caricature.',
    ],
    reference: [
      'Supprimer entièrement l’accueil téléphonique me paraît inadapté, même si le développement de la prise de rendez-vous en ligne présente des avantages réels.',
      'Le premier argument tient à l’accès aux droits. Une procédure dématérialisée suppose un équipement, une connexion, une adresse électronique et une aisance avec l’écrit. Chacune de ces conditions élimine une partie du public : une procédure qui existe mais reste inaccessible équivaut, pour la personne concernée, à une procédure inexistante.',
      'Le second argument tient à la nature des demandes. Un appel permet de reformuler, de vérifier qu’on a compris, d’orienter vers le bon interlocuteur. Un formulaire en ligne traite bien les demandes simples, mais renvoie les situations complexes vers un renoncement ou vers une file d’attente ailleurs.',
      'On peut objecter que le téléphone mobilise du temps professionnel et que la prise de rendez-vous en ligne libère précisément ce temps. L’objection est fondée, mais elle plaide pour un accueil téléphonique sur des plages identifiées plutôt que pour sa suppression : l’essentiel du gain est conservé, tandis que l’accès est maintenu.',
      'Je retiens donc le maintien d’une ligne téléphonique sur des créneaux annoncés, en complément de l’outil en ligne, à condition que cette alternative soit signalée aussi visiblement que la procédure numérique. Une solution de secours que personne ne connaît ne remplit pas sa fonction.',
    ],
    weak:
      'Je pense que c’est une mauvaise idée car tout le monde n’a pas internet. Les personnes âgées ne savent pas utiliser les ordinateurs. Il faut garder le téléphone pour eux.',
    weakWhy:
      'La position est claire mais les arguments reposent sur une généralisation (« les personnes âgées ne savent pas ») qui est à la fois inexacte et stigmatisante. Aucune objection n’est envisagée, et la proposition finale n’est pas précisée.',
    strong:
      'Supprimer entièrement l’accueil téléphonique me paraît inadapté. Une procédure dématérialisée suppose un équipement, une connexion et une aisance avec l’écrit : chacune de ces conditions écarte une partie du public, et une procédure inaccessible équivaut à une procédure inexistante. Par ailleurs, l’appel permet de reformuler et d’orienter, ce qu’un formulaire ne fait pas pour les situations complexes. On objectera que le téléphone coûte du temps professionnel ; c’est exact, mais cela plaide pour un accueil sur des plages identifiées plutôt que pour sa suppression. Je retiens donc le maintien d’une ligne téléphonique sur des créneaux annoncés aussi visiblement que l’outil en ligne.',
    strongWhy:
      'La position est tenue du début à la fin. Deux arguments distincts sont expliqués, une objection est prise au sérieux puis traitée, et la conclusion propose une solution précise plutôt qu’un refus.',
    difference:
      'La différence décisive est le traitement de l’objection. La copie faible ignore l’argument adverse ; la copie solide le reprend et montre qu’il conduit à une solution intermédiaire. C’est ce qui distingue une opinion d’une argumentation.',
    other: [
      'Défendre la position inverse est recevable, à condition de traiter l’objection de l’accès aux droits et de proposer un accompagnement.',
      'Retenir comme argument la confidentialité des échanges plutôt que la complexité des demandes.',
    ],
  }),

  task({
    id: 'W06',
    skills: ['F06', 'H01'],
    title: 'Agir sur l’environnement ou sur les comportements',
    instruction:
      'Expliquez pourquoi agir sur l’environnement peut être plus efficace que de rappeler aux personnes d’être prudentes. Donnez un exemple et une limite.',
    guidance: [
      'Posez votre idée en une phrase.',
      'Expliquez pourquoi un rappel verbal produit peu d’effet.',
      'Donnez un exemple fictif précis.',
      'Terminez par ce que l’action sur l’environnement ne règle pas.',
    ],
    reference: [
      'Agir sur l’environnement est souvent plus efficace qu’un rappel à la prudence, parce qu’un rappel suppose que la personne dispose déjà des moyens de modifier son comportement. Or ce n’est pas toujours le cas : une personne fatiguée en fin de journée ne devient pas plus vigilante parce qu’on le lui demande.',
      'L’action sur l’environnement présente en outre l’avantage d’être permanente et de bénéficier à tout le monde, y compris aux personnes qui n’auraient pas entendu ou retenu le message.',
      'Dans une résidence fictive, plusieurs chutes se produisaient dans un couloir mal éclairé, en fin de journée. Renforcer l’éclairage et retirer un tapis mal fixé a supprimé la cause, sans rien exiger des résidents. Aucun rappel n’a été nécessaire.',
      'Cette approche a toutefois ses limites. Elle ne remplace pas l’évaluation individuelle : certaines chutes relèvent d’un trouble de l’équilibre, d’une baisse de vision ou d’un effet de traitement, qui demandent une réponse personnalisée. Agir sur l’environnement et accompagner la personne se complètent plutôt qu’ils ne s’opposent.',
    ],
    weak:
      'Il vaut mieux aménager les lieux car les gens n’écoutent pas toujours les conseils. Par exemple mettre de la lumière. Mais il faut quand même faire attention.',
    weakWhy:
      '« Les gens n’écoutent pas » est un jugement, pas une explication. L’exemple est réduit à trois mots. La limite finale est trop vague pour signifier quelque chose.',
    strong:
      'Agir sur l’environnement est souvent plus efficace qu’un rappel à la prudence, parce qu’un rappel suppose que la personne puisse déjà modifier son comportement : une personne fatiguée en fin de journée ne devient pas plus vigilante sur demande. L’aménagement, lui, produit un effet permanent et profite à tous. Dans une résidence fictive, l’éclairage renforcé d’un couloir et le retrait d’un tapis mal fixé ont supprimé la cause des chutes sans rien exiger des résidents. Cette approche ne dispense cependant pas de l’évaluation individuelle : une chute peut relever d’un trouble de l’équilibre ou d’un effet de traitement, qui appelle une réponse personnalisée.',
    strongWhy:
      'Le mécanisme est expliqué sans jugement sur les personnes. L’exemple est daté, situé et précis. La limite est réelle et bien choisie : elle ne détruit pas l’argument, elle le borne.',
    difference:
      'La copie solide explique pourquoi le rappel ne fonctionne pas, sans accuser les personnes. C’est à la fois plus juste et plus professionnel : le correcteur y lit une posture, pas seulement une connaissance.',
    other: [
      'Illustrer par la disposition des solutions hydro-alcooliques plutôt que par l’éclairage.',
      'Retenir comme limite le coût des aménagements et les contraintes de locaux.',
    ],
  }),

  task({
    id: 'W07',
    skills: ['F07', 'H12'],
    title: 'Analyser une erreur sans chercher un coupable',
    level: 'epreuve',
    instruction:
      'Expliquez pourquoi analyser une erreur en cherchant les causes d’organisation est plus efficace que de désigner un responsable. Nuancez votre propos.',
    guidance: [
      'Posez votre position.',
      'Comparez ce que produit chacune des deux approches.',
      'Donnez un exemple fictif.',
      'Précisez ce que votre position ne signifie pas.',
    ],
    reference: [
      'Analyser une erreur en cherchant les causes d’organisation est plus efficace que de désigner un responsable, parce que seule la première approche agit sur ce qui peut être modifié.',
      'Désigner un responsable règle la question de la culpabilité, mais laisse en place le contexte qui a rendu l’erreur possible : la même situation reproduira le même événement avec une autre personne. Cette approche a un second effet, plus grave : elle fait disparaître les signalements. Une équipe qui craint la sanction cesse de déclarer, sans que le risque diminue pour autant.',
      'Dans une situation fictive, un soin non réalisé est d’abord attribué à un oubli individuel. L’analyse collective montre que l’information avait été donnée oralement pendant un pic d’activité et que la fiche de liaison n’était pas accessible depuis le poste concerné. Deux mesures — un temps de transmission protégé et une fiche au point d’usage — suppriment la cause.',
      'Cette position ne signifie pas qu’aucune responsabilité individuelle n’existe. Un manquement délibéré aux règles ou la dissimulation d’un événement relèvent d’un autre registre. La démarche de sécurité vise les erreurs, qui sont involontaires par définition et qui constituent la très grande majorité des cas.',
    ],
    weak:
      'Il ne faut pas punir les gens qui font des erreurs car tout le monde peut se tromper. Il vaut mieux comprendre ce qui s’est passé et améliorer l’organisation pour que cela ne se reproduise pas.',
    weakWhy:
      'La position est juste mais reste au niveau du principe. Aucun exemple, aucun mécanisme expliqué, et surtout aucune nuance : la copie ne dit jamais où s’arrête ce raisonnement, ce qui la rend naïve.',
    strong:
      'Chercher les causes d’organisation est plus efficace que désigner un responsable, car seule cette approche agit sur ce qui peut être modifié. Sanctionner règle la culpabilité mais laisse le contexte intact, et fait disparaître les signalements sans faire disparaître le risque. Dans une situation fictive, un soin non réalisé est d’abord imputé à un oubli ; l’analyse montre que l’information avait été transmise oralement pendant un pic d’activité, sans support accessible. Un temps de transmission protégé et une fiche au point d’usage suppriment la cause. Cela ne signifie pas qu’aucune responsabilité individuelle n’existe : un manquement délibéré ou une dissimulation relèvent d’un autre registre.',
    strongWhy:
      'Le mécanisme du signalement qui disparaît est le cœur de l’argument, et il est explicité. L’exemple débouche sur des mesures concrètes. La nuance finale empêche de lire la copie comme un plaidoyer pour l’impunité.',
    difference:
      'La nuance change tout. Sans elle, le correcteur peut comprendre que rien n’est jamais imputable à personne. Avec elle, la copie montre qu’on distingue l’erreur de la faute.',
    other: [
      'Développer la notion de presque-accident et son intérêt pour la prévention.',
      'Retenir comme exemple une erreur d’identité rattrapée avant qu’elle n’atteigne la personne.',
    ],
  }),

  task({
    id: 'W08',
    skills: ['F04', 'F05', 'H10'],
    title: 'Vivre avec une maladie chronique',
    instruction:
      'Expliquez ce que change une maladie chronique dans la vie quotidienne d’une personne, puis indiquez comment un professionnel peut l’accompagner.',
    guidance: [
      'Deux parties : ce que cela change, puis l’accompagnement.',
      'Évitez la liste de symptômes : la question porte sur la vie quotidienne.',
      'L’accompagnement doit rester dans le champ de compétence décrit.',
    ],
    reference: [
      'Une maladie chronique modifie la vie quotidienne bien au-delà des symptômes. La personne réalise elle-même l’essentiel des gestes de soin entre les consultations : prises de traitement, surveillance, adaptation de l’activité, gestion des rendez-vous. Cette charge quotidienne, souvent invisible, s’ajoute à la vie professionnelle et familiale.',
      'Le retentissement est aussi social. La maladie peut peser sur l’emploi, sur les relations, sur l’image de soi et sur les projets. Ce retentissement est parfois plus lourd à vivre que les manifestations physiques elles-mêmes.',
      'L’accompagnement professionnel consiste d’abord à partir de ce que la personne vit réellement, plutôt que de ce qu’elle devrait faire. Interroger concrètement le déroulement des prises de traitement fait apparaître des obstacles — horaires incompatibles, effets gênants, coût — qui peuvent être levés, là où parler de « mauvaise observance » ferme la discussion.',
      'Il consiste ensuite à soutenir les compétences de la personne : repérer les signes d’alerte, savoir qui contacter, comprendre à quoi sert chaque élément du suivi. Cet accompagnement relève d’une démarche d’équipe, et la décision finale appartient à la personne.',
    ],
    weak:
      'Une maladie chronique dure longtemps et il faut prendre des médicaments tous les jours. C’est fatigant. Le professionnel doit encourager la personne à bien suivre son traitement et lui expliquer que c’est important pour sa santé.',
    weakWhy:
      'La première partie reste au niveau du symptôme et ne dit rien de la vie quotidienne. La seconde propose d’« encourager » et d’« expliquer que c’est important », ce qui revient à une injonction : c’est précisément ce qui ne fonctionne pas.',
    strong:
      'Une maladie chronique déplace l’essentiel du soin vers la personne elle-même : entre les consultations, elle gère les traitements, la surveillance, les rendez-vous et l’adaptation de son activité. Cette charge quotidienne est invisible et s’ajoute au travail et à la vie familiale. Le retentissement est aussi social, sur l’emploi, les relations et les projets. L’accompagnement consiste à partir de ce que la personne vit : demander comment se passe concrètement la prise du traitement fait apparaître des obstacles — horaires, effets gênants, coût — qu’on peut lever, là où parler de mauvaise observance ferme la discussion. Il s’agit ensuite de soutenir ses compétences : repérer les signes d’alerte et savoir qui contacter.',
    strongWhy:
      'La notion de charge quotidienne transférée à la personne structure toute la copie. L’accompagnement proposé est une démarche, pas une exhortation, et il découle directement de la première partie.',
    difference:
      'La copie faible propose d’encourager ; la copie solide propose de chercher l’obstacle. C’est le même écart qu’entre un conseil et un accompagnement.',
    other: [
      'Développer l’éducation thérapeutique du patient comme réponse structurée.',
      'Insister sur la coordination entre professionnels comme élément de l’accompagnement.',
    ],
  }),

  task({
    id: 'W09',
    skills: ['F07', 'H19'],
    title: 'Prévention et vagues de chaleur',
    instruction:
      'Expliquez pourquoi les conseils de prévention ne suffisent pas en période de forte chaleur, et proposez une action complémentaire.',
    guidance: [
      'Posez l’idée en une phrase.',
      'Expliquez ce que les conseils supposent implicitement.',
      'Donnez un exemple fictif.',
      'Proposez une action, avec sa condition de réussite.',
    ],
    reference: [
      'Les conseils de prévention — boire régulièrement, rester au frais, aérer la nuit — ne suffisent pas, parce qu’ils supposent des conditions matérielles qui ne sont pas toujours réunies.',
      'Une personne vivant sous les toits, sans volets, et qui ne sort plus de chez elle, ne peut appliquer aucun de ces conseils, quelle que soit sa bonne volonté. La vulnérabilité ne dépend donc pas seulement de l’état de santé, mais aussi du logement, de l’isolement et de la possibilité concrète de se protéger.',
      'Dans une commune fictive, l’information avait été largement diffusée, mais les situations les plus critiques concernaient des personnes isolées que personne n’avait contactées. Les conseils avaient atteint celles qui pouvaient déjà se protéger.',
      'Une action complémentaire consiste à constituer avant l’été, avec leur accord, une liste des personnes isolées à contacter, puis à organiser des appels quotidiens pendant l’épisode et à identifier un lieu frais accessible. La condition de réussite est que le recensement soit préparé à l’avance : improvisé pendant la vague de chaleur, il manquerait précisément les personnes les plus isolées.',
    ],
    weak:
      'Les conseils ne suffisent pas car certaines personnes ne peuvent pas les suivre. Il faudrait aller les voir et vérifier qu’elles vont bien pendant les fortes chaleurs.',
    weakWhy:
      'L’idée est juste mais jamais développée : on ne sait pas pourquoi certaines personnes ne peuvent pas suivre les conseils. L’action proposée ne précise ni qui agit, ni comment on sait qui aller voir.',
    strong:
      'Les conseils de prévention supposent des conditions matérielles qui ne sont pas toujours réunies : une personne vivant sous les toits, sans volets et qui ne sort plus, ne peut ni rester au frais ni aérer efficacement. La vulnérabilité dépend donc du logement et de l’isolement autant que de l’état de santé. Dans une commune fictive, l’information avait été largement diffusée, mais les situations critiques concernaient des personnes que personne n’avait contactées. Une action complémentaire consiste à recenser avant l’été, avec leur accord, les personnes isolées, puis à organiser des appels quotidiens pendant l’épisode. La réussite tient au caractère anticipé du recensement : improvisé, il manquerait les plus isolées.',
    strongWhy:
      'Le mécanisme est explicité par un cas concret de logement. L’action précise le moment, le support et le consentement. La condition de réussite est le point le plus fort : elle montre qu’on a anticipé la difficulté de mise en œuvre.',
    difference:
      'La copie solide dit pourquoi le recensement doit être fait avant l’été. C’est un détail d’exécution, et c’est pourtant ce qui détermine l’efficacité du dispositif.',
    other: [
      'Proposer un repérage lors des passages à domicile des professionnels déjà en place.',
      'Retenir comme condition de réussite la coordination entre commune, services d’aide à domicile et professionnels de santé.',
    ],
  }),

  task({
    id: 'W10',
    skills: ['F06', 'F11', 'H14'],
    title: 'Bientraitance et organisation',
    level: 'epreuve',
    instruction:
      'Expliquez pourquoi la bientraitance ne se réduit pas à l’absence de maltraitance. Illustrez par un exemple d’organisation et indiquez une contrainte réelle.',
    guidance: [
      'Distinguez clairement les deux notions.',
      'Expliquez ce que la démarche de bientraitance ajoute.',
      'Prenez un exemple organisationnel, pas un geste individuel.',
      'Nommez une contrainte matérielle honnête.',
    ],
    reference: [
      'La bientraitance ne se réduit pas à l’absence de maltraitance, parce qu’une organisation peut ne commettre aucun acte répréhensible tout en produisant, par ses habitudes, des effets contraires au respect de la personne.',
      'Ne pas nuire est un minimum. La bientraitance suppose d’interroger régulièrement ce que les pratiques produisent réellement pour les personnes accompagnées, ce qui en fait une démarche collective et continue plutôt qu’une qualité individuelle.',
      'Dans un service fictif, les toilettes sont réalisées entre six et huit heures pour tenir le planning, y compris pour des personnes qui souhaiteraient se lever plus tard. Aucun professionnel n’a l’intention de nuire, et pourtant le choix est retiré chaque jour. Le repérage est venu d’une question posée en réunion : accepterait-on cette organisation pour soi-même ?',
      'La principale contrainte est matérielle. Recueillir les préférences et organiser les soins par vagues demande du temps et un effectif suffisant. Reconnaître cette contrainte en équipe vaut mieux qu’un discours de bientraitance reposant uniquement sur la bonne volonté individuelle : celui-ci finit par culpabiliser des professionnels sans leur donner de marge d’action.',
    ],
    weak:
      'La bientraitance c’est plus que ne pas maltraiter. Il faut être attentif aux personnes et respecter leurs souhaits. Par exemple demander à quelle heure elles veulent se lever. Mais ce n’est pas toujours possible.',
    weakWhy:
      'La distinction est affirmée sans être expliquée. L’exemple est amorcé mais pas construit, et la contrainte finale reste allusive : « pas toujours possible » ne dit pas pourquoi.',
    strong:
      'Une organisation peut ne commettre aucun acte répréhensible tout en produisant des effets contraires au respect de la personne : c’est pourquoi la bientraitance ne se réduit pas à l’absence de maltraitance. Elle suppose d’interroger régulièrement ce que les pratiques produisent réellement, ce qui en fait une démarche collective et continue. Dans un service fictif, les toilettes sont réalisées entre six et huit heures pour tenir le planning, y compris pour des personnes qui se lèveraient plus tard : le choix est retiré chaque jour sans qu’aucune intention de nuire n’existe. La contrainte est matérielle : recueillir les préférences et organiser par vagues demande du temps et un effectif suffisant, et il vaut mieux le dire que faire reposer la bientraitance sur la seule bonne volonté.',
    strongWhy:
      'L’exemple porte sur une organisation, comme demandé, et met en évidence l’absence d’intention de nuire — c’est ce qui rend la notion de maltraitance institutionnelle compréhensible. La contrainte est nommée précisément.',
    difference:
      'La copie solide montre qu’un effet maltraitant peut exister sans auteur. C’est l’idée centrale du sujet, et la copie faible passe à côté en restant sur le registre de l’attention individuelle.',
    other: [
      'Prendre comme exemple les horaires de repas ou l’absence d’intimité lors des soins.',
      'Développer le rôle des temps d’analyse des pratiques comme réponse organisationnelle.',
    ],
  }),

  task({
    id: 'W11',
    skills: ['F05', 'F08', 'H02'],
    title: 'Ruptures de parcours à la sortie d’hospitalisation',
    instruction:
      'Expliquez pourquoi les sorties d’hospitalisation constituent un moment à risque de rupture de parcours, et proposez deux actions.',
    guidance: [
      'Expliquez d’abord le mécanisme de la rupture.',
      'Proposez ensuite deux actions distinctes.',
      'Pour chaque action, dites qui agit.',
    ],
    reference: [
      'La sortie d’hospitalisation est un moment à risque parce qu’elle fait passer la personne d’une équipe qui la connaît à des intervenants qui ne la connaissent pas, souvent en quelques heures. Tout ce qui a été observé pendant le séjour doit alors être transmis à des professionnels qui n’étaient pas présents.',
      'Les ruptures viennent moins d’un défaut de compétence que d’un défaut de transmission. Si la lettre de liaison n’arrive pas au médecin traitant, celui-ci ignore les changements intervenus. Si l’infirmier libéral n’est pas prévenu à temps, les soins s’interrompent. Si les aides à domicile ne sont pas en place, le retour devient impossible et conduit parfois à une réhospitalisation.',
      'Une première action consiste à anticiper la sortie dès le début du séjour, en identifiant les intervenants du domicile et en vérifiant leur disponibilité. Cette anticipation relève de l’équipe hospitalière, en lien avec le service social.',
      'Une seconde action consiste à remettre à la personne un document unique, rédigé en termes compréhensibles, indiquant ce qui a été fait, ce qui est prévu et qui contacter en cas de difficulté. Elle dispose ainsi d’un support même si une transmission entre professionnels s’égare.',
    ],
    weak:
      'À la sortie de l’hôpital il y a souvent des problèmes car les informations ne sont pas transmises. Il faudrait mieux communiquer entre les professionnels et prévenir le médecin traitant.',
    weakWhy:
      'Le constat est juste mais le mécanisme n’est pas expliqué. « Mieux communiquer » n’est pas une action : rien n’indique qui fait quoi ni à quel moment.',
    strong:
      'La sortie d’hospitalisation fait passer la personne d’une équipe qui la connaît à des intervenants qui ne la connaissent pas, souvent en quelques heures : tout ce qui a été observé doit être transmis à des professionnels absents pendant le séjour. Les ruptures viennent donc du défaut de transmission plus que du défaut de compétence — sans lettre de liaison, le médecin traitant ignore les changements ; sans information préalable, l’infirmier libéral n’est pas disponible. Deux actions : anticiper la sortie dès le début du séjour en identifiant les intervenants du domicile, ce qui relève de l’équipe hospitalière et du service social ; et remettre à la personne un document unique et compréhensible indiquant ce qui a été fait, ce qui est prévu et qui contacter.',
    strongWhy:
      'Le mécanisme est expliqué par le changement d’équipe, ce qui rend la suite logique. Les deux actions sont distinctes, attribuées à un acteur, et la seconde est robuste : elle fonctionne même si la première échoue.',
    difference:
      'La copie solide propose une action qui tient compte de l’échec possible de l’autre. Ce niveau de réalisme est ce que le correcteur cherche dans une proposition.',
    other: [
      'Proposer un appel de suivi quelques jours après le retour à domicile.',
      'Développer le rôle de la personne et de ses proches comme porteurs de l’information.',
    ],
  }),

  task({
    id: 'W12',
    skills: ['F07', 'H23'],
    title: 'Information fiable en santé',
    instruction:
      'Une personne vous rapporte une information de santé lue sur internet, qui vous paraît inexacte. Expliquez comment vous réagissez et pourquoi.',
    guidance: [
      'Décrivez votre conduite, étape par étape.',
      'Justifiez chaque étape.',
      'Restez dans votre champ de compétence.',
      'Terminez par ce que vous ne feriez pas, et pourquoi.',
    ],
    reference: [
      'La première étape consiste à écouter ce que la personne a compris et pourquoi cela lui paraît crédible, sans la contredire d’emblée. Une contradiction immédiate met la personne en position de défendre son information plutôt que de l’examiner.',
      'La deuxième étape consiste à examiner ensemble la source : qui l’a produite, quand, sur quelle base. Une information sans auteur ni date ne peut pas être évaluée, et le dire est déjà une réponse.',
      'La troisième étape consiste à orienter vers une source fiable — Santé publique France, Haute Autorité de santé, Assurance maladie — ou vers le professionnel compétent lorsque la question relève d’une décision médicale.',
      'Je ne prétendrais pas trancher moi-même une question qui dépasse mon champ de compétence, et je n’affirmerais pas de mémoire une règle susceptible d’avoir changé. Dire « je ne suis pas certaine, vérifions ensemble » est une réponse professionnelle : elle protège la personne d’une information fausse et préserve la relation de confiance, ce qu’une affirmation erronée détruirait durablement.',
    ],
    weak:
      'Je lui dirais que ce n’est pas vrai et qu’il ne faut pas croire tout ce qu’on lit sur internet. Je lui conseillerais de demander à son médecin.',
    weakWhy:
      'La conclusion est correcte, mais la manière de l’atteindre est brutale : contredire d’emblée met la personne sur la défensive. Surtout, rien n’est expliqué sur la manière d’évaluer une source.',
    strong:
      'J’écouterais d’abord ce que la personne a compris et pourquoi cela lui paraît crédible : la contredire immédiatement la conduirait à défendre son information au lieu de l’examiner. Nous regarderions ensuite la source ensemble — qui l’a écrite, quand, sur quelle base —, car une information sans auteur ni date ne peut pas être évaluée. J’orienterais enfin vers une source fiable ou vers le professionnel compétent si la question relève d’une décision médicale. Je ne trancherais pas moi-même une question qui dépasse mon champ, et je n’affirmerais pas de mémoire une règle qui a pu changer : dire « vérifions ensemble » protège la personne et préserve la confiance.',
    strongWhy:
      'La conduite est décrite étape par étape et chaque étape est justifiée. L’examen de la source est une compétence transmise à la personne, pas seulement une correction. La limite de compétence est explicitement posée.',
    difference:
      'La copie faible corrige ; la copie solide apprend à vérifier. La première règle un cas, la seconde donne un outil réutilisable — et elle préserve la relation.',
    other: [
      'Insister davantage sur les critères de fiabilité d’une source et les nommer.',
      'Développer le risque de rompre la confiance en contredisant sèchement, avec un exemple.',
    ],
  }),
]
