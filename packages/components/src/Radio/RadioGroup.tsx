import { ReactNode } from 'react';
import { RadioGroup } from 'react-aria-components';
import type RAC from 'react-aria-components';

import { WidthProp, cn, useClassNames } from '@marigold/system';

import { FieldBase } from '../FieldBase/_FieldBase';
import { RadioGroupContext } from './Context';

type RemovedProps =
  | 'className'
  | 'style'
  | 'isDisabled'
  | 'isInvalid'
  | 'isRequired'
  | 'isSelected';
export interface RadioGroupProps
  extends Omit<RAC.RadioGroupProps, RemovedProps> {
  variant?: string;
  size?: string;
  label?: string;
  description?: string;
  errorMessage?: string;
  children: ReactNode[];
  width?: WidthProp['width'];
  error?: RAC.RadioGroupProps['isInvalid'];
  required?: RAC.RadioGroupProps['isRequired'];
  disabled?: RAC.RadioGroupProps['isDisabled'];
  readOnly?: boolean;
  value?: string;
}

const _RadioGroup = ({
  variant,
  size,
  label,
  error,
  disabled,
  required,
  readOnly,
  description,
  errorMessage,
  orientation = 'vertical',
  children,
  width,
  ...rest
}: RadioGroupProps) => {
  const classNames = useClassNames({ component: 'Radio', variant, size });

  const props: RAC.RadioGroupProps = {
    isDisabled: disabled,
    isReadOnly: readOnly,
    isRequired: required,
    isInvalid: error,
    ...rest,
  } as const;

  return (
    <FieldBase
      as={RadioGroup}
      width={width}
      label={label}
      description={description}
      errorMessage={errorMessage}
      variant={variant}
      size={size}
      {...props}
    >
      <div
        role="presentation"
        data-testid="group"
        data-orientation={orientation}
        className={cn(
          classNames.group,
          'flex items-start',
          orientation === 'vertical'
            ? 'flex-col gap-[0.5ch]'
            : 'flex-row gap-[1.5ch]'
        )}
      >
        <RadioGroupContext.Provider value={{ width, variant, size }}>
          {children}
        </RadioGroupContext.Provider>
      </div>
    </FieldBase>
  );
};

export { _RadioGroup as RadioGroup };
