import { Key, ReactNode, useRef, useState } from 'react';
import type RAC from 'react-aria-components';
import { Menu, MenuTrigger, Button as RACButton } from 'react-aria-components';
import { useLocalizedStringFormatter } from '@react-aria/i18n';
import { useInteractOutside } from '@react-aria/interactions';
import { useClassNames, useSmallScreen } from '@marigold/system';
import { Button } from '../Button/Button';
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

  /**
   * Whether the menu should be non-modal. When `true`, the menu won't
   * lock background scrolling or hide outside content from screen readers.
   *
   * Use this when the menu is inside a page with sticky or fixed headers
   * that break when `overflow: hidden` is set on the root element.
   * @default false
   */
  nonModal?: boolean;
}

const _Menu = ({
  children,
  label,
  variant,
  size,
  disabled,
  open,
  placement,
  nonModal,
  'aria-label': ariaLabel,
  ...props
}: MenuProps) => {
  const classNames = useClassNames({ component: 'Menu', variant, size });
  const isSmallScreen = useSmallScreen();
  const stringFormatter = useLocalizedStringFormatter(intlMessages);
  const popoverRef = useRef<HTMLDivElement>(null);
  const [internalOpen, setInternalOpen] = useState(false);
  const isOpen = open ?? internalOpen;

  const setIsOpen = (val: boolean) => {
    if (open === undefined) {
      setInternalOpen(val);
    }
    props.onOpenChange?.(val);
  };

  // react-aria's non-modal popover doesn't dismiss on outside click (by design,
  // for comboboxes). For menus this is unexpected, so we use react-aria's own
  // `useInteractOutside` hook to close the menu on outside interaction.
  useInteractOutside({
    ref: popoverRef,
    isDisabled: !nonModal || !isOpen,
    onInteractOutside: () => setIsOpen(false),
  });

  return (
    <MenuTrigger
      {...props}
      isOpen={nonModal ? isOpen : open}
      onOpenChange={setIsOpen}
    >
      <RACButton
        className={classNames.button}
        aria-label={ariaLabel}
        isDisabled={disabled}
      >
        {label}
      </RACButton>
      {isSmallScreen ? (
        <Tray>
          <Tray.Content>
            <Menu {...props} className={classNames.container}>
              {children}
            </Menu>
          </Tray.Content>
          <Tray.Actions>
            <Button slot="close">{stringFormatter.format('close')}</Button>
          </Tray.Actions>
        </Tray>
      ) : (
        <Popover
          ref={popoverRef}
          open={nonModal ? isOpen : open}
          placement={placement}
          isNonModal={nonModal}
        >
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
