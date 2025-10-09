import { CheckMark } from 'packages/components/src/icons/CheckMark';
import type RAC from 'react-aria-components';
import { ListBoxItem } from 'react-aria-components';
import { useListBoxContext } from './Context';

export type ListBoxItemProps = Omit<
  RAC.ListBoxItemProps,
  'style' | 'className' | 'children'
> & {
  /**
   * The children of the component
   */
  children?: React.ReactNode;
};

export const _ListBoxItem = ({ ...props }: ListBoxItemProps) => {
  const { classNames } = useListBoxContext();
  return (
    <ListBoxItem
      {...props}
      className={classNames.item}
      // textValue needed because ListBoxItem in this case has multiple children
      textValue={props.textValue ?? String(props.children)}
    >
      <div className="selection-indicator contents">
        <CheckMark className="hidden" />
        {props.children}
      </div>
    </ListBoxItem>
  );
};

export { _ListBoxItem as ListBoxItem };
