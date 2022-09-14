/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/no-container */
import React from 'react';
import { render, screen } from '@testing-library/react';
import { useTheme } from '@marigold/system';

import { MarigoldProvider } from './MarigoldProvider';

// Setup
// ---------------
const theme = {
  colors: {
    black: '#000',
  },
  fontSizes: {
    body: 16,
    heading: 32,
  },
  text: {
    body: {
      fontSize: 'body',
      color: 'black',
    },
  },
};

let errorMock: jest.SpyInstance;

beforeEach(() => {
  errorMock = jest.spyOn(console, 'error').mockImplementation();
});

afterEach(() => {
  errorMock.mockRestore();
});

test('support cascading themes', () => {
  const outerTheme = {
    colors: {
      primary: 'coral',
    },
  };

  const innerTheme = {
    colors: {
      primary: 'gainsboro',
    },
  };

  const Theme = ({ testId }: { testId: string }) => {
    const { theme } = useTheme();
    return <div data-testid={testId}>{JSON.stringify(theme, null, 2)}</div>;
  };

  render(
    <MarigoldProvider theme={outerTheme}>
      <>
        <Theme testId="outer" />
        <MarigoldProvider theme={innerTheme}>
          <Theme testId="inner" />
        </MarigoldProvider>
      </>
    </MarigoldProvider>
  );

  const outer = screen.getByTestId('outer');
  const inner = screen.getByTestId('inner');

  expect(outer.innerHTML).toMatchInlineSnapshot(`
    "{
      "colors": {
        "primary": "coral"
      }
    }"
  `);
  expect(inner.innerHTML).toMatchInlineSnapshot(`
    "{
      "colors": {
        "primary": "gainsboro"
      }
    }"
  `);
});

test('add OverlayProvider from `react-aria`', () => {
  const { container } = render(
    <MarigoldProvider theme={theme}>Test</MarigoldProvider>
  );

  expect(
    container.querySelector(`div[data-overlay-container="true"]`)
  ).toBeDefined();
});

test('OverlayProvider is added only once', () => {
  const innerTheme = { colors: { primary: 'red' } };
  const { container } = render(
    <MarigoldProvider theme={theme}>
      <MarigoldProvider theme={innerTheme}>Test</MarigoldProvider>
    </MarigoldProvider>
  );

  expect(
    container.querySelectorAll(`div[data-overlay-container="true"]`).length
  ).toEqual(1);
});

test('apply styles base on theme (`theme.root`)', () => {
  const theme = {
    fonts: {
      body: 'Inter',
      html: 'Roboto',
    },
    lineHeights: {
      body: 2.5,
    },
    fontWeights: {
      body: 500,
      html: 700,
    },
    root: {
      body: {
        fontFamily: 'body',
        lineHeight: 'body',
        fontWeight: 'body',
      },
      html: {
        fontFamily: 'html',
        fontWeight: 'html',
      },
    },
  };

  const view = render(
    <MarigoldProvider theme={theme}>
      <h1>Hello</h1>
    </MarigoldProvider>
  );

  // eslint-disable-next-line testing-library/no-node-access
  const html = view.baseElement.parentElement;
  expect(html).toHaveStyle(`font-family: ${theme.fonts.html}`);
  expect(html).toHaveStyle(`font-weight: ${theme.fontWeights.html}`);

  const body = view.baseElement;
  expect(body).toHaveStyle(`font-family: ${theme.fonts.body}`);
  expect(body).toHaveStyle(`font-weight: ${theme.fontWeights.body}`);
  expect(body).toHaveStyle(`line-height: ${theme.lineHeights.body}`);
});

test('normalize document (html, body)', () => {
  render(<MarigoldProvider theme={theme}>child</MarigoldProvider>);

  const html = document.querySelector('html')!;
  expect(html).toHaveStyle('height: 100%');

  const body = document.querySelector('body')!;
  expect(body).toHaveStyle('height: 100%');
  expect(body).toHaveStyle('line-height: 1.5');
});

test('opt out of document normalization', () => {
  render(
    <MarigoldProvider theme={theme} normalizeDocument={false}>
      child
    </MarigoldProvider>
  );

  const html = document.querySelector('html')!;
  expect(html).not.toHaveStyle('height: 100%');

  const body = document.querySelector('body')!;
  expect(body).not.toHaveStyle('height: 100%');
  expect(body).not.toHaveStyle('line-height: 1.5');
});

test('cascading fails if inner theme has root styles', () => {
  const outerTheme = {
    root: {
      body: {
        background: 'coral',
      },
    },
  };

  const innerTheme = {
    root: {
      body: {
        background: 'gainsboro',
      },
    },
  };

  expect(() =>
    render(
      <MarigoldProvider theme={outerTheme}>
        <MarigoldProvider theme={innerTheme}>child</MarigoldProvider>
      </MarigoldProvider>
    )
  ).toThrowError();
  expect(errorMock).toHaveBeenCalled();
});

test('cascading without a selector is allowed when inner theme has not root styles', () => {
  const outerTheme = {
    colors: {
      primary: 'coral',
    },
  };

  const innerTheme = {
    colors: {
      primary: 'gainsboro',
    },
  };

  expect(() =>
    render(
      <MarigoldProvider theme={outerTheme}>
        <MarigoldProvider theme={innerTheme}>child</MarigoldProvider>
      </MarigoldProvider>
    )
  ).not.toThrowError();
});

test('cascading with a selector is allowed when inner theme has specified a selector', () => {
  const outerTheme = {
    root: {
      body: {
        background: 'coral',
      },
    },
  };

  const innerTheme = {
    root: {
      body: {
        background: 'gainsboro',
      },
    },
  };

  expect(() =>
    render(
      <MarigoldProvider theme={outerTheme}>
        <MarigoldProvider theme={innerTheme} selector="#root">
          <div id="root" />
        </MarigoldProvider>
      </MarigoldProvider>
    )
  ).not.toThrowError();
});
