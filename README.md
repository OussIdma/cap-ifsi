# Prépa IFSI — Mon parcours vers infirmière

Application de préparation aux épreuves d’entrée en IFSI par la voie de la
formation professionnelle continue. Elle fonctionne sur téléphone et sur
ordinateur, sans compte, sans abonnement et sans appel à un service d’IA.

> ### ⚠️ Avertissement : contenus non relus par un professionnel
>
> Ce dépôt est publié comme **projet de démonstration technique**.
>
> Les contenus pédagogiques — en particulier les **24 fiches sanitaires,
> médico-sociales et sociales** et les **30 sujets rédigés** — ont été produits
> et relus par un modèle de langage, puis validés par des tests automatiques
> de forme. **Aucun n’a été relu par un professionnel de santé, un formateur
> IFSI ou un juriste.** Aucun contenu n’est marqué « validé humainement » dans
> le code, et rien ne le sera sans un acte humain réel.
>
> Les fiches citent des sources institutionnelles **sans date de consultation**,
> parce qu’aucune n’a été consultée depuis l’application : un test automatique
> interdit d’afficher une telle date.
>
> **Ne vous fiez pas à ces contenus pour préparer réellement un concours, ni
> pour une question de droit, de santé ou d’accompagnement**, sans les avoir
> fait vérifier. Les règles d’examen implémentées doivent elles aussi être
> revérifiées sur le texte en vigueur (voir la section 7) et la notice de
> l’institut visé prime sur tout.
>
> Le détail honnête de ce qui est testé, de ce qui ne l’est pas et de ce qui
> manque est dans [PASSATION.md](PASSATION.md).

---

## 1. Ouvrir l’application et commencer une séance

### Sur l’ordinateur où se trouve le code

```bash
cd app
npm install     # une seule fois
npm run dev
```

Ouvrez ensuite **http://localhost:5173** (Vite indique le port exact au
démarrage ; si 5173 est occupé, il en choisit un autre et l’affiche).

Puis, dans l’application :

1. trois questions facultatives, toutes passables : prénom, durée de séance
   (10, 20 ou 30 minutes), matière de départ ;
2. **« Commencer ma première séance »** ;
3. la séance s’enchaîne toute seule. Elle peut être arrêtée à tout moment : la
   réponse en cours de saisie est conservée.

### Depuis un téléphone, via Tailscale (recommandé)

```bash
cd app
npm run tailscale
```

La commande construit l’application si nécessaire, puis la publie **sur votre
tailnet uniquement** et affiche l’adresse à ouvrir. Elle fonctionne depuis
n’importe où, sans être sur le même Wi-Fi, tant que le Mac est allumé et
connecté à Tailscale.

Deux modes, choisis automatiquement :

| Mode | Adresse | Condition | Terminal à garder ouvert |
|---|---|---|---|
| **HTTPS** (`tailscale serve`) | `https://<machine>.<tailnet>.ts.net/` | « Serve » activé sur le tailnet | non |
| **HTTP** (repli) | `http://<machine>.<tailnet>.ts.net:4180/` | aucune | oui |

La commande affiche l’adresse exacte de votre machine au démarrage : elle la
lit dans Tailscale, il n’y a rien à configurer.

**Activer le mode HTTPS**, une seule fois, sur
<https://login.tailscale.com/admin/settings/features> : cochez l’émission de
certificats HTTPS, puis relancez `npm run tailscale`. L’adresse perd son numéro
de port et répond sans qu’aucun terminal ne reste ouvert.

Le mode HTTPS a un second intérêt : **l’enregistrement audio facultatif de
l’oral n’est possible qu’en HTTPS**, les navigateurs bloquant le micro sur une
origine non sécurisée. Tout le reste, y compris l’entraînement oral avec
minuteur, trame et autoévaluation, fonctionne dans les deux modes.

> **Attention en changeant d’adresse.** La progression est enregistrée par
> origine (schéma + nom + port). Passer de `http://…:4180` à `https://…`
> présente une application vide, sans rien effacer. Si vous avez déjà travaillé
> en HTTP : *Réglages → Exporter ma progression* avant de basculer, puis
> *Importer* sur la nouvelle adresse. Le plus simple reste d’activer le mode
> HTTPS avant de commencer à travailler.

Ce que la commande ne fait pas : elle n’écoute **que** sur l’interface
Tailscale — ni sur le Wi-Fi local, ni sur Internet. Une exposition publique
demanderait `tailscale funnel`, que le script ne lance jamais.

Options utiles :

```bash
npm run tailscale -- --build   # reconstruire avant de publier
npm run tailscale -- --http    # forcer le mode HTTP, sans tenter serve
npm run tailscale:stop         # arrêter la publication HTTPS
```

Pour garder l’adresse HTTP disponible sans terminal ouvert, un service macOS
optionnel est fourni, non installé : voir les instructions en tête de
`app/scripts/prepa-ifsi.plist.example`. Il est inutile si vous activez le mode
HTTPS.

### Depuis un téléphone, sur le même réseau Wi-Fi

Sans Tailscale :

