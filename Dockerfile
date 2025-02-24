FROM node:20-alpine AS base
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

FROM base AS dev
WORKDIR /app
COPY . .
VOLUME ["/app"]
EXPOSE 5173 24678
CMD ["yarn", "dev"]
