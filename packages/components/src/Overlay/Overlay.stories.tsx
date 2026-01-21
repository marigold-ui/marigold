import { forwardRef } from 'react';
import { Menu, MenuItem, MenuTrigger } from 'react-aria-components';
import preview from '.storybook/preview';
import { Button } from '../Button/Button';
import { Dialog } from '../Dialog/Dialog';
import { Headline } from '../Headline/Headline';
import { Text } from '../Text/Text';
import { Modal } from './Modal';
import { Popover } from './Popover';

const meta = preview.meta({
  title: 'Components/Overlay',
  component: Modal,
});

// imported from RAC
const TestTray = forwardRef<HTMLDivElement, { open: boolean }>(
  ({ open }, ref) => {
    return (
      <>
        <MenuTrigger isOpen={open}>
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

export const OverlayTray = meta.story({
  render: () => {
    return <TestTray open />;
  },
});
export const OverlayModal = meta.story({
  render: () => (
    <Dialog closeButton open>
      <Headline>This is a headline!</Headline>
      <Text>
        Pellentesque habitant morbi tristique senectus et netus et malesuada
        fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae,
        ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam
        egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend
        leo. Quisque sit amet est et sapien ullamcorper pharetra. Vestibulum
        erat wisi, condimentum sed, commodo vitae, ornare sit amet, wisi. Aenean
        fermentum, elit eget tincidunt condimentum, eros ipsum rutrum orci,
        sagittis tempus lacus enim ac dui. Donec non enim in turpis pulvinar
        facilisis. Ut felis. Praesent dapibus, neque id cursus faucibus, tortor
        neque egestas augue, eu vulputate magna eros eu erat. Aliquam erat
        volutpat. Nam dui mi, tincidunt quis, accumsan porttitor, facilisis
        luctus, metus.
      </Text>
    </Dialog>
  ),
});
