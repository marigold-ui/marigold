import { describe, expect, it } from 'vitest';
import {
  checkTokenCompliance,
  snapshotBrowserDefaults,
} from './token-compliance.js';

describe('checkTokenCompliance', () => {
  it('exports snapshotBrowserDefaults function', () => {
    expect(typeof snapshotBrowserDefaults).toBe('function');
  });

  it('exports checkTokenCompliance function', () => {
    expect(typeof checkTokenCompliance).toBe('function');
  });
});
