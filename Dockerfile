# Usa Node.js come base
FROM node:18-alpine

# Imposta directory di lavoro
WORKDIR /app

# Copia package.json e package-lock.json
COPY package*.json ./

# Installa le dipendenze
RUN npm ci

# Copia tutto il codice
COPY . .

# Build dell'app
RUN npm run build

# Esponi la porta 4173 (default di vite preview)
EXPOSE 4173

# Avvia vite in modalità preview
CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0"]