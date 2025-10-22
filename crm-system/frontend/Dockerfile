# Stage 1: Build React app
FROM node:20-alpine AS build

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Build the React app (outputs to /app/build)
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine

# Copy build folder from previous stage
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