```bash
cd app
npm run dev:lan
```

Vite affiche une ligne `Network: http://192.168.x.x:5173/`. C’est **cette**
adresse qu’il faut saisir dans le navigateur du téléphone, pas `localhost`, qui
désigne toujours l’appareil sur lequel on se trouve. Les deux appareils doivent
être sur le même réseau.

### Version installée sur le téléphone

Elle n’existe pas. L’installation en application mobile et le fonctionnement
hors ligne complet n’ont pas été implémentés ni testés : ils ne sont donc pas
promis. Après le premier chargement, l’application n’a plus besoin du réseau
pour fonctionner tant que l’onglet reste ouvert, mais ce n’est pas une garantie
de fonctionnement hors ligne.

### Mise en production

```bash
cd app
npm run build     # produit app/dist
npm run preview   # sert app/dist en local pour vérification
```

Le dossier `app/dist` contient des fichiers statiques : il peut être déposé sur
n’importe quel hébergement de fichiers. Le routage utilise des ancres (`#/`),
donc aucune réécriture d’URL n’est nécessaire côté serveur.

#### Hébergement sur Vercel

Le dépôt contient `app/vercel.json`. À la création du projet, un seul réglage
est à poser : **Root Directory = `app`**. Le reste est lu dans ce fichier
(framework Vite, `npm ci`, `npm run build`, sortie `dist`).

Le fichier pose aussi les en-têtes de sécurité. L’application ne chargeant
aucune ressource externe et n’émettant aucune requête réseau, la politique de
sécurité de contenu peut rester stricte :

```
default-src 'self'; script-src 'self'; connect-src 'self'; object-src 'none';
frame-ancestors 'none'; form-action 'none'
```

Deux exceptions, et leur raison :

- `style-src 'unsafe-inline'` : React pose des styles en attribut `style` ;
- `media-src blob:` : la réécoute de l’enregistrement audio facultatif de
  l’oral utilise une URL `blob:` locale. Rien n’est téléversé.

`Permissions-Policy` refuse caméra, position, paiement et USB, et **autorise le
micro sur l’origine elle-même** : sans cela, l’enregistrement facultatif de
l’oral serait bloqué même en HTTPS.

Une mise en ligne ne change rien au stockage : la progression reste dans le
navigateur de chaque appareil, et **une adresse différente présente une
application vide** (voir la section 5).

---

## 2. Commandes

| Commande | Ce qu’elle fait |
|---|---|
| `npm run dev` | Serveur de développement |
| `npm run dev:lan` | Idem, accessible depuis le réseau local |
| `npm run build` | Compilation TypeScript + construction de `dist` |
| `npm run preview` | Sert `dist` en local |
| `npm test` | Tests unitaires (moteur, contenus, stockage) |
| `npm run test:e2e` | Tests de parcours en navigateur réel (ordinateur + téléphone 360 px) |
| `npm run test:all` | Les deux |
| `npm run tailscale` | Publie l’application sur le tailnet Tailscale et affiche l’adresse |
| `npm run tailscale:stop` | Arrête la publication HTTPS |

Les tests de parcours démarrent eux-mêmes un serveur sur le port 4173.

---

## 3. Organisation du code

```
app/src
├── engine/        moteur : arithmétique exacte, unités, correction,
│                  progression, construction de séance, seuils d’examen
├── content/       tous les contenus pédagogiques, en données typées
│   ├── skills.ts  référentiel M01-M20, F01-F12, H01-H24, O01-O12
│   ├── calculs/   leçons + gabarits d’exercices
│   ├── francais/  leçons, micro-exercices, sujets rédigés
│   ├── sante/     24 fiches
│   ├── oral/      leçons de méthode + banque de questions
│   ├── exams/     examens blancs
│   └── registry.ts point d’entrée unique + matrice de couverture
├── store/         schéma des données, migrations, export/import
├── screens/       écrans
├── ui/            composants partagés (blocs, schémas, exercice)
└── design/        jetons de style et feuilles CSS
```

**Ajouter un contenu ne demande jamais de modifier un composant.** Un exercice
de calculs est un objet `ExerciseTemplate` ; une fiche est un objet
`HealthSheet` ; un sujet est un objet `WrittenTask`. Les composants ne
connaissent que ces types.

---

## 4. Ce que fait le moteur

- **Aucun calcul n’est confié à un modèle de langage.** Toute l’arithmétique
  passe par des rationnels exacts en `BigInt` (`engine/rational.ts`) : pas de
  flottant, donc pas de `0,1 + 0,2 = 0,30000000000000004`.
- **La virgule et le point sont acceptés** quand ils ne sont pas ambigus ; une
  écriture ambiguë (`1,750.5`) est refusée avec une explication.
- **L’unité compte** : une valeur juste dans une mauvaise unité n’est pas une
  réponse juste, et le message le dit.
- **Le diagnostic d’erreur n’est jamais inventé.** L’application ne propose une
  cause (virgule, unité, arrondi, opération, consigne) que lorsqu’elle est
  identifiable. Sinon elle affiche des étapes à vérifier.
