import type { ReactNode } from 'react';
import type RAC from 'react-aria-components';
import { ListBoxItem } from 'react-aria-components';
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
      <div className="selection-indicator contents">
        <Check size={16} strokeWidth="3" className="hidden" />
        {props.children}
      </div>
    </ListBoxItem>
  );
};

export { _ListBoxItem as ListBoxItem };
