import React, { forwardRef } from 'react';
import { OverlayProvider } from '@react-aria/overlays';
import { useObjectRef } from '@react-aria/utils';
import { useOverlayTriggerState } from '@react-stately/overlays';
import { ComponentStory } from '@storybook/react';
import { Tray } from './Tray';
import { Menu } from '../Menu';

export default {
  title: 'Components/Overlay',
};
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

export const OverlayTray: ComponentStory<typeof Tray> = args => {
  return <TestTray open />;
};

OverlayTray.parameters = {
  theme: 'b2b',
};
