import { Key } from 'react';
import { Menu, MenuTrigger } from 'react-aria-components';
import type RAC from 'react-aria-components';

import { useClassNames } from '@marigold/system';

import { Button } from '../Button';
import { Popover } from '../Overlay/Popover';
import { MenuItem } from './MenuItem';
import { MenuSection } from './MenuSection';

// Props
// ---------------

type RemovedProps = 'className' | 'style';
export interface MenuProps extends Omit<RAC.MenuProps<object>, RemovedProps> {
  variant?: string;
  size?: string;
  onAction?: (key: Key) => void;
  label?: string;
}

// Component
// ---------------
const _Menu = ({
  variant,
  size,
  children,
  items,
  onAction,
  label,
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
