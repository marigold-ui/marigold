import React from 'react';
import { useStyles } from '@marigold/system';
import { Exclamation, Required } from '@marigold/icons';
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
  variant = 'field',
  type = 'text',
  className = '',
  htmlFor,
  label,
  error,
  ...props
}) => {
  const labelClassName = useStyles(
    {
      variant: `form.${variant}`,
    },
    className
  );
  const errorClassName = useStyles({ color: 'color.red60' });

  return (
    <div>
      <Label {...props} className={labelClassName} htmlFor={htmlFor}>
        {label}
        {error ? <Required size={16} className={errorClassName} /> : ''}
      </Label>
      <Input type={type} id={htmlFor} />
      {error ? (
        <ValidationMessage>
          <Exclamation size={16} />
          {error}
        </ValidationMessage>
      ) : (
        ''
      )}
    </div>
  );
};
