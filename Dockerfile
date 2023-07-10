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

# Install nodemon globally
RUN npm install -g nodemon

# Navigate to the frontend directory
WORKDIR /app/Client

# Install frontend dependencies and build the assets
RUN npm ci --only=production && npm run build

# Go back to the root directory
WORKDIR /app

# Expose the ports your backend server and frontend assets listen on
EXPOSE 7001
EXPOSE 3000

# Set the environment variable for the base URL
ENV BASE_URL=http://13.234.48.54

# Start the app
CMD ["npm", "start"]
