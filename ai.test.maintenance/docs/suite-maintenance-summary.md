# Suite Maintenance Summary

**Scope:** `ai.test.maintenance/tests/` — all spec files  
**Date:** 2026-03-29  
**Status:** COMPLETED — consolidation applied, full suite green

---

## 1. Inventory (Before Consolidation)

| File | Location | Status |
|------|----------|--------|
| `playwright-site.spec.ts` | `tests/e2e/` | Healthy — unique scenarios |
| `main.navigation.spec.ts` | `tests/e2e/` | Degraded legacy — broken selectors, obsolete logic |
| `main.navigation.refactored.spec.ts` | `tests/` | Clean — full TC001 coverage |
| `main.navigation.professional.spec.ts` | `tests/` | Mostly clean — partial redundancy |

---

## 2. Issues Found

### 2.1 Broken Selectors

| File | Line | Issue |
|------|------|-------|
| `e2e/main.navigation.spec.ts` | 22 | `page.locator('h1')` — generic tag selector; breaks if heading tag changes |

### 2.2 Synchronization Anti-patterns

| File | Line | Issue |
|------|------|-------|
| `e2e/main.navigation.spec.ts` | 13 | `page.waitForTimeout(2000)` before an auto-retrying assertion — causes false passes on slow runners and wasted time on fast ones |

### 2.3 Redundant / Obsolete Scenarios

| Scenario | Present In | Verdict |
|----------|-----------|---------|
| Docs visibility | `e2e/main.navigation.spec.ts`, `refactored`, `professional` (loop) | **3× duplicate** |
| API visibility | `e2e/main.navigation.spec.ts`, `refactored` (loop), `professional` (loop + standalone edge-case) | **4× duplicate** |
| Docs navigation | `e2e/main.navigation.spec.ts`, `refactored`, `professional` | **3× duplicate** |
| API navigation | `refactored`, `professional` | **2× duplicate** |
| Community visibility | `refactored` (loop), `professional` (loop) | **2× duplicate** |
| Community navigation | `refactored` | Only once — kept |

### 2.4 Incomplete Coverage

| File | Missing Test |
|------|-------------|
| `e2e/main.navigation.spec.ts` | Community visibility & navigation (TC001 steps 5, 10) |

### 2.5 Structural Issues

| File | Issue |
|------|-------|
| `e2e/playwright-site.spec.ts` | POM instantiated inside each `test()` body instead of `beforeEach` |
| `PlaywrightHomePage.ts` | Redundant named locators (`docsNavLink`, `apiNavLink`, `communityNavLink`) alongside universal `getNavLink()` |

---

## 3. Consolidation Plan (Executed)

### Actions Taken

1. **Archived** `tests/e2e/main.navigation.spec.ts`, `tests/main.navigation.refactored.spec.ts`, `tests/main.navigation.professional.spec.ts` → `tests/archive/`
2. **Created** `tests/main.navigation.spec.ts` as the single canonical spec for TC-NAV-001
3. **Refactored** `tests/e2e/playwright-site.spec.ts` — POM instantiation moved to `beforeEach` with explicit `homePage: PlaywrightHomePage` type
4. **Cleaned** `src/pages/PlaywrightHomePage.ts` — removed redundant named locators; retained universal `getNavLink()` / `clickNavLink()` methods
5. **Updated** `playwright.config.ts` — added `testIgnore: '**/archive/**'` to exclude archived specs from runs

### Final File Structure

```
tests/
  e2e/
    playwright-site.spec.ts          ← title + get-started (2 tests)
  main.navigation.spec.ts            ← canonical TC-NAV-001 (6 tests)
  archive/
    main.navigation.spec.ts          ← archived legacy
    main.navigation.refactored.spec.ts ← archived
    main.navigation.professional.spec.ts ← archived
  manual/
    TC001-main-page-navigation-buttons.md
src/
  pages/
    PlaywrightHomePage.ts            ← clean POM (getNavLink, clickNavLink)
    InstallationPage.ts
```

---

## 4. Representative Diff — `main.navigation.professional.spec.ts`

Removed the 100% redundant standalone "edge case" API visibility test:

```diff
-  // --- Step 3: Edge Case Test ---
-  test('Verify navigation links are not obscured by other elements', async () => {
-    const link = homePage.getNavLink('API');
-    await expect(link).toBeVisible();
-    await expect(link).toBeEnabled();
-  });
```

Removed redundant inline `{ page: Page }` type annotations and unused `Page` import:

```diff
-import { test, expect, Page } from '@playwright/test';
+import { test, expect } from '@playwright/test';

-  test.beforeEach(async ({ page }: { page: Page }) => {
+  test.beforeEach(async ({ page }) => {
```

---

## 5. Final State Scorecard

| Metric | Before | After |
|--------|--------|-------|
| Active spec files | 4 | 2 |
| Total tests run | 14 | **8** |
| Duplicate scenarios | 8 | **0** |
| Fixed waits (`waitForTimeout`) | 1 | **0** |
| Brittle tag/positional selectors | 2 | **0** |
| TC001 coverage | Partial (3/6) | **Full (6/6)** |
| Suite result | — | **8 passed ✓** |

---

## 6. How to Run the Suite

```bash
npx playwright test
```


