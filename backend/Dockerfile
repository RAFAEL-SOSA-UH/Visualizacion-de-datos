# Imagen base
FROM node:20

# Directorio de trabajo
WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar todo el backend
COPY . .

# Exponer puerto
EXPOSE 5000

# Comando por defecto
CMD ["node", "server.js"]
