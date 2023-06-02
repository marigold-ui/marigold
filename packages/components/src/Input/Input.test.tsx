/* eslint-disable testing-library/no-node-access */
import React from 'react';
import { cva } from 'class-variance-authority';
import { screen } from '@testing-library/react';
import { Theme } from '@marigold/system';

import { Input } from './Input';

import { setup } from '../test.utils';

const theme: Theme = {
  name: 'test',
  components: {
    Input: {
      input: cva('border-blue-700', {
        variants: {
          variant: {
            yellow: 'bg-yellow-300',
          },
          size: {
            large: 'text-lg',
          },
        },
      }),
      icon: cva('h-4 w-4'),
      action: cva('bg-slate-400'),
    },
  },
};

const { render } = setup({ theme });

test('supports default variant and themeSection', () => {
  render(<Input data-testid="input" />);

  const input = screen.getByTestId('input');

  expect(input.className).toContain(`border-blue-700`);
});

test('accepts other variant than default', () => {
  render(<Input data-testid="input" variant="yellow" size="large" />);
  const input = screen.getByTestId('input');

  expect(input.className).toContain('bg-yellow-300');
  expect(input.className).toContain('text-lg');
});

test('renders correct HTML element', () => {
  render(<Input data-testid="input" />);
  const input = screen.getByTestId('input');

  expect(input instanceof HTMLInputElement).toBeTruthy();
});

test('supports custom prop', () => {
  render(<Input data-testid="input" placeholder="placeholder" />);
  const input = screen.getByTestId('input');

  expect(input).toHaveAttribute('placeholder');
});

test('renders icon and action', () => {
  const Icon = (props: any) => <div data-testid="icon" {...props} />;
  const Action = (props: any) => <div data-testid="action" {...props} />;

  render(<Input data-testid="input" icon={<Icon />} action={<Action />} />);

  const icon = screen.getByTestId('icon');
  expect(icon).toBeInTheDocument();

  const action = screen.getByTestId('action');
  expect(action).toBeInTheDocument();
});

test('icon and action get classnames from theme', () => {
  const Icon = (props: any) => <div data-testid="icon" {...props} />;
  const Action = (props: any) => <div data-testid="action" {...props} />;

  render(<Input data-testid="input" icon={<Icon />} action={<Action />} />);

  const icon = screen.getByTestId('icon');
  expect(icon.className).toContain('pointer-events-none absolute h-4 w-4');

  const action = screen.getByTestId('action');
  expect(action.className).toContain('bg-slate-400');
});
