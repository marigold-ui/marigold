import { describe, expect, it } from 'vitest';
import { type TriggerSignals, classifyTrigger } from './interaction-driver.js';

const sig = (over: Partial<TriggerSignals> = {}): TriggerSignals => ({
  role: null,
  ariaHasPopup: null,
  ariaExpanded: null,
  hasPopoverTarget: false,
  hasAriaControls: false,
  isSummary: false,
  hasResolvableAriaDescribedBy: false,
  ...over,
});

describe('classifyTrigger', () => {
  it('classifies a menu trigger (aria-haspopup="menu")', () => {
    expect(classifyTrigger(sig({ ariaHasPopup: 'menu' }))).toEqual({
      kind: 'menu',
      activation: 'press',
    });
  });

  it('treats aria-haspopup="true" as a menu', () => {
    expect(classifyTrigger(sig({ ariaHasPopup: 'true' }))?.kind).toBe('menu');
  });

  it('classifies a listbox / combobox trigger', () => {
    expect(classifyTrigger(sig({ ariaHasPopup: 'listbox' }))?.kind).toBe(
      'listbox'
    );
  });

  it('classifies a dialog trigger', () => {
    expect(classifyTrigger(sig({ ariaHasPopup: 'dialog' }))?.kind).toBe(
      'dialog'
    );
  });

  it('classifies a role=tab as a tab trigger', () => {
    expect(classifyTrigger(sig({ role: 'tab' }))).toEqual({
      kind: 'tab',
      activation: 'press',
    });
  });

  it('classifies a native <summary> as a disclosure', () => {
    expect(classifyTrigger(sig({ isSummary: true }))?.kind).toBe('disclosure');
  });

  it('classifies a collapsed aria-expanded="false" as a disclosure', () => {
    expect(classifyTrigger(sig({ ariaExpanded: 'false' }))?.kind).toBe(
      'disclosure'
    );
  });

  it('classifies a popovertarget trigger', () => {
    expect(classifyTrigger(sig({ hasPopoverTarget: true }))?.kind).toBe(
      'popover'
    );
  });

  it('ignores aria-haspopup="false"', () => {
    expect(classifyTrigger(sig({ ariaHasPopup: 'false' }))).toBeNull();
  });

  it('ignores an already-expanded disclosure (nothing new to reveal)', () => {
    expect(classifyTrigger(sig({ ariaExpanded: 'true' }))).toBeNull();
  });

  it('returns null for a non-trigger element', () => {
    expect(classifyTrigger(sig())).toBeNull();
  });

  it('prioritises aria-haspopup over a role=tab', () => {
    expect(
      classifyTrigger(sig({ role: 'tab', ariaHasPopup: 'menu' }))?.kind
    ).toBe('menu');
  });

  it('classifies a resolvable aria-describedby as a hover-activated popover', () => {
    // Regression: this was the one Activation value ('hover') that no code
    // path ever returned, so hover-revealed content (tooltips) was never
    // discovered by the interaction driver.
    expect(
      classifyTrigger(sig({ hasResolvableAriaDescribedBy: true }))
    ).toEqual({ kind: 'popover', activation: 'hover' });
  });

  it('prioritises aria-haspopup over a resolvable aria-describedby', () => {
    expect(
      classifyTrigger(
        sig({ ariaHasPopup: 'menu', hasResolvableAriaDescribedBy: true })
      )?.activation
    ).toBe('press');
  });
});
