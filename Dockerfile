# Use an official Node.js runtime as the base image
FROM node:18.15

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install backend and frontend dependencies
RUN npm ci

# Copy the backend code to the working directory
COPY . .

# Build the frontend assets
RUN cd Client && npm ci && npm run build

# Expose the ports for both backend (7001) and frontend (3000)
EXPOSE 7001
EXPOSE 3000

# Start the app
CMD ["npm", "run", "dev"]
