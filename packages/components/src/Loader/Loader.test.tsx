import { render, screen } from '@testing-library/react';
import { I18nProvider } from 'react-aria-components/I18nProvider';
import { renderWithOverlay } from '../test.utils';
import { Basic } from './Loader.stories';

test('renders loader', () => {
  render(<Basic.Component aria-label="loading" />);

  const loader = screen.getByRole('progressbar');

  expect(loader).toBeInTheDocument();
});

test('renders loader with different size', () => {
  render(
    <Basic.Component loaderType="xloader" aria-label="loading" size="large" />
  );

  const loader = screen.getByRole('progressbar');
  // eslint-disable-next-line testing-library/no-node-access
  const icon = loader.querySelector('svg');

  // The spinner carries the size; the container wraps it content-sized.
  expect(loader).toHaveClass('size-fit');
  expect(icon).toHaveClass('size-36');
});

test('render custom label', () => {
  render(<Basic.Component>Loading...</Basic.Component>);

  const label = screen.getByText('Loading...');

  expect(label).toBeInTheDocument();
});

test('respects a consumer-provided aria-labelledby without a redundant aria-label', () => {
  render(
    <>
      <span id="loader-label">Saving changes</span>
      <Basic.Component aria-labelledby="loader-label" />
    </>
  );

  const loader = screen.getByRole('progressbar');

  expect(loader).toHaveAttribute('aria-labelledby', 'loader-label');
  expect(loader).not.toHaveAttribute('aria-label');
});

test('inline uses "inverted" variant', () => {
  render(<Basic.Component mode="section">Loading...</Basic.Component>);

  const loader = screen.getByRole('progressbar');

  expect(loader).toHaveClass(
    'grid place-items-center gap-2 text-primary-foreground size-fit'
  );
});

test('translate loading message to English', () => {
  render(
    <I18nProvider locale="en-US">
      <Basic.Component />
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
      <Basic.Component />
    </I18nProvider>
  );

  const loader = screen.getByRole('progressbar');

  expect(loader.getAttribute('aria-label')).toMatchInlineSnapshot(`"Lade..."`);
});

test('renders fullscreen loader with modal overlay', () => {
  renderWithOverlay(<Basic.Component mode="fullscreen" aria-label="loading" />);

  const loader = screen.getByRole('progressbar');
  const dialog = screen.getByRole('dialog');

  expect(loader).toBeInTheDocument();
  expect(dialog).toBeInTheDocument();
});

test('fullscreen dialog is named by the loader fallback when no label is given', () => {
  renderWithOverlay(<Basic.Component mode="fullscreen" />);

  // The Dialog references the loader node, which carries the localized
  // fallback label — so the modal is never left unnamed.
  const dialog = screen.getByRole('dialog');

  expect(dialog).toHaveAccessibleName('Loading...');
});

test('fullscreen dialog is named by a consumer-provided aria-labelledby', () => {
  renderWithOverlay(
    <>
      <span id="loader-label">Saving changes</span>
      <Basic.Component mode="fullscreen" aria-labelledby="loader-label" />
    </>
  );

  // A consumer `aria-labelledby` suppresses the loader's own `aria-label`, and
  // the accname spec won't follow a second `labelledby` hop — so the Dialog
  // must reference the consumer's element directly to stay named.
  const dialog = screen.getByRole('dialog');

  expect(dialog).toHaveAccessibleName('Saving changes');
});

test('renders loader with loaderType circle', () => {
  render(<Basic.Component loaderType="circle" />);

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
      height="80px"
      role="img"
      width="80px"
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
