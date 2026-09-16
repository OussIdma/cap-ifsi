/**
 * Français — leçons F01 à F12.
 *
 * Chaque leçon suit la même structure : à quoi cela sert, explication simple,
 * exemple entièrement résolu avec le pourquoi de chaque étape, autre façon de
 * l'expliquer, erreurs fréquentes.
 */

import type { Lesson } from '../types'
import { key, lead, p, vis, vocab, warn } from '../blocks'

export const LESSONS_FRANCAIS: Lesson[] = [
  {
    skillId: 'F01',
    review: 'relu-par-le-modele',
    explanation: [
      lead('Le verbe de la consigne dit exactement quel travail on attend de vous.'),
      p(
        'Répondre à côté de la consigne coûte plus de points qu’une faute d’orthographe. Un correcteur qui demande d’expliquer et qui lit une simple citation ne peut rien valoriser, même si la citation est juste.',
      ),
      vis({
        type: 'table',
        headers: ['Verbe', 'Ce qu’on attend', 'Longueur habituelle'],
        rows: [
          ['Citer / relever', 'Reprendre les mots du texte, sans commentaire', 'Quelques mots'],
          ['Définir', 'Donner le sens du terme, en une phrase claire', '1 à 2 phrases'],
          ['Expliquer', 'Dire pourquoi, comment, avec un exemple', 'Un paragraphe'],
          ['Résumer', 'Garder l’essentiel, sans votre avis', 'Longueur imposée'],
          ['Comparer', 'Dire les points communs ET les différences', 'Un paragraphe'],
          ['Analyser', 'Relier causes, conséquences, acteurs', 'Un ou deux paragraphes'],
          ['Argumenter', 'Défendre une position avec explications et exemples', 'Un ou deux paragraphes'],
          ['Proposer', 'Formuler une action concrète et réaliste', 'Quelques phrases'],
        ],
      }),
      key('Avant d’écrire, soulignez trois choses dans la consigne : le verbe, le nombre de réponses attendues, la longueur demandée.'),
      warn(
        'Une consigne qui demande « deux difficultés » attend deux difficultés distinctes. En donner une seule, très développée, ne rapporte que la moitié des points.',
      ),
    ],
    alternative: [
      p('Traduisez la consigne en question que vous poseriez à voix haute.'),
      p(
        '« Expliquez pourquoi les proches aidants s’épuisent » devient : « Qu’est-ce qui, concrètement, fatigue les proches aidants ? » Vous savez alors quoi écrire.',
      ),
      p('Si vous ne savez pas transformer la consigne en question simple, c’est que vous ne l’avez pas encore comprise. Relisez-la mot à mot.'),
    ],
    workedExamples: [
      {
        statement:
          'Consigne : « Après avoir relevé deux obstacles à l’accès aux soins évoqués dans le texte, expliquez en quoi ils s’aggravent mutuellement. »',
        steps: [
          { do: 'Repérer les deux verbes : relever, puis expliquer.', why: 'Il y a deux travaux différents, donc deux temps dans la réponse.' },
          { do: 'Compter : deux obstacles, pas un ni trois.', why: 'Le nombre fait partie de la consigne.' },
          { do: 'Noter que le second travail porte sur un lien.', why: '« S’aggravent mutuellement » demande de montrer comment l’un renforce l’autre, pas de les décrire séparément.' },
          { do: 'Construire le plan : deux obstacles relevés, puis un paragraphe sur leur interaction.', why: 'Le plan découle directement de la consigne.' },
        ],
        conclusion:
          'La réponse comporte deux parties nettes. Relever seul, ou expliquer sans relever, laisserait la moitié de la consigne sans réponse.',
      },
    ],
    commonMistakes: [
      { mistake: 'Raconter le texte alors qu’on demande d’expliquer.', fix: 'Expliquer, c’est répondre à « pourquoi » ou « comment ».', tag: 'consigne' },
      { mistake: 'Donner son avis quand la consigne demande un résumé.', fix: 'Le résumé ne contient jamais votre opinion.', tag: 'consigne' },
    ],
  },
  {
    skillId: 'F02',
    review: 'relu-par-le-modele',
    explanation: [
      lead('Lire activement, c’est chercher quelque chose, pas parcourir des lignes.'),
      p(
        'Trois lectures valent mieux qu’une. La première donne le sujet général. La deuxième repère l’idée principale de chaque paragraphe. La troisième, guidée par la question, cherche les informations précises dont vous avez besoin.',
      ),
      vis({
        type: 'table',
        headers: ['Lecture', 'Durée', 'Ce qu’on cherche'],
        rows: [
          ['1re', '1 minute', 'De quoi parle le texte ? Qui parle ? Quand ?'],
          ['2e', '2 minutes', 'Une idée par paragraphe, notée en trois mots dans la marge'],
          ['3e', '2 minutes', 'Les phrases utiles à la question posée, soulignées'],
        ],
      }),
      key(
        'L’idée principale est rarement dans la première phrase. Elle est souvent dans la dernière phrase d’un paragraphe, ou reformulée à la fin du texte.',
      ),
      warn('Souligner la moitié du texte revient à ne rien souligner. Limitez-vous à trois ou quatre passages.'),
    ],
    alternative: [
      p('Posez au texte les questions d’un journaliste : qui, quoi, où, quand, pourquoi.'),
      p(
        'Si vous savez répondre à ces cinq questions après lecture, vous avez compris le texte. Si l’une reste vide, relisez en la cherchant précisément.',
      ),
    ],
    workedExamples: [
      {
        statement:
          'Texte : « Dans de nombreux territoires, le délai pour obtenir un rendez-vous s’allonge. Les personnes les plus éloignées des transports renoncent parfois à consulter. Des structures développent des consultations sans rendez-vous, mais leur capacité reste limitée. »',
        steps: [
          { do: 'Sujet général : l’accès aux soins.', why: 'C’est ce dont parlent toutes les phrases.' },
          { do: 'Idée du passage : l’allongement des délais entraîne des renoncements.', why: 'C’est le lien que fait la deuxième phrase.' },
          { do: 'Acteurs : les personnes éloignées des transports, les structures.', why: 'Ce sont eux qui agissent ou subissent.' },
          { do: 'Nuance à ne pas perdre : « parfois », « reste limitée ».', why: 'Ces mots empêchent de généraliser abusivement dans la réponse.' },
        ],
        conclusion:
          'Le texte décrit un problème (délais), une conséquence (renoncement) et une réponse partielle (consultations sans rendez-vous).',
      },
    ],
    commonMistakes: [
      { mistake: 'Retenir un exemple frappant au lieu de l’idée principale.', fix: 'L’exemple illustre l’idée : ce n’est pas l’idée.', tag: 'raisonnement' },
      { mistake: 'Ignorer les nuances (« parfois », « souvent », « certains »).', fix: 'Ces mots limitent la portée : recopiez-les dans votre réponse.', tag: 'consigne' },
    ],
  },
  {
    skillId: 'F03',
    review: 'relu-par-le-modele',
    explanation: [
      lead('Le sens d’un mot se devine dans sa phrase, avant d’être cherché ailleurs.'),
      p(
        'Trois indices suffisent le plus souvent : ce qui précède le mot, ce qui le suit, et la construction du mot lui-même (préfixe, racine, suffixe).',
      ),
      vocab([
        { term: 'Prévention', def: 'Ensemble des actions qui visent à éviter qu’un problème de santé survienne ou s’aggrave.' },
        { term: 'Autonomie', def: 'Capacité à décider pour soi-même et à organiser sa vie quotidienne.' },
        { term: 'Dépendance', def: 'Besoin de l’aide d’une autre personne pour les actes de la vie quotidienne.' },
        { term: 'Bientraitance', def: 'Démarche collective qui cherche en permanence à adapter la prise en soin au respect de la personne.' },
        { term: 'Précarité', def: 'Situation d’instabilité durable qui fragilise l’accès aux droits, au logement, aux soins.' },
        { term: 'Coordination', def: 'Organisation des interventions de plusieurs professionnels autour d’une même personne.' },
      ]),
      key(
        'Autonomie et indépendance ne sont pas synonymes. Une personne peut avoir besoin d’aide pour se lever (dépendance physique) tout en décidant pleinement de sa vie (autonomie).',
      ),
      warn('Employer un mot savant mal maîtrisé coûte plus cher qu’un mot simple bien employé.'),
    ],
    alternative: [
      p('Remplacez le mot inconnu par un blanc et relisez la phrase.'),
      p(
        '« Le dispositif vise à prévenir l’________ des aidants. » Le contexte impose une idée négative liée à la fatigue. « Épuisement » s’impose presque seul.',
      ),
      p('Cette méthode ne donne pas la définition exacte, mais elle donne le sens général, ce qui suffit à répondre.'),
    ],
    workedExamples: [
      {
        statement: 'Expliquer le mot « répit » dans : « Des séjours de répit sont proposés aux proches aidants. »',
        steps: [
          { do: 'Repérer à qui cela s’adresse : les proches aidants.', why: 'Le public éclaire la fonction du dispositif.' },
          { do: 'Chercher le besoin de ce public : ils accompagnent au quotidien, souvent sans pause.', why: 'Le mot doit répondre à ce besoin.' },
          { do: 'Formuler une définition dans le contexte.', why: 'On définit le mot tel qu’il est employé ici, pas dans l’absolu.' },
        ],
        conclusion:
          'Le répit désigne un temps de pause organisé pour permettre à l’aidant de souffler, pendant que la personne accompagnée est prise en charge autrement.',
      },
    ],
    commonMistakes: [
      { mistake: 'Donner un synonyme sans expliquer.', fix: 'Un synonyme seul ne prouve pas la compréhension : ajoutez une phrase de sens.', tag: 'redaction' },
      { mistake: 'Définir hors contexte.', fix: 'Le correcteur attend le sens du mot dans ce texte-là.', tag: 'consigne' },
    ],
  },
  {
    skillId: 'F04',
    review: 'relu-par-le-modele',
    explanation: [
      lead('Reformuler, c’est dire la même chose autrement, sans rien ajouter ni retirer.'),
      p(
        'Trois leviers : changer les mots (synonymes), changer la construction (voix active ou passive, nominalisation), changer l’ordre des informations. On combine les trois, sinon la reformulation reste du recopiage déguisé.',
      ),
      vis({
        type: 'table',
        headers: ['Phrase d’origine', 'Reformulation', 'Ce qui a changé'],
        rows: [
          [
            'Les délais d’attente s’allongent, ce qui décourage certaines personnes.',
            'Parce qu’il faut attendre de plus en plus longtemps, une partie des personnes renonce.',
            'Ordre inversé, mots remplacés, lien de cause explicite',
          ],
        ],
      }),
      key('Une bonne reformulation garde les nuances. Si le texte dit « certaines personnes », votre reformulation ne dit pas « tout le monde ».'),
      warn('Reformuler n’est pas interpréter. Ajouter « ce qui est scandaleux » change la nature du texte : c’est votre avis, pas le sien.'),
    ],
    alternative: [
      p('Cachez le texte et redites-le à voix haute, comme à une collègue.'),
      p(
        'Ce que vous dites spontanément est presque toujours une reformulation correcte : vous employez vos mots, vous gardez le sens. Écrivez ensuite ce que vous venez de dire.',
      ),
      p('Relisez enfin en comparant au texte : avez-vous ajouté ou perdu quelque chose ?'),
    ],
    workedExamples: [
      {
        statement:
          'Reformuler : « Le recours au numérique facilite certaines démarches, mais il exclut les personnes qui n’ont ni équipement ni accompagnement. »',
        steps: [
          { do: 'Identifier les deux mouvements : un avantage, puis une limite.', why: 'Le « mais » signale une opposition qu’il faut conserver.' },
          { do: 'Remplacer les termes : recours au numérique → les démarches en ligne ; exclut → laisse de côté.', why: 'Changer les mots sans changer le sens.' },
          { do: 'Conserver la condition exacte : ni équipement, ni accompagnement.', why: 'Ce sont deux conditions cumulées, pas une seule.' },
        ],
        conclusion:
          'Les démarches en ligne simplifient certaines procédures, mais elles laissent de côté les personnes qui n’ont pas de matériel et que personne n’aide.',
      },
    ],
    commonMistakes: [
      { mistake: 'Garder la structure de phrase et ne changer que quelques mots.', fix: 'Changez aussi l’ordre et la construction.', tag: 'redaction' },
      { mistake: 'Supprimer une nuance pour faire plus court.', fix: 'Une nuance perdue est un sens modifié.', tag: 'consigne' },
    ],
  },
  {
    skillId: 'F05',
    review: 'relu-par-le-modele',
    explanation: [
      lead('Résumer, c’est choisir. Tout garder n’est pas résumer.'),
      p(
        'On conserve l’idée directrice, les deux ou trois idées qui la soutiennent, et les nuances importantes. On supprime les exemples, les répétitions, les détails chiffrés secondaires.',
      ),
      vis({
        type: 'table',
        headers: ['On garde', 'On supprime'],
        rows: [
          ['L’idée principale', 'Les exemples qui illustrent'],
          ['Les idées qui la structurent', 'Les répétitions et reprises'],
          ['Les nuances (« souvent », « en partie »)', 'Les précisions secondaires'],
          ['Les liens logiques (cause, opposition)', 'Les formules de style'],
        ],
      }),
      key('Un résumé respecte la longueur demandée. Dépasser de moitié est sanctionné, même si le contenu est juste.'),
      warn('Le résumé ne contient ni « je pense que », ni jugement. Il restitue, il ne commente pas.'),
    ],
    alternative: [
      p('Procédez en deux temps : d’abord trop long, ensuite coupez.'),
      p(
        'Écrivez librement ce que dit le texte, sans compter. Puis barrez tout ce qui n’est pas indispensable, en vous demandant à chaque phrase : « si je l’enlève, le sens change-t-il ? » Si la réponse est non, elle part.',
      ),
    ],
    workedExamples: [
      {
        statement:
          'Résumer en une phrase : « Les consultations sans rendez-vous se développent. Elles évitent des passages aux urgences. Cependant, leur nombre de places est limité et elles ne remplacent pas un suivi régulier. »',
        steps: [
          { do: 'Repérer l’idée directrice : un dispositif utile mais limité.', why: 'C’est ce que dit l’ensemble, pas une phrase isolée.' },
          { do: 'Conserver le « cependant ».', why: 'L’opposition est le cœur du passage : la supprimer changerait le sens.' },
          { do: 'Supprimer le détail des urgences.', why: 'C’est un exemple d’utilité, pas une idée nouvelle.' },
        ],
        conclusion:
          'Les consultations sans rendez-vous rendent service, mais leur capacité limitée les empêche de remplacer un suivi régulier.',
      },
    ],
    commonMistakes: [
      { mistake: 'Recopier la première et la dernière phrase.', fix: 'L’idée principale est souvent ailleurs, et doit être reformulée.', tag: 'redaction' },
      { mistake: 'Ajouter son avis en conclusion.', fix: 'Le résumé s’arrête au texte.', tag: 'consigne' },
    ],
  },
  {
    skillId: 'F06',
    review: 'relu-par-le-modele',
    explanation: [
      lead('Analyser, c’est montrer ce qui produit quoi, et pour qui.'),
      p(
        'Une description dit ce qui se passe. Une analyse dit pourquoi cela se passe et ce que cela entraîne. C’est la différence qui sépare une copie moyenne d’une bonne copie.',
      ),
      vis({
        type: 'table',
        headers: ['Colonne', 'Question à se poser'],
        rows: [
          ['Constat', 'Que se passe-t-il, concrètement ?'],
          ['Causes', 'Qu’est-ce qui explique cette situation ?'],
          ['Conséquences', 'Qu’est-ce que cela produit, et pour qui ?'],
          ['Acteurs', 'Qui est concerné ? Qui peut agir ?'],
          ['Obstacles', 'Qu’est-ce qui empêche d’agir ?'],
        ],
        caption: 'Ce tableau se remplit au brouillon en trois minutes, puis se transforme en paragraphe.',
      }),
      key('Une cause n’est pas une conséquence. L’isolement peut causer un renoncement aux soins, et un état de santé dégradé peut causer l’isolement : dites lequel des deux vous décrivez.'),
      warn('Attention aux liens trop rapides. « Les personnes âgées sont isolées » n’explique rien tant qu’on n’a pas dit pourquoi, ni pour quelles personnes.'),
    ],
    alternative: [
      p('Utilisez la question « et alors ? » trois fois de suite.'),
      p(
        '« Les délais s’allongent. » Et alors ? « Certaines personnes renoncent à consulter. » Et alors ? « Des problèmes sont repérés plus tard. » Et alors ? « La prise en charge devient plus lourde. » Vous venez de construire une chaîne de conséquences.',
      ),
    ],
    workedExamples: [
      {
        statement: 'Analyser en deux phrases : l’épuisement des proches aidants.',
        steps: [
          { do: 'Constat : beaucoup d’aidants accompagnent seuls, sur de longues périodes.', why: 'On part du fait, pas de l’émotion.' },
          { do: 'Causes : absence de relais, méconnaissance des aides, sentiment de devoir tout assumer.', why: 'Plusieurs causes valent mieux qu’une seule.' },
          { do: 'Conséquences : fatigue durable, isolement, parfois dégradation de leur propre santé.', why: 'On précise qui subit quoi.' },
          { do: 'Ouverture : d’où l’intérêt des solutions de répit et de l’information sur les droits.', why: 'L’analyse débouche sur une piste, sans devenir une opinion.' },
        ],
        conclusion:
          'Faute de relais et d’information sur les aides, des proches aidants assument seuls un accompagnement continu. Il en résulte une fatigue durable et un isolement qui peuvent finir par altérer leur propre santé.',
      },
    ],
    commonMistakes: [
      { mistake: 'Décrire longuement sans jamais expliquer.', fix: 'Ajoutez « parce que » et « ce qui entraîne » dans vos phrases.', tag: 'raisonnement' },
      { mistake: 'Confondre cause et conséquence.', fix: 'Demandez-vous ce qui vient d’abord dans le temps.', tag: 'raisonnement' },
    ],
  },
  {
    skillId: 'F07',
    review: 'relu-par-le-modele',
    explanation: [
      lead('Un argument complet tient en trois temps : l’idée, l’explication, l’exemple.'),
      p(
        'L’idée est la position défendue, en une phrase. L’explication dit pourquoi elle tient. L’exemple la rend concrète. Un argument sans explication est une affirmation ; un exemple sans idée est une anecdote.',
      ),
      vis({
        type: 'table',
        headers: ['Temps', 'Exemple de formulation'],
        rows: [
          ['Idée', 'L’information sur les aides existantes est un levier essentiel.'],
          ['Explication', 'Beaucoup de personnes n’y recourent pas faute de les connaître, et non par refus.'],
          ['Exemple', 'Un proche aidant peut ignorer qu’un accueil de jour existe à proximité.'],
          ['Nuance', 'L’information ne suffit pas seule : encore faut-il que les places existent.'],
        ],
      }),
      key('Ajouter une limite renforce l’argumentation au lieu de l’affaiblir : cela montre que vous mesurez la complexité.'),
      warn('Éviter les formules creuses : « c’est important », « il faut faire attention ». Elles ne prouvent rien et occupent des lignes.'),
    ],
    alternative: [
      p('Imaginez qu’une collègue vous réponde « ah bon, pourquoi ? » après chaque phrase.'),
      p(
        'Tant que vous pouvez répondre à cette question, continuez d’écrire. Quand vous n’avez plus rien à répondre, l’argument est terminé et il est complet.',
      ),
    ],
    workedExamples: [
      {
        statement: 'Argumenter : faut-il développer les solutions de répit pour les proches aidants ?',
        steps: [
          { do: 'Poser l’idée.', why: 'Le correcteur doit savoir dès la première phrase ce que vous défendez.' },
          { do: 'Expliquer le mécanisme.', why: 'Sans mécanisme, l’idée reste une opinion.' },
          { do: 'Donner un exemple concret et fictif.', why: 'L’exemple montre que vous savez de quoi vous parlez.' },
          { do: 'Poser une limite honnête.', why: 'Reconnaître une limite est un signe de maturité professionnelle.' },
        ],
        conclusion:
          'Développer les solutions de répit protège la santé des aidants, car une pause régulière limite l’épuisement et permet de tenir dans la durée. Un accueil de jour quelques heures par semaine suffit parfois à rendre l’accompagnement soutenable. Cela suppose toutefois des places disponibles et une information réellement diffusée, sans quoi le dispositif reste théorique.',
      },
    ],
    commonMistakes: [
      { mistake: 'Aligner des exemples sans idée directrice.', fix: 'Commencez toujours par la phrase qui dit ce que vous défendez.', tag: 'redaction' },
      { mistake: 'Affirmer sans expliquer.', fix: 'Chaque affirmation appelle un « parce que ».', tag: 'raisonnement' },
    ],
  },
  {
    skillId: 'F08',
    review: 'relu-par-le-modele',
    explanation: [
      lead('Un plan se construit en trois minutes et fait gagner dix minutes.'),
      p(
        'Pour une réponse en 20 lignes, deux parties suffisent. Pour une réponse plus longue, trois. Chaque partie porte une idée, annoncée par sa première phrase.',
      ),
      vis({
        type: 'table',
        headers: ['Type de question', 'Plan simple qui fonctionne'],
        rows: [
          ['Expliquer un phénomène', '1. Ce qui se passe — 2. Pourquoi — 3. Ce que cela produit'],
          ['Deux difficultés + une action', '1. Première difficulté — 2. Seconde difficulté — 3. Action proposée'],
          ['Donner son point de vue', '1. Argument principal — 2. Limite ou objection — 3. Position finale nuancée'],
          ['Comparer', '1. Points communs — 2. Différences — 3. Ce qu’on en retient'],
        ],
      }),
      key('Le plan se déduit de la consigne. Si la consigne demande deux difficultés et une action, le plan est déjà écrit.'),
      warn('Une conclusion qui répète l’introduction ne rapporte rien. Mieux vaut une dernière phrase qui répond franchement à la question.'),
    ],
    alternative: [
      p('Écrivez d’abord les trois phrases d’ouverture de vos paragraphes.'),
      p(
        'Si ces trois phrases, lues à la suite, répondent déjà à la question, votre plan est bon. Sinon, il manque une idée ou l’ordre est mauvais. Corrigez avant d’écrire le reste.',
      ),
    ],
    workedExamples: [
      {
        statement: 'Consigne : « Expliquez deux difficultés rencontrées par les proches aidants, puis proposez une action adaptée. »',
        steps: [
          { do: 'Compter les travaux demandés : deux difficultés, une action.', why: 'Le plan en découle directement.' },
          { do: 'Écrire la phrase d’ouverture de chaque partie.', why: 'Elle annonce l’idée et guide le correcteur.' },
          { do: 'Vérifier l’équilibre : deux paragraphes courts, un paragraphe de proposition.', why: 'Un plan déséquilibré signale une partie bâclée.' },
        ],
        conclusion:
          'Plan retenu : 1. La charge quotidienne continue. 2. L’isolement et la méconnaissance des aides. 3. Proposition : organiser une information systématique sur les dispositifs de répit.',
      },
    ],
    commonMistakes: [
      { mistake: 'Commencer à rédiger sans plan et se perdre.', fix: 'Trois minutes de plan évitent dix minutes de réécriture.', tag: 'temps' },
      { mistake: 'Faire trois parties quand la consigne en appelle deux.', fix: 'Le plan suit la consigne, pas une habitude scolaire.', tag: 'consigne' },
    ],
  },
  {
    skillId: 'F09',
    review: 'relu-par-le-modele',
    explanation: [
      lead('Quelques règles couvrent la grande majorité des fautes d’une copie.'),
      vis({
        type: 'table',
        headers: ['Confusion', 'Comment trancher', 'Exemple'],
        rows: [
          ['a / à', 'Remplacer par « avait » : si ça marche, c’est « a ».', 'Elle a compris. / Elle va à l’hôpital.'],
          ['ou / où', 'Remplacer par « ou bien ».', 'Le matin ou le soir. / Là où elle travaille.'],
          ['ces / ses', '« ces » = ceux-là ; « ses » = les siens.', 'Ces documents. / Ses documents à elle.'],
          ['c’est / s’est', '« c’est » = cela est ; « s’est » accompagne un verbe pronominal.', 'C’est utile. / Elle s’est levée.'],
          ['et / est', 'Remplacer par « était ».', 'Elle est prête et calme.'],
          ['leur / leurs', '« leur » devant un verbe ne prend jamais de s.', 'Je leur ai parlé. / Leurs dossiers.'],
        ],
      }),
      p(
        'Pour l’accord du participe passé, deux cas suffisent à l’écrit du concours : avec « être », le participe s’accorde avec le sujet ; avec « avoir », il ne s’accorde pas, sauf si le complément d’objet direct est placé avant.',
      ),
      key('Relisez une fois uniquement pour les accords sujet-verbe. Une relecture ciblée trouve plus de fautes qu’une relecture générale.'),
      warn('Le correcteur ne compte pas les fautes pour punir : il évalue si la copie reste lisible et professionnelle.'),
    ],
    alternative: [
      p('Relisez la copie à l’envers, phrase par phrase, en partant de la fin.'),
      p(
        'En perdant le fil du sens, vous voyez les mots pour eux-mêmes. Les accords manquants et les homophones sautent aux yeux beaucoup plus facilement.',
      ),
    ],
    workedExamples: [
      {
        statement: 'Corriger : « Les personne qu’elle a rencontré on souvent renoncé a consulter. »',
        steps: [
          { do: '« Les personne » → « Les personnes ».', why: 'Le déterminant « les » impose le pluriel au nom.' },
          { do: '« a rencontré » → « a rencontrées ».', why: 'Le complément d’objet direct « que » (mis pour « les personnes ») est placé avant le verbe : le participe s’accorde.' },
          { do: '« on » → « ont ».', why: 'On peut remplacer par « avaient » : c’est le verbe avoir, pas le pronom.' },
          { do: '« a consulter » → « à consulter ».', why: '« Avait consulter » est impossible : c’est la préposition « à ».' },
        ],
        conclusion: 'Phrase corrigée : « Les personnes qu’elle a rencontrées ont souvent renoncé à consulter. »',
      },
    ],
    commonMistakes: [
      { mistake: 'Oublier l’accord du sujet éloigné du verbe.', fix: 'Retrouvez le sujet en posant la question « qui est-ce qui ? ».', tag: 'redaction' },
      { mistake: 'Écrire « sa » pour « ça ».', fix: '« ça » se remplace par « cela ».', tag: 'redaction' },
    ],
  },
  {
    skillId: 'F10',
    review: 'relu-par-le-modele',
    explanation: [
      lead('Une phrase claire est courte, complète, et ne peut se comprendre que d’une seule façon.'),
      p(
        'Complète veut dire : un sujet, un verbe, et ce que le verbe demande. Courte veut dire : une idée par phrase. Au-delà de deux lignes, coupez.',
      ),
      vis({
        type: 'table',
        headers: ['Phrase maladroite', 'Phrase corrigée', 'Ce qui a changé'],
        rows: [
          [
            'Le fait que les personnes elles ont des difficultés pour venir c’est un problème.',
            'Les difficultés de déplacement empêchent certaines personnes de venir.',
            'Suppression du sujet répété, phrase directe',
          ],
          [
            'Elle a parlé à sa collègue de sa situation qui était compliquée.',
            'Elle a parlé de sa propre situation, qui était compliquée, à sa collègue.',
            'Levée de l’ambiguïté sur « sa »',
          ],
        ],
      }),
      key('La ponctuation sert la clarté : le point sépare deux idées, la virgule sépare des éléments de même nature, le deux-points annonce une explication ou une liste.'),
      warn('Les répétitions de « chose », « truc », « il y a » alourdissent la copie. Remplacez-les par le mot précis.'),
    ],
    alternative: [
      p('Lisez votre phrase à voix basse en respirant aux ponctuations.'),
      p('Si vous manquez d’air, la phrase est trop longue. Si vous devez la relire pour la comprendre, le correcteur devra le faire aussi.'),
    ],
    workedExamples: [
      {
        statement:
          'Réécrire : « Il y a beaucoup de personnes qui sont dans des situations où elles ne savent pas comment faire pour les démarches et du coup elles abandonnent. »',
        steps: [
          { do: 'Supprimer « il y a ».', why: 'Cette tournure retarde l’information utile.' },
          { do: 'Remplacer « du coup » par un lien logique écrit.', why: '« Du coup » appartient à l’oral.' },
          { do: 'Couper en deux phrases.', why: 'Il y a deux idées : la méconnaissance, puis l’abandon.' },
        ],
        conclusion:
          'De nombreuses personnes ignorent comment effectuer leurs démarches. Faute d’accompagnement, elles finissent par y renoncer.',
      },
    ],
    commonMistakes: [
      { mistake: 'Écrire comme on parle (« du coup », « genre », « voilà »).', fix: 'Remplacez par un connecteur écrit : ainsi, par conséquent, c’est pourquoi.', tag: 'redaction' },
      { mistake: 'Enchaîner les « qui » et les « que ».', fix: 'Coupez la phrase en deux.', tag: 'redaction' },
    ],
  },
  {
    skillId: 'F11',
    review: 'relu-par-le-modele',
    explanation: [
      lead('Répondre en professionnelle, c’est décrire des faits, rester dans son rôle, et ne jamais juger la personne.'),
      p(
        'Trois réflexes : je dis ce que j’observe avant ce que j’interprète ; je dis ce que je fais et ce que je transmets ; je dis à qui j’oriente quand la situation dépasse mon champ de compétence.',
      ),
      vis({
        type: 'table',
        headers: ['Formulation à éviter', 'Formulation professionnelle'],
        rows: [
          ['« Elle est désagréable. »', '« Elle refuse le soin proposé et ne souhaite pas échanger ce matin. »'],
          ['« Il ne veut rien comprendre. »', '« L’explication donnée ne semble pas avoir été comprise ; je la reformule autrement. »'],
          ['« Je lui ai dit que ce n’était pas grave. »', '« Je transmets la situation à l’infirmière, qui évaluera. »'],
          ['« Sa famille s’en moque. »', '« La famille n’a pas pu être présente cette semaine. »'],
        ],
      }),
      key('Un refus est un droit. On cherche à comprendre, on propose autrement, on transmet — on ne force pas et on ne juge pas.'),
      warn('Aucune donnée identifiante ne doit apparaître dans une copie : ni nom, ni adresse, ni élément permettant de reconnaître une personne.'),
    ],
    alternative: [
      p('Demandez-vous : « est-ce que je pourrais écrire cette phrase dans une transmission ? »'),
      p(
        'Une transmission ne contient que des faits observables et des actions. Si votre phrase ne pourrait pas y figurer, c’est qu’elle contient un jugement ou une interprétation non vérifiée.',
      ),
    ],
    workedExamples: [
      {
        statement: 'Réécrire en posture professionnelle : « La dame était pénible, elle a refusé la toilette, j’ai insisté et ça a fini par passer. »',
        steps: [
          { do: 'Retirer le jugement.', why: '« Pénible » qualifie la personne, pas la situation.' },
          { do: 'Décrire le fait observable.', why: 'Un refus est un fait, qui se note tel quel.' },
          { do: 'Remplacer « j’ai insisté » par ce qui a réellement été fait.', why: 'Insister n’est pas une action professionnelle : proposer autrement, différer, expliquer, oui.' },
          { do: 'Indiquer la transmission.', why: 'Toute situation de refus se transmet à l’équipe.' },
        ],
        conclusion:
          'La personne a refusé la toilette ce matin. Je lui ai proposé de la reporter en fin de matinée et j’ai expliqué à quoi elle servait. Elle a accepté un soin partiel. J’ai transmis le refus initial et la solution trouvée à l’équipe.',
      },
    ],
    commonMistakes: [
      { mistake: 'Qualifier la personne au lieu de décrire la situation.', fix: 'Décrivez ce que vous avez vu ou entendu.', tag: 'redaction' },
      { mistake: 'Se placer au-delà de son champ de compétence.', fix: 'Dites ce que vous observez et à qui vous transmettez.', tag: 'raisonnement' },
    ],
  },
  {
    skillId: 'F12',
    review: 'relu-par-le-modele',
    explanation: [
      lead('Trente minutes suffisent, à condition de les répartir avant de commencer.'),
      vis({
        type: 'table',
        headers: ['Temps', 'Ce qu’on fait'],
        rows: [
          ['0 → 5 min', 'Lire la consigne et le texte, souligner le verbe et le nombre de réponses attendues'],
          ['5 → 8 min', 'Écrire le plan : une ligne par paragraphe'],
          ['8 → 27 min', 'Rédiger, sans revenir en arrière'],
          ['27 → 30 min', 'Relire : accords, ponctuation, réponse effectivement donnée'],
        ],
        caption: 'Répartition indicative, à ajuster selon le nombre de questions et le barème affiché.',
      }),
      key('Une question qui vaut 2 points sur 10 ne mérite pas la moitié du temps. Répartissez selon le barème quand il est indiqué.'),
      warn('Ne jamais laisser une question sans réponse. Trois lignes valent mieux que rien, même si vous n’êtes pas sûre.'),
    ],
    alternative: [
      p('Travaillez avec une horloge visible et des jalons écrits sur le brouillon.'),
      p(
        'Notez en haut de votre brouillon les heures repères : « plan fini à … », « rédaction finie à … ». Un jalon dépassé vous alerte immédiatement, avant qu’il ne soit trop tard.',
      ),
    ],
    workedExamples: [
      {
        statement: 'Une épreuve de 30 minutes comporte deux questions, l’une sur 4 points, l’autre sur 6.',
        steps: [
          { do: 'Réserver 5 minutes de lecture et 3 de relecture.', why: 'Ces deux temps ne se négocient pas : ils protègent la copie.' },
          { do: 'Répartir les 22 minutes restantes selon le barème.', why: '4 et 6 points sur 10 donnent environ 9 et 13 minutes.' },
          { do: 'Poser les jalons.', why: 'Savoir à quelle minute on doit avoir fini la première question évite de découvrir le retard à la fin.' },
        ],
        conclusion:
          'Lecture jusqu’à 5 min, première question jusqu’à 14 min, seconde jusqu’à 27 min, relecture jusqu’à 30 min.',
      },
    ],
    commonMistakes: [
      { mistake: 'Soigner la première question et bâcler la seconde.', fix: 'Le barème dit où sont les points.', tag: 'temps' },
      { mistake: 'Supprimer la relecture faute de temps.', fix: 'Coupez plutôt trois lignes de rédaction : la relecture rapporte plus.', tag: 'temps' },
    ],
  },
]

