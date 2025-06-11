FROM node:22.16.0-alpine3.22

RUN apk add bash
WORKDIR /app
RUN corepack enable && corepack install --global yarn@4.9.2
CMD yarn start
