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
  children?: ReactNode;
  variant?: string;
  size?: string;
  width?: WidthProp['width'];
  disabled?: RAC.CheckboxGroupProps['isDisabled'];
  required?: RAC.CheckboxGroupProps['isRequired'];
  error?: RAC.CheckboxGroupProps['isInvalid'];
  readOnly?: RAC.CheckboxGroupProps['isReadOnly'];
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
