FROM node:12-alpine

ENV NODE_ENV dev

WORKDIR /usr/src/app
COPY package*.json ./

RUN npm i

COPY . .

EXPOSE 3000
CMD ["npm", "run", "dev"]
