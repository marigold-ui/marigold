/* eslint-disable testing-library/no-node-access */

/* eslint-disable testing-library/no-container */
import { cleanup, render, screen } from '@testing-library/react';
import { cva, useTheme } from '@marigold/system';
import { MarigoldProvider } from './MarigoldProvider';

// Setup
// ---------------
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

test('using classname prop', () => {
  const outerTheme = {
    name: 'outer',
    colors: {
      primary: 'coral',
    },
    components: {
      Button: cva(),
    },
  };

  render(
    <MarigoldProvider theme={outerTheme} className="bg-slate-400">
      child
    </MarigoldProvider>
  );
  const theme = screen.getByText('child');
  expect(theme?.className).toMatchInlineSnapshot(`"bg-slate-400"`);
});
