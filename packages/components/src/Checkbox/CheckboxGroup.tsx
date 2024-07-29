import type { ReactNode } from 'react';
import { CheckboxGroup } from 'react-aria-components';
import type RAC from 'react-aria-components';

import { Orientation } from '@react-types/shared';

import { cn, useClassNames } from '@marigold/system';
import type { WidthProp } from '@marigold/system';

import { FieldBase } from '../FieldBase/FieldBase';
import type { FieldBaseProps } from '../FieldBase/FieldBase';
import { CheckboxGroupContext } from './Context';

// Props
// ---------------
type RemovedProps =
  | 'className'
  | 'style'
  | 'children'
  | 'isDisabled'
  | 'isRequired'
  | 'isInvalid'
  | 'isReadOnly';

export interface CheckboxGroupProps
  extends Omit<RAC.CheckboxGroupProps, RemovedProps>,
    Pick<FieldBaseProps<'label'>, 'label' | 'description' | 'errorMessage'> {
  /**
   * The children of the component
   */
  children?: ReactNode;
  variant?: string;
  size?: string;
  /**
   * Sets the width of the field. You can see allowed tokens here: https://tailwindcss.com/docs/width
   * @default full
   */
  width?: WidthProp['width'];
  /**
   * Sets all checkboxes to disabled
   * @default false
   */
  disabled?: RAC.CheckboxGroupProps['isDisabled'];
  /**
   * Sets the checkbox as required.
   * @default false
   */
  required?: RAC.CheckboxGroupProps['isRequired'];
  /**
   * If `true`, the checkbox is considered invalid and if set the `errorMessage` is shown instead of the `description`.
   * @default false
   */
  error?: RAC.CheckboxGroupProps['isInvalid'];
  /**
   * Sets the checkbox on read only.
   * @default false
   */
  readOnly?: RAC.CheckboxGroupProps['isReadOnly'];
  /**
   * Wheather the component is displayed vertically or horizontally.
   * @default vertical
   */
  orientation?: Orientation;
}

// Component
// ---------------
const _CheckboxGroup = ({
  children,
  variant,
  size,
  required,
  disabled,
  readOnly,
  error,
  width,
  orientation = 'vertical',
  ...rest
}: CheckboxGroupProps) => {
  const classNames = useClassNames({
    component: 'Checkbox',
    variant,
    size,
    className: { group: 'gap-x-2' },
  });
  const props: RAC.CheckboxGroupProps = {
    className: classNames.group,
    isRequired: required,
    isDisabled: disabled,
    isReadOnly: readOnly,
    isInvalid: error,
    ...rest,
  };

  return (
    <FieldBase as={CheckboxGroup} width={width} {...props}>
      <div
        role="presentation"
        data-orientation={orientation}
        className={cn(
          classNames.group,
          'flex items-start',
          orientation === 'vertical'
            ? 'flex-col gap-[0.5ch]'
            : 'flex-row gap-[1.5ch]'
        )}
      >
        <CheckboxGroupContext.Provider value={{ width, variant, size }}>
          {children}
        </CheckboxGroupContext.Provider>
      </div>
    </FieldBase>
  );
};

export { _CheckboxGroup as CheckboxGroup };
