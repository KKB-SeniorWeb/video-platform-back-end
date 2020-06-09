FROM node:latest
ENV NODE_ENV production
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm i --production --registry=https://registry.npm.taobao.org
COPY . .
EXPOSE 7001