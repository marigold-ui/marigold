import { ListBoxItem } from 'react-aria-components';
import type RAC from 'react-aria-components';
import { SVGProps } from '@marigold/system';
import { useListBoxContext } from './Context';

export interface ListBoxItemProps
  extends Omit<RAC.ListBoxItemProps, 'style' | 'className'> {}

const CheckMark = ({ className }: SVGProps) => (
  <svg width="12px" height="10px" viewBox="0 0 12 10" className={className}>
    <path
      fill="currentColor"
      stroke="none"
      d="M11.915 1.548 10.367 0 4.045 6.315 1.557 3.827 0 5.373l4.045 4.046 7.87-7.871Z"
    />
  </svg>
);

export const _ListBoxItem = ({ ...props }: ListBoxItemProps) => {
  const { classNames } = useListBoxContext();

  return (
    <ListBoxItem {...props} className={classNames.item}>
      <>
        <CheckMark className={classNames.icon} />
        {props.children}
      </>
    </ListBoxItem>
  );
};

export { _ListBoxItem as ListBoxItem };
