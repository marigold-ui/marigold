---
'@marigold/cli': minor
'@marigold/docs': patch
---

feat: make CLI telemetry identifier-free, and document it in full

Telemetry stays on by default, but it no longer carries anything that can single out a machine, user, or session. This is what makes the opt-out default defensible under GDPR and ePrivacy: with no identifier there is no personal data to have a lawful basis for, and the CLI no longer stores an identifier on the user's device, which would otherwise require consent under ePrivacy Art. 5(3) / § 25 TDDDG.

- **Removed the `anonymousId`.** The persistent per-machine UUID is gone from the event payload, from `UserConfig`, and from the server schema. A stale value written by an older CLI is stripped on the next config read and erased from disk. The trade is deliberate: we can now count invocations, not people, and unique-user numbers come from public npm download counts instead.
- **Corrected the first-run notice.** It previously claimed that no arguments and no personal data were collected, while the event did carry `args` and a persistent UUID. The notice now states exactly what is sent and links to the new telemetry page.
- **Clamped `args`.** Enum flags are recorded as their validated value or as `invalid`, so a mistyped `--format=jsonn` is no longer echoed back verbatim. `--limit` is recorded only as a positive integer. Positionals (component name, example slug, `--category`) are only forwarded when they are identifier-shaped, and file paths collapse to `invalid`. Free-text search terms remain recorded as `used`.
- **Hour-granular timestamps, not expiry.** `receivedAt` is truncated to the hour, so events cannot be stitched back into per-session sequences by timing once the identifier is gone. That is also what lets events be kept for long-run usage trends rather than expiring: with no identifier in a record, an old event says no more about you than a new one. The reasoning is in the [telemetry endpoint README](https://github.com/marigold-ui/marigold/blob/main/docs/app/api/telemetry/README.md).
- **Strict event schema.** The endpoint rejects unknown top-level keys rather than stripping them, so a stale `anonymousId` gets a visible 400 instead of a silent drop. Keys inside `args` are bounded in length and count. The guarantee that no identifier is sent lives in the CLI, which builds `args` only from validated values.
- **Endpoint-wide rate limit only.** The former per-`anonymousId` quota is gone, since there is no longer a client identifier to key one on, which leaves the endpoint-wide ceiling as the CLI's only bound. That ceiling is a cost backstop, not a security control. Bounding a single misbehaving caller belongs behind WAF rate limiting, which needs no identifier in the body.
- **Full disclosure in the docs.** The `marigold telemetry` section of the [CLI page](https://www.marigold-ui.io/getting-started/cli#marigold-telemetry) now documents every field sent, what is never sent, why the default is opt-out, and every way to turn it off. It lives there rather than on a standalone privacy page, which nobody would navigate to. `marigold --help` links the anchor, so non-interactive users have a discoverable disclosure too.
