import { withThemeByDataAttribute } from '@storybook/addon-themes';
import { Preview } from '@storybook/react';
import {
  FieldGroup,
  MarigoldProvider,
  OverlayContainerProvider,
} from '@marigold/components';
import b2b from '@marigold/theme-b2b';
import core from '@marigold/theme-core';
import rui from '@marigold/theme-rui';
import './../styles.css';

// Helpers
// ---------------
const THEME = {
  core,
  b2b,
  rui,
};

type ThemeNames = keyof typeof THEME;

// Parameters
// ---------------

export const parameters: Preview['parameters'] = {
  layout: 'fullscreen',
  a11y: {
    element: '#storybook-root',
  },
  options: {
    storySort: {
      method: 'alphabetical',
    },
  },
  controls: { expanded: true },
};

// fix type any
export const decorators: any = [
  withThemeByDataAttribute({
    themes: {
      core: core.name,
      b2b: b2b.name,
      rui: rui.name,
      stacked: 'stacked',
    },
    defaultTheme: core.name,
    attributeName: 'data-theme',
  }),

  (Story: any, { globals, parameters }: any) => {
    const theme = globals.theme || parameters.theme || 'core';

    switch (theme) {
      case 'stacked': {
        return (
          <>
            {Object.keys(THEME).map(key => (
              <OverlayContainerProvider value={`portalContainer-${key}`}>
                <Frame key={key} id={key} title={`Theme "${key}"`}>
                  <MarigoldProvider
                    theme={THEME[key as ThemeNames]}
                    className="bg-bg-surface"
                  >
                    <div className="h-screen p-4" data-theme={key}>
                      {!parameters.disableLabelWidth ? (
                        <FieldGroup labelWidth="200px">{Story()}</FieldGroup>
                      ) : (
                        Story()
                      )}
                    </div>
                  </MarigoldProvider>
                </Frame>
              </OverlayContainerProvider>
            ))}
          </>
        );
      }
      case 'core': {
        return (
          <MarigoldProvider
            theme={THEME[theme as ThemeNames]}
            className="bg-bg-surface"
          >
            <div className="h-screen p-6">
              {!parameters.disableLabelWidth ? (
                <FieldGroup labelWidth="200px">{Story()}</FieldGroup>
              ) : (
                Story()
              )}
            </div>
          </MarigoldProvider>
        );
      }
      default: {
        return (
          <MarigoldProvider
            theme={THEME[theme as ThemeNames]}
            className="bg-bg-surface"
          >
            <div className="h-screen p-6">{Story()}</div>
          </MarigoldProvider>
        );
      }
    }
  },
];

const Frame = ({ children, title }: any) => (
  <div className="p-4">
    <div className="mb-0.5 inline-block rounded-lg border border-solid border-orange-200 bg-orange-200 p-0.5 font-sans text-xs text-orange-900">
      {title}
    </div>
    <div className="rounded-lg border border-solid border-[#dee2e6] shadow-sm">
      {children}
    </div>
  </div>
);
