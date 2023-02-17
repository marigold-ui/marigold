import React from 'react';
import { CSSObject, Global as EmotionGlobal } from '@emotion/react';

import { useTheme } from '../../hooks/useTheme';
import * as normalize from './normalize';

// Helper
// ---------------

/**
 * Make sure that the relevant `body` rules are applied to the
 * `selector` element(s).
 */
const mergeRoot = ({ body, ...rest }: CSSObject) =>
  typeof body === 'object'
    ? {
        ...(body as CSSObject),
        ...rest,
      }
    : {
        body,
        ...rest,
      };

// Props
// ---------------
export type GlobalProps = {
  /**
   * CSS Selector to change the element that the styles will be applied to.
   */
  selector?: string;

  /**
   * Normalize `html` and `body`? Defaults to `true`.
   */
  normalizeDocument?: boolean;
};

// Component
// ---------------
export const Global = ({ normalizeDocument = true, selector }: GlobalProps) => {
  const { css, theme } = useTheme();
  const rootStyles = css(theme?.root || {});

  const styles = [
    normalizeDocument ? normalize.document : {},
    // Prefix normalization and root styles with selector if provided.
    selector
      ? { [`:where(${selector})`]: normalize.element }
      : normalize.element,
    selector ? { [`:where(${selector})`]: mergeRoot(rootStyles) } : rootStyles,
  ];

  return <EmotionGlobal styles={styles} />;
};
