---
'@marigold/cli': minor
'@marigold/docs': patch
---

feat: make CLI telemetry identifier-free, and document it in full

Telemetry stays on by default, but it no longer carries anything that can single out a machine, user, or session. This is what makes the opt-out default defensible under GDPR and ePrivacy: with no identifier there is no personal data to have a lawful basis for, and the CLI no longer stores an identifier on the user's device, which would otherwise require consent under ePrivacy Art. 5(3) / § 25 TDDDG.

- **Removed the `anonymousId`.** The persistent per-machine UUID is gone from the event payload, from `UserConfig`, and from the server schema. A stale value written by an older CLI is stripped on the next config read and erased from disk. The trade is deliberate: we can now count invocations, not people, and unique-user numbers come from public npm download counts instead.
- **Corrected the first-run notice.** It previously claimed that no arguments and no personal data were collected, while the event did carry `args` and a persistent UUID. The notice now states exactly what is sent and links to the new telemetry page.
- **Clamped `args`.** Enum flags are recorded as their validated value or as `invalid`, so a mistyped `--format=jsonn` is no longer echoed back verbatim. Positionals (component name, example slug, `--category`) are only forwarded when they are identifier-shaped. Free-text search terms remain recorded as `used`.
- **Hour-granular server timestamps.** `receivedAt` is truncated to the hour, so events cannot be stitched back into per-session sequences by timing once the identifier is gone.
- **90-day retention.** Stored events now expire; previously the daily list had no TTL and was kept indefinitely.
- **Strict event schema.** The endpoint rejects unknown keys rather than stripping them, so an identifying field can never be accepted quietly.
- **Global rate limit.** Replaces the former per-`anonymousId` quota, since there is no longer a client identifier to key on. This is a cost backstop, not a security control — abuse belongs behind WAF rate limiting.
- **Full disclosure in the docs.** The `marigold telemetry` section of the [CLI page](https://www.marigold-ui.io/getting-started/cli#marigold-telemetry) now documents every field sent, what is never sent, why the default is opt-out, and every way to turn it off. It lives there rather than on a standalone privacy page, which nobody would navigate to. `marigold --help` links the anchor, so non-interactive users have a discoverable disclosure too.
