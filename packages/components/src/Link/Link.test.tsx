import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { RefObject } from 'react';
import { MockInstance, vi } from 'vitest';
import { AccessVariants, Basic, NewTab } from './Link.stories';

const user = userEvent.setup();

let warnMock: MockInstance;

beforeEach(() => {
  warnMock = vi.spyOn(console, 'warn').mockImplementation(() => null);
});

afterEach(() => {
  warnMock.mockRestore();
});

test('supports href prop', () => {
  render(<Basic.Component href="https://example.com" />);
  const link = screen.getAllByRole('link')[0];

  expect(link).toHaveAttribute('href', 'https://example.com');
});

test('supports disabled prop via aria attributes', () => {
  render(<Basic.Component disabled />);
  const link = screen.getAllByRole('link')[0];

  expect(link).toHaveAttribute('aria-disabled', 'true');
});

test('supports variant prop', () => {
  render(<Basic.Component variant="secondary" />);
  const link = screen.getAllByRole('link')[0];

  expect(link).toBeInTheDocument();
});

test('forwards ref', () => {
  const ref: RefObject<HTMLAnchorElement | null> = { current: null };
  render(<Basic.Component ref={ref} />);

  expect(ref.current).toBeInstanceOf(HTMLAnchorElement);
});

test('renders span element when no href', () => {
  const ref: RefObject<HTMLAnchorElement | null> = { current: null };
  render(<Basic.Component href={undefined} ref={ref} />);

  // When no href, it renders a span, not a link
  expect(ref.current).toBeInstanceOf(HTMLSpanElement);
});

// `href="#"` because the story's real URL would navigate the test iframe away
// now that `Basic` no longer forces `target="_blank"`.
test('supports "onPress"', async () => {
  render(<Basic.Component href="#" onPress={() => {}} />);

  const link = screen.getAllByRole('link')[0];
  await user.click(link);

  expect(warnMock).not.toHaveBeenCalled();
});

// The `name` filter asserts the accessible name: the visible label plus the
// hidden access label. `getAllBy` because Link stories render on both
// surfaces (`surface: 'both'`). Icon rendering is covered by the
// AccessVariants story test.
test('master variant appends a hidden "Master" label to the accessible name', () => {
  render(<AccessVariants.Component />);
  const [master] = screen.getAllByRole('link', { name: 'verschieben Master' });

  expect(master).toBeInTheDocument();
});

test('admin variant appends a hidden "Admin" label to the accessible name', () => {
  render(<AccessVariants.Component />);
  const [admin] = screen.getAllByRole('link', { name: 'freigeben Admin' });

  expect(admin).toBeInTheDocument();
});

test('a new-tab link warns screen readers and defaults rel to noopener', () => {
  render(<NewTab.Component />);

  const [link] = screen.getAllByRole('link', {
    name: 'Marigold docs opens in a new tab',
  });

  expect(link).toHaveAttribute('rel', 'noopener');
});

test('a consumer-supplied rel wins over the noopener default', () => {
  render(<NewTab.Component rel="noreferrer" />);

  const [link] = screen.getAllByRole('link', {
    name: 'Marigold docs opens in a new tab',
  });

  expect(link).toHaveAttribute('rel', 'noreferrer');
});

test('a same-tab link gets no warning and no rel', () => {
  render(<NewTab.Component />);

  const [link] = screen.getAllByRole('link', { name: 'Same tab' });

  expect(link).not.toHaveAttribute('rel');
});

// Icon rendering is covered by the NewTab story test.
test('an access variant keeps its mark and appends the new-tab warning', () => {
  render(<NewTab.Component />);

  const [link] = screen.getAllByRole('link', {
    name: 'Support console Master opens in a new tab',
  });

  expect(link).toBeInTheDocument();
});

test('extends an aria-label with the new-tab warning', () => {
  render(<NewTab.Component aria-label="Marigold release notes" />);

  const [link] = screen.getAllByRole('link', {
    name: 'Marigold release notes opens in a new tab',
  });

  expect(link).toBeInTheDocument();
});

test('marks a named window as a new tab', () => {
  render(<NewTab.Component target="popup" />);

  const [link] = screen.getAllByRole('link', {
    name: 'Marigold docs opens in a new tab',
  });

  expect(link).toHaveAttribute('rel', 'noopener');
});

test('leaves a same-window target unmarked', () => {
  render(<NewTab.Component target="_top" />);

  const [link] = screen.getAllByRole('link', { name: 'Marigold docs' });

  expect(link).not.toHaveAttribute('rel');
});
