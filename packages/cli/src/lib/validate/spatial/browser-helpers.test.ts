import { describe, expect, it } from 'vitest';
import { buildInstallScript } from './browser-helpers.js';

describe('buildInstallScript', () => {
  const script = buildInstallScript();
  it('assigns onto window.__mv', () => {
    expect(script).toContain('window.__mv');
  });
  it('serializes each shared helper by name', () => {
    for (const name of [
      'cssPath',
      'describeEl',
      'isHidden',
      'focusFingerprint',
    ]) {
      expect(script).toContain(`${name}:`);
    }
  });
  it('produces a self-contained string with no module references', () => {
    // A serialized helper must not reference an import or module-scope binding;
    // the cheapest proxy is that the script does not contain an import keyword.
    expect(script).not.toContain('import ');
    expect(script).not.toContain('require(');
  });
});
