# RentifyAI - Production Real Estate Platform

A scalable, high-performance real estate listing platform built with a modern tech stack.

## 🏗 Technology Stack (Strict)

- **Frontend:** Next.js 14+ (App Router), Tailwind CSS
- **Backend:** NestJS (Modular Architecture)
- **Database:** PostgreSQL (with PostGIS for Geo-search)
- **Search:** Elasticsearch 8.x (Geo-spatial & Full-text)
- **Infrastructure:** Docker, AWS (S3, CloudFront, ECS ready)
- **Language:** TypeScript (Strict Mode)

## 📂 Project Structure

This is a monorepo-style structure:

```bash
rentifyai/
├── apps/
│   ├── web/        # Next.js Frontend (User & Agent Client)
│   └── api/        # NestJS Backend (REST API)
├── infra/          # Infrastructure as Code
│   └── docker-compose.yml  # Local Dev (Postgres + Elastic)
├── rentifyai.env   # Global Environment Config
└── README.md
```

## 🚀 Getting Started

### 1. Prerequisites
- Node.js 18+
- Docker & Docker Compose
- PostgreSQL Client (optional)

### 2. Environment Setup
The project uses a unified environment file `rentifyai.env`.
Ensure you have configured it with your local credentials.

### 3. Start Infrastructure (DB + Search)
```bash
cd infra
docker-compose up -d
```

### 4. Run Development Servers
**Backend (API):**
```bash
cd apps/api
npm run start:dev
```

**Frontend (Web):**
```bash
cd apps/web
npm run dev
```

## 🧩 Core Features (Phase 1)
- [ ] **Auth:** Role-based access (User/Agent/Admin) via JWT.
- [ ] **Listings:** CRUD with Image Uploads (S3).
- [ ] **Search:** Elasticsearch Geo-spatial queries.
- [ ] **Dashboard:** Admin approval queue.

## ⚠️ Global Rules (See `MEMORY[user_global]`)
- **No generic data:** Use realistic Indian names/data.
- **Premium UI:** Rich aesthetics, no basic skeletons.
- **Scalability:** Code must support 50k+ listings logic.
