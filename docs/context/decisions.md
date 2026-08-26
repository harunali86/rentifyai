# Architecture Decisions - RentifyAI

## ADR 1: Unified Project Context
- **Status**: Accepted
- **Context**: The project was using disparate documentation at the root level which didn't match the standardized memory protocol used in sibling projects like `do-pahiyaa`.
- **Decision**: Move all architectural and context documentation to `/docs/context/` to ensure consistency and improve AI context retrieval.
- **Impact**: All future state updates and architectural changes must be documented in this directory.

## ADR 2: Supabase Deployment Strategy (On Hold)
- **Status**: Proposed / On Hold
- **Context**: Local database connectivity issues (P1000) and missing Docker infrastructure.
- **Decision**: Pivot the production and staging databases to Supabase to leverage managed PostgreSQL with `pgvector` support.
- **Caveat**: Currently on hold per user request to resolve local context first.
