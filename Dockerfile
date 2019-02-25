#
# Dockerfile to define how the image will be built
#

# Define the base image that this image will build on top of
FROM node:current-alpine

# Set image meta information
LABEL version="1.0.0"
LABEL description="Date API"
LABEL author="Danial Khoshkhou"

# Set working directory for subsequent COPY, RUN and CMD operations
WORKDIR /date_api

# Copy all local files (excluding those specificed in .dockerignore) to working directory
COPY . .

# Execute the following to acquire NPM dependencies
RUN npm install --production

# Make ports accessible from outside the container when running
EXPOSE 80 443

# Start the application
CMD ["npm", "start"]
