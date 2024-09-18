# Stage 1: Build the NestJS application
FROM node:18-alpine AS builder

# Set working directory inside the container
WORKDIR /app

# Install Python and build tools for bcrypt (node-gyp)
RUN apk add --no-cache python3 make g++ 

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Install bcrypt after copying the code to ensure it's compiled for the correct architecture
RUN npm rebuild bcrypt --build-from-source

# Build the application
RUN npm run build

# Stage 2: Setup the production environment
# FROM node:18-alpine

# Set working directory inside the container
# WORKDIR /app

# Copy only the built application from the previous stage
# COPY --from=builder /app/dist ./dist
# COPY --from=builder /app/package*.json ./

# Install only production dependencies
# RUN npm install --only=production

# Expose the port your NestJS app runs on
EXPOSE 3000

# Command to run the application
CMD ["npm", "run", "start:dev"]
