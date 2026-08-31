# Telemetry recording

The shared write path for both telemetry sources: the `@marigold/cli` commands and the
`marigold-docs` MCP server's `search_docs` tool. The MCP side of the picture — what it records
per call and why the caller is pseudonymous — is in [`app/mcp/README.md`](../../mcp/README.md).

| File          | Holds                                                                             |
| ------------- | --------------------------------------------------------------------------------- |
| `schema.ts`   | One discriminated union over `cli_command` and `mcp_tool_call`                    |
| `commands.ts` | The CLI command enum, held to the CLI's `CommandName` union by `commands.test.ts` |
| `record.ts`   | Quotas and the Redis write. Called in-process; the server never POSTs to itself   |
| `route.ts`    | The public `POST /api/telemetry` endpoint the CLI uses                            |

`route.ts` accepts **only** `cli_command` events, never `mcp_tool_call`. An MCP event's
rate-limit key comes from its own caller-supplied `hashedCallerId`, so accepting one over an
unauthenticated endpoint would make call volume and unique-caller counts forgeable. MCP events
reach `record.ts` in-process only.

## Storage layout

One stream, `telemetry:events`, carrying both sources and discriminated on `event`. Each entry
holds the whole event as JSON in a field named `data`, plus a `receivedAt` timestamp added on
write. Ids are `<epochMillis>-<seq>`, so a reader seeks by time with `XRANGE <fromMs> <toMs>`
and pages with `(<lastId>`.

