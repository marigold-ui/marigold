import { describe, expect, it } from 'vitest';
import { config, examplePages } from './navigation';

describe('examplePages', () => {
  it('surfaces exactly the standalone demos', () => {
    // The full contract of the docs cmdk search: one entry per standalone
    // demo. A future nav edit that drops or duplicates a demo should break here.
    expect(examplePages()).toEqual([
      { name: 'App Shell', url: '/examples' },
      { name: 'Filter', url: '/examples/filter' },
      { name: 'Event Form', url: '/examples/event-form' },
      { name: 'Settings Form', url: '/examples/settings-form' },
      { name: 'Auto-Save Settings', url: '/examples/auto-save-settings' },
      { name: 'Inventory', url: '/examples/inventory' },
    ]);
  });

  it('collapses a self-contained app to a single entry at its landing', () => {
    // "App Shell" has an empty-slug index child, so it collapses to one entry
    // pointing at the base — its internal screens are not standalone examples.
    const appShell = examplePages().filter(page => page.name === 'App Shell');
    expect(appShell).toEqual([{ name: 'App Shell', url: config.base }]);
  });

  it('does not surface the internal screens of a self-contained app', () => {
    const names = examplePages().map(page => page.name);
    // App Shell internal navigation (Analytics, Users, Teams, Billing, …).
    expect(names).not.toContain('Users');
    expect(names).not.toContain('Teams');
    expect(names).not.toContain('Billing');
    expect(names).not.toContain('Analytics');
    expect(names).not.toContain('General');
    expect(names).not.toContain('Security');
  });

  it('recurses into a plain sidebar grouping and surfaces each child', () => {
    // "Form" has no index child, so it is a grouping — each child is its own
    // demo rather than being collapsed away.
    const names = examplePages().map(page => page.name);
    expect(names).not.toContain('Form');
    expect(names).toContain('Event Form');
    expect(names).toContain('Settings Form');
    expect(names).toContain('Auto-Save Settings');
  });

  it('skips non-route nodes (GroupLabel, Separator)', () => {
    const names = examplePages().map(page => page.name);
    // "Settings" is a GroupLabel inside App Shell, not a route.
    expect(names).not.toContain('Settings');
  });
});
