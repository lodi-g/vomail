FROM node:12-alpine

ENV NODE_ENV prod

WORKDIR /usr/src/app
COPY package*.json ./

RUN npm i

COPY . .

EXPOSE 25
CMD ["npm", "start"]
