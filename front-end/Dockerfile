# Stage 1: Build the React app
FROM node:20 as build

# Set environment variable to increase Node.js memory limit
ENV NODE_OPTIONS="--max-old-space-size=4096"

# Set the working directory in the container
WORKDIR /app

# Copy only package.json and package-lock.json to leverage Docker's caching mechanism
COPY package*.json ./

# Install all dependencies (including devDependencies)
RUN npm install --frozen-lockfile

# Copy the rest of the application files into the working directory
COPY . .

# Build the React app
RUN npm run build

# Stage 2: Serve the app
FROM nginx:alpine

# Copy the built app from the previous stage
COPY --from=build /app/build /usr/share/nginx/html

# Expose the port the app will run on
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
