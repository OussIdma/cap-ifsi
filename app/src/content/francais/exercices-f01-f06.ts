/**
 * Micro-exercices de français — F01 à F06.
 * Tous les textes supports sont originaux et fictifs.
 */

import type { FrenchExercise } from '../types'
import { mini } from './builder'

export const EX_F01_F06: FrenchExercise[] = [
  // ------------------------------------------------------------------ F01
  mini({
    id: 'F01-verbe-citer',
    skill: 'F01',
    level: 'decouverte',
    structure: 'identifier-le-travail-demande',
    q: 'Consigne : « Relevez dans le texte deux conséquences de l’isolement. » Quel travail est demandé ?',
    choices: [
      { label: 'Reprendre deux éléments écrits dans le texte, sans les commenter', ok: true },
      { label: 'Donner votre avis sur l’isolement', why: 'Aucun avis n’est demandé : « relever » porte uniquement sur le contenu du texte.' },
      { label: 'Expliquer longuement pourquoi l’isolement existe', why: '« Relever » n’est pas « expliquer » : on ne demande pas les causes, et pas de développement.' },
      { label: 'Résumer tout le texte', why: 'La consigne cible deux conséquences précises, pas l’ensemble du texte.' },
    ],
    h: [
      'Regardez uniquement le verbe de la consigne.',
      '« Relever » signifie prendre dans le texte. Cherchez ensuite combien d’éléments sont demandés.',
    ],
    alt: [
      'Transformez la consigne en question simple : « Qu’est-ce que le texte dit que l’isolement entraîne ? »',
      'Formulée ainsi, la consigne ne demande manifestement ni votre opinion, ni une explication personnelle.',
    ],
    sol: [
      { text: 'Le verbe est « relevez ».', why: 'Il impose de puiser dans le texte, sans commentaire.' },
      { text: 'Le nombre est « deux ».', why: 'Donner une seule conséquence laisse la moitié de la consigne sans réponse.' },
    ],
    sec: 40,
  }),
  mini({
    id: 'F01-verbe-expliquer',
    skill: 'F01',
    structure: 'distinguer-expliquer-et-decrire',
    text: 'Consigne : « Expliquez pourquoi certaines personnes renoncent à consulter un médecin. »',
    q: 'Laquelle de ces réponses correspond réellement à la consigne ?',
    choices: [
      {
        label:
          'Certaines personnes renoncent parce que les délais sont longs et que le déplacement coûte cher : quand les deux se cumulent, le rendez-vous est repoussé puis abandonné.',
        ok: true,
      },
      {
        label: 'Beaucoup de personnes ne vont pas chez le médecin. C’est un problème fréquent aujourd’hui.',
        why: 'Cette réponse décrit le phénomène mais ne dit jamais pourquoi il se produit. « Expliquer » demande une cause.',
      },
      {
        label: 'Il faudrait ouvrir plus de cabinets médicaux dans les quartiers éloignés.',
        why: 'C’est une proposition d’action. La consigne demande d’expliquer, pas de proposer.',
      },
    ],
    h: [
      'Cherchez quelle réponse contient un « parce que », explicite ou implicite.',
      'Expliquer, c’est relier un fait à sa cause. Une réponse qui ne fait que constater ne répond pas.',
    ],
    alt: [
      'Testez chaque réponse en lui posant la question « pourquoi ? ».',
      'Si la réponse ne survit pas à cette question, c’est qu’elle n’explique rien.',
    ],
    sol: [
      { text: 'Seule la première réponse donne des causes.', why: 'Elle nomme deux facteurs et montre comment ils se cumulent.' },
      { text: 'Constater et proposer ne sont pas expliquer.', why: 'Chaque verbe de consigne appelle un travail différent.' },
    ],
  }),
  mini({
    id: 'F01-nombre-attendu',
    skill: 'F01',
    structure: 'reperer-le-nombre-de-reponses-attendues',
    text: 'Consigne : « Après avoir cité trois acteurs intervenant à domicile, précisez le rôle de l’un d’entre eux. »',
    q: 'Combien d’éléments la copie doit-elle contenir au minimum ?',
    choices: [
      { label: 'Trois acteurs cités, puis un rôle développé', ok: true },
      { label: 'Trois acteurs cités et les trois rôles développés', why: 'La consigne précise « l’un d’entre eux » : un seul rôle est demandé.' },
      { label: 'Un acteur et son rôle', why: 'Trois acteurs sont explicitement demandés.' },
      { label: 'Trois rôles, sans citer les acteurs', why: 'Citer les acteurs fait partie de la consigne.' },
    ],
    h: ['Comptez les nombres présents dans la consigne.', 'Repérez le groupe « l’un d’entre eux » : il limite le second travail à un seul élément.'],
    alt: [
      'Découpez la consigne en deux ordres séparés par « puis ».',
      'Premier ordre : citer trois acteurs. Second ordre : préciser un rôle. Deux travaux, deux comptes différents.',
    ],
    sol: [
      { text: 'Premier travail : trois acteurs.', why: 'Le nombre est explicite.' },
      { text: 'Second travail : un seul rôle.', why: '« L’un d’entre eux » désigne un élément parmi les trois.' },
    ],
    sec: 40,
  }),
  mini({
    id: 'F01-hors-sujet',
    skill: 'F01',
    structure: 'reperer-un-hors-sujet',
    text: 'Consigne : « Résumez en cinq lignes les difficultés évoquées par le texte. »',
    q: 'Quelle phrase constitue un hors-sujet dans cette réponse ?',
    choices: [
      { label: 'Je trouve que la société ne s’occupe pas assez de ces questions.', ok: true },
      { label: 'Le texte évoque d’abord l’allongement des délais de rendez-vous.', why: 'Cette phrase restitue le contenu du texte : elle est dans le sujet.' },
      { label: 'Il mentionne ensuite les difficultés de transport.', why: 'Il s’agit encore d’une restitution des difficultés évoquées.' },
      { label: 'Enfin, il signale le manque d’information sur les aides existantes.', why: 'Toujours une difficulté issue du texte.' },
    ],
    h: ['Un résumé restitue le texte et rien d’autre.', 'Cherchez la phrase qui exprime un avis personnel.'],
    alt: [
      'Demandez-vous pour chaque phrase : « cette information vient-elle du texte ? »',
      'Si elle vient de vous, elle n’a pas sa place dans un résumé.',
    ],
    sol: [
      { text: '« Je trouve que » signale une opinion.', why: 'Le résumé ne contient jamais le point de vue de la candidate.' },
    ],
    sec: 40,
  }),
  mini({
    id: 'F01-longueur',
    skill: 'F01',
    structure: 'respecter-la-longueur-demandee',
    text: 'Consigne : « En dix lignes maximum, expliquez l’intérêt d’une information claire sur les aides existantes. »',
    q: 'Que se passe-t-il si vous écrivez vingt-cinq lignes très pertinentes ?',
    choices: [
      { label: 'La longueur fait partie de la consigne : la dépasser largement est sanctionné, même si le contenu est bon', ok: true },
      { label: 'Rien, puisque le contenu est juste', why: 'La capacité à répondre dans une longueur imposée est précisément l’une des compétences évaluées.' },
      { label: 'La copie est automatiquement annulée', why: 'Il n’y a pas d’annulation automatique : la consigne est simplement mal respectée.' },
    ],
    h: ['Relisez la consigne : elle fixe une limite explicite.', 'Demandez-vous ce que le correcteur évalue en imposant une longueur.'],
    alt: [
      'Considérez la longueur comme une contrainte de travail, au même titre que le temps.',
      'À l’épreuve, savoir tenir en dix lignes montre que vous savez hiérarchiser. C’est une compétence évaluée, pas une formalité.',
    ],
    sol: [{ text: 'La longueur est une consigne à part entière.', why: 'Le respect du format compte dans l’évaluation.' }],
    sec: 35,
  }),
  mini({
    id: 'F01-comparer',
    skill: 'F01',
    structure: 'comprendre-le-verbe-comparer',
    q: 'Consigne : « Comparez l’accompagnement à domicile et l’accompagnement en établissement. » Que doit contenir la réponse ?',
    choices: [
      { label: 'Des points communs et des différences entre les deux', ok: true },
      { label: 'Uniquement les avantages du domicile', why: 'Comparer ne signifie pas défendre l’une des deux options.' },
      { label: 'Une description séparée de chacun, sans mise en relation', why: 'Décrire l’un puis l’autre n’est pas comparer : il faut les mettre en regard.' },
      { label: 'Le choix que vous feriez personnellement', why: 'Aucun avis n’est demandé par le verbe « comparer ».' },
    ],
    h: ['Comparer suppose au moins deux éléments mis en relation.', 'Une comparaison complète dit ce qui rapproche ET ce qui sépare.'],
    alt: [
      'Construisez mentalement un tableau à deux colonnes.',
      'Ce que vous écririez dans la ligne « points communs » et dans la ligne « différences » constitue la réponse attendue.',
    ],
    sol: [{ text: 'Comparer = ressemblances + différences.', why: 'Une comparaison qui n’énonce que des différences reste incomplète.' }],
    sec: 40,
  }),
  mini({
    id: 'F01-proposer',
    skill: 'F01',
    structure: 'comprendre-le-verbe-proposer',
    q: 'Consigne : « Proposez une action adaptée. » Quelle réponse correspond le mieux ?',
    choices: [
      {
        label:
          'Organiser, une fois par mois, une permanence d’information sur les aides, animée par un travailleur social, dans le hall de la structure.',
        ok: true,
      },
      { label: 'Il faudrait que les gens soient mieux informés.', why: 'C’est un souhait, pas une action : rien n’indique qui fait quoi, ni comment.' },
      { label: 'Le manque d’information est un problème important.', why: 'C’est un constat. La consigne demande une action.' },
    ],
    h: ['Une action se reconnaît à ce qu’on peut l’organiser concrètement.', 'Demandez-vous : qui fait quoi, quand, où ?'],
    alt: [
      'Testez la réponse en imaginant qu’on vous demande de la mettre en œuvre demain.',
      'Si vous ne sauriez pas par où commencer, la proposition est trop vague.',
    ],
    sol: [
      { text: 'Une proposition doit être concrète et réalisable.', why: 'Elle précise l’acteur, la fréquence et le lieu.' },
      { text: 'Un souhait n’est pas une proposition.', why: '« Il faudrait » ne dit ni qui agit ni comment.' },
    ],
  }),
  mini({
    id: 'F01-ordre-consigne',
    skill: 'F01',
    level: 'epreuve',
    structure: 'ordonner-les-etapes-d-une-reponse',
    transfer: true,
    text: 'Consigne : « Après avoir défini la notion de prévention, expliquez son intérêt, puis proposez une action de prévention adaptée à un public âgé. »',
    q: 'Remettez dans l’ordre les étapes de la réponse.',
    order: [
      { id: 'def', label: 'Définir la prévention en une ou deux phrases' },
      { id: 'exp', label: 'Expliquer à quoi elle sert, avec un mécanisme' },
      { id: 'act', label: 'Proposer une action concrète pour un public âgé' },
    ],
    h: ['La consigne donne elle-même l’ordre des travaux.', 'Repérez les mots « après avoir », « puis ».'],
    alt: [
      'Soulignez chaque verbe de la consigne dans l’ordre où il apparaît.',
      'Cet ordre est exactement celui de votre plan : le correcteur suit la consigne pour vous lire.',
    ],
    sol: [
      { text: 'Définir, puis expliquer, puis proposer.', why: 'On ne peut pas expliquer l’intérêt d’une notion qu’on n’a pas définie.' },
    ],
    sec: 60,
  }),

  // ------------------------------------------------------------------ F02
  mini({
    id: 'F02-idee-principale',
    skill: 'F02',
    level: 'decouverte',
    structure: 'identifier-l-idee-principale',
    text:
      'Les structures d’accueil de jour proposent quelques heures d’accompagnement en journée. Elles permettent aux proches de souffler, de régler des démarches ou de se reposer. Leur nombre de places reste toutefois inférieur à la demande dans plusieurs territoires.',
    q: 'Quelle est l’idée principale de ce passage ?',
    choices: [
      { label: 'L’accueil de jour soulage les proches aidants, mais son offre reste insuffisante.', ok: true },
      { label: 'Les proches aidants ont besoin de repos.', why: 'C’est un élément du texte, mais le passage ne se limite pas à cela : il parle du dispositif et de sa limite.' },
      { label: 'Il faut créer plus de places d’accueil de jour.', why: 'Le texte constate un manque, mais ne formule aucune revendication. Cette phrase ajoute une opinion.' },
      { label: 'Les démarches administratives sont compliquées.', why: 'Les démarches ne sont mentionnées qu’en passant, comme un usage possible du temps libéré.' },
    ],
    h: ['L’idée principale couvre tout le passage, pas une seule phrase.', 'Le mot « toutefois » signale une nuance qui fait partie de l’idée.'],
    alt: [
      'Essayez de résumer le passage en une phrase commençant par « Le texte dit que… ».',
      'Si votre phrase laisse de côté la limite introduite par « toutefois », elle est incomplète.',
    ],
    sol: [
      { text: 'Le passage articule un bénéfice et une limite.', why: 'Les deux doivent figurer dans l’idée principale.' },
    ],
  }),
  mini({
    id: 'F02-acteurs',
    skill: 'F02',
    structure: 'identifier-les-acteurs',
    text:
      'Dans ce dispositif fictif, une infirmière coordonne le suivi, une aide-soignante assure les soins d’hygiène quotidiens, et un travailleur social accompagne les démarches d’accès aux droits. La famille est associée aux décisions.',
    q: 'Qui accompagne les démarches d’accès aux droits ?',
    accept: ['le travailleur social', 'travailleur social', 'un travailleur social', 'le travailleur social', 'assistant social'],
    h: ['Relisez la phrase qui contient le mot « démarches ».', 'Chaque professionnel du texte a une mission précise : repérez celle qui est citée dans la question.'],
    alt: [
      'Reconstruisez un petit tableau : une ligne par professionnel, une colonne pour sa mission.',
      'La question porte sur une case précise de ce tableau.',
    ],
    sol: [
      { text: 'Le texte attribue les démarches au travailleur social.', why: 'Chaque mission est nommée explicitement : il n’y a pas à déduire.' },
    ],
    placeholder: 'Le professionnel concerné',
    sec: 40,
  }),
  mini({
    id: 'F02-nuance',
    skill: 'F02',
    structure: 'reperer-une-nuance',
    text:
      'Certaines personnes âgées vivant seules déclarent renoncer parfois à sortir l’hiver, notamment lorsque les trottoirs sont glissants.',
    q: 'Quelle affirmation respecte exactement ce que dit le texte ?',
    choices: [
      { label: 'Une partie des personnes âgées vivant seules limite parfois ses sorties en hiver.', ok: true },
      { label: 'Les personnes âgées ne sortent pas en hiver.', why: 'Le texte dit « certaines » et « parfois » : généraliser déforme le sens.' },
      { label: 'Les personnes âgées ont peur de tomber.', why: 'Le texte évoque des trottoirs glissants, mais n’attribue aucune émotion : c’est une interprétation ajoutée.' },
    ],
    h: ['Repérez les mots qui limitent la portée de la phrase.', '« Certaines » et « parfois » empêchent toute généralisation.'],
    alt: [
      'Remplacez mentalement « certaines » par « toutes » et voyez si la phrase reste fidèle.',
      'Elle ne l’est pas : c’est exactement ce que fait une réponse qui généralise.',
    ],
    sol: [{ text: 'Les nuances du texte doivent se retrouver dans la réponse.', why: 'Supprimer « certaines » ou « parfois » change le sens.' }],
  }),
  mini({
    id: 'F02-fait-opinion',
    skill: 'F02',
    structure: 'distinguer-fait-et-opinion',
    q: 'Parmi ces phrases, laquelle énonce un fait vérifiable plutôt qu’une opinion ?',
    choices: [
      { label: 'Le délai moyen d’obtention d’un rendez-vous dans cette structure fictive est de trois semaines.', ok: true },
      { label: 'Les délais d’attente sont scandaleux.', why: '« Scandaleux » est un jugement : il exprime une réaction, pas une donnée vérifiable.' },
      { label: 'Il est évident que tout le monde devrait pouvoir consulter rapidement.', why: '« Il est évident que » introduit une opinion présentée comme une évidence.' },
    ],
    h: ['Un fait peut être vérifié ou mesuré.', 'Cherchez les mots qui expriment un jugement.'],
    alt: [
      'Demandez-vous : « comment pourrais-je vérifier cette phrase ? »',
      'Si aucune vérification n’est possible, c’est une opinion.',
    ],
    sol: [{ text: 'Une donnée chiffrée et datée est vérifiable.', why: 'C’est le critère qui sépare le fait de l’opinion.' }],
    sec: 40,
  }),
  mini({
    id: 'F02-plan-du-texte',
    skill: 'F02',
    level: 'epreuve',
    structure: 'reconstituer-le-plan-d-un-texte',
    transfer: true,
    text:
      'Le numérique simplifie certaines démarches administratives. Il permet de prendre rendez-vous sans se déplacer et de suivre un dossier à distance. Cependant, il suppose un équipement, une connexion et une aisance qui ne sont pas partagées par tous. Des permanences d’accompagnement se mettent en place pour réduire cet écart.',
    q: 'Remettez dans l’ordre les étapes du raisonnement du texte.',
    order: [
      { id: 'a', label: 'Le numérique apporte des simplifications' },
      { id: 'b', label: 'Des exemples de ces simplifications' },
      { id: 'c', label: 'Une limite : tout le monde n’y a pas accès' },
      { id: 'd', label: 'Une réponse partielle : les permanences d’accompagnement' },
    ],
    h: ['Suivez l’ordre des phrases.', 'Le mot « cependant » marque le basculement vers la limite.'],
    alt: [
      'Notez en marge un mot par phrase : « avantage », « exemples », « limite », « réponse ».',
      'Ces quatre mots forment le plan du texte.',
    ],
    sol: [
      { text: 'Avantage, exemples, limite, réponse partielle.', why: 'Les connecteurs du texte signalent chaque changement d’étape.' },
    ],
    sec: 70,
  }),

  // ------------------------------------------------------------------ F03
  mini({
    id: 'F03-autonomie',
    skill: 'F03',
    level: 'decouverte',
    structure: 'definir-un-terme-du-champ-sanitaire',
    q: 'Que signifie « autonomie » quand on parle d’une personne accompagnée ?',
    choices: [
      { label: 'La capacité à décider pour soi-même et à organiser sa vie', ok: true },
      { label: 'Le fait de pouvoir tout faire seule physiquement', why: 'Cela correspond plutôt à l’indépendance. Une personne peut avoir besoin d’aide pour se lever tout en décidant pleinement de sa vie.' },
      { label: 'Le fait de vivre seule à son domicile', why: 'Le lieu de vie ne dit rien de la capacité à décider.' },
    ],
    h: ['Séparez « pouvoir faire » et « pouvoir décider ».', 'L’autonomie concerne la décision ; l’indépendance concerne la réalisation.'],
    alt: [
      'Pensez à une personne en fauteuil qui dirige entièrement sa journée.',
      'Elle a besoin d’aide pour certains gestes, mais elle décide : elle est autonome sans être indépendante.',
    ],
    sol: [
      { text: 'Autonomie = capacité de décider.', why: 'C’est le sens retenu dans le champ sanitaire et social.' },
      { text: 'Indépendance = capacité de faire seul.', why: 'Les deux notions peuvent varier séparément.' },
    ],
  }),
  mini({
    id: 'F03-prevention',
    skill: 'F03',
    structure: 'definir-la-prevention',
    q: 'Laquelle de ces actions relève le plus clairement de la prévention ?',
    choices: [
      { label: 'Organiser un atelier sur les risques de chute au domicile', ok: true },
      { label: 'Poser un plâtre après une fracture', why: 'Il s’agit d’un soin curatif : le problème est déjà survenu.' },
      { label: 'Remplir un dossier d’admission', why: 'C’est une démarche administrative, sans effet direct sur la survenue d’un problème de santé.' },
    ],
    h: ['La prévention agit avant que le problème n’apparaisse ou ne s’aggrave.', 'Cherchez l’action qui vise à éviter un événement.'],
    alt: [
      'Placez chaque action sur une ligne du temps par rapport à l’événement « chute ».',
      'Ce qui se situe avant relève de la prévention ; ce qui vient après relève du soin.',
    ],
    sol: [{ text: 'Prévenir, c’est agir en amont.', why: 'L’atelier vise à éviter la chute, pas à la traiter.' }],
    sec: 40,
  }),
  mini({
    id: 'F03-contexte',
    skill: 'F03',
    structure: 'deviner-un-mot-par-le-contexte',
    text: 'Des séjours de répit sont proposés aux proches aidants, afin qu’ils puissent se reposer quelques jours.',
    q: 'Que signifie ici le mot « répit » ?',
    choices: [
      { label: 'Un temps de pause organisé pour permettre à l’aidant de souffler', ok: true },
      { label: 'Une aide financière versée aux aidants', why: 'Le texte parle de séjours et de repos, jamais d’argent.' },
      { label: 'Une formation destinée aux aidants', why: 'Rien dans la phrase n’évoque un apprentissage.' },
    ],
    h: ['La suite de la phrase donne la réponse.', 'Cherchez le groupe de mots qui explique le but du séjour.'],
    alt: [
      'Remplacez le mot par un blanc : « Des séjours de ______ sont proposés… afin qu’ils puissent se reposer. »',
      'Le complément de but impose une idée de pause : c’est le sens du mot.',
    ],
    sol: [{ text: 'Le contexte donne la définition.', why: '« Afin qu’ils puissent se reposer » explicite la fonction du répit.' }],
  }),
  mini({
    id: 'F03-precarite',
    skill: 'F03',
    structure: 'employer-le-mot-juste',
    q: 'Quelle formulation emploie le vocabulaire le plus juste dans un écrit professionnel ?',
    choices: [
      { label: 'Cette personne se trouve en situation de précarité, ce qui complique l’accès à ses droits.', ok: true },
      { label: 'Cette personne est pauvre et ne fait rien pour s’en sortir.', why: 'La seconde partie est un jugement sur la personne, sans fondement et hors du rôle professionnel.' },
      { label: 'Cette personne est un cas social.', why: 'L’expression réduit la personne à une catégorie et n’a aucune valeur descriptive.' },
    ],
    h: ['Cherchez la formulation qui décrit une situation, pas la personne.', 'Un écrit professionnel ne porte jamais de jugement moral.'],
    alt: [
      'Vérifiez si la phrase pourrait être lue par la personne elle-même sans qu’elle se sente jugée.',
      'C’est un bon test pour repérer une formulation à éviter.',
    ],
    sol: [
      { text: '« En situation de précarité » décrit un contexte.', why: 'La formulation vise la situation et non l’identité de la personne.' },
    ],
  }),
  mini({
    id: 'F03-bientraitance',
    skill: 'F03',
    level: 'epreuve',
    structure: 'expliquer-une-notion-dans-un-contexte',
    transfer: true,
    q: 'Une collègue vous demande ce que signifie « bientraitance ». Quelle explication est la plus exacte ?',
    choices: [
      {
        label:
          'Une démarche collective d’adaptation permanente des pratiques au respect de la personne, qui ne se réduit pas à l’absence de maltraitance.',
        ok: true,
      },
      { label: 'Le fait de ne jamais maltraiter une personne.', why: 'L’absence de maltraitance est un minimum ; la bientraitance est une démarche active et continue.' },
      { label: 'Être gentil avec les personnes accompagnées.', why: 'La bientraitance n’est pas une affaire de caractère individuel mais d’organisation et de pratiques.' },
    ],
    h: ['Le mot ne se définit pas seulement par ce qu’il exclut.', 'Cherchez la réponse qui parle d’une démarche continue et collective.'],
    alt: [
      'Comparez avec la sécurité routière : ne pas provoquer d’accident ne suffit pas à définir une conduite sûre.',
      'De même, ne pas maltraiter ne suffit pas à définir la bientraitance.',
    ],
    sol: [
      { text: 'La bientraitance est une démarche, pas un état.', why: 'Elle suppose de questionner régulièrement les pratiques.' },
      { text: 'Elle est collective.', why: 'Elle dépend de l’organisation, pas seulement des qualités personnelles.' },
    ],
  }),

  // ------------------------------------------------------------------ F04
  mini({
    id: 'F04-reformuler-fidele',
    skill: 'F04',
    level: 'decouverte',
    structure: 'choisir-une-reformulation-fidele',
    text: 'Phrase d’origine : « Le manque d’information sur les aides existantes freine leur utilisation. »',
    q: 'Quelle reformulation respecte exactement le sens ?',
    choices: [
      { label: 'Les aides sont peu utilisées parce qu’elles sont mal connues.', ok: true },
      { label: 'Les aides existantes ne servent à rien.', why: 'Le texte ne porte aucun jugement sur l’utilité des aides : il parle seulement de leur méconnaissance.' },
      { label: 'Il n’existe pas assez d’aides.', why: 'Le texte dit que les aides existent mais sont mal connues. Ce n’est pas une question de quantité.' },
    ],
    h: ['Repérez la cause et la conséquence dans la phrase d’origine.', 'La cause est le manque d’information ; la conséquence est la faible utilisation.'],
    alt: [
      'Inversez l’ordre : commencez par la conséquence, puis donnez la cause avec « parce que ».',
      'Cette transformation change la forme sans toucher au sens : c’est une bonne reformulation.',
    ],
    sol: [
      { text: 'Le lien de cause doit être conservé.', why: 'Changer la cause revient à changer le sens.' },
    ],
  }),
  mini({
    id: 'F04-recopiage',
    skill: 'F04',
    structure: 'reperer-un-recopiage-deguise',
    text: 'Phrase d’origine : « Les délais d’attente s’allongent dans plusieurs territoires. »',
    q: 'Laquelle de ces propositions n’est PAS une véritable reformulation ?',
    choices: [
      { label: 'Les délais d’attente augmentent dans plusieurs territoires.', ok: true },
      { label: 'Dans plusieurs régions, il faut attendre de plus en plus longtemps.', why: 'Ici, la construction et les mots changent : c’est une reformulation réelle.' },
      { label: 'Il faut patienter davantage qu’avant dans un certain nombre de territoires.', why: 'La phrase est reconstruite avec d’autres mots : la reformulation est correcte.' },
    ],
    h: ['Comparez mot à mot avec la phrase d’origine.', 'Une reformulation qui ne change qu’un seul mot reste du recopiage.'],
    alt: [
      'Comptez combien de mots sont identiques à l’original.',
      'Si la structure de phrase est conservée à l’identique, la reformulation est insuffisante.',
    ],
    sol: [
      { text: 'Remplacer « s’allongent » par « augmentent » ne suffit pas.', why: 'La structure et l’ordre de la phrase restent identiques.' },
    ],
  }),
  mini({
    id: 'F04-nuance-perdue',
    skill: 'F04',
    structure: 'conserver-les-nuances',
    text: 'Phrase d’origine : « Une partie des familles ignore l’existence de ces dispositifs. »',
    q: 'Quelle reformulation conserve la nuance ?',
    choices: [
      { label: 'Certaines familles ne savent pas que ces dispositifs existent.', ok: true },
      { label: 'Les familles ne connaissent pas ces dispositifs.', why: 'La phrase d’origine dit « une partie » : en supprimant cette limite, on généralise abusivement.' },
      { label: 'Aucune famille ne connaît ces dispositifs.', why: 'Le sens est renforcé au point de devenir faux.' },
    ],
    h: ['Repérez le groupe de mots qui limite la portée.', '« Une partie des » doit être rendu par un équivalent : certaines, quelques-unes, une fraction.'],
    alt: [
      'Imaginez un groupe de dix familles.',
      '« Une partie » veut dire trois ou quatre, pas dix. Une reformulation qui dit « les familles » sous-entend les dix.',
    ],
    sol: [{ text: '« Une partie » se rend par « certaines ».', why: 'La portée de l’affirmation reste la même.' }],
    sec: 45,
  }),
  mini({
    id: 'F04-reformuler-paragraphe',
    skill: 'F04',
    level: 'epreuve',
    structure: 'reformuler-un-paragraphe',
    transfer: true,
    text:
      'Paragraphe d’origine : « Le passage de démarches papier à des démarches en ligne accélère le traitement des dossiers. Il crée toutefois une difficulté pour les personnes sans équipement ou sans accompagnement. »',
    q: 'Quelle reformulation est à la fois fidèle et réellement reformulée ?',
    choices: [
      {
        label:
          'Traiter les dossiers en ligne va plus vite qu’avec du papier, mais cela met en difficulté celles et ceux qui n’ont ni matériel ni aide.',
        ok: true,
      },
      {
        label: 'Le passage au numérique accélère le traitement des dossiers, mais crée une difficulté pour certaines personnes.',
        why: 'La phrase reprend presque mot pour mot l’original : la reformulation est trop faible.',
      },
      {
        label: 'Les démarches en ligne vont plus vite et sont plus pratiques pour tout le monde.',
        why: 'La seconde partie du paragraphe, qui énonce une difficulté, a disparu. Le sens est modifié.',
      },
    ],
    h: ['Vérifiez deux choses : le sens est-il complet, et la formulation est-elle vraiment différente ?', 'Les deux mouvements du paragraphe (avantage, difficulté) doivent apparaître.'],
    alt: [
      'Procédez en deux temps : d’abord dire le paragraphe à voix haute avec vos mots, puis vérifier qu’aucune idée n’a disparu.',
      'La reformulation est réussie quand les deux conditions sont remplies simultanément.',
    ],
    sol: [
      { text: 'Fidélité : les deux idées doivent rester.', why: 'Supprimer la difficulté change le propos.' },
      { text: 'Reformulation : la construction doit changer.', why: 'Sinon il s’agit d’un recopiage.' },
    ],
    sec: 70,
  }),

  // ------------------------------------------------------------------ F05
  mini({
    id: 'F05-garder-supprimer',
    skill: 'F05',
    level: 'decouverte',
    structure: 'choisir-ce-qu-on-garde-dans-un-resume',
    q: 'Dans un résumé, que supprime-t-on en priorité ?',
    choices: [
      { label: 'Les exemples qui illustrent une idée déjà énoncée', ok: true },
      { label: 'Les liens logiques comme « cependant » ou « parce que »', why: 'Ces liens portent le raisonnement : les supprimer transforme le résumé en liste d’informations sans rapport.' },
      { label: 'L’idée principale, jugée trop évidente', why: 'L’idée principale est précisément ce qu’un résumé doit conserver.' },
      { label: 'Les nuances comme « souvent » ou « en partie »', why: 'Les supprimer fait dire au texte plus qu’il ne dit.' },
    ],
    h: ['Demandez-vous ce qui disparaîtrait sans changer le sens.', 'Un exemple illustre : l’idée reste compréhensible sans lui.'],
    alt: [
      'Imaginez que vous devez raconter le texte en trente secondes à une collègue pressée.',
      'Vous garderez les idées et les liens ; vous laisserez tomber les illustrations.',
    ],
    sol: [{ text: 'Les exemples partent en premier.', why: 'Ils illustrent sans ajouter d’information nouvelle.' }],
  }),
  mini({
    id: 'F05-resume-fidele',
    skill: 'F05',
    structure: 'choisir-un-resume-fidele',
    text:
      'Les consultations sans rendez-vous se développent. Elles évitent certains passages aux urgences. Cependant, leur nombre de places reste limité et elles ne remplacent pas un suivi régulier.',
    q: 'Quel résumé en une phrase est le plus fidèle ?',
    choices: [
      { label: 'Les consultations sans rendez-vous rendent service, mais leur capacité limitée les empêche de remplacer un suivi régulier.', ok: true },
      { label: 'Les consultations sans rendez-vous évitent les passages aux urgences.', why: 'Ce résumé ne retient qu’un avantage et supprime la limite, qui est pourtant l’essentiel du passage.' },
      { label: 'Les consultations sans rendez-vous ne servent pas à grand-chose.', why: 'Le texte ne dit pas cela : il reconnaît leur utilité tout en signalant une limite.' },
    ],
    h: ['Le mot « cependant » indique que le passage a deux mouvements.', 'Un résumé fidèle doit contenir les deux.'],
    alt: [
      'Écrivez d’abord deux phrases : une pour l’avantage, une pour la limite.',
      'Réunissez-les ensuite avec « mais ». Vous obtenez un résumé complet en une phrase.',
    ],
    sol: [{ text: 'Les deux mouvements sont conservés.', why: 'Supprimer l’un ou l’autre déforme le texte.' }],
  }),
  mini({
    id: 'F05-avis-interdit',
    skill: 'F05',
    structure: 'ne-pas-ajouter-son-avis',
    q: 'Quelle phrase n’a pas sa place dans un résumé ?',
    choices: [
      { label: 'Il est urgent que les pouvoirs publics agissent sur ce point.', ok: true },
      { label: 'Le texte souligne la faible disponibilité des places.', why: 'Cette phrase restitue le contenu du texte : elle est recevable.' },
      { label: 'L’auteur rappelle que le dispositif ne remplace pas un suivi régulier.', why: 'Il s’agit encore d’une restitution.' },
    ],
    h: ['Cherchez la phrase qui exprime une position personnelle.', '« Il est urgent que » signale une revendication.'],
    alt: [
      'Vérifiez pour chaque phrase si elle pourrait commencer par « le texte dit que ».',
      'Si cette formule sonne faux, c’est que la phrase vient de vous.',
    ],
    sol: [{ text: 'Un résumé restitue, il ne prend pas position.', why: 'L’avis appartient à une autre question, si elle est posée.' }],
    sec: 40,
  }),
  mini({
    id: 'F05-hierarchiser',
    skill: 'F05',
    level: 'epreuve',
    structure: 'hierarchiser-les-informations',
    transfer: true,
    text:
      'Une structure fictive constate que les rendez-vous non honorés augmentent. Elle a testé un rappel par message la veille. Le nombre d’absences a diminué, sans disparaître. Le rappel demande toutefois du temps de secrétariat.',
    q: 'Remettez ces informations de la plus importante à la plus secondaire pour un résumé.',
    order: [
      { id: 'a', label: 'Un rappel la veille réduit les absences sans les supprimer' },
      { id: 'b', label: 'Les rendez-vous non honorés augmentaient' },
      { id: 'c', label: 'Le rappel a un coût en temps de secrétariat' },
      { id: 'd', label: 'Le rappel est envoyé par message' },
    ],
    h: ['L’information la plus importante est le résultat obtenu, pas le détail du moyen utilisé.', 'Le contexte vient ensuite, puis la limite, puis la modalité technique.'],
    alt: [
      'Demandez-vous ce que vous diriez en premier si vous n’aviez qu’une phrase.',
      'Vous diriez le résultat. Le canal utilisé (message) est un détail.',
    ],
    sol: [
      { text: 'Résultat, contexte, limite, modalité.', why: 'Un résumé garde d’abord ce qui a été obtenu et à quel prix.' },
    ],
    sec: 75,
  }),

  // ------------------------------------------------------------------ F06
  mini({
    id: 'F06-cause-consequence',
    skill: 'F06',
    level: 'decouverte',
    structure: 'distinguer-cause-et-consequence',
    text: 'Faute de moyen de transport adapté, une personne reporte plusieurs rendez-vous, et son suivi devient irrégulier.',
    q: 'Quelle est la cause dans cette phrase ?',
    choices: [
      { label: 'L’absence de moyen de transport adapté', ok: true },
      { label: 'Le suivi devenu irrégulier', why: 'C’est la conséquence finale, pas la cause : elle se produit après.' },
      { label: 'Le report des rendez-vous', why: 'C’est une conséquence intermédiaire : elle résulte du problème de transport.' },
    ],
    h: ['Cherchez ce qui arrive en premier dans le temps.', 'La cause explique ; la conséquence résulte.'],
    alt: [
      'Reliez les éléments par des flèches : transport → reports → suivi irrégulier.',
      'Ce qui est tout à gauche de la chaîne est la cause initiale.',
    ],
    sol: [
      { text: 'La chaîne est : transport, reports, suivi irrégulier.', why: 'Chaque élément est la conséquence du précédent.' },
    ],
  }),
  mini({
    id: 'F06-chaine',
    skill: 'F06',
    structure: 'construire-une-chaine-de-consequences',
    text: 'Point de départ : un proche aidant accompagne seul, sans relais, depuis plusieurs mois.',
    q: 'Remettez ces conséquences dans un ordre logique.',
    order: [
      { id: 'a', label: 'La fatigue s’installe et devient durable' },
      { id: 'b', label: 'Les activités personnelles et sociales sont abandonnées' },
      { id: 'c', label: 'L’isolement s’accentue' },
      { id: 'd', label: 'La santé de l’aidant peut se dégrader à son tour' },
    ],
    h: ['Partez de l’effet le plus immédiat.', 'Chaque étape doit pouvoir être reliée à la précédente par « ce qui entraîne ».'],
    alt: [
      'Testez chaque enchaînement à voix haute avec « et alors ? ».',
      'Si l’enchaînement sonne faux, c’est que deux étapes sont inversées.',
    ],
    sol: [
      { text: 'Fatigue, abandon des activités, isolement, dégradation de la santé.', why: 'Chaque étape prépare la suivante.' },
    ],
    sec: 65,
  }),
  mini({
    id: 'F06-decrire-analyser',
    skill: 'F06',
    structure: 'distinguer-decrire-et-analyser',
    q: 'Laquelle de ces phrases analyse, au lieu de simplement décrire ?',
    choices: [
      {
        label:
          'Les rendez-vous non honorés augmentent, notamment parce que certaines personnes n’ont pas de moyen simple de prévenir en cas d’empêchement.',
        ok: true,
      },
      { label: 'Les rendez-vous non honorés augmentent depuis deux ans.', why: 'C’est un constat chiffré : il décrit sans expliquer.' },
      { label: 'Beaucoup de personnes ne viennent pas à leur rendez-vous.', why: 'Encore une description, sans aucune cause.' },
    ],
    h: ['Cherchez le mot qui introduit une explication.', 'Une analyse contient un « parce que », un « car » ou un équivalent.'],
    alt: [
      'Posez la question « pourquoi ? » à chaque phrase.',
      'Celle qui y répond déjà est une analyse ; les autres restent des constats.',
    ],
    sol: [{ text: 'Analyser, c’est ajouter la cause au constat.', why: 'Sans cause, il n’y a que description.' }],
  }),
  mini({
    id: 'F06-acteurs-obstacles',
    skill: 'F06',
    level: 'epreuve',
    structure: 'identifier-acteurs-et-obstacles',
    transfer: true,
    text:
      'Une structure fictive souhaite mettre en place une permanence d’information sur les aides. Le local est disponible, mais aucun professionnel n’a de temps dégagé, et les personnes concernées ne lisent pas les affiches du hall.',
    q: 'Quels sont les deux obstacles réels à la mise en place ?',
    multiple: true,
    choices: [
      { label: 'Aucun professionnel n’a de temps dédié', ok: true },
      { label: 'L’information n’atteint pas le public visé', ok: true },
      { label: 'Le local n’est pas disponible', why: 'Le texte dit au contraire que le local est disponible.' },
      { label: 'Les aides n’existent pas', why: 'Rien dans le texte ne le dit : la permanence porte justement sur des aides existantes.' },
    ],
    h: ['Relisez le texte en cherchant ce qui est présenté comme manquant.', 'Le mot « mais » introduit les difficultés.'],
    alt: [
      'Dressez deux colonnes : « ce qui existe » et « ce qui manque ».',
      'Les obstacles sont dans la seconde colonne.',
    ],
    sol: [
      { text: 'Le temps professionnel manque.', why: 'Sans personne pour tenir la permanence, elle ne peut pas exister.' },
      { text: 'Le canal d’information est inefficace.', why: 'Une permanence que personne ne connaît ne remplit pas sa fonction.' },
    ],
    sec: 70,
  }),
]
