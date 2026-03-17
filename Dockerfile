# Этап 1: Сборка
FROM node:20-alpine AS build

RUN apk update && apk add --no-cache \
    build-base \
    gcc \
    autoconf \
    automake \
    zlib-dev \
    libpng-dev \
    vips-dev > /dev/null 2>&1

WORKDIR /opt/app

COPY package.json yarn.lock ./
RUN yarn config set network-timeout 600000 && yarn install

COPY . .
RUN ADMIN_JWT_SECRET=dummy_secret API_TOKEN_SALT=dummy_salt APP_KEYS=dummy,keys \
    yarn strapi ts:generate-types
RUN yarn build

# Этап 2: Финальный образ
FROM node:20-alpine
RUN apk add --no-cache vips-dev
WORKDIR /opt/app

COPY --from=build /opt/app/node_modules ./node_modules
COPY --from=build /opt/app ./

ENV NODE_ENV=production
EXPOSE 1337
CMD ["yarn", "start"]