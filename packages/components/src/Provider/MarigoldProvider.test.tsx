/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/no-container */
import React from 'react';
import { render, screen } from '@testing-library/react';
import { useTheme } from '@marigold/system';

import { MarigoldProvider } from './MarigoldProvider';

// Setup
// ---------------
const theme = {
  name: 'test',
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
    name: 'outer',
    colors: {
      primary: 'coral',
    },
  };

  const innerTheme = {
    name: 'inner',
    colors: {
      primary: 'gainsboro',
    },
  };

  const Theme = ({ testId }: { testId: string }) => {
    const theme = useTheme();
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
      "name": "outer",
      "colors": {
        "primary": "coral"
      }
    }"
  `);
  expect(inner.innerHTML).toMatchInlineSnapshot(`
    "{
      "name": "inner",
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
  const innerTheme = { name: 'inner', colors: { primary: 'red' } };
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
    name: 'test',
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

  // styles are not in StyleValue

  expect(html).toHaveStyle(`font-family: ${theme.fonts.html}`);
  expect(html).toHaveStyle(`font-weight: ${theme.fontWeights.html}`);

  const body = view.baseElement;
  expect(body).toHaveStyle(`font-family: ${theme.fonts.body}`);
  expect(body).toHaveStyle(`font-weight: ${theme.fontWeights.body}`);
  expect(body).toHaveStyle(`line-height: ${theme.lineHeights.body}`);
});

test('cascading fails if inner theme has root styles', () => {
  const outerTheme = {
    name: 'outer',
    root: {
      body: {
        background: 'coral',
      },
    },
  };

  const innerTheme = {
    name: 'inner',
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
    name: 'outer',
    colors: {
      primary: 'coral',
    },
  };

  const innerTheme = {
    name: 'inner',
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
    name: 'outer',
    root: {
      body: {
        background: 'coral',
      },
    },
  };

  const innerTheme = {
    name: 'inner',
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
