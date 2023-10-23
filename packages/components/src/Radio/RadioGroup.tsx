import { ReactNode } from 'react';
import { RadioGroup } from 'react-aria-components';
import type RAC from 'react-aria-components';

import {
  WidthProp,
  cn,
  width as twWidth,
  useClassNames,
} from '@marigold/system';

import { FieldBase } from '../FieldBase/_FieldBase';
import { RadioGroupContext } from './Context';

export interface RadioGroupProps extends RAC.RadioGroupProps {
  variant?: string;
  size?: string;
  label?: string;
  description?: string;
  errorMessage?: string;
  children: ReactNode[];
  width?: WidthProp['width'];
}

const _RadioGroup = ({
  variant,
  size,
  label,
  description,
  errorMessage,
  orientation = 'vertical',
  children,
  width,
  ...props
}: RadioGroupProps) => {
  const classNames = useClassNames({ component: 'Radio', variant, size });

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
