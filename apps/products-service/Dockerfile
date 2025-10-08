# ---------- Stage 1: Builder ----------
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install all dependencies (including devDeps)
RUN npm install

# Copy source code
COPY . .

# Build NestJS project (creates dist/)
RUN npm run build


# ---------- Stage 2: Runner ----------
FROM node:20-alpine AS runner

WORKDIR /app

# Copy only package files
COPY package*.json ./

# Install only production dependencies
RUN npm install --only=production

# Copy built dist from builder stage
COPY --from=builder /app/dist ./dist

# Expose port
EXPOSE 3000

# Run app
CMD ["node", "dist/main.js"]
