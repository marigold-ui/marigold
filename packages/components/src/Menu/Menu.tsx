import { Key, ReactNode } from 'react';
import { Menu, MenuTrigger } from 'react-aria-components';
import type RAC from 'react-aria-components';

import { useClassNames } from '@marigold/system';

import { Button } from '../Button';
import { Popover } from '../Overlay/Popover';
import type { PopoverProps } from '../Overlay/Popover';
import { MenuItem } from './MenuItem';
import { MenuSection } from './MenuSection';

type RemovedProps = 'isOpen' | 'className' | 'style' | 'children';

export interface MenuProps
  extends Omit<RAC.MenuTriggerProps, RemovedProps>,
    Omit<RAC.MenuProps<object>, RemovedProps> {
  open?: RAC.MenuTriggerProps['isOpen'];
  placement?: PopoverProps['placement'];
  label?: ReactNode;
  variant?: string;
  size?: string;
  onAction?: (key: Key) => void;
  children?: ReactNode;
  disabled?: boolean;
}

const _Menu = ({
  children,
  label,
  variant,
  size,
  disabled,
  open,
  placement,
  ...props
}: MenuProps) => {
  const classNames = useClassNames({ component: 'Menu', variant, size });

  return (
    <MenuTrigger {...props}>
      <Button variant="menu" disabled={disabled}>
        {label}
      </Button>
      <Popover open={open} placement={placement}>
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
