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
 */
const {
  css: cssEmotion,
  jsx: createElement,
  Global: EmotionGlobal,
  ThemeContext: EmotionContext,
} = require('@emotion/core');

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
