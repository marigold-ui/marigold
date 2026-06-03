import { afterAll, describe, expect, it } from 'vitest';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {
  buildComponentLocationMap,
  buildTextFingerprintMap,
} from './component-locations.js';

const created: string[] = [];
const tmpFile = (name: string, content: string): string => {
  const p = path.join(fs.mkdtempSync(path.join(os.tmpdir(), 'comploc-')), name);
  fs.writeFileSync(p, content);
  created.push(p);
  return p;
};

afterAll(() => {
  for (const p of created) {
    fs.rmSync(path.dirname(p), { recursive: true, force: true });
  }
});

const FIXTURE = `import { Button, IconButton } from '@marigold/components';

export default function App() {
  return (
    <div>
      <Button>Save changes</Button>
      <IconButton aria-label="Close" />
    </div>
  );
}
`;

describe('buildComponentLocationMap', () => {
  it('records JSX tag names with their lines', () => {
    const file = tmpFile('names.tsx', FIXTURE);
    const map = buildComponentLocationMap(file);
    expect(map.get('Button')?.[0].line).toBe(6);
    expect(map.get('IconButton')?.[0].line).toBe(7);
  });
});

describe('buildTextFingerprintMap', () => {
  it('resolves trimmed child text to the element line', () => {
    const file = tmpFile('fp-text.tsx', FIXTURE);
    const map = buildTextFingerprintMap(file);
    const locs = map.get('Save changes');
    expect(locs).toBeDefined();
    expect(locs).toHaveLength(1);
    expect(locs?.[0].line).toBe(6);
  });

  it('resolves an aria-label value to the element line', () => {
    const file = tmpFile('fp-aria.tsx', FIXTURE);
    const map = buildTextFingerprintMap(file);
    const locs = map.get('Close');
    expect(locs).toBeDefined();
    expect(locs?.[0].line).toBe(7);
  });

  it('returns no entry for an absent fingerprint', () => {
    const file = tmpFile('fp-absent.tsx', FIXTURE);
    const map = buildTextFingerprintMap(file);
    expect(map.get('Delete everything')).toBeUndefined();
  });

  it('collapses whitespace and caps fingerprints at 40 chars (mirrors __describeEl)', () => {
    const file = tmpFile(
      'fp-long.tsx',
      `export default function App() {
  return <p>This   is    a    very     long     label     that     exceeds     forty     characters</p>;
}
`
    );
    const map = buildTextFingerprintMap(file);
    const expected = 'This is a very long label that exceeds f';
    expect(expected).toHaveLength(40);
    expect(map.get(expected)?.[0].line).toBe(2);
  });
});
