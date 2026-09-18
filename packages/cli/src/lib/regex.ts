export const escapeRegex = (s: string): string =>
  s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
