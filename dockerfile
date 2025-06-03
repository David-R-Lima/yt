# Use official Node.js LTS base image
FROM node:22-slim

# Set working directory
WORKDIR /usr/src/app

# Install ffmpeg and yt-dlp
RUN apt-get update && apt-get install -y \
    ffmpeg \
    curl \
    && curl -L https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp -o /usr/local/bin/yt-dlp \
    && chmod a+rx /usr/local/bin/yt-dlp \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Install pnpm and nest
RUN npm install -g pnpm @nestjs/cli

# Copy only package manager files first for better layer caching
COPY package.json pnpm-lock.yaml ./

# Install production dependencies
RUN pnpm install --frozen-lockfile --prod

# Copy the rest of the app
COPY . .

# Build the app (ensure tsconfig/build script exists if needed)
RUN pnpm build

# Run the compiled output
CMD [ "node", "dist/main.js" ]
