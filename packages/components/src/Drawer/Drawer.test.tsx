import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { cva } from '@marigold/system';
import type { Theme } from '@marigold/system';
import { Button } from '../Button';
import { setup } from '../test.utils';
import { Drawer } from './Drawer';
import type { DrawerProps } from './Drawer';

const mockMatchMedia = (matches: string[]) =>
  jest.fn().mockImplementation(query => {
    return {
      matches: matches.includes(query),
    };
  });
window.matchMedia = mockMatchMedia(['(max-width: 1024px)']);

const theme: Theme = {
  name: 'test',
  components: {
    Button: cva(''),
    Drawer: {
      overlay: cva(''),
      container: cva('p-5', {
        variants: {
          variant: {
            custom: 'bg-green-400',
          },
          size: {
            large: 'w-[400px]',
          },
        },
      }),
      closeButton: cva('p-1', {
        variants: {
          variant: {
            custom: 'bg-black',
          },
        },
      }),
      header: cva(''),
      title: cva(''),
      content: cva(''),
      actions: cva(''),
    },
    Headline: cva(''),
    Header: cva(''),
    Underlay: cva('bg-black opacity-5'),
  },
};

const Component = (props: DrawerProps) => (
  <Drawer.Trigger>
    <Button>Open Drawer</Button>
    <Drawer {...props}>
      <Drawer.Title>Drawer Title</Drawer.Title>
      <Drawer.Content>Drawer Content</Drawer.Content>
      <Drawer.Actions>
        <Button slot="close">Close</Button>
        <Button variant="primary">Save</Button>
      </Drawer.Actions>
    </Drawer>
  </Drawer.Trigger>
);

const user = userEvent.setup();
const { render } = setup({ theme });

test('renders nothing if isOpen is not set', function () {
  render(<Component />);
  expect(screen.queryByRole('dialog')).toBeNull();
});
