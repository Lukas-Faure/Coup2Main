#!/bin/bash

set -e  # Arrêter le script en cas d'erreur

echo "🗄️  Configuration complète de la base de données..."

# Supprimer l'ancienne base de données si elle existe
echo "🧹 Nettoyage de l'ancienne base de données..."
rm -f dev.db
rm -f dev.db-journal

# Régénérer le client Prisma avec le nouveau schéma
echo "🔄 Régénération du client Prisma..."
npx prisma generate

# Créer les tables avec force reset
echo "📋 Création des tables..."
npx prisma db push --force-reset --accept-data-loss

# Vérifier que les tables ont été créées
echo "🔍 Vérification des tables..."
npx prisma db execute --stdin <<EOF
.tables
EOF

# Créer les données de test
echo "🌱 Création des données de test..."
npm run db:seed

echo "✅ Base de données configurée avec succès !"
echo ""
echo "📊 Résumé :"
echo "   - Tables créées : users, offres, messages, rendezvous, accounts, sessions, verificationtokens"
echo "   - Données de test ajoutées"
echo ""
echo "🚀 Vous pouvez maintenant lancer l'application avec: npm run dev" 