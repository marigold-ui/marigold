import type { ReactNode } from 'react';
import { SelectAllCheckbox } from '../utils/SelectAll';
import { useListViewContext } from './Context';

export interface ListViewHeaderProps {
  /**
   * Replaces the select-all checkbox's default "Select all" label.
   */
  children?: ReactNode;
}

/**
 * The region above a multi-select `<ListView>`, holding its select-all
 * checkbox. The list aligns the checkbox with the row indicators, which is the
 * one part of this a consumer cannot compose themselves.
 *
 * Rendered only while `selectionMode="multiple"`: there is nothing for a
 * select-all to do in the other modes.
 */
export const ListViewHeader = ({ children }: ListViewHeaderProps) => {
  const { classNames } = useListViewContext();

  return (
    <div className={classNames?.header}>
      <SelectAllCheckbox>{children}</SelectAllCheckbox>
    </div>
  );
};
