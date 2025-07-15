#!/bin/bash

echo "🧹 Nettoyage de Coup2Main..."

# Arrêter et supprimer les conteneurs
echo "🛑 Arrêt des conteneurs..."
docker stop coup2main-dev 2>/dev/null || true
docker rm coup2main-dev 2>/dev/null || true

# Supprimer les images
echo "🗑️  Suppression des images..."
docker rmi coup2main 2>/dev/null || true

# Supprimer les volumes
echo "💾 Suppression des volumes..."
# Si des volumes nommés spécifiques sont utilisés, les lister ici.
# Pour l'instant, on suppose que les volumes sont liés au conteneur supprimé.
# Si des volumes persistants sont créés, ils devraient être supprimés manuellement ou via des commandes spécifiques.

# Supprimer les fichiers de données locaux (optionnel)
read -p "Voulez-vous supprimer les données locales (base de données) ? (y/N) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "🗄️  Suppression des données locales..."
    rm -rf data/
    rm -f prisma/dev.db*
fi

echo "✅ Nettoyage terminé!" 