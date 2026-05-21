/**
 * Opt-out value for slot-keyed `HeadingContext` / `TextContext`.
 *
 * Pass as the `slot` prop on a structural `<Heading>` or `<Text>` to
 * prevent it from consuming a container's slot configuration at runtime.
 *
 * The opt-out is needed because RAC's slot-keyed contexts throw
 * `"A slot prop is required when using slots"` when a consumer renders
 * inside a container that publishes a `{ slots: { ... } }` value without
 * passing a matching `slot` prop. Components like `<Headline>` are
 * structural primitives that should _never_ consume a container's slot
 * config (a `<Headline>` inside `Panel.Content` is page chrome, not the
 * panel's title), so they default `slot` to this value to short-circuit
 * the slot lookup.
 *
 * `null` is the runtime signal `useContextProps` recognises for "opt out
 * of slot consumption", but RAC's prop types narrow `slot` to
 * `string | undefined`. The `as unknown as string | undefined` cast
 * lives here once so call sites can write `slot={noSlot}` instead of
 * repeating the cast (or sprinkling `@ts-expect-error` everywhere).
 *
 * @example
 * ```tsx
 * <Heading slot={noSlot}>{title}</Heading>
 * ```
 */
export const noSlot = null as unknown as string | undefined;
