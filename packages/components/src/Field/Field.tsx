import React from 'react';
import { useStyles } from '@marigold/system';
import { Exclamation } from '@marigold/icons';
import { ComponentProps } from '@marigold/types';

import { Input } from '../Input';
import { Label } from '../Label';
import { ValidationMessage } from '../ValidationMessage';

export type FieldProps = {
  variant?: string;
  htmlFor: string;
  label: string;
  error?: string;
} & ComponentProps<'input'>;

export const Field: React.FC<FieldProps> = ({
  variant = 'default',
  type = 'text',
  className = '',
  htmlFor,
  label,
  error,
  ...props
}) => {
  const labelClassName = useStyles({
    variant: `field.${variant}`,
    className,
  });

  return (
    <div>
      <Label
        className={labelClassName}
        htmlFor={htmlFor}
        required={error ? true : false}
      >
        {label}
      </Label>
      <Input {...props} type={type} id={htmlFor} />
      {error && (
        <ValidationMessage>
          <Exclamation size={16} />
          {error}
        </ValidationMessage>
      )}
    </div>
  );
};
