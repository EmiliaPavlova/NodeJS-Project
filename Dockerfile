FROM node:8-slim

# Working directory for application
WORKDIR /app

# Copy application to /app directory and install dependencies
COPY package.json /app
RUN npm install
COPY . /app

# What should be executed when the Docker image is launching
CMD node index.js

# Binds to port 8008
EXPOSE 8008

# Creates a mount point
VOLUME [ "/app" ]

# https://www.youtube.com/watch?v=A8dErdDMqb0
# https://buddy.works/guides/how-dockerize-node-application
# https://medium.com/@nickpeleh/dockerizing-a-node-js-web-app-with-redis-and-postgresql-60ddc697b44