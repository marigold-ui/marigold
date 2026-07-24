import { resolveRailActivation } from './railActivation';

const section = { key: 'tickets', isSection: true };
const link = { key: 'berichte', isSection: false };

describe('direct links', () => {
  test('selects and navigates without toggling', () => {
    const action = resolveRailActivation(link, {
      selectedKey: 'tickets',
      state: 'expanded',
    });

    expect(action).toEqual({
      select: true,
      toggle: false,
      focusPanel: false,
      navigate: true,
    });
  });
});

describe('sections', () => {
  test('re-clicking the active section collapses the panel without navigating', () => {
    const action = resolveRailActivation(section, {
      selectedKey: 'tickets',
      state: 'expanded',
    });

    expect(action).toEqual({
      select: false,
      toggle: true,
      focusPanel: false,
      navigate: false,
    });
  });

  test('re-clicking while collapsed expands and focuses the panel', () => {
    const action = resolveRailActivation(section, {
      selectedKey: 'tickets',
      state: 'collapsed',
    });

    expect(action).toEqual({
      select: false,
      toggle: true,
      focusPanel: true,
      navigate: false,
    });
  });

  test('switching sections swaps the panel, focuses it, and navigates', () => {
    const action = resolveRailActivation(section, {
      selectedKey: 'other',
      state: 'expanded',
    });

    expect(action).toEqual({
      select: true,
      toggle: false,
      focusPanel: true,
      navigate: true,
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
      navigate: true,
    });
  });
});
