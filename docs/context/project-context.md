# PROJECT_CONTEXT.md — Scalable Real Estate Platform (RentifyAI)

## 1) Project Identity
- **Name:** RentifyAI
- **Project URL:** [Localhost:3000](http://localhost:3000) (Production URL TBD)
- **Repo Root:** `/home/harun/block/rentifyai`
- **Scope:** This repository contains the Next.js frontend and NestJS backend for the property listing and booking platform.

## 2) Product Goal
Build a production-grade real estate ecosystem featuring:
- **Semantic Property Search**: AI-powered discovery via vector embeddings.
- **Geo-Spatial Filtering**: Precise location-based property matching.
- **Booking Lifecycle**: Atomic transaction-safe booking flow for properties.
- **Admin & Agent Portals**: Control planes for listing moderation, lead management, and analytics.

## 3) Current Technical Stack
- **Frontend**: Next.js (App Router), TypeScript, Tailwind CSS, Radix UI.
- **Backend**: NestJS (Modular Architecture), Prisma ORM.
- **Database**: PostgreSQL (planned for Supabase with pgvector and PostGIS).
- **Search/AI**: Elasticsearch (local) / Supabase Vector (planned).
- **Infrastructure**: Docker (planned/local) / Vercel (target).

## 4) Active Business-Critical Workstreams
1. **Database Reliability**: Resolving local PostgreSQL P1000 authentication blockers.
2. **Booking Integrity**: Ensuring the transaction logic in `BookingsService` is robust and type-safe.
3. **Marketplace Discovery**: Hardening search filters (Price, PropertyType, Status) to prevent "phantom properties" in results.
4. **Admin Moderation Flow**: Validating the end-to-end admin approval/rejection lifecycle.

## 5) Current Delivery Mode
- **Development**: Active local development on port 3000 (web) and 4000 (api).
- **Production**: Staging for Vercel deployment once database connectivity is stabilized.

## 6) Non-Negotiable Constraints
- Follow `AGENT_RULES.md` (to be renamed to `AGENTS.md`) for workspace scope.
- Follow global `GEMINI.md` as the technical constitution.
- **Database Strategy**: All multi-table writes must use `Prisma.$transaction`.
- **Search Safety**: Never use `SELECT *`; always use selective fields.

## 7) Source-of-Truth Documents (Read First)
1. `docs/context/architecture.md`
2. `docs/context/current-state.md`
3. `docs/context/known-issues.md`
4. `AGENT_RULES.md`

## 8) Engineering Quality Gates
- **Type Safety**: No `any` types in business-critical paths (Services/Controllers).
- **Verification**: All backend changes must be verified against `scripts/verify_admin_features.js`.
- **Migrations**: Append-only schema changes via Prisma.

## 9) Change Execution Protocol
For all task implementations, provide:
1. Current vs Desired state analysis.
2. Impact analysis on existing contracts.
3. Step-by-step implementation plan.
4. Final verification walkthrough.

## 10) Definition of Done (DoD)
- Module passes `npm run build`.
- No regression in admin verification suite.
- Error handling (GlobalExceptionFilter) active for all new routes.
- Context docs (`current-state.md`) updated.
