# ---------- Stage 1: Dependencies ----------
FROM node:20-alpine AS deps
WORKDIR /app

# Install dependencies using a clean install
COPY package*.json ./
RUN npm ci

# ---------- Stage 2: Builder ----------
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./
COPY --from=deps /app/node_modules ./node_modules

# Copy only necessary files
COPY tsconfig*.json ./
COPY src ./src

# Build NestJS project (creates dist/)
RUN npm run build


# ---------- Stage 3: Runner ----------
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

# Copy only package files
COPY package*.json ./

# Install only production dependencies
RUN npm ci --omit=dev

# Copy built dist from builder stage
COPY --from=builder /app/dist ./dist

# Expose port
EXPOSE 3000

# Run app
CMD ["node", "dist/main.js"]
