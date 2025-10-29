# Stage 1: Build the React app
FROM node:18 as build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Stage 2: Serve the build with Nginx
FROM nginx:alpine

# Copy the build output to Nginx's default directory
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80 for the frontend
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
