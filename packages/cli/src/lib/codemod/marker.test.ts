import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { covers, findMarkerFile, readMarker, writeMarker } from './marker.js';

let dir: string;

beforeEach(() => {
  dir = fs.mkdtempSync(path.join(os.tmpdir(), 'marigold-marker-'));
});

afterEach(() => {
  fs.rmSync(dir, { recursive: true, force: true });
});

const writePkg = (relDir: string, content: string): string => {
  const file = path.join(dir, relDir, 'package.json');
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, content);
  return file;
};

const declaring = JSON.stringify(
  { name: 'app', dependencies: { '@marigold/components': '^19.0.0' } },
  null,
  2
);

describe('findMarkerFile', () => {
  test('finds the nearest package.json that declares @marigold/components', () => {
    writePkg('.', declaring);
    const nested = writePkg('packages/app', declaring);
    fs.mkdirSync(path.join(dir, 'packages/app/src'));

    const found = findMarkerFile(path.join(dir, 'packages/app/src'));

    expect(found).toBe(nested);
  });

  test('walks past a package.json that does not declare it', () => {
    const root = writePkg('.', declaring);
    writePkg('packages/tooling', JSON.stringify({ name: 'tooling' }));

    const found = findMarkerFile(path.join(dir, 'packages/tooling'));

    expect(found).toBe(root);
  });

  test('accepts a devDependencies declaration', () => {
    const file = writePkg(
      '.',
      JSON.stringify({ devDependencies: { '@marigold/components': '19.0.0' } })
    );

    expect(findMarkerFile(dir)).toBe(file);
  });

  test('accepts a standalone theme package that declares only @marigold/system', () => {
    writePkg('.', declaring);
    const theme = writePkg(
      'packages/theme',
      JSON.stringify({ dependencies: { '@marigold/system': '^19.0.0' } })
    );

    expect(findMarkerFile(path.join(dir, 'packages/theme'))).toBe(theme);
  });

  test('returns null when nothing declares it, even with node_modules present', () => {
    writePkg('.', JSON.stringify({ name: 'hoisted-root' }));
    fs.mkdirSync(path.join(dir, 'node_modules/@marigold/components'), {
      recursive: true,
    });

    expect(findMarkerFile(dir)).toBeNull();
  });
});

describe('readMarker', () => {
  test('returns null without a marigold field', () => {
    const file = writePkg('.', declaring);

    expect(readMarker(file)).toBeNull();
  });

  test('returns null when marigold is not an object', () => {
    const file = writePkg('.', JSON.stringify({ marigold: 'something else' }));

    expect(readMarker(file)).toBeNull();
  });

  test('returns the recorded migration', () => {
    const file = writePkg(
      '.',
      JSON.stringify({ marigold: { migrated: 'v19' } })
    );

    expect(readMarker(file)).toBe('v19');
  });

  test('throws on a malformed value instead of treating it as unmigrated', () => {
    const file = writePkg(
      '.',
      JSON.stringify({ marigold: { migrated: '19' } })
    );

    expect(() => readMarker(file)).toThrow(/expected a migration like "v19"/);
  });
});

describe('covers', () => {
  test('is false without a marker', () => {
    expect(covers(null, 'v18')).toBe(false);
  });

  test('covers the recorded migration and every older one', () => {
    expect(covers('v19', 'v19')).toBe(true);
    expect(covers('v19', 'v18')).toBe(true);
  });

  test('does not cover a newer migration', () => {
    expect(covers('v18', 'v19')).toBe(false);
  });
});

describe('writeMarker', () => {
  test('appends the field and keeps 2-space indentation and key order', () => {
    const file = writePkg('.', `${declaring}\n`);

    const written = writeMarker(file, 'v19');

    expect(written).toBe(true);
    expect(fs.readFileSync(file, 'utf8')).toBe(
      `{
  "name": "app",
  "dependencies": {
    "@marigold/components": "^19.0.0"
  },
  "marigold": {
    "migrated": "v19"
  }
}
`
    );
  });

  test('keeps tab indentation', () => {
    const file = writePkg('.', '{\n\t"name": "app"\n}\n');

    writeMarker(file, 'v19');

    expect(fs.readFileSync(file, 'utf8')).toBe(
      '{\n\t"name": "app",\n\t"marigold": {\n\t\t"migrated": "v19"\n\t}\n}\n'
    );
  });

  test('keeps CRLF line endings', () => {
    const file = writePkg('.', '{\r\n  "name": "app"\r\n}\r\n');

    writeMarker(file, 'v19');

    const output = fs.readFileSync(file, 'utf8');
    expect(output).toContain('"migrated": "v19"');
    expect(output.replace(/\r\n/g, '')).not.toContain('\n');
    expect(output.endsWith('}\r\n')).toBe(true);
  });

  test('does not add a trailing newline the file did not have', () => {
    const file = writePkg('.', '{\n  "name": "app"\n}');

    writeMarker(file, 'v19');

    expect(fs.readFileSync(file, 'utf8').endsWith('}')).toBe(true);
  });

  test('keeps a one-line file on one line', () => {
    const file = writePkg('.', '{"name":"app"}');

    writeMarker(file, 'v19');

    expect(fs.readFileSync(file, 'utf8')).toBe(
      '{"name":"app","marigold":{"migrated":"v19"}}'
    );
  });

  test('updates an existing marker in place and keeps sibling keys', () => {
    const file = writePkg(
      '.',
      '{\n  "marigold": {\n    "other": true,\n    "migrated": "v18"\n  },\n  "name": "app"\n}\n'
    );

    writeMarker(file, 'v19');

    expect(fs.readFileSync(file, 'utf8')).toBe(
      '{\n  "marigold": {\n    "other": true,\n    "migrated": "v19"\n  },\n  "name": "app"\n}\n'
    );
  });

  test('never lowers the marker', () => {
    const before = '{\n  "marigold": { "migrated": "v19" }\n}\n';
    const file = writePkg('.', before);

    const written = writeMarker(file, 'v18');

    expect(written).toBe(false);
    expect(fs.readFileSync(file, 'utf8')).toBe(before);
  });

  test('refuses to overwrite a malformed marker', () => {
    const before = JSON.stringify({ marigold: { migrated: '19' } });
    const file = writePkg('.', before);

    expect(() => writeMarker(file, 'v19')).toThrow(
      /expected a migration like "v19"/
    );
    expect(fs.readFileSync(file, 'utf8')).toBe(before);
  });

  test('leaves the file untouched when the version is already recorded', () => {
    const before = '{\n    "marigold": { "migrated": "v19" }\n}\n';
    const file = writePkg('.', before);

    const written = writeMarker(file, 'v19');

    expect(written).toBe(false);
    expect(fs.readFileSync(file, 'utf8')).toBe(before);
  });

  test('refuses to overwrite a marigold field that is not an object', () => {
    const before = JSON.stringify({ marigold: 'something else' });
    const file = writePkg('.', before);

    expect(() => writeMarker(file, 'v19')).toThrow(
      /"marigold" is not an object/
    );
    expect(fs.readFileSync(file, 'utf8')).toBe(before);
  });
});
