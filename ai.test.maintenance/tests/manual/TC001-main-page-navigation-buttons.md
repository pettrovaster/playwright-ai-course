# TC001 — Main Page Displays Navigation Buttons

## Summary
Verify that the Playwright main page displays the expected navigation buttons: **Docs**, **API**, and **Community**.

---

## Test Details

| Field         | Value                          |
|---------------|-------------------------------|
| Test ID       | TC001                          |
| Feature       | Navigation                     |
| Priority      | High                           |
| Type          | Manual                         |
| URL under test | https://playwright.dev/        |

---

## Pre-conditions

- A modern web browser (e.g., Chrome, Edge, Firefox) is installed and up to date.
- An active internet connection is available.
- No browser extensions that could block or modify page content are active.

---

## Test Steps

| # | Action | Expected Result |
|---|--------|-----------------|
| 1 | Open the browser and navigate to `https://playwright.dev/`. | The Playwright home page loads successfully without errors. |
| 2 | Observe the top navigation bar of the page. | A navigation bar is visible at the top of the page. |
| 3 | Look for a navigation item labeled **Docs**. | A clickable "Docs" link/button is present in the navigation bar. |
| 4 | Look for a navigation item labeled **API**. | A clickable "API" link/button is present in the navigation bar. |
| 5 | Look for a navigation item labeled **Community**. | A clickable "Community" link/button is present in the navigation bar. |
| 6 | Click the **Docs** navigation item. | The browser navigates to the Docs section (URL contains `/docs/`). |
| 7 | Navigate back to the home page (`https://playwright.dev/`). | The home page loads again. |
| 8 | Click the **API** navigation item. | The browser navigates to the API section (URL contains `/docs/api/`). |
| 9 | Navigate back to the home page (`https://playwright.dev/`). | The home page loads again. |
| 10 | Click the **Community** navigation item. | The browser navigates to the Community section (URL contains `/community/`). |

---

## Expected Results

- All three navigation buttons — **Docs**, **API**, and **Community** — are visible in the top navigation bar on the main page.
- Each button is clickable and navigates to its corresponding section.

## Actual Results

> _(Fill in during test execution)_

---

## Pass / Fail Criteria

| Condition | Result |
|-----------|--------|
| "Docs" button is visible | Pass / Fail |
| "API" button is visible | Pass / Fail |
| "Community" button is visible | Pass / Fail |
| "Docs" navigates correctly | Pass / Fail |
| "API" navigates correctly | Pass / Fail |
| "Community" navigates correctly | Pass / Fail |

**Overall result:** Pass / Fail

---

## Notes

> _(Any observations, environment details, or defect references)_
