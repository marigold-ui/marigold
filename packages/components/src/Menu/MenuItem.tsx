import type { ReactNode } from 'react';
import { use, useMemo } from 'react';
import type RAC from 'react-aria-components';
import { MenuItem } from 'react-aria-components/Menu';
import { TextContext } from 'react-aria-components/Text';
import { Provider } from 'react-aria-components/slots';
import { useClassNames } from '@marigold/system';

// Props
// ---------------
type RemovedProps = 'style' | 'className';
export interface MenuItemProps extends Omit<RAC.MenuItemProps, RemovedProps> {
  variant?: 'destructive' | 'default' | 'master' | 'admin' | (string & {});
  size?: string;
}

type SlottedContextValue = {
  slots?: Record<string, { className?: string } & Record<string, unknown>>;
};

interface ItemChildrenProps {
  children: ReactNode;
  labelClassName?: string;
  descriptionClassName?: string;
}

// Merge (rather than replace) RAC-provided slot configs on TextContext so
// nested `<TextValue>` / `<Description>` (or `<Text slot="label">` /
// `<Text slot="description">`) inside a `Menu.Item` pick up our theme
// classNames without losing RAC's slot wiring (most notably `id` for
// `aria-describedby`).
const ItemChildren = ({
  children,
  labelClassName,
  descriptionClassName,
}: ItemChildrenProps) => {
  const parentText = use(TextContext) as SlottedContextValue | undefined;
  const parentTextSlots = parentText?.slots;

  const textContextValue = useMemo(
    () => ({
      slots: {
        ...parentTextSlots,
        label: {
          ...(parentTextSlots?.label ?? {}),
          className: labelClassName,
        },
        description: {
          ...(parentTextSlots?.description ?? {}),
          className: descriptionClassName,
        },
      },
    }),
    [parentTextSlots, labelClassName, descriptionClassName]
  );

  return (
    <Provider values={[[TextContext, textContextValue]]}>{children}</Provider>
  );
};

// Component
// ---------------
const _MenuItem = ({ children, variant, size, ...props }: MenuItemProps) => {
  const classNames = useClassNames({ component: 'Menu', variant, size });
  return (
    <MenuItem {...props} className={classNames.item}>
      {renderProps => (
        <ItemChildren
          labelClassName={classNames.label}
          descriptionClassName={classNames.description}
        >
          {typeof children === 'function' ? children(renderProps) : children}
        </ItemChildren>
      )}
    </MenuItem>
  );
};

export { _MenuItem as MenuItem };
