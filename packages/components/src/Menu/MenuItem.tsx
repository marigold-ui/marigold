import type { ReactNode } from 'react';
import type RAC from 'react-aria-components';
import { MenuItem } from 'react-aria-components/Menu';
import { TextContext } from 'react-aria-components/Text';
import { Provider } from 'react-aria-components/slots';
import { useClassNames } from '@marigold/system';
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

// Merge (rather than replace) RAC-provided slot configs on TextContext so
// nested `<TextValue>` / `<Description>` (or `<Text slot="label">` /
// `<Text slot="description">`) inside a `Menu.Item` pick up our theme
// classNames without losing RAC's slot wiring (most notably `id` for
// `aria-describedby`). Shared with `ListBox.Item` via `useMergedTextSlots`.
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
