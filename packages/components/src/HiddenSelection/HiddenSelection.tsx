import type { RefObject } from 'react';
import { useRef } from 'react';
import { VisuallyHidden } from 'react-aria-components/VisuallyHidden';
import { useFormValidation } from '@react-aria/form';
import type { FormValidationState } from '@react-stately/form';
import type { Key, Selection } from '@react-types/shared';

export interface HiddenSelectionProps {
  name?: string;
  form?: string;
  disabled?: boolean;
  required?: boolean;
  selectionMode: 'single' | 'multiple';
  selection: Selection;
  onSelectionChange: (selection: Selection) => void;
  validationBehavior: 'aria' | 'native';
  validationState: FormValidationState;
  focusRef: RefObject<HTMLElement | null>;
}

/**
 * Shared hidden `<select>` for components that project a RAC selection state
 * into a real form control (SelectList, TagGroup). Wires `useFormValidation`
 * for native constraint validation and routes browser autofill / form reset
 * back to the consumer's selection setter.
 *
 * @internal Not part of the public API. Used by SelectList and TagGroup.
 */
export const HiddenSelection = ({
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
}: HiddenSelectionProps) => {
  const selectRef = useRef<HTMLSelectElement>(null);

  useFormValidation(
    { validationBehavior, focus: () => focusRef.current?.focus() },
    validationState,
    selectRef
  );

  // 'all' can't enumerate every key, so submit nothing. Consumers needing to
  // submit "all" should resolve it to concrete keys themselves.
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
        onChange={e => {
          const target = e.currentTarget;
          const keys = Array.from(target.selectedOptions, o => o.value as Key);
          onSelectionChange(
            new Set(target.multiple ? keys : keys.filter(Boolean))
          );
        }}
      >
        <option value="" />
        {/* No option text — keys may be opaque ids that shouldn't surface in
            validationMessage or DOM tooling. */}
        {selectedKeys.map(key => (
          <option key={key} value={key} />
        ))}
      </select>
    </VisuallyHidden>
  );
};
