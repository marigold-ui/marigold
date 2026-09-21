/**
 * Opt-out value for slot-keyed `HeadingContext` / `TextContext`. Pass it as
 * `slot` on a structural `<Heading>` or `<Text>` to keep it from consuming a
 * container's slot configuration: `<Heading slot={noSlot}>{title}</Heading>`.
 *
 * Without it, RAC's slot-keyed contexts throw `"A slot prop is required when
 * using slots"` for any consumer inside a container that publishes a
 * `{ slots: { ... } }` value. Structural primitives never want that config (a
 * `<Headline>` inside `Panel.Content` is page chrome, not the panel's title).
 *
 * `null` is the runtime signal `useContextProps` reads as "opt out", but RAC
 * narrows `slot` to `string | undefined`, so the cast lives here once instead
 * of at every call site.
 */
export const noSlot = null as unknown as string | undefined;
