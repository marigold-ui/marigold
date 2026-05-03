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
import { ActionMenuContext } from './ActionMenuContext';
import { MenuItem } from './MenuItem';
import { MenuSection } from './MenuSection';

type RemovedProps = 'isOpen' | 'className' | 'style' | 'children';

export interface ActionMenuProps
  extends
    Omit<RAC.MenuTriggerProps, RemovedProps>,
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

  /**
   * A slot to place the element in.
   */
  slot?: string | null;

  ref?: Ref<HTMLButtonElement>;
}

const _ActionMenu = ({ ref: refProp, ...inputProps }: ActionMenuProps) => {
  const [merged, ref] = useContextProps(
    inputProps as Omit<ActionMenuProps, 'ref'> & { className?: string },
    refProp,
    ActionMenuContext
  );

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
    className: _contextClassName,
    slot: _slot,
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
