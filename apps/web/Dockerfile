FROM node:20-bookworm-slim AS base


# ==========================================
# Dependencies
# ==========================================
FROM base AS deps

WORKDIR /app

COPY package.json package-lock.json ./
COPY apps/web/package.json ./apps/web/package.json

RUN npm config set fetch-retries 10 \
    && npm config set fetch-retry-factor 2 \
    && npm config set fetch-retry-mintimeout 30000 \
    && npm config set fetch-retry-maxtimeout 180000 \
    && npm config set registry https://registry.npmjs.org/

RUN npm install --include=optional


# ==========================================
# Builder
# ==========================================
FROM base AS builder

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/apps/web/node_modules ./apps/web/node_modules

COPY . .

RUN ./node_modules/.bin/turbo run build --filter=web


# ==========================================
# Runner
# ==========================================
FROM base AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

RUN groupadd --system --gid 1001 nodejs \
    && useradd --system --uid 1001 nextjs

COPY --from=builder /app/apps/web/public ./apps/web/public

RUN mkdir -p apps/web/.next \
    && chown -R nextjs:nodejs apps/web/.next

COPY --from=builder --chown=nextjs:nodejs \
    /app/apps/web/.next/standalone ./

COPY --from=builder --chown=nextjs:nodejs \
    /app/apps/web/.next/static ./apps/web/.next/static

USER nextjs

EXPOSE 3000

CMD ["node", "apps/web/server.js"]
