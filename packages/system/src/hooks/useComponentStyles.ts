import { useTheme } from './useTheme';

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
// const get = (obj: object, path: string, fallback?: any): any => {
//   const key = path.split('.');

//   let result = obj;
//   for (let i = 0, length = key.length; i < length; i++) {
//     if (!result) break;
//     result = (result as any)[key[i]];
//   }

//   return result === undefined ? fallback : result;
// };

const notFound = (val: string) => () =>
  console.warn(`No styling found for "${val}".`);

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
  const theme = useTheme();

  if (!(componentName in (theme.components as IndexObject))) {
    if (options?.slots) {
      return options.slots.reduce((acc, slot) => {
        acc[slot] = notFound(`${componentName}.${slot}`);
        return acc;
      }, {} as any);
    }
    return '';
  }

  const classNames = (theme.components as IndexObject)[componentName]?.({
    variant: options?.variant,
    size: options?.size,
    slots: options?.slots,
  });

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
): any;

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
  [P in Parts[number]]: any;
};

export function useComponentStyles() {
  return {};
}
