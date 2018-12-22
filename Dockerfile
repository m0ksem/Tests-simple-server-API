FROM node:alpine

WORKDIR /app

COPY ./app .

RUN apk add yarn
RUN yarn install

CMD ["yarn", "start"]