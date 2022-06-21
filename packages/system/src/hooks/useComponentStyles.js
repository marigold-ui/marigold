import merge from 'deepmerge';
import { useRef } from 'react';
import isEqual from 'react-fast-compare';
import { useTheme } from './useTheme';
// Helper
// ---------------
/**
 * Safely get a dot-notated path within a nested object, with ability
 * to return a default if the full key path does not exist or
 * the value is undefined
 *
 * Based on: https://github.com/developit/dlv
 */
const get = (obj, path, fallback) => {
  const key = path.split('.');
  let result = obj;
  for (let i = 0, length = key.length; i < length; i++) {
    if (!result) break;
    result = result[key[i]];
  }
  return result === undefined ? fallback : result;
};
export function useComponentStyles(componentName, props = {}, options = {}) {
  var _a, _b;
  const { theme } = useTheme();
  const componentStyles = get(theme, `components.${componentName}`);
  // Store styles in ref to prevent re-computation
  const stylesRef = useRef({});
  if (componentStyles) {
    const base = componentStyles.base || {};
    const size =
      ((_a = componentStyles.size) === null || _a === void 0
        ? void 0
        : _a[props.size]) || {};
    const variant =
      ((_b = componentStyles.variant) === null || _b === void 0
        ? void 0
        : _b[props.variant]) || {};
    // We deep merge so that parts (if they exists) also get put together
    let styles = merge.all([base, size, variant]);
    // Only return requested parts. If they don't exist, set them as empty object
    if (options.parts) {
      styles = options.parts.reduce((result, part) => {
        result[part] = styles[part] || {};
        return result;
      }, {});
    }
    if (!isEqual(stylesRef.current, styles)) {
      stylesRef.current = styles;
    }
  }
  return stylesRef.current;
}
//# sourceMappingURL=useComponentStyles.js.map
