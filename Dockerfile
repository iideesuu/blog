FROM node:22-alpine AS build
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1

COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund

COPY . .
RUN npm run build && cp LICENSE out/LICENSE

FROM node:22-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=8080

COPY --chown=node:node server.mjs ./server.mjs
COPY --chown=node:node --from=build /app/out ./out

USER node
EXPOSE 8080

HEALTHCHECK --interval=10s --timeout=3s --retries=5 --start-period=5s \
  CMD wget -q -O /dev/null http://127.0.0.1:8080/ || exit 1

CMD ["node", "server.mjs"]
