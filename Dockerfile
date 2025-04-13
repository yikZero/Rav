FROM node:20-alpine AS base

LABEL maintainer="yikZero <i@yikzero.com>"
LABEL version="0.1.0"
LABEL description="Rav - Next.js Application"

RUN apk add --no-cache tzdata
ENV TZ=Asia/Hong_Kong
ENV NODE_ENV=production
ENV PORT=11300

RUN npm install -g pnpm

FROM base AS deps
RUN apk add --no-cache libc6-compat python3 make g++ vips-dev
WORKDIR /app

COPY package.json ./
COPY pnpm-lock.yaml ./
RUN pnpm i --frozen-lockfile --ignore-scripts=false

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED=1

RUN pnpm run build

FROM base AS runner
WORKDIR /app

ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_OPTIONS="--max-old-space-size=2048"
ENV PORT=11300
ENV HOSTNAME="0.0.0.0"

RUN chmod -R 755 /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE ${PORT}

CMD ["node", "server.js"]