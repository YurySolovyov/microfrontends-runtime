FROM node:20.9.0-alpine3.18

RUN apk add parallel

WORKDIR /app
CMD yarn start
