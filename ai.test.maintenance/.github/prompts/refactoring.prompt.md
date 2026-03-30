Refactor and repair tests/main.navigation.spec.ts and src/pages/PlaywrightHomePage.ts using the analysis from docs/legacy-test-analysis.md as a guide.

Requirements:

Fix all P1/P2 issues: replace brittle CSS selectors with getByRole, remove waitForTimeout, and fix the hardcoded baseURL.

Complete Coverage: Add the missing tests for "API" and "Community" navigation (visibility + URL check).

Clean Code: Ensure there are no var declarations, use explicit types, and keep comments in English.

Output: Save the updated test as tests/main.navigation.refactored.spec.ts.

Do not just patch it — improve the structure to be professional and maintainable.