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

# Build the frontend assets
RUN cd Client && npm ci --only=production && npm run build

# Expose the port your backend server listens on (default is 3000)
EXPOSE 7001

# Start the backend server
CMD ["npm", "start"]
