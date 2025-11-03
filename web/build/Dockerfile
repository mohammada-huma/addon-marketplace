FROM node:22-alpine AS build

WORKDIR /app

RUN apk add --no-cache git

COPY package*.json ./

RUN --mount=type=secret,id=GIT_AUTH_TOKEN,env=GITHUB_TOKEN \
    echo "//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}" > .npmrc && \
    echo "@huma-engineering:registry=https://npm.pkg.github.com" >> .npmrc

RUN npm ci
RUN npm install -g @angular/cli@latest

COPY . .

RUN npm run build:all && npm run build -- marketplace --configuration=production

FROM nginx:alpine

RUN rm -rf /usr/share/nginx/html/*

COPY --from=build /app/dist/marketplace/browser /usr/share/nginx/html
