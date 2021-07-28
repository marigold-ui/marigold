import React from 'react';
import { render, screen } from '@testing-library/react';
import { useModal } from '@react-aria/overlays';

import { MarigoldProvider } from './MarigoldProvider';
import { useTheme } from './useTheme';

// Setup
// ---------------
const theme = {
  text: {
    body: {
      fontSize: 1,
      color: 'black',
    },
  },
};

test('themes can be cascaded', () => {
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
      \\"colors\\": {
        \\"primary\\": \\"coral\\"
      }
    }"
  `);
  expect(inner.innerHTML).toMatchInlineSnapshot(`
    "{
      \\"colors\\": {
        \\"primary\\": \\"gainsboro\\"
      }
    }"
  `);
});

// if theres no OverlayProvider you got an error with text: Modal is not contained within a provider
test('OverlayProvider is present and supports useModal hook', () => {
  const ChildComponent: React.FC = ({ children }) => {
    const { modalProps } = useModal();
    return <div {...modalProps}>{children}</div>;
  };

  render(
    <MarigoldProvider theme={theme}>
      <ChildComponent>Test</ChildComponent>
    </MarigoldProvider>
  );

  const childComp = screen.getByText('Test');
  expect(childComp).toBeDefined();
});
