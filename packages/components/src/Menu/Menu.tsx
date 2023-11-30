import { Key } from 'react';
import { Menu } from 'react-aria-components';
import type RAC from 'react-aria-components';

import { useClassNames } from '@marigold/system';

import { Button } from '../Button';
import { Popover } from '../Overlay/Popover';
import { MenuItem } from './MenuItem';
import { MenuSection } from './MenuSection';
import { MenuTrigger } from './MenuTrigger';

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

  console.log(props);
  return (
    <Popover>
      <Menu {...props} className={classNames.container}>
        {children}
      </Menu>
    </Popover>
  );
};

export { _Menu as Menu };

_Menu.Item = MenuItem;
_Menu.Section = MenuSection;
_Menu.Trigger = MenuTrigger;
