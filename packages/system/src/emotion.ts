import React from 'react';

/**
 * Fix until the global JSX augmentation is not included in
 * `@emotion/core`. See https://github.com/emotion-js/emotion/issues/1257
 * for more information.
 *
 * *Why is this a problem?*
 *
 * (1) Every JSX element accepts a `css` prop, but we don't parse that.
 * (2) Every JSX element only accepts a type that is compatible with emotion's
 *     css prop, which we don't care, since we first pass the `css` prop
 *     to styled-system.
 *
 * *The fix consist of two parts:*
 *
 * (1) using `.yarnclean` to remove the `emotion/core` typings completly.
 * (2) having this sink file to re-apply the typings and tell TS to ignore
 *     the untyped import.
 */
import {
  css as cssEmotion,
  jsx as createElement,
  Global as EmotionGlobal,
  ThemeContext as EmotionContext,
  // @ts-ignore
} from '@emotion/core';

// Emotion API
// ---------------
export const jsx = createElement as typeof React.createElement;
export const css = cssEmotion as (
  template: TemplateStringsArray,
  ...args: any[]
) => object;
export const ThemeContext = EmotionContext as React.Context<any>;
export const Global = EmotionGlobal as (
  props: React.PropsWithChildren<{ styles: any }>
) => React.ReactElement;
