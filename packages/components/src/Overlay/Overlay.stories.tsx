import { Meta, StoryObj } from '@storybook/react';
import { forwardRef } from 'react';
import { Menu, MenuItem, MenuTrigger } from 'react-aria-components';

import { Button } from '../Button';
import { Dialog } from '../Dialog';
import { Headline } from '../Headline';
import { Text } from '../Text';
import { Modal } from './Modal';
import { Popover } from './Popover';
import { Tray } from './Tray';

const meta = {
  title: 'Components/Overlay',
} satisfies Meta;

export default meta;

// imported from RAC
const TestTray = forwardRef<HTMLDivElement, { open: boolean }>(
  ({ open }, ref) => {
    return (
      <>
        <MenuTrigger>
          <Button>Button</Button>
          <Popover ref={ref}>
            <Menu>
              <MenuItem key="edit">Edit</MenuItem>
              <MenuItem key="duplicate">Duplicate</MenuItem>
              <MenuItem key="delete">Delete</MenuItem>
            </Menu>
          </Popover>
        </MenuTrigger>
      </>
    );
  }
);

export const OverlayTray: StoryObj<typeof Tray> = {
  render: () => {
    return <TestTray open />;
  },
};

OverlayTray.parameters = {
  theme: 'b2b',
};

export const OverlayModal: StoryObj<typeof Modal> = {
  render: () => {
    return (
      <Modal open>
        <Dialog closeButton aria-labelledby="my-cool-headline">
          <Headline id="my-cool-headline">This is a headline!</Headline>
          <Text>
            Pellentesque habitant morbi tristique senectus et netus et malesuada
            fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae,
            ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam
            egestas semper. Aenean ultricies mi vitae est. Mauris placerat
            eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra.
            Vestibulum erat wisi, condimentum sed, commodo vitae, ornare sit
            amet, wisi. Aenean fermentum, elit eget tincidunt condimentum, eros
            ipsum rutrum orci, sagittis tempus lacus enim ac dui. Donec non enim
            in turpis pulvinar facilisis. Ut felis. Praesent dapibus, neque id
            cursus faucibus, tortor neque egestas augue, eu vulputate magna eros
            eu erat. Aliquam erat volutpat. Nam dui mi, tincidunt quis, accumsan
            porttitor, facilisis luctus, metus.
          </Text>
        </Dialog>
      </Modal>
    );
  },
};
