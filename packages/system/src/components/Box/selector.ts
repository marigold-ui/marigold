import { StyleObject } from '../../types';

const createteSelector = (
  selectors: string[],
  states: string[],
  suffix = ''
) => {
  return selectors
    .map(selector =>
      states.map(state => `${selector}${state}${suffix ? ` ${suffix}` : ''}`)
    )
    .flat()
    .join(', ');
};

const selector = {
  self: '&',
  grouped: ['[role=group]', '[data-group]'],
};

const state = {
  none: [''],
  hover: [':hover:not([disabled])', '[data-hover]'],
  focus: [':focus', '[data-focus]'],
  focusVisible: [':focus-visible', '[data-focus-visible]'],
  active: [':active', '[data-active]'],
  disabled: ['[disabled]', '[aria-disabled=true]', '[data-disabled]'],
  readOnly: ['[readonly]', '[aria-readonly=true]', '[data-read-only]'],
  checked: ['[aria-checked=true]', '[data-checked]'],
  indeterminate: ['[aria-checked=mixed]', '[data-indeterminate]'],
  selected: ['[aria-selected=true]', '[data-selected]'],
  error: [':invalid', '[aria-invalid=true]', '[data-error]'],
  expanded: ['[aria-expanded=true]', '[data-expanded]'],
};

const pseudos = {
  '&:hover': createteSelector([selector.self], state.hover),
  '&:focus': createteSelector([selector.self], state.focus),
  '&:focus-visible': createteSelector([selector.self], state.focusVisible),
  '&:active': createteSelector([selector.self], state.active),
  '&:disabled': createteSelector([selector.self], state.disabled),
  '&:read-only': createteSelector([selector.self], state.readOnly),
  '&:checked': createteSelector([selector.self], state.checked),
  '&:selected': createteSelector([selector.self], state.selected),
  '&:indeterminate': createteSelector([selector.self], state.indeterminate),
  '&:error': createteSelector([selector.self], state.error),
  '&:expanded': createteSelector([selector.self], state.expanded),

  // Selector for elements that are part of a group
  '&:in-group': createteSelector(selector.grouped, state.none, selector.self),
  '&:hover-group': createteSelector(
    selector.grouped,
    state.hover,
    selector.self
  ),
  '&:focus-group': createteSelector(
    selector.grouped,
    state.focus,
    selector.self
  ),
  '&:active-group': createteSelector(
    selector.grouped,
    state.active,
    selector.self
  ),
  '&:error-group': createteSelector(
    selector.grouped,
    state.error,
    selector.self
  ),
} as const;

/**
 * Transform a states (hover, focus, ...) in a StyleObject to
 * our format (pseudo selector plus corresponding data-attribute).
 *
 * We stole this idea from https://chakra-ui.com/.
 */
export const transformPseudos = (styles: StyleObject) => {
  let result: StyleObject = {};

  for (let key in styles) {
    const value = styles[key as keyof StyleObject];

    if (key in pseudos) {
      key = pseudos[key as keyof typeof pseudos];
    }

    if (typeof value === 'object') {
      result[key] = transformPseudos(value);
      continue;
    }

    result[key] = value;
  }

  return result;
};
