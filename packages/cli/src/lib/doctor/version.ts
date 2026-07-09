// Minimal, dependency-free version helpers. Doctor only ever compares concrete
// installed versions (or checks one against a simple `>=X` peer minimum), so full
// semver range algebra is unnecessary — a small comparator covers every case.

interface Parsed {
  parts: [number, number, number];
  /** true when the version carries a prerelease tag (e.g. -beta.3). */
  prerelease: boolean;
}

const parse = (version: string): Parsed | null => {
  const m = /^(\d+)\.(\d+)\.(\d+)(?:[-+].*)?$/.exec(version.trim());
  if (!m) return null;
  return {
    parts: [Number(m[1]), Number(m[2]), Number(m[3])],
    prerelease: /[-]/.test(version),
  };
};

/**
 * Compare two versions. Returns -1 if a < b, 1 if a > b, 0 if equal.
 * Prerelease rule (kept intentionally cheap): compare the numeric base first;
 * if the bases tie, a prerelease sorts *before* the matching stable release
 * (1.0.0-beta < 1.0.0). Returns 0 when either side is unparseable.
 */
export const compareVersions = (a: string, b: string): number => {
  const pa = parse(a);
  const pb = parse(b);
  if (!pa || !pb) return 0;
  for (let i = 0; i < 3; i++) {
    if (pa.parts[i] !== pb.parts[i]) return pa.parts[i] < pb.parts[i] ? -1 : 1;
  }
  if (pa.prerelease === pb.prerelease) return 0;
  return pa.prerelease ? -1 : 1;
};

/**
 * Extract the minimum version from a simple range. Marigold's own peer
 * dependencies are all `>=X` (or an exact/`^`/`~` pin), so we pull the first
 * concrete version out of the range string. Returns null if none is found.
 */
export const minVersionFromRange = (range: string): string | null => {
  const m = /(\d+\.\d+\.\d+(?:[-+][0-9A-Za-z.-]+)?)/.exec(range);
  return m ? m[1] : null;
};

/** True when `version` satisfies `>= min` (or when either is unparseable — we
 * never fail a peer check on an input we can't read). */
export const satisfiesMin = (version: string, min: string): boolean => {
  if (!parse(version) || !parse(min)) return true;
  return compareVersions(version, min) >= 0;
};
