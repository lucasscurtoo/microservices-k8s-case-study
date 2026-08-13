# url-shortener

Monorepo de aprendizaje (pnpm workspaces): acortador de URLs con 3 microservicios NestJS independientes. Cada servicio tiene su propio `package.json`; las dependencias se instalan una sola vez en la raíz.

## Estructura

```
url-shortener/
├── package.json          # scripts raíz
├── pnpm-workspace.yaml   # workspaces
├── node_modules/         # compartido
├── write-service/        # NestJS app
├── read-service/         # NestJS app
├── analytics-service/    # NestJS app
└── README.md
```

## Uso

```bash
pnpm install                            # desde la raíz, instala todo
pnpm dev                                # levanta los 3 servicios en paralelo
pnpm --filter write-service start:dev   # levantar uno solo
```

## Servicios

| Servicio | Puerto | Descripción |
|---|---|---|
| `write-service` | 3001 | Creación de URLs cortas. Escribe en la base de datos y publica eventos al broker. |
| `read-service` | 3002 | Resolución/redirección de URLs cortas. Lectura con caché en Redis. |
| `analytics-service` | 3003 | Consumo de eventos de clicks desde el broker y agregación de métricas. |

Cada servicio tiene su `.env.example` con las variables que espera (sin valores).
