import { fireEvent, screen } from '@testing-library/react';
import React from 'react';
import { Facebook } from '@marigold/icons';
import { Theme, cva } from '@marigold/system';
import { setup } from '../test.utils';
import { Button } from './Button';

const theme: Theme = {
  name: 'test',
  components: {
    Button: cva('align-center flex disabled:bg-gray-600', {
      variants: {
        variant: {
          primary: 'text-primary-500',
          secondary: 'text-secondary-800',
        },
        size: {
          small: 'size-10',
          large: 'w-50 h-50',
        },
      },
    }),
  },
};

const { render } = setup({ theme });

test('sets some base styles', () => {
  render(<Button>button</Button>);
  const button = screen.getByText(/button/);

  expect(button).toHaveClass('flex align-center');
});

test('supports base styling classes', () => {
  render(<Button>button</Button>);
  const button = screen.getByText(/button/);

  expect(button.className).toMatchInlineSnapshot(
    `"items-center justify-center gap-[0.5ch] align-center flex disabled:bg-gray-600"`
  );
});

test('supports default size', () => {
  render(<Button size="small">button</Button>);
  const button = screen.getByText(/button/);

  expect(button).toHaveClass(`size-10`);
});

test('accepts other variants', () => {
  render(<Button variant="secondary">button</Button>);
  const button = screen.getByText(/button/);

  expect(button).toHaveClass('text-secondary-800');
});

test('renders <button> element', () => {
  render(<Button>button</Button>);
  const button = screen.getByText(/button/);

  expect(button instanceof HTMLButtonElement).toBeTruthy();
});

test('add icon in button works as expected', () => {
  render(
    <Button>
      <Facebook size={30} data-testid="facebook" />
      iconbutton
    </Button>
  );
  const button = screen.getByText(/iconbutton/);
  const icon = screen.getByTestId(/facebook/);

  expect(button instanceof HTMLButtonElement).toBeTruthy();
  expect(button).toHaveClass('flex align-center');
  expect(icon).toHaveAttribute('width', '30px');
});

test('supports onPress', () => {
  const onPress = jest.fn();
  render(
    <Button onPress={onPress} data-testid="button">
      Some Button
    </Button>
  );

  const button = screen.getByTestId('button');
  fireEvent.click(button);

  expect(onPress).toHaveBeenCalled();
});

test('forwards ref', () => {
  const ref = React.createRef<HTMLButtonElement>();
  render(<Button ref={ref}>button</Button>);

  expect(ref.current instanceof HTMLButtonElement).toBeTruthy();
});

test('supports disabled prop', () => {
  render(<Button disabled>button</Button>);
  const button = screen.getByText(/button/);
  expect(button).toHaveAttribute('disabled');
  expect(button).toHaveClass('disabled:bg-gray-600');
});

test('allows to take full width', () => {
  render(<Button fullWidth>button</Button>);

  const button = screen.getByText(/button/);
  expect(button).toHaveClass('w-full');
});

test('pending state', () => {
  render(<Button pending={true}>button</Button>);

  const button = screen.getByText(/button/);
  expect(button).toHaveAttribute('disabled');

  const svg = screen.getByRole('progressbar');
  expect(svg).toBeInTheDocument();
});