This replaced one list per UTC day (`telemetry:YYYY-MM-DD`), which cost the reader one `LRANGE`
per day in the window — 180 for [Insights](https://github.com/marigold-ui/insights)' 90-day
view, whose KPI deltas compare against the preceding 90 days. Data written under that layout is
not migrated and nothing reads it; it needs no cleanup either, since those lists carried a
90-day TTL.

Rate-limit keys carry a source prefix — `telemetry:rl:cli:{anonymousId}:{date}` and
`telemetry:rl:mcp:{hashedCallerId}:{date}` — so the keyspace stays greppable by caller type.
The endpoint-wide counter is `telemetry:rl:public:{date}`.

## Retention is unbounded, deliberately

The stream carries no TTL and is never trimmed. This reverses the 90-day `EXPIRE` DST-1475 put
on the old daily lists, and it applies to `cli_command` events too now that both sources share
one stream — worth knowing, because nothing in DST-1625 would lead you to expect CLI retention
to change.

It had been settled three different ways without ever being written down: DST-1264 set no
policy at all, DST-1475 added the 90-day TTL as a "storage leak" fix, and DST-1625's stream
refactor changed it again as a side effect of the layout change. Hence this section.

Three reasons, in order of weight:

- **Long-run adoption trends are the point of collecting this**, and a window destroys them
  permanently. Keeping data preserves the option to trim later; trimming destroys the option to
  keep.
- **Volume was never the constraint.** Measured at roughly 35 events a day at ~250 bytes, about
  3 MB a year. The "storage leak" framing had no cost behind it. That earlier concern was a
  different shape anyway: an unbounded number of _keys_, one per day, none read by anything.
- **A bounded window needs a constant here that a different repo depends on.** Insights' widest
  view is 90 days against the preceding 90, so 180 have to survive — and widening that range
  would not fail anything on this side, it would silently truncate the tail and read as a drop
  in usage. No trim, no constant, no drift.

**Rejected alternatives.** `MAXLEN ~` evicts the _oldest_ entries, so a flood would push out
exactly the history this exists to keep. A per-client-address quota keys on a header, which is
caller-supplied unless a proxy overwrites it — two review rounds disagreed about which end of
`x-forwarded-for` to trust, which is itself the evidence that it bounds nothing reliably — and
it would have put IP addresses in Redis, personal data this system otherwise avoids holding.
Rolling raw events up into aggregates and trimming the raw ones is what Insights already does
for Trends via the scanner, so there is precedent, but it is a whole subsystem to avoid 3 MB a
year, and until it exists trimming means losing the history it is meant to preserve.

## What bounds growth instead

With no window, the quotas are the only thing left.

**Per caller.** 10000/day, the same for both sources. It is not an abuse bound — the
endpoint-wide ceiling below is — but a guard against a runaway writer, which matters because
nothing expires to clean up after one: a looping agent on the MCP side, or a broken script on
the CLI side. Since that is the only job, there is no reason to treat the two sources
differently, and an earlier split (1000 for CLI, on the theory that its endpoint is
unauthenticated) just duplicated what the endpoint-wide ceiling already does. A caller past the
ceiling is dropped rather than truncated, so it sits far above realistic usage — but a caller
crossing it in a UTC day does under-report.

**Endpoint-wide.** 50000/day on `telemetry:rl:public:{date}`. `POST /api/telemetry` has to stay
unauthenticated — `@marigold/cli` is a public npm package — and the per-caller key above comes
out of the request body, so rotating `anonymousId` walks past it. A single fixed key can't be
influenced by any header, body field or rotation, which makes it a hard bound where the
per-caller ceiling is not. **Removing it re-opens unbounded growth on this endpoint.** It
bounds only `POST /api/telemetry`: MCP writes never pass through it, and are bounded instead
by 10000/day times however many Keycloak subjects exist — a soft bound, acceptable only
because that path is authenticated. `/mcp` needs no equivalent,
being Keycloak-gated.

A quota check that cannot run lets the request through. Telemetry must not start rejecting
traffic because Redis is down.

Worth knowing before tuning that ceiling: it counts requests, not writes, so 429'd requests
consume it too — and the CLI's sender neither inspects the response status nor retries. If one
caller ever burns the day's budget, every CLI's telemetry is dropped for the rest of the UTC
day, silently on both sides.

## Two event types, one store

Only one of them is read. Insights' read-side schema is `z.literal('mcp_tool_call')`, so
`cli_command` entries fail it and are discarded. **CLI telemetry has had no consumer since
DST-1264 introduced it** — worth knowing before citing "we have CLI usage data", and it means
the long-run-trends argument above is weaker for that half than it reads.

They are also different classes of data, which is why only one made retention a question.
`cli_command` carries `anonymousId`, a UUID minted locally by `crypto.randomUUID()` and tied to
no identity — there is no personal data in it. `mcp_tool_call` carries `hashedCallerId`, an
HMAC-SHA256 of a Keycloak `sub`: pseudonymous, not anonymous, since anyone holding both Redis
read access and `MCP_TELEMETRY_HASH_SECRET` can re-identify a named Reservix employee.

That digest is **stable for the life of the secret, and that is a decision rather than a
default.** A salt that changed over time — per quarter, say — would bound linkability by
construction, but it would also make a unique-caller count meaningless across the boundary, and
an all-time count impossible. Since the whole reason this data is kept indefinitely is long-run
adoption trends, "how many distinct people have ever used this" has to stay answerable. So the
digest is stable, and the linkability that comes with it is accepted rather than engineered
away.

What limits the exposure is therefore not the hash, and saying otherwise would be the easy
mistake to make here. Three things do. The secret is a credential, held only as a Vercel project
env var, and re-identifying anyone needs it _and_ Redis read access _and_ a `sub` to test
against. What is recorded is which doc page ranked first — not query text, not similarity
scores. And the read side never attributes: Insights counts distinct `hashedCallerId`s and
charts volume, and no view anywhere maps a digest back to a person or shows one caller's
history. **That last one is the load-bearing one**, which is why "someone proposes reading this
per person" is a revisit trigger below and not a feature request.

Rotating `MCP_TELEMETRY_HASH_SECRET` remains available and is the one lever that invalidates
every past digest at once. It is deliberately not part of the design: it would also reset every
caller to a new identity, so the all-time count restarts and the history before it becomes
uncountable. Reach for it if the position above stops holding, not on a schedule.

Retaining that indefinitely is a deliberate call on the basis that `marigold-docs` is an
internal tool, its callers are Reservix employees, and what is recorded is which doc pages were
searched — not query text and not similarity scores. **No DPO review was sought and no
works-council involvement either. That is a judgement, not a ruling, and this document is not a
substitute for either.** Revisit it, before the fact rather than after, if:

- the store ever holds data about anyone outside Reservix;
- anyone proposes reading this data **per person** rather than counting distinct callers — what
  makes the current position defensible is that Insights only ever aggregates;
- someone asks the employee-data question properly.

Two mitigations exist for that last case, both deferred rather than dismissed: rotating
`MCP_TELEMETRY_HASH_SECRET`, at the cost described above, and a per-caller opt-out on the MCP
path, which unlike the CLI's `DO_NOT_TRACK` does not exist.

The shapes are not symmetric either: the CLI reports its outcome as `exitCode` and its duration
as a coarse `durationBucket` (its [public docs](../../../content/getting-started/cli/index.mdx)
promise the bucket, not a timing), while MCP reports `success` and an exact `latencyMs`.
Anything aggregating across both has to special-case, which is a third reason the shared stream
is a storage decision rather than a common data model.

One consequence that is easy to miss: Insights pages the stream at `STREAM_PAGE_SIZE = 5_000`
with `MAX_STREAM_PAGES = 20`, and the page counter counts every entry in the window — including
the `cli_command` ones it is about to discard. Past 100000 entries in a window it logs and
returns **incomplete aggregates**, which look like a drop in usage rather than an error. At
~35 events a day the window holds ~6000, so there is roughly 16x headroom; the point is that the
headroom is spent by the source nobody reads, while CLI volume is the half that grows with
adoption. If it ever gets close, the fix is one stream per source, not a bigger page budget.
