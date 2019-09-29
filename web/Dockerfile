# Build stage
FROM node:12-alpine AS build

WORKDIR /usr/src/app
COPY package*.json ./

ARG REACT_APP_API_HOST
ARG REACT_APP_API_PORT
ARG REACT_APP_DOMAINS

RUN npm i

COPY . .

RUN npm run build

# Run stage
FROM nginx:stable-alpine

COPY --from=build /usr/src/app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
