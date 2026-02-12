---
"@marigold/docs": patch
---

docs(DST-1202): Improve filter code examples

# Description

Simplify the filter pattern example by replacing the Zod-based JSON-in-URL approach with nuqs' built-in typed query state
parsers (`useQueryStates`).

**Key changes:**
- Replace `parseAsJson` + Zod schemas with individual `nuqs` parsers (`parseAsInteger`, `parseAsArrayOf`, `parseAsString`)
via `useQueryStates` — each filter field gets its own query parameter instead of a single `?filter={...}` blob
- Remove all Zod dependencies and the manual `getFormData`, `toFormSchema`, `toUrlSchema` transform pipeline
- Simplify the `FilterForm` to work directly with the `VenueFilter` type instead of a separate form schema
`onSubmit`/`onClear`
- Fix capacity filter logic (`venue.capacity < filter.capacity` instead of `filter.capacity < venue.capacity`)
- Clean up the `toDisplayValue` from an object of typed functions to a single switch-based function
