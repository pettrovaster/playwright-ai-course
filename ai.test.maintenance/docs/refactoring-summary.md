# Refactoring Summary — Chapter 3

## Comparison: AI vs. Manual Improvements

| Feature | Degraded (Ch. 2) | AI-Refactored (Ch. 3) | Manual (Human) Improvement |
| :--- | :--- | :--- | :--- |
| **Selectors** | CSS `nth-child` (Brittle) | `getByRole` (Reliable) | Strictly typed `NavItem` unions |
| **Wait Strategy** | `waitForTimeout(2000)` | Auto-retrying assertions | Pre-click visibility assertions |
| **Maintenance** | Absolute URLs / Duplication | `baseURL` usage | Universal `clickNavLink` (DRY) |
| **Coverage** | Missing API/Comm tests | Full TC coverage | Added heading visibility checks |

## Reflection
The AI effectively handled the removal of fixed waits and fixed the broken selectors. However, the human decision to consolidate navigation methods into a single parameterized method (`clickNavLink`) significantly reduced the Page Object size and improved type safety, which AI didn't propose initially.