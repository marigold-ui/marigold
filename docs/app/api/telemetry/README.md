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
has exactly one field, `data`, holding the whole event as JSON with a `receivedAt` timestamp
added on write — `receivedAt` is inside that JSON, not a second entry field. Ids are `<epochMillis>-<seq>`, so a reader seeks by time with `XRANGE <fromMs> <toMs>`
and pages with `(<lastId>`.

This replaced one list per UTC day (`telemetry:YYYY-MM-DD`), which cost the reader one `LRANGE`
per day in the window — 180 for [Insights](https://github.com/marigold-ui/insights)' 90-day
view, whose KPI deltas compare against the preceding 90 days. Data written under that layout is
not migrated and nothing reads it. Most of it needs no cleanup either, since those lists
carried a 90-day TTL — but not all. The `EXPIRE` arrived with
[#5619](https://github.com/marigold-ui/marigold/pull/5619) and ran only on a day whose key
received a write, so any day that had already stopped receiving events by then never got one,
and those keys are immortal. Worth a `TTL telemetry:YYYY-MM-DD` spot-check on the oldest days
if the keyspace is ever audited.

No backfill was done, deliberately, and that is not in tension with keeping everything from here
forward: the only events in the old lists are `cli_command` ones, which have had no consumer
since DST-1264 — so there is no history there anyone has ever read or charted. The argument for
unbounded retention is about the trends this store is now actually read for, not about
reconstructing a window nothing ever looked at.

Rate-limit keys carry a source prefix — `telemetry:rl:cli:{anonymousId}:{date}` and
`telemetry:rl:mcp:{hashedCallerId}:{date}` — so the keyspace stays greppable by caller type.
The endpoint-wide counter is `telemetry:rl:public:{date}`.

## Retention is unbounded, deliberately

The stream carries no TTL and is never trimmed. This reverses the 90-day `EXPIRE` DST-1475 put
on the old daily lists, and it applies to `cli_command` events too now that both sources share
one stream — worth knowing, because nothing in DST-1625 would lead you to expect CLI retention
to change.

It had been settled three different ways without ever being written down: DST-1264 set no
policy at all, the 90-day TTL rode along incidentally in DST-1475 — whose merged scope was
`marigold validate` — as a "storage leak" fix in a code comment, and DST-1625's stream refactor
changed it again as a side effect of the layout change. Hence this section.

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
per-caller ceiling is not. Worth stating precisely, since the imprecise version is what a
future reader will trust when deciding whether the ceiling is enough: it bounds the write
**rate**, not the total. At 50000/day times ~250 bytes it permits ~12.5 MB/day — roughly
4.5 GB/year sustained, three orders of magnitude above the ~3 MB/year actual volume the
retention argument rests on. Total size is unbounded by construction; the ceiling is what makes
growth predictable rather than finite. **Removing it makes the rate unbounded too.** It
bounds only `POST /api/telemetry`: MCP writes never pass through it, and are bounded instead
by 10000/day times however many Keycloak subjects exist — a soft bound, acceptable only
because that path is authenticated. `/mcp` needs no equivalent,
being Keycloak-gated.

A quota check that cannot run lets the request through. Telemetry must not start rejecting
traffic because Redis is down. That is true of the shared check specifically: it catches its own
failure and returns `false`. A failure on the per-caller key propagates instead, so the request
still answers 204 but the event is dropped — a partial Upstash degradation can therefore look
like recording continued when it did not.

Worth knowing before tuning that ceiling: it is charged at the write step, not per request. A
request turned away by the per-caller ceiling or by the route's own schema never reaches it. But
charged is not the same as written — `publicQuotaExceeded` increments first and compares after,
so the request that trips the ceiling spends the counter and returns without an `XADD`, and so
does one whose `XADD` then fails. Reconciling the counter against stream length will always show
the counter ahead; that is not lost events.

That bounds what a single caller can take: its own 10000/day ceiling stops it at a fifth of the
shared budget, so it takes a sixth rotated `anonymousId` to exhaust the day — five spend exactly
50000, which the `>` comparison still lets through. Note the ceilings do not protect each other
symmetrically: the per-caller counter is charged before the shared gate is consulted, so once the
day's shared budget is gone, every caller keeps burning its own allowance on requests that are
dropped. A caller can therefore end the day marked rate-limited with nothing written, which reads
like a runaway writer and is not one.

Once the shared budget is exhausted, every CLI's telemetry is dropped for the rest of the UTC
day, silently on both sides: the CLI's sender neither inspects the response status nor retries.

## Two event types, one store

Only one of them is read: Insights discards `cli_command` entries, because its read-side schema
accepts the `mcp_tool_call` literal only (as of marigold-ui/insights#86 — that schema lives in
that repo, so treat the shape as illustrative and "only MCP events are read" as the durable
part). **CLI telemetry has had no consumer since
DST-1264 introduced it** — worth knowing before citing "we have CLI usage data", and it means
the long-run-trends argument above is weaker for that half than it reads.

They are also different classes of data, which is why only one made retention a question.
`cli_command` carries `anonymousId`, a UUID minted locally by `crypto.randomUUID()` and tied to
no identity — there is no personal data in it. `mcp_tool_call` carries `hashedCallerId`, a
SHA-256 of a Keycloak `sub`: pseudonymous, not anonymous, since anyone holding both Redis read
access and a list of `sub`s to test against can re-identify a named Reservix employee.

That digest is **stable for good, and that is a decision rather than a default.** A salt that
changed over time — per quarter, say — would bound linkability by construction, but it would
also make a unique-caller count meaningless across the boundary, and an all-time count
impossible. Since the whole reason this data is kept indefinitely is long-run
adoption trends, "how many distinct people have ever used this" has to stay answerable. So the
digest is stable, and the linkability that comes with it is accepted rather than engineered
away.

**The hash is unkeyed, and that is also a decision.** Keying it on a server-held secret was the
obvious alternative, and was rejected. A key defends against exactly one attack: taking the
stored digests and hashing candidate inputs until they match. A Keycloak `sub` is a UUID, so
there is no candidate space small enough to walk — that attack is infeasible with or without a
key. What a key adds is a bar against someone who already holds `sub`s to test against — and
that population is wider than it first looks: a `sub` rides in every token the realm issues, so
any relying party, any log or error payload that captured one, and this route itself all have
them. Be precise about what was traded away, because it is not nothing: the join from digest to
a named person to _which doc pages that person searched_ previously needed a server-held
credential as well, and now needs only Redis read access and a `sub`. Set against that, the key
cost an env var that had to be provisioned identically in every environment or digests would not
match across them, and whose absence disabled recording for that deployment (loudly — it warned
once per instance — but disabled all the same). Judged not worth it, so the digest is a plain
SHA-256, and what carries the weight instead is the read side never attributing.

**This rests on `sub` being high-entropy, which nothing here enforces.** Keycloak's default is
the user's UUID, but `sub` is overridable by a protocol mapper, and neither `verifyToken` nor
`schema.ts` constrains it beyond "non-empty string" and "64 hex characters out". Map it to a
username or an email and the candidate space becomes the staff directory — every stored digest
falls to a few hundred hashes, where an HMAC would have shrugged. If the realm's `sub` mapping
is ever touched, this decision has to be revisited before the change lands, not after.

What limits the exposure is therefore not the hash, and saying otherwise would be the easy
mistake to make here. Three things do. Re-identifying anyone needs Redis read access _and_ a
list of `sub`s to test against, and a `sub` is not something the store or the docs site ever
hands out. What is recorded is which doc page ranked first — not query text, not similarity
scores. And the read side never attributes: Insights counts distinct `hashedCallerId`s and
charts volume, and no view anywhere maps a digest back to a person or shows one caller's
history. **That last one is the load-bearing one**, which is why "someone proposes reading this
per person" is a revisit trigger below and not a feature request.

**There is no lever that invalidates every past digest at once.** Keying the hash and rotating
the key would have been one, and it was never something to reach for anyway: using it resets
every caller to a new identity, restarting the all-time count and making the history before it
uncountable. If it ever has to happen, the equivalent is a one-off rewrite of the stored
digests, or accepting the same discontinuity by salting from a chosen date forward. Either is a
deliberate migration rather than a switch to flip.

Retaining that indefinitely is a deliberate call on the basis that `marigold-docs` is an
internal tool, its callers are Reservix employees, and what is recorded is which doc pages were
searched — not query text and not similarity scores. **No DPO review was sought and no
works-council involvement either. That is a judgement, not a ruling, and this document is not a
substitute for either.** Revisit it, before the fact rather than after, if:

- the store ever holds data about anyone outside Reservix;
- anyone proposes reading this data **per person** rather than counting distinct callers — what
  makes the current position defensible is that Insights only ever aggregates;
- someone asks the employee-data question properly.

Two mitigations exist for that last case, both deferred rather than dismissed: re-pseudonymising
the stored digests, at the cost described above, and a per-caller opt-out on the MCP path, which
unlike the CLI's `DO_NOT_TRACK` does not exist.

The shapes are not symmetric either: the CLI reports its outcome as `exitCode` and its duration
as a coarse `durationBucket` (its [public docs](../../../content/getting-started/cli/index.mdx)
promise the bucket, not a timing), while MCP reports `success` and an exact `latencyMs`.
Anything aggregating across both has to special-case, which is a third reason the shared stream
is a storage decision rather than a common data model.

One consequence that is easy to miss: Insights pages the stream at `STREAM_PAGE_SIZE = 5_000`
with `MAX_STREAM_PAGES = 20` (as of marigold-ui/insights#86 — they live in that repo, so treat
the numbers as illustrative and the headroom argument as the durable part), and the page counter
counts every entry in the window — including
the `cli_command` ones it is about to discard. Past 100000 entries in a window it logs and
returns **incomplete aggregates**, which look like a drop in usage rather than an error. At
~35 events a day the window holds ~6000, so there is roughly 16x headroom. The point is where
that headroom goes: it is spent by `cli_command`, the half nobody reads, and nothing on the read
side notices, because the budget is exhausted by entries Insights discards after paying for
them. If it ever gets close, the fix is one stream per source, not a bigger page budget.
