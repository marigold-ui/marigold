import { Key, ReactNode } from 'react';
import type RAC from 'react-aria-components';
import { Menu, MenuTrigger } from 'react-aria-components';
import { useClassNames } from '@marigold/system';
import { Button } from '../Button';
import type { PopoverProps } from '../Overlay/Popover';
import { Popover } from '../Overlay/Popover';
import { MenuItem } from './MenuItem';
import { MenuSection } from './MenuSection';

type RemovedProps = 'isOpen' | 'className' | 'style' | 'children';

export interface MenuProps
  extends Omit<RAC.MenuTriggerProps, RemovedProps>,
    Omit<RAC.MenuProps<object>, RemovedProps> {
  /**
   * Whether the menu is open.
   * @default false
   */
  open?: RAC.MenuTriggerProps['isOpen'];

  /**
   * Placement of the popover.
   * @default 'bottom'
   */
  placement?: PopoverProps['placement'];

  /**
   * The label for the menu trigger button.
   */
  label?: ReactNode;

  variant?: string;
  size?: string;

  /**
   * Handler that is called when an action is performed on an item.
   */
  onAction?: (key: Key) => void;

  /**
   * The contents of the menu.
   */
  children?: ReactNode;

  /**
   * Whether the menu trigger is disabled.
   */
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
