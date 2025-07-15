# Image de base avec Node.js
FROM node:18-slim

# Installer les dépendances système nécessaires
RUN apt-get update && apt-get install -y \
    openssl \
    ca-certificates \
    && rm -rf /var/lib/apt/lists/*

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers de dépendances
COPY package*.json ./
COPY prisma ./prisma/

# Installer les dépendances
RUN npm ci

# Copier le reste des fichiers
COPY . .

# Générer le client Prisma
RUN npx prisma generate

# Créer les répertoires nécessaires avec les bonnes permissions
RUN mkdir -p .svelte-kit && chmod 777 .svelte-kit

# Copier le script d'entrée et le rendre exécutable
COPY docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

# Exposer le port
EXPOSE 5173

# Point d'entrée du conteneur
ENTRYPOINT ["docker-entrypoint.sh"]
CMD ["bash"] 