| File | Location | Status |
|------|----------|--------|
| `playwright-site.spec.ts` | `tests/e2e/` | Healthy — unique scenarios |
| `main.navigation.spec.ts` | `tests/e2e/` | Degraded legacy — broken selectors, obsolete logic |
| `main.navigation.refactored.spec.ts` | `tests/` | Clean — full TC001 coverage |
| `main.navigation.professional.spec.ts` | `tests/` | Mostly clean — partial redundancy |

---

## 2. Issues Found

### 2.1 Broken Selectors

| File | Line | Issue |
|------|------|-------|
| `e2e/main.navigation.spec.ts` | 22 | `page.locator('h1')` — generic tag selector; breaks if heading tag changes |

### 2.2 Synchronization Anti-patterns

| File | Line | Issue |
|------|------|-------|
| `e2e/main.navigation.spec.ts` | 13 | `page.waitForTimeout(2000)` before an auto-retrying assertion — causes false passes on slow runners and wasted time on fast ones |

### 2.3 Redundant / Obsolete Scenarios

| Scenario | Present In | Verdict |
|----------|-----------|---------|
| Docs visibility | `e2e/main.navigation.spec.ts`, `refactored`, `professional` (loop) | **3× duplicate** — keep only in one canonical spec |
| API visibility | `e2e/main.navigation.spec.ts`, `refactored` (loop), `professional` (loop + standalone edge-case test) | **4× duplicate** — standalone edge-case in `professional` is fully covered by its own data-driven loop |
| Docs navigation | `e2e/main.navigation.spec.ts`, `refactored`, `professional` | **3× duplicate** |
| API navigation | `refactored`, `professional` | **2× duplicate** |
| Community visibility | `refactored` (loop), `professional` (loop) | **2× duplicate** |
| Community navigation | `refactored` | Only once — keep |

### 2.4 Incomplete Coverage

| File | Missing Test |
|------|-------------|
| `e2e/main.navigation.spec.ts` | Community visibility & navigation (TC001 steps 5, 10) |

### 2.5 Structural Issues

| File | Issue |
|------|-------|
| `e2e/playwright-site.spec.ts` | POM instantiated inside each `test()` body instead of `beforeEach` — minor maintenance cost, no flakiness risk |

---

## 3. Consolidation Plan

### Recommended final state (3 files → 2 active + 1 archived)

```
tests/
  e2e/
    playwright-site.spec.ts          ← keep as-is (title + get-started, unique)
  main.navigation.spec.ts            ← CONSOLIDATION TARGET (see §4 diff)
  e2e/main.navigation.spec.ts        ← ARCHIVE / DELETE (degraded legacy)
  main.navigation.refactored.spec.ts ← ARCHIVE / DELETE (superseded)
  main.navigation.professional.spec.ts ← ARCHIVE / DELETE (superseded)
```

**Merge strategy for the canonical `main.navigation.spec.ts`:**

1. **Visibility block** — keep the data-driven `for` loop; add `toHaveAttribute('href', /.+/)` from `professional` for the extra navigability signal.
2. **Navigation block** — keep all three navigation tests (Docs, API, Community) from `refactored`.
3. **Docs content integrity** — keep `getByRole('heading', { level: 1 })` check from `professional` (stronger than checking a specific string).
4. **Remove** the standalone `'Verify navigation links are not obscured'` test from `professional` — already covered by the visibility loop.
5. **Remove** `waitForTimeout`, brittle `locator('h1')`, and the degraded comments from `e2e/main.navigation.spec.ts`.

**Net result:** 14 tests across 3 files → 7 tests in 2 files. Zero scenario coverage lost.

---

## 4. Representative Diff — `main.navigation.professional.spec.ts`

The standalone "edge case" test at the bottom is 100% redundant with the data-driven loop above it. Recommended removal:

```diff
-  // --- Step 3: Edge Case Test ---
-  test('Verify navigation links are not obscured by other elements', async () => {
-    const link = homePage.getNavLink('API');
-    // Verify the link is visible and enabled — sufficient to confirm it is interactable
-    await expect(link).toBeVisible();
-    await expect(link).toBeEnabled();
-  });
-
   /**
    * Edge Case: Verify correct target for API link
```

Additionally, the inline `{ page: Page }` type annotations in `beforeEach` and test callbacks are redundant when TypeScript can infer them from the Playwright fixture:

```diff
-  test.beforeEach(async ({ page }: { page: Page }) => {
+  test.beforeEach(async ({ page }) => {

-  test('Navigate to Docs and verify content integrity', async ({ page }: { page: Page }) => {
+  test('Navigate to Docs and verify content integrity', async ({ page }) => {

-  test('API link should target the latest API documentation schema', async ({ page }: { page: Page }) => {
+  test('API link should target the latest API documentation schema', async ({ page }) => {
```

The `Page` import can then be removed entirely:

```diff
-import { test, expect, Page } from '@playwright/test';
+import { test, expect } from '@playwright/test';
```

---

## 5. Summary Scorecard

| Metric | Current | After Consolidation |
|--------|---------|---------------------|
| Spec files | 4 | 2 |
| Total tests | 14 | 7 |
| Duplicate scenarios | 8 | 0 |
| Fixed waits (`waitForTimeout`) | 1 | 0 |
| Brittle tag selectors | 1 | 0 |
| TC001 coverage | Partial (3/6 in canonical file) | Full (6/6) |
