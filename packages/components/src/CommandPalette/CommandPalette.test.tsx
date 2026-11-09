import { render, screen, within } from '@testing-library/react';
import { renderWithOverlay } from '../test.utils';
import { Basic } from './CommandPalette.stories';
import { isCommandPaletteShortcut } from './useCommandPaletteShortcut';

const key = (init: Partial<KeyboardEvent>) => ({
  key: 'k',
  metaKey: false,
  ctrlKey: false,
  altKey: false,
  shiftKey: false,
  defaultPrevented: false,
  ...init,
});

describe('isCommandPaletteShortcut', () => {
  test('matches ⌘K on macOS and Ctrl+K elsewhere', () => {
    expect(isCommandPaletteShortcut(key({ metaKey: true }), 'k', true)).toBe(
      true
    );
    expect(isCommandPaletteShortcut(key({ ctrlKey: true }), 'k', false)).toBe(
      true
    );
  });

  test('ignores the other platform modifier', () => {
    expect(isCommandPaletteShortcut(key({ ctrlKey: true }), 'k', true)).toBe(
      false
    );
    expect(isCommandPaletteShortcut(key({ metaKey: true }), 'k', false)).toBe(
      false
    );
  });

  test('ignores extra modifiers and other keys', () => {
    expect(
      isCommandPaletteShortcut(
        key({ ctrlKey: true, shiftKey: true }),
        'k',
        false
      )
    ).toBe(false);
    expect(
      isCommandPaletteShortcut(key({ ctrlKey: true, altKey: true }), 'k', false)
    ).toBe(false);
    expect(
      isCommandPaletteShortcut(key({ key: 'j', ctrlKey: true }), 'k', false)
    ).toBe(false);
  });

  test('is case-insensitive for the key', () => {
    expect(
      isCommandPaletteShortcut(key({ key: 'K', ctrlKey: true }), 'k', false)
    ).toBe(true);
  });

  test('yields when another handler already claimed the event', () => {
    expect(
      isCommandPaletteShortcut(
        key({ ctrlKey: true, defaultPrevented: true }),
        'k',
        false
      )
    ).toBe(false);
  });
});

test('opens by default with defaultOpen', async () => {
  renderWithOverlay(<Basic.Component defaultOpen />);

  expect(
    await screen.findByRole('dialog', { name: 'Command palette' })
  ).toBeInTheDocument();
});

test('the trigger announces the shortcut', () => {
  render(<Basic.Component />);

  expect(screen.getByRole('button', { name: /search/i })).toHaveAttribute(
    'aria-keyshortcuts',
    expect.stringMatching(/^(Meta|Control)\+K$/)
  );
});

test('the trigger hides the hint when the shortcut is disabled', () => {
  render(<Basic.Component shortcut={false} />);

  const trigger = screen.getByRole('button', { name: /search/i });
  expect(trigger).not.toHaveAttribute('aria-keyshortcuts');
  expect(within(trigger).queryByText(/⌘K|Ctrl K/)).toBeNull();
});
