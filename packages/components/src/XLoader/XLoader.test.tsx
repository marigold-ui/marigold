import { composeStories } from '@storybook/react';
import { render, screen } from '@testing-library/react';
import { I18nProvider } from 'react-aria-components';
import * as stories from './XLoader.stories';

const { Basic } = composeStories(stories);

test('renders loader', () => {
  render(<Basic aria-label="loading" />);

  const loader = screen.getByRole('progressbar');

  expect(loader).toBeInTheDocument();
});

test('renders loader with different size', () => {
  render(<Basic aria-label="loading" size="large" />);

  const loader = screen.getByRole('progressbar');
  // eslint-disable-next-line testing-library/no-node-access
  const icon = loader.querySelector('svg');

  expect(loader).toHaveClass('size-36');
  expect(icon).toHaveClass('size-full');
});

test('render custom label', () => {
  render(<Basic>Loading...</Basic>);

  const label = screen.getByText('Loading...');

  expect(label).toBeInTheDocument();
});

test('fullsize uses "inverted" variant', () => {
  render(<Basic mode="fullscreen">Loading...</Basic>);

  const loader = screen.getByRole('progressbar');

  expect(loader).toHaveClass('grid place-items-center text-secondary size-20');
});

test('inline uses "inverted" variant', () => {
  render(<Basic mode="section">Loading...</Basic>);

  const loader = screen.getByRole('progressbar');

  expect(loader).toHaveClass('grid place-items-center text-secondary size-20');
});

test('translate loading message to English', () => {
  render(
    <I18nProvider locale="en-US">
      <Basic />
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
      <Basic />
    </I18nProvider>
  );

  const loader = screen.getByRole('progressbar');

  expect(loader.getAttribute('aria-label')).toMatchInlineSnapshot(`"Lade..."`);
});

test('renders loader with loaderType cycle', () => {
  render(<Basic loaderType="cycle" />);

  const loader = screen.getByRole('progressbar');
  // eslint-disable-next-line testing-library/no-node-access
  const svg = loader.lastChild;

  expect(loader.getAttribute('aria-label')).toMatchInlineSnapshot(
    `"Loading..."`
  );
  expect(svg).toMatchInlineSnapshot(`
    <svg
      aria-hidden="true"
      class="flex-none animate-rotate-spinner origin-center fill-none size-20"
      height="defaultpx"
      role="img"
      width="defaultpx"
    >
      <circle
        class="stroke-transparent"
        cx="50%"
        cy="50%"
        r="calc(50% - 2px)"
        stroke-width="4"
      />
      <circle
        class="animate-progress-cycle origin-center -rotate-90 stroke-foreground"
        cx="50%"
        cy="50%"
        pathLength="100"
        r="calc(50% - 2px)"
        stroke-dasharray="100 200"
        stroke-dashoffset="0"
        stroke-linecap="round"
        stroke-width="4"
      />
    </svg>
  `);
});
