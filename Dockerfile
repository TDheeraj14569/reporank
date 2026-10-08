FROM node:20-bookworm

# Install compilers and runtimes for all supported languages
RUN apt-get update && apt-get install -y \
    curl \
    python3 \
    python3-pip \
    python3-venv \
    golang-go \
    maven \
    openjdk-17-jdk \
    g++ \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Install uv (blazing fast Python runner)
RUN wget -qO- https://github.com/astral-sh/uv/releases/latest/download/uv-x86_64-unknown-linux-gnu.tar.gz | tar -xzf - -C /usr/local/bin --strip-components=1 uv-x86_64-unknown-linux-gnu/uv

# Alias python3 to python if needed
RUN ln -s /usr/bin/python3 /usr/bin/python || true

# Set up the working directory
WORKDIR /app

# Create a restricted user for sandboxed code execution
RUN useradd -m -s /bin/bash sandboxuser

# Install dependencies
COPY package.json package-lock.json* ./
RUN npm ci

# Copy the rest of the application
COPY . .

# Generate Prisma Client
RUN npx prisma generate

# Build the Next.js application
RUN npm run build

# Expose the port the app runs on
EXPOSE 3000

# Start the application and sync the database
CMD ["sh", "-c", "npx prisma db push --accept-data-loss && npm start"]
