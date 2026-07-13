export type CleanupStack = {
  // Register a teardown callback. Call this the instant a resource is created
  // so a later failure (or a budget timeout that does not cancel the in-flight
  // work) can never orphan it.
  push: (fn: () => Promise<unknown> | unknown) => void;
  // Run every registered teardown. LIFO order (last resource created is torn
  // down first) and settle-all semantics: one failing teardown never prevents
  // the others from running, and never rejects. Safe to call more than once —
  // teardowns registered between two run() calls are included in the second,
  // which is what the renderer's deferred sweep relies on.
  run: () => Promise<void>;
};

export const createCleanupStack = (): CleanupStack => {
  const cleanups: Array<() => Promise<unknown> | unknown> = [];
  return {
    push: fn => cleanups.unshift(fn),
    run: async () => {
      // Promise.resolve().then(c) funnels a *synchronous* throw in a teardown
      // into a rejected promise, so allSettled contains it instead of it
      // escaping through .map(). Guarantees every teardown is attempted.
      await Promise.allSettled(cleanups.map(c => Promise.resolve().then(c)));
    },
  };
};
