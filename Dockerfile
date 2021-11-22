FROM node:12

WORKDIR /usr/src/app

COPY package*.json ./
COPY .env ./.env

RUN npm install

COPY . .

EXPOSE 5110
CMD [ "npm", "start" ]
