FROM node:22.12.0-alpine3.20

WORKDIR /app
COPY . .
RUN corepack enable && corepack install --global yarn@4.5.3
RUN yarn install
CMD yarn start
