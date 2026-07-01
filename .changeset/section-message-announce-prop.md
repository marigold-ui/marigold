---
'@marigold/components': minor
'@marigold/system': minor
'@marigold/theme-rui': minor
---

feat([DST-753]): `SectionMessage` exposes an `announce` prop and uses react-aria's `LiveAnnouncer` to notify assistive technology.

**What changed (DST-753):**

- `<SectionMessage>` accepts a new `announce?: boolean` prop. When set, the message text is sent to a shared, always-mounted live region maintained by `@react-aria/live-announcer`. Priority is `polite` for `info` / `success` / `warning` and `assertive` for `error`.
- `announce` defaults to `true` for `variant="error"` and `false` for all other variants, preserving today's behavior for the common error case while letting consumers opt in for confirmations and informational updates.
- The wrapper element no longer carries `role="alert"` for the error variant. Announcements are now delegated to the singleton live announcer instead.
- Re-announcing the same message uses the React `key` pattern: pass a changing `key` to force a remount.

**Why:**

The previous implementation only announced the `error` variant, and it did so by adding `role="alert"` to a conditionally rendered element. Per the WAI-ARIA spec and MDN guidance, `role="alert"` should be on an element that already exists in the DOM before its content is injected, and it should not contain interactive elements. Marigold's `SectionMessage` violated both constraints (the alert was mounted together with its content, and it can contain close buttons and action links), making announcements unreliable on some screen reader / browser combinations.

The new implementation uses `@react-aria/live-announcer`, which maintains persistent polite and assertive live regions at the document root. This is the same mechanism used across React Spectrum and avoids the conditional-rendering and interactive-content pitfalls of inline `role="alert"`. It also unifies the API: opt in to announcement for any variant with a single prop.

**Additional cleanup bundled with this release (beyond DST-753):**

- **Close button now matches the rest of the system.** The previous theme defined a `close` slot for `SectionMessage` with bespoke overrides (`size-8`, `[&_svg]:size-6`, `text-foreground`, negative margins) that produced a visibly larger close button than every other close button in the design system. The component now renders the shared `<CloseButton>` with no overrides, so it gets the same 16px icon, focus ring, hover-opacity, and rounded-full styling as Dialog, Drawer, etc. The `close` slot has been removed from the `SectionMessage` theme type.
- **Component cleanup.** Dropped a stale `useButton(props, buttonRef)` call that was applying div-level props to a button, the unused `buttonRef`, and the `{...buttonProps}` spread on `<CloseButton>`. The `Button` inside `CloseButton` already provides all keyboard/press semantics.
- **Theme variant order normalized.** `info` (the default) is now listed first across the `container`, `content`, and `icon` slots in `theme-rui`, matching the variant table in the docs and the existing `defaultVariants` setting.

**Docs:**

- New anatomy SVG matching the Card / Sidebar / SelectList style; title and close button marked as optional, with content rules (no period in title, don't repeat title in body).
- Two realistic announcement demos: a bulk-archive form (polite, with RAC `validate` and the `key` re-announce pattern) and a server-availability save error (assertive).
- Added focus-management guidance for dynamic appearance and post-dismiss.
- Added form-summary placement rule pairing `<SectionMessage>` with field-level validation.
- Added action constraints (one primary action, verb+noun labels, descriptive link text).
- Added two-line body rule with a link-out overflow pattern for longer content.
- Folded the previous Position subsection into Usage; removed redundant Do/Don't tiles; renamed subsections to Dismissal / Actions / Announcements.
- Drive-by: typo fix in the `feedback-messages` pattern doc.

**Migration:**

- Code relying on `getByRole('alert')` or `[role="alert"]` selectors to find rendered `SectionMessage` error nodes needs to be updated. The message text itself is still rendered as before; only the wrapper role is gone.
- Consumers who previously wrapped a dynamic `<SectionMessage>` in their own `<div role="status">` or `<div aria-live="polite">` can replace that wrapper with `<SectionMessage announce>`.
- Custom themes that defined a `SectionMessage.close` slot will now see a type error. Remove the slot. Close button styling now flows entirely from the `CloseButton` theme.
- The SectionMessage's close button is visually smaller after this release (matches every other close button in Marigold). If you previously relied on the larger size, that was an inconsistency, not a feature.
