# El contexto de build es la RAIZ del workspace, no esta carpeta:
#   docker build -f analytics-service/Dockerfile -t analytics-service:0.1.0 .
# Hace falta porque el install de pnpm necesita el workspace completo.
# A diferencia de write y read, este servicio NO usa packages/db-schemas:
# tiene su propio schema en src/db/schema.ts, porque tiene su propia base.

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

# --- build ---
FROM deps AS build
COPY analytics-service ./analytics-service
RUN pnpm --filter analytics-service build

# --- runtime: install limpio sin devDependencies ---
FROM base AS runtime
ENV NODE_ENV=production
COPY pnpm-workspace.yaml pnpm-lock.yaml package.json ./
COPY packages/db-schemas/package.json ./packages/db-schemas/
COPY write-service/package.json ./write-service/
COPY read-service/package.json ./read-service/
COPY analytics-service/package.json ./analytics-service/
RUN pnpm install --frozen-lockfile --prod

COPY --from=build /app/analytics-service/dist ./analytics-service/dist

WORKDIR /app/analytics-service
USER node
CMD ["node", "dist/main.js"]
