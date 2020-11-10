import { createStyles, system } from '@marigold/system';
import React from 'react';

type TextProps = {
  as?: 'p' | 'span';
  variant?: 'body' | 'heading';
  textColor?: string;
};

const useStyles = createStyles('text');

export const Text = system<TextProps, 'span'>(
  ({
    as = 'span',
    variant = 'body',
    textColor = 'inherit',
    children,
    ...props
  }) => {
    const classNames = useStyles({ variant, color: textColor });
    const Cmp = as;

    return (
      <Cmp className={classNames} {...props}>
        {children}
      </Cmp>
    );
  }
);
