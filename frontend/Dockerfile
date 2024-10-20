# Dockerfile (in ./frontend)
FROM node:18

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the frontend files
COPY . .

# Expose the port for the frontend application
EXPOSE 3000

# Command to run the application
CMD ["npm", "start"]
