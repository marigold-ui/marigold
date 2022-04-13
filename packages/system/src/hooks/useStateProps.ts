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
  | 'error';

export type StateAttrKeyProps = `data-${Lowercase<ComponentState>}`;

export type StateAttrProps = {
  [key in StateAttrKeyProps]?: '';
};

export type UseStateProps = {
  [key in ComponentState]?: boolean;
};

/**
 * Given a map of states (e.g. `{ hover: true, focus: false }`) returns an
 * object that can be used to set state props on a component
 * (e.g. `[data-hover]` and `[data-focus]`).
 */
export const useStateProps = (states: UseStateProps): StateAttrProps => {
  // Store states in ref to prevent re-computation
  const statePropsRef = useRef({});

  let stateProps: StateAttrProps = {};
  for (let state in states) {
    if (states[state as ComponentState]) {
      const key = `data-${state.toLocaleLowerCase()}` as StateAttrKeyProps;
      stateProps[key] = '';
    }
  }

  if (!isEqual(statePropsRef.current, stateProps)) {
    statePropsRef.current = stateProps;
  }

  return statePropsRef.current;
};
