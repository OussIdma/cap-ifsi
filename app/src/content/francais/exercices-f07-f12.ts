/**
 * Micro-exercices de français — F07 à F12.
 * Tous les textes supports sont originaux et fictifs.
 */

import type { FrenchExercise } from '../types'
import { mini } from './builder'

export const EX_F07_F12: FrenchExercise[] = [
  // ------------------------------------------------------------------ F07
  mini({
    id: 'F07-argument-complet',
    skill: 'F07',
    level: 'decouverte',
    structure: 'reconnaitre-un-argument-complet',
    q: 'Quel passage constitue un argument complet ?',
    choices: [
      {
        label:
          'L’information sur les aides est essentielle : beaucoup de personnes n’y recourent pas faute de les connaître. Un aidant peut ignorer qu’un accueil de jour existe près de chez lui.',
        ok: true,
      },
      { label: 'L’information sur les aides est essentielle.', why: 'C’est une affirmation seule : rien ne l’explique ni ne l’illustre.' },
      { label: 'Un aidant peut ignorer qu’un accueil de jour existe près de chez lui.', why: 'C’est un exemple isolé : on ne sait pas quelle idée il sert.' },
    ],
    h: ['Un argument complet comporte trois temps.', 'Cherchez la réponse qui contient une idée, une explication et un exemple.'],
    alt: [
      'Numérotez les phrases de chaque proposition.',
      'Une seule proposition contient les trois éléments : la position, le mécanisme, l’illustration.',
    ],
    sol: [
      { text: 'Idée : l’information est essentielle.', why: 'C’est la position défendue.' },
      { text: 'Explication : le non-recours vient de la méconnaissance.', why: 'C’est le mécanisme.' },
      { text: 'Exemple : l’accueil de jour ignoré.', why: 'C’est l’illustration concrète.' },
    ],
  }),
  mini({
    id: 'F07-formule-creuse',
    skill: 'F07',
    structure: 'reperer-une-formule-creuse',
    q: 'Quelle phrase n’apporte rien à une argumentation ?',
    choices: [
      { label: 'Il est important de faire attention à ces situations.', ok: true },
      { label: 'Un délai trop long conduit certaines personnes à renoncer au rendez-vous.', why: 'Cette phrase énonce un mécanisme précis : elle argumente.' },
      { label: 'Une permanence hebdomadaire permettrait de repérer ces situations plus tôt.', why: 'Cette phrase propose une action et en donne l’effet attendu.' },
    ],
    h: ['Cherchez la phrase qui pourrait s’appliquer à n’importe quel sujet.', 'Une phrase qui reste vraie même sans le contexte n’apporte rien.'],
    alt: [
      'Supprimez la phrase et relisez le paragraphe.',
      'Si rien n’est perdu, la phrase était creuse.',
    ],
    sol: [{ text: '« Il est important de faire attention » ne dit ni quoi, ni pourquoi, ni comment.', why: 'Elle occupe des lignes sans rien démontrer.' }],
    sec: 40,
  }),
  mini({
    id: 'F07-nuance',
    skill: 'F07',
    structure: 'ajouter-une-limite-a-un-argument',
    text:
      'Argument : « Développer les solutions de répit protège la santé des aidants, car une pause régulière limite l’épuisement. »',
    q: 'Quelle limite honnête peut compléter cet argument ?',
    choices: [
      { label: 'Cela suppose toutefois des places disponibles et une information réellement diffusée.', ok: true },
      { label: 'Mais certains aidants ne méritent pas cette aide.', why: 'C’est un jugement sur les personnes, sans fondement et contraire à la posture professionnelle.' },
      { label: 'Cependant, le répit ne sert à rien.', why: 'Cette phrase contredit l’argument au lieu de le nuancer : l’argumentation devient incohérente.' },
    ],
    h: ['Une limite précise une condition de réussite, elle ne détruit pas l’argument.', 'Cherchez ce qui doit être réuni pour que la solution fonctionne vraiment.'],
    alt: [
      'Formulez la limite avec « à condition que ».',
      '« Le répit protège la santé des aidants, à condition que des places existent et que l’information circule. »',
    ],
    sol: [
      { text: 'Une bonne limite précise les conditions.', why: 'Elle montre que vous mesurez la faisabilité.' },
    ],
  }),
  mini({
    id: 'F07-ordre-argument',
    skill: 'F07',
    structure: 'ordonner-les-parties-d-un-argument',
    q: 'Remettez dans l’ordre les trois temps d’un argument.',
    order: [
      { id: 'i', label: 'L’idée défendue, en une phrase' },
      { id: 'e', label: 'L’explication du mécanisme' },
      { id: 'x', label: 'L’exemple concret' },
    ],
    h: ['Le correcteur doit savoir dès le début ce que vous défendez.', 'L’exemple vient illustrer : il ne peut donc pas venir en premier.'],
    alt: [
      'Pensez à la façon dont on défend un point de vue à l’oral.',
      'On dit d’abord ce qu’on pense, puis pourquoi, puis on donne un cas concret.',
    ],
    sol: [{ text: 'Idée, explication, exemple.', why: 'C’est l’ordre le plus lisible pour un correcteur.' }],
    sec: 40,
  }),
  mini({
    id: 'F07-argument-adapte',
    skill: 'F07',
    level: 'epreuve',
    structure: 'choisir-l-argument-le-plus-solide',
    transfer: true,
    text: 'Question : faut-il maintenir un accueil physique dans une structure qui développe ses démarches en ligne ?',
    q: 'Quel argument est le plus solide pour défendre le maintien de l’accueil physique ?',
    choices: [
      {
        label:
          'Le maintien d’un accueil physique évite d’exclure les personnes sans équipement ni aisance numérique : sans lui, une partie du public perdrait l’accès à ses droits alors même que la procédure existe.',
        ok: true,
      },
      { label: 'Les gens préfèrent parler à quelqu’un.', why: 'L’affirmation est plausible mais non étayée, et elle ne montre aucune conséquence.' },
      { label: 'Le numérique ne fonctionne jamais correctement.', why: 'L’affirmation est excessive et fausse : elle affaiblit l’argumentation au lieu de la renforcer.' },
    ],
    h: ['Cherchez l’argument qui montre une conséquence concrète.', 'Un bon argument nomme qui serait affecté et comment.'],
    alt: [
      'Demandez-vous lequel résisterait à une objection en réunion.',
      'Une affirmation excessive tombe dès la première objection ; un argument qui nomme un risque précis tient.',
    ],
    sol: [
      { text: 'L’argument retenu nomme un public et un effet.', why: 'Il relie le maintien de l’accueil à l’accès effectif aux droits.' },
      { text: 'Les formulations absolues sont à éviter.', why: '« Ne fonctionne jamais » est réfutable immédiatement.' },
    ],
    sec: 70,
  }),

  // ------------------------------------------------------------------ F08
  mini({
    id: 'F08-plan-consigne',
    skill: 'F08',
    level: 'decouverte',
    structure: 'deduire-le-plan-de-la-consigne',
    text: 'Consigne : « Expliquez deux difficultés rencontrées par les proches aidants, puis proposez une action adaptée. »',
    q: 'Quel plan suit la consigne ?',
    choices: [
      { label: '1. Première difficulté — 2. Seconde difficulté — 3. Action proposée', ok: true },
      { label: '1. Introduction générale — 2. Les aidants — 3. Conclusion', why: 'Ce plan ne reprend ni les deux difficultés demandées ni la proposition d’action.' },
      { label: '1. Une difficulté — 2. Une action', why: 'La consigne demande deux difficultés, pas une.' },
    ],
    h: ['Comptez les travaux demandés par la consigne.', 'Chaque travail demandé devient une partie du plan.'],
    alt: [
      'Recopiez la consigne et numérotez chaque verbe.',
      'La numérotation obtenue est exactement votre plan.',
    ],
    sol: [{ text: 'Le plan suit la consigne mot à mot.', why: 'Il n’y a pas de plan universel à plaquer.' }],
  }),
  mini({
    id: 'F08-phrase-ouverture',
    skill: 'F08',
    structure: 'ecrire-une-phrase-d-ouverture-de-paragraphe',
    q: 'Quelle phrase ouvre le mieux un paragraphe consacré à l’isolement des aidants ?',
    choices: [
      { label: 'La seconde difficulté tient à l’isolement progressif de l’aidant.', ok: true },
      { label: 'Ensuite, il y a autre chose.', why: 'La phrase annonce un changement mais ne dit pas de quoi il s’agit : le correcteur doit deviner.' },
      { label: 'On va maintenant parler d’un autre point.', why: 'La phrase parle de la copie au lieu de traiter le sujet.' },
    ],
    h: ['Une bonne phrase d’ouverture annonce l’idée du paragraphe.', 'Elle doit pouvoir se lire seule et rester compréhensible.'],
    alt: [
      'Lisez à la suite les premières phrases de vos paragraphes.',
      'Si cette lecture résume déjà votre réponse, vos ouvertures sont bonnes.',
    ],
    sol: [{ text: 'L’ouverture nomme l’idée traitée.', why: 'Elle situe le paragraphe dans le plan.' }],
    sec: 40,
  }),
  mini({
    id: 'F08-equilibre',
    skill: 'F08',
    structure: 'equilibrer-les-parties',
    q: 'Une réponse en 20 lignes doit traiter deux difficultés et une proposition. Quelle répartition est la plus équilibrée ?',
    choices: [
      { label: 'Environ 7 lignes, 7 lignes et 6 lignes', ok: true },
      { label: '16 lignes, 2 lignes et 2 lignes', why: 'La première partie écrase les autres : deux travaux sur trois sont bâclés.' },
      { label: '20 lignes sur la proposition uniquement', why: 'Les deux difficultés demandées ne sont pas traitées.' },
    ],
    h: ['Chaque travail demandé mérite une place comparable.', 'Un déséquilibre marqué signale une partie sacrifiée.'],
    alt: [
      'Divisez le nombre de lignes disponibles par le nombre de travaux demandés.',
      'Ajustez ensuite légèrement selon le barème s’il est indiqué.',
    ],
    sol: [{ text: 'Trois travaux, trois parties de taille voisine.', why: 'Sauf barème différent, l’équilibre est le meilleur choix.' }],
    sec: 40,
  }),
  mini({
    id: 'F08-conclusion',
    skill: 'F08',
    level: 'epreuve',
    structure: 'ecrire-une-conclusion-utile',
    transfer: true,
    q: 'Quelle conclusion apporte réellement quelque chose ?',
    choices: [
      {
        label:
          'Informer ne suffira pas si les places manquent : c’est la combinaison des deux qui rend le répit accessible.',
        ok: true,
      },
      { label: 'En conclusion, nous avons vu deux difficultés et une proposition.', why: 'La phrase décrit la copie au lieu de répondre : elle n’ajoute aucune information.' },
      { label: 'Ce sujet est très intéressant et mériterait d’être approfondi.', why: 'Commentaire sur le sujet, sans contenu.' },
    ],
    h: ['Une conclusion utile répond franchement à la question posée.', 'Elle peut relier les parties entre elles.'],
    alt: [
      'Imaginez que le correcteur ne lise que votre dernière phrase.',
      'Elle doit à elle seule montrer que vous avez compris le problème.',
    ],
    sol: [{ text: 'La conclusion articule les éléments et tranche.', why: 'Elle ne répète pas le sommaire de la copie.' }],
    sec: 55,
  }),

  // ------------------------------------------------------------------ F09
  mini({
    id: 'F09-a-ou-à',
    skill: 'F09',
    level: 'decouverte',
    structure: 'homophone-a-ou-à',
    q: 'Quelle phrase est correctement orthographiée ?',
    choices: [
      { label: 'Elle a expliqué la situation à sa collègue.', ok: true },
      { label: 'Elle à expliqué la situation a sa collègue.', why: 'Les deux formes sont inversées. Test : « elle avait expliqué » fonctionne, donc c’est « a » ; « avait sa collègue » ne fonctionne pas, donc c’est « à ».' },
      { label: 'Elle a expliqué la situation a sa collègue.', why: 'Le second « a » devrait être « à » : on ne peut pas dire « avait sa collègue ».' },
    ],
    h: ['Remplacez par « avait » et voyez si la phrase tient.', 'Si « avait » fonctionne, écrivez « a » sans accent.'],
    alt: [
      'Le « a » sans accent est toujours le verbe avoir.',
      'Le « à » avec accent introduit un complément : à qui, à quoi, à quel endroit.',
    ],
    sol: [
      { text: '« a expliqué » : verbe avoir.', why: '« avait expliqué » fonctionne.' },
      { text: '« à sa collègue » : préposition.', why: '« avait sa collègue » ne fonctionne pas.' },
    ],
    sec: 35,
  }),
  mini({
    id: 'F09-ou-où',
    skill: 'F09',
    structure: 'homophone-ou-où',
    q: 'Quelle phrase est correcte ?',
    choices: [
      { label: 'Elle ne sait pas où déposer son dossier, ni s’il faut le faire le matin ou l’après-midi.', ok: true },
      { label: 'Elle ne sait pas ou déposer son dossier, ni s’il faut le faire le matin où l’après-midi.', why: 'Les deux formes sont inversées. Le premier indique un lieu (« où »), le second propose un choix (« ou bien »).' },
    ],
    h: ['Testez avec « ou bien ».', 'Si « ou bien » fonctionne, écrivez « ou » sans accent ; sinon, c’est « où ».'],
    alt: ['« Où » avec accent répond à la question « à quel endroit ? ».', '« Ou » sans accent relie deux possibilités.'],
    sol: [{ text: 'Lieu : « où ». Choix : « ou ».', why: 'Le test « ou bien » tranche à chaque fois.' }],
    sec: 35,
  }),
  mini({
    id: 'F09-ces-ses',
    skill: 'F09',
    structure: 'homophone-ces-ses',
    q: 'Complétez : « Elle a rangé ___ affaires personnelles, puis a classé ___ dossiers-là. »',
    choices: [
      { label: 'ses / ces', ok: true },
      { label: 'ces / ses', why: 'Les affaires sont les siennes (« ses »), et « ces dossiers-là » désigne des dossiers montrés du doigt (« ces »).' },
      { label: 'ses / ses', why: 'La présence de « -là » impose le démonstratif « ces ».' },
    ],
    h: ['« ses » indique la possession : les siens.', 'Le suffixe « -là » accompagne toujours un démonstratif.'],
    alt: [
      'Remplacez par « les siennes » : si cela marche, écrivez « ses ».',
      'Remplacez par « ceux-là » : si cela marche, écrivez « ces ».',
    ],
    sol: [
      { text: '« ses affaires » : elles lui appartiennent.', why: 'Test : « les siennes ».' },
      { text: '« ces dossiers-là » : on les désigne.', why: 'Test : « ceux-là ».' },
    ],
    sec: 40,
  }),
  mini({
    id: 'F09-accord-sujet',
    skill: 'F09',
    structure: 'accord-sujet-verbe-eloigne',
    q: 'Quelle phrase est correctement accordée ?',
    choices: [
      { label: 'Les documents demandés par le secrétariat arrivent demain.', ok: true },
      { label: 'Les documents demandés par le secrétariat arrive demain.', why: 'Le sujet est « les documents », au pluriel. « Le secrétariat » n’est qu’un complément placé entre le sujet et le verbe.' },
    ],
    h: ['Posez la question « qui est-ce qui arrive ? ».', 'Attention au nom singulier placé juste avant le verbe : ce n’est pas forcément le sujet.'],
    alt: [
      'Supprimez le groupe entre le sujet et le verbe.',
      '« Les documents arrivent demain » : l’accord devient évident.',
    ],
    sol: [{ text: 'Le sujet est « les documents ».', why: 'Le verbe se met au pluriel, quel que soit le mot qui le précède.' }],
    sec: 40,
  }),
  mini({
    id: 'F09-participe',
    skill: 'F09',
    structure: 'accord-du-participe-passe',
    q: 'Quelle phrase est correcte ?',
    choices: [
      { label: 'Les personnes qu’elle a rencontrées ont souvent renoncé à consulter.', ok: true },
      { label: 'Les personnes qu’elle a rencontré ont souvent renoncées à consulter.', why: 'Deux erreurs : « rencontrées » s’accorde car le complément d’objet direct « que » est placé avant ; « renoncé » ne s’accorde pas car « renoncer à » n’a pas de complément d’objet direct.' },
      { label: 'Les personnes qu’elle a rencontré ont souvent renoncé à consulter.', why: 'Le participe « rencontrées » doit s’accorder : le complément d’objet direct « que », mis pour « les personnes », est placé avant le verbe.' },
    ],
    h: [
      'Avec l’auxiliaire « avoir », cherchez si le complément d’objet direct est placé avant le verbe.',
      'Vérifiez ensuite le second verbe : « renoncer » se construit avec « à », donc sans complément d’objet direct.',
    ],
    alt: [
      'Posez la question « elle a rencontré qui ? ».',
      'La réponse (« les personnes ») est placée avant le verbe : le participe s’accorde avec elle.',
    ],
    sol: [
      { text: '« rencontrées » s’accorde.', why: 'Le complément d’objet direct précède le verbe.' },
      { text: '« renoncé » reste invariable.', why: 'On renonce à quelque chose : il n’y a pas de complément d’objet direct.' },
    ],
    sec: 55,
  }),
  mini({
    id: 'F09-correction-phrase',
    skill: 'F09',
    level: 'epreuve',
    structure: 'corriger-une-phrase-complete',
    transfer: true,
    text: 'Phrase à corriger : « Les dossier quelle a traité on été transmis a l’équipe. »',
    q: 'Combien de fautes distinctes contient cette phrase ?',
    choices: [
      { label: 'Quatre', ok: true },
      { label: 'Deux', why: 'Il y en a davantage : « dossier », « quelle », « on », et « a » sont tous les quatre à corriger.' },
      { label: 'Six', why: 'Le reste de la phrase est correct : il n’y a que quatre erreurs.' },
    ],
    h: ['Relisez mot à mot, sans chercher le sens.', 'Vérifiez successivement : le pluriel, le pronom relatif, le verbe avoir, la préposition.'],
    alt: [
      'Recopiez la phrase corrigée au brouillon avant de compter.',
      'Phrase corrigée : « Les dossiers qu’elle a traités ont été transmis à l’équipe. »',
    ],
    sol: [
      { text: '« dossier » → « dossiers ».', why: 'Le déterminant « les » impose le pluriel.' },
      { text: '« quelle » → « qu’elle ».', why: 'Il s’agit du pronom « que » suivi de « elle ».' },
      { text: '« on » → « ont ».', why: 'Test : « avaient été transmis ».' },
      { text: '« a » → « à ».', why: '« avait l’équipe » ne fonctionne pas.' },
    ],
    sec: 70,
  }),

  // ------------------------------------------------------------------ F10
  mini({
    id: 'F10-phrase-orale',
    skill: 'F10',
    level: 'decouverte',
    structure: 'remplacer-une-tournure-orale',
    text: 'Phrase : « Du coup, les gens ils viennent plus. »',
    q: 'Quelle réécriture convient à un écrit professionnel ?',
    choices: [
      { label: 'Par conséquent, la fréquentation diminue.', ok: true },
      { label: 'Du coup, la fréquentation diminue.', why: '« Du coup » reste une tournure orale : remplacez-la par un connecteur écrit.' },
      { label: 'Les gens ils ne viennent plus, par conséquent.', why: 'Le sujet est toujours répété (« les gens ils »), ce qui appartient à l’oral.' },
    ],
    h: ['Repérez les deux marques d’oral : le connecteur et le sujet répété.', 'Les deux doivent disparaître dans la réécriture.'],
    alt: [
      'Remplacez « du coup » par « donc », « ainsi » ou « par conséquent ».',
      'Supprimez le pronom qui double le sujet : « les gens ils » devient « les gens ».',
    ],
    sol: [
      { text: '« Du coup » → « par conséquent ».', why: 'Connecteur écrit.' },
      { text: 'Suppression du sujet répété.', why: 'Un seul sujet par verbe.' },
    ],
  }),
  mini({
    id: 'F10-ambiguite',
    skill: 'F10',
    structure: 'lever-une-ambiguite',
    text: 'Phrase : « Elle a parlé à sa collègue de sa situation. »',
    q: 'Pourquoi cette phrase pose-t-elle problème ?',
    choices: [
      { label: 'On ne sait pas de quelle situation il s’agit : la sienne ou celle de la collègue.', ok: true },
      { label: 'La phrase est trop longue.', why: 'Elle est courte : le problème n’est pas la longueur.' },
      { label: 'Le verbe est mal choisi.', why: '« Parler à » est correct ici.' },
    ],
    h: ['Regardez le possessif « sa ».', 'Demandez-vous à qui il renvoie : il y a deux personnes dans la phrase.'],
    alt: [
      'Réécrivez en nommant clairement la personne concernée.',
      '« Elle a parlé de sa propre situation à sa collègue » lève toute ambiguïté.',
    ],
    sol: [{ text: 'Le possessif a deux antécédents possibles.', why: 'Le correcteur ne doit jamais avoir à deviner.' }],
    sec: 45,
  }),
  mini({
    id: 'F10-couper',
    skill: 'F10',
    structure: 'couper-une-phrase-trop-longue',
    text:
      'Phrase : « Il y a beaucoup de personnes qui sont dans des situations où elles ne savent pas comment faire pour les démarches et du coup elles abandonnent. »',
    q: 'Quelle réécriture est la plus claire ?',
    choices: [
      { label: 'De nombreuses personnes ignorent comment effectuer leurs démarches. Faute d’accompagnement, elles finissent par y renoncer.', ok: true },
      { label: 'Beaucoup de personnes ne savent pas faire les démarches et du coup elles abandonnent.', why: '« Du coup » reste oral, et la phrase enchaîne encore deux idées sans les séparer.' },
      { label: 'Il y a des gens qui, dans certaines situations, quand ils ne savent pas, abandonnent.', why: 'La phrase reste embarrassée et perd en précision.' },
    ],
    h: ['Comptez les idées : il y en a deux.', 'Deux idées demandent deux phrases.'],
    alt: [
      'Supprimez « il y a » et commencez directement par le sujet.',
      'Puis coupez au moment où la phrase change d’idée.',
    ],
    sol: [
      { text: 'Deux phrases, une idée chacune.', why: 'La lecture devient immédiate.' },
      { text: 'Suppression des tournures orales.', why: '« Il y a » et « du coup » alourdissent l’écrit.' },
    ],
    sec: 55,
  }),
  mini({
    id: 'F10-ponctuation',
    skill: 'F10',
    level: 'epreuve',
    structure: 'choisir-la-ponctuation',
    transfer: true,
    q: 'Quelle phrase est correctement ponctuée ?',
    choices: [
      { label: 'Trois professionnels interviennent : une infirmière, une aide-soignante et un travailleur social.', ok: true },
      { label: 'Trois professionnels interviennent, une infirmière, une aide-soignante et un travailleur social.', why: 'La première virgule devrait être un deux-points : elle annonce une énumération.' },
      { label: 'Trois professionnels interviennent ; une infirmière, une aide-soignante et un travailleur social.', why: 'Le point-virgule sépare deux propositions de même rang. Ici, la seconde partie développe la première : c’est un deux-points.' },
    ],
    h: ['Le deux-points annonce une explication ou une liste.', 'La virgule sépare les éléments d’une même énumération.'],
    alt: [
      'Lisez la phrase à voix haute en marquant une pause d’attente après « interviennent ».',
      'Cette pause d’annonce correspond au deux-points.',
    ],
    sol: [{ text: 'Deux-points pour annoncer, virgules pour énumérer.', why: 'Chaque signe a une fonction précise.' }],
    sec: 45,
  }),

  // ------------------------------------------------------------------ F11
  mini({
    id: 'F11-fait-jugement',
    skill: 'F11',
    level: 'decouverte',
    structure: 'remplacer-un-jugement-par-un-fait',
    q: 'Quelle formulation convient dans un écrit professionnel ?',
    choices: [
      { label: 'La personne a refusé le soin proposé ce matin et n’a pas souhaité échanger.', ok: true },
      { label: 'La personne est désagréable.', why: 'C’est un jugement sur la personne : il n’est ni vérifiable ni utile à l’équipe.' },
      { label: 'La personne fait exprès de compliquer les choses.', why: 'Cette phrase prête une intention à la personne, ce qui ne peut pas être observé.' },
    ],
    h: ['Cherchez la phrase qui décrit ce qui a été vu ou entendu.', 'Un fait est observable ; un jugement ne l’est pas.'],
    alt: [
      'Demandez-vous si la phrase pourrait figurer dans une transmission écrite.',
      'Seuls les faits et les actions y ont leur place.',
    ],
    sol: [{ text: 'On décrit la situation, pas la personne.', why: 'Un refus est un fait, qui se note tel quel.' }],
  }),
  mini({
    id: 'F11-limite-competence',
    skill: 'F11',
    structure: 'rester-dans-son-champ-de-competence',
    text: 'Une personne accompagnée vous dit qu’elle a mal et vous demande si elle doit changer son traitement.',
    q: 'Quelle réponse respecte le champ de compétence d’une aide-soignante ?',
    choices: [
      { label: 'J’écoute, je note ce qui est dit, et je transmets immédiatement à l’infirmière.', ok: true },
      { label: 'Je lui conseille de diminuer la dose en attendant.', why: 'Modifier un traitement ne relève pas de l’aide-soignante : c’est un dépassement de compétence, avec un risque réel.' },
      { label: 'Je lui dis que ce n’est probablement pas grave.', why: 'Il s’agit d’une évaluation clinique, qui ne relève pas de ce rôle. Cela peut aussi retarder une prise en charge.' },
    ],
    h: ['Demandez-vous quel professionnel est habilité à répondre.', 'Votre rôle inclut l’écoute, l’observation et la transmission.'],
    alt: [
      'Séparez ce que vous pouvez faire de ce que vous devez transmettre.',
      'Écouter et observer : oui. Décider d’un traitement ou évaluer sa gravité : non.',
    ],
    sol: [
      { text: 'Écouter et recueillir les faits.', why: 'C’est pleinement dans le rôle.' },
      { text: 'Transmettre sans délai.', why: 'L’évaluation et la décision appartiennent à l’infirmière ou au médecin.' },
    ],
  }),
  mini({
    id: 'F11-refus',
    skill: 'F11',
    structure: 'reagir-a-un-refus',
    q: 'Une personne refuse un soin d’hygiène. Quelle conduite est la plus adaptée ?',
    choices: [
      { label: 'Chercher à comprendre le refus, proposer un autre moment ou une autre modalité, et transmettre.', ok: true },
      { label: 'Insister jusqu’à ce qu’elle accepte.', why: 'Le refus est un droit. Insister jusqu’à obtenir un accord contraint n’est pas un consentement.' },
      { label: 'Noter le refus et ne plus rien proposer.', why: 'Prendre acte sans jamais reproposer revient à abandonner l’accompagnement.' },
    ],
    h: ['Le refus est un droit de la personne.', 'Votre marge d’action porte sur le moment, la manière et l’explication.'],
    alt: [
      'Pensez à ce que vous voudriez qu’on fasse pour vous-même.',
      'Comprendre, proposer autrement, laisser la porte ouverte : ce sont les trois gestes.',
    ],
    sol: [
      { text: 'Comprendre avant de reproposer.', why: 'Un refus a souvent une raison : douleur, pudeur, fatigue, moment mal choisi.' },
      { text: 'Transmettre.', why: 'L’équipe doit savoir, pour adapter la suite.' },
    ],
  }),
  mini({
    id: 'F11-transmission',
    skill: 'F11',
    level: 'epreuve',
    structure: 'rediger-une-transmission-professionnelle',
    transfer: true,
    q: 'Quelle transmission est la mieux rédigée ?',
    choices: [
      {
        label:
          'Refus de la toilette ce matin. Proposition de report en fin de matinée acceptée. Soin partiel réalisé. Transmis à l’infirmière.',
        ok: true,
      },
      { label: 'Toilette compliquée ce matin, comme d’habitude.', why: '« Compliquée » et « comme d’habitude » sont des appréciations, sans fait vérifiable ni action décrite.' },
      { label: 'Madame D., 82 ans, chambre 14, a refusé sa toilette.', why: 'Des éléments identifiants ne doivent jamais figurer dans un écrit d’entraînement, et ne sont pas nécessaires ici.' },
    ],
    h: ['Une transmission contient des faits et des actions.', 'Vérifiez aussi qu’aucun élément ne permet d’identifier une personne.'],
    alt: [
      'Découpez en quatre temps : ce qui s’est passé, ce que vous avez proposé, ce qui a été fait, à qui vous l’avez dit.',
      'Cette structure produit une transmission complète en quatre phrases courtes.',
    ],
    sol: [
      { text: 'Faits, action, résultat, transmission.', why: 'Chaque élément est vérifiable.' },
      { text: 'Aucune donnée identifiante.', why: 'C’est une règle absolue, y compris dans les exercices.' },
    ],
    sec: 60,
  }),

  // ------------------------------------------------------------------ F12
  mini({
    id: 'F12-repartition',
    skill: 'F12',
    level: 'decouverte',
    structure: 'repartir-son-temps-sur-30-minutes',
    q: 'Sur une épreuve de 30 minutes, quelle répartition protège le mieux la copie ?',
    choices: [
      { label: '5 min de lecture, 3 min de plan, 19 min de rédaction, 3 min de relecture', ok: true },
      { label: '30 min de rédaction directe', why: 'Sans plan ni relecture, le risque de hors-sujet et de fautes augmente fortement.' },
      { label: '15 min de lecture, 15 min de rédaction', why: 'La lecture occupe la moitié du temps et il ne reste rien pour relire.' },
    ],
    h: ['Deux temps ne se négocient pas : la lecture et la relecture.', 'Le plan coûte trois minutes et en fait gagner dix.'],
    alt: [
      'Écrivez les heures repères en haut du brouillon avant de commencer.',
      'Un jalon dépassé vous alerte tout de suite, pas à la dernière minute.',
    ],
    sol: [{ text: 'Lecture, plan, rédaction, relecture.', why: 'Chaque phase a une fonction ; supprimer l’une fragilise la copie.' }],
    sec: 40,
  }),
  mini({
    id: 'F12-bareme',
    skill: 'F12',
    structure: 'repartir-le-temps-selon-le-bareme',
    text: 'Une épreuve de 30 minutes comporte deux questions : l’une sur 4 points, l’autre sur 6 points.',
    q: 'Après 5 minutes de lecture et en gardant 3 minutes de relecture, combien de temps consacrer à la question sur 6 points ?',
    choices: [
      { label: 'Environ 13 minutes', ok: true },
      { label: 'Environ 22 minutes', why: 'Il ne resterait rien pour la question sur 4 points, qui vaut tout de même 40 % des points.' },
      { label: 'Environ 6 minutes', why: 'La question la mieux notée recevrait moins de temps que l’autre.' },
    ],
    h: ['Calculez d’abord le temps réellement disponible pour rédiger.', 'Répartissez-le ensuite proportionnellement au barème.'],
    alt: [
      'Le temps de rédaction vaut 30 − 5 − 3 = 22 minutes.',
      'Six points sur dix représentent 60 % de 22 minutes, soit environ 13 minutes.',
    ],
    sol: [
      { text: 'Temps de rédaction : 22 minutes.', why: 'Lecture et relecture sont réservées.' },
      { text: 'Proportion : 6/10 de 22 ≈ 13 minutes.', why: 'Le barème indique où sont les points.' },
    ],
    sec: 55,
  }),
  mini({
    id: 'F12-question-blanche',
    skill: 'F12',
    structure: 'ne-pas-laisser-de-question-sans-reponse',
    q: 'Il reste 4 minutes et la seconde question n’est pas commencée. Que faire ?',
    choices: [
      { label: 'Écrire trois ou quatre lignes structurées qui répondent directement à la question', ok: true },
      { label: 'Laisser la question blanche pour ne pas écrire de bêtises', why: 'Une question blanche vaut zéro à coup sûr. Quelques lignes justes rapportent toujours quelque chose.' },
      { label: 'Continuer d’améliorer la première réponse', why: 'Les points restants se trouvent dans la question non traitée, pas dans celle qui est déjà rédigée.' },
    ],
    h: ['Comparez ce que rapporte une question blanche et une réponse courte.', 'Les points les plus faciles sont toujours dans la question non traitée.'],
    alt: [
      'Écrivez d’abord la phrase qui répond franchement à la question.',
      'Ajoutez ensuite une explication et, si le temps le permet, un exemple.',
    ],
    sol: [{ text: 'Une réponse courte vaut mieux qu’aucune.', why: 'Le correcteur ne peut valoriser que ce qui est écrit.' }],
    sec: 40,
  }),
  mini({
    id: 'F12-relecture-ciblee',
    skill: 'F12',
    level: 'epreuve',
    structure: 'organiser-une-relecture-efficace',
    transfer: true,
    q: 'Vous disposez de 3 minutes de relecture. Quelle méthode trouve le plus d’erreurs ?',
    choices: [
      { label: 'Faire deux passages ciblés : d’abord la réponse à la consigne, puis les accords', ok: true },
      { label: 'Relire une fois du début à la fin en cherchant tout à la fois', why: 'Une relecture générale fait surtout revoir le sens : les accords passent inaperçus.' },
      { label: 'Réécrire proprement le début de la copie', why: 'Recopier consomme tout le temps disponible sans corriger les erreurs de fond.' },
    ],
    h: ['Chercher plusieurs choses en même temps fait tout manquer.', 'Une relecture ciblée sur un seul type d’erreur est bien plus efficace.'],
    alt: [
      'Premier passage : « ai-je répondu à ce qui est demandé, et à tout ce qui est demandé ? »',
      'Second passage : accords sujet-verbe et homophones courants, en lisant lentement.',
    ],
    sol: [
      { text: 'Passage 1 : le fond.', why: 'Un hors-sujet coûte plus cher que dix fautes.' },
      { text: 'Passage 2 : la langue.', why: 'Cibler un seul type d’erreur augmente fortement le taux de détection.' },
    ],
    sec: 50,
  }),
]
