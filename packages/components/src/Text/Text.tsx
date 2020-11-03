import { createStyles } from '@marigold/system';
import React from 'react';

type TextProps = React.PropsWithChildren<{
  variant?: 'body' | 'heading';
  textColor?: string;
}>;

const useStyles = createStyles('text');

export const Text: React.FC<TextProps> = ({
  variant = 'body',
  textColor = 'inherit',
  children,
  ...props
}: TextProps) => {
  const classNames = useStyles({ variant, color: textColor });
  return (
    <p className={classNames} {...props}>
      {children}
    </p>
  );
};
