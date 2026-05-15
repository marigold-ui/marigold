---
'@marigold/components': minor
---

feat([DST-753]): `SectionMessage` exposes an `announce` prop and uses react-aria's `LiveAnnouncer` to notify assistive technology.

**What changed:**

- `<SectionMessage>` accepts a new `announce?: boolean` prop. When set, the message text is sent to a shared, always-mounted live region maintained by `@react-aria/live-announcer`. Priority is `polite` for `info` / `success` / `warning` and `assertive` for `error`.
- `announce` defaults to `true` for `variant="error"` and `false` for all other variants, preserving today's behavior for the common error case while letting consumers opt in for confirmations and informational updates.
- The wrapper element no longer carries `role="alert"` for the error variant. Announcements are now delegated to the singleton live announcer instead.
- Re-announcing the same message uses the React `key` pattern: pass a changing `key` to force a remount.

**Why:**

The previous implementation only announced the `error` variant, and it did so by adding `role="alert"` to a conditionally rendered element. Per the WAI-ARIA spec and MDN guidance, `role="alert"` should be on an element that already exists in the DOM before its content is injected, and it should not contain interactive elements. Marigold's `SectionMessage` violated both constraints (the alert was mounted together with its content, and it can contain close buttons and action links), making announcements unreliable on some screen reader / browser combinations.

The new implementation uses `@react-aria/live-announcer`, which maintains persistent polite and assertive live regions at the document root. This is the same mechanism used across React Spectrum and avoids the conditional-rendering and interactive-content pitfalls of inline `role="alert"`. It also unifies the API: opt in to announcement for any variant with a single prop.

**Migration:**

- Code relying on `getByRole('alert')` or `[role="alert"]` selectors to find rendered `SectionMessage` error nodes needs to be updated. The message text itself is still rendered as before; only the wrapper role is gone.
- Consumers who previously wrapped a dynamic `<SectionMessage>` in their own `<div role="status">` or `<div aria-live="polite">` can replace that wrapper with `<SectionMessage announce>`.
