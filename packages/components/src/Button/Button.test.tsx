import { render, screen } from '@testing-library/react';
import { Provider } from 'react-aria-components/slots';
import { Basic, ButtonVariants } from './Button.stories';
import { ButtonContext } from './Context';
import { ResetButtonContext } from './ResetButtonContext';

test('add icon in button works as expected', () => {
  render(<ButtonVariants.Component />);

  // ButtonVariants renders one button with a Facebook icon and "Submit" label.
  const button = screen.getByText('Submit');
  const icon = screen.getByTestId(/download/);

  expect(button).toHaveClass('items-center justify-center');
  expect(getComputedStyle(icon).width).toBe('16px');
});

test('forwards ref', () => {
  let refValue: HTMLButtonElement | null = null;
  render(
    <Basic.Component
      ref={node => {
        refValue = node;
      }}
    />
  );

  expect(refValue).toBeInstanceOf(HTMLButtonElement);
});

test('supports disabled prop', () => {
  render(<Basic.Component disabled />);

  const button = screen.getByText(/Button/);

  expect(button).toHaveAttribute('disabled');
});

test('allows to take full width', () => {
  render(<Basic.Component fullWidth />);

  const button = screen.getByText(/Button/);

  expect(button).toHaveClass('w-full');
});

test('loading state', () => {
  render(<Basic.Component loading={true} />);

  const button = screen.getByRole('button');
  const svg = screen.getByRole('progressbar');

  expect(svg).toBeInTheDocument();
  expect(button).toHaveAttribute('data-pending', 'true');
  expect(button).toHaveClass('cursor-progress!');
});

describe('slot-aware ButtonContext', () => {
  test('adopts the positional className from the cascade (Panel.Header grid cell)', () => {
    render(
      <Provider values={[[ButtonContext, { className: 'leaked-grid' }]]}>
        <Basic.Component aria-label="adapt" />
      </Provider>
    );

    expect(screen.getByRole('button', { name: 'adapt' })).toHaveClass(
      'leaked-grid'
    );
  });

  test('a local prop always wins over the cascade', () => {
    render(
      <Provider values={[[ButtonContext, { size: 'icon' }]]}>
        <Basic.Component aria-label="local" size="small" />
      </Provider>
    );

    const button = screen.getByRole('button', { name: 'local' });
    expect(button).toHaveClass('h-control-small');
    expect(button).not.toHaveClass('size-control');
  });

  test('slot={null} opts out of the cascade', () => {
    render(
      <Provider
        values={[[ButtonContext, { size: 'icon', className: 'leaked-grid' }]]}
      >
        <Basic.Component aria-label="optout" slot={null} />
      </Provider>
    );

    const button = screen.getByRole('button', { name: 'optout' });
    expect(button).not.toHaveClass('size-control');
    expect(button).not.toHaveClass('leaked-grid');
  });

  // Guards the portal-leak fix: a header/group cascade in scope above an
  // overlay must not reach the overlay's buttons. `<ResetButtonContext>` (used
  // by Popover/Modal/Tray/Drawer) clears it.
  test('ResetButtonContext clears an inherited cascade', () => {
    render(
      <Provider
        values={[[ButtonContext, { size: 'icon', className: 'leaked-grid' }]]}
      >
        <ResetButtonContext>
          <Basic.Component aria-label="reset" />
        </ResetButtonContext>
      </Provider>
    );

    const button = screen.getByRole('button', { name: 'reset' });
    expect(button).not.toHaveClass('size-control');
    expect(button).not.toHaveClass('leaked-grid');
  });
});
