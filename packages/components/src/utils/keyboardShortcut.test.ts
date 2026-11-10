import { formatShortcut, matchesShortcut } from './keyboardShortcut';

const key = (init: Partial<KeyboardEvent>) => ({
  key: 'k',
  metaKey: false,
  ctrlKey: false,
  altKey: false,
  shiftKey: false,
  defaultPrevented: false,
  ...init,
});

describe('matchesShortcut', () => {
  test('matches ⌘K on macOS and Ctrl+K elsewhere', () => {
    expect(matchesShortcut(key({ metaKey: true }), 'k', true)).toBe(true);
    expect(matchesShortcut(key({ ctrlKey: true }), 'k', false)).toBe(true);
  });

  test('ignores the other platform modifier', () => {
    expect(matchesShortcut(key({ ctrlKey: true }), 'k', true)).toBe(false);
    expect(matchesShortcut(key({ metaKey: true }), 'k', false)).toBe(false);
  });

  test('ignores extra modifiers and other keys', () => {
    expect(
      matchesShortcut(key({ ctrlKey: true, shiftKey: true }), 'k', false)
    ).toBe(false);
    expect(
      matchesShortcut(key({ ctrlKey: true, altKey: true }), 'k', false)
    ).toBe(false);
    expect(matchesShortcut(key({ key: 'j', ctrlKey: true }), 'k', false)).toBe(
      false
    );
  });

  test('is case-insensitive for the key', () => {
    expect(matchesShortcut(key({ key: 'K', ctrlKey: true }), 'k', false)).toBe(
      true
    );
  });

  test('yields when another handler already claimed the event', () => {
    expect(
      matchesShortcut(
        key({ ctrlKey: true, defaultPrevented: true }),
        'k',
        false
      )
    ).toBe(false);
  });
});

describe('formatShortcut', () => {
  test('uses ⌘ on Apple devices and Ctrl elsewhere', () => {
    expect(formatShortcut('k', true)).toEqual({
      label: '⌘K',
      ariaKeyShortcuts: 'Meta+K',
    });
    expect(formatShortcut('b', false)).toEqual({
      label: 'Ctrl+B',
      ariaKeyShortcuts: 'Control+B',
    });
  });
});
