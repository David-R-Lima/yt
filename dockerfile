# Use official Node.js LTS base image
FROM node:22-slim as base

# Install ffmpeg and yt-dlp
RUN apt-get update && apt-get install -y \
    ffmpeg \
    curl \
    && curl -L https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp -o /usr/local/bin/yt-dlp \
    && chmod a+rx /usr/local/bin/yt-dlp \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

RUN npm i -g pnpm

FROM base AS dependencies

WORKDIR /app
COPY package.json pnpm-lock.yaml ./
COPY prisma ./prisma   

RUN pnpm install
RUN pnpm prisma generate

FROM base AS build

WORKDIR /app

COPY . .
COPY --from=dependencies /app/node_modules ./node_modules
COPY --from=dependencies /app/generated ./generated

RUN pnpm build
RUN pnpm prune --prod

FROM base AS deploy

WORKDIR /app
COPY --from=build /app/dist/ ./dist/
COPY --from=build /app/node_modules ./node_modules

CMD [ "node", "dist/main.js" ]