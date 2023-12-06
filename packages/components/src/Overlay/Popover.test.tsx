/* eslint-disable testing-library/no-node-access */
import { cleanup, screen } from '@testing-library/react';
import React from 'react';

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

/**
 * We need to mock `matchMedia` because JSOM does not
 * implements it.
 */

const mockMatchMedia = (matches: string[]) =>
  jest.fn().mockImplementation(query => ({
    matches: matches.includes(query),
  }));

window.matchMedia = mockMatchMedia([
  'screen and (min-width: 40em)',
  'screen and (min-width: 52em)',
  'screen and (min-width: 64em)',
]);

afterEach(cleanup);

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
    `"!left-0 bottom-0 !mt-auto flex !max-h-fit flex-col mt-0.5 w-[--trigger-width]"`
  );
  expect(popover).toBeInTheDocument();
});
