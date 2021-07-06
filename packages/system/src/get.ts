import { css } from '@theme-ui/css';
import { StyleObject } from './types';

/**
 * Helper to get the raw css object that is only transpiled by `theme-ui`.
 */
export const get = (style: StyleObject, theme: object) => css(style)(theme);
