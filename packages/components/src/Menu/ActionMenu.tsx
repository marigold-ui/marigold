import { Key, ReactNode, Ref } from 'react';
import type RAC from 'react-aria-components';
import { MenuTrigger, Menu as RACMenu } from 'react-aria-components/Menu';
import { useContextProps } from 'react-aria-components/slots';
import { useLocalizedStringFormatter } from '@react-aria/i18n';
import { useClassNames, useSmallScreen } from '@marigold/system';
import { Button } from '../Button/Button';
import { Divider } from '../Divider/Divider';
import type { PopoverProps } from '../Overlay/Popover';
import { Popover } from '../Overlay/Popover';
import { Tray } from '../Tray/Tray';
import { EllipsisVertical } from '../icons/EllipsisVertical';
import { intlMessages } from '../intl/messages';
import type { SlotProps } from '../types';
import {
  ActionMenuContext,
  type ActionMenuContextValue,
} from './ActionMenuContext';
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

  /**
   * Visual variant of the trigger button. When unset, the trigger inherits the
   * surrounding cascade: `'ghost'` inside `<Panel.Header>` / `<SelectList.Option>`,
   * the group's variant inside `<ButtonGroup>`, or the standalone `<Button>`
   * baseline (`'secondary'`) on its own.
   */
  variant?:
    | 'primary'
    | 'secondary'
    | 'destructive'
    | 'destructive-ghost'
    | 'ghost'
    | 'link'
    | (string & {});

  /**
   * Size of the trigger button. Applied when `<ActionMenu>` is used on its
   * own. Inside a `<ButtonGroup>`/`<Panel.Header>` it inherits the cascaded
   * size unless set explicitly here.
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
    inputProps as ActionMenuContextValue,
    refProp,
    ActionMenuContext
  );

  // `className`, `slot`, and `ref` must not flow into `<RACMenu>` via spread:
  //   className: ActionMenu has no DOM of its own; would clobber `classNames.container`
  //   slot:      consumed by `useContextProps` for ActionMenuContext registration
  //   ref:       button-typed via ActionMenuContext, wrong type for RAC Menu
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
    'aria-labelledby': ariaLabelledBy,
    'aria-describedby': ariaDescribedBy,
    className: _className,
    slot: _slot,
    ref: _ref,
    ...props
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
      <Button
        ref={ref}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        aria-describedby={ariaDescribedBy}
        disabled={disabled}
        // Pass `variant`/`size` straight through so the trigger resolves them
        // via `ButtonContext` like any Marigold button: ghost inside
        // Panel.Header/SelectList.Option, the group's variant in a ButtonGroup,
        // the standalone `secondary` baseline on its own. A local value wins.
        variant={variant}
        size={size}
      >
        <EllipsisVertical />
      </Button>
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
        <Popover placement={placement}>
          <RACMenu {...props} className={classNames.container}>
            {children}
          </RACMenu>
        </Popover>
      )}
    </MenuTrigger>
  );
};

_ActionMenu.Item = MenuItem;
_ActionMenu.Section = MenuSection;
_ActionMenu.Divider = Divider;

export { _ActionMenu as ActionMenu };
