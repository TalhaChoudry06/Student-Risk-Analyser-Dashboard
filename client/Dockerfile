# Use an official node image as the base image
FROM node:18

# Define build arguments for environment variables
ARG VITE_GOOGLE_CLIENT_ID
ARG VITE_REACT_APP_GOOGLE_CLIENT_SECRET

# Set environment variables during the build process
ENV VITE_GOOGLE_CLIENT_ID=${VITE_GOOGLE_CLIENT_ID}
ENV VITE_REACT_APP_GOOGLE_CLIENT_SECRET=${VITE_REACT_APP_GOOGLE_CLIENT_SECRET}

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on
EXPOSE 5173

RUN npm run build

# Command to run the application
CMD ["npm", "run", "dev"]
