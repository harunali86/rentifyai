# RentifyAI - AI Assistant Global Rules

> These rules apply to all AI coding assistants (Windsurf, Codex, VS Code, Copilot, Cursor) working on this project.

---

## 1. EXECUTION LOCK RULE (MANDATORY)

Before making ANY code changes, you MUST:

### Step 1: Understanding Check
Respond with **"What I have understood"** including:
- Current project state
- What exactly is changing
- What stays unchanged
- Any assumptions

### Step 2: Impact Analysis (for mid-project changes)
Add **"Impact of this change"** covering:
- What existing parts will break
- What needs refactoring
- What can be reused

### Step 3: Proposed Plan
Add **"How I plan to handle this change"** with:
- Step-by-step approach
- Order of operations
- What you will NOT touch

### Step 4: Permission Gate
End with: **"Do you want me to proceed with this plan?"**

**DO NOT execute until user replies "Proceed".**

---

## 2. ARCHITECTURE RULES (STRICT)

### Clean Architecture Doctrine
- **Controllers:** Traffic cops ONLY - routing + input validation via DTOs
- **Services:** 100% of business logic lives here
- **Guards/Middleware:** Auth, RBAC, Rate Limiting - nothing else

### Database Rules
- **Atomic Transactions:** Multi-table writes MUST use `Prisma.$transaction`
- **Selective Fetching:** Use `select` or `include` with only required fields, never fetch entire rows
- **Soft Deletes:** Use `deletedAt` for entities with relations
- **Indexing:** Add indexes for columns used in WHERE/ORDER BY clauses
- **Pagination:** All list endpoints MUST support `page` + `limit` with max 100 items

### API Standards
- **Versioning:** All routes under `/api/v1/`
- **Rate Limiting:** ThrottlerModule on all public endpoints (100 req/min default)
- **Error Handling:** Global Exception Filter, no raw stack traces in responses
- **Response Format:** Standardized JSON: `{ data, meta, error }`

---

## 3. SECURITY RULES (CRITICAL)

### Authentication
- **Token Storage:** httpOnly cookies ONLY, never localStorage for auth tokens
- **JWT:** Access token (15min) + Refresh token rotation
- **Password:** bcrypt with cost factor 12+

### Data Protection
- **PII Logging:** NEVER log passwords, tokens, phone numbers, Aadhaar, PAN
- **Secrets:** All secrets in `rentifyai.env`, never hardcode
- **CORS:** Allowlist only: `http://localhost:3000`, production domain

### File Uploads
- **Max Size:** 5MB per image, 50MB total per request
- **Allowed Types:** image/jpeg, image/png, image/webp only
- **Validation:** Verify MIME type server-side, not just extension

---

## 4. PERFORMANCE RULES

### Query Optimization
- **Pagination:** Max 100 items per page, default 20
- **Timeouts:** Database queries must complete in <5s
- **N+1 Prevention:** Use `include` for related data, avoid loops with queries

### Caching (Future)
- Frequent searches: Redis with 5min TTL
- Static data (cities, property types): In-memory cache

### Search Guardrails
- Geo-search: Max 50km radius
- Price range: Reasonable bounds to prevent full-table scans

---

## 5. OBSERVABILITY RULES

### Logging
- **Format:** Structured JSON via `nestjs-pino`
- **Context:** Include requestId, userId, path in every log
- **Levels:** ERROR for exceptions, WARN for business rule violations, INFO for requests

### Audit Trail
- Log all: Property status changes, User role changes, Booking state changes
- Include: Who, What, When, Previous value, New value

---

## 6. TESTING RULES

### Mandatory
- **Bug Fix = Test:** Every bug fix must include a regression test
- **Critical Paths:** Auth, Booking, Payment simulation must have E2E tests

### If Tests Cannot Run
- Explicitly mention in PR: "Tests skipped because [reason]"
- Add TODO comment in code with ticket reference

---

## 7. CONTENT RULES

### No Generic Data
- **NEVER** use: John Doe, Jane Smith, Lorem Ipsum, Acme Corp
- **USE:** Realistic Indian names (Rahul Sharma, Priya Patel, Amit Kumar)

### Form Placeholders
- Use descriptive placeholders: "Enter your full name"
- Demo data must look authentic for Indian market

---

## 8. PROJECT-SPECIFIC ENUMS

### ListingType (Backend → Frontend mapping)
```typescript
enum ListingType {
  SALE,   // Frontend: "For Sale" (NOT "FOR_SALE")
  RENT    // Frontend: "For Rent" (NOT "FOR_RENT")
}
```

### PropertyType (Backend → Frontend mapping)
```typescript
enum PropertyType {
  RESIDENTIAL,   // Frontend: Apartment, Villa, Penthouse
  COMMERCIAL,    // Frontend: Office
  INDUSTRIAL,
  LAND           // Frontend: Plot
}
```

### ListingStatus Flow
```
DRAFT → PENDING → PUBLISHED → VERIFIED → SOLD/RENTED
         ↑ Agent submits    ↑ Admin approves  ↑ Booking allowed
```

---

## 9. FILE STRUCTURE

```
rentifyai/
├── apps/
│   ├── api/           # NestJS Backend (Port 4000)
│   │   └── src/modules/   # Feature modules
│   └── web/           # Next.js Frontend (Port 3000)
│       └── src/app/       # App Router pages
├── infra/             # Docker configs
├── rentifyai.env      # Environment variables (GITIGNORED)
├── AGENT_RULES.md     # THIS FILE
├── PROJECT_CONTEXT.md # Full project context for AI
└── KNOWN_ISSUES.md    # Tracked bugs (see separate file)
```

---

## 10. ENVIRONMENT

| Service | URL | Notes |
|---------|-----|-------|
| Backend API | `http://localhost:4000/api/v1` | Swagger at `/api/docs` |
| Frontend | `http://localhost:3000` | Next.js App Router |
| Database | PostgreSQL 15 + PostGIS | Port 5432 |
| Search | Elasticsearch 8.x | Port 9200 |

---

## 11. BEFORE COMMITTING

1. `npm run lint` in both apps
2. `npm test` in apps/api
3. Test critical flows manually (auth, booking, search)
4. Update `DEVELOPMENT_LOG.md` if adding features
5. Check for console.log/debugger statements
