import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithOverlay } from '../test.utils';
import { Basic, Controlled, Disabled, WithError } from './TagField.stories';

const user = userEvent.setup();

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: () => {
    return {
      matches: false,
      addListener: () => {},
      removeListener: () => {},
    };
  },
});

test('renders a field (label, helptext, tagfield)', () => {
  render(
    <Basic.Component
      label="Label"
      errorMessage="ERRR!"
      description="Description"
    />
  );

  const label = screen.queryAllByText('Label')[0];
  const description = screen.queryAllByText('Description')[0];
  const errorMessage = screen.queryByText('ERRR!');

  expect(label).toBeInTheDocument();
  expect(description).toBeInTheDocument();
  expect(errorMessage).not.toBeInTheDocument();
});

test('placeholder is rendered when no items are selected', () => {
  render(<Basic.Component label="Label" placeholder="Pick items" />);

  const placeholder = screen.getByText('Pick items');

  expect(placeholder).toBeInTheDocument();
});

test('allows to disable the field', () => {
  render(<Disabled.Component />);

  const button = screen.getByRole('button');

  expect(button).toBeDisabled();
});

test('selected items appear as tags', () => {
  render(<Controlled.Component />);

  const rockTag = screen.getAllByText('Rock')[0];
  const popTag = screen.getAllByText('Pop')[0];

  expect(rockTag).toBeInTheDocument();
  expect(popTag).toBeInTheDocument();
});

test('error state shows error message', () => {
  render(<WithError.Component />);

  // eslint-disable-next-line testing-library/no-node-access
  const container = screen.getAllByText('Genres')[0].parentElement;
  const errorMessage = screen.getByText('Please select at least one genre.');

  expect(container).toHaveAttribute('data-error');
  expect(errorMessage).toBeInTheDocument();
});

test('set width via props', () => {
  render(<Basic.Component label="Label" width="1/2" />);

  // eslint-disable-next-line testing-library/no-node-access
  const container = screen.getAllByText('Label')[0].parentElement;

  expect(container?.className).toContain('w-1/2');
});

test('popover width matches trigger width', async () => {
  const original = Object.getOwnPropertyDescriptor(
    HTMLElement.prototype,
    'offsetWidth'
  );

  Object.defineProperty(HTMLElement.prototype, 'offsetWidth', {
    configurable: true,
    get() {
      return 300;
    },
  });

  const originalRO = globalThis.ResizeObserver;
  globalThis.ResizeObserver = class {
    constructor(private cb: ResizeObserverCallback) {}
    observe(target: Element) {
      this.cb(
        [] as unknown as ResizeObserverEntry[],
        this as unknown as ResizeObserver
      );
    }
    unobserve() {}
    disconnect() {}
  } as unknown as typeof ResizeObserver;

  try {
    renderWithOverlay(<Basic.Component label="Genres" />);

    const button = screen.getByRole('button');
    await user.click(button);

    const dialog = screen.getByRole('dialog');

    // eslint-disable-next-line testing-library/no-node-access
    const container = dialog.querySelector('[style*="tagfield-trigger-width"]');
    expect(container).toHaveStyle('--tagfield-trigger-width: 300px');
  } finally {
    if (original) {
      Object.defineProperty(HTMLElement.prototype, 'offsetWidth', original);
    }
    globalThis.ResizeObserver = originalRO;
  }
});
