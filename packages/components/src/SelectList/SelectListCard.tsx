import type { ReactNode } from 'react';
import { forwardRef } from 'react';
import type RAC from 'react-aria-components';
import type { SelectListItemProps } from './SelectListItem';
import { SelectListItem } from './SelectListItem';

type RemovedProps = 'className' | 'style' | 'isDisabled' | 'variant';

export interface SelectListCardProps
  extends Omit<SelectListItemProps, RemovedProps> {
  children?: ReactNode;

  /**
   * Whether the item is disabled.
   * @default false
   */
  disabled?: RAC.GridListItemProps<object>['isDisabled'];
}

const _SelectListCard = forwardRef<HTMLDivElement, SelectListCardProps>(
  ({ children, disabled, ...props }, ref) => {
    return (
      <SelectListItem variant="card" disabled={disabled} {...props} ref={ref}>
        {children}
      </SelectListItem>
    );
  }
);

export { _SelectListCard as SelectListCard };
