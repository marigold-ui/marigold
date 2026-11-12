import { Key, ReactNode } from 'react';
import type RAC from 'react-aria-components';
import { Button as RACButton } from 'react-aria-components/Button';
import { MenuTrigger, Menu as RACMenu } from 'react-aria-components/Menu';
import { useContextProps } from 'react-aria-components/slots';
import { useLocalizedStringFormatter } from '@react-aria/i18n';
import { cn, useClassNames, useSmallScreen } from '@marigold/system';
import { Button } from '../Button/Button';
import { ButtonContext, type ButtonContextValue } from '../Button/Context';
import type { PopoverProps } from '../Overlay/Popover';
import { Popover } from '../Overlay/Popover';
import { Tray } from '../Tray/Tray';
import { intlMessages } from '../intl/messages';
import { MenuItem } from './MenuItem';
import { MenuSection } from './MenuSection';

type RemovedProps = 'isOpen' | 'className' | 'style' | 'children';

export interface MenuProps
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
   * The label for the menu trigger button.
   */
  label?: ReactNode;

  variant?: 'default' | 'ghost' | (string & {});
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
}

const Menu = ({
  children,
  label,
  variant,
  size,
  disabled,
  open,
  placement,
  'aria-label': ariaLabel,
  ...props
}: MenuProps) => {
  const [trigger, triggerRef] = useContextProps(
    { variant, size, disabled } as ButtonContextValue,
    undefined,
    ButtonContext
  );
  const {
    variant: cascadedVariant,
    size: triggerSize,
    disabled: triggerDisabled,
    className: triggerClassName,
    ...triggerProps
  } = trigger;

  const triggerVariant =
    variant ?? (cascadedVariant === 'ghost' ? 'ghost' : undefined);

  const classNames = useClassNames({
    component: 'Menu',
    variant: triggerVariant,
    size: triggerSize,
  });
  const isSmallScreen = useSmallScreen();
  const stringFormatter = useLocalizedStringFormatter(intlMessages);

  return (
    <MenuTrigger {...props}>
      <RACButton
        {...triggerProps}
        ref={triggerRef}
        className={cn(triggerClassName, classNames.button)}
        aria-label={ariaLabel}
        isDisabled={triggerDisabled}
      >
        {label}
      </RACButton>
      {isSmallScreen ? (
        <Tray>
          <Tray.Content>
            <RACMenu {...props} className={classNames.container}>
              {children}
            </RACMenu>
          </Tray.Content>
          <Tray.Actions>
            <Button slot="close">{stringFormatter.format('close')}</Button>
          </Tray.Actions>
        </Tray>
      ) : (
        <Popover open={open} placement={placement}>
          <RACMenu {...props} className={classNames.container}>
            {children}
          </RACMenu>
        </Popover>
      )}
    </MenuTrigger>
  );
};

export { Menu };

Menu.Item = MenuItem;
Menu.Section = MenuSection;
