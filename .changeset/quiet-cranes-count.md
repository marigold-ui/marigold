---
'@marigold/docs': patch
---

docs(DST-1331): flesh out app-shell example pages with realistic content

Replaces the `PlaceholderPage` stand-in on the Analytics, Billing, General, Security, Teams, and Users routes with proper example screens built entirely from Marigold components. Each page uses `Panel` for page-level sections and reserves `Card` for repeating collection items (payment methods, active sessions, team cards, stat tiles). Removes the now-unused `PlaceholderPage` component.
