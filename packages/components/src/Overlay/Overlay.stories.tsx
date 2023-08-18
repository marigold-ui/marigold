import { Meta, StoryObj } from '@storybook/react';
import React, { forwardRef } from 'react';

import { OverlayProvider } from '@react-aria/overlays';
import { useObjectRef } from '@react-aria/utils';

import { useOverlayTriggerState } from '@react-stately/overlays';

import { Dialog } from '../Dialog';
import { Headline } from '../Headline';
import { Menu } from '../Menu';
import { Text } from '../Text';
import { Modal } from './Modal';
import { Tray } from './Tray';

const meta = {
  title: 'Components/Overlay',
} satisfies Meta;

export default meta;

const TestTray = forwardRef<HTMLDivElement, { open: boolean }>(
  ({ open }, ref) => {
    const trayRef = useObjectRef(ref);
    const state = useOverlayTriggerState({ isOpen: open });

    return (
      <OverlayProvider>
        <Tray state={state} ref={trayRef}>
          <Menu>
            <Menu.Item key="edit">Edit</Menu.Item>
            <Menu.Item key="duplicate">Duplicate</Menu.Item>
            <Menu.Item key="delete">Delete</Menu.Item>
          </Menu>
        </Tray>
      </OverlayProvider>
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
