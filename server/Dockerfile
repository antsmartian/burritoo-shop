# Use the official Node.js base image
FROM node:14

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json files to the working directory
COPY package*.json ./

# Copy the rest of the application code
COPY server/ /usr/src/app

# Install the dependencies
RUN npm install

# Expose the port on which your Express.js application listens
EXPOSE 3000


# Start the application
CMD ["npm", "start"]
