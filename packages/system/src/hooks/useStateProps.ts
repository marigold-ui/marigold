import { useMemo } from 'react';
import { KebabCase } from '@marigold/types';

export type ComponentState =
  | 'active'
  | 'checked'
  | 'disabled'
  | 'error'
  | 'expanded'
  | 'focus'
  | 'focusVisible'
  | 'hasIcon'
  | 'hover'
  | 'indeterminate'
  | 'readOnly'
  | 'required'
  | 'selected'
  | 'visited';

export type StateAttrKeyProps = `data-${KebabCase<ComponentState>}`;

export type StateAttrProps = {
  [key in StateAttrKeyProps]?: '';
};

export type UseStateProps = {
  [key in ComponentState]?: boolean;
};

/**
 * Stolen from https://github.com/joakimbeng/kebab-case
 */
const KEBAB_REGEX = /[A-Z\u00C0-\u00D6\u00D8-\u00DE]/g;
const toKebap = (val: string): KebabCase<string> =>
  val.replace(KEBAB_REGEX, match => `-${match.toLocaleLowerCase()}`);

/**
 * Given a map of states (e.g. `{ hover: true, focus: false }`) returns an
 * object that can be used to set state props on a component
 * (e.g. `[data-hover]` and `[data-focus]`).
 */
export const useStateProps = (states: UseStateProps): StateAttrProps => {
  return useMemo(() => {
    const stateProps: StateAttrProps = {};
    for (const state in states) {
      if (states[state as ComponentState]) {
        const key = `data-${toKebap(state)}` as StateAttrKeyProps;
        stateProps[key] = '';
      }
    }
    return stateProps;
  }, [states]);
};
