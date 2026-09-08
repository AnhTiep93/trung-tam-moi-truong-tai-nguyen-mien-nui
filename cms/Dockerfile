# syntax=docker/dockerfile:1

FROM node:20-alpine AS deps
RUN apk add --no-cache python3 make g++
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
RUN apk add --no-cache vips-dev
WORKDIR /app
ENV NODE_ENV=production

RUN addgroup --system --gid 1001 strapi \
  && adduser --system --uid 1001 strapi

COPY --from=builder --chown=strapi:strapi /app ./

USER strapi
EXPOSE 1337

CMD ["npm", "run", "start"]
