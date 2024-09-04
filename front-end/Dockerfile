# Use the official Node.js image as the base image with the LTS version for stability
FROM node:20

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

# Expose the port the app will run on
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
