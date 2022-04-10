import { useRef } from 'react';
import isEqual from 'react-fast-compare';

export type ComponentState =
  | 'hover'
  | 'focus'
  | 'active'
  | 'visited'
  | 'disabled'
  | 'readOnly'
  | 'checked'
  | 'indeterminate'
  | 'invalid';

export type StateAttrsKey = `data-${Lowercase<ComponentState>}`;

export type StateAttrs = {
  [key in StateAttrsKey]?: '';
};

/**
 * Given a map of states (e.g. `{ hover: true, focus: false }`) returns an
 * object that can be used to set state props on a component
 * (e.g. `[data-hover]` and `[data-focus]`).
 */
export const useStateProps = (
  states: { [key in ComponentState]?: boolean } = {}
): StateAttrs => {
  // Store states in ref to prevent re-computation
  const statePropsRef = useRef({});

  let stateProps: StateAttrs = {};
  for (let state in states) {
    if (states[state as ComponentState]) {
      const key = `data-${state.toLocaleLowerCase()}` as StateAttrsKey;
      stateProps[key] = '';
    }
  }

  if (!isEqual(statePropsRef.current, stateProps)) {
    statePropsRef.current = stateProps;
  }

  return statePropsRef.current;
};
