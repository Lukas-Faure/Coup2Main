#!/bin/bash

if ! command -v docker &> /dev/null; then
    echo "Error: Docker is not installed. Please install it to proceed." >&2
    exit 1
fi

if [ ! -f .env ]; then
    echo "Erreur : Le fichier .env est introuvable. Veuillez créer un fichier .env à la racine du projet." >&2
    echo "Exemple de contenu pour .env :" >&2
    echo "-------------------------------------" >&2
    echo "DATABASE_URL='file:./prisma/dev.db'"
    echo "AUTH_SECRET='VOTRE_CLE_SECRETE_AUTHJS'"
    echo "ENCRYPTION_KEY='VOTRE_CLE_DE_CHIFFREMENT_32_CHARS'"
    echo "GOOGLE_CLIENT_ID='VOTRE_ID_CLIENT_GOOGLE'"
    echo "GOOGLE_CLIENT_SECRET='VOTRE_SECRET_CLIENT_GOOGLE'"
    echo "AUTH_TRUST_HOST='true'"
    echo "ORIGIN='http://localhost:5173'"
    echo "NEXTAUTH_URL='http://localhost:5173'"
    echo "-------------------------------------" >&2
    exit 1
fi

docker stop coup2main-dev 2>/dev/null || true
docker rm coup2main-dev 2>/dev/null || true

docker build -t coup2main .

docker run -it \
  --name coup2main-dev \
  -p 5173:5173 \
  -v "$(pwd):/app" \
  --env-file .env \
  coup2main 