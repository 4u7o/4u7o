FROM oven/bun:slim

WORKDIR /app

RUN apt-get update

RUN apt-get install -y \
    build-essential \
    libtool \
    automake \
    python \
    ffmpeg \
    && rm -rf /var/lib/apt/lists/*

COPY package.json bun.lockb /app/
RUN bun install --frozen-lockfile
COPY . .

USER bun

CMD ["bun", "start"]
