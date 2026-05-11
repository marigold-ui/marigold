import { Key, ReactNode, Ref } from 'react';
import type RAC from 'react-aria-components';
import {
  MenuTrigger,
  Menu as RACMenu,
  useContextProps,
} from 'react-aria-components';
import { useLocalizedStringFormatter } from '@react-aria/i18n';
import { useClassNames, useSmallScreen } from '@marigold/system';
import { ActionButton } from '../ActionButton/ActionButton';
import { Button } from '../Button/Button';
import type { PopoverProps } from '../Overlay/Popover';
import { Popover } from '../Overlay/Popover';
import { Tray } from '../Tray/Tray';
import { EllipsisVertical } from '../icons/EllipsisVertical';
import { intlMessages } from '../intl/messages';
import type { SlotProps } from '../types';
import { ActionMenuContext } from './ActionMenuContext';
import { MenuItem } from './MenuItem';
import { MenuSection } from './MenuSection';

type RemovedProps = 'isOpen' | 'className' | 'style' | 'children' | 'slot';

export interface ActionMenuProps
  extends
    Omit<RAC.MenuTriggerProps, RemovedProps>,
    Omit<RAC.MenuProps<object>, RemovedProps>,
    SlotProps {
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

  // `variant` / `size` / `disabled` participate in `<ActionGroup>` cascade
  // with the same per-prop precedence as `<ActionButton>`: size — group wins,
  // variant — local wins, disabled — local wins (group is the default).

  /**
   * Visual variant of the trigger button.
   */
  variant?: 'default' | 'ghost' | (string & {});

  /**
   * Size of the trigger button.
   */
  size?: 'default' | 'small' | 'large' | 'icon' | (string & {});

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

  ref?: Ref<HTMLButtonElement>;
}

const _ActionMenu = ({ ref: refProp, ...inputProps }: ActionMenuProps) => {
  const [merged, ref] = useContextProps(
    inputProps as ActionMenuProps & { className?: string },
    refProp,
    ActionMenuContext
  );

  // className/slot/ref are consumed or inapplicable here; drop before spread.
  const {
    children,
    variant,
    size,
    disabled,
    open,
    placement,
    trigger,
    defaultOpen,
    onOpenChange,
    'aria-label': ariaLabel,
    className: _ignoredClassName, // ActionMenu has no DOM; style via ActionButtonContext
    slot: _ignoredSlot, // consumed by useContextProps
    ref: _ignoredRef, // forwarded via the second tuple element; wrong type for RAC Menu
    ...menuProps
  } = merged;

  const classNames = useClassNames({ component: 'Menu', variant, size });
  const isSmallScreen = useSmallScreen();
  const stringFormatter = useLocalizedStringFormatter(intlMessages);

  return (
    <MenuTrigger
      isOpen={open}
      trigger={trigger}
      defaultOpen={defaultOpen}
      onOpenChange={onOpenChange}
    >
      <ActionButton
        ref={ref}
        aria-label={ariaLabel}
        disabled={disabled}
        variant={variant}
        size={size}
      >
        <EllipsisVertical />
      </ActionButton>
      {isSmallScreen ? (
        <Tray>
          <Tray.Content>
            <RACMenu {...menuProps} className={classNames.container}>
              {children}
            </RACMenu>
          </Tray.Content>
          <Tray.Actions>
            <Button slot="close">{stringFormatter.format('close')}</Button>
          </Tray.Actions>
        </Tray>
      ) : (
        <Popover placement={placement}>
          <RACMenu {...menuProps} className={classNames.container}>
            {children}
          </RACMenu>
        </Popover>
      )}
    </MenuTrigger>
  );
};

_ActionMenu.Item = MenuItem;
_ActionMenu.Section = MenuSection;

export { _ActionMenu as ActionMenu };
