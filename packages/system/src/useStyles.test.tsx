import React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { useStyles } from './useStyles';
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
    padding: {
      paddingTop: '2px',
    },
  },
};

const wrapper: React.FC = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

test('create a string classname', () => {
  const { result } = renderHook(
    () => useStyles({ element: 'a', color: 'primary' }),
    {
      wrapper,
    }
  );
  expect(result.current).toEqual(expect.any(String));
});

// Tests
// ---------------

test('base styles first', () => {
  const TestComponent: React.FC<{}> = ({ children, ...props }) => {
    const classNames = useStyles({ element: 'p' });
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
  const TestComponent: React.FC<{ variant?: 'body' }> = ({
    variant = 'body',
    children,
    ...props
  }) => {
    const classNames = useStyles({
      element: 'p',
      variant: `text.${variant}`,
    });
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

test('array of variant styles', () => {
  const TestComponent: React.FC<{ variant?: 'body' }> = ({
    variant = 'body',
    children,
    ...props
  }) => {
    const classNames = useStyles({
      element: 'p',
      variant: [`text.${variant}`, `text.padding`],
      components: 'body',
    });
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
  expect(style.marginTop).toEqual('2px'); // 2px marginTop come from variant
  expect(style.paddingTop).toEqual('2px'); // 2px paddingTop come from variant
});

test('custom styles third', () => {
  const TestComponent: React.FC<{ variant?: 'body' }> = ({
    variant = 'body',
    children,
    ...props
  }) => {
    const classNames = useStyles({
      element: 'p',
      variant: `text.${variant}`,
      marginTop: '4px',
    });
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

test('customClassName styles fourth', () => {
  const TestComponent: React.FC<{ variant?: 'body' }> = ({
    variant = 'body',
    children,
    ...props
  }) => {
    const classNames = useStyles(
      {
        element: 'p',
        variant: `text.${variant}`,
        marginTop: '4px',
      },
      useStyles({ element: 'p', marginTop: '8px' })
    );
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
  expect(style.marginTop).not.toEqual('4px'); // do not apply 4px from custom styles
  expect(style.marginTop).toEqual('8px'); // apply 8px from customClassNames styles
});

test('normalize base without element prop', () => {
  const TestComponent: React.FC<{ variant?: 'body' }> = ({
    variant = 'normal',
    children,
    ...props
  }) => {
    const classNames = useStyles({
      variant: `text.${variant}`,
    });
    return (
      <a className={classNames} {...props}>
        {children}
      </a>
    );
  };

  const { getByText } = render(
    <ThemeProvider theme={theme}>
      <TestComponent>Link</TestComponent>
    </ThemeProvider>
  );
  const testelem = getByText('Link');
  const style = getComputedStyle(testelem);

  expect(style.boxSizing).toEqual('border-box');
  expect(style.margin).toEqual('0px');
  expect(style.padding).toEqual('0px');
  expect(style.minWidth).toEqual('0');
});

test('normalize tag name <a>', () => {
  const TestComponent: React.FC<{ variant?: 'body' }> = ({
    variant = 'body',
    children,
    ...props
  }) => {
    const classNames = useStyles({
      element: 'a',
      variant: `text.${variant}`,
    });
    return (
      <a className={classNames} {...props}>
        {children}
      </a>
    );
  };

  const { getByText } = render(
    <ThemeProvider theme={theme}>
      <TestComponent>Link</TestComponent>
    </ThemeProvider>
  );
  const testelem = getByText('Link');
  const style = getComputedStyle(testelem);

  expect(style.boxSizing).toEqual('border-box'); // from base
  expect(style.textDecoration).toEqual('none'); // from a
});
