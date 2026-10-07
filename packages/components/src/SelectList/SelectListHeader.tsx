import type { ReactNode } from 'react';
import { SelectAllCheckbox } from '../utils/SelectAll';
import { useSelectListContext } from './Context';

export interface SelectListHeaderProps {
  /**
   * Replaces the select-all checkbox's default "Select all" label.
   */
  children?: ReactNode;
}

/**
 * The region above a multi-select `<SelectList>`, holding its select-all
 * checkbox. The list aligns the checkbox with the option indicators, which is
 * the one part of this a consumer cannot compose themselves.
 *
 * Rendered only while `selectionMode="multiple"`: there is nothing for a
 * select-all to do in single mode.
 */
export const SelectListHeader = ({ children }: SelectListHeaderProps) => {
  const { classNames } = useSelectListContext();

  return (
    <div className={classNames?.header}>
      <SelectAllCheckbox>{children}</SelectAllCheckbox>
    </div>
  );
};
