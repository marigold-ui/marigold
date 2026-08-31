---
id: ADR-0006
status: accepted
date: 2026-08-31
applies_to:
  - 'docs/app/api/telemetry/**'
  - 'docs/app/mcp/**'
---

# 0006. Keep telemetry events indefinitely

## Context

Telemetry retention had been decided three different ways in three commits without
ever being written down, which is why it kept drifting:

- **DST-1264** introduced CLI telemetry with no retention policy at all. `telemetry:YYYY-MM-DD`
  lists accumulated, one key per day, forever.
- **DST-1475** added a 90-day `EXPIRE` to those lists, framed as fixing a "telemetry storage
  leak" — a bug fix rather than a policy choice.
- **DST-1625** replaced the daily lists with a single `telemetry:events` stream trimmed with
  `MINID ~` at 200 days. As a side effect this raised CLI retention from 90 to 200 days, which
  nobody decided and which survived a review round unnoticed. The commit immediately after it
  then documented retention as "indefinite", contradicting the code it shipped with.

So there was no prior decision to consult — only three incompatible implementations and a
README describing a fourth thing.

Two facts settled it. **The volume is negligible**: measured against the real store, roughly 35
events a day at ~250 bytes, about 3 MB a year. Storage was never the constraint, so the "leak"
framing had no cost behind it. And **the two event types are different classes of data**:

|               | `cli_command`                                                                               | `mcp_tool_call`                   |
| ------------- | ------------------------------------------------------------------------------------------- | --------------------------------- |
| Identifier    | `crypto.randomUUID()`, minted locally                                                       | HMAC-SHA256 of a Keycloak `sub`   |
| Personal data | No — the UUID is tied to nothing                                                            | Yes — pseudonymous, not anonymous |
| Opt-out       | `DO_NOT_TRACK`, `MARIGOLD_TELEMETRY_DISABLED`, CI suppression, `marigold telemetry disable` | None                              |

Only `mcp_tool_call` makes retention a question. For `cli_command` there is no personal data to
bound. The stream refactor put both under one policy, so the policy has to be chosen knowing
that.

## Decision

**Telemetry events are retained indefinitely. `record.ts` must not put a TTL on
`telemetry:events`, and must not pass a `trim` option to `XADD`.** Rate-limit keys keep their
24h TTL; that is unrelated to retention.

This applies to both event types. It reverses DST-1475's 90-day TTL.

Retaining `mcp_tool_call` indefinitely is accepted on the basis that `marigold-docs` is a
Reservix-internal tool, its callers are Reservix employees, and what is recorded is which doc
pages were searched — not query text and not similarity scores. **No DPO review was sought.**
That is a judgement, not a ruling.

**If this store ever holds data about anyone outside Reservix, this ADR must be revisited**
before that happens, along with the absence of an MCP opt-out.

## Alternatives rejected

**A bounded window (200 days, or 5 years).** 200 was chosen originally to clear the 180 days
Insights needs — a 90-day view whose KPI deltas compare against the preceding 90. It was
rejected for two reasons. It creates a cross-repo constraint with nothing enforcing it:
`RETENTION_DAYS` lives in this repo, the window depending on it lives in
[Insights](https://github.com/marigold-ui/insights), and widening Insights' range doesn't fail
anything here — it silently truncates the tail, which reads as a drop in usage rather than an
error. Removing the trim removes that failure mode entirely. Second, the asymmetry runs one
way: keeping data preserves the option to trim later, trimming destroys the option to keep.
A longer window (5 years) only postpones the same problem while still needing a number nobody
can justify.

**Keeping raw events bounded and rolling up aggregates for all-time trends.** This is what
Insights already does for Trends via the scanner and Blob, so there is precedent. Rejected as
over-engineering for the actual stakes: it is a whole additional subsystem to avoid 3 MB a
year, and until it exists, trimming means permanently losing the history it is meant to
preserve.

**Rotating `MCP_TELEMETRY_HASH_SECRET` quarterly** to break cross-period linkability while
keeping everything. Not rejected on the merits — it remains the right move if the privacy
position ever needs strengthening, and it is the mechanism that actually addresses
linkability, since retention does not. Deferred because the internal-tool basis above was
judged sufficient. Worth reaching for before reaching for a retention window.

**Different policies per event type** (keep `cli_command` forever, bound `mcp_tool_call`).
Defensible on the data classes above, and rejected on mechanics: `MINID` trims a stream
globally, so this needs either two streams or a separate cleanup job — real complexity to
bound the smaller half of a 3 MB-a-year dataset.

## Consequences

Insights can offer any window, including "All time", without coordinating a constant across
two repos. Jim's cross-repo drift finding on `RETENTION_DAYS` disappears with the constant.
`record.ts` gets shorter: `XADD` takes three arguments and there is no cutoff arithmetic.

What has to be lived with:

- **Growth is unbounded**, even if slow. At ~3 MB a year nothing needs watching for years, but
  "nothing caps this" is now true and should be re-checked if MCP usage grows by an order of
  magnitude, or if the event shape gets bigger.
- **~35 events/day is legitimate volume, which is not the same as the volume an attacker can
  produce.** `POST /api/telemetry` is unauthenticated and its per-caller quota keys on the
  request body's own `anonymousId`, so rotating that walks straight past it. Under the old
  layout the 90-day `EXPIRE` reclaimed such writes automatically; nothing does now. This
  decision therefore depends on the per-IP quota in `route.ts`, keyed on an address the caller
  does not choose — **removing that quota re-opens unbounded growth and must not be done while
  this ADR stands.** `MAXLEN ~` was considered as the mitigation instead and rejected: it
  evicts the _oldest_ entries, so a flood would push out exactly the history this decision
  exists to keep.
- **A trusted caller can still loop.** With nothing expiring, a runaway agent hammering
  `search_docs` is the remaining unbounded writer, which is why the MCP quota is raised to
  10k/day rather than removed.
- **A per-employee record of doc searches persists indefinitely**, re-identifiable by anyone
  holding both Redis read access and `MCP_TELEMETRY_HASH_SECRET`. Treat that secret as a
  credential. This is the part of the decision most likely to be questioned later, and the
  reason the revisit condition above is binding rather than advisory.
- **`record.test.ts` asserts the absence of a trim**, because a stray `trim` option would
  silently start dropping the tail and the symptom — a dip in historical usage — does not look
  like a bug.
