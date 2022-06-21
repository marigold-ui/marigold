import type { AriaSelectProps } from '@react-types/select';
import { ThemeExtensionsWithParts } from '@marigold/system';
import { ComponentProps } from '@marigold/types';
export interface SelectThemeExtension
  extends ThemeExtensionsWithParts<'Select', ['container', 'button', 'icon']> {}
export interface SelectProps
  extends Omit<
      AriaSelectProps<object>,
      | 'autoComplete'
      | 'isOpen'
      | 'isLoading'
      | 'onLoadMore'
      | 'isDisabled'
      | 'isRequired'
      | 'validationState'
    >,
    Omit<
      ComponentProps<'select'>,
      'onKeyUp' | 'onKeyDown' | 'onFocus' | 'onBlur' | 'children' | 'size'
    > {
  variant?: string;
  size?: string;
  width?: string;
  open?: boolean;
  disabled?: boolean;
  required?: boolean;
  error?: boolean;
}
export declare const Select: {
  ({
    variant,
    size,
    width,
    open,
    disabled,
    required,
    error,
    ...rest
  }: SelectProps): JSX.Element;
  Option: <T>(props: import('@react-types/shared').ItemProps<T>) => JSX.Element;
  Section: <T_1>(
    props: import('@react-types/shared').SectionProps<T_1>
  ) => JSX.Element;
};
//# sourceMappingURL=Select.d.ts.map
