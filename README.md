# url-shortener

Monorepo de aprendizaje: acortador de URLs con 3 microservicios NestJS independientes (cada uno con su propio `package.json`).

## Estructura

```
url-shortener/
├── write-service/       # NestJS app
├── read-service/        # NestJS app
├── analytics-service/   # NestJS app
└── README.md
```

## Servicios

| Servicio | Puerto | Descripción |
|---|---|---|
| `write-service` | 3001 | Creación de URLs cortas. Escribe en la base de datos y publica eventos al broker. |
| `read-service` | 3002 | Resolución/redirección de URLs cortas. Lectura con caché en Redis. |
| `analytics-service` | 3003 | Consumo de eventos de clicks desde el broker y agregación de métricas. |

Cada servicio tiene su `.env.example` con las variables que espera (sin valores).
