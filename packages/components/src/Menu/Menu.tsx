import { Key } from 'react';
import { Menu } from 'react-aria-components';
import type RAC from 'react-aria-components';

import { useClassNames } from '@marigold/system';

import { MenuItem } from './MenuItem';

// Props
// ---------------

type RemovedProps = 'className' | 'style';
export interface MenuProps extends Omit<RAC.MenuProps<object>, RemovedProps> {
  variant?: string;
  size?: string;
  onAction?: (key: Key) => void;
}

// Component
// ---------------
const _Menu = ({
  variant,
  size,
  children,
  items,
  onAction,
  ...props
}: MenuProps) => {
  const classNames = useClassNames({ component: 'Menu', variant, size });
  return (
    <Menu {...props} className={classNames.container} items={items}>
      {item => (
        <MenuItem className={classNames.item} onAction={onAction} item={item} />
      )}
    </Menu>
  );
};

export { _Menu as Menu };

_Menu.Item = MenuItem;
