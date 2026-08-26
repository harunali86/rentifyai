# RentifyAI - Known Issues Tracker

> Last Updated: 2026-02-03
> Status: Verified by code review

---

## Critical (Blocking Core Flows)

### 1. Booking Status Flow Broken
**Status:** Confirmed  
**Impact:** Users cannot book any property  
**Location:** `apps/api/src/modules/bookings/bookings.service.ts:20`

**Problem:** Service requires `VERIFIED` status but admin only sets `PUBLISHED`
```typescript
if (property.status !== ListingStatus.VERIFIED) {
    throw new BadRequestException('Property is not available for booking yet');
}
```

**Fix Required:** Either change to accept `PUBLISHED` or add VERIFIED step in admin flow

---

### 2. Contact Unlock Not Working
**Status:** Confirmed  
**Impact:** Paid users still see masked contact info  
**Location:** `apps/api/src/modules/properties/properties.controller.ts:43-61`

**Problem:** `findOne` tries to use `req.user?.id` but no guard populates it
```typescript
@Get(':slug')
findOne(@Param('slug') slug: string, @Request() req: any) {
    return this.propertiesService.findOne(slug, req.user?.id); // req.user is ALWAYS undefined
}
```

**Fix Required:** Add `OptionalJwtAuthGuard` that populates user without blocking

---

### 3. Admin Delete Endpoint Missing
**Status:** Confirmed  
**Impact:** Admin cannot delete properties  
**Location:** `apps/api/src/modules/admin/admin.controller.ts:55-57`

**Problem:** Method has no route decorator
```typescript
async deleteProperty(@Param('id') id: string) {  // Missing @Post() or @Delete()
    return this.adminService.deleteProperty(id);
}
```

**Fix Required:** Add `@Post('properties/:id/delete')` decorator

---

## High (Filters/Search Broken)

### 4. ListingType Enum Mismatch
**Status:** Confirmed  
**Impact:** Search filters don't work correctly  
**Location:** Frontend `SearchFilters.tsx:16` vs Backend `schema.prisma:33-36`

**Problem:**
- Frontend sends: `FOR_SALE`, `FOR_RENT`, `SOLD`
- Backend expects: `SALE`, `RENT` (SOLD is a status, not type)

**Fix Required:** Update frontend to use `SALE`/`RENT` values

---

### 5. PropertyType Enum Mismatch
**Status:** Confirmed  
**Impact:** Agent property posting may fail validation  
**Location:** Frontend `agent/post/page.tsx:171-176` vs Backend `schema.prisma:17-22`

**Problem:**
- Frontend sends: `APARTMENT`, `VILLA`, `OFFICE`, `PENTHOUSE`, `PLOT`
- Backend expects: `RESIDENTIAL`, `COMMERCIAL`, `INDUSTRIAL`, `LAND`

**Fix Required:** Add mapping layer in frontend or update create-property action

---

### 6. Map Bounds Refresh Not Working
**Status:** Confirmed  
**Impact:** Search results don't update when panning map  
**Location:** `SearchClient.tsx:61` vs `MapWrapper.tsx:21`

**Problem:** Prop name mismatch
- Parent passes: `onBoundsChange={handleMapBoundsChange}`
- Child expects: `onBoundsUpdate` (and calls it on line 46)

**Fix Required:** Align prop names (use `onBoundsChange` everywhere)

---

## Medium (Admin Panel Issues)

### 7. Admin API Calls Missing Base URL
**Status:** Reported by Codex (not verified)  
**Location:** Admin pages calling API

**Problem:** Relative URLs being passed to `apiFetch` without base URL

---

### 8. Auth Storage Inconsistency
**Status:** Reported by Codex (Verified FALSE)  
**Evidence:** `localStorage` search returned 0 results, `httpOnly` cookies confirmed in `auth.ts`

**Conclusion:** This issue does NOT exist. Auth correctly uses httpOnly cookies.

---

## Low (Quality/Polish)

### 9. Favorites UI Incomplete
**Status:** Reported  
**Impact:** Heart icons don't persist state  
**Location:** `PropertyCard.tsx`, `FeaturedCarousel.tsx`

---

### 10. Simulated Metrics
**Status:** By Design  
**Items:** View counts, AI recommendations, Rentify Estimates are placeholder simulations
