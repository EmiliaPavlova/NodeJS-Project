FROM node:8-slim

RUN mkdir /nodeApp
ADD . /nodeApp
WORKDIR /nodeApp

# Copy application to /nodeApp directory and install dependencies
COPY package.json /nodeApp
RUN npm install

# What should be executed when the Docker image is launching
CMD node index.js

# Binds to port 8008
EXPOSE 8008

# Creates a mount point
VOLUME [ "/nodeApp" ]

# https://www.youtube.com/watch?v=A8dErdDMqb0
# https://buddy.works/guides/how-dockerize-node-application
# https://medium.com/@nickpeleh/dockerizing-a-node-js-web-app-with-redis-and-postgresql-60ddc697b44