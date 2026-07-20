import { resolveRailActivation } from './railActivation';

const section = { key: 'tickets', isSection: true };
const link = { key: 'berichte', isSection: false };

describe('direct links', () => {
  test('desktop: selects and navigates without toggling', () => {
    const action = resolveRailActivation(link, {
      isMobile: false,
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

  test('mobile: the link leaves the page, so the drawer closes with it', () => {
    const action = resolveRailActivation(link, {
      isMobile: true,
      selectedKey: null,
      state: 'expanded',
    });

    expect(action).toEqual({
      select: true,
      toggle: true,
      focusPanel: false,
      navigate: true,
    });
  });
});

describe('sections — mobile drawer', () => {
  test('tapping another section retargets the panel without navigating', () => {
    const action = resolveRailActivation(section, {
      isMobile: true,
      selectedKey: 'other',
      state: 'expanded',
    });

    expect(action).toEqual({
      select: true,
      toggle: false,
      focusPanel: true,
      navigate: false,
    });
  });

  test('re-tapping the active section is a no-op', () => {
    const action = resolveRailActivation(section, {
      isMobile: true,
      selectedKey: 'tickets',
      state: 'expanded',
    });

    expect(action).toEqual({
      select: false,
      toggle: false,
      focusPanel: false,
      navigate: false,
    });
  });
});

describe('sections — desktop', () => {
  test('re-clicking the active section collapses the panel without navigating', () => {
    const action = resolveRailActivation(section, {
      isMobile: false,
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
      isMobile: false,
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
      isMobile: false,
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
      isMobile: false,
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
