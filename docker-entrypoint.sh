#!/bin/bash

echo "🔄 Réinitialisation et seeding de la base de données..."
npm run db:reset
echo "✅ Base de données prête !"

echo ""
echo "🎉 L'application Coup2Main est prête !"
echo "💻 Pour lancer l'application, exécutez la commande suivante dans ce terminal:"
echo "npm run dev"
echo ""
echo "🌐 Accédez à l'application via votre navigateur à l'adresse : http://localhost:5173/"
echo ""

# Exécuter la commande principale du conteneur (CMD dans Dockerfile)
exec "$@" 