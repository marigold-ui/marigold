import { ReactElement, forwardRef } from 'react';
import type RAC from 'react-aria-components';
import { SearchField } from 'react-aria-components';
import { WidthProp } from '@marigold/system';
import { FieldBase, FieldBaseProps } from '../FieldBase/FieldBase';
import { SearchInput } from '../Input/SearchInput';

// Props
// ---------------
type RemovedProps =
  | 'className'
  | 'style'
  | 'children'
  | 'isDisabled'
  | 'isRequired'
  | 'isInvalid'
  | 'isReadOnly'
  | 'value'
  | 'defaultValue';

export interface SearchFieldProps
  extends
    Omit<RAC.SearchFieldProps, RemovedProps>,
    Pick<FieldBaseProps<'label'>, 'label' | 'description' | 'errorMessage'> {
  /**
   * Action element to display in the search field.
   */
  action?: ReactElement<any>;

  variant?: string;
  size?: string;

  /**
   * Sets the width of the field. You can see allowed tokens here: https://tailwindcss.com/docs/width
   * @default full
   * @remarks `WidthProp`
   */
  width?: WidthProp['width'];

  /**
   * If `true`, the input is considered invalid and if set the `errorMessage` is shown instead of the `description`.
   * @default false
   */
  error?: RAC.SearchFieldProps['isInvalid'];

  /**
   * If `true`, the input is disabled.
   * @default false
   */
  disabled?: RAC.SearchFieldProps['isDisabled'];

  /**
   * If `true`, the input is required.
   * @default false
   */
  required?: RAC.SearchFieldProps['isRequired'];

  /**
   * If `true`, the input is readOnly.
   * @default false
   */
  readOnly?: RAC.SearchFieldProps['isReadOnly'];

  /**
   * The current value of the input field.
   * @default none
   */
  value?: string;

  /**
   * The default value of the input field.
   * @default none
   */
  defaultValue?: string;

  /**
   * Placeholder text for the input field.
   * @default none
   */
  placeholder?: string;
}

const _SearchField = forwardRef<HTMLInputElement, SearchFieldProps>(
  ({ disabled, required, readOnly, error, ...rest }: SearchFieldProps, ref) => {
    const props: RAC.SearchFieldProps = {
      ...rest,
      isDisabled: disabled,
      isRequired: required,
      isReadOnly: readOnly,
      isInvalid: error,
    };

    return (
      <FieldBase as={SearchField} {...props}>
        <SearchInput
          ref={ref}
          className={{
            action:
              'util-touch-hitbox pr-2 group-data-[empty=true]/field:hidden',
          }}
        />
      </FieldBase>
    );
  }
);

export { _SearchField as SearchField };
