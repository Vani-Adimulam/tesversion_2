# Use an official Node.js runtime as the base image
FROM node:18.15

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install backend dependencies
RUN npm ci --only=production

# Copy the backend code to the working directory
COPY . .

# Navigate to the frontend directory
WORKDIR /app/Client

# Install frontend dependencies and build the assets
RUN npm ci --only=production && npm run build

# Go back to the root directory
WORKDIR /app

# Change permissions of nodemon binary file
RUN chmod +x /usr/local/lib/node_modules/nodemon/bin/nodemon.js

# Expose the port your backend server listens on (default is 3000)
EXPOSE 7001

# Start the app
CMD ["npm", "run", "dev"]
