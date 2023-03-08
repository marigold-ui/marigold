import merge from 'deepmerge';
import { useRef } from 'react';
import isEqual from 'react-fast-compare';

import { CSSObject } from '../types';
import { useTheme } from './useTheme';

import { twMerge } from 'tailwind-merge';
import path from 'path';

import theme from 'themes/theme-unicorn/src/index';

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
export interface ComponentStylesProps {
  variant?: string;
  size?: string;
}

export type ComponentStyleParts<Parts extends string[]> = {
  [P in Parts[number]]: CSSObject;
};

export function useStyles(componentName: string): any;
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
  const { theme, content } = useTheme();

  const getPath = path.resolve(process.cwd(), '../themes/**/src/index.js');

  console.log(getPath);
  const componentStyles = get(theme, componentName);

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

/**
 * useComponentStyles({ component: 'Button', variant, size, slots: ['table', 'cell'] })
 */

export const useComponentStylessss = (
  componentName: string,
  vas: any,
  slots?: string[]
) => {
  // const ctx = useTheme();
  console.log(theme.components[componentName]);
  const classNames = theme.components[componentName]?.({ variant: 'dark' });

  // console.log('themes', themes);

  // const baseStyle = theme.Badge.base;
  // const variants = theme.Badge.variants;

  // const classNames = twMerge(baseStyle, variants.info);
  return classNames as string;
};
