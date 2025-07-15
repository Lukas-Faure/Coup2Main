# Configuration de Coup2Main

## Variables d'environnement

Créez un fichier `.env` à la racine du projet avec le contenu suivant :

```env
# Base de données
DATABASE_URL="file:./dev.db"

# Auth.js - Générez une clé secrète forte
AUTH_SECRET="your-secret-key-here-change-this-in-production"

# Google OAuth - Obtenez ces clés depuis Google Cloud Console
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# URL de l'application (important pour OAuth)
AUTH_TRUST_HOST=true
ORIGIN="http://localhost:5173"
```

## Configuration Google OAuth

Pour résoudre l'erreur `redirect_uri_mismatch`, suivez ces étapes :

### 1. Créer un projet Google Cloud

1. Allez sur [Google Cloud Console](https://console.cloud.google.com/)
2. Créez un nouveau projet ou sélectionnez un projet existant
3. Activez l'API Google+ ou Google Identity

### 2. Configurer OAuth 2.0

1. Dans le menu de navigation, allez à **APIs & Services** > **Credentials**
2. Cliquez sur **Create Credentials** > **OAuth 2.0 Client IDs**
3. Sélectionnez **Web application**
4. Ajoutez ces **URIs de redirection autorisées** :
   - `http://localhost:5173/auth/callback/google`
   - `http://localhost:5173/api/auth/callback/google`
5. Copiez le **Client ID** et **Client Secret**

### 3. Mettre à jour le fichier .env

Remplacez `your-google-client-id` et `your-google-client-secret` par vos vraies valeurs.

### 4. Générer une clé secrète

Pour `AUTH_SECRET`, générez une clé forte :

```bash
openssl rand -base64 32
```

## Démarrage rapide

1. Copiez le fichier `.env` avec vos vraies valeurs
2. Initialisez la base de données :
   ```bash
   ./init-database.sh
   ```
3. Démarrez l'application :
   ```bash
   npm run dev
   ```

## Problèmes courants

### Erreur 404 sur les détails d'offre

✅ **Résolu** - La page de détail d'offre a été créée

### Erreur redirect_uri_mismatch

- Vérifiez que les URIs de redirection sont correctement configurées dans Google Cloud Console
- Assurez-vous que l'URL correspond exactement (http vs https, port, etc.)
- Vérifiez que `ORIGIN` dans `.env` correspond à votre URL de développement

### Erreur TypeScript dans l'API

- Le problème vient du schéma Prisma qui nécessite `googleId`
- Solution temporaire : utiliser un utilisateur de test pour les nouvelles offres
- Solution permanente : mettre à jour le schéma pour rendre `googleId` vraiment optionnel
