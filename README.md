# Coup2Main - Plateforme d'entraide de proximité

Une plateforme moderne permettant aux voisins de s'entraider au quotidien. Proposez ou demandez de l'aide dans votre quartier en toute sécurité.

## Fonctionnalités

- **Authentification** avec Google OAuth
- **Gestion des offres** : créer, modifier, supprimer des demandes et propositions d'aide
- **Filtrage avancé** : recherche par type, catégorie, ville
- **Messagerie** : communication entre utilisateurs
- **Gestion des rendez-vous** : planification et suivi des rencontres

## Technologies utilisées

- **Frontend** : SvelteKit + TypeScript
- **Base de données** : SQLite avec Prisma ORM
- **Authentification** : Auth.js (Google OAuth)
- **Styling** : TailwindCSS
- **Containerisation** : Docker

## Installation

### Avec Docker (recommandé)

1.  Assurez-vous d'avoir Docker et Docker Compose installés sur votre système.
2.  Clonez le repository :

    ```bash
    git clone <repository-url>
    cd Coup2Main
    ```

3.  Créez un fichier `.env` à la racine du projet en copiant l'exemple fourni. Il est essentiel que ce fichier soit présent et correctement configuré pour que l'application puisse démarrer.

    ```bash
    cp .env.example .env
    ```

    Éditez le fichier `.env` avec vos propres valeurs :

    -   `GOOGLE_CLIENT_ID` et `GOOGLE_CLIENT_SECRET` : obtenus depuis la Google Console
    -   `AUTH_SECRET` : une clé secrète pour Auth.js (par exemple, générée avec `openssl rand -base64 32`)
    -   `ENCRYPTION_KEY` : une clé de 32 caractères pour le chiffrement (par exemple, générée avec `openssl rand -hex 16`)

4.  Lancez l'application :

    ```bash
    chmod +x start.sh
    ./start.sh
    ```

    L'application sera accessible sur [http://localhost:5173](http://localhost:5173)

    Le script `start.sh` va construire l'image Docker, créer le conteneur, installer les dépendances Node.js et démarrer l'application. Si le fichier `.env` est manquant, le script vous en informera et vous fournira un exemple.

## Configuration Google OAuth

1.  Allez sur [Google Cloud Console](https://console.cloud.google.com/)
2.  Créez un nouveau projet ou sélectionnez un projet existant
3.  Activez l'API Google+
4.  Créez des identifiants OAuth 2.0
5.  Ajoutez les URIs de redirection autorisées :
    -   `http://localhost:5173/auth/callback/google` (développement)
    -   `https://votre-domaine.com/auth/callback/google` (production)

## Structure du projet

```
src/
├── lib/
│   ├── components/          # Composants Svelte réutilisables
│   ├── constants/           # Constantes globales
│   ├── models/              # Définitions des modèles de données (Prisma)
│   ├── schemas/             # Schémas (Zod)
│   ├── server/              # Fonctions et configurations côté serveur
│   ├── services/            # Services métier (logique applicative)
│   ├── stores/              # Stores Svelte (gestion d'état)
│   ├── types/               # Définitions de types TypeScript
│   └── utils/               # Fonctions utilitaires
├── routes/                  # Pages de l'application et API routes
│   ├── (app)/               # Pages de l'application
│   ├── api/                 # Endpoints API
│   ├── auth/signin/         # Pages d'authentification (connexion)
│   ├── +layout.server.ts    # Fichier de layout serveur SvelteKit
│   ├── +layout.svelte       # Composant de layout SvelteKit
│   └── +page.svelte         # Composant de page SvelteKit
├── app.css                  # Styles CSS globaux
├── app.d.ts                 # Déclarations de types pour SvelteKit
├── app.html                 # Template HTML principal de l'application
└── hooks.server.ts          # Hooks serveur SvelteKit
```

## Déploiement

### Avec Docker

```bash
docker build -t coup2main .
docker run -p 5173:5173 --env-file .env coup2main
```

### Nettoyage

Pour nettoyer les conteneurs et images Docker :

```bash
chmod +x cleanup.sh
./cleanup.sh
```
