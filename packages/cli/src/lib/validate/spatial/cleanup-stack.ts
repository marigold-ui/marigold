export type CleanupStack = {
  // Register a teardown callback. Call this the instant a resource is created
  // so a later failure (or a budget timeout that does not cancel the in-flight
  // work) can never orphan it.
  push: (fn: () => Promise<unknown> | unknown) => void;
  // Run every teardown registered since the last run() call. LIFO order (last
  // resource created is torn down first) and settle-all semantics: one
  // failing teardown never prevents the others from running, and never
  // rejects. Safe to call more than once — a teardown pushed between two
  // run() calls is included in the second, but one already run is NOT
  // re-invoked, so a future non-idempotent teardown can't be silently
  // double-run.
  run: () => Promise<void>;
};

export const createCleanupStack = (): CleanupStack => {
  const cleanups: Array<() => Promise<unknown> | unknown> = [];
  return {
    push: fn => cleanups.unshift(fn),
    run: async () => {
      // Drain the pending set before awaiting anything, so a teardown pushed
      // while this run() is still in flight lands in the (now-empty) array
      // for a later call to pick up, rather than being silently skipped or
      // racing this run's own iteration.
      const pending = cleanups.splice(0, cleanups.length);
      // Promise.resolve().then(c) funnels a *synchronous* throw in a teardown
      // into a rejected promise, so allSettled contains it instead of it
      // escaping through .map(). Guarantees every teardown is attempted.
      await Promise.allSettled(pending.map(c => Promise.resolve().then(c)));
    },
  };
};
