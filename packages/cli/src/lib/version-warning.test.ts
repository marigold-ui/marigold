import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { versionWarning } from './version-warning.js';

const install = (cwd: string, version: string) => {
  const dir = path.join(cwd, 'node_modules', '@marigold', 'components');
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(
    path.join(dir, 'package.json'),
    JSON.stringify({ name: '@marigold/components', version })
  );
};

const docsAt = (version: string) => ({
  packages: { '@marigold/components': version },
});

let cwd: string;

beforeEach(() => {
  cwd = fs.mkdtempSync(path.join(os.tmpdir(), 'marigold-version-warning-'));
});

afterEach(() => {
  fs.rmSync(cwd, { recursive: true, force: true });
});

test('warns with both versions when the installed minor version is older', () => {
  install(cwd, '17.4.0');

  const warning = versionWarning(docsAt('18.2.1'), cwd);

  expect(warning).toMatchObject({ installed: '17.4.0', docs: '18.2.1' });
  expect(warning?.message).toContain('17.4.0');
  expect(warning?.message).toContain('18.2.1');
  expect(warning?.message).not.toContain('\n');
});

test('warns when the installed major version is older', () => {
  install(cwd, '17.9.9');

  expect(versionWarning(docsAt('18.0.0'), cwd)).toMatchObject({
    installed: '17.9.9',
    docs: '18.0.0',
  });
});

test.each([
  ['the same version', '18.2.1'],
  ['a newer version', '18.3.0'],
  ['an older patch of the same minor', '18.2.0'],
  ['a prerelease of the same minor', '18.2.0-beta.1'],
])('stays silent when %s is installed', (_, installed) => {
  install(cwd, installed);

  expect(versionWarning(docsAt('18.2.1'), cwd)).toBeNull();
});

test('stays silent when @marigold/components is not installed', () => {
  expect(versionWarning(docsAt('18.2.1'), cwd)).toBeNull();
});

test('stays silent when the manifest carries no package versions', () => {
  install(cwd, '17.4.0');

  expect(versionWarning({}, cwd)).toBeNull();
  expect(versionWarning(null, cwd)).toBeNull();
});
