import { MenuTrigger } from 'react-aria-components';
import type RAC from 'react-aria-components';

import { PressResponder } from '@react-aria/interactions';

import { useSmallScreen } from '@marigold/system';

import { Button } from '../Button';
import { Tray } from '../Overlay';
import { Popover } from '../Overlay/Popover';

type RemovedProps = 'isOpen';

export interface MenuTriggerProps
  extends Omit<RAC.MenuTriggerProps, RemovedProps> {
  open?: RAC.MenuTriggerProps['isOpen'];
}

const _MenuTrigger = ({ children, ...props }: MenuTriggerProps) => {
  const isSmallScreen = useSmallScreen();
  return (
    <MenuTrigger {...props}>
      <Button variant="menu" />
      {isSmallScreen ? <Tray>{children}</Tray> : <Popover>{children}</Popover>};
    </MenuTrigger>
  );
};

export { _MenuTrigger as MenuTrigger };
