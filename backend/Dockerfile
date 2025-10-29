# Use the official Node.js image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package files first (for Docker caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all backend source files
COPY . .

# Expose the port your server listens on
EXPOSE 5001

# Command to start the server
CMD ["node", "server.js"]
