import type { ReactNode } from 'react';
import { use, useMemo } from 'react';
import type RAC from 'react-aria-components';
import { ListBoxItem } from 'react-aria-components/ListBox';
import { TextContext } from 'react-aria-components/Text';
import { Provider } from 'react-aria-components/slots';
import { Check } from '../icons/Check';
import { useListBoxContext } from './Context';

export type ListBoxItemProps = Omit<
  RAC.ListBoxItemProps,
  'style' | 'className' | 'children'
> & {
  /**
   * The children of the component
   */
  children?: ReactNode;
};

type SlottedContextValue = {
  slots?: Record<string, { className?: string } & Record<string, unknown>>;
};

interface ItemChildrenProps {
  children: ReactNode;
  labelClassName?: string;
  descriptionClassName?: string;
}

/**
 * Merges the `label` / `description` theme classNames into the `label` /
 * `description` slots of RAC's `TextContext`. The parent slot config is
 * spread first so RAC's `labelProps` / `descriptionProps` — including the
 * `id` it uses to wire `aria-describedby` — are preserved. Replacing the
 * slot instead of merging would break screen-reader description wiring.
 */
const ItemChildren = ({
  children,
  labelClassName,
  descriptionClassName,
}: ItemChildrenProps) => {
  const parent = use(TextContext) as SlottedContextValue | undefined;
  const parentSlots = parent?.slots;

  const value = useMemo(
    () => ({
      slots: {
        ...parentSlots,
        label: { ...(parentSlots?.label ?? {}), className: labelClassName },
        description: {
          ...(parentSlots?.description ?? {}),
          className: descriptionClassName,
        },
      },
    }),
    [parentSlots, labelClassName, descriptionClassName]
  );

  return (
    <Provider values={[[TextContext, value]]}>
      <div className="selection-indicator contents">
        <Check size={16} strokeWidth="3" className="hidden" />
        {children}
      </div>
    </Provider>
  );
};

export const _ListBoxItem = ({ ...props }: ListBoxItemProps) => {
  const { classNames, virtualized } = useListBoxContext();
  return (
    <ListBoxItem
      {...props}
      className={classNames.item}
      style={virtualized ? { height: '100%', minHeight: 0 } : undefined}
      // textValue needed because ListBoxItem in this case has multiple children
      textValue={props.textValue ?? String(props.children)}
    >
      <ItemChildren
        labelClassName={classNames.label}
        descriptionClassName={classNames.description}
      >
        {props.children}
      </ItemChildren>
    </ListBoxItem>
  );
};

export { _ListBoxItem as ListBoxItem };
