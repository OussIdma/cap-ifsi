/**
 * Entretien professionnel — leçons de méthode O01 à O12.
 *
 * Ces leçons expliquent comment construire une réponse. Elles ne fournissent
 * jamais de réponse toute faite : le contenu appartient à l'utilisatrice.
 */

import type { Lesson } from '../types'
import { key, lead, p, vis, warn } from '../blocks'

export const LESSONS_ORAL: Lesson[] = [
  {
    skillId: 'O01',
    review: 'relu-par-le-modele',
    explanation: [
      lead('Une présentation réussie n’est pas un CV lu à voix haute : c’est un chemin qui mène à votre projet.'),
      p(
        'Le jury entend beaucoup de présentations. Ce qui distingue les bonnes n’est ni la longueur du parcours ni le nombre de postes occupés, mais le fait qu’on comprenne, à la fin, pourquoi cette personne demande cette formation.',
      ),
      vis({
        type: 'table',
        headers: ['Temps', 'Ce qu’on dit', 'Durée indicative sur 2 minutes'],
        rows: [
          ['1. Qui je suis professionnellement', 'Fonction actuelle, lieu, depuis quand', '20 secondes'],
          ['2. Ce qui m’y a menée', 'Deux étapes marquantes, pas toute la chronologie', '40 secondes'],
          ['3. Ce que j’y ai construit', 'Une compétence ou une responsabilité concrète', '30 secondes'],
          ['4. Ce que je demande aujourd’hui', 'Le projet, relié à ce qui précède', '30 secondes'],
        ],
      }),
      key('La dernière phrase doit relier le parcours au projet. Si elle pourrait être dite par n’importe qui, elle est à réécrire.'),
      warn('Deux minutes, c’est environ 280 mots. Écrire son texte est utile pour mesurer ; le réciter ne l’est pas.'),
    ],
    alternative: [
      p('Autre entrée : partez de la fin.'),
      p(
        'Écrivez d’abord la phrase qui dit pourquoi vous demandez cette formation. Remontez ensuite : quelles étapes de votre parcours rendent cette phrase crédible ? Vous obtenez le contenu, et seulement le contenu utile.',
      ),
      p('Tout ce qui ne sert pas cette phrase finale peut être coupé, même si c’est vrai et même si c’est important pour vous.'),
    ],
    workedExamples: [
      {
        statement: 'Structurer une présentation de deux minutes, à partir d’un parcours d’aide-soignante.',
        steps: [
          { do: 'Écrire la phrase finale.', why: 'Elle fixe la direction et évite la présentation qui s’arrête sans conclure.' },
          { do: 'Choisir deux étapes du parcours, pas plus.', why: 'Deux étapes développées valent mieux que six énumérées.' },
          { do: 'Pour chaque étape, retenir un fait vérifiable.', why: 'Une durée, une responsabilité, un service : cela ancre le récit.' },
          { do: 'Chronométrer une fois à voix haute.', why: 'On découvre presque toujours qu’on dépasse, et l’on sait alors quoi couper.' },
        ],
        conclusion:
          'La présentation tient en quatre blocs. Vous les remplissez avec vos faits : l’application ne les invente pas à votre place.',
      },
    ],
    commonMistakes: [
      { mistake: 'Commencer par sa vie personnelle.', fix: 'Le jury demande une présentation professionnelle.', tag: 'consigne' },
      { mistake: 'Énumérer toute la chronologie.', fix: 'Deux étapes suffisent si elles sont expliquées.', tag: 'redaction' },
      { mistake: 'Dépasser largement le temps.', fix: 'Chronométrez-vous ; ce qui dépasse sera coupé par le jury.', tag: 'temps' },
    ],
  },
  {
    skillId: 'O02',
    review: 'relu-par-le-modele',
    explanation: [
      lead('« J’aime aider les gens » ne dit rien : c’est vrai de tout le monde dans ce métier, et cela ne distingue pas infirmière d’aide-soignante.'),
      p(
        'Une motivation solide repose sur trois éléments : une situation vécue qui a fait naître le besoin, une différence concrète entre les deux métiers, et une raison au moment choisi.',
      ),
      vis({
        type: 'table',
        headers: ['Question du jury', 'Ce qui fait une réponse faible', 'Ce qui fait une réponse solide'],
        rows: [
          ['Pourquoi infirmière ?', 'Une qualité personnelle affirmée', 'Une situation où vous avez buté sur une limite de rôle'],
          ['Pourquoi maintenant ?', '« C’est le bon moment »', 'Un changement identifiable : expérience acquise, appui de l’employeur, organisation possible'],
          ['Qu’attendez-vous de différent ?', '« Plus de responsabilités »', 'Une responsabilité nommée : évaluation, décision, suivi, coordination'],
        ],
      }),
      key('Une motivation se démontre par des faits, pas par des adjectifs.'),
      warn('Ne dévalorisez jamais le métier d’aide-soignante pour valoriser votre projet. Le jury y verrait une méconnaissance des deux métiers.'),
    ],
    alternative: [
      p('Test simple : la phrase du voisin.'),
      p(
        'Relisez votre réponse et demandez-vous si la personne assise à côté de vous pourrait dire exactement la même chose. Si oui, la réponse n’est pas encore la vôtre : il manque un fait qui n’appartient qu’à vous.',
      ),
    ],
    workedExamples: [
      {
        statement: 'Transformer une motivation générale en motivation démontrée.',
        steps: [
          { do: 'Repérer la formule générale dans votre réponse.', why: 'Elles se reconnaissent à ce qu’elles ne comportent aucun fait.' },
          { do: 'Chercher une situation où vous avez ressenti une limite de rôle.', why: 'C’est le matériau d’une motivation crédible.' },
          { do: 'Nommer précisément ce que vous auriez voulu pouvoir faire.', why: 'Cela montre que vous connaissez la différence entre les deux métiers.' },
          { do: 'Ajouter la raison du moment.', why: 'Le jury demande toujours « pourquoi maintenant ».' },
        ],
        conclusion:
          'La structure est : une situation, une limite ressentie, une différence nommée, une raison au moment choisi. Le contenu vient de votre expérience.',
      },
    ],
    commonMistakes: [
      { mistake: 'Parler de vocation sans aucun fait.', fix: 'Une situation vécue vaut mieux qu’une déclaration.', tag: 'raisonnement' },
      { mistake: 'Ne parler que du salaire ou du statut.', fix: 'Ce sont des conséquences, pas des motivations professionnelles.', tag: 'consigne' },
    ],
  },
  {
    skillId: 'O03',
    review: 'relu-par-le-modele',
    explanation: [
      lead('La différence entre les deux métiers ne se joue pas sur la liste des gestes, mais sur la responsabilité de décider.'),
      p(
        'L’infirmière évalue une situation, décide dans son champ propre, applique des prescriptions, surveille les effets, coordonne et encadre. L’aide-soignante réalise des soins, observe, transmet, et collabore. Les deux travaillent ensemble ; ce n’est pas une échelle de valeur.',
      ),
      vis({
        type: 'table',
        headers: ['Situation', 'Ce que fait l’aide-soignante', 'Ce que fait l’infirmière'],
        rows: [
          ['Une personne se plaint de douleur', 'Observe, recueille, transmet sans délai', 'Évalue, applique le protocole ou alerte, réévalue'],
          ['Un refus de soin', 'Cherche la raison, propose autrement, transmet', 'Évalue les conséquences, adapte le projet de soin'],
          ['Une plaie constatée', 'Signale précisément ce qu’elle voit', 'Évalue, réalise le soin, décide du suivi'],
        ],
        caption: 'Exemples de répartition, à confirmer selon l’organisation de chaque structure.',
      }),
      key('Savoir dire où s’arrête votre compétence actuelle est plus valorisé qu’une description exhaustive du métier visé.'),
    ],
    alternative: [
      p('Une autre façon de le dire : la question posée n’est pas la même.'),
      p(
        'L’aide-soignante répond surtout à « qu’est-ce que j’observe et à qui je le dis ? ». L’infirmière répond en plus à « qu’est-ce que j’en conclus et qu’est-ce que je décide ? ». Le second registre engage une responsabilité qui n’existe pas dans le premier.',
      ),
    ],
    workedExamples: [
      {
        statement: 'Répondre à « quelle différence voyez-vous entre les deux métiers ? »',
        steps: [
          { do: 'Refuser la liste de gestes.', why: 'Elle donne une image technique et pauvre des deux métiers.' },
          { do: 'Choisir une situation que vous connaissez bien.', why: 'Elle rend la différence concrète.' },
          { do: 'Décrire ce que vous faites, puis ce que fait l’infirmière ensuite.', why: 'La différence apparaît dans l’enchaînement.' },
          { do: 'Nommer le mot qui résume : évaluation, décision, responsabilité.', why: 'Le jury retient la notion, pas seulement l’anecdote.' },
        ],
        conclusion: 'Une situation concrète, puis le mot qui la résume : c’est la structure la plus efficace sur cette question.',
      },
    ],
    commonMistakes: [
      { mistake: 'Présenter l’aide-soignante comme une exécutante.', fix: 'Le rôle comporte observation, relation et transmission, qui engagent un jugement professionnel.', tag: 'raisonnement' },
      { mistake: 'Affirmer une règle réglementaire dont on n’est pas sûre.', fix: 'Dites ce que vous observez dans votre pratique, et signalez ce qui reste à vérifier.', tag: 'consigne' },
    ],
  },
  {
    skillId: 'O04',
    review: 'relu-par-le-modele',
    explanation: [
      lead('Un récit d’expérience se construit toujours de la même façon. Une fois la trame maîtrisée, n’importe quelle situation se raconte en deux minutes.'),
      vis({
        type: 'table',
        headers: ['Étape', 'Question à laquelle on répond', 'Piège'],
        rows: [
          ['Contexte', 'Où, quand, avec qui ?', 'Trop long : deux phrases suffisent'],
          ['Faits observés', 'Qu’ai-je vu, entendu, mesuré ?', 'Glisser vers l’interprétation'],
          ['Mon rôle exact', 'Qu’ai-je fait, moi ?', 'Dire « on » au lieu de « je »'],
          ['Actions', 'Qu’ai-je décidé et réalisé ?', 'Oublier l’ordre des décisions'],
          ['Coopération', 'À qui ai-je transmis, que j’ai demandé ?', 'Sauter la transmission'],
          ['Résultat', 'Que s’est-il passé ensuite ?', 'Ne raconter que les réussites'],
          ['Apprentissage', 'Que ferais-je autrement ?', 'Conclure sans rien avoir appris'],
        ],
      }),
      key('La règle absolue : aucun élément permettant d’identifier une personne. Pas de nom, pas de numéro de chambre, pas de détail reconnaissable.'),
      warn('Dire « on a fait » quand c’est vous qui avez agi vous dessert. Le jury évalue votre rôle, pas celui de l’équipe.'),
    ],
    alternative: [
      p('Autre méthode : racontez la situation à l’envers.'),
      p(
        'Commencez par ce que vous en avez appris, puis remontez : qu’est-ce qui vous l’a appris ? Qu’avez-vous fait ? Qu’aviez-vous observé ? Vous retrouvez la trame complète, et vous ne perdez jamais l’apprentissage en chemin — c’est pourtant l’élément que les candidates oublient le plus souvent.',
      ),
    ],
    workedExamples: [
      {
        statement: 'Préparer un récit à partir d’une situation vécue.',
        steps: [
          { do: 'Écrire chaque étape en une seule phrase, au brouillon.', why: 'Sept phrases suffisent à couvrir toute la trame.' },
          { do: 'Vérifier qu’aucun élément n’identifie une personne.', why: 'C’est une obligation professionnelle, et le jury y est attentif.' },
          { do: 'Relire en soulignant les « je ».', why: 'S’il n’y en a aucun, votre rôle n’apparaît pas.' },
          { do: 'Chronométrer.', why: 'Sept phrases développées tiennent en deux à trois minutes.' },
        ],
        conclusion:
          'La trame est un contenant. Ce que vous y mettez vient de votre expérience : ni cette application ni personne ne doit l’écrire à votre place.',
      },
    ],
    commonMistakes: [
      { mistake: 'Raconter sans conclure.', fix: 'Terminez toujours par ce que vous en retenez.', tag: 'raisonnement' },
      { mistake: 'Donner un détail identifiant.', fix: 'Anonymisez systématiquement, dès le brouillon.', tag: 'consigne' },
    ],
  },
  {
    skillId: 'O05',
    review: 'relu-par-le-modele',
    explanation: [
      lead('Sur les questions de relation, le jury cherche une chose : des faits décrits sans jugement, et une adaptation réelle.'),
      p(
        'Trois réflexes structurent une bonne réponse : décrire ce qui est observable avant d’interpréter, nommer l’adaptation concrète que vous avez tentée, et dire ce que vous avez transmis.',
      ),
      vis({
        type: 'table',
        headers: ['À éviter', 'À dire'],
        rows: [
          ['« Elle était désagréable »', '« Elle a refusé le soin et n’a pas souhaité échanger »'],
          ['« Il ne comprend rien »', '« L’explication donnée n’a pas été comprise ; je l’ai reformulée autrement »'],
          ['« J’ai insisté »', '« J’ai proposé de différer, puis expliqué à quoi servait le soin »'],
          ['« Sa famille s’en moque »', '« La famille n’a pas pu être présente cette semaine »'],
        ],
      }),
      key('Un refus est un droit. On cherche à comprendre, on propose autrement, on transmet. On ne force pas.'),
    ],
    alternative: [
      p('Test de la transmission écrite.'),
      p(
        'Avant de prononcer une phrase, demandez-vous si vous pourriez l’écrire telle quelle dans une transmission. Si la réponse est non, c’est qu’elle contient un jugement ou une interprétation non vérifiée. Ce test fonctionne à l’oral comme à l’écrit.',
      ),
    ],
    workedExamples: [
      {
        statement: 'Répondre à « une personne refuse un soin, que faites-vous ? »',
        steps: [
          { do: 'Rappeler d’abord que le refus est un droit.', why: 'Cela situe immédiatement votre posture.' },
          { do: 'Décrire la recherche de la raison.', why: 'Douleur, pudeur, fatigue, moment mal choisi : ce sont des causes fréquentes et traitables.' },
          { do: 'Décrire l’adaptation proposée.', why: 'Différer, changer de modalité, expliquer.' },
          { do: 'Terminer par la transmission.', why: 'C’est ce qui manque le plus souvent dans les réponses.' },
        ],
        conclusion: 'Droit, recherche de la cause, adaptation, transmission : quatre temps, une minute.',
      },
    ],
    commonMistakes: [
      { mistake: 'Qualifier la personne plutôt que la situation.', fix: 'Décrivez ce que vous avez vu ou entendu.', tag: 'redaction' },
      { mistake: 'Oublier de dire à qui vous transmettez.', fix: 'La transmission fait partie de la réponse attendue.', tag: 'consigne' },
    ],
  },
  {
    skillId: 'O06',
    review: 'relu-par-le-modele',
    explanation: [
      lead('Sur le travail en équipe, trois questions reviennent : comment vous transmettez, comment vous gérez un désaccord, comment vous réagissez à une erreur.'),
      p(
        'Une bonne réponse sur la transmission mentionne toujours la trace écrite et des faits datés. Une bonne réponse sur le désaccord précise où et quand il s’exprime : jamais devant la personne accompagnée. Une bonne réponse sur l’erreur donne la priorité à la personne concernée avant toute question de responsabilité.',
      ),
      vis({
        type: 'calc-steps',
        steps: [
          { calc: 'Erreur constatée → sécuriser la personne', why: 'C’est toujours la première action.' },
          { calc: '→ signaler sans délai', why: 'Même si l’erreur n’a pas eu de conséquence.' },
          { calc: '→ analyser les causes d’organisation', why: 'Chercher un coupable ne supprime pas la cause.' },
        ],
      }),
      key('Dire « je me suis trompée » est une compétence professionnelle. C’est ce qui permet de rattraper et d’éviter la répétition.'),
      warn('Se taire pour éviter un conflit est le seul comportement réellement disqualifiant sur ces questions.'),
    ],
    alternative: [
      p('Autre angle : posez-vous la question du destinataire.'),
      p(
        'Pour chaque information, demandez-vous qui en a besoin, quand, et sous quelle forme. Cette question unique règle la plupart des situations de transmission, de désaccord et de signalement.',
      ),
    ],
    workedExamples: [
      {
        statement: 'Répondre à « vous constatez une erreur, que faites-vous ? »',
        steps: [
          { do: 'Commencer par la personne concernée.', why: 'Sécuriser passe avant tout le reste.' },
          { do: 'Signaler immédiatement.', why: 'Le délai de signalement est ce qui limite les conséquences.' },
          { do: 'Ne pas chercher de coupable dans la réponse.', why: 'Le jury repère cette orientation et la valorise.' },
          { do: 'Évoquer l’analyse des causes.', why: 'Cela montre que vous comprenez la démarche de sécurité.' },
        ],
        conclusion: 'Personne, signalement, analyse : cet ordre est ce qui distingue une réponse mature.',
      },
    ],
    commonMistakes: [
      { mistake: 'Présenter l’erreur comme impossible chez soi.', fix: 'Personne n’est à l’abri ; c’est la réaction qui compte.', tag: 'raisonnement' },
      { mistake: 'Exprimer un désaccord devant la personne accompagnée.', fix: 'Le désaccord se règle entre professionnels.', tag: 'consigne' },
    ],
  },
  {
    skillId: 'O07',
    review: 'relu-par-le-modele',
    explanation: [
      lead('Le jury ne cherche pas une candidate sans point faible : il cherche une candidate qui sait où elle en est et ce qu’elle fait pour progresser.'),
      p(
        'Une réponse solide comporte trois éléments : une difficulté nommée précisément, une action déjà engagée, et un moyen de savoir si vous progressez.',
      ),
      vis({
        type: 'table',
        headers: ['Réponse faible', 'Réponse solide'],
        rows: [
          ['« Je n’ai pas de point faible »', '« Les calculs de proportionnalité me demandaient du temps »'],
          ['« Je vais travailler davantage »', '« Je fais vingt minutes d’exercices cinq jours par semaine depuis deux mois »'],
          ['« Je pense que ça va mieux »', '« Je réussis maintenant seule les exercices que je ratais en janvier »'],
        ],
      }),
      key('Savoir demander de l’aide est une compétence attendue, pas un aveu de faiblesse. Une candidate qui dit ne jamais demander inquiète davantage.'),
    ],
    alternative: [
      p('Autre entrée : partez de ce que vous avez déjà fait.'),
      p(
        'Listez les actions concrètes engagées depuis trois mois : exercices réguliers, lectures, échanges avec des collègues, préparation. La difficulté se déduit des actions, et la réponse devient factuelle sans effort.',
      ),
    ],
    workedExamples: [
      {
        statement: 'Construire une réponse sur un point faible.',
        steps: [
          { do: 'Choisir une difficulté réelle et professionnelle.', why: 'Une fausse difficulté se repère immédiatement.' },
          { do: 'Décrire l’action engagée, avec sa régularité.', why: 'La régularité est plus convaincante que l’intensité.' },
          { do: 'Donner un indice de progrès observable.', why: 'Cela prouve que vous suivez réellement votre progression.' },
        ],
        conclusion: 'Difficulté, action, preuve de progrès : trois phrases suffisent.',
      },
    ],
    commonMistakes: [
      { mistake: 'Citer une fausse difficulté.', fix: 'Le jury attend une difficulté réelle, avec un plan.', tag: 'raisonnement' },
      { mistake: 'Dire qu’on se débrouille toujours seule.', fix: 'En formation et en stage, demander de l’aide est attendu.', tag: 'consigne' },
    ],
  },
  {
    skillId: 'O08',
    review: 'relu-par-le-modele',
    explanation: [
      lead('Sur le réalisme du projet, une seule confusion peut coûter cher : présenter un soutien comme un financement.'),
      p(
        'Le jury distingue nettement quatre états : un soutien exprimé oralement, une demande de financement déposée, un accord écrit de financement, et une rémunération précisée. Les confondre donne l’impression que le projet n’a pas été préparé.',
      ),
      vis({
        type: 'table',
        headers: ['État', 'Ce que cela signifie', 'Ce que cela ne signifie pas'],
        rows: [
          ['Soutien de l’employeur', 'Votre candidature est vue favorablement', 'Que la formation sera payée'],
          ['Demande déposée', 'Un dossier a été transmis', 'Qu’il sera accepté'],
          ['Accord écrit', 'Le financement est acquis', 'Que la rémunération est maintenue'],
          ['Rémunération précisée', 'Vous savez ce que vous percevrez', '—'],
        ],
      }),
      key('Dire « c’est soutenu mais pas encore confirmé par écrit » est une bonne réponse. Dire « c’est financé » sans document ne l’est pas.'),
      warn('Anticipez aussi les stages : ils peuvent être éloignés et à horaires décalés. Un projet qui n’envisage que le lieu de formation paraît incomplet.'),
    ],
    alternative: [
      p('Autre méthode : le tableau des quatre colonnes.'),
      p(
        'Faites la liste de vos contraintes — transport, horaires, garde, budget — et, pour chacune, notez la solution envisagée et son état : réglée, en cours, à confirmer. Vous saurez alors répondre précisément à n’importe quelle question d’organisation.',
      ),
    ],
    workedExamples: [
      {
        statement: 'Répondre à « comment votre formation sera-t-elle financée ? »',
        steps: [
          { do: 'Dire l’état exact du dossier.', why: 'La précision vaut mieux qu’une réponse rassurante mais vague.' },
          { do: 'Distinguer frais pédagogiques, rémunération et frais annexes.', why: 'Ce sont trois questions différentes, souvent traitées séparément.' },
          { do: 'Indiquer ce qui reste à confirmer et à quelle échéance.', why: 'Cela montre que le suivi est en cours.' },
          { do: 'Mentionner une solution de repli si elle existe.', why: 'Le jury vérifie la solidité du projet, pas seulement son financement.' },
        ],
        conclusion: 'Un projet dont les incertitudes sont nommées paraît plus solide qu’un projet présenté comme entièrement réglé.',
      },
    ],
    commonMistakes: [
      { mistake: 'Confondre soutien et financement.', fix: 'Nommez l’état exact du dossier.', tag: 'raisonnement' },
      { mistake: 'Ne pas envisager les stages.', fix: 'Anticipez transport et horaires décalés.', tag: 'consigne' },
    ],
  },
  {
    skillId: 'O09',
    review: 'relu-par-le-modele',
    explanation: [
      lead('Le jury ne vérifie pas que vous connaissez le programme par cœur : il vérifie que vous savez où vous mettez les pieds.'),
      p(
        'Trois éléments suffisent : l’alternance entre cours et stages, la logique de validation par compétences, et la conscience de l’exigence de travail personnel. Le reste peut être reconnu comme non encore connu.',
      ),
      key(
        'Dire « je ne connais pas encore le détail, j’ai posé la question à l’institut » est une réponse professionnelle. Inventer un chiffre est la pire option.',
      ),
      warn(
        'Les calendriers et modalités varient selon les instituts et les années. Ne reprenez jamais une date entendue pour un autre institut ou une autre session.',
      ),
    ],
    alternative: [
      p('Autre approche : préparez vos sources.'),
      p(
        'Plutôt que de mémoriser des données, sachez dire où vous les avez cherchées et qui vous avez contacté. Une candidate qui cite une démarche vérifiable est plus crédible qu’une candidate qui récite un chiffre approximatif.',
      ),
    ],
    workedExamples: [
      {
        statement: 'Répondre à « que savez-vous de la formation ? »',
        steps: [
          { do: 'Commencer par l’alternance cours / stages.', why: 'C’est la caractéristique structurante de la formation.' },
          { do: 'Évoquer la validation par compétences.', why: 'Cela montre que vous avez compris la logique du référentiel.' },
          { do: 'Dire ce que vous avez vérifié et auprès de qui.', why: 'La démarche compte autant que le contenu.' },
          { do: 'Nommer ce que vous ignorez encore.', why: 'Cela protège des relances et montre votre honnêteté.' },
        ],
        conclusion: 'Deux éléments sûrs, une démarche de vérification, un aveu d’ignorance ciblé : la réponse est complète.',
      },
    ],
    commonMistakes: [
      { mistake: 'Citer des durées précises non vérifiées.', fix: 'Renvoyez à l’institut plutôt que d’affirmer.', tag: 'consigne' },
      { mistake: 'Prétendre tout connaître.', fix: 'Le jury sait que vous n’êtes pas encore entrée en formation.', tag: 'raisonnement' },
    ],
  },
  {
    skillId: 'O10',
    review: 'relu-par-le-modele',
    explanation: [
      lead('La prise de recul est ce qui distingue le plus nettement les candidatures. Elle se travaille.'),
      p(
        'Prendre du recul, ce n’est ni se dévaloriser ni se justifier. C’est décrire une situation, identifier le moment où quelque chose aurait pu se passer autrement, et dire ce que vous avez changé depuis.',
      ),
      vis({
        type: 'table',
        headers: ['Registre', 'Exemple de formulation', 'Effet sur le jury'],
        rows: [
          ['Autocritique stérile', '« J’ai mal fait, je n’étais pas à la hauteur »', 'Inquiète, sans rien apprendre'],
          ['Justification', '« Je n’avais pas le choix, on manquait de personnel »', 'Donne l’impression d’un refus d’analyse'],
          ['Prise de recul', '« Avec le recul, j’aurais transmis plus tôt ; depuis, je note systématiquement »', 'Montre une professionnelle qui progresse'],
        ],
      }),
      key('La contrainte du moment peut être mentionnée, à condition qu’elle n’occupe pas toute la réponse.'),
    ],
    alternative: [
      p('Autre méthode : cherchez le point de bascule.'),
      p(
        'Dans toute situation, il existe un instant précis où une autre décision était possible. Identifiez-le, puis dites ce qui vous a empêchée de le voir sur le moment. C’est exactement ce que le jury appelle « prendre du recul ».',
      ),
    ],
    workedExamples: [
      {
        statement: 'Répondre à « que feriez-vous autrement ? »',
        steps: [
          { do: 'Décrire brièvement la situation.', why: 'Trois phrases suffisent : la question porte sur l’analyse, pas sur le récit.' },
          { do: 'Identifier le point de bascule.', why: 'C’est le cœur de la réponse.' },
          { do: 'Dire ce qui vous a empêchée de le voir alors.', why: 'Cela évite l’autocritique gratuite.' },
          { do: 'Décrire le changement mis en place depuis.', why: 'Sans changement, il n’y a pas eu d’apprentissage.' },
        ],
        conclusion: 'Situation, bascule, obstacle du moment, changement : c’est la structure d’une réponse réflexive.',
      },
    ],
    commonMistakes: [
      { mistake: 'S’effondrer en racontant une erreur.', fix: 'L’erreur est un matériau d’analyse, pas une faute à expier.', tag: 'raisonnement' },
      { mistake: 'Tout attribuer aux conditions de travail.', fix: 'Mentionnez la contrainte, puis revenez à votre propre marge d’action.', tag: 'raisonnement' },
    ],
  },
  {
    skillId: 'O11',
    review: 'relu-par-le-modele',
    explanation: [
      lead('Une question inattendue ne se prépare pas dans son contenu. Elle se prépare dans sa méthode.'),
      p(
        'Trois secondes de silence valent mieux qu’une phrase lancée au hasard. Ensuite, une structure simple suffit : de quoi s’agit-il, qui est concerné, quel est l’enjeu, et ce que j’en pense.',
      ),
      vis({
        type: 'calc-steps',
        steps: [
          { calc: '1. Reformuler la question', why: 'Gagne trois secondes et vérifie que vous avez compris.' },
          { calc: '2. Dire de quoi il s’agit', why: 'Situe le sujet, même si vous ne le maîtrisez pas.' },
          { calc: '3. Nommer qui est concerné', why: 'Il y a toujours des personnes derrière un sujet de santé.' },
          { calc: '4. Donner une position nuancée', why: 'Une position assumée vaut mieux qu’un propos flou.' },
        ],
      }),
      key('« Je ne sais pas » suivi de « voici comment je vérifierais » est une bonne réponse. « Je ne sais pas » tout seul n’en est pas une.'),
      warn('N’inventez jamais un chiffre. Une donnée fausse décrédibilise tout le reste de l’entretien.'),
    ],
    alternative: [
      p('Autre méthode : l’ancrage sur ce que vous connaissez.'),
      p(
        'Même sur un sujet inconnu, vous connaissez des mécanismes : accès aux soins, prévention, coordination, inégalités, respect des droits. Rattachez la question à l’un d’eux et vous aurez toujours quelque chose de juste à dire.',
      ),
    ],
    workedExamples: [
      {
        statement: 'Répondre à une question dont on ignore le contenu.',
        steps: [
          { do: 'Reformuler la question posée.', why: 'Vous gagnez du temps et vous évitez le hors-sujet.' },
          { do: 'Annoncer honnêtement ce que vous ne savez pas.', why: 'Cela désamorce la relance sur ce point.' },
          { do: 'Rattacher le sujet à un mécanisme que vous maîtrisez.', why: 'Vous produisez alors un contenu juste et pertinent.' },
          { do: 'Dire comment vous vérifieriez.', why: 'C’est une compétence professionnelle en soi.' },
        ],
        conclusion: 'On ne vous demande pas de tout savoir. On vous demande de raisonner sans inventer.',
      },
    ],
    commonMistakes: [
      { mistake: 'Inventer une donnée chiffrée.', fix: 'Parlez de mécanismes plutôt que de chiffres.', tag: 'consigne' },
      { mistake: 'Rester silencieuse sans rien proposer.', fix: 'Reformulez, puis rattachez à ce que vous connaissez.', tag: 'raisonnement' },
    ],
  },
  {
    skillId: 'O12',
    review: 'relu-par-le-modele',
    explanation: [
      lead('Une simulation complète ne teste pas vos réponses une à une : elle teste leur cohérence.'),
      p(
        'Le jury écoute vingt minutes. Il repère immédiatement une contradiction entre la motivation annoncée au début et une réponse donnée à la quinzième minute. La cohérence se prépare en amont, pas pendant l’entretien.',
      ),
      vis({
        type: 'table',
        headers: ['Moment', 'Durée indicative', 'Ce qui est évalué'],
        rows: [
          ['Présentation', '5 minutes environ', 'Structure, clarté, lien avec le projet'],
          ['Relances sur le parcours', '5 minutes environ', 'Précision des faits, rôle personnel'],
          ['Relances sur le projet', '5 minutes environ', 'Réalisme, connaissance du métier'],
          ['Questions ouvertes', '5 minutes environ', 'Posture, recul, capacité à ne pas savoir'],
        ],
        caption:
          'Répartition indicative pour l’entraînement. L’article 12 fixe une durée totale de 20 minutes mais ne partage pas nationalement présentation et échange.',
      }),
      key('Préparez trois messages que vous voulez absolument avoir transmis à la fin. S’ils ne sont pas passés, placez-les dans la dernière réponse.'),
      warn('Un texte appris par cœur s’entend et se casse à la première relance. Préparez des blocs, pas un discours.'),
    ],
    alternative: [
      p('Autre entrée : entraînez-vous aux transitions plutôt qu’aux réponses.'),
      p(
        'Le plus difficile en simulation n’est pas de répondre, mais de passer d’une question à l’autre sans perdre le fil. Entraînez-vous à finir chaque réponse par une phrase nette, puis à vous taire. Le silence appartient au jury.',
      ),
    ],
    workedExamples: [
      {
        statement: 'Préparer une simulation de vingt minutes.',
        steps: [
          { do: 'Écrire les trois messages à faire passer.', why: 'Ils donnent une colonne vertébrale à l’entretien.' },
          { do: 'Préparer six blocs de contenu, pas un discours.', why: 'Un bloc se replace ; un discours se récite ou s’effondre.' },
          { do: 'Faire une simulation complète, chronométrée.', why: 'La fatigue de la vingtième minute ne se simule pas en cinq minutes.' },
          { do: 'Réécouter ou relire, et noter une seule chose à améliorer.', why: 'Corriger un point à la fois produit plus de progrès que tout reprendre.' },
        ],
        conclusion: 'Trois messages, six blocs, une simulation complète, un point d’amélioration : c’est un cycle de préparation efficace.',
      },
    ],
    commonMistakes: [
      { mistake: 'Réciter un texte.', fix: 'Préparez des blocs réutilisables dans plusieurs réponses.', tag: 'redaction' },
      { mistake: 'Se contredire entre deux réponses.', fix: 'Vérifiez la cohérence de vos blocs avant la simulation.', tag: 'raisonnement' },
      { mistake: 'Combler les silences.', fix: 'Terminez votre réponse et laissez le jury reprendre la main.', tag: 'temps' },
    ],
  },
]
