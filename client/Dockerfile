# Pull the Node image from Docker Hub
FROM node:14-slim

# Setting Working Directory
WORKDIR /usr/src/app

COPY package*.json ./
COPY ./yarn.lock ./

# Install Dependencies
RUN yarn
ENV REACT_APP_BASE_URL=http://localhost:4000
# Copy rest of the code to container
COPY . .

EXPOSE 3000

# Run the React app
CMD ["yarn", "start"]