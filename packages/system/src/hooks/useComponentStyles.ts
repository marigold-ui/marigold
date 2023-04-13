import { useTheme } from './useTheme';

import theme from '@marigold/theme-unicorn';

// Types
// ---------------
type IndexObject = { [key: string]: any };

// Helper
// ---------------
/**
 * Safely get a dot-notated path within a nested object, with ability
 * to return a default if the full key path does not exist or
 * the value is undefined
 *
 * Based on: https://github.com/developit/dlv
 */
const get = (obj: object, path: string, fallback?: any): any => {
  const key = path.split('.');

  let result = obj;
  for (let i = 0, length = key.length; i < length; i++) {
    if (!result) break;
    result = (result as any)[key[i]];
  }

  return result === undefined ? fallback : result;
};

// Hook
// ---------------

// this is the new hook
export const useComponentStylesFromTV = (
  componentName: string,
  options?: {
    variant?: string;
    size?: string;
    slots?: string[];
  }
) => {
  // if we use alle themes
  const theme = useTheme();

  if (!(componentName in (theme.components as IndexObject))) {
    return '';
  }

  const classNames = (theme.components as IndexObject)[componentName]?.({
    variant: options?.variant,
    size: options?.size,
    slots: options?.slots,
  });

  console.log(classNames);
  return classNames;
};

/**
 * useComponentStyles({ component: 'Button', variant, size, slots: ['table', 'cell'] })
 */

export function useComponentStyles(
  componentName: string,
  props?: any,
  options?: {
    parts: never;
  }
): CSSObject;

export function useComponentStyles<
  Part extends string,
  Parts extends ReadonlyArray<Part>
>(
  componentName: string,
  props?: any,
  options?: {
    parts: Parts;
  }
): {
  [P in Parts[number]]: CSSObject;
};

// if I remove this - all breaks

export function useComponentStyles(
  componentName: string,
  props: any = {},
  options: any = {}
) {
  const { theme } = useTheme();
  const componentStyles = get(theme, `components.${componentName}`);

  // Store styles in ref to prevent re-computation
  const stylesRef = useRef({});

  if (componentStyles) {
    const base = componentStyles.base || {};
    const size = componentStyles.size?.[props.size as any] || {};
    const variant = componentStyles.variant?.[props.variant as any] || {};

    // We deep merge so that parts (if they exists) also get put together
    let styles = merge.all([base, size, variant]) as IndexObject;

    // Only return requested parts. If they don't exist, set them as empty object
    if (options.parts) {
      styles = options.parts.reduce((result: IndexObject, part: string) => {
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
