# ---------- Stage 1: Dependencies ----------
FROM node:20-alpine AS deps
WORKDIR /app

# Copy package files
COPY package*.json ./

# Configure npm retry settings to prevent network timeouts on slow connections
RUN npm config set fetch-retries 5 \
 && npm config set fetch-retry-maxtimeout 120000 \
 && npm ci

# ---------- Stage 2: Builder ----------
FROM node:20-alpine AS builder
WORKDIR /app

COPY package*.json ./
COPY --from=deps /app/node_modules ./node_modules
COPY tsconfig*.json ./
COPY src ./src

# Build NestJS project (creates dist/)
RUN npm run build

# ---------- Stage 3: Runner ----------
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

COPY package*.json ./
COPY --from=deps /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

# Expose port
EXPOSE 50051

# Run app
CMD ["node", "dist/main.js"]
