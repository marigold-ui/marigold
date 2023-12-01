import { Key, ReactNode } from 'react';
import { Menu, MenuTrigger } from 'react-aria-components';
import type RAC from 'react-aria-components';

import { useClassNames, useSmallScreen } from '@marigold/system';

import { Button } from '../Button';
import { Tray } from '../Overlay';
import { Popover } from '../Overlay/Popover';
import { MenuItem } from './MenuItem';
import { MenuSection } from './MenuSection';

type RemovedProps = 'isOpen' | 'className' | 'style' | 'children';

export interface MenuTriggerProps
  extends Omit<RAC.MenuTriggerProps, RemovedProps>,
    Omit<RAC.MenuProps<object>, RemovedProps> {
  open?: RAC.MenuTriggerProps['isOpen'];
  label?: string;
  variant?: string;
  size?: string;
  onAction?: (key: Key) => void;
  children?: ReactNode;
}

const _Menu = ({
  children,
  label,
  variant,
  size,
  ...props
}: MenuTriggerProps) => {
  const classNames = useClassNames({ component: 'Menu', variant, size });
  const isSmallScreen = useSmallScreen();
  return (
    <MenuTrigger {...props}>
      <Button variant="menu">{label}</Button>
      {isSmallScreen ? (
        <Tray>{children}</Tray>
      ) : (
        <Popover>
          <Menu {...props} className={classNames.container}>
            {children}
          </Menu>
        </Popover>
      )}
    </MenuTrigger>
  );
};

export { _Menu as Menu };

_Menu.Item = MenuItem;
_Menu.Section = MenuSection;
