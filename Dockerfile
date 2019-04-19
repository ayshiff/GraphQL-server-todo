FROM node:latest
WORKDIR /app
COPY package.json /app
RUN npm install
RUN npm install -g ts-node typescript nodemon
COPY . /app
EXPOSE 3000
CMD [ "npm", "start:ts" ]
