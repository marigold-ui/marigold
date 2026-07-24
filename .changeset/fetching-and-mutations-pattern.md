---
'@marigold/docs': minor
---

docs(DST-1198): add Fetching and Mutations pattern for `@tanstack/react-query` + Marigold

Adds a new `Data` pattern group with a `Fetching and Mutations` page covering hook encapsulation, centralized query keys, the `isLoading` vs `useIsFetching` loading taxonomy, error handling and retries via `throwOnError` with an error boundary, toast feedback, optimistic updates, and destructive confirmation with `useConfirmation`. It also points to React Server Components and Server Actions as the alternative paradigm.

The `/examples/filter` reference app now fetches from a real stateless `/api/venues` route handler: search, filter, sort and pagination run on the server, the query key is derived from the existing URL (nuqs) state, and rows can be deleted with confirmation and optimistic updates. Deletions are tracked per visitor on the client so the demo stays isolated and resets on reload.
