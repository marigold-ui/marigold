import {
  compareVersions,
  minVersionFromRange,
  satisfiesMin,
} from './version.js';

describe('compareVersions', () => {
  test('returns 0 for equal versions', () => {
    expect(compareVersions('1.2.3', '1.2.3')).toBe(0);
  });

  test('orders by major, then minor, then patch', () => {
    expect(compareVersions('1.0.0', '2.0.0')).toBe(-1);
    expect(compareVersions('2.1.0', '2.0.9')).toBe(1);
    expect(compareVersions('2.0.1', '2.0.2')).toBe(-1);
  });

  test('sorts a prerelease before its matching stable release', () => {
    expect(compareVersions('1.0.0-beta.3', '1.0.0')).toBe(-1);
    expect(compareVersions('1.0.0', '1.0.0-beta.3')).toBe(1);
  });

  test('treats two prereleases of the same base as equal (cheap rule)', () => {
    expect(compareVersions('18.0.0-beta.3', '18.0.0-beta.4')).toBe(0);
  });

  test('ignores build metadata (including a hyphen inside it)', () => {
    // A `-` in `+build-5` must not be read as a prerelease tag, or the version
    // would sort below its own stable release and trigger a false "outdated".
    expect(compareVersions('1.0.0+build-5', '1.0.0')).toBe(0);
    expect(compareVersions('1.0.0+build-5', '1.0.0-beta.3')).toBe(1);
  });

  test('returns 0 when either side is unparseable', () => {
    expect(compareVersions('not-a-version', '1.0.0')).toBe(0);
    expect(compareVersions('1.0.0', 'latest')).toBe(0);
  });
});

describe('minVersionFromRange', () => {
  test('extracts the concrete version from >=, ^, ~ and exact ranges', () => {
    expect(minVersionFromRange('>=17.0.0')).toBe('17.0.0');
    expect(minVersionFromRange('^19.0.0')).toBe('19.0.0');
    expect(minVersionFromRange('~18.2.0')).toBe('18.2.0');
    expect(minVersionFromRange('19.2.7')).toBe('19.2.7');
  });

  test('returns null when no version is present', () => {
    expect(minVersionFromRange('*')).toBeNull();
    expect(minVersionFromRange('latest')).toBeNull();
  });
});

describe('satisfiesMin', () => {
  test('true when version meets or exceeds the minimum', () => {
    expect(satisfiesMin('19.2.7', '17.0.0')).toBe(true);
    expect(satisfiesMin('17.0.0', '17.0.0')).toBe(true);
  });

  test('false when version is below the minimum', () => {
    expect(satisfiesMin('16.14.0', '17.0.0')).toBe(false);
  });

  test('never fails on unparseable input', () => {
    expect(satisfiesMin('workspace:*', '17.0.0')).toBe(true);
    expect(satisfiesMin('19.0.0', 'unknown')).toBe(true);
  });
});
