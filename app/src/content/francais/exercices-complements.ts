/**
 * Micro-exercices de français — complément couvrant F01 à F12.
 * Tous les textes supports sont originaux et fictifs.
 */

import type { FrenchExercise } from '../types'
import { mini } from './builder'

export const EX_COMPLEMENTS: FrenchExercise[] = [
  // ------------------------------------------------------------------ F01
  mini({
    id: 'F01-verbe-resumer',
    skill: 'F01',
    structure: 'distinguer-resumer-et-commenter',
    q: 'Consigne : « Résumez le texte en cinq lignes. » Que ne doit surtout PAS contenir votre réponse ?',
    choices: [
      { label: 'Votre avis personnel sur le sujet', ok: true },
      { label: 'Les liens logiques du texte', why: 'Les connecteurs portent le raisonnement : les supprimer transforme le résumé en liste décousue.' },
      { label: 'L’idée principale', why: 'C’est précisément ce qu’un résumé doit conserver.' },
      { label: 'Les nuances employées par l’auteur', why: 'Les supprimer fait dire au texte plus qu’il ne dit.' },
    ],
    h: ['Un résumé restitue, il ne commente pas.', 'Cherchez ce qui viendrait de vous et non du texte.'],
    alt: [
      'Testez chaque élément avec la formule « le texte dit que… ».',
      'Ce qui ne peut pas s’introduire ainsi n’a pas sa place dans un résumé.',
    ],
    sol: [{ text: 'L’avis personnel est exclu du résumé.', why: 'Il apparaîtrait comme une information du texte, ce qui serait faux.' }],
    sec: 35,
  }),
  mini({
    id: 'F01-relever-vs-expliquer',
    skill: 'F01',
    structure: 'associer-consigne-et-longueur',
    q: 'Quelle consigne appelle la réponse la plus courte ?',
    choices: [
      { label: 'Citez deux acteurs mentionnés dans le texte.', ok: true },
      { label: 'Expliquez pourquoi ces acteurs interviennent.', why: 'Expliquer demande un développement : causes, mécanisme, exemple.' },
      { label: 'Analysez les difficultés de coordination entre ces acteurs.', why: 'Analyser est le travail le plus développé des trois.' },
    ],
    h: ['Chaque verbe appelle une longueur différente.', 'Citer se fait en quelques mots ; expliquer et analyser demandent des paragraphes.'],
    alt: [
      'Classez mentalement les verbes du plus court au plus long : citer, définir, expliquer, analyser.',
      'Cette échelle vous dit immédiatement combien de lignes prévoir.',
    ],
    sol: [{ text: 'Citer se fait en quelques mots.', why: 'Aucun commentaire n’est attendu.' }],
    sec: 35,
  }),
  mini({
    id: 'F01-double-consigne',
    skill: 'F01',
    level: 'epreuve',
    structure: 'traiter-une-consigne-double',
    transfer: true,
    text: 'Consigne : « Définissez la notion de prévention, puis montrez ses limites. »',
    q: 'Une copie qui définit longuement la prévention sans parler de limites obtient-elle la moitié des points ?',
    choices: [
      { label: 'Au mieux : la moitié de la consigne n’a pas été traitée', ok: true },
      { label: 'Oui, la totalité, si la définition est excellente', why: 'La qualité d’une partie ne compense pas l’absence de l’autre : le second travail demandé n’a reçu aucune réponse.' },
      { label: 'Non, zéro, car la consigne n’est pas respectée', why: 'Le travail réalisé est valorisé : il n’y a pas d’annulation totale.' },
    ],
    h: ['Comptez les travaux demandés par la consigne.', 'Chaque travail non traité est une part des points qui ne peut pas être attribuée.'],
    alt: [
      'Découpez la consigne au niveau du « puis ».',
      'Vous obtenez deux travaux indépendants, chacun porteur d’une partie des points.',
    ],
    sol: [
      { text: 'Deux travaux demandés, un seul traité.', why: 'Les points du second ne peuvent pas être attribués.' },
      { text: 'Une définition brève et une vraie partie sur les limites valent mieux.', why: 'Le barème suit la consigne, pas la longueur.' },
    ],
    sec: 50,
  }),

  // ------------------------------------------------------------------ F02
  mini({
    id: 'F02-thème',
    skill: 'F02',
    level: 'decouverte',
    structure: 'identifier-le-theme',
    text:
      'Des permanences d’accès aux soins accueillent des personnes sans couverture maladie effective. Elles orientent vers l’ouverture des droits et assurent les soins les plus urgents.',
    q: 'Quel est le thème de ce passage ?',
    choices: [
      { label: 'L’accès aux soins des personnes sans droits ouverts', ok: true },
      { label: 'L’organisation des urgences hospitalières', why: 'Le texte ne parle pas du service des urgences mais d’un dispositif d’accueil et d’ouverture des droits.' },
      { label: 'Le coût des soins pour la collectivité', why: 'Aucun élément financier n’est évoqué.' },
    ],
    h: ['Le thème est ce dont parlent toutes les phrases.', 'Repérez le public concerné et la fonction du dispositif.'],
    alt: ['Résumez le passage en trois mots.', '« Accès », « droits », « soins » suffisent à identifier le thème.'],
    sol: [{ text: 'Public sans droits effectifs + dispositif d’accès.', why: 'Les deux phrases y renvoient.' }],
    sec: 40,
  }),
  mini({
    id: 'F02-connecteur',
    skill: 'F02',
    structure: 'reperer-un-connecteur-logique',
    text: 'Le dispositif a réduit les délais. Toutefois, il n’a pas modifié la répartition des professionnels sur le territoire.',
    q: 'Que signale le mot « toutefois » ?',
    choices: [
      { label: 'Une limite apportée à ce qui vient d’être dit', ok: true },
      { label: 'Une conséquence de ce qui précède', why: 'Une conséquence s’introduit par « donc », « ainsi », « par conséquent ».' },
      { label: 'Un exemple', why: 'Un exemple s’introduit par « ainsi », « par exemple », « notamment ».' },
    ],
    h: ['Regardez si la seconde phrase va dans le même sens que la première.', 'Elle apporte un élément négatif après un élément positif.'],
    alt: ['Remplacez « toutefois » par « mais ».', 'La phrase garde le même sens : c’est bien une opposition.'],
    sol: [{ text: '« Toutefois » introduit une restriction.', why: 'Il annonce que la réussite décrite est partielle.' }],
    sec: 35,
  }),
  mini({
    id: 'F02-information-absente',
    skill: 'F02',
    structure: 'reperer-une-information-absente',
    text:
      'Une structure fictive constate que les personnes âgées vivant seules sollicitent moins les consultations de prévention que les autres.',
    q: 'Quelle affirmation le texte ne permet PAS de faire ?',
    choices: [
      { label: 'Ces personnes ne veulent pas se faire soigner.', ok: true },
      { label: 'Elles sollicitent moins les consultations de prévention.', why: 'C’est exactement ce que dit le texte.' },
      { label: 'Le constat porte sur des personnes âgées vivant seules.', why: 'Le public est explicitement nommé.' },
    ],
    h: ['Distinguez ce qui est écrit de ce qu’on pourrait supposer.', 'Le texte constate un comportement, il n’en donne pas la raison.'],
    alt: [
      'Demandez-vous à chaque phrase : « où est-ce écrit ? »',
      'Si vous ne pouvez pas montrer le passage, l’affirmation est une interprétation.',
    ],
    sol: [
      { text: 'Le texte ne dit rien des intentions.', why: 'Attribuer un refus de soin à ces personnes est une interprétation non fondée, et un jugement.' },
    ],
    sec: 45,
  }),
  mini({
    id: 'F02-idee-par-paragraphe',
    skill: 'F02',
    level: 'epreuve',
    structure: 'associer-paragraphe-et-idee',
    transfer: true,
    text:
      'Paragraphe 1 : les délais de rendez-vous s’allongent. Paragraphe 2 : certaines personnes renoncent alors à consulter. Paragraphe 3 : des consultations sans rendez-vous se développent, avec une capacité limitée.',
    q: 'Remettez dans l’ordre les trois fonctions de ces paragraphes.',
    order: [
      { id: 'a', label: 'Poser le constat de départ' },
      { id: 'b', label: 'Décrire la conséquence pour les personnes' },
      { id: 'c', label: 'Présenter une réponse et sa limite' },
    ],
    h: ['Chaque paragraphe remplit une fonction dans le raisonnement.', 'Cherchez lequel décrit un effet et lequel propose une réponse.'],
    alt: [
      'Notez un mot en marge de chaque paragraphe : constat, effet, réponse.',
      'Ces trois mots forment le plan du texte et suffisent à le résumer.',
    ],
    sol: [{ text: 'Constat, conséquence, réponse partielle.', why: 'C’est la structure la plus fréquente des textes du champ sanitaire.' }],
    sec: 55,
  }),

  // ------------------------------------------------------------------ F03
  mini({
    id: 'F03-coordination',
    skill: 'F03',
    structure: 'definir-la-coordination',
    q: 'Que désigne la « coordination » dans le champ sanitaire et social ?',
    choices: [
      { label: 'L’organisation des interventions de plusieurs professionnels autour d’une même personne', ok: true },
      { label: 'Le fait de donner des ordres à une équipe', why: 'La coordination n’est pas une relation hiérarchique : elle organise des interventions.' },
      { label: 'La réunion hebdomadaire d’un service', why: 'La réunion est un outil possible de la coordination, pas sa définition.' },
    ],
    h: ['Le mot contient l’idée de mettre en ordre ensemble.', 'Demandez-vous autour de qui cette organisation est construite.'],
    alt: ['Pensez à un parcours avec plusieurs intervenants.', 'Coordonner, c’est faire en sorte que chacun sache ce que font les autres.'],
    sol: [{ text: 'Organisation des interventions autour de la personne.', why: 'C’est le sens retenu dans le champ sanitaire et social.' }],
    sec: 35,
  }),
  mini({
    id: 'F03-inclusion',
    skill: 'F03',
    structure: 'distinguer-integration-et-inclusion',
    q: 'Qu’est-ce qui distingue l’inclusion de l’intégration ?',
    choices: [
      { label: 'L’inclusion adapte l’environnement ; l’intégration demande à la personne de s’adapter', ok: true },
      { label: 'Ce sont deux mots pour la même idée', why: 'Les deux notions désignent des approches différentes, avec des conséquences pratiques distinctes.' },
      { label: 'L’inclusion concerne l’école, l’intégration le travail', why: 'La distinction ne porte pas sur le lieu mais sur ce qui doit s’adapter.' },
    ],
    h: ['Demandez-vous qui doit changer : la personne ou l’environnement.', 'L’une des deux notions fait porter l’effort sur la personne.'],
    alt: [
      'Prenez l’exemple d’un bâtiment avec un escalier.',
      'L’intégration aide la personne à monter ; l’inclusion installe une rampe pour tout le monde.',
    ],
    sol: [{ text: 'L’inclusion transforme l’environnement.', why: 'C’est pourquoi elle bénéficie souvent à d’autres publics que celui visé.' }],
  }),
  mini({
    id: 'F03-observance',
    skill: 'F03',
    structure: 'employer-un-terme-avec-precaution',
    q: 'Une personne ne prend pas son traitement comme prévu. Quelle formulation est la plus professionnelle ?',
    choices: [
      { label: 'La prise du traitement ne se déroule pas comme prévu ; j’en recherche la raison avec elle.', ok: true },
      { label: 'Elle est non observante.', why: 'Le terme attribue la difficulté à la personne et clôt la recherche de cause : effets indésirables, horaires, coût.' },
      { label: 'Elle ne fait pas d’efforts.', why: 'C’est un jugement moral, sans valeur descriptive ni utilité pour l’équipe.' },
    ],
    h: ['Cherchez la formulation qui laisse ouverte la recherche de cause.', 'Un mot qui désigne un manquement de la personne ferme la discussion.'],
    alt: [
      'Demandez-vous ce que vous feriez après avoir écrit chaque phrase.',
      'Seule la première conduit à une action : chercher l’obstacle réel.',
    ],
    sol: [{ text: 'Décrire la situation, pas qualifier la personne.', why: 'Cela permet d’identifier un obstacle qu’on peut lever.' }],
  }),
  mini({
    id: 'F03-vocabulaire-contexte',
    skill: 'F03',
    level: 'epreuve',
    structure: 'reformuler-un-terme-technique',
    transfer: true,
    text: 'Phrase : « Le dispositif vise à prévenir le non-recours aux droits. »',
    q: 'Comment expliquer « non-recours aux droits » à une personne qui découvre le terme ?',
    choices: [
      { label: 'Le fait de ne pas demander une aide à laquelle on a pourtant droit', ok: true },
      { label: 'Le fait de se voir refuser une aide', why: 'Un refus est une décision de l’organisme. Le non-recours désigne une absence de demande.' },
      { label: 'Le fait qu’une aide n’existe pas', why: 'Le non-recours suppose au contraire que l’aide existe et que la personne y a droit.' },
    ],
    h: ['Le préfixe « non » porte sur le fait de recourir, c’est-à-dire de demander.', 'La personne a le droit, mais ne l’exerce pas.'],
    alt: [
      'Découpez le mot : « recours » veut dire « fait de s’adresser à ».',
      '« Non-recours » désigne donc le fait de ne pas s’adresser à l’organisme, alors qu’on le pourrait.',
    ],
    sol: [{ text: 'Droit ouvert, mais non demandé.', why: 'C’est ce qui distingue le non-recours du refus.' }],
    sec: 45,
  }),

  // ------------------------------------------------------------------ F04
  mini({
    id: 'F04-voix-passive',
    skill: 'F04',
    structure: 'changer-la-construction',
    text: 'Phrase d’origine : « L’équipe a mis en place une permanence d’information. »',
    q: 'Quelle reformulation change réellement la construction sans changer le sens ?',
    choices: [
      { label: 'Une permanence d’information a été mise en place par l’équipe.', ok: true },
      { label: 'L’équipe a installé une permanence d’information.', why: 'Seul le verbe change : la construction reste identique, la reformulation est faible.' },
      { label: 'Une permanence d’information existe.', why: 'L’acteur a disparu : on ne sait plus qui l’a mise en place.' },
    ],
    h: ['Regardez ce qui occupe la place du sujet.', 'Passer de la voix active à la voix passive change la construction.'],
    alt: [
      'Demandez-vous ce qui est mis en avant dans chaque phrase.',
      'À la voix passive, c’est la permanence ; à la voix active, c’est l’équipe. Le fait reste le même.',
    ],
    sol: [{ text: 'La voix passive conserve l’acteur et change la structure.', why: 'C’est une reformulation, pas un simple remplacement de mot.' }],
    sec: 45,
  }),
  mini({
    id: 'F04-ajout-interdit',
    skill: 'F04',
    structure: 'ne-pas-ajouter-d-information',
    text: 'Phrase d’origine : « Certaines familles renoncent à demander une aide. »',
    q: 'Quelle reformulation ajoute une information absente du texte ?',
    choices: [
      { label: 'Certaines familles renoncent à demander une aide, par manque d’information.', ok: true },
      { label: 'Une partie des familles ne fait pas de demande d’aide.', why: 'Le sens est conservé sans ajout.' },
      { label: 'Il arrive que des familles ne sollicitent pas d’aide.', why: 'La portée reste la même et rien n’est ajouté.' },
    ],
    h: ['Cherchez la proposition qui répond à une question que le texte ne pose pas.', 'Le texte constate un fait ; l’une des réponses en donne la cause.'],
    alt: [
      'Soulignez chaque information de la phrase d’origine.',
      'Toute information supplémentaire dans la reformulation est un ajout, même si elle est plausible.',
    ],
    sol: [{ text: 'La cause n’est pas dans le texte.', why: 'Une reformulation n’explique pas : elle redit.' }],
    sec: 45,
  }),
  mini({
    id: 'F04-mot-a-mot',
    skill: 'F04',
    structure: 'eviter-le-mot-a-mot',
    text: 'Phrase d’origine : « L’isolement social accroît le risque de renoncement aux soins. »',
    q: 'Quelle est la meilleure reformulation ?',
    choices: [
      { label: 'Quand une personne est isolée, elle a plus de chances de repousser ou d’abandonner des soins.', ok: true },
      { label: 'L’isolement social augmente le risque de renoncement aux soins.', why: 'Un seul mot a changé : c’est un recopiage déguisé.' },
      { label: 'Les personnes isolées ne se soignent pas.', why: 'La nuance « accroît le risque » a disparu : l’affirmation devient fausse.' },
    ],
    h: ['Une bonne reformulation change les mots ET la construction.', 'Vérifiez ensuite qu’aucune nuance n’a disparu.'],
    alt: [
      'Reformulez en commençant par « quand ».',
      'Cette entrée oblige à reconstruire la phrase au lieu de remplacer des mots un à un.',
    ],
    sol: [
      { text: 'Construction changée.', why: 'La phrase passe d’un groupe nominal à une proposition.' },
      { text: 'Nuance conservée.', why: '« Plus de chances » rend bien « accroît le risque ».' },
    ],
    sec: 50,
  }),
  mini({
    id: 'F04-reformuler-consigne',
    skill: 'F04',
    level: 'epreuve',
    structure: 'reformuler-une-consigne-pour-la-comprendre',
    transfer: true,
    text: 'Consigne : « Après avoir identifié les acteurs concernés, montrez en quoi leur coordination conditionne la qualité du parcours. »',
    q: 'Quelle reformulation de la consigne est fidèle ?',
    choices: [
      {
        label: 'Je dois d’abord dire qui intervient, puis expliquer pourquoi la qualité du parcours dépend de la façon dont ces intervenants s’organisent entre eux.',
        ok: true,
      },
      { label: 'Je dois expliquer ce qu’est un parcours de santé.', why: 'La définition du parcours n’est pas demandée : la consigne porte sur les acteurs et leur coordination.' },
      { label: 'Je dois donner mon avis sur la coordination.', why: 'Aucun avis n’est demandé : le verbe est « montrez », pas « donnez votre avis ».' },
    ],
    h: ['Repérez les deux verbes de la consigne.', 'Reformulez chacun avec vos mots, en gardant l’ordre.'],
    alt: [
      'Transformez la consigne en deux questions.',
      '« Qui intervient ? » puis « pourquoi leur organisation change-t-elle la qualité du parcours ? »',
    ],
    sol: [{ text: 'Deux travaux, dans l’ordre.', why: 'Identifier, puis montrer un lien.' }],
    sec: 55,
  }),

  // ------------------------------------------------------------------ F05
  mini({
    id: 'F05-longueur',
    skill: 'F05',
    structure: 'respecter-une-longueur-de-resume',
    q: 'On demande un résumé en cinq lignes et vous en écrivez douze, toutes justes. Que se passe-t-il ?',
    choices: [
      { label: 'La longueur fait partie de la consigne : le résumé n’est pas conforme', ok: true },
      { label: 'Rien, puisque tout est juste', why: 'Savoir sélectionner dans une longueur imposée est précisément la compétence évaluée par un résumé.' },
      { label: 'La copie est annulée', why: 'Il n’y a pas d’annulation : la consigne est mal respectée, ce qui coûte des points.' },
    ],
    h: ['Demandez-vous ce qu’un résumé évalue.', 'Ce n’est pas la quantité d’informations retenues, mais la capacité à choisir.'],
    alt: [
      'Écrivez librement, puis comptez vos lignes.',
      'Barrez ensuite tout ce dont la suppression ne change pas le sens, jusqu’à tenir dans la longueur.',
    ],
    sol: [{ text: 'La longueur est une consigne.', why: 'Elle mesure la hiérarchisation.' }],
    sec: 35,
  }),
  mini({
    id: 'F05-connecteur-garde',
    skill: 'F05',
    structure: 'conserver-les-liens-logiques',
    text:
      'Texte : « Les ateliers de prévention attirent surtout un public déjà sensibilisé. C’est pourquoi certaines structures vont désormais au-devant des habitants. »',
    q: 'Quel résumé conserve le raisonnement ?',
    choices: [
      { label: 'Parce que les ateliers touchent surtout un public déjà sensibilisé, des structures se déplacent vers les habitants.', ok: true },
      { label: 'Les ateliers attirent un public sensibilisé. Des structures se déplacent.', why: 'Le lien de cause a disparu : les deux phrases semblent sans rapport.' },
      { label: 'Des structures se déplacent vers les habitants.', why: 'Le constat de départ, qui explique la démarche, a été supprimé.' },
    ],
    h: ['Repérez le connecteur « c’est pourquoi ».', 'Un résumé garde les liens, même s’il coupe les détails.'],
    alt: [
      'Écrivez le résumé en commençant par « parce que ».',
      'Cette formule oblige à conserver la cause dans la phrase.',
    ],
    sol: [{ text: 'Le lien de cause est le cœur du passage.', why: 'Le supprimer transforme un raisonnement en juxtaposition.' }],
    sec: 45,
  }),
  mini({
    id: 'F05-exemple-supprime',
    skill: 'F05',
    structure: 'supprimer-les-exemples',
    text:
      'Texte : « Le numérique complique certaines démarches. Une personne sans adresse électronique ne peut pas créer de compte, et une personne sans imprimante ne peut pas fournir certains justificatifs. »',
    q: 'Quel résumé en une phrase est le plus adapté ?',
    choices: [
      { label: 'Les démarches numériques posent problème à qui n’a pas l’équipement nécessaire.', ok: true },
      { label: 'Il faut une adresse électronique et une imprimante pour faire ses démarches.', why: 'Ce sont les exemples du texte : un résumé conserve l’idée, pas les illustrations.' },
      { label: 'Le numérique est un progrès pour les démarches.', why: 'Le sens est inversé : le texte décrit une difficulté.' },
    ],
    h: ['Les deux dernières phrases illustrent la première.', 'Un résumé garde l’idée et supprime les illustrations.'],
    alt: [
      'Demandez-vous ce que les deux exemples ont en commun.',
      'Ils renvoient tous deux à un manque d’équipement : c’est l’idée à conserver.',
    ],
    sol: [{ text: 'On garde l’idée générale.', why: 'Les exemples n’apportent pas d’information nouvelle.' }],
    sec: 45,
  }),
  mini({
    id: 'F05-resume-en-une-phrase',
    skill: 'F05',
    level: 'epreuve',
    structure: 'resumer-un-paragraphe-en-une-phrase',
    transfer: true,
    text:
      'Texte : « Une structure a testé un rappel par message la veille des rendez-vous. Le nombre d’absences a diminué. Le dispositif demande toutefois un temps de secrétariat qui n’avait pas été anticipé. »',
    q: 'Quel résumé est le plus fidèle ?',
    choices: [
      { label: 'Un rappel la veille réduit les absences, mais coûte du temps de secrétariat.', ok: true },
      { label: 'Un rappel la veille réduit les absences.', why: 'La limite, introduite par « toutefois », a disparu : elle fait pourtant partie du propos.' },
      { label: 'Le dispositif de rappel coûte trop cher.', why: 'Le texte signale un coût en temps, sans porter de jugement sur son ampleur.' },
    ],
    h: ['Le passage comporte un résultat et une limite.', 'Les deux doivent apparaître dans le résumé.'],
    alt: [
      'Écrivez d’abord le résultat, puis ajoutez « mais » et la limite.',
      'Vous obtenez un résumé complet en une seule phrase.',
    ],
    sol: [{ text: 'Résultat + limite.', why: 'Le « toutefois » du texte impose de conserver les deux.' }],
    sec: 50,
  }),

  // ------------------------------------------------------------------ F06
  mini({
    id: 'F06-cause-multiple',
    skill: 'F06',
    structure: 'identifier-plusieurs-causes',
    text: 'Constat : dans un territoire fictif, le nombre de rendez-vous non honorés augmente.',
    q: 'Quelles explications sont des causes plausibles à explorer ?',
    multiple: true,
    choices: [
      { label: 'Des difficultés de transport', ok: true },
      { label: 'L’absence de moyen simple de prévenir en cas d’empêchement', ok: true },
      { label: 'Le fait que les personnes concernées manquent de sérieux', why: 'C’est un jugement, pas une cause : il ne débouche sur aucune action possible.' },
      { label: 'Le nombre de salles de consultation', why: 'Le nombre de salles n’a pas de lien direct avec le fait d’honorer un rendez-vous déjà fixé.' },
    ],
    h: ['Une cause doit pouvoir être vérifiée et, si possible, corrigée.', 'Écartez ce qui relève du jugement sur les personnes.'],
    alt: [
      'Pour chaque proposition, demandez-vous quelle action elle permettrait.',
      'Une cause utile est une cause sur laquelle on peut agir.',
    ],
    sol: [
      { text: 'Transport et moyen de prévenir sont des causes actionnables.', why: 'Chacune ouvre une piste concrète.' },
      { text: 'Le « manque de sérieux » n’explique rien.', why: 'Il remplace la recherche de cause par un jugement.' },
    ],
    sec: 55,
  }),
  mini({
    id: 'F06-consequence-indirecte',
    skill: 'F06',
    structure: 'distinguer-consequence-directe-et-indirecte',
    text: 'Une personne renonce à plusieurs rendez-vous de suivi.',
    q: 'Quelle est la conséquence la plus indirecte ?',
    choices: [
      { label: 'La prise en charge devient plus lourde plusieurs mois plus tard', ok: true },
      { label: 'Le suivi devient irrégulier', why: 'C’est la conséquence immédiate du renoncement : elle survient en premier.' },
      { label: 'Des signes ne sont pas repérés à temps', why: 'C’est une conséquence intermédiaire, qui découle de l’irrégularité du suivi.' },
    ],
    h: ['Placez les conséquences dans l’ordre du temps.', 'La plus indirecte est celle qui arrive en dernier dans la chaîne.'],
    alt: [
      'Reliez les éléments par des flèches.',
      'Renoncement → suivi irrégulier → signes non repérés → prise en charge plus lourde.',
    ],
    sol: [{ text: 'La dernière étape de la chaîne est la plus indirecte.', why: 'Elle dépend de toutes les précédentes.' }],
    sec: 45,
  }),
  mini({
    id: 'F06-enjeu',
    skill: 'F06',
    structure: 'formuler-un-enjeu',
    q: 'Quelle phrase formule un enjeu, et non un simple constat ?',
    choices: [
      { label: 'Ce qui est en jeu, c’est la possibilité pour ces personnes d’accéder effectivement à leurs droits.', ok: true },
      { label: 'Beaucoup de personnes ne demandent pas les aides existantes.', why: 'C’est un constat : il décrit une situation sans dire ce qui est en jeu.' },
      { label: 'Il existe plusieurs aides dans ce domaine.', why: 'C’est une information factuelle, sans portée.' },
    ],
    h: ['Un enjeu répond à la question : qu’est-ce qu’on risque de perdre ou de gagner ?', 'Cherchez la phrase qui nomme ce qui est en jeu.'],
    alt: [
      'Commencez votre phrase par « ce qui est en jeu, c’est… ».',
      'Si la phrase ne peut pas commencer ainsi, c’est un constat et non un enjeu.',
    ],
    sol: [{ text: 'Un enjeu nomme ce qui se joue.', why: 'Il donne sa portée au constat.' }],
    sec: 40,
  }),
  mini({
    id: 'F06-analyse-complete',
    skill: 'F06',
    level: 'epreuve',
    structure: 'construire-un-paragraphe-d-analyse',
    transfer: true,
    q: 'Quel paragraphe constitue une analyse complète ?',
    choices: [
      {
        label:
          'Les aidants s’épuisent parce qu’ils assument seuls un accompagnement continu, sans relais ni information sur les aides. Il en résulte une fatigue durable et un isolement qui peuvent altérer leur propre santé.',
        ok: true,
      },
      { label: 'Les aidants sont très fatigués et se sentent souvent seuls.', why: 'C’est une description : ni cause ni conséquence ne sont explicitées.' },
      { label: 'Il faudrait créer davantage de solutions de répit pour les aidants.', why: 'C’est une proposition d’action, qui suppose l’analyse mais ne la remplace pas.' },
    ],
    h: ['Une analyse relie une cause et une conséquence.', 'Cherchez le paragraphe qui contient « parce que » et « il en résulte ».'],
    alt: [
      'Découpez chaque proposition en éléments : constat, cause, conséquence.',
      'Seule l’une des trois contient les trois éléments.',
    ],
    sol: [
      { text: 'Cause nommée.', why: '« Assument seuls, sans relais ni information ».' },
      { text: 'Conséquence nommée.', why: '« Fatigue durable et isolement », puis atteinte à leur propre santé.' },
    ],
    sec: 55,
  }),

  // ------------------------------------------------------------------ F07
  mini({
    id: 'F07-exemple-pertinent',
    skill: 'F07',
    structure: 'choisir-un-exemple-pertinent',
    text: 'Idée défendue : « Une information remise en main propre atteint mieux son public qu’une affiche. »',
    q: 'Quel exemple soutient le mieux cette idée ?',
    choices: [
      {
        label:
          'Dans une structure fictive, le nombre de dossiers complets a augmenté après que le document a été remis lors du rendez-vous plutôt qu’affiché dans le hall.',
        ok: true,
      },
      { label: 'Les affiches coûtent moins cher que les documents individuels.', why: 'Le coût n’a pas de rapport avec l’idée défendue, qui porte sur l’efficacité.' },
      { label: 'Beaucoup de gens ne lisent pas.', why: 'L’affirmation est trop générale, non étayée, et elle porte un jugement sur le public.' },
    ],
    h: ['Un exemple doit illustrer exactement l’idée défendue.', 'Cherchez celui qui compare les deux canaux d’information.'],
    alt: [
      'Vérifiez que l’exemple porterait la même conclusion si on l’isolait.',
      'Seul le premier montre une différence entre remise en main propre et affichage.',
    ],
    sol: [{ text: 'L’exemple compare les deux canaux.', why: 'C’est précisément ce que l’idée affirme.' }],
    sec: 45,
  }),
  mini({
    id: 'F07-objection',
    skill: 'F07',
    structure: 'traiter-une-objection',
    text: 'Vous défendez le maintien d’un accueil téléphonique. Objection : « cela mobilise du temps professionnel ».',
    q: 'Quelle réponse traite l’objection sans l’écarter ?',
    choices: [
      { label: 'C’est exact ; c’est pourquoi je propose des plages horaires identifiées plutôt qu’une permanence continue.', ok: true },
      { label: 'Ce n’est pas un vrai problème.', why: 'Nier l’objection sans argument affaiblit la position : l’interlocuteur n’a aucune raison de changer d’avis.' },
      { label: 'Le téléphone est indispensable, c’est tout.', why: 'L’affirmation répète la position sans répondre à l’objection.' },
    ],
    h: ['Traiter une objection, c’est la reconnaître puis montrer comment on la surmonte.', 'Cherchez la réponse qui propose un aménagement.'],
    alt: [
      'Formulez votre réponse en deux temps : « c’est exact, et c’est pourquoi… ».',
      'Cette structure oblige à proposer une solution plutôt qu’à nier la difficulté.',
    ],
    sol: [{ text: 'Reconnaître, puis aménager.', why: 'C’est ce qui distingue une argumentation d’un bras de fer.' }],
    sec: 50,
  }),
  mini({
    id: 'F07-ordre-des-arguments',
    skill: 'F07',
    level: 'epreuve',
    structure: 'ordonner-deux-arguments',
    transfer: true,
    q: 'Vous disposez de deux arguments, l’un très solide, l’autre secondaire. Comment les placer ?',
    choices: [
      { label: 'Le plus solide en premier, le secondaire ensuite', ok: true },
      { label: 'Le secondaire d’abord, pour finir en force', why: 'Le correcteur peut arrêter sa lecture attentive tôt : commencer faible risque de donner une mauvaise première impression.' },
      { label: 'Les deux mélangés dans le même paragraphe', why: 'Un paragraphe porte une idée : les mélanger rend les deux moins lisibles.' },
    ],
    h: ['Pensez à la façon dont une copie est lue.', 'La première impression se forme sur les premières lignes.'],
    alt: [
      'Imaginez que le correcteur ne lise que votre premier paragraphe.',
      'C’est là que doit se trouver votre meilleur argument.',
    ],
    sol: [{ text: 'Le plus solide d’abord.', why: 'Il installe la position et donne du crédit à la suite.' }],
    sec: 40,
  }),

  // ------------------------------------------------------------------ F08
  mini({
    id: 'F08-plan-comparaison',
    skill: 'F08',
    structure: 'choisir-un-plan-de-comparaison',
    text: 'Consigne : « Comparez l’accompagnement à domicile et l’accompagnement en établissement. »',
    q: 'Quel plan convient le mieux ?',
    choices: [
      { label: '1. Points communs — 2. Différences — 3. Ce qu’on en retient', ok: true },
      { label: '1. Le domicile — 2. L’établissement', why: 'Décrire l’un puis l’autre n’est pas comparer : rien ne les met en regard.' },
      { label: '1. Avantages — 2. Inconvénients', why: 'Ce plan suppose qu’une option est meilleure, alors que la consigne demande seulement de comparer.' },
    ],
    h: ['Comparer suppose de mettre les deux éléments en regard.', 'Un plan qui traite chaque élément séparément ne compare pas.'],
    alt: [
      'Construisez mentalement un tableau à deux colonnes et deux lignes.',
      'Les lignes « points communs » et « différences » deviennent vos parties.',
    ],
    sol: [{ text: 'Points communs, différences, conclusion.', why: 'Chaque partie met les deux éléments en relation.' }],
    sec: 40,
  }),
  mini({
    id: 'F08-transition',
    skill: 'F08',
    structure: 'ecrire-une-transition',
    q: 'Quelle transition entre deux parties est la plus utile ?',
    choices: [
      { label: 'Cette première difficulté en entraîne une seconde, moins visible : l’isolement.', ok: true },
      { label: 'Passons maintenant à la deuxième partie.', why: 'La phrase parle de la copie au lieu de relier les idées entre elles.' },
      { label: 'Deuxièmement.', why: 'Le mot marque un changement mais ne dit rien du lien entre les deux idées.' },
    ],
    h: ['Une bonne transition relie les idées, pas les paragraphes.', 'Cherchez celle qui annonce un lien logique.'],
    alt: [
      'Demandez-vous quel rapport existe entre vos deux idées.',
      'La transition consiste à écrire ce rapport : conséquence, opposition, approfondissement.',
    ],
    sol: [{ text: 'La transition nomme le lien.', why: '« En entraîne une seconde » indique une conséquence.' }],
    sec: 40,
  }),
  mini({
    id: 'F08-introduction',
    skill: 'F08',
    structure: 'ecrire-une-introduction-courte',
    q: 'Sur une réponse de vingt lignes, quelle introduction convient ?',
    choices: [
      { label: 'Une ou deux phrases qui annoncent ce que vous allez traiter', ok: true },
      { label: 'Cinq lignes de contexte général sur le système de santé', why: 'Sur vingt lignes, cela consomme un quart de la réponse sans traiter la question.' },
      { label: 'Aucune introduction : on entre directement dans le sujet', why: 'Une phrase d’annonce aide le correcteur à suivre. Elle coûte peu et rapporte en lisibilité.' },
    ],
    h: ['Proportionnez l’introduction à la longueur de la réponse.', 'Sur une réponse courte, l’introduction doit rester très brève.'],
    alt: [
      'Comptez les lignes disponibles avant de rédiger.',
      'Sur vingt lignes, une introduction de deux lignes et une conclusion d’une ligne suffisent.',
    ],
    sol: [{ text: 'Une ou deux phrases suffisent.', why: 'Le reste du temps doit servir au contenu demandé.' }],
    sec: 40,
  }),
  mini({
    id: 'F08-plan-complet',
    skill: 'F08',
    level: 'epreuve',
    structure: 'construire-un-plan-a-partir-d-une-consigne',
    transfer: true,
    text: 'Consigne : « Définissez le non-recours aux droits, expliquez ses causes, puis proposez une action. »',
    q: 'Remettez les parties dans l’ordre imposé par la consigne.',
    order: [
      { id: 'd', label: 'Définir le non-recours' },
      { id: 'c', label: 'Expliquer ses causes' },
      { id: 'a', label: 'Proposer une action' },
    ],
    h: ['La consigne donne elle-même l’ordre.', 'Repérez les verbes et le mot « puis ».'],
    alt: [
      'Numérotez les verbes de la consigne dans l’ordre où ils apparaissent.',
      'Cette numérotation est votre plan, sans aucune réflexion supplémentaire.',
    ],
    sol: [{ text: 'Définir, expliquer, proposer.', why: 'On ne peut pas expliquer les causes d’une notion non définie.' }],
    sec: 45,
  }),

  // ------------------------------------------------------------------ F09
  mini({
    id: 'F09-cest-sest',
    skill: 'F09',
    structure: 'homophone-cest-sest',
    q: 'Complétez : « ___ une situation fréquente, et elle ___ présentée plusieurs fois. »',
    choices: [
      { label: 'C’est / s’est', ok: true },
      { label: 'S’est / c’est', why: 'Les deux formes sont inversées. Test : « cela est une situation » fonctionne pour la première, pas pour la seconde.' },
      { label: 'C’est / c’est', why: 'La seconde forme accompagne le verbe « se présenter » : elle s’écrit « s’est ».' },
    ],
    h: ['Remplacez par « cela est » : si cela fonctionne, écrivez « c’est ».', 'Sinon, cherchez un verbe pronominal : se présenter, se lever, se passer.'],
    alt: ['Repérez le verbe qui suit.', 'Un participe passé après la forme indique presque toujours « s’est ».'],
    sol: [
      { text: '« C’est » = cela est.', why: 'Test de remplacement.' },
      { text: '« S’est présentée » = verbe pronominal.', why: 'Le pronom fait partie du verbe.' },
    ],
    sec: 40,
  }),
  mini({
    id: 'F09-participe-etre',
    skill: 'F09',
    structure: 'accord-du-participe-avec-etre',
    q: 'Quelle phrase est correcte ?',
    choices: [
      { label: 'Les transmissions ont été faites en fin de service.', ok: true },
      { label: 'Les transmissions ont été fait en fin de service.', why: 'Avec l’auxiliaire « être », le participe s’accorde avec le sujet : « les transmissions » est féminin pluriel.' },
    ],
    h: ['Repérez l’auxiliaire employé.', 'Avec « être », le participe s’accorde toujours avec le sujet.'],
    alt: ['Posez la question « qui est-ce qui a été fait ? ».', 'La réponse est le sujet, et c’est avec lui que le participe s’accorde.'],
    sol: [{ text: 'Accord avec le sujet.', why: 'Règle de l’auxiliaire « être ».' }],
    sec: 35,
  }),
  mini({
    id: 'F09-pluriel-compose',
    skill: 'F09',
    level: 'epreuve',
    structure: 'corriger-plusieurs-fautes',
    transfer: true,
    text: 'Phrase à corriger : « Les proche aidant son souvent seul face a ces démarches. »',
    q: 'Combien de fautes distinctes cette phrase contient-elle ?',
    choices: [
      { label: 'Cinq', ok: true },
      { label: 'Trois', why: 'Il y en a davantage : « proche », « aidant », « son », « seul » et « a » sont tous à corriger.' },
      { label: 'Sept', why: 'Le reste de la phrase est correct : « ces démarches » est bien écrit.' },
    ],
    h: ['Relisez mot à mot, en cherchant un seul type d’erreur à la fois.', 'Vérifiez d’abord les pluriels, ensuite les homophones.'],
    alt: [
      'Recopiez la phrase corrigée avant de compter.',
      'Phrase corrigée : « Les proches aidants sont souvent seuls face à ces démarches. »',
    ],
    sol: [
      { text: '« proche » → « proches ».', why: 'Le déterminant « les » impose le pluriel.' },
      { text: '« aidant » → « aidants ».', why: 'Même accord.' },
      { text: '« son » → « sont ».', why: 'Test : « étaient souvent seuls ».' },
      { text: '« seul » → « seuls ».', why: 'L’adjectif s’accorde avec le sujet pluriel.' },
      { text: '« a » → « à ».', why: '« avait ces démarches » ne fonctionne pas.' },
    ],
    sec: 60,
  }),

  // ------------------------------------------------------------------ F10
  mini({
    id: 'F10-repetition',
    skill: 'F10',
    structure: 'supprimer-une-repetition',
    text: 'Phrase : « La personne a expliqué sa situation, et la personne a demandé de l’aide pour la personne qui l’accompagne. »',
    q: 'Quelle réécriture est la plus claire ?',
    choices: [
      { label: 'La personne a expliqué sa situation et demandé de l’aide pour son accompagnant.', ok: true },
      { label: 'Elle a expliqué sa situation, et elle a demandé de l’aide pour elle.', why: 'L’ambiguïté reste : on ne sait plus pour qui l’aide est demandée.' },
      { label: 'La personne a expliqué sa situation. Elle a demandé de l’aide pour la personne.', why: 'La répétition subsiste et l’identité de « la personne » finale reste incertaine.' },
    ],
    h: ['Comptez combien de fois le même groupe est répété.', 'Cherchez la réécriture qui supprime la répétition sans créer d’ambiguïté.'],
    alt: [
      'Supprimez le second sujet quand il est identique au premier.',
      'Remplacez ensuite le troisième par un mot précis, qui lève le doute.',
    ],
    sol: [
      { text: 'Un seul sujet pour deux verbes coordonnés.', why: 'La phrase s’allège sans perdre d’information.' },
      { text: '« Son accompagnant » lève l’ambiguïté.', why: 'On sait pour qui l’aide est demandée.' },
    ],
    sec: 50,
  }),
  mini({
    id: 'F10-phrase-incomplete',
    skill: 'F10',
    structure: 'reperer-une-phrase-incomplete',
    q: 'Quelle proposition n’est PAS une phrase complète ?',
    choices: [
      { label: 'Ce qui explique le renoncement de certaines personnes aux soins.', ok: true },
      { label: 'Certaines personnes renoncent aux soins.', why: 'Sujet et verbe sont présents : la phrase est complète.' },
      { label: 'Le délai s’allonge.', why: 'Phrase courte mais complète.' },
    ],
    h: ['Cherchez le verbe conjugué principal.', 'Une proposition commençant par « ce qui » attend une suite.'],
    alt: [
      'Lisez chaque proposition à voix haute et arrêtez-vous.',
      'Si vous attendez encore quelque chose, la phrase n’est pas complète.',
    ],
    sol: [{ text: '« Ce qui explique… » est une subordonnée.', why: 'Elle ne peut pas exister seule.' }],
    sec: 40,
  }),
  mini({
    id: 'F10-virgule-sujet',
    skill: 'F10',
    structure: 'ne-pas-separer-sujet-et-verbe',
    q: 'Quelle phrase est correctement ponctuée ?',
    choices: [
      { label: 'Les personnes accompagnées par le service reçoivent une information écrite.', ok: true },
      { label: 'Les personnes accompagnées par le service, reçoivent une information écrite.', why: 'Une virgule ne sépare jamais le sujet de son verbe.' },
    ],
    h: ['Repérez le sujet et le verbe.', 'Une virgule entre les deux est une erreur, même si le sujet est long.'],
    alt: [
      'Réduisez la phrase à son squelette : « les personnes reçoivent ».',
      'On n’écrirait jamais « les personnes, reçoivent ».',
    ],
    sol: [{ text: 'Pas de virgule entre sujet et verbe.', why: 'Même quand le groupe sujet est long.' }],
    sec: 35,
  }),
  mini({
    id: 'F10-reecrire-oral',
    skill: 'F10',
    level: 'epreuve',
    structure: 'reecrire-un-passage-oral',
    transfer: true,
    text:
      'Passage : « En fait, le truc c’est que les gens ils savent pas trop où aller, et voilà, donc après ils laissent tomber. »',
    q: 'Quelle réécriture convient à une copie ?',
    choices: [
      { label: 'Faute de savoir à qui s’adresser, certaines personnes finissent par abandonner leur démarche.', ok: true },
      { label: 'En fait, les gens ne savent pas où aller, donc ils laissent tomber.', why: '« En fait » et « laisser tomber » restent des tournures orales.' },
      { label: 'Les gens ne savent pas où aller et ils abandonnent.', why: 'La généralisation « les gens » est maintenue, et le lien logique reste implicite.' },
    ],
    h: ['Repérez toutes les marques d’oral : « en fait », « le truc », « voilà », « laisser tomber ».', 'Remplacez aussi « les gens » par une formulation plus précise.'],
    alt: [
      'Réécrivez en commençant par la cause.',
      '« Faute de… » permet d’exprimer la cause sans connecteur oral.',
    ],
    sol: [
      { text: 'Suppression des tournures orales.', why: 'Elles n’ont pas leur place dans une copie.' },
      { text: '« Certaines personnes » remplace « les gens ».', why: 'La nuance évite une généralisation abusive.' },
    ],
    sec: 55,
  }),

  // ------------------------------------------------------------------ F11
  mini({
    id: 'F11-observation',
    skill: 'F11',
    structure: 'decrire-une-observation',
    q: 'Quelle observation est correctement formulée pour une transmission ?',
    choices: [
      { label: 'A mangé environ un tiers du plat au déjeuner ; a refusé le dessert.', ok: true },
      { label: 'N’a pas beaucoup mangé, comme souvent.', why: '« Pas beaucoup » n’est pas mesurable, et « comme souvent » est une appréciation sans date.' },
      { label: 'Fait la difficile avec les repas.', why: 'C’est un jugement sur la personne, qui n’aide en rien l’équipe.' },
    ],
    h: ['Une observation doit être vérifiable par une autre personne.', 'Cherchez la formulation qui donne une quantité et un moment.'],
    alt: [
      'Demandez-vous si une collègue pourrait vérifier votre phrase.',
      '« Un tiers du plat » se vérifie ; « pas beaucoup » ne se vérifie pas.',
    ],
    sol: [{ text: 'Quantité et moment.', why: 'C’est ce qui rend une observation utilisable.' }],
    sec: 40,
  }),
  mini({
    id: 'F11-orientation',
    skill: 'F11',
    structure: 'orienter-vers-le-bon-professionnel',
    text: 'Une personne vous demande comment obtenir une aide financière pour ses frais de transport.',
    q: 'Vers qui l’orienter en priorité ?',
    choices: [
      { label: 'Le travailleur social de la structure', ok: true },
      { label: 'Le médecin traitant', why: 'Les questions d’accès aux droits et aux aides relèvent du travail social, pas de la consultation médicale.' },
      { label: 'Personne : il faut lui dire de se débrouiller', why: 'Orienter fait partie du rôle professionnel ; laisser une personne sans réponse est un manquement.' },
    ],
    h: ['Demandez-vous quel professionnel traite les questions de droits et d’aides.', 'Orienter fait partie du rôle, même quand on ne sait pas répondre soi-même.'],
    alt: [
      'Classez les questions par domaine : soin, droits, organisation.',
      'Une question d’aide financière relève du domaine des droits.',
    ],
    sol: [{ text: 'Le travail social traite l’accès aux droits.', why: 'C’est sa mission propre.' }],
    sec: 40,
  }),
  mini({
    id: 'F11-confidentialite',
    skill: 'F11',
    structure: 'respecter-la-confidentialite',
    q: 'Dans quel cas la confidentialité est-elle rompue ?',
    choices: [
      { label: 'Évoquer la situation d’une personne dans l’ascenseur avec une collègue', ok: true },
      { label: 'Transmettre une observation à l’infirmière du service', why: 'Le partage nécessaire à la prise en charge est prévu : ce n’est pas une rupture de confidentialité.' },
      { label: 'Noter une observation dans le dossier de soins', why: 'La traçabilité dans le dossier fait partie du travail.' },
    ],
    h: ['Regardez le lieu et la finalité de l’échange.', 'Un lieu de passage n’est jamais un lieu de transmission.'],
    alt: [
      'Demandez-vous qui peut entendre.',
      'Dans un ascenseur ou un couloir, la réponse est : n’importe qui.',
    ],
    sol: [{ text: 'Le lieu compte autant que le contenu.', why: 'Beaucoup de ruptures de confidentialité sont involontaires et purement matérielles.' }],
    sec: 40,
  }),
  mini({
    id: 'F11-reponse-situation',
    skill: 'F11',
    level: 'epreuve',
    structure: 'repondre-a-une-situation-professionnelle',
    transfer: true,
    text:
      'Situation : une personne accompagnée vous dit qu’elle se sent seule et qu’elle n’a plus de visites depuis plusieurs semaines.',
    q: 'Quelle réponse est la plus adaptée ?',
    choices: [
      {
        label:
          'J’écoute ce qu’elle me dit, je note ce qu’elle exprime, je lui demande si elle souhaite en parler à quelqu’un, et je transmets à l’équipe.',
        ok: true,
      },
      { label: 'Je lui dis que tout le monde connaît des périodes difficiles.', why: 'Cette réponse minimise et ferme l’échange : la personne n’a plus de raison d’en reparler.' },
      { label: 'J’appelle sa famille pour lui demander de venir.', why: 'Cette démarche sort du rôle, ne respecte pas le choix de la personne et peut la mettre en difficulté.' },
    ],
    h: ['Restez dans le rôle : écouter, recueillir, transmettre.', 'Vérifiez qu’aucune décision n’est prise à la place de la personne.'],
    alt: [
      'Découpez la réponse en gestes : écouter, noter, proposer, transmettre.',
      'Chacun de ces gestes relève pleinement du rôle ; téléphoner à la famille n’en fait pas partie.',
    ],
    sol: [
      { text: 'Écouter et recueillir.', why: 'C’est ce qui permet à l’équipe d’agir.' },
      { text: 'Transmettre sans décider.', why: 'La suite appartient à la personne et à l’équipe.' },
    ],
    sec: 50,
  }),

  // ------------------------------------------------------------------ F12
  mini({
    id: 'F12-lecture-consigne',
    skill: 'F12',
    structure: 'reserver-un-temps-de-lecture',
    q: 'Pourquoi consacrer cinq minutes à la lecture sur une épreuve de trente minutes ?',
    choices: [
      { label: 'Parce qu’un hors-sujet coûte plus cher que cinq minutes de rédaction en moins', ok: true },
      { label: 'Parce que le texte est long', why: 'La longueur du texte varie ; la raison de réserver ce temps ne dépend pas d’elle.' },
      { label: 'Parce que c’est la règle', why: 'Aucune règle n’impose cette répartition : c’est un choix d’efficacité.' },
    ],
    h: ['Comparez ce que coûte une erreur de compréhension et ce que coûtent cinq minutes.', 'Une copie hors sujet ne rapporte presque rien, même bien écrite.'],
    alt: [
      'Calculez : cinq minutes représentent environ un sixième du temps.',
      'Un hors-sujet fait perdre beaucoup plus qu’un sixième des points.',
    ],
    sol: [{ text: 'La lecture protège contre le hors-sujet.', why: 'C’est l’erreur la plus coûteuse.' }],
    sec: 35,
  }),
  mini({
    id: 'F12-jalons',
    skill: 'F12',
    structure: 'poser-des-jalons-horaires',
    q: 'À quoi sert d’écrire des heures repères sur son brouillon ?',
    choices: [
      { label: 'À repérer un retard au moment où il se produit, et non à la fin', ok: true },
      { label: 'À écrire plus vite', why: 'Les jalons ne changent pas la vitesse d’écriture : ils signalent un écart.' },
      { label: 'À impressionner le correcteur', why: 'Le brouillon n’est pas relevé.' },
    ],
    h: ['Demandez-vous quand on découvre un retard sans jalon.', 'Le plus souvent, à la fin, quand il est trop tard pour corriger.'],
    alt: [
      'Notez en haut du brouillon : « plan fini à… », « rédaction finie à… ».',
      'Un coup d’œil à l’horloge suffit alors à savoir si vous êtes dans les temps.',
    ],
    sol: [{ text: 'Un jalon dépassé alerte immédiatement.', why: 'Il reste du temps pour ajuster.' }],
    sec: 35,
  }),
  mini({
    id: 'F12-priorite-bareme',
    skill: 'F12',
    level: 'epreuve',
    structure: 'arbitrer-en-fin-d-epreuve',
    transfer: true,
    text:
      'Il reste six minutes. La question notée sur 6 est rédigée mais pourrait être améliorée ; la question notée sur 4 n’est pas commencée.',
    q: 'Que faire de ces six minutes ?',
    choices: [
      { label: 'Traiter la question sur 4, même brièvement', ok: true },
      { label: 'Améliorer la question sur 6', why: 'Les points d’une réponse déjà rédigée sont en grande partie acquis ; les 4 points de l’autre question sont entièrement perdus si rien n’est écrit.' },
      { label: 'Relire l’ensemble', why: 'Une relecture ne rapporte rien sur une question laissée blanche.' },
    ],
    h: ['Comparez ce qui est acquis et ce qui est perdu.', 'Une question blanche vaut zéro, quelle que soit la qualité du reste.'],
    alt: [
      'Estimez le gain de chaque option.',
      'Améliorer une réponse existante rapporte peu ; écrire quelques lignes justes sur une question non traitée rapporte beaucoup.',
    ],
    sol: [{ text: 'Les points les plus faciles sont dans la question non traitée.', why: 'Le correcteur ne peut valoriser que ce qui est écrit.' }],
    sec: 45,
  }),
]
