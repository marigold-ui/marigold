/**
 * Defers `create` until first call, then reuses the result. For module-level
 * singletons whose construction reads env vars or touches the filesystem, so
 * importing the module stays free.
 *
 * Not suitable when the absent case is meaningful — `??=` re-runs `create` for
 * a nullish result, so a factory that legitimately returns null (an
 * unconfigured client, say) would be retried on every call.
 */
export const lazy = <T>(create: () => T): (() => T) => {
  let value: T | undefined;
  return () => (value ??= create());
};
