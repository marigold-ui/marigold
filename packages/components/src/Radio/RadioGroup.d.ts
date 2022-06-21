import { ReactNode } from 'react';
import { AriaRadioGroupProps } from '@react-types/radio';
import { ThemeExtensionsWithParts } from '@marigold/system';
export interface RadioGroupThemeExtension
  extends ThemeExtensionsWithParts<'RadioGroup', ['container', 'group']> {}
export interface RadioGroupProps
  extends Omit<
    AriaRadioGroupProps,
    'isDisabled' | 'isRquired' | 'isReadOnly ' | 'validationState'
  > {
  children: ReactNode[];
  variant?: string;
  size?: string;
  width?: string;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  error?: boolean;
}
export declare const RadioGroup: ({
  children,
  orientation,
  size,
  variant,
  width,
  required,
  disabled,
  readOnly,
  error,
  ...rest
}: RadioGroupProps) => JSX.Element;
//# sourceMappingURL=RadioGroup.d.ts.map
