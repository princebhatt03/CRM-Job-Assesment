FROM node:20-alpine

WORKDIR /app

# Build tools for native modules like bcrypt
RUN apk add --no-cache python3 make g++

# Copy only package.json and package-lock.json first
COPY package*.json ./

# Install dependencies inside container
RUN npm install

# Copy source code
COPY . .

EXPOSE 5000

CMD ["node", "app.js"]
