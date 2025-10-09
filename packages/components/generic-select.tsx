import { Ref, forwardRef } from 'react';
import type RAC from 'react-aria-components';
import { forwardRefType } from '@react-types/shared';

export type SelectionMode = 'single' | 'multiple';

export interface SelectProps<
  T extends object,
  M extends SelectionMode = 'single',
> extends Omit<RAC.SelectProps<T, M>, 'children' | 'style' | 'className'> {
  /**
   * Children of the select.
   */
  children?: React.ReactNode | ((item: T) => React.ReactNode);
}

export type CompoundComponent = {
  Item: () => null;
  Section: () => null;
};

const SelectBase = (forwardRef as forwardRefType)(function Select<
  T extends object,
  M extends SelectionMode = 'single',
>(props: SelectProps<T, M>, ref: Ref<HTMLButtonElement>) {
  return <button ref={ref}>Generic Select</button>;
});

export const Select = Object.assign(SelectBase, {
  Item: () => null,
  Section: () => null,
});

//== STATIC MEMBERS ==//

Select.Item = () => null;
Select.Section = () => null;

//== VALIDATION ==//

const setSingle = (value: RAC.Key | null) => value;
const setMultiple = (value: RAC.Key[] | null) => value;

<Select onChange={setSingle}></Select>;
// @ts-expect-error only single mode
<Select onChange={setMultiple}></Select>;

// @ts-expect-error only multiple mode
<Select selectionMode="multiple" onChange={setSingle}></Select>;
<Select selectionMode="multiple" onChange={setMultiple}></Select>;
