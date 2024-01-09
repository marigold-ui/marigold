/* eslint-disable testing-library/no-node-access */

/* eslint-disable testing-library/no-container */
import { cleanup, render, renderHook, screen } from '@testing-library/react';

import { Theme, cva, useTheme } from '@marigold/system';

import { Popover } from '../Overlay';
import { MarigoldProvider } from './MarigoldProvider';
import { usePortalContainer } from './OverlayContainerProvider';

// Setup
// ---------------
const theme: Theme = {
  name: 'test',
  colors: {
    black: '#000',
  },
  components: {
    Text: cva('text-body'),
    Button: cva(),
    Popover: cva(),
  },
};

let errorMock: jest.SpyInstance;

beforeEach(() => {
  errorMock = jest.spyOn(console, 'error').mockImplementation();
});

afterEach(() => {
  errorMock.mockRestore();
});

const mockMatchMedia = (matches: string[]) =>
  jest.fn().mockImplementation(query => ({
    matches: matches.includes(query),
  }));

window.matchMedia = mockMatchMedia([
  'screen and (min-width: 40em)',
  'screen and (min-width: 52em)',
  'screen and (min-width: 64em)',
]);

afterEach(cleanup);

test('support cascading themes', () => {
  const outerTheme = {
    name: 'outer',
    colors: {
      primary: 'coral',
    },
    components: {
      Button: cva(),
    },
  };

  const innerTheme = {
    name: 'inner',
    colors: {
      primary: 'gainsboro',
    },
    components: {
      Text: cva('text-black'),
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
      },
      "components": {}
    }"
  `);
  expect(inner.innerHTML).toMatchInlineSnapshot(`
    "{
      "name": "inner",
      "colors": {
        "primary": "gainsboro"
      },
      "components": {}
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
  const innerTheme = {
    name: 'inner',
    colors: { primary: 'red' },
    components: {
      Button: cva('bg-slate-300'),
    },
  };
  const { container } = render(
    <MarigoldProvider theme={theme}>
      <MarigoldProvider theme={innerTheme}>Test</MarigoldProvider>
    </MarigoldProvider>
  );

  expect(
    container.querySelectorAll(`div[data-overlay-container="true"]`).length
  ).toEqual(1);
});

test('cascading without a selector is allowed when inner theme has not root styles', () => {
  const outerTheme = {
    name: 'outer',
    colors: {
      primary: 'coral',
    },
    components: {
      Button: cva(),
    },
  };

  const innerTheme = {
    name: 'inner',
    colors: {
      primary: 'gainsboro',
    },
    components: {},
  };

  expect(() =>
    render(
      <MarigoldProvider theme={outerTheme}>
        <MarigoldProvider theme={innerTheme}>child</MarigoldProvider>
      </MarigoldProvider>
    )
  ).not.toThrowError();
});

test('render null for portalcontainer', () => {
  const wrapper = () => (
    <>
      <MarigoldProvider theme={theme}>
        <Popover>Test</Popover>
      </MarigoldProvider>
    </>
  );
  const { result } = renderHook(() => usePortalContainer(), {
    wrapper,
  });

  expect(result.current).toBeNull();
});
