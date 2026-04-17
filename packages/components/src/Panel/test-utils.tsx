import type { RenderResult } from '@testing-library/react';
import { render } from '@testing-library/react';
import type { ReactElement } from 'react';
import { theme } from '@marigold/theme-rui';
import { MarigoldProvider } from '../Provider/MarigoldProvider';

/**
 * Render a raw (non-story) Panel tree with the production theme so
 * `useClassNames` can resolve the `Panel` styles. Mirrors what Storybook
 * decorators do when a story is rendered via its `.Component` export.
 */
export const renderPanel = (ui: ReactElement): RenderResult =>
  render(<MarigoldProvider theme={theme}>{ui}</MarigoldProvider>);
