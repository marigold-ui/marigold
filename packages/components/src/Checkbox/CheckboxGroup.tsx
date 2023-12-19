import type { ReactNode } from 'react';
import { CheckboxGroup } from 'react-aria-components';
import type RAC from 'react-aria-components';

import { useClassNames } from '@marigold/system';
import type { WidthProp } from '@marigold/system';

import { FieldBase } from '../FieldBase/FieldBase';
import type { FieldBaseProps } from '../FieldBase/FieldBase';

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
  ...rest
}: CheckboxGroupProps) => {
  const classNames = useClassNames({
    component: 'Checkbox',
    variant,
    size,
    className: { group: 'flex flex-col items-start gap-[0.5ch]' },
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
    <FieldBase as={CheckboxGroup} {...props}>
      {children}
    </FieldBase>
  );
};

export { _CheckboxGroup as CheckboxGroup };
