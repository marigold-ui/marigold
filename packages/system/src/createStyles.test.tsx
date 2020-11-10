import React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { createStyles } from './createStyles';
import { ThemeProvider } from './useTheme';
import { render } from '@testing-library/react';

// Setup
// ---------------
const theme = {
  text: {
    body: {
      fontSize: 1,
      color: 'black',
      marginTop: '2px',
    },
    heading: {
      fontSize: 3,
      color: 'primary',
    },
  },
};

const wrapper: React.FC = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

test('create a string classname', () => {
  const { result } = renderHook(
    () => createStyles('text', { color: 'primary' })({}),
    {
      wrapper,
    }
  );
  expect(result.current).toEqual(expect.any(String));
});

// Tests
// ---------------

test('base styles first', () => {
  const useStyles = createStyles('text');
  const TestComponent: React.FC<{}> = ({ children, ...props }) => {
    const classNames = useStyles({});
    return (
      <p className={classNames} {...props}>
        {children}
      </p>
    );
  };

  const { getByText } = render(
    <ThemeProvider theme={theme}>
      <TestComponent>Text</TestComponent>
    </ThemeProvider>
  );
  const testelem = getByText('Text');
  const style = getComputedStyle(testelem);

  expect(style.marginTop).toEqual('0px'); // 0px come from base
});

test('variant styles second', () => {
  const useStyles = createStyles('text');
  const TestComponent: React.FC<{ variant?: 'body' }> = ({
    variant = 'body',
    children,
    ...props
  }) => {
    const classNames = useStyles({ variant });
    return (
      <p className={classNames} {...props}>
        {children}
      </p>
    );
  };

  const { getByText } = render(
    <ThemeProvider theme={theme}>
      <TestComponent>Text</TestComponent>
    </ThemeProvider>
  );
  const testelem = getByText('Text');
  const style = getComputedStyle(testelem);

  expect(style.marginTop).not.toEqual('0px'); // 0px come from base
  expect(style.marginBottom).toEqual('0px'); // 0px still come from base
  expect(style.marginTop).toEqual('2px'); // 2px come from variant
});

test('custom styles third', () => {
  const useStyles = createStyles('text', { marginTop: '4px' });
  const TestComponent: React.FC<{ variant?: 'body' }> = ({
    variant = 'body',
    children,
    ...props
  }) => {
    const classNames = useStyles({ variant });
    return (
      <p className={classNames} {...props}>
        {children}
      </p>
    );
  };

  const { getByText } = render(
    <ThemeProvider theme={theme}>
      <TestComponent>Text</TestComponent>
    </ThemeProvider>
  );
  const testelem = getByText('Text');
  const style = getComputedStyle(testelem);

  expect(style.marginTop).not.toEqual('0px'); // do not apply 0px from base
  expect(style.marginTop).not.toEqual('2px'); // do not apply 2px from variant
  expect(style.marginTop).toEqual('4px'); // apply 4px from custom styles
});
