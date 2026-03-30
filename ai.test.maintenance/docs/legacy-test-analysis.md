# Legacy Test Analysis — Navigation Tests

**Scope:** `tests/e2e/main.navigation.spec.ts` · `src/pages/PlaywrightHomePage.ts`  
**Reference:** TC001 — Main Page Displays Navigation Buttons  
**Date:** 2026-03-29  
**Status:** Analysis only — no code changes applied

---

## Summary

The two files were compared against the manual test case TC001 and Playwright best-practice guidelines. A total of **7 issues** were identified, spanning selector brittleness, synchronization anti-patterns, coverage gaps, and maintenance concerns. They are listed below in priority order.

---

## Prioritized Issue Checklist

### P1 — High: Flakiness / Correctness Risk

- [ ] **[SELECTOR-1] Brittle CSS positional selector for `docsNavLink`**  
  **File:** `PlaywrightHomePage.ts`, constructor  
  **Current:** `page.locator('.navbar__items > .navbar__item:nth-child(1)')`  
  **Problem:** Ties the locator to the DOM structure and child order. Any markup change (adding a new nav item, reordering, CSS class rename) silently targets the wrong element. The comment in the file itself flags this as brittle.  
  **Expected (TC001 step 3):** The button must be identified by its visible label "Docs".  
  **Classification:** Brittle selector — structural / positional

- [ ] **[SYNC-1] Fixed `waitForTimeout(2000)` before the Docs visibility assertion**  
  **File:** `main.navigation.spec.ts`, test "Docs navigation button is visible"  
  **Current:** `await page.waitForTimeout(2000);`  
  **Problem:** Hard-coded waits are the primary source of flakiness in Playwright suites. On a slow network the page may not be ready in 2 s; on a fast machine the 2 s is wasted. Playwright's `expect(locator).toBeVisible()` already retries automatically — the timeout adds nothing.  
  **Classification:** Synchronization anti-pattern — fixed timeout

---

### P2 — Medium: Coverage Gap vs. Manual Test Case

- [ ] **[COV-1] `Community` visibility test is missing**  
  **File:** `main.navigation.spec.ts`  
  **Problem:** TC001 steps 5 and 10 explicitly require verifying that "Community" is visible and navigates to `/community/`. The spec file contains no `Community navigation button is visible` test and no `Community button navigates to the community section` test.  
  **Classification:** Missing coverage — TC gap

- [ ] **[COV-2] `API` navigation test is missing**  
  **File:** `main.navigation.spec.ts`  
  **Problem:** TC001 steps 4 and 8 require verifying that "API" is visible and navigates to `/docs/api/`. Only the visibility test exists; the navigation test (`API button navigates to the API section`) is absent.  
  **Classification:** Missing coverage — TC gap

- [ ] **[COV-3] `clickGetStarted()` method exists in POM but has no corresponding test**  
  **File:** `PlaywrightHomePage.ts` / `main.navigation.spec.ts`  
  **Problem:** Minor dead POM surface in this spec context, but not a TC001 gap — listed for completeness.  
  **Classification:** Unused POM method

---

### P3 — Low: Maintenance Cost

- [ ] **[MAINT-1] Hard-coded absolute URL in `goto()` — breaks `baseURL` contract**  
  **File:** `PlaywrightHomePage.ts`, `goto()` method  
  **Current:** `await this.page.goto('https://playwright.dev/');`  
  **Problem:** `playwright.config.ts` sets `baseURL: 'https://playwright.dev'`. Using the absolute URL ignores this setting, so changing the target environment (e.g., staging) in the config has no effect on this page object. The correct form is `await this.page.goto('/');`.  
  **Classification:** Maintenance — config coupling broken

- [ ] **[MAINT-2] Missing `clickGetStarted()` and other click methods removed from POM**  
  **File:** `PlaywrightHomePage.ts`  
  **Current:** `clickApi()` and `clickCommunity()` are one-liners compressed as `async clickApi() { await this.apiNavLink.click(); }`, and `goto()` was previously `'/'`. The original `clickGetStarted` remains but there are no `goto()` / navigation helpers that return the target page object, making chaining or reuse across specs harder over time.  
  **Classification:** Maintenance — POM ergonomics

---

## Issue Summary Table

| ID | File | Category | Priority | Description |
|----|------|----------|----------|-------------|
| SELECTOR-1 | `PlaywrightHomePage.ts` | Brittle selector | **P1** | CSS positional locator for `docsNavLink` instead of role-based |
| SYNC-1 | `main.navigation.spec.ts` | Synchronization | **P1** | `waitForTimeout(2000)` before auto-retrying assertion |
| COV-1 | `main.navigation.spec.ts` | Coverage gap | **P2** | Community visibility + navigation tests absent (TC001 steps 5, 10) |
| COV-2 | `main.navigation.spec.ts` | Coverage gap | **P2** | API navigation test absent (TC001 steps 4, 8) |
| COV-3 | `main.navigation.spec.ts` | Coverage gap | **P3** | `clickGetStarted` in POM has no test in this spec |
| MAINT-1 | `PlaywrightHomePage.ts` | Maintenance | **P2** | Absolute URL in `goto()` bypasses `baseURL` config |
| MAINT-2 | `PlaywrightHomePage.ts` | Maintenance | **P3** | Compressed one-liner methods hurt readability/extensibility |

---

## Observations

1. **The most dangerous issue is SELECTOR-1 + SYNC-1 combined.** A CI run on a slow runner could see the Docs test produce a false positive (wait passes, the wrong element is visible) or a false negative (wrong element not visible after 2 s). Both happen silently.

2. **Coverage gap (COV-1, COV-2) means TC001 cannot be considered automated.** Only 1 of 6 pass/fail criteria from the manual test case is currently covered by a navigation test.

3. **MAINT-1 is a hidden time-bomb**: the test suite appears to respect environment config but does not. This is only discovered when someone tries to run tests against a staging URL.
