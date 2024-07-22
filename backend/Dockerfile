# Utilise l'image officielle de Bun
FROM oven/bun:latest

# Définir le répertoire de travail
WORKDIR /app

# Copier le reste de l'application
COPY . .

# Exposer le port de l'application
EXPOSE 3000

# Commande pour démarrer l'application
CMD rm -rf node_modules && bun install && bun tsc && bun run start
