# Utilise l'image officielle de Bun
FROM oven/bun:latest

# Définir le répertoire de travail
WORKDIR /app


# Copier le reste de l'application
COPY . .

# Exposer le port de Vite
EXPOSE 80

# Supprimer node_modules s'ils existent déjà
# Installer les dépendances
# Commande pour démarrer Vite
CMD rm -rf node_modules && bun install && bun run dev
#CMD ["sh", "-c", "while :; do sleep 2073600; done"]
