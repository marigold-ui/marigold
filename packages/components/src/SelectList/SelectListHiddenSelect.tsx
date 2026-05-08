import type { ChangeEvent, RefObject } from 'react';
import { useCallback, useRef } from 'react';
import { VisuallyHidden } from 'react-aria-components';
import { useFormValidation } from '@react-aria/form';
import type { FormValidationState } from '@react-stately/form';
import type { Key, Selection } from '@react-types/shared';
import type { SelectionMode } from './SelectList';

export interface SelectListHiddenSelectProps {
  name?: string;
  form?: string;
  disabled?: boolean;
  required?: boolean;
  selectionMode: SelectionMode;
  selection: Selection;
  onSelectionChange: (selection: Selection) => void;
  validationBehavior: 'aria' | 'native';
  validationState: FormValidationState;
  focusRef: RefObject<HTMLElement | null>;
}

export const SelectListHiddenSelect = ({
  name,
  form,
  disabled,
  required,
  selectionMode,
  selection,
  onSelectionChange,
  validationBehavior,
  validationState,
  focusRef,
}: SelectListHiddenSelectProps) => {
  const selectRef = useRef<HTMLSelectElement>(null);

  useFormValidation(
    { validationBehavior, focus: () => focusRef.current?.focus() },
    validationState,
    selectRef
  );

  const onChange = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      const target = e.currentTarget;
      if (target.multiple) {
        onSelectionChange(
          new Set(Array.from(target.selectedOptions, o => o.value as Key))
        );
      } else {
        onSelectionChange(
          target.value ? new Set([target.value as Key]) : new Set()
        );
      }
    },
    [onSelectionChange]
  );

  const selectedKeys =
    selection === 'all' ? [] : Array.from(selection).map(String);
  const value =
    selectionMode === 'multiple' ? selectedKeys : (selectedKeys[0] ?? '');

  return (
    <VisuallyHidden>
      <select
        ref={selectRef}
        tabIndex={-1}
        aria-hidden="true"
        disabled={disabled}
        multiple={selectionMode === 'multiple'}
        required={validationBehavior === 'native' && required}
        name={name}
        form={form}
        value={value}
        onChange={onChange}
      >
        <option value="" />
        {selectedKeys.map(key => (
          <option key={key} value={key}>
            {key}
          </option>
        ))}
      </select>
    </VisuallyHidden>
  );
};
