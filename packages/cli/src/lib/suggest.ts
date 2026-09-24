// Levenshtein-based "did you mean?" suggestions for mistyped commands, matching
// the recovery-from-error pattern git/cargo/npm use. Kept dependency-free.

const levenshtein = (a: string, b: string): number => {
  // Classic two-row dynamic-programming edit distance. O(a*b) time, O(b) space,
  // which is trivial for the short command/flag names this compares.
  const prev = Array.from({ length: b.length + 1 }, (_, i) => i);
  const curr = new Array<number>(b.length + 1);
  for (let i = 1; i <= a.length; i++) {
    curr[0] = i;
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      curr[j] = Math.min(prev[j] + 1, curr[j - 1] + 1, prev[j - 1] + cost);
    }
    for (let j = 0; j <= b.length; j++) prev[j] = curr[j];
  }
  return prev[b.length];
};

// Return the closest candidate to `input`, or undefined when nothing is near
// enough to be a helpful suggestion. The threshold is half the input length,
// so longer input tolerates more edits; the floor of 2 is what lets short
// words (`lst` → `list`) match at all. Input is lowercased first so
// `marigold DOCS` still suggests `docs`; every candidate is already lowercase.
export const nearest = (
  input: string,
  candidates: readonly string[]
): string | undefined => {
  const threshold = Math.max(2, Math.floor(input.length / 2));
  const normalized = input.toLowerCase();
  let best: string | undefined;
  let bestDistance = Infinity;
  for (const candidate of candidates) {
    const distance = levenshtein(normalized, candidate);
    if (distance < bestDistance) {
      bestDistance = distance;
      best = candidate;
    }
  }
  return best !== undefined && bestDistance <= threshold ? best : undefined;
};
