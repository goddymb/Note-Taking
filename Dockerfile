# Literature Notes — self-hosted
FROM node:22-alpine
LABEL org.opencontainers.image.source="https://github.com/goddymb/Note-Taking" \
      org.opencontainers.image.description="Literature Notes — structured note-taking for literature reviews"
RUN apk add --no-cache su-exec

ARG APP_VERSION=
ENV NODE_ENV=production \
    APP_VERSION=${APP_VERSION} \
    PORT=8080 \
    DATA_DIR=/data
WORKDIR /app

# PDF.js (the in-app PDF reader) and the interface fonts are installed at build time,
# so the running app needs no internet connection.
COPY package.json ./
RUN npm install --omit=dev --no-audit --no-fund && npm cache clean --force
COPY scripts ./scripts
RUN node scripts/install-fonts.js && npm cache clean --force

COPY server.js docker-entrypoint.sh ./
COPY public ./public

RUN chmod +x docker-entrypoint.sh && mkdir -p /data && chown -R node:node /data
VOLUME ["/data"]
EXPOSE 8080
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s CMD wget -qO- http://127.0.0.1:8080/healthz || exit 1
ENTRYPOINT ["./docker-entrypoint.sh"]
CMD ["node", "server.js"]
