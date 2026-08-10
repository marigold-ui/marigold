import { describe, expect, it } from 'vitest';
import {
  isMarigoldComponent,
  isMarigoldSubComponent,
} from '../helpers/components.js';
import { STATIC_COLLECTION_COMPOUNDS } from './composition.js';
import { HOST_PROVIDES, REQUIRED_CONTAINER } from './required-ancestor.js';

// These lists are the curated remainder the type schema cannot derive, and they
// feed ERROR paths (empty-compound, required-ancestor). If Marigold renames a
// component the name silently rots: the error either stops firing (false
// negative) or mis-fires against a name that no longer exists (false positive).
// Asserting every curated name still resolves in the live registry turns such a
// rename into a CI failure instead of a runtime surprise.

// Resolve either a flat component ("Menu") or a dotted sub-component
// ("AppLayout.Sidebar") against the registry.
const resolves = (name: string): boolean => {
  if (name.includes('.')) {
    const [parent, sub] = name.split('.');
    return isMarigoldSubComponent(parent, sub);
  }
  return isMarigoldComponent(name);
};

describe('curated error-path lists still resolve in the Marigold registry', () => {
  it.each([...STATIC_COLLECTION_COMPOUNDS])(
    'STATIC_COLLECTION_COMPOUNDS: %s is a Marigold component',
    name => {
      expect(isMarigoldComponent(name)).toBe(true);
    }
  );

  it.each(Object.entries(REQUIRED_CONTAINER))(
    'REQUIRED_CONTAINER: %s and its container %s resolve',
    (item, container) => {
      expect(isMarigoldComponent(item)).toBe(true);
      expect(resolves(container)).toBe(true);
    }
  );

  it.each(Object.entries(HOST_PROVIDES))(
    'HOST_PROVIDES: host %s and provided root %s resolve',
    (host, provided) => {
      expect(resolves(host)).toBe(true);
      expect(resolves(provided)).toBe(true);
    }
  );
});
