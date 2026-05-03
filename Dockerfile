# Use official Node.js image
FROM node:18-slim

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm install --production

# Bundle app source
COPY . .

# Expose port (Cloud Run uses PORT environment variable, usually 8080)
ENV PORT=8080
EXPOSE 8080

# Change your Express server to listen on process.env.PORT
CMD [ "node", "server.js" ]
