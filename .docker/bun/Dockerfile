FROM oven/bun:slim as base

WORKDIR /app

# Install requirement dependencies
RUN apt-get update
RUN apt-get install -y \
    build-essential \
    libtool \
    automake \
    python \
    ffmpeg \
    && rm -rf /var/lib/apt/lists/*

# Install project packages
COPY package.json bun.lockb /app/
RUN bun install --frozen-lockfile
COPY . .

USER bun

CMD ["bun", "start"]