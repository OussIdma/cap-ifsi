/**
 * Sujets rédigés — deuxième série.
 *
 * Même exigence que la première : corrigé de référence présenté comme UNE
 * réponse recevable, autres réponses acceptables, comparaison entre une copie
 * faible et une copie solide. Tous les sujets sont originaux.
 */

import type { WrittenTask } from '../types'
import { task } from './sujets'

export const WRITTEN_TASKS_2: WrittenTask[] = [
  task({
    id: 'W13',
    skills: ['F06', 'F07', 'H03'],
    title: 'Isolement des personnes âgées',
    instruction:
      'Expliquez pourquoi l’isolement social a des effets sur la santé, puis proposez une action de repérage réaliste.',
    guidance: [
      'Ne vous contentez pas de dire que l’isolement est triste : cherchez les mécanismes.',
      'Un exemple fictif rend le mécanisme concret.',
      'Proposez une action en précisant qui agit et à quel moment.',
    ],
    reference: [
      'L’isolement social agit sur la santé par plusieurs voies. La première est le repérage : une personne isolée n’a personne pour remarquer qu’elle mange moins, se déplace moins ou se néglige. Une dégradation qui aurait été signalée en quelques jours passe alors inaperçue pendant des semaines.',
      'La deuxième voie est l’abandon progressif des activités et des déplacements, qui entretient la perte de mobilité et réduit encore les occasions de rencontre. La troisième est l’effet direct sur le moral et le sommeil, qui peut conduire à différer des soins.',
      'Dans une situation fictive, une personne de 84 ans cesse de sortir après une chute sans gravité. Personne ne s’en aperçoit pendant deux mois ; lorsqu’une aide à domicile intervient, la perte de mobilité s’est installée.',
      'Une action de repérage réaliste consisterait à demander systématiquement, lors de tout contact avec un professionnel, si la personne a vu quelqu’un dans la semaine écoulée. La question est brève, elle s’adresse à tout le monde, et elle ne stigmatise personne. Sa réussite suppose qu’un relais existe ensuite : poser la question sans pouvoir orienter produirait de la frustration.',
    ],
    weak:
      'L’isolement est mauvais pour la santé des personnes âgées car elles sont tristes et ne voient personne. Il faudrait qu’on aille les voir plus souvent.',
    weakWhy:
      'Aucun mécanisme n’est expliqué : on ne sait pas comment l’isolement dégrade la santé. La proposition n’indique ni qui agit, ni comment ces personnes seraient repérées.',
    strong:
      'L’isolement agit d’abord sur le repérage : sans entourage, une dégradation n’est signalée par personne et s’installe. Il entretient ensuite l’abandon des déplacements, ce qui aggrave la perte de mobilité. Dans une situation fictive, une personne cesse de sortir après une chute sans gravité ; deux mois passent avant qu’un professionnel ne s’en aperçoive. Une action possible consiste à demander systématiquement, lors de tout contact, si la personne a vu quelqu’un dans la semaine — à condition qu’un relais existe pour orienter.',
    strongWhy:
      'Deux mécanismes distincts sont expliqués, l’exemple les illustre, et la proposition est à la fois brève, universelle et assortie de sa condition de réussite.',
    difference:
      'La copie solide explique comment l’isolement produit ses effets ; la copie faible se contente de dire qu’il en produit. C’est la présence du mécanisme qui fait la différence.',
    other: [
      'Retenir comme mécanisme principal le renoncement aux soins, en expliquant le rôle des déplacements.',
      'Proposer un repérage lors du passage des professionnels déjà présents au domicile.',
    ],
  }),

  task({
    id: 'W14',
    skills: ['F07', 'F11', 'H07'],
    title: 'Parler de santé mentale sans stigmatiser',
    level: 'epreuve',
    instruction:
      'Une collègue vous dit qu’une personne accompagnée « est dépressive, ça se voit ». Expliquez ce qui pose problème dans cette phrase, et ce que vous feriez.',
    guidance: [
      'Analysez la phrase avant de dire ce que vous feriez.',
      'Distinguez l’observation du diagnostic.',
      'Terminez par une conduite concrète, dans votre champ de compétence.',
    ],
    reference: [
      'Cette phrase pose deux problèmes distincts. Le premier est qu’elle pose un diagnostic : la dépression est un trouble qui se diagnostique, et ce diagnostic ne relève ni de l’aide-soignante ni de l’infirmière. Le second est qu’elle réduit la personne à ce diagnostic supposé — « elle est dépressive » — au lieu de décrire ce qui a été observé.',
      'Ce glissement a des conséquences concrètes. Une fois l’étiquette posée, l’équipe risque d’attribuer toute manifestation ultérieure à cette cause supposée, y compris des plaintes physiques qui appelleraient une évaluation. Ce biais est documenté et retarde des prises en charge.',
      'Ce que je ferais tient en trois gestes. D’abord, demander à ma collègue ce qu’elle a observé précisément : moins d’appétit, retrait des activités, propos tenus. Ensuite, reformuler ces éléments en termes factuels et les transmettre à l’infirmière, qui évaluera ou orientera. Enfin, veiller à ce que la personne reste écoutée sans être interprétée.',
      'Je ne contredirais pas ma collègue devant qui que ce soit, et je ne minimiserais pas son inquiétude : elle a probablement remarqué quelque chose de réel. C’est la formulation, et non l’observation, qui doit être reprise.',
    ],
    weak:
      'Elle n’a pas le droit de dire ça, ce n’est pas son rôle. Je lui dirais qu’elle se trompe et j’en parlerais à l’infirmière.',
    weakWhy:
      'Le problème est identifié mais pas expliqué : on ne sait pas pourquoi cette phrase est risquée. La réponse met la collègue en tort au lieu de récupérer l’observation utile qu’elle contient.',
    strong:
      'Cette phrase pose un diagnostic, qui ne relève pas de notre champ, et elle réduit la personne à ce diagnostic supposé. Le risque est concret : une fois l’étiquette posée, des plaintes physiques ultérieures risquent d’être attribuées au trouble sans être évaluées. Je demanderais donc à ma collègue ce qu’elle a observé précisément — appétit, participation, propos tenus —, je reformulerais ces éléments en termes factuels et je les transmettrais à l’infirmière. Son inquiétude repose probablement sur quelque chose de réel : c’est la formulation qu’il faut reprendre, pas l’observation.',
    strongWhy:
      'Les deux problèmes sont distingués et expliqués, le risque est nommé, et la conduite proposée préserve l’information utile tout en respectant la collègue.',
    difference:
      'La copie solide récupère ce que la phrase contient de juste. Elle montre une capacité à travailler en équipe, que la copie faible perd en se plaçant sur le terrain du reproche.',
    other: [
      'Insister davantage sur la distinction entre observation et interprétation, avec deux exemples de reformulation.',
      'Développer le risque de rupture de confiance avec la personne si l’étiquette circule.',
    ],
  }),

  task({
    id: 'W15',
    skills: ['F05', 'F06', 'H11'],
    title: 'Hygiène des mains et organisation',
    instruction:
      'Expliquez pourquoi les gestes d’hygiène dépendent de l’organisation autant que des professionnels. Donnez un exemple et une limite.',
    guidance: ['Posez l’idée.', 'Expliquez le mécanisme.', 'Donnez un exemple fictif précis.', 'Indiquez ce que l’organisation ne règle pas.'],
    reference: [
      'Les gestes d’hygiène dépendent fortement de l’organisation, parce qu’un geste doit pouvoir être réalisé au moment exact où il est nécessaire. Si le produit n’est pas à portée de main, le geste suppose un déplacement, donc du temps, et il est abandonné dans les situations les plus chargées — c’est-à-dire précisément celles où le risque est le plus élevé.',
      'Dans un établissement fictif, les flacons de solution hydro-alcoolique étaient placés à l’entrée des couloirs. Leur repositionnement à l’entrée de chaque chambre a amélioré la pratique sans qu’aucune consigne nouvelle n’ait été donnée : l’obstacle n’était pas la connaissance de la règle, mais la distance au produit.',
      'L’organisation ne règle cependant pas tout. Elle ne remplace ni la formation initiale, ni les temps d’analyse des pratiques, ni un effectif suffisant. Un flacon bien placé ne compense pas une charge de travail qui rend impossible le respect des temps de soin.',
    ],
    weak:
      'Les professionnels doivent faire attention à l’hygiène des mains. Si le produit n’est pas là, ils ne peuvent pas le faire. Il faut donc mettre du produit partout.',
    weakWhy:
      'L’idée est amorcée mais le mécanisme n’est pas expliqué : on ne dit pas pourquoi l’absence de produit conduit à l’abandon du geste, ni dans quelles situations. Aucune limite n’est envisagée.',
    strong:
      'Un geste d’hygiène doit pouvoir être réalisé au moment exact où il est nécessaire. Si le produit est éloigné, le geste suppose un déplacement, donc du temps : il est abandonné dans les moments les plus chargés, c’est-à-dire les plus à risque. Dans un établissement fictif, déplacer les flacons des couloirs vers l’entrée des chambres a suffi à améliorer la pratique, sans consigne nouvelle. L’organisation ne remplace toutefois ni la formation ni un effectif suffisant : un flacon bien placé ne compense pas une charge de travail qui rend le temps de soin intenable.',
    strongWhy:
      'Le mécanisme est explicité et débouche sur une observation forte : le geste manque au moment où il compte le plus. L’exemple est concret et la limite est réelle.',
    difference:
      'La copie solide montre que l’abandon du geste se produit là où le risque est maximal. Ce raisonnement transforme un constat matériel en argument de sécurité.',
    other: [
      'Retenir comme exemple la disponibilité des gants ou des surblouses.',
      'Développer le rôle des temps d’analyse des pratiques comme complément de l’organisation.',
    ],
  }),

  task({
    id: 'W16',
    skills: ['F07', 'H09'],
    title: 'Dénutrition chez la personne âgée',
    instruction:
      'Expliquez pourquoi une perte d’appétit chez une personne âgée ne doit pas être banalisée. Proposez une conduite.',
    guidance: [
      'Commencez par ce que la perte d’appétit peut signaler.',
      'Expliquez ce que la banalisation fait perdre.',
      'Proposez une conduite en restant dans votre champ.',
    ],
    reference: [
      'Une perte d’appétit n’est pas une conséquence attendue de l’âge : c’est un signal. Elle peut traduire une douleur, un problème dentaire, un effet de traitement, une difficulté de déglutition, un état dépressif, ou simplement un repas devenu sans intérêt parce qu’il est pris seul.',
      'La banaliser fait perdre deux choses. D’abord la cause, qui est souvent accessible à une action simple. Ensuite le temps : la dénutrition s’installe progressivement et fragilise la cicatrisation, la force musculaire et l’équilibre, ce qui augmente le risque de chute.',
      'La conduite attendue consiste à décrire précisément ce qui est observé — ce qui reste dans l’assiette, depuis quand, dans quelles conditions le repas est pris —, à signaler l’évolution du poids si elle est suivie, et à transmettre sans délai. L’évaluation et la recherche de cause relèvent de l’infirmière et du médecin.',
      'Une part de la réponse est parfois organisationnelle plutôt que clinique : rétablir un repas partagé, adapter la texture, ou revoir l’horaire peut suffire, à condition que la cause médicale ait été écartée.',
    ],
    weak:
      'Quand une personne âgée ne mange plus, il faut la faire manger car sinon elle va maigrir. On peut lui proposer ce qu’elle aime.',
    weakWhy:
      '« Faire manger » n’est pas une conduite professionnelle : la recherche de cause est absente, et la transmission n’est pas mentionnée. Le raisonnement s’arrête à la conséquence visible.',
    strong:
      'Une perte d’appétit est un signal, non un effet de l’âge : elle peut traduire une douleur, un problème dentaire, un effet de traitement ou un repas devenu solitaire. La banaliser fait perdre la cause, souvent accessible, et le temps, car la dénutrition fragilise la cicatrisation et l’équilibre. La conduite consiste à décrire ce qui reste dans l’assiette, depuis quand et dans quelles conditions, puis à transmettre sans délai. La réponse est parfois organisationnelle — repas partagé, texture, horaire — une fois la cause médicale écartée.',
    strongWhy:
      'Plusieurs causes possibles sont nommées, la conséquence est précise, et la conduite distingue clairement ce qui relève de l’observation et ce qui relève de l’évaluation.',
    difference:
      'La copie solide cherche la cause ; la copie faible traite le symptôme. C’est la différence entre un accompagnement et une réaction.',
    other: [
      'Insister sur le suivi du poids comme élément objectif de transmission.',
      'Développer le rôle du repas partagé, en citant le portage de repas ou un repas collectif.',
    ],
  }),

  task({
    id: 'W17',
    skills: ['F06', 'F07', 'H18'],
    title: 'Usure professionnelle dans les métiers du soin',
    level: 'epreuve',
    instruction:
      'Expliquez pourquoi l’épuisement professionnel ne s’explique pas par une fragilité individuelle. Proposez une piste collective.',
    guidance: [
      'Commencez par ce que dit la définition.',
      'Expliquez ce que l’explication individuelle fait manquer.',
      'Donnez un exemple fictif.',
      'Proposez une piste qui ne repose pas sur la bonne volonté.',
    ],
    reference: [
      'L’épuisement professionnel se définit par un épuisement émotionnel, une prise de distance excessive vis-à-vis du travail et un sentiment de perte d’efficacité. La définition insiste sur l’exposition prolongée à des contraintes : c’est un processus, pas un trait de caractère.',
      'Expliquer l’épuisement par une fragilité individuelle produit deux effets néfastes. D’une part, cela empêche d’agir sur les causes, qui restent en place et affecteront d’autres professionnels. D’autre part, cela culpabilise la personne concernée, ce qui retarde encore sa demande d’aide.',
      'Dans une situation fictive, une équipe signale une fatigue croissante. L’analyse montre que les temps de transmission ont été supprimés pour gagner du temps, supprimant du même coup le seul moment d’échange collectif de la journée. Ce qui paraissait un gain d’organisation produisait de l’isolement.',
      'Une piste collective consiste à protéger un temps d’échange court mais régulier, inscrit au planning et non annulable en cas de tension. Le collectif de travail a un effet protecteur documenté ; encore faut-il qu’un espace existe pour qu’il se construise. Cette piste a un coût en temps, qu’il faut assumer plutôt que masquer.',
    ],
    weak:
      'Certaines personnes supportent mieux le stress que d’autres. Il faudrait que les professionnels apprennent à se protéger et à faire des pauses.',
    weakWhy:
      'La copie adopte exactement l’explication individuelle qu’il fallait discuter. La proposition repose entièrement sur la bonne volonté de professionnels déjà en difficulté.',
    strong:
      'L’épuisement professionnel se définit par une exposition prolongée à des contraintes, et non par un trait de caractère. L’attribuer à une fragilité individuelle laisse les causes en place — elles affecteront d’autres professionnels — et culpabilise la personne, ce qui retarde sa demande d’aide. Dans une situation fictive, la suppression des temps de transmission, décidée pour gagner du temps, a supprimé le seul moment d’échange collectif et produit de l’isolement. Une piste consiste à inscrire au planning un temps d’échange court, régulier et non annulable : le collectif protège, à condition qu’un espace existe pour se constituer.',
    strongWhy:
      'La copie discute l’explication individuelle au lieu de la reprendre, nomme ses deux effets, et propose une mesure organisationnelle dont le coût est assumé.',
    difference:
      'La copie faible répète le préjugé que le sujet invitait à examiner. C’est le risque de tout sujet formulé comme une question : il faut y répondre, pas la contourner.',
    other: [
      'Retenir comme piste l’analyse des pratiques ou le soutien de l’encadrement de proximité.',
      'Développer le lien entre santé des professionnels et qualité des soins.',
    ],
  }),

  task({
    id: 'W18',
    skills: ['F04', 'F07', 'H21'],
    title: 'Se faire comprendre malgré la barrière de la langue',
    instruction:
      'Expliquez pourquoi il vaut mieux recourir à un interprète professionnel qu’à un proche. Donnez un exemple et une limite.',
    guidance: ['Posez la thèse.', 'Donnez au moins deux raisons distinctes.', 'Illustrez.', 'Reconnaissez une contrainte pratique.'],
    reference: [
      'Le recours à un interprète professionnel est préférable à la traduction par un proche, pour deux raisons distinctes.',
      'La première tient à la fidélité de la transmission. Un proche filtre, résume, protège : il adoucit une mauvaise nouvelle, omet ce qui le gêne, ou répond à la place de la personne. L’information circule alors de façon incomplète, dans les deux sens, sans que personne ne s’en aperçoive.',
      'La seconde tient à la place assignée au proche. Traduire une information difficile fait porter une responsabilité qui ne lui revient pas. Lorsqu’il s’agit d’un enfant, la situation est plus problématique encore : on lui confie des informations et un rôle d’adulte.',
      'Dans une situation fictive, une consultation traduite par une adolescente conduit à ce que plusieurs éléments ne soient pas transmis, et à ce qu’elle se retrouve chargée d’annoncer une information difficile. Le recours à un service d’interprétariat par téléphone a allongé la consultation de quelques minutes, mais l’information est passée dans les deux sens.',
      'La contrainte est réelle : l’interprétariat suppose un service accessible, un délai et un coût. Lorsqu’il n’est pas disponible immédiatement, mieux vaut différer l’échange non urgent que de le conduire dans de mauvaises conditions.',
    ],
    weak:
      'Il vaut mieux un interprète car le proche peut mal traduire. Ce n’est pas son métier. Mais ce n’est pas toujours possible.',
    weakWhy:
      'Les raisons sont évoquées sans être expliquées : on ne sait pas comment le proche « traduit mal », ni ce que cela produit. La limite finale n’est pas développée.',
    strong:
      'Un proche filtre, résume et protège : il adoucit une mauvaise nouvelle ou répond à la place de la personne, si bien que l’information circule de façon incomplète sans que personne ne le remarque. Il se voit en outre confier une responsabilité qui ne lui revient pas — plus encore lorsqu’il s’agit d’un enfant. Dans une situation fictive, une consultation traduite par une adolescente laisse de côté plusieurs éléments et la charge d’annoncer une information difficile. Le recours à un interprétariat par téléphone a allongé l’échange de quelques minutes, mais l’information est passée. La contrainte est le délai et le coût : à défaut, mieux vaut différer un échange non urgent.',
    strongWhy:
      'Les deux raisons sont distinctes et expliquées par un mécanisme, l’exemple les illustre, et la limite débouche sur une conduite concrète.',
    difference:
      'La copie solide décrit ce que fait réellement un proche qui traduit. Ce niveau de précision est ce qui transforme une intuition en argument.',
    other: [
      'Insister sur la confidentialité, que la présence d’un proche ne garantit pas.',
      'Développer les autres leviers : phrases courtes, supports visuels, reformulation par la personne.',
    ],
  }),

  task({
    id: 'W19',
    skills: ['F05', 'F08', 'H15'],
    title: 'Accompagner la fin de vie',
    instruction:
      'Expliquez ce que recouvrent les soins palliatifs et pourquoi les associer uniquement aux derniers jours est un problème.',
    guidance: [
      'Définissez d’abord, brièvement.',
      'Expliquez ensuite ce que la représentation courante fait perdre.',
      'Terminez par une conséquence pratique.',
    ],
    reference: [
      'Les soins palliatifs sont des soins actifs et continus qui visent à soulager la douleur et les autres symptômes, à préserver la qualité de vie et à accompagner la personne et son entourage. Ils ne s’opposent pas aux traitements actifs : ils peuvent leur être associés, parfois pendant des mois ou des années.',
      'Les associer uniquement aux derniers jours produit un effet concret : leur mise en œuvre est repoussée. La personne reste alors sans réponse sur des symptômes qui auraient pu être soulagés plus tôt, et l’entourage n’est accompagné que dans l’urgence.',
      'Cette représentation a un second effet. Proposer des soins palliatifs devient une annonce difficile, perçue comme un arrêt, alors qu’il s’agit d’ajouter une compétence et non d’en retirer une. La crainte de cette annonce conduit à la différer encore.',
      'La conséquence pratique est qu’il vaut mieux parler tôt du confort, de la douleur et des volontés de la personne, y compris quand un traitement actif se poursuit. Les directives anticipées et la désignation d’une personne de confiance gagnent à être évoquées à un moment calme, et non au moment où elles deviennent indispensables.',
    ],
    weak:
      'Les soins palliatifs sont les soins de fin de vie, quand on ne peut plus guérir. Il ne faut pas attendre le dernier moment pour les mettre en place.',
    weakWhy:
      'La première phrase reprend précisément la représentation que le sujet demandait de discuter. La seconde énonce une conclusion correcte sans l’avoir démontrée.',
    strong:
      'Les soins palliatifs visent le confort et la qualité de vie, et peuvent accompagner un traitement actif pendant des mois. Les réduire aux derniers jours repousse leur mise en œuvre : des symptômes qui pouvaient être soulagés ne le sont pas, et l’entourage n’est accompagné que dans l’urgence. Cette représentation transforme en outre leur proposition en annonce difficile, perçue comme un arrêt alors qu’il s’agit d’ajouter une compétence. En pratique, mieux vaut parler tôt du confort, de la douleur et des volontés de la personne, y compris pendant un traitement actif.',
    strongWhy:
      'La définition corrige la représentation courante, les deux effets sont expliqués, et la conséquence pratique découle directement de l’analyse.',
    difference:
      'La copie faible commence par répéter l’erreur que le sujet visait. Une définition juste, posée en première phrase, conditionne toute la suite de la copie.',
    other: [
      'Développer l’accessibilité des directives anticipées comme conséquence pratique.',
      'Insister sur l’accompagnement de l’entourage, y compris après le décès.',
    ],
  }),

  task({
    id: 'W20',
    skills: ['F07', 'H13', 'H14'],
    title: 'Quand la routine devient maltraitante',
    level: 'epreuve',
    instruction:
      'Expliquez comment une organisation sans intention de nuire peut produire des effets maltraitants. Proposez un moyen de le repérer.',
    guidance: [
      'Définissez ce dont vous parlez.',
      'Expliquez le mécanisme, sans accuser personne.',
      'Donnez un exemple organisationnel.',
      'Proposez un moyen de repérage utilisable en équipe.',
    ],
    reference: [
      'La maltraitance institutionnelle désigne des effets contraires au respect de la personne produits par le fonctionnement d’une organisation, sans qu’aucune intention de nuire n’existe. Elle est particulièrement difficile à voir, précisément parce qu’elle n’a pas d’auteur.',
      'Le mécanisme est celui de l’habitude. Une organisation est mise en place pour une raison légitime — tenir un planning, sécuriser un horaire, répartir une charge. Avec le temps, elle cesse d’être interrogée : elle devient la façon dont on fait les choses. Ses effets sur les personnes accompagnées deviennent alors invisibles à ceux qui l’appliquent chaque jour.',
      'Dans un service fictif, les toilettes sont réalisées entre six et huit heures pour tenir le planning, y compris pour des personnes qui souhaiteraient se lever plus tard. Aucun professionnel n’a l’intention de nuire, et pourtant un choix est retiré chaque jour à des personnes qui pourraient l’exercer.',
      'Un moyen de repérage simple consiste à poser régulièrement, en réunion d’équipe, une seule question sur une pratique donnée : accepterions-nous cette organisation pour nous-mêmes ? La question ne met personne en cause, elle porte sur la pratique et non sur les personnes, et elle suffit souvent à rendre visible ce que l’habitude avait effacé. Encore faut-il qu’un temps de réunion existe et que la réponse puisse déboucher sur un changement.',
    ],
    weak:
      'Il ne faut pas faire les choses toujours pareil sans réfléchir, sinon on peut faire du mal aux personnes sans le vouloir. Il faut se remettre en question.',
    weakWhy:
      'L’idée est juste mais reste entièrement abstraite : aucun exemple, aucun mécanisme, et « se remettre en question » n’est pas un moyen de repérage utilisable.',
    strong:
      'Une organisation mise en place pour une raison légitime cesse avec le temps d’être interrogée : elle devient la façon dont on fait les choses, et ses effets deviennent invisibles à ceux qui l’appliquent. Dans un service fictif, les toilettes réalisées entre six et huit heures pour tenir le planning retirent chaque jour un choix à des personnes qui pourraient l’exercer, sans qu’aucune intention de nuire n’existe. Un repérage possible consiste à poser en réunion une seule question sur une pratique : accepterions-nous cette organisation pour nous-mêmes ? Elle porte sur la pratique et non sur les personnes, mais suppose un temps de réunion et une marge de changement.',
    strongWhy:
      'Le mécanisme de l’habitude est nommé, l’exemple est organisationnel comme demandé, et le moyen de repérage est précis, non accusatoire et assorti de ses conditions.',
    difference:
      'La copie solide propose une question concrète, utilisable dès la prochaine réunion. « Se remettre en question » ne se met pas en œuvre.',
    other: [
      'Prendre comme exemple les horaires de repas ou l’absence d’intimité lors des soins.',
      'Proposer un recueil systématique des préférences à l’admission comme moyen de repérage.',
    ],
  }),

  task({
    id: 'W21',
    skills: ['F06', 'H02'],
    title: 'Qui fait quoi autour d’un retour à domicile',
    instruction:
      'Décrivez les intervenants d’un retour à domicile après hospitalisation, puis expliquez ce qui rend ce moment fragile.',
    guidance: [
      'Nommez les intervenants et leur rôle, sans faire une liste sèche.',
      'Expliquez ensuite le mécanisme de la fragilité.',
      'Une phrase de conclusion doit répondre à la question.',
    ],
    reference: [
      'Un retour à domicile mobilise plusieurs intervenants aux rôles distincts. Le service hospitalier prépare la sortie et transmet les informations. Le médecin traitant reprend le suivi et coordonne. Un infirmier libéral ou un service de soins à domicile assure les soins. Un service d’aide à domicile intervient sur les actes de la vie quotidienne. Le travailleur social traite l’ouverture des droits et des aides. L’entourage, enfin, assure une part importante de la présence.',
      'Ce moment est fragile parce qu’il fait passer la personne d’une équipe qui la connaît à des intervenants qui ne la connaissent pas, souvent en quelques heures. Tout ce qui a été observé pendant le séjour doit être transmis à des professionnels qui n’étaient pas présents, et qui ne se rencontreront jamais entre eux.',
      'Il suffit qu’un maillon manque pour que l’ensemble se défasse : sans lettre de liaison, le médecin traitant ignore un changement de traitement ; sans information préalable, l’infirmier libéral n’est pas disponible ; sans aides en place, le retour devient impossible et conduit parfois à une réhospitalisation.',
      'La fragilité tient donc moins à la compétence de chacun qu’à la circulation de l’information entre des intervenants qui ne se voient pas.',
    ],
    weak:
      'À la sortie de l’hôpital, il y a le médecin, l’infirmière et la famille. C’est fragile parce qu’il peut y avoir des oublis et que les gens ne communiquent pas toujours bien.',
    weakWhy:
      'La liste est incomplète et les rôles ne sont pas précisés. La fragilité est attribuée à un défaut de communication sans expliquer pourquoi ce moment y est particulièrement exposé.',
    strong:
      'Le service hospitalier prépare la sortie, le médecin traitant reprend le suivi, un infirmier libéral assure les soins, un service d’aide intervient sur la vie quotidienne, le travailleur social traite les droits, et l’entourage assure la présence. Ce moment est fragile parce qu’il fait passer la personne d’une équipe qui la connaît à des intervenants qui ne la connaissent pas, en quelques heures, et qui ne se rencontreront jamais entre eux. Il suffit qu’un maillon manque — lettre de liaison, information de l’infirmier, aides en place — pour que l’ensemble se défasse. La fragilité tient à la circulation de l’information plus qu’à la compétence de chacun.',
    strongWhy:
      'Chaque intervenant est associé à un rôle, et la fragilité est expliquée par une caractéristique propre au moment de la sortie, non par une généralité sur la communication.',
    difference:
      'La copie solide explique pourquoi CE moment est fragile. Dire que « les gens communiquent mal » vaudrait pour n’importe quelle situation et n’apprend rien au correcteur.',
    other: [
      'Développer davantage le rôle du service social dans la faisabilité du retour.',
      'Insister sur le document remis à la personne comme sécurité en cas de transmission perdue.',
    ],
  }),

  task({
    id: 'W22',
    skills: ['F07', 'H08'],
    title: 'Accompagner sans moraliser',
    instruction:
      'Une personne vous parle de sa consommation d’alcool et dit ne pas vouloir arrêter. Expliquez la conduite professionnelle attendue et justifiez-la.',
    guidance: [
      'Décrivez la conduite avant de la justifier.',
      'Expliquez ce que produirait une attitude moralisatrice.',
      'Précisez ce que « ne pas juger » ne signifie pas.',
    ],
    reference: [
      'La conduite attendue consiste à écouter sans commenter, à demander comment la personne vit cette consommation, à informer sur les risques concrets — notamment les interactions avec certains traitements —, à indiquer où trouver un accompagnement si elle le souhaite un jour, puis à transmettre.',
      'Cette conduite se justifie par ce que produirait l’attitude inverse. Une personne qui se sent jugée cesse d’évoquer sa consommation. Le professionnel perd alors l’information dont il aurait besoin pour informer, surveiller et proposer au bon moment. Le jugement ne modifie pas la consommation : il supprime la possibilité d’en parler.',
      'Elle se justifie aussi par l’approche de réduction des risques, qui vise à limiter les dommages sans exiger l’arrêt comme préalable. Maintenir le lien avec une personne qui ne peut pas arrêter aujourd’hui, c’est se donner la possibilité d’agir lorsqu’elle le pourra.',
      'Ne pas juger ne signifie pas ne rien dire. Le professionnel informe sur les risques, dit clairement ce qui est dangereux et propose un accompagnement. La différence tient à ce qu’il s’adresse à la consommation et à ses conséquences, non à la valeur de la personne.',
    ],
    weak:
      'Il ne faut pas la juger, chacun fait ce qu’il veut. Je l’écouterais et je ne dirais rien pour ne pas la braquer.',
    weakWhy:
      'L’absence de jugement est confondue avec l’absence d’information. Le rôle professionnel — informer sur les risques, orienter, transmettre — disparaît entièrement.',
    strong:
      'J’écouterais sans commenter, je demanderais comment elle vit cette consommation, j’informerais sur les risques concrets, notamment les interactions avec certains traitements, j’indiquerais où trouver un accompagnement, et je transmettrais. Cette conduite se justifie par ce que produit l’attitude inverse : une personne qui se sent jugée cesse d’en parler, et l’équipe perd l’information dont elle a besoin. Le jugement ne modifie pas la consommation, il supprime la possibilité d’en parler. Ne pas juger ne veut pas dire ne rien dire : on s’adresse à la consommation et à ses conséquences, non à la valeur de la personne.',
    strongWhy:
      'La conduite est détaillée puis justifiée par un mécanisme. La dernière phrase évite le contresens le plus fréquent sur ce sujet.',
    difference:
      'La copie faible transforme le respect en silence. La copie solide montre qu’on peut informer sans juger — c’est exactement ce que le jury cherche à vérifier.',
    other: [
      'Développer la notion de réduction des risques et sa différence avec le sevrage.',
      'Insister sur la rechute comme étape possible du parcours, et non comme échec.',
    ],
  }),

  task({
    id: 'W23',
    skills: ['F05', 'F06', 'H22'],
    title: 'Vieillissement de la population et besoins de soins',
    instruction:
      'Expliquez en quoi le vieillissement de la population modifie la nature des besoins de soins. Apportez une nuance.',
    guidance: ['Posez le constat démographique sans chiffre inventé.', 'Expliquez le déplacement des besoins.', 'Donnez un exemple.', 'Nuancez.'],
    reference: [
      'L’allongement de l’espérance de vie et l’augmentation de la part des personnes âgées modifient la nature des besoins de soins plus que leur seul volume. On peut le dire sans avancer de chiffre précis, qui devrait de toute façon être vérifié et daté.',
      'Le déplacement est le suivant : les situations chroniques prennent une place croissante par rapport aux épisodes aigus. Or une maladie chronique ne se traite pas en un séjour ; elle s’accompagne dans la durée, par plusieurs professionnels, entre le domicile et l’hôpital. Le besoin porte donc davantage sur la coordination, le suivi et le soutien de l’entourage que sur le plateau technique.',
      'Dans un territoire fictif, l’augmentation du nombre de personnes suivies pour une maladie chronique n’appelle pas davantage de lits d’hospitalisation, mais davantage de temps de suivi, d’éducation thérapeutique et d’articulation entre la ville et l’hôpital.',
      'Une nuance s’impose : vieillissement n’est pas synonyme de dépendance. Une part importante des personnes âgées vit sans perte d’autonomie notable. Raisonner comme si l’âge impliquait mécaniquement un besoin de soins conduirait à surestimer certains besoins et à négliger ceux d’autres publics.',
    ],
    weak:
      'La population vieillit, donc il y aura plus de malades et il faudra plus de places en EHPAD et plus de personnel.',
    weakWhy:
      'La copie assimile vieillissement et dépendance, ce que la nuance attendue invitait précisément à éviter. Elle raisonne en volume et manque le déplacement des besoins.',
    strong:
      'L’allongement de l’espérance de vie modifie la nature des besoins plus que leur volume : les situations chroniques prennent une place croissante par rapport aux épisodes aigus. Or une maladie chronique s’accompagne dans la durée, par plusieurs professionnels, entre le domicile et l’hôpital : le besoin porte sur la coordination et le suivi plus que sur le plateau technique. Dans un territoire fictif, davantage de personnes suivies pour une maladie chronique appelle du temps de suivi et d’articulation, non des lits supplémentaires. Une nuance s’impose : vieillissement n’est pas dépendance, et une part importante des personnes âgées vit sans perte d’autonomie notable.',
    strongWhy:
      'La copie raisonne sur la nature des besoins, comme demandé, sans citer de chiffre invérifiable, et la nuance finale corrige l’assimilation la plus fréquente.',
    difference:
      'La copie faible traite le sujet en volume ; la copie solide en nature. La question portait précisément sur ce déplacement.',
    other: [
      'Développer le rôle de l’exercice coordonné comme réponse organisationnelle.',
      'Insister sur les écarts entre territoires, qu’une moyenne nationale masque.',
    ],
  }),

  task({
    id: 'W24',
    skills: ['F07', 'H17'],
    title: 'Repérer les violences en consultation',
    level: 'epreuve',
    instruction:
      'Expliquez pourquoi il vaut mieux poser la question des violences à toutes les personnes plutôt qu’à celles qui semblent concernées.',
    guidance: [
      'Posez la thèse.',
      'Donnez deux raisons distinctes.',
      'Décrivez les conditions pratiques de la question.',
      'Indiquez une limite.',
    ],
    reference: [
      'Poser la question des violences de façon systématique est préférable à un questionnement ciblé, pour deux raisons distinctes.',
      'La première est que le ciblage suppose un repérage préalable, qui est précisément ce qui fait défaut. Les situations de violence ne se voient pas : elles concernent tous les milieux, tous les âges, et ne laissent pas nécessairement de trace visible. Attendre un signe revient à ne repérer que les situations les plus avancées.',
      'La seconde est que poser la question à une seule personne la désigne. Elle peut se sentir jugée, soupçonnée, ou comprendre que quelque chose dans son attitude a été interprété. Une question posée à tout le monde, présentée comme une habitude du service, supprime cette gêne pour la personne comme pour le professionnel.',
      'Les conditions pratiques comptent autant que la question elle-même : elle doit être posée seule à seule, hors de la présence du conjoint ou d’un proche, dans un cadre neutre, et le professionnel doit disposer à l’avance d’une liste de relais. Une question posée sans savoir vers qui orienter met la personne en difficulté.',
      'La limite est que la question systématique ne garantit pas la réponse. Une personne peut ne pas se sentir prête, ou ne pas identifier sa situation comme telle. La poser régulièrement, sans insister, laisse la porte ouverte pour une fois suivante.',
    ],
    weak:
      'Il faut poser la question à tout le monde parce qu’on ne sait pas qui est concerné. Sinon on risque de passer à côté.',
    weakWhy:
      'Une seule raison est donnée, et elle n’est pas développée. Les conditions pratiques, qui déterminent l’efficacité de la démarche, sont absentes.',
    strong:
      'Le ciblage suppose un repérage préalable, qui est précisément ce qui manque : les situations de violence ne se voient pas et concernent tous les milieux. Attendre un signe revient à ne repérer que les situations les plus avancées. Par ailleurs, poser la question à une seule personne la désigne et peut la mettre en difficulté, alors qu’une question posée à tout le monde, présentée comme une habitude du service, supprime cette gêne. Les conditions comptent autant : seule à seule, hors présence du conjoint, avec une liste de relais préparée. La limite est qu’une personne peut ne pas se sentir prête : la question se pose régulièrement, sans insister.',
    strongWhy:
      'Les deux raisons sont distinctes, les conditions pratiques sont précisées, et la limite débouche sur une conduite plutôt que sur un constat d’échec.',
    difference:
      'La copie solide traite les conditions de mise en œuvre. Sur ce sujet, une bonne intention mal appliquée peut nuire : le correcteur vérifie que vous le savez.',
    other: [
      'Développer la formulation exacte de la question et son caractère neutre.',
      'Insister sur la nécessité de noter précisément les propos rapportés.',
    ],
  }),

  task({
    id: 'W25',
    skills: ['F06', 'F11', 'H05'],
    title: 'S’adresser à la personne, pas à son accompagnant',
    instruction:
      'Expliquez pourquoi il est important de s’adresser directement à une personne en situation de handicap, même lorsqu’elle est accompagnée. Donnez un exemple et une limite.',
    guidance: ['Posez l’idée.', 'Expliquez ce que produit la pratique inverse.', 'Illustrez.', 'Indiquez une situation plus délicate.'],
    reference: [
      'S’adresser directement à la personne est important parce que la pratique inverse la met hors de l’échange qui la concerne. Parler à l’accompagnant revient à décider que la personne n’est pas l’interlocutrice, ce qui n’a aucun fondement : une difficulté motrice, sensorielle ou de parole n’est pas une difficulté à comprendre ou à décider.',
      'Les effets sont concrets. La personne cesse d’être consultée sur ce qui la concerne, ses préférences ne sont pas recueillies, et le consentement devient formel. À force, elle peut cesser d’intervenir, ce qui confirme à tort l’idée de départ.',
      'Dans une situation fictive, un professionnel demande à l’accompagnant si « elle a bien dormi ». La personne, qui pouvait répondre, n’est pas sollicitée ; l’information transmise est de seconde main et sans doute moins exacte.',
      'La situation devient plus délicate lorsque des troubles cognitifs altèrent la capacité à décider. Même alors, on s’adresse d’abord à la personne, on associe l’accompagnant en complément, et on recherche les préférences exprimées antérieurement plutôt que de décider à sa place.',
    ],
    weak:
      'Il faut parler à la personne et pas à celui qui l’accompagne, parce que c’est plus respectueux. Sinon elle se sent mise de côté.',
    weakWhy:
      'La copie affirme le principe sans expliquer ses effets concrets, et l’exemple manque. La limite n’est pas envisagée, alors que le sujet la demandait.',
    strong:
      'Parler à l’accompagnant revient à décider que la personne n’est pas l’interlocutrice, ce qui n’a aucun fondement : une difficulté motrice ou de parole n’est pas une difficulté à comprendre. Les effets sont concrets — préférences non recueillies, consentement formel, et parfois retrait de la personne, qui confirme à tort l’idée de départ. Dans une situation fictive, demander à l’accompagnant si « elle a bien dormi » écarte une personne qui pouvait répondre et produit une information de seconde main. La situation est plus délicate en cas de troubles cognitifs : on s’adresse d’abord à la personne, on associe l’accompagnant en complément, et on recherche les préférences exprimées antérieurement.',
    strongWhy:
      'Le mécanisme de la profécie auto-réalisatrice est identifié, l’exemple est précis, et la limite retenue est réellement difficile.',
    difference:
      'La copie solide montre que la pratique se renforce elle-même : la personne finit par se taire, ce qui semble justifier qu’on ne lui parle pas. Ce type de mécanisme est très valorisé.',
    other: [
      'Retenir comme exemple le recueil du consentement avant un soin.',
      'Développer la question de l’accessibilité de l’information comme condition de la participation.',
    ],
  }),

  task({
    id: 'W26',
    skills: ['F07', 'H06'],
    title: 'Un accueil qui ne décourage pas',
    instruction:
      'Expliquez comment l’accueil d’une structure peut décourager une démarche déjà difficile. Proposez deux améliorations concrètes.',
    guidance: [
      'Décrivez ce que représente la démarche pour la personne.',
      'Expliquez comment l’accueil peut la faire échouer.',
      'Proposez deux améliorations distinctes, avec leur acteur.',
    ],
    reference: [
      'Une démarche d’accès aux soins ou aux droits représente souvent un effort considérable pour la personne : trouver l’information, se libérer, se déplacer, comprendre ce qui est demandé. Lorsqu’elle se présente enfin, une grande part de son énergie a déjà été dépensée.',
      'L’accueil peut alors faire échouer ce qui a été construit. Une question perçue comme un contrôle, un document réclamé sans explication, une attente sans information ou un renvoi vers un autre service suffisent à faire abandonner une démarche qui avait demandé des semaines. La personne ne reviendra pas nécessairement, et l’échec sera attribué à son manque de motivation.',
      'Une première amélioration consiste à expliquer systématiquement la suite : ce qui va se passer, combien de temps cela prendra, et ce qui sera demandé ensuite. Cela relève de la personne qui accueille et ne coûte que quelques phrases.',
      'Une seconde consiste à ne jamais renvoyer une personne sans lui remettre par écrit le nom du service, l’adresse et les horaires. Cela relève de l’organisation, qui doit préparer ces documents à l’avance. Une réorientation orale se perd en chemin.',
    ],
    weak:
      'Il faut bien accueillir les gens et être aimable, sinon ils ne reviennent pas. Il faudrait former le personnel à l’accueil.',
    weakWhy:
      'L’amabilité n’est pas le sujet : la copie ne montre pas ce qui, concrètement, fait échouer une démarche. « Former le personnel » n’est pas une amélioration concrète.',
    strong:
      'Une démarche d’accès aux droits représente un effort considérable : trouver l’information, se libérer, se déplacer, comprendre ce qui est demandé. Quand la personne se présente, son énergie est largement dépensée. Une question perçue comme un contrôle, une attente sans information ou un renvoi vers un autre service suffisent alors à faire abandonner une démarche construite depuis des semaines — et l’échec sera attribué à son manque de motivation. Deux améliorations : expliquer systématiquement la suite, ce qui ne coûte que quelques phrases ; et ne jamais réorienter sans remettre par écrit le service, l’adresse et les horaires, ce qui suppose des documents préparés à l’avance.',
    strongWhy:
      'La copie part de l’effort déjà fourni, ce qui rend compréhensible l’effet d’un accueil défaillant. Les deux améliorations sont concrètes et leur coût est évalué.',
    difference:
      'La copie solide explique pourquoi un détail d’accueil peut annuler des semaines d’effort. C’est ce raisonnement, et non l’appel à l’amabilité, qui montre une compréhension professionnelle.',
    other: [
      'Retenir comme amélioration l’affichage des délais d’attente.',
      'Développer l’accompagnement au remplissage des formulaires.',
    ],
  }),

  task({
    id: 'W27',
    skills: ['F05', 'F08', 'H01'],
    title: 'Les déterminants de santé',
    instruction:
      'Expliquez pourquoi la santé ne dépend pas seulement des comportements individuels. Donnez deux exemples et une limite.',
    guidance: ['Posez la thèse.', 'Nommez plusieurs déterminants.', 'Donnez deux exemples.', 'Évitez de nier toute part individuelle.'],
    reference: [
      'La santé dépend d’un ensemble de facteurs appelés déterminants : conditions de vie et de travail, revenus, logement, éducation, environnement, accès aux soins, et comportements individuels. Ces derniers ne sont donc qu’une partie du tableau.',
      'Surtout, les comportements dépendent eux-mêmes des autres facteurs. Il est plus difficile de cuisiner sans équipement, de pratiquer une activité sans lieu accessible, ou de consulter sans pouvoir se libérer. Les marges de manœuvre individuelles ne sont pas les mêmes pour tout le monde.',
      'Deux exemples le montrent. Une personne travaillant en horaires décalés ne peut pas honorer des rendez-vous proposés en journée : son « comportement » de renoncement est en réalité une contrainte d’organisation. Une personne vivant dans un logement mal isolé est exposée au froid ou à la chaleur indépendamment de ses habitudes de vie.',
      'La limite est qu’il ne faut pas pour autant nier toute part individuelle. Sans elle, l’accompagnement n’aurait plus d’objet : informer, proposer et soutenir supposent que la personne dispose d’une capacité d’action. La bonne posture consiste à agir sur les conditions tout en reconnaissant cette capacité.',
    ],
    weak:
      'La santé dépend de beaucoup de choses, pas seulement de ce que font les gens. Le logement et le travail jouent aussi. Il faut donc agir sur tout.',
    weakWhy:
      'Les déterminants sont cités sans que leur effet soit expliqué. « Agir sur tout » ne constitue ni une analyse ni une proposition, et la limite demandée est absente.',
    strong:
      'La santé dépend des conditions de vie et de travail, du revenu, du logement, de l’environnement et de l’accès aux soins autant que des comportements. Surtout, les comportements dépendent des autres facteurs : il est plus difficile de cuisiner sans équipement ou de consulter sans pouvoir se libérer. Une personne en horaires décalés qui ne peut honorer un rendez-vous en journée n’a pas un comportement de renoncement mais une contrainte d’organisation ; une personne mal logée est exposée au froid indépendamment de ses habitudes. Cela ne supprime pas toute part individuelle : sans capacité d’action, l’accompagnement n’aurait plus d’objet.',
    strongWhy:
      'La copie montre que les comportements sont eux-mêmes conditionnés, ce qui est le cœur du sujet, et la limite évite le basculement vers un déterminisme complet.',
    difference:
      'La copie solide requalifie un « comportement » en contrainte. C’est exactement le geste d’analyse attendu, et il change la façon dont on accompagne.',
    other: [
      'Retenir comme exemple l’accès à une activité physique en fonction du quartier.',
      'Développer l’effet du niveau d’information sur le recours aux dépistages.',
    ],
  }),

  task({
    id: 'W28',
    skills: ['F07', 'F12', 'H23'],
    title: 'Un chiffre entendu quelque part',
    instruction:
      'Une personne vous affirme un chiffre sur la santé que vous ne pouvez pas vérifier. Expliquez comment vous réagissez et pourquoi.',
    guidance: [
      'Décrivez votre conduite étape par étape.',
      'Justifiez chaque étape.',
      'Terminez par ce que vous ne feriez pas.',
    ],
    reference: [
      'Je commencerais par demander d’où vient ce chiffre, sans mettre en doute la personne : qui l’a produit, quand, et à quel propos. Cette question n’est pas une contestation, c’est la première chose qu’un professionnel se demande devant une donnée.',
      'Je dirais ensuite honnêtement que je ne peux pas le confirmer. Reconnaître une incertitude renforce la crédibilité au lieu de l’affaiblir, et cela évite de transmettre une information fausse qui circulerait ensuite avec mon autorité professionnelle.',
      'J’indiquerais enfin où vérifier : Santé publique France, la Haute Autorité de santé, l’Assurance maladie ou la DREES selon le sujet, en précisant qu’il faut regarder la date de mise à jour. Une donnée exacte il y a cinq ans peut être devenue inexacte.',
      'Je ne contredirais pas sèchement la personne, ce qui la conduirait à défendre son information au lieu de l’examiner. Et je n’avancerais pas de mon côté un chiffre approximatif pour « rétablir » la vérité : cela reviendrait à opposer une donnée invérifiable à une autre.',
    ],
    weak:
      'Je lui dirais que ce n’est pas forcément vrai et qu’il ne faut pas croire tout ce qu’on entend. Je lui conseillerais de vérifier sur internet.',
    weakWhy:
      'La contradiction immédiate ferme l’échange, et « vérifier sur internet » n’est pas une orientation : la question de la fiabilité de la source reste entière.',
    strong:
      'Je demanderais d’abord d’où vient ce chiffre — qui l’a produit, quand, à quel propos — sans mettre la personne en doute : c’est la première question qu’un professionnel se pose devant une donnée. Je dirais ensuite que je ne peux pas le confirmer, car reconnaître une incertitude vaut mieux que transmettre une information fausse avec mon autorité professionnelle. J’indiquerais enfin où vérifier, en précisant qu’il faut regarder la date de mise à jour. Je ne contredirais pas sèchement, ce qui la conduirait à défendre son chiffre au lieu de l’examiner, et je n’avancerais pas un chiffre approximatif de mon côté.',
    strongWhy:
      'Chaque étape est justifiée, l’orientation est précise, et la dernière phrase évite l’erreur symétrique consistant à opposer une approximation à une autre.',
    difference:
      'La copie solide transmet une méthode de vérification plutôt qu’un verdict. Elle rend la personne capable de vérifier elle-même la prochaine fois.',
    other: [
      'Nommer les critères de fiabilité d’une source : auteur, date, base de la donnée.',
      'Développer le risque de rompre la confiance en contredisant sèchement.',
    ],
  }),

  task({
    id: 'W29',
    skills: ['F06', 'F07', 'H12'],
    title: 'Les transmissions comme sécurité',
    instruction:
      'Expliquez pourquoi la qualité des transmissions est un enjeu de sécurité et non une formalité. Proposez deux améliorations.',
    guidance: ['Posez la thèse.', 'Expliquez ce que produit une transmission défaillante.', 'Donnez un exemple.', 'Proposez deux améliorations concrètes.'],
    reference: [
      'Les transmissions ne sont pas une formalité administrative : elles sont le seul moyen par lequel ce qu’une personne a observé parvient à celles qui prendront le relais. Sans elles, chaque équipe repart d’une connaissance partielle de la situation.',
      'Une transmission défaillante produit des effets immédiats : un soin non réalisé, une surveillance non poursuivie, une information sur un refus ou une douleur qui ne parvient pas à celle qui pourrait agir. L’erreur est alors attribuée à un oubli individuel, alors qu’elle résulte d’un défaut de circulation.',
      'Dans une situation fictive, une information donnée oralement dans un couloir pendant un pic d’activité n’est pas retrouvée à la relève suivante. Personne n’a mal travaillé : l’information n’avait pas de support.',
      'Deux améliorations possibles. La première est de protéger un temps de transmission, inscrit au planning et non annulable en cas de tension : c’est au moment où le service est tendu que ce temps est le plus nécessaire. La seconde est de rendre le support de transmission accessible au point d’usage, et non à l’autre bout du service, afin que la trace écrite ne suppose pas un déplacement.',
    ],
    weak:
      'Les transmissions sont importantes car sinon les autres ne savent pas ce qui s’est passé. Il faut bien les faire et ne rien oublier.',
    weakWhy:
      'La copie répète que c’est important sans montrer ce qui se produit concrètement. Les améliorations proposées reposent sur la vigilance individuelle, qui est précisément ce qui fait défaut sous tension.',
    strong:
      'Les transmissions sont le seul moyen par lequel une observation parvient à l’équipe suivante : sans elles, chacune repart d’une connaissance partielle. Une transmission défaillante produit un soin non réalisé ou une surveillance interrompue, et l’erreur est alors attribuée à un oubli individuel alors qu’elle vient d’un défaut de circulation. Dans une situation fictive, une information donnée oralement dans un couloir pendant un pic d’activité n’est pas retrouvée à la relève. Deux améliorations : protéger un temps de transmission non annulable, car il est le plus nécessaire quand le service est tendu ; et rendre le support accessible au point d’usage, pour que la trace écrite ne suppose pas un déplacement.',
    strongWhy:
      'Le mécanisme est explicité, l’exemple montre une défaillance sans faute individuelle, et les deux améliorations agissent sur l’organisation plutôt que sur la vigilance.',
    difference:
      'La copie solide propose des mesures qui tiennent même quand l’équipe est débordée. C’est le critère qui distingue une proposition réaliste d’un vœu.',
    other: [
      'Développer la distinction entre transmission orale et trace écrite.',
      'Retenir comme amélioration une trame commune de transmission.',
    ],
  }),

  task({
    id: 'W30',
    skills: ['F07', 'F11', 'H10'],
    title: 'Éducation thérapeutique : informer ne suffit pas',
    level: 'epreuve',
    instruction:
      'Expliquez ce qui distingue l’éducation thérapeutique d’une simple information. Donnez un exemple et une limite.',
    guidance: ['Distinguez les deux notions.', 'Expliquez pourquoi l’information seule ne suffit pas.', 'Illustrez.', 'Indiquez une contrainte.'],
    reference: [
      'Informer, c’est transmettre un contenu : expliquer ce qu’est une maladie, à quoi sert un traitement, quels sont les signes d’alerte. L’éducation thérapeutique est une démarche structurée qui part de ce que la personne sait déjà, de ce qu’elle vit et de ce qu’elle souhaite, pour construire avec elle des compétences utilisables dans sa vie quotidienne.',
      'L’information seule ne suffit pas parce qu’elle suppose que le seul obstacle soit le manque de connaissance. Or beaucoup de personnes parfaitement informées interrompent un traitement : les obstacles sont alors l’horaire, le coût, un effet indésirable non dit, ou la lassitude. Aucune information supplémentaire ne lève ces obstacles.',
      'Dans une situation fictive, une personne en travail posté connaît parfaitement son traitement mais ne peut pas respecter les horaires de prise. Lui réexpliquer l’intérêt du traitement ne changera rien ; explorer avec elle le déroulement concret de ses journées permet d’ajuster le schéma.',
      'La contrainte est le temps. L’éducation thérapeutique suppose plusieurs rencontres, une équipe formée et un temps d’échange qui n’est pas toujours disponible. Le reconnaître vaut mieux que de désigner comme éducation thérapeutique ce qui reste une information transmise en quelques minutes.',
    ],
    weak:
      'L’éducation thérapeutique, c’est expliquer la maladie au patient pour qu’il comprenne et qu’il suive mieux son traitement. C’est important car sinon il ne prend pas ses médicaments.',
    weakWhy:
      'La copie décrit exactement l’information que le sujet demandait de distinguer. Elle suppose en outre que le seul obstacle est la compréhension, ce que le sujet invitait à discuter.',
    strong:
      'Informer, c’est transmettre un contenu ; l’éducation thérapeutique part de ce que la personne sait, vit et souhaite pour construire avec elle des compétences utilisables au quotidien. L’information seule ne suffit pas parce qu’elle suppose que l’obstacle soit la connaissance : or des personnes bien informées interrompent un traitement à cause d’un horaire, d’un coût ou d’un effet indésirable non dit. Dans une situation fictive, une personne en travail posté connaît son traitement mais ne peut en respecter les horaires ; réexpliquer ne change rien, explorer ses journées permet d’ajuster. La contrainte est le temps : plusieurs rencontres et une équipe formée, ce dont on ne dispose pas toujours.',
    strongWhy:
      'La distinction est nette, le mécanisme est démontré par un contre-exemple, et la contrainte finale évite de présenter comme éducation thérapeutique une information rapide.',
    difference:
      'La copie solide montre qu’une personne bien informée peut malgré tout interrompre un traitement. Ce contre-exemple démonte à lui seul l’idée que l’information suffirait.',
    other: [
      'Développer les compétences visées : repérer un signe d’alerte, savoir qui contacter.',
      'Insister sur le caractère pluriprofessionnel de la démarche.',
    ],
  }),
]
