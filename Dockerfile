# Use an official Node runtime as a parent image
FROM node:16-alpine as build
# Set the working directory to /app
WORKDIR /app
# Copy the package.json and package-lock.json to the container
COPY package*.json ./
# Install dependencies
RUN npm install
# Copy the rest of the application code to the container
COPY . .
# Build the React app
RUN npm run build
# Use an official Nginx runtime as a parent image
FROM nginx:1.21.0-alpine
# Copy the ngnix.conf to the container
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Copy the React app build files to the container
COPY --from=build /app/dist /usr/share/nginx/html
# Expose port 80 for Nginx
EXPOSE 80
# Start Nginx when the container starts
CMD ["nginx", "-g", "daemon off;"]





# FROM node:14-alpine AS development
# ENV NODE_ENV development
# # Add a work directory
# WORKDIR /app
# # Cache and Install dependencies
# COPY package.json .
# RUN npm install
# # Copy app files
# COPY . .
# # Expose port
# EXPOSE 3000
# # Start the app
# CMD [ "npm", "start"]