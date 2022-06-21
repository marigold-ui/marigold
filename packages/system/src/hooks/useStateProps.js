import { useRef } from 'react';
import isEqual from 'react-fast-compare';
/**
 * Stolen from https://github.com/joakimbeng/kebab-case
 */
const KEBAB_REGEX = /[A-Z\u00C0-\u00D6\u00D8-\u00DE]/g;
const toKebap = val =>
  val.replace(KEBAB_REGEX, match => `-${match.toLocaleLowerCase()}`);
/**
 * Given a map of states (e.g. `{ hover: true, focus: false }`) returns an
 * object that can be used to set state props on a component
 * (e.g. `[data-hover]` and `[data-focus]`).
 */
export const useStateProps = states => {
  // Store states in ref to prevent re-computation
  const statePropsRef = useRef({});
  let stateProps = {};
  for (let state in states) {
    if (states[state]) {
      const key = `data-${toKebap(state)}`;
      stateProps[key] = '';
    }
  }
  if (!isEqual(statePropsRef.current, stateProps)) {
    statePropsRef.current = stateProps;
  }
  return statePropsRef.current;
};
//# sourceMappingURL=useStateProps.js.map
