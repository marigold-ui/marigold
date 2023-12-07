import { Key, ReactNode } from 'react';
import { Menu, MenuTrigger } from 'react-aria-components';
import type RAC from 'react-aria-components';

import { useClassNames } from '@marigold/system';

import { Button } from '../Button';
import { Popover } from '../Overlay/Popover';
import { MenuItem } from './MenuItem';
import { MenuSection } from './MenuSection';

type RemovedProps = 'isOpen' | 'className' | 'style' | 'children';

export interface MenuProps
  extends Omit<RAC.MenuTriggerProps, RemovedProps>,
    Omit<RAC.MenuProps<object>, RemovedProps> {
  open?: RAC.MenuTriggerProps['isOpen'];
  label?: ReactNode;
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
  open,
  ...props
}: MenuProps) => {
  const classNames = useClassNames({ component: 'Menu', variant, size });

  return (
    <MenuTrigger {...props}>
      <Button variant="menu">{label}</Button>
      <Popover>
        <Menu {...props} className={classNames.container}>
          {children}
        </Menu>
      </Popover>
    </MenuTrigger>
  );
};

export { _Menu as Menu };

_Menu.Item = MenuItem;
_Menu.Section = MenuSection;
