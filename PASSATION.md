# Passation — Prépa IFSI 2027

État au terme de la session de développement. Ce document dit ce qui fonctionne,
ce qui manque et ce qui reste à vérifier, **sans embellissement**.

---

## 1. État général

L’application est **utilisable de bout en bout** dans les quatre matières :
première ouverture → séance → erreur → explication différente → nouvel exercice
→ sauvegarde → fermeture → reprise → bilan.

Vérifié par 228 tests unitaires et 40 tests de parcours en navigateur réel
(ordinateur 1280 px et téléphone 360 px), tous passants au moment de la
rédaction de ce document.

---

## 2. Contenu livré, et écart avec les cibles du cahier des charges

Les chiffres de la colonne « livré » sont calculés par l’application
(`content/registry.ts`, fonction `inventory()`), pas saisis à la main.

| Élément | Cible du cahier des charges | Livré | Écart |
|---|---:|---:|---|
| Exercices de calculs | 300 | **110 structures** | Voir la note ci-dessous |
| Micro-exercices de français | 100 | **101** | Atteint |
| Fiches sanitaires et sociales | 24 | **24** | Atteint |
| Sujets rédigés commentés | 40 | **30** | **10 manquants** |
| Questions d’oral | 60 | **60** | Atteint |
| Relances d’oral | — | 127 | — |
| Examens blancs écrits | 12 | **12** | Atteint |
| Leçons publiées | — | 44 | — |
| Compétences couvertes | toutes | **68 / 68** | Atteint |

### Note sur les 300 exercices de calculs

Le cahier des charges demande de distinguer **structures d’exercices**,
**variantes générées** et **sujets rédigés**. Voici la distinction, appliquée
honnêtement :

- **110 structures** de problème distinctes. Chacune pose une question qu’aucune
  autre ne pose. Aucune n’est un doublon avec des nombres changés.
- **1 184 variantes distinctes vérifiées** : chaque structure a été générée sur
  12 graines différentes et chaque instance a été contrôlée automatiquement
  (énoncé complet, deux indices, explication alternative, correction pas à pas,
  réponse attendue effectivement acceptée, aucun piège coïncidant avec la bonne
  réponse). Le nombre de variantes réellement produisibles est bien supérieur.
- **Si « 300 exercices » désigne 300 structures distinctes, la cible n’est pas
  atteinte : il en manque 190.** Si elle désigne des énoncés vérifiés, elle est
  dépassée. Les deux lectures sont possibles ; c’est la première qui est la plus
  exigeante et c’est elle qui est retenue comme écart.

### Sujets rédigés : 30 sur 40

Les 30 sujets livrés comportent tous un corrigé de référence, d’autres réponses
recevables, une comparaison entre une copie faible et une copie solide, et un
barème sur 10. Les 10 manquants sont un écart de volume, pas de qualité.

---

## 3. Ce qui n’a pas été fait, et pourquoi

### Validation humaine des contenus

**Aucun contenu n’est marqué « validé par une personne ».** Les états de contrôle
utilisés sont :

- `teste-automatiquement` : couvert par les tests (tous les gabarits de calculs
  et micro-exercices de français) ;
- `relu-par-le-modele` : tests + relecture ligne à ligne par le modèle qui l’a
  écrit (leçons, fiches, sujets, questions d’oral, examens).

La mention « validé humainement » existe dans le code mais n’est posée nulle
part : elle demande un acte humain qui n’a pas eu lieu.

**Priorité absolue avant usage réel :** faire relire les 24 fiches sanitaires et
sociales et les 30 sujets rédigés par une personne du champ, en particulier
tout ce qui touche au droit (consentement, signalement, fin de vie, protection
de l’enfance) et à la description des rôles professionnels.

### Sources

Les fiches citent des sources institutionnelles (Santé publique France, HAS,
DREES, INSEE, Légifrance, Assurance maladie, CNSA, ministère) **sans date de
consultation**, parce qu’aucune n’a été consultée depuis l’application. Un test
automatique interdit qu’une date de consultation soit affichée
(`content.test.ts`, « ne prétendent jamais avoir consulté une source
aujourd’hui »).

Aucune fiche n’avance de chiffre précis : les contenus reposent sur des
mécanismes, pas sur des données qui devraient être datées et vérifiées.

### Hors ligne et installation mobile

Non implémentés, donc non promis. Il n’y a **pas** de service worker ni de
manifeste d’application. Après chargement, l’application fonctionne sans réseau
tant que l’onglet reste ouvert, mais ce n’est pas un mode hors ligne testé.

### Accès par Tailscale

`npm run tailscale` publie l’application sur le tailnet, et sur lui seul :
l’écoute est liée à la seule interface Tailscale, vérifié en constatant que
l’adresse LAN de la machine refuse la connexion. Rien n’est exposé sur
Internet ; `tailscale funnel` n’est jamais appelé.

Deux limites connues, à ce jour :

