FROM node:18-alpine As development

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

COPY . /usr/src/app

EXPOSE 3000

CMD [ "npm", "start" ]
