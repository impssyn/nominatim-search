FROM node:20 AS base
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

FROM base AS dev
WORKDIR /app
COPY . .
VOLUME ["/app"]
EXPOSE 5173 24678
CMD ["yarn", "dev"]

FROM base AS build
WORKDIR /app
COPY . .
RUN yarn build

FROM node:20 AS prod
WORKDIR /app
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY package.json ./
EXPOSE 3000
CMD ["node", "server.js"]
