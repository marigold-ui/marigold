import { render, screen } from '@testing-library/react';
import { I18nProvider } from 'react-aria-components';
import { Theme, ThemeProvider, cva } from '@marigold/system';
import { XLoader } from './XLoader';

const theme: Theme = {
  name: 'test',
  components: {
    Underlay: cva(''),
    XLoader: {
      container: cva('', {
        variants: {
          variant: {
            inverted: 'text-text-inverted',
          },
        },
      }),
      label: cva(),
      loader: cva('', {
        variants: {
          size: {
            large: 'size-36',
          },
        },
      }),
    },
  },
};

test('renders loader', () => {
  render(
    <ThemeProvider theme={theme}>
      <XLoader aria-label="loading" />
    </ThemeProvider>
  );

  const loader = screen.getByRole('progressbar');
  expect(loader).toBeInTheDocument();
});

test('renders loader with differnet size', () => {
  render(
    <ThemeProvider theme={theme}>
      <XLoader aria-label="loading" size="large" />
    </ThemeProvider>
  );

  const loader = screen.getByRole('progressbar');
  const icon = loader.querySelector('svg');
  expect(icon).toHaveClass('size-36');
});

test('render custom label', () => {
  render(
    <ThemeProvider theme={theme}>
      <XLoader>Loading...</XLoader>
    </ThemeProvider>
  );

  const label = screen.getByText('Loading...');
  expect(label).toBeInTheDocument();
});

test('fullsize uses "inverted" variant', () => {
  render(
    <ThemeProvider theme={theme}>
      <XLoader mode="fullscreen">Loading...</XLoader>
    </ThemeProvider>
  );

  const loader = screen.getByRole('progressbar');
  expect(loader).toHaveClass('text-text-inverted');
});

test('inline uses "inverted" variant', () => {
  render(
    <ThemeProvider theme={theme}>
      <XLoader mode="section">Loading...</XLoader>
    </ThemeProvider>
  );

  const loader = screen.getByRole('progressbar');
  expect(loader).toHaveClass('text-text-inverted');
});

test('translate loading message to English', () => {
  render(
    <I18nProvider locale="en-US">
      <ThemeProvider theme={theme}>
        <XLoader />
      </ThemeProvider>
    </I18nProvider>
  );

  const loader = screen.getByRole('progressbar');
  expect(loader.getAttribute('aria-label')).toMatchInlineSnapshot(
    `"Loading..."`
  );
});

test('translate loading message to German', () => {
  render(
    <I18nProvider locale="de-DE">
      <ThemeProvider theme={theme}>
        <XLoader />
      </ThemeProvider>
    </I18nProvider>
  );

  const loader = screen.getByRole('progressbar');
  expect(loader.getAttribute('aria-label')).toMatchInlineSnapshot(`"Lade..."`);
});
