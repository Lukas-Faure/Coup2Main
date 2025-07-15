#!/bin/bash

echo "🗄️ INITIALISATION COMPLÈTE DE LA BASE DE DONNÉES"
echo "================================================"

# Supprimer l'ancienne base de données
echo "🧹 Suppression de l'ancienne base de données..."
rm -f dev.db
rm -f dev.db-journal

# Régénérer le client Prisma
echo "🔄 Régénération du client Prisma..."
npx prisma generate

# Créer les tables
echo "📋 Création des tables..."
npx prisma db push --force-reset --accept-data-loss

# Initialiser avec des données
echo "🌱 Ajout des données de test..."
node fix-db.js

echo ""
echo "✅ BASE DE DONNÉES INITIALISÉE AVEC SUCCÈS !"
echo "🚀 Vous pouvez maintenant lancer: npm run dev" 