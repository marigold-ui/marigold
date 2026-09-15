/**
 * A warner that logs each distinct cause once, for failures that are
 * systematic rather than incidental — whatever breaks one call breaks every
 * call for the life of the instance, so per-call logging is noise while silence
 * leaves the symptom unexplained.
 *
 * Each call gets its own cause namespace, so one module's causes cannot
 * silence another's. Note "once per process" means once per serverless
 * instance: it bounds log noise, it does not bound total volume.
 */
export const createWarnOnce = () => {
  const seen = new Set<string>();

  return (cause: string, message: string): void => {
    if (seen.has(cause)) return;
    seen.add(cause);
    console.warn(message);
  };
};
