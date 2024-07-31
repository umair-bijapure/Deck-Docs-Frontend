# Use the official Node.js image
FROM node:22.3.0-bullseye-slim

# Create and change to the app directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY . .

# Install dependencies
RUN npm install

# Copy the rest of the application code

# Expose the frontend port
EXPOSE 3000

# Start the application
CMD ["npm","run", "dev"]
