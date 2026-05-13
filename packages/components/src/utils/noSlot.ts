/**
 * Opt-out value for slot-keyed `HeadingContext` / `TextContext`.
 *
 * Pass as the `slot` prop on a structural `<Heading>` or `<Text>` to
 * prevent it from consuming a container's slot configuration at runtime.
 * The cast is required because RAC narrows `slot` to `string | undefined`,
 * even though `useContextProps` accepts `null` at runtime as the opt-out
 * signal.
 *
 * @example
 * ```tsx
 * <Heading slot={noSlot}>{title}</Heading>
 * ```
 */
export const noSlot = null as unknown as string | undefined;
