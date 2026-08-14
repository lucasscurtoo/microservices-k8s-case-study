# El contexto de build es la RAIZ del workspace, no esta carpeta:
#   docker build -f read-service/Dockerfile -t read-service:dev .
# Hace falta porque el servicio depende de packages/db-schemas.

FROM node:22-alpine AS base
RUN corepack enable && corepack prepare pnpm@10.13.1 --activate
WORKDIR /app

# --- deps: solo los manifiestos, para que Docker cachee el install ---
FROM base AS deps
COPY pnpm-workspace.yaml pnpm-lock.yaml package.json ./
COPY packages/db-schemas/package.json ./packages/db-schemas/
COPY write-service/package.json ./write-service/
COPY read-service/package.json ./read-service/
COPY analytics-service/package.json ./analytics-service/
RUN pnpm install --frozen-lockfile

# --- build: compila el paquete compartido y despues el servicio ---
FROM deps AS build
COPY packages/db-schemas ./packages/db-schemas
COPY read-service ./read-service
RUN pnpm --filter @url-shortener/db-schemas build
RUN pnpm --filter read-service build

# --- runtime: install limpio sin devDependencies ---
FROM base AS runtime
ENV NODE_ENV=production
COPY pnpm-workspace.yaml pnpm-lock.yaml package.json ./
COPY packages/db-schemas/package.json ./packages/db-schemas/
COPY write-service/package.json ./write-service/
COPY read-service/package.json ./read-service/
COPY analytics-service/package.json ./analytics-service/
RUN pnpm install --frozen-lockfile --prod

COPY --from=build /app/packages/db-schemas/dist ./packages/db-schemas/dist
COPY --from=build /app/read-service/dist ./read-service/dist

WORKDIR /app/read-service
USER node
CMD ["node", "dist/main.js"]
