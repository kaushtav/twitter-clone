# Pull the Node image from Docker Hub
FROM node:14-slim

# Setting Working Directory
WORKDIR /usr/src/app

# Copying only package.json
COPY package*.json ./
COPY ./yarn.lock ./
# Install Dependencies
RUN npm install



# Copy rest of the code to container
COPY . .

EXPOSE 4000

# Run the API on Nodemon
CMD ["npm", "start"]