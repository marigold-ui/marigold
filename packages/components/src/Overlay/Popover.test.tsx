/* eslint-disable testing-library/no-node-access */
import { screen } from '@testing-library/react';

import { Theme, cva } from '@marigold/system';

import { Button } from '../Button';
import { Text } from '../Text';
import { setup } from '../test.utils';
import { Popover } from './Popover';

const theme: Theme = {
  name: 'test',
  components: {
    Popover: cva(['mt-0.5'], {
      variants: {
        variant: {
          top: ['mb-0.5'],
        },
      },
    }),
    Underlay: cva(),
    Dialog: {
      closeButton: cva('p-3'),
      container: cva('p-2'),
    },
    Button: cva('bg-red-300'),
    Text: cva('text-black-300'),
  },
};

const { render } = setup({ theme });

test('renders open popover', () => {
  render(
    <Popover data-testid="popover" open>
      <Button>open dialog</Button>
      <Text>this is popover content </Text>
    </Popover>
  );

  const popover = screen.getByTestId('popover');
  expect(popover).toBeInTheDocument();
});

test('popover is per default closed', () => {
  render(
    <Popover data-testid="popover">
      <Button>open dialog</Button>
      <Text>this is popover content </Text>
    </Popover>
  );
  const popover = screen.queryByTestId('popover');
  expect(popover).not.toBeInTheDocument();
});

test('popover has children', () => {
  render(
    <Popover data-testid="popover" open>
      <Button>open dialog</Button>
      <Text>this is popover content </Text>
    </Popover>
  );

  const popover = screen.getByTestId('popover');
  expect(popover).toBeInTheDocument();
  expect(popover.firstChild).toBeInTheDocument();
});
