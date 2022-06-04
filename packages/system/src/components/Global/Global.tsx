import React from 'react';
import { Global as EmotionGlobal } from '@emotion/react';

import { useTheme } from '../../hooks/useTheme';
import * as normalize from './normalize';

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

export const Global = ({ normalizeDocument = true, selector }: GlobalProps) => {
  const { css, theme } = useTheme();
  const globals = css(theme.globals || {});

  const styles = [
    normalizeDocument ? normalize.document : {},
    // Prefix normalization and globals with selector if provided.
    selector
      ? { [`:where(${selector})`]: normalize.element }
      : normalize.element,
    selector ? { [`:where(${selector})`]: globals } : globals,
  ];

  return <EmotionGlobal styles={styles} />;
};
