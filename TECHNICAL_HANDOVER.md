# RentifyAI - Technical Architectural Handover

This document serves as the final architectural justification and technical guide for the production-hardened RentifyAI platform.

## 1. Core Architectural Pillars (The Manifesto)

The system has been refactored to comply with the **"Architectural Manifesto for Production-Grade Systems"**, focusing on three key metrics: **Security, Performance, and Resilience.**

### A. Infrastructure & Framework
- **Framework:** NestJS (Modular Backend) + Next.js (App Router Frontend).
- **Communication:** Standardized RESTful APIs versioned under `/api/v1`.
- **Justification:** Versioning ensures that future mobile app updates or third-party integrations do not break the existing ecosystem.

### B. Structural Integrity (The "Traffic Cop" Doctrine)
- **Controllers:** act purely as interface adapters. They handle routing, input validation (via DTOs and ValidationPipes), and nothing else.
- **Services:** encapsulate 100% of the business logic. 
- **Middlewares/Guards:** handle cross-cutting concerns (Auth, RBAC, Rate Limiting) globally, keeping core logic clean.

## 2. Technical Approach & Problem Solving

| Problem | Architectural Approach | Technical Implementation |
| :--- | :--- | :--- |
| **Inconsistent Data** | **Atomic Transactions** | Every write operation (e.g., creating a listing with multiple images) is wrapped in a `Prisma.$transaction`. If part of the save fails, the entire operation rolls back. |
| **Low Performance** | **Selective Fetching & Indexing** | Avoided `SELECT *`. Every query uses the `select` clause to fetch only required columns. Database-level indexes are active on `slug`, `city`, `price`, and `status`. |
| **API Scraping/DDoS** | **Throttling (Rate Limiting)** | Implemented `ThrottlerModule` (100 req/min limit) to prevent bot attacks and scraper exploitation. |
| **Silent Crashes** | **Global Exception Hook** | Implemented `AllExceptionsFilter` to catch all unhandled errors and return a standardized, clean JSON response (hiding raw stack traces). |
| **Asset Latency** | **Externalized Storage Ready** | Schema designed to support S3/CloudFront URLs, offloading asset delivery from the main application thread. |
| **Data Safety** | **Soft-Delete Strategy** | Implemented `deletedAt` logic. Public listings are filtered to exclude soft-deleted items, maintaining relational integrity for historic leads. |

## 3. Frontend Integration & UI/UX Strategy

The frontend has been rebuilt to ensure high-end aesthetic value combined with technical durability:
- **Advanced Discovery:** Integrated Radix UI Sliders and Popovers for "India-scale" property filtering (Price, Type, etc.).
- **Live Feedback Engine:** Integrated `sonner` for atomic feedback loops (Toasts) during server actions (Moderation, Posting).
- **Hardened State Management:** Uses `useActionState` and Server Actions to maintain a stateless, yet highly responsive UI with built-in loading spinners and optimistic-ready structures.

## 4. Scalability & Future Roadmap

The application is structured to handle massive traffic growth (India-scale) through horizontal scaling:
1. **Database:** Ready to migrate from SQLite to PostgreSQL RDS with connection pooling.
2. **Workers:** Designed for `BullMQ` integration to offload image processing and emails from the main event loop.
3. **Caching:** Modularized for `Redis` integration to cache frequent search queries (e.g., Home Page listings).

## 4. Maintenance & Compliance
- **Logging:** Structured JSON logs via `nestjs-pino` for direct integration with monitoring stacks (ELK/Grafana).
- **Documentation:** Interactive OpenAPI (Swagger) documentation available at `/api/v1/docs`.
- **Validation:** Strict class-transformer and class-validator enforcement on all DTOs.

---
**Architect's Note:** Every line of code added during the hardening phase aligns with high-traffic production standards. The platform is now secure, durable, and ready for deployment.
