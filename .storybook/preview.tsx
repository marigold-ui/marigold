import addonA11y from '@storybook/addon-a11y';
import addonDocs from '@storybook/addon-docs';
import { definePreview } from '@storybook/react-vite';
import addonTestCodegen from 'storybook-addon-test-codegen';
import { MINIMAL_VIEWPORTS } from 'storybook/viewport';
import withMarigoldProviders from './decorators.js';
// @ts-expect-error - CSS side-effect import handled by Vite bundler
import './styles.css';

// Chromatic freezes CSS animations at their last frame before it captures. That
// would pin scroll-driven styles, such as the Dialog's `ui-scroll-dividers-y`, to
// their end state whatever the scroll position. `styles.css` swaps them for their
// static fallback under this flag. Same check as Chromatic's own `isChromatic()`.
if (
  /Chromatic/.test(navigator.userAgent) ||
  /chromatic=true/.test(location.href)
) {
  document.documentElement.dataset.chromatic = '';
}

// Storybook viewports only accept fixed pixel values, so we can't use the
// theme's rem-based `sm` breakpoint directly. 639px = 40rem - 1px (at the
// default 16px root font size), ensuring this viewport triggers `(width < 40rem)`.
const customViewports = {
  extraSmallScreen: {
    name: 'Extra Small Screen (320px)',
    styles: {
      width: '320px',
      height: '568px',
    },
    type: 'mobile' as const,
  },
  smallScreen: {
    name: 'Small Screen (639px)',
    styles: {
      width: '639px',
      height: '900px',
    },
    type: 'mobile' as const,
  },
};

export default definePreview({
  addons: [addonA11y(), addonDocs(), addonTestCodegen()],
  parameters: {
    layout: 'padded',
    chromatic: {
      pauseAnimationAtEnd: true,
      prefersReducedMotion: 'reduce',
    },
    viewport: {
      options: {
        ...MINIMAL_VIEWPORTS,
        ...customViewports,
      },
    },
    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo',
    },
    options: {
      storySort: {
        method: 'alphabetical',
      },
    },
    controls: { expanded: true },
    docs: {
      codePanel: true,
    },
  },
  decorators: withMarigoldProviders,
  loaders: [
    () =>
      Promise.race([
        Promise.all([
          document.fonts.load('1em InterVariable'),
          document.fonts.load('1em Inter'),
        ]),
        new Promise(resolve => setTimeout(resolve, 3000)),
      ]).catch(() => {}),
  ],
});
