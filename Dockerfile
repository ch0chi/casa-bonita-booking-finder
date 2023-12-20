FROM node:latest

RUN mkdir -p /usr/src/app/
WORKDIR /usr/src/app/
COPY ./src /usr/src/app/

ENV PATH /app/node_modules/.bin:$PATH

RUN npm install