import React from 'react';
import { Input } from '../Input';
import { Label } from '../Label';
import { ValidationMessage } from '../ValidationMessage';
import { useStyles, system } from '@marigold/system';
import { Exclamation, Required } from '@marigold/icons';
import b2bTheme from '@marigold/theme-b2b';

export type FieldProps = {
  variant?: string;
  htmlFor: string;
  label: string;
  error?: string;
};

export const Field = system<FieldProps, 'input'>(
  ({
    variant = 'field',
    type = 'text',
    htmlFor,
    label,
    error,
    className = '',
    ...props
  }) => {
    const classNames = useStyles(
      {
        variant: `form.${variant}`,
      },
      className
    );

    return (
      <div>
        <Label htmlFor={htmlFor} className={classNames}>
          {label}
          {error ? <Required size={16} fill={b2bTheme.colors.red60} /> : ''}
        </Label>
        <Input type={type} id={htmlFor} {...props} />
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
  }
);
