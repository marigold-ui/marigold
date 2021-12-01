import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from './useTheme';
import { Element } from './Element';
import { normalize } from './normalize';

const theme = {
  colors: {
    primary: 'black',
    secondary: 'hotpink',
  },
  fontsizes: {
    body: 16,
    small: 12,
    large: 24,
  },
  space: {
    none: 0,
    small: 4,
    medium: 8,
    large: 16,
  },
  text: {
    body: {
      fontSize: 'body',
      color: 'primary',
    },
    heading: {
      fontSize: 'large',
      color: 'secondary',
    },
  },
  override: {
    normalize: {
      m: 'large',
    },
  },
};

test('renders a <div> by default', () => {
  render(<Element>Test</Element>);
  const testelem = screen.getByText('Test');

  expect(testelem instanceof HTMLDivElement).toBeTruthy();
});

test('supports "as" prop', () => {
  render(<Element as="p">Test</Element>);
  const testelem = screen.getByText('Test');

  expect(testelem instanceof HTMLParagraphElement).toBeTruthy();
});

test('supports HTML className attribute', () => {
  render(<Element className="my-custom-class">Test</Element>);
  const element = screen.getByText('Test');

  expect(element.getAttribute('class')).toMatch('my-custom-class');
});

test('passes down HTML attributes', () => {
  render(
    <Element className="my-custom-class" id="element-id" disabled>
      Test
    </Element>
  );
  const element = screen.getByText('Test');

  expect(element.getAttribute('id')).toEqual('element-id');
  expect(element.getAttribute('disabled')).toMatch('');
  expect(element.getAttribute('class')).toMatch('my-custom-class');
});

test('forwards ref', () => {
  const ref = React.createRef<HTMLButtonElement>();
  render(
    <Element as="button" ref={ref}>
      button
    </Element>
  );

  expect(ref.current instanceof HTMLButtonElement).toBeTruthy();
});

test('apply normalized styles', () => {
  render(<Element>Test</Element>);
  const element = screen.getByText('Test');
  const { base } = normalize;

  // Smoketest
  expect(element).toHaveStyle(`box-sizing: ${base.boxSizing}`);
  expect(element).toHaveStyle(`margin: ${base.margin}px`);
  expect(element).toHaveStyle(`min-width: ${base.minWidth}`);
});

test('variants are applied correctly', () => {
  render(
    <ThemeProvider theme={theme}>
      <Element variant="text.body">Test</Element>
    </ThemeProvider>
  );
  const element = screen.getByText('Test');

  expect(element).toHaveStyle(`font-size: ${theme.fontsizes.body}`);
  expect(element).toHaveStyle(`color: ${theme.colors.primary}`);
});

test('variants override normalization', () => {
  render(
    <ThemeProvider theme={theme}>
      <Element variant="override.normalize">Test</Element>
    </ThemeProvider>
  );
  const element = screen.getByText('Test');

  expect(element).toHaveStyle(`margin: ${theme.space.large}px`);
});

// ======================================================

test.skip('variant styles second', () => {
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

test.skip('array of variant styles', () => {
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

test.skip('custom styles with css prop third', () => {
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

test.skip('normalize tag name <a>', () => {
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