- **Le mode HTTPS demande d’activer « Serve »** sur le tailnet, ce qui est une
  action à faire dans la console d’administration Tailscale
  (<https://login.tailscale.com/admin/settings/features>). Tant que ce n’est
  pas fait, le script bascule sur un serveur HTTP sur le port 4180, qui
  fonctionne mais dont le terminal doit rester ouvert. **L’enregistrement audio
  facultatif de l’oral ne fonctionne qu’en HTTPS** : les navigateurs bloquent le
  micro sur une origine non sécurisée. Tout le reste fonctionne dans les deux
  modes.
- **Changer d’adresse remet la progression à zéro en apparence.** Le stockage
  est lié à l’origine (schéma + nom + port) : passer de `http://…:4180` à
  `https://…` présente une application vide sans rien effacer. L’application
  l’explique dans ses réglages, et la marche à suivre est l’export puis
  l’import.

Un service macOS optionnel (`app/scripts/prepa-ifsi.plist.example`) permet de
garder le mode HTTP disponible sans terminal ouvert. **Il n’est pas installé** :
les commandes figurent en tête du fichier. Il devient inutile dès que « Serve »
est activé.

### Correction automatique des textes rédigés

Volontairement absente. Une correction fondée sur des mots-clés produirait une
note fausse. Le mode livré fournit corrigé de référence, autres réponses
recevables, comparaison de copies et autoévaluation guidée, explicitement
indicative. Aucune analyse sémantique ni transcription audio n’est promise, car
aucun moteur n’est connecté.

### Enregistrement audio de l’oral

Fonctionne (`MediaRecorder`), avec accord explicite, réécoute et suppression,
mais **il n’est pas conservé après fermeture de la page** : l’enregistrement
vit dans l’onglet. L’interface le dit. La persistance dans IndexedDB n’a pas été
implémentée. Tout l’entraînement oral fonctionne sans micro.

### Dates d’épreuves

Aucune n’est affichée. L’application n’en connaît aucune et n’en invente aucune.
Les dates doivent être saisies dans « Ma candidature », avec leur source
officielle et leur date de vérification. Aucun compte à rebours, aucune
surveillance de site, aucun rappel automatique : ces mécanismes n’existent pas
dans le code, et rien ne les promet.

---

## 4. Ce qui reste à faire, par ordre de priorité

1. **Relecture humaine des contenus sanitaires et sociaux** (24 fiches) et des
   30 sujets rédigés. C’est le seul point qui conditionne un usage réel sans
   réserve. Marquer ensuite les contenus relus en `valide-humainement` dans leur
   champ `review`.
2. **Obtenir la notice locale** de l’institut visé, ainsi que la procédure
   universitaire de dispense du baccalauréat. Le message type est prêt dans
   « Ma candidature ». Saisir ensuite les dates confirmées dans l’application,
   avec leur source et leur date de vérification. Rien ne doit être déduit de
   la notice d’un autre institut ni d’une autre session.
3. **Vérifier l’article 12 de l’arrêté du 20 février 2026** sur Légifrance, dans
   sa version en vigueur, avant de considérer les seuils comme certains. Ils sont
   centralisés dans `src/engine/exam.ts` (`EXAM_RULES`) : une seule constante à
   modifier si le texte diffère.
4. **Compléter les 10 sujets rédigés manquants** pour atteindre 40. Le
   constructeur `task()` de `src/content/francais/sujets.ts` prend un objet
   littéral : ajouter un sujet ne demande de toucher à aucun composant.
5. **Étendre les structures de calculs** si l’on retient la lecture « 300
   structures ». Ajouter un fichier dans `src/content/calculs/` et l’enregistrer
   dans `src/content/calculs/index.ts` suffit : la matrice de couverture, les
   séances et les tests le prennent automatiquement en compte.
6. **Persistance des enregistrements audio** dans IndexedDB, si le besoin se
   confirme à l’usage.

---

## 5. Points de vigilance pour qui reprend le code

- **Ne jamais confier un calcul à un modèle.** Toute l’arithmétique passe par
  `src/engine/rational.ts`. Introduire un `Number` dans un calcul de correction
  réintroduirait les erreurs de flottant.
- **Un piège déclaré ne doit jamais coïncider avec la bonne réponse.** Le filet
  de sécurité `src/content/safety.ts` les retire à l’affichage, et le test de
  contenu échoue si un gabarit en produit un. Les deux doivent rester en place.
- **Un contenu non publiable ne doit pas alimenter les séances.** Le filtre est
  dans `registry.ts` (`PUBLISHABLE`). Ne pas le contourner.
- **Ne jamais annoncer une admission.** Un test vérifie qu’aucun message de
  `evaluateExam` ne contient de promesse de réussite.
- **Ne jamais écrire à la place de l’utilisatrice.** Un test vérifie qu’aucune
  trame d’oral ne contient de récit pré-rédigé.
- Le test de contenu (`src/content/content.test.ts`) est le garde-fou principal :
  il valide chaque gabarit sur douze graines. **Un contenu ajouté sans y passer
  n’est pas livrable.**

---

## 6. Ce qui n’a pas été testé

Pour être précis sur la portée des tests exécutés :

- **Testé automatiquement** : arithmétique, unités, lecture des réponses,
  diagnostic d’erreur, seuils d’examen, progression, construction de séance,
  migrations et import/export, validité de tous les contenus publiés, parcours
  navigateur sur deux tailles d’écran, navigation clavier, cibles tactiles,
  absence de débordement horizontal, absence d’erreur de console sur le parcours
  principal.
- **Vérifié manuellement** : rendu visuel sur Chrome à 1 280 px et à 360 px,
  lisibilité des schémas (le décalage des repères de la ligne de temps a été
  corrigé après constat visuel) ; accès par le nom Tailscale de la machine,
  parcours complet depuis ce nom, et confirmation que l’adresse LAN refuse la
  connexion.
- **Non testé** : lecteurs d’écran (VoiceOver, NVDA), Safari et Firefox,
  iOS et Android réels, impression sur papier depuis un navigateur, micro sur
  des appareils variés, comportement en cas de quota de stockage saturé, et
  le mode HTTPS de Tailscale — « Serve » n’étant pas activé sur ce tailnet, il
  n’a pas pu être exécuté.
- **Non démontré, et non démontrable ici** : l’efficacité pédagogique. Les
  parcours simulés prouvent que l’application fonctionne, pas qu’elle fait
  progresser. Cela demanderait un usage réel sur plusieurs semaines.
