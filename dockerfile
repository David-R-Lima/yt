# Use official Node.js LTS base image
FROM node:22-slim AS base

# Install ffmpeg and yt-dlp
RUN apt-get update && apt-get install -y \
    ffmpeg \
    curl \
    && curl -L https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp -o /usr/local/bin/yt-dlp \
    && chmod a+rx /usr/local/bin/yt-dlp \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

RUN npm i -g pnpm

# Install dependencies and generate Prisma client
FROM base AS dependencies

WORKDIR /app

COPY package.json pnpm-lock.yaml ./               # copy package files
COPY prisma ./prisma                               # copy prisma folder

RUN pnpm install
RUN pnpm prisma generate

# Build the app
FROM base AS build

WORKDIR /app

COPY . .
COPY --from=dependencies /app/node_modules ./node_modules
COPY --from=dependencies /app/generated ./generated

RUN pnpm build
RUN pnpm prune --prod

# Copy generated Prisma client to dist for runtime
RUN mkdir -p dist/generated
RUN cp -r generated/prisma dist/generated/prisma

# Final deploy image
FROM base AS deploy

WORKDIR /app

COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules

CMD [ "node", "dist/main.js" ]
