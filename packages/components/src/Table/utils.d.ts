/// <reference types="react" />
import { AriaCheckboxProps } from '@react-types/checkbox';
export interface MapCheckboxProps {
  checkboxProps: AriaCheckboxProps;
}
/**
 * Map `react-aria` props to ours (no "is"-prefix)
 */
export declare const mapCheckboxProps: ({
  checkboxProps: {
    isIndeterminate,
    isSelected,
    isDisabled,
    defaultSelected,
    ...rest
  },
}: MapCheckboxProps) => {
  checkboxProps: {
    readonly children?: import('react').ReactNode;
    readonly onChange?: ((isSelected: boolean) => void) | undefined;
    readonly value?: string | undefined;
    readonly name?: string | undefined;
    readonly isReadOnly?: boolean | undefined;
    readonly validationState?:
      | import('@react-types/shared').ValidationState
      | undefined;
    readonly isRequired?: boolean | undefined;
    readonly autoFocus?: boolean | undefined;
    readonly onFocus?:
      | ((e: import('react').FocusEvent<Element, Element>) => void)
      | undefined;
    readonly onBlur?:
      | ((e: import('react').FocusEvent<Element, Element>) => void)
      | undefined;
    readonly onFocusChange?: ((isFocused: boolean) => void) | undefined;
    readonly onKeyDown?:
      | ((e: import('@react-types/shared').KeyboardEvent) => void)
      | undefined;
    readonly onKeyUp?:
      | ((e: import('@react-types/shared').KeyboardEvent) => void)
      | undefined;
    readonly 'aria-controls'?: string | undefined;
    readonly excludeFromTabOrder?: boolean | undefined;
    readonly id?: string | undefined;
    readonly 'aria-label'?: string | undefined;
    readonly 'aria-labelledby'?: string | undefined;
    readonly 'aria-describedby'?: string | undefined;
    readonly 'aria-details'?: string | undefined;
    readonly 'aria-errormessage'?: string | undefined;
    readonly disabled: boolean | undefined;
    readonly checked: boolean | undefined;
    readonly defaultChecked: boolean | undefined;
    readonly indeterminate: boolean | undefined;
  };
};
//# sourceMappingURL=utils.d.ts.map
