import type { ReactNode } from 'react';
import type RAC from 'react-aria-components';
import { KeyboardContext } from 'react-aria-components/Keyboard';
import { MenuItem as RACMenuItem } from 'react-aria-components/Menu';
import { TextContext } from 'react-aria-components/Text';
import { Provider } from 'react-aria-components/slots';
import { useClassNames } from '@marigold/system';
import { Check } from '../icons/Check';
import { AccessIcon } from '../utils/AccessIcon';
import { AccessLabel } from '../utils/AccessLabel';
import { useMergedKeyboardSlot } from '../utils/useMergedKeyboardSlot';
import { useMergedTextSlots } from '../utils/useMergedTextSlots';

// Props
// ---------------
type RemovedProps = 'style' | 'className';
export interface MenuItemProps extends Omit<RAC.MenuItemProps, RemovedProps> {
  variant?: 'destructive' | 'default' | 'master' | 'admin' | (string & {});
  size?: string;
}

interface ItemChildrenProps {
  children: ReactNode;
  labelClassName?: string;
  descriptionClassName?: string;
  keyboardClassName?: string;
}

// Inject label/description/keyboard theme classNames into RAC's Text and
// Keyboard contexts (merge, not replace, to keep aria-describedby wiring).
const ItemChildren = ({
  children,
  labelClassName,
  descriptionClassName,
  keyboardClassName,
}: ItemChildrenProps) => {
  const textValue = useMergedTextSlots({
    label: labelClassName,
    description: descriptionClassName,
  });
  const keyboardValue = useMergedKeyboardSlot(keyboardClassName);

  return (
    <Provider
      values={[
        [TextContext, textValue],
        [KeyboardContext, keyboardValue],
      ]}
    >
      {children}
    </Provider>
  );
};

// Internal core
// ---------------
// Behaviour and structure of a menu item without a theme: `Menu.Item` styles
// it with the Menu theme, `CommandPalette.Item` with its own, larger one.
export interface MenuItemClassNames {
  item?: string;
  label?: string;
  description?: string;
  keyboard?: string;
}

// RAC gets a render function, so it cannot derive the text used for
// typeahead and filtering. Top-level text provides it, also next to an icon
// (`<Icon /> Events`).
export const getItemText = (children: MenuItemProps['children']) => {
  if (typeof children === 'function') return undefined;
  const parts: ReactNode[] = Array.isArray(children) ? children : [children];
  const text = parts
    .filter(part => typeof part === 'string')
    .join('')
    .trim();
  return text || undefined;
};

export const MenuItemCore = ({
  children,
  variant,
  textValue,
  classNames,
  ...props
}: Omit<MenuItemProps, 'size'> & { classNames: MenuItemClassNames }) => (
  <RACMenuItem
    {...props}
    textValue={textValue ?? getItemText(children)}
    className={classNames.item}
  >
    {renderProps => (
      <>
        <AccessIcon variant={variant} />
        {/* Checkmark only in selection mode; keeps command menus unchanged. */}
        {renderProps.selectionMode !== 'none' && (
          <Check size={16} strokeWidth="3" className="selection-indicator" />
        )}
        <ItemChildren
          labelClassName={classNames.label}
          descriptionClassName={classNames.description}
          keyboardClassName={classNames.keyboard}
        >
          {typeof children === 'function' ? children(renderProps) : children}
        </ItemChildren>
        <AccessLabel variant={variant} />
      </>
    )}
  </RACMenuItem>
);

// Component
// ---------------
const MenuItem = ({ variant, size, ...props }: MenuItemProps) => {
  const classNames = useClassNames({ component: 'Menu', variant, size });
  return <MenuItemCore {...props} variant={variant} classNames={classNames} />;
};

export { MenuItem };
