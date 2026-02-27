import { render, screen } from '@testing-library/react';
import { MockInstance, vi } from 'vitest';
import { cva, useTheme } from '@marigold/system';
import { MarigoldProvider } from './MarigoldProvider';

// Setup
// ---------------
let errorMock: MockInstance;

beforeEach(() => {
  errorMock = vi.spyOn(console, 'error').mockImplementation(() => null);
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
    components: {
      Button: cva({}),
      Modal: cva({}),
      Dialog: {
        container: cva({}),
        closeButton: cva({}),
        header: cva({}),
        content: cva({}),
        actions: cva({}),
        title: cva({}),
      },
      Underlay: cva({}),
    },
  };

  const innerTheme = {
    name: 'inner',
    colors: {
      primary: 'gainsboro',
    },
    components: {
      Text: cva({ base: 'text-black' }),
      Button: cva({}),
      Modal: cva({}),
      Dialog: {
        container: cva({}),
        closeButton: cva({}),
        header: cva({}),
        content: cva({}),
        actions: cva({}),
        title: cva({}),
      },
      Underlay: cva({}),
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
      "components": {
        "Dialog": {}
      }
    }"
  `);
  expect(inner.innerHTML).toMatchInlineSnapshot(`
    "{
      "name": "inner",
      "colors": {
        "primary": "gainsboro"
      },
      "components": {
        "Dialog": {}
      }
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
      Button: cva({}),
      Modal: cva({}),
      Dialog: {
        container: cva({}),
        closeButton: cva({}),
        header: cva({}),
        content: cva({}),
        actions: cva({}),
        title: cva({}),
      },
      Underlay: cva({}),
    },
  };

  const innerTheme = {
    name: 'inner',
    colors: {
      primary: 'gainsboro',
    },
    components: {
      Button: cva({}),
      Modal: cva({}),
      Dialog: {
        container: cva({}),
        closeButton: cva({}),
        header: cva({}),
        content: cva({}),
        actions: cva({}),
        title: cva({}),
      },
      Underlay: cva({}),
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

test('using classname prop', () => {
  const outerTheme = {
    name: 'outer',
    colors: {
      primary: 'coral',
    },
    components: {
      Button: cva({}),
      Modal: cva({}),
      Dialog: {
        container: cva({}),
        closeButton: cva({}),
        header: cva({}),
        content: cva({}),
        actions: cva({}),
        title: cva({}),
      },
      Underlay: cva({}),
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
