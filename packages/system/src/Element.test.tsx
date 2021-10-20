import React from 'react';
import { render, screen } from '@testing-library/react';
import { useStyles } from './useStyles';
import { ThemeProvider } from './useTheme';
import { Element } from './Element';

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

test('base styles first', () => {
  const TestComponent: React.FC<{}> = ({ children, ...props }) => {
    return (
      <Element as="p" {...props}>
        {children}
      </Element>
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
    return (
      <Element as="p" variant={`text.${variant}`} {...props}>
        {children}
      </Element>
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
    return (
      <Element as="p" variant={[`text.${variant}`, `text.padding`]} {...props}>
        {children}
      </Element>
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

test('custom styles with css prop third', () => {
  const TestComponent: React.FC<{ variant?: 'body' }> = ({
    variant = 'body',
    children,
    ...props
  }) => {
    return (
      <Element
        as="p"
        variant={`text.${variant}`}
        css={{ marginTop: '4px' }}
        {...props}
      >
        {children}
      </Element>
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

test("don't apply the same reset multiple times", () => {
  const Button = ({ className }: { className?: string }) => {
    const classNames = useStyles({ element: 'button', className });
    return (
      <Element as="button" title="button" className={classNames}>
        Click me!
      </Element>
    );
  };
  const Wrapper = () => <Button />;

  render(<Wrapper />);
  const button = screen.getByTitle('button');
  const classNames = button.className.split(' ').filter(i => i.length);

  // Test if applied classnames are unique
  expect(classNames.length).toEqual([...new Set(classNames)].length);
});

test('normalize base without element prop', () => {
  const TestComponent: React.FC<{ variant?: 'body' }> = ({
    variant = 'normal',
    children,
    ...props
  }) => {
    return (
      <Element as="a" variant={`text.${variant}`} {...props}>
        {children}
      </Element>
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
    return (
      <Element as="a" variant={`text.${variant}`} {...props}>
        {children}
      </Element>
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
