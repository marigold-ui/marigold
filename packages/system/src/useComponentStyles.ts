import merge from 'deepmerge';
import { useRef } from 'react';
import isEqual from 'react-fast-compare';

import { CSSObject } from './types';
import { useTheme } from './useTheme';

// Helper
// ---------------
export function get(obj: object, path: string, fallback?: any): any {
  const key = typeof path === 'string' ? path.split('.') : [path];

  let result = obj;
  for (let i = 0, length = key.length; i < length; i++) {
    if (!result) break;
    result = (result as any)[key[i]];
  }

  return result === undefined ? fallback : result;
}

// Types
// ---------------
export type ComponentState =
  | 'hover'
  | 'focus'
  | 'active'
  | 'visited'
  | 'disabled'
  | 'readOnly'
  | 'error'
  | 'checked'
  | 'indeterminate';

export interface ComponentStylesProps {
  variant?: string;
  size?: string;
  state?: ComponentState;
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
  props: any = {},
  options: any = {}
) {
  const { theme } = useTheme();
  const componentStyles = get(theme, `components.${componentName}`, {});

  // Store styles in ref to prevent re-computation
  const stylesRef = useRef({});

  if (componentStyles) {
    const base = componentStyles.base || {};
    const variant = componentStyles?.variant?.[props.variant] || {};
    const size = componentStyles?.size?.[props.size] || {};
    const state = componentStyles?.state?.[props.state] || {};

    const styles = merge.all([base, variant, size, state]);

    if (!isEqual(stylesRef.current, styles)) {
      stylesRef.current = styles;
    }
  }

  return stylesRef.current;
}
