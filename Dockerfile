FROM node:boron

# Create app directory
WORKDIR /usr/src/app

COPY package.json .

# Bundle app source
COPY . .

EXPOSE 8080

RUN npm install
RUN npm start