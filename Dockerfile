FROM node:22.12.0-alpine3.20

RUN apk add bash
WORKDIR /app
RUN corepack enable && corepack install --global yarn@4.5.3
CMD yarn start
