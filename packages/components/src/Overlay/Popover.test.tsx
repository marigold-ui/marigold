/* eslint-disable testing-library/no-node-access */
import { screen } from '@testing-library/react';
import React from 'react';
import { vi } from 'vitest';
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
      title: cva(),
      header: cva(),
      content: cva(),
      actions: cva(),
    },
    Button: cva('bg-red-300'),
    Text: cva('text-black-300'),
  },
};

const { render } = setup({ theme });

/**
 * We need to mock `matchMedia` because JSOM does not
 * implements it.
 */

const mockMatchMedia = (matches: string[]) =>
  vi.fn().mockImplementation(query => ({
    matches: matches.includes(query),
  }));

window.matchMedia = mockMatchMedia([
  'screen and (min-width: 40em)',
  'screen and (min-width: 52em)',
  'screen and (min-width: 64em)',
]);

test('renders open popover', () => {
  const ref = React.createRef<HTMLDivElement>();
  render(
    <>
      <div ref={ref}>Trigger</div>
      <Popover data-testid="popover" open triggerRef={ref}>
        <Button>open dialog</Button>
        <Text>this is popover content </Text>
      </Popover>
    </>
  );

  const popover = screen.getByTestId('popover');
  expect(popover).toBeInTheDocument();
});

test('popover is per default closed', () => {
  const ref = React.createRef<HTMLDivElement>();
  render(
    <>
      <div ref={ref}>Trigger</div>
      <Popover data-testid="popover" triggerRef={ref}>
        <Button>open dialog</Button>
        <Text>this is popover content </Text>
      </Popover>
    </>
  );
  const popover = screen.queryByTestId('popover');
  expect(popover).not.toBeInTheDocument();
});

test('popover has children', () => {
  const ref = React.createRef<HTMLDivElement>();

  render(
    <>
      <div ref={ref}>Trigger</div>
      <Popover data-testid="popover" open triggerRef={ref}>
        <Button>open dialog</Button>
        <Text>this is popover content </Text>
      </Popover>
    </>
  );

  const popover = screen.getByTestId('popover');
  expect(popover).toBeInTheDocument();
  expect(popover.firstChild).toBeInTheDocument();
});

test('popover is small screen', () => {
  const ref = React.createRef<HTMLDivElement>();

  window.matchMedia = mockMatchMedia(['(max-width: 600px)']);

  render(
    <>
      <div ref={ref}>Trigger</div>
      <Button>open dialog</Button>
      <Popover data-testid="popover" triggerRef={ref} open>
        <Text>this is popover content </Text>
      </Popover>
    </>
  );

  const popover = screen.getByTestId('popover');

  expect(popover.className).toMatchInlineSnapshot(
    `"fixed! top-auto! bottom-0! left-0! max-h-fit! w-full mt-0.5 min-w-(--trigger-width)"`
  );
  expect(popover).toBeInTheDocument();
});
