import { resolveRailActivation } from './railActivation';

const section = { key: 'tickets', isSection: true };
const link = { key: 'berichte', isSection: false };

describe('direct links', () => {
  test('selects without toggling', () => {
    const action = resolveRailActivation(link, {
      selectedKey: 'tickets',
      state: 'expanded',
    });

    expect(action).toEqual({
      select: true,
      toggle: false,
      focusPanel: false,
    });
  });
});

describe('sections', () => {
  test('re-clicking the active section does not collapse the panel', () => {
    const action = resolveRailActivation(section, {
      selectedKey: 'tickets',
      state: 'expanded',
    });

    expect(action).toEqual({
      select: false,
      toggle: false,
      focusPanel: false,
    });
  });

  test('re-clicking the active section on a collapsed panel expands it', () => {
    const action = resolveRailActivation(section, {
      selectedKey: 'tickets',
      state: 'collapsed',
    });

    expect(action).toEqual({
      select: false,
      toggle: true,
      focusPanel: true,
    });
  });

  test('switching sections swaps the panel and focuses it', () => {
    const action = resolveRailActivation(section, {
      selectedKey: 'other',
      state: 'expanded',
    });

    expect(action).toEqual({
      select: true,
      toggle: false,
      focusPanel: true,
    });
  });

  test('switching while collapsed also reopens the panel', () => {
    const action = resolveRailActivation(section, {
      selectedKey: 'other',
      state: 'collapsed',
    });

    expect(action).toEqual({
      select: true,
      toggle: true,
      focusPanel: true,
    });
  });
});
