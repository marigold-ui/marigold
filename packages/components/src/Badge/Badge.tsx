import React from 'react';
import { useStyles } from '@marigold/system';

type BadgeProps = {
  className?: string;
  variant?: string;
};

export const Badge: React.FC<BadgeProps> = ({
  variant = 'badge',
  className,
  children,
  ...props
}) => {
  const classNames = useStyles(
    {
      variant: `content.${variant}`,
    },
    className
  );

  return (
    <div className={classNames} {...props}>
      {children}
    </div>
  );
};