- **Les exercices sont reproductibles** : un gabarit et une graine suffisent à
  retrouver le même énoncé et le même corrigé après un rechargement.

---

## 5. Données et vie privée

- Tout est enregistré **localement**, dans le navigateur de l’appareil utilisé.
- **Il n’y a aucune synchronisation** entre ordinateur et téléphone, y compris
  en passant par Tailscale : servir la même adresse ne partage pas les données,
  qui restent dans le navigateur de chaque appareil. Pour passer de l’un à
  l’autre : *Réglages → Exporter ma progression*, puis *Importer* sur l’autre
  appareil.
- Le navigateur peut effacer ces données (vidage de l’historique, navigation
  privée, espace insuffisant). L’application le dit dans les réglages.
- Aucun compte, aucun mot de passe, aucune mesure d’audience, aucun envoi vers
  un service extérieur.
- L’enregistrement audio de l’oral est facultatif, demandé explicitement, reste
  dans l’onglet et disparaît à la fermeture de la page. Tout fonctionne sans
  micro.
- Les fichiers importés sont validés champ par champ et affichés comme du
  texte : aucun HTML ni code n’est exécuté.

---

## 6. Ce que l’application ne fait pas

- Elle n’affiche **aucune date d’épreuve** qui n’a pas été confirmée par une
  source officielle et saisie dans « Ma candidature » avec sa source et sa date
  de vérification. Aucun compte à rebours n’est inventé.
- Elle ne conclut **jamais** à une éligibilité ou une inéligibilité, et ne
  transforme pas un soutien de l’employeur en financement acquis.
- Elle n’annonce **aucune probabilité de réussite** et n’écrit jamais
  « admission garantie ». Après un examen blanc, elle applique les seuils et
  s’arrête à « seuils atteints à cet entraînement ».
- Elle ne corrige pas automatiquement un texte rédigé. Une correction fondée sur
  des mots-clés donnerait une note fausse : l’application fournit un corrigé de
  référence, d’autres réponses recevables, une comparaison de copies et une
  autoévaluation guidée, explicitement indicative.
- Elle ne surveille aucun site, n’envoie aucun rappel et ne promet aucune
  notification : ces mécanismes n’existent pas dans le code.
- Elle n’écrit jamais une expérience professionnelle à la place de
  l’utilisatrice. Les trames d’oral sont des cases vides accompagnées d’une aide.

---

## 7. Référence réglementaire

Le format d’examen reproduit est celui décrit par l’**article 12 de l’arrêté du
20 février 2026**, tel que cité par le cahier des charges fourni :

- rédaction et questions sanitaires, médico-sociales et sociales : 30 minutes,
  sur 10 ;
- calculs simples : 30 minutes, sur 10 ;
- entretien : 20 minutes, sur 20 ;
- une note strictement inférieure à 8/20 à l’écrit **ou** à l’oral est
  éliminatoire ;
- le total doit atteindre 20/40 ;
- il n’existe **pas** de seuil éliminatoire indépendant de 4/10 par
  sous-épreuve.

Ces règles sont implémentées dans `engine/exam.ts` et couvertes par des tests.
**Elles doivent être revérifiées sur le texte en vigueur avant d’être utilisées
comme certitudes**, et la notice locale de l’institut prime pour tout ce qui est
organisation, calendrier et matériel autorisé.

---

## 8. Contenu livré

Chiffres calculés par l’application elle-même (`content/registry.ts`,
fonction `inventory()`), visibles dans *Réglages* et *Mes progrès* :

| Élément | Livré |
|---|---:|
| Compétences au référentiel | 68 |
| Leçons publiées | 44 |
| Structures d’exercices de calculs | 110 |
| Micro-exercices de français | 101 |
| Sujets rédigés commentés | 30 |
| Fiches sanitaires et sociales | 24 |
| Questions d’oral | 60 |
| Relances d’oral | 127 |
| Examens blancs écrits | 12 |
| Compétences entièrement couvertes | 68 / 68 |

Une compétence n’est comptée comme couverte que si elle possède une leçon, une
explication alternative, un exemple entièrement résolu, un exercice accompagné,
un exercice autonome et une application différente. Le détail est consultable
dans *Mes progrès → Couverture réelle des contenus*.

Les écarts restants par rapport aux cibles du cahier des charges sont documentés
dans [PASSATION.md](PASSATION.md).

---

## 9. Licence et réutilisation

Le **code** est publié sous licence [MIT](LICENSE) : réutilisable librement, y
compris commercialement, à condition de conserver la mention de copyright. Le
texte de la licence exclut toute garantie.

Les **contenus pédagogiques** (leçons, énoncés, corrigés, fiches, sujets,
questions d’oral) sont couverts par la même licence, avec une réserve qui n’est
pas juridique mais sérieuse : **ils n’ont été relus par aucun professionnel**
(voir l’avertissement en tête de ce fichier). Les reprendre tels quels dans un
outil présenté comme fiable ferait porter à quelqu’un d’autre un risque qui
n’est pas assumé ici. Faites-les relire d’abord.
