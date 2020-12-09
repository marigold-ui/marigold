import React from 'react';
import { Input, Label, ValidationMessage } from '@marigold/components';
import { useStyles, system } from '@marigold/system';
import { Exclamation, Required } from '@marigold/icons';
import b2bTheme from '@marigold/theme-b2b';

type FieldProps = {
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
    const classNames = useStyles({
      variant: `form.${variant}`,
    }).concat(' ', className);

    return (
      <div>
        <Label htmlFor={htmlFor} className={classNames} {...props}>
          {label}
          {error ? <Required size={16} fill={b2bTheme.colors.red60} /> : ''}
        </Label>
        <Input type={type} htmlFor={htmlFor} />
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
