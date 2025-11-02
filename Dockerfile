# 1. Imagen base (una versión de Node.js ligera)
FROM node:24-alpine

# 2. Directorio de trabajo dentro del contenedor
WORKDIR /app

# 3. Copia el package.json para instalar dependencias
COPY package.json ./
COPY package-lock.json ./

# 4. Instala las dependencias
RUN npm install

# 5. Copia el resto del código
COPY . .

# 6. Comando para iniciar la app
CMD ["npm", "run", "dev"]