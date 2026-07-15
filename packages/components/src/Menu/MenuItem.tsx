import type { ReactNode } from 'react';
import type RAC from 'react-aria-components';
import { MenuItem } from 'react-aria-components/Menu';
import { TextContext } from 'react-aria-components/Text';
import { Provider } from 'react-aria-components/slots';
import { useClassNames } from '@marigold/system';
import { Check } from '../icons/Check';
import { AccessIcon } from '../utils/AccessIcon';
import { AccessLabel } from '../utils/AccessLabel';
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
}

// Inject label/description theme classNames into RAC's TextContext (merge,
// not replace, to keep aria-describedby wiring). Shared with ListBox.Item.
const ItemChildren = ({
  children,
  labelClassName,
  descriptionClassName,
}: ItemChildrenProps) => {
  const value = useMergedTextSlots({
    label: labelClassName,
    description: descriptionClassName,
  });

  return <Provider values={[[TextContext, value]]}>{children}</Provider>;
};

// Component
// ---------------
const _MenuItem = ({ children, variant, size, ...props }: MenuItemProps) => {
  const classNames = useClassNames({ component: 'Menu', variant, size });
  return (
    <MenuItem {...props} className={classNames.item}>
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
          >
            {typeof children === 'function' ? children(renderProps) : children}
          </ItemChildren>
          <AccessLabel variant={variant} />
        </>
      )}
    </MenuItem>
  );
};

export { _MenuItem as MenuItem };
