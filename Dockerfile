FROM node:18-alpine As development

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

COPY . /usr/src/app

RUN npm run build

EXPOSE 3001

CMD [ "npm", "start" ]
