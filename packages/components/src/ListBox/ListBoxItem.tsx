import type { ReactNode } from 'react';
import type RAC from 'react-aria-components';
import { ListBoxItem } from 'react-aria-components/ListBox';
import { TextContext } from 'react-aria-components/Text';
import { Provider } from 'react-aria-components/slots';
import { cn } from '@marigold/system';
import { useMergedTextSlots } from '../utils/useMergedTextSlots';
import { useListBoxContext } from './Context';
import { SelectionIndicator } from './SelectionIndicator';

export type ListBoxItemProps = Omit<
  RAC.ListBoxItemProps,
  'style' | 'className' | 'children'
> & {
  /**
   * The children of the component
   */
  children?: ReactNode;
};

interface ItemChildrenProps {
  children: ReactNode;
  labelClassName?: string;
  descriptionClassName?: string;
}

/**
 * Injects the `label` / `description` theme classNames into RAC's
 * `TextContext` (see {@link useMergedTextSlots}) so a nested
 * `<Text slot="label">` / `<Text slot="description">` picks them up without
 * relying on a fragile descendant selector on the item.
 */
const ItemChildren = ({
  children,
  labelClassName,
  descriptionClassName,
}: ItemChildrenProps) => {
  const value = useMergedTextSlots({
    label: labelClassName,
    description: descriptionClassName,
  });

  return (
    <Provider values={[[TextContext, value]]}>
      <SelectionIndicator>{children}</SelectionIndicator>
    </Provider>
  );
};

export const _ListBoxItem = (props: ListBoxItemProps) => {
  const { classNames, virtualized } = useListBoxContext();
  return (
    <ListBoxItem
      {...props}
      className={cn(classNames.item, 'focus-visible:z-1')}
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
