import merge from 'deepmerge';
import { useRef } from 'react';
import isEqual from 'react-fast-compare';

import { CSSObject } from './types';
import { useTheme } from './useTheme';

// Types
// ---------------
type IndexObject = { [key: string]: any };

export type ComponentState =
  | 'hover'
  | 'focus'
  | 'active'
  | 'visited'
  | 'disabled'
  | 'readOnly'
  | 'checked'
  | 'error';

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
  const key = typeof path === 'string' ? path.split('.') : [path];

  let result = obj;
  for (let i = 0, length = key.length; i < length; i++) {
    if (!result) break;
    result = (result as any)[key[i]];
  }

  return result === undefined ? fallback : result;
};

/**
 * Convert an object of states, where the key is the state name and
 * the value is a boolean, to an array of strings.
 */
const statesToFlags = ({
  disabled,
  ...states
}: { [key in ComponentState]?: boolean } = {}): ComponentState[] => {
  let flags = Object.keys(states).filter(
    key => states[key as keyof typeof states]
  ) as ComponentState[];

  /**
   * Adding `disabled` at the end of the array so that it
   * will be the most prominent state and override the others.
   */
  if (disabled) {
    flags.push('disabled');
  }

  return flags;
};

// Hook
// ---------------
export interface ComponentStylesProps {
  variant?: string;
  size?: string;
  states?: { [key in ComponentState]?: boolean };
}

export function useComponentStyles(
  componentName: string,
  props?: ComponentStylesProps,
  options?: {
    parts: never;
  }
): CSSObject;

export function useComponentStyles<
  Part extends string,
  Parts extends ReadonlyArray<Part>
>(
  componentName: string,
  props?: ComponentStylesProps,
  options?: {
    parts: Parts;
  }
): {
  [P in Parts[number]]: CSSObject;
};

export function useComponentStyles(
  componentName: string,
  props: ComponentStylesProps = {},
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
    const states = statesToFlags(props.states).map(
      state => componentStyles.state?.[state] || {}
    );

    // We deep merge so that parts (if they exists) also get put together
    const styles = merge.all([base, size, ...states, variant]) as IndexObject;

    // If a part does not exists in the theme, well add an empty object
    if (options.parts) {
      options.parts.forEach((part: string) => {
        styles[part] = styles[part] ?? {};
      });
    }

    if (!isEqual(stylesRef.current, styles)) {
      stylesRef.current = styles;
    }
  }

  return stylesRef.current;
}
