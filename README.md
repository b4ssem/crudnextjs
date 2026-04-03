# Portfolio SAE 401 — Next.js + MySQL + NextAuth

Application web de portfolio professionnel avec backoffice d'administration.
Developpée dans le cadre de la SAE 401 — BUT MMI.

**Stack :** Next.js 14 · Prisma · MySQL · NextAuth · MUI Toolpad

---

## Apercu

| Vue | URL |
|-----|-----|
| Portfolio public | `/` |
| Connexion admin | `/login` |
| Backoffice | `/admin` |

---

## Prerequis

- [Node.js](https://nodejs.org/) v18+
- [pnpm](https://pnpm.io/) — `npm install -g pnpm`
- Un serveur **MySQL** (local ou distant)

---

## Installation

### 1. Cloner le projet

```bash
git clone https://github.com/b4ssem/crudnextjs.git
cd crudnextjs
pnpm install
```

---

### 2. Creer la base de donnees MySQL

Se connecter a MySQL et executer :

```sql
CREATE DATABASE portfolio;
USE portfolio;
```

Puis creer les tables :

```sql
CREATE TABLE User (
  id        INT AUTO_INCREMENT PRIMARY KEY,
  email     VARCHAR(255) NOT NULL UNIQUE,
  password  VARCHAR(255) NOT NULL,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE About (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  name        VARCHAR(255) NOT NULL,
  title       VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  avatar      VARCHAR(500),
  cvUrl       VARCHAR(500),
  github      VARCHAR(500),
  linkedin    VARCHAR(500),
  email       VARCHAR(255)
);

CREATE TABLE Skill (
  id         INT AUTO_INCREMENT PRIMARY KEY,
  name       VARCHAR(255) NOT NULL,
  icon       VARCHAR(255),
  percentage INT DEFAULT 0,
  category   VARCHAR(255)
);

CREATE TABLE Project (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  title       VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  imageUrl    VARCHAR(500),
  githubUrl   VARCHAR(500),
  liveUrl     VARCHAR(500),
  tags        VARCHAR(500),
  createdAt   DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Experience (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  company     VARCHAR(255) NOT NULL,
  role        VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  startDate   VARCHAR(50) NOT NULL,
  endDate     VARCHAR(50),
  current     TINYINT(1) DEFAULT 0
);

CREATE TABLE Education (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  school      VARCHAR(255) NOT NULL,
  degree      VARCHAR(255) NOT NULL,
  field       VARCHAR(255),
  startDate   VARCHAR(50) NOT NULL,
  endDate     VARCHAR(50),
  description TEXT
);

CREATE TABLE Contact (
  id        INT AUTO_INCREMENT PRIMARY KEY,
  name      VARCHAR(255) NOT NULL,
  email     VARCHAR(255) NOT NULL,
  message   TEXT NOT NULL,
  `read`    TINYINT(1) DEFAULT 0,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

> **Alternative :** si vous preferez laisser Prisma creer les tables automatiquement,
> sautez cette etape et executez `npx prisma db push` apres l'etape 5.

---

### 3. Creer le compte administrateur

Le mot de passe doit etre hashe en bcrypt avant insertion.

**Etape 1 — Generer le hash :**

```bash
node -e "const b=require('bcryptjs'); b.hash('votre_mot_de_passe', 10).then(h => console.log(h))"
```

**Etape 2 — Inserer en base :**

```sql
INSERT INTO User (email, password)
VALUES ('admin@example.com', 'COLLER_LE_HASH_GENERE_ICI');
```

> Ne jamais inserer le mot de passe en clair dans la base.

---

### 4. Configurer les variables d'environnement

Creer un fichier `.env` a la racine du projet :

```env
# Connexion MySQL — adapter selon votre config
DATABASE_URL="mysql://root:@localhost:3306/portfolio"

# Cle secrete NextAuth (chaine aleatoire)
NEXTAUTH_SECRET="remplacer_par_une_chaine_aleatoire_longue"

# URL locale
NEXTAUTH_URL="http://localhost:3000"
```

**Adapter `DATABASE_URL` selon votre cas :**

| Configuration | DATABASE_URL |
|---------------|--------------|
| MySQL local sans mot de passe | `mysql://root:@localhost:3306/portfolio` |
| MySQL local avec mot de passe | `mysql://root:motdepasse@localhost:3306/portfolio` |
| XAMPP / WAMP | `mysql://root:@127.0.0.1:3306/portfolio` |
| AlwaysData | `mysql://user:mdp@mysql-user.alwaysdata.net:3306/user_portfolio` |
| Railway / PlanetScale | Utiliser l'URL fournie par la plateforme |

Pour generer un `NEXTAUTH_SECRET` :

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

---

### 5. Initialiser Prisma

```bash
npx prisma generate
```

---

### 6. Lancer le projet

```bash
pnpm dev
```

Le projet est accessible sur **http://localhost:3000**

---

## Utilisation

### Portfolio public
Accessible sans connexion sur `/`.
Le contenu affiche est gere entierement depuis le backoffice.

### Connexion admin
1. Aller sur `/login`
2. Entrer l'email et le mot de passe crees a l'etape 3

### Backoffice `/admin`
Sections disponibles :

| Section | Contenu |
|---------|---------|
| A propos | Nom, titre, description, avatar, liens GitHub/LinkedIn, CV |
| Competences | Nom, icone, pourcentage de maitrise, categorie |
| Projets | Titre, description, image, liens GitHub et Live, tags |
| Experiences | Entreprise, poste, description, dates |
| Formations | Ecole, diplome, domaine, dates |
| Messages recus | Messages envoyes via le formulaire de contact public |

---

## Structure du projet

```
portfolio-sae/
├── app/
│   ├── (auth)/login/         -> Page de connexion
│   ├── (admin)/              -> Backoffice (admin uniquement, protege)
│   │   ├── about/
│   │   ├── skills/
│   │   ├── projects/
│   │   ├── experiences/
│   │   ├── education/
│   │   └── contacts/
│   ├── api/                  -> Routes API REST (GET / POST / PUT / DELETE)
│   │   ├── auth/
│   │   ├── about/
│   │   ├── skills/
│   │   ├── projects/
│   │   ├── experiences/
│   │   ├── education/
│   │   └── contacts/
│   └── page.tsx              -> Portfolio public (Server Component)
├── components/
│   ├── admin/                -> Composants backoffice reutilisables
│   └── portfolio/            -> Composants du portfolio public
├── lib/
│   ├── prisma.ts             -> Instance client Prisma
│   └── auth.ts               -> Configuration NextAuth
├── prisma/
│   └── schema.prisma         -> Schema de la base de donnees
├── middleware.ts             -> Protection automatique des routes /admin
└── .env                      -> Variables d'environnement (a creer)
```

---

## Commandes disponibles

```bash
pnpm dev              # Lancer en mode developpement
pnpm build            # Compiler pour la production
pnpm start            # Lancer en production (apres build)
npx prisma studio     # Ouvrir l'interface visuelle de la BDD (port 5555)
npx prisma db push    # Creer ou mettre a jour les tables via Prisma
npx prisma generate   # Regenerer le client Prisma apres modif du schema
```

---

## Deploiement (Vercel)

Le projet est deploye sur Vercel. Pour redéployer :

```bash
git add .
git commit -m "message"
git push
```

Vercel redéploie automatiquement a chaque push sur `main`.

**Variables a configurer dans Vercel** (Settings -> Environment Variables) :
- `DATABASE_URL`
- `NEXTAUTH_SECRET`
- `NEXTAUTH_URL` — mettre l'URL de prod : `https://votre-projet.vercel.app`

---

## Realise par

- [Bassem MEGHICHE](https://github.com/b4ssem) — Partie 1 : Setup, authentification, routes API
- [Abdelouahab KHENENOU](https://github.com/Ains-off) — Partie 2 : Backoffice CRUD (MUI Toolpad)
- [Malo LE CAER](https://github.com/mlkr-pro) — Partie 3 : Portfolio public

SAE 401 — BUT MMI — 2025/2026
