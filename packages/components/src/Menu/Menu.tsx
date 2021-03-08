import React from 'react';
import { useStyles, system } from '@marigold/system';
import { Button } from '../Button';

export type MenuProps = {
  variant?: string;
  label?: string;
  onClick: () => void;
  show?: boolean;
};

export const Menu = system<MenuProps, 'div'>(
  ({
    variant = 'menu',
    label = 'Menu',
    onClick,
    show = false,
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
    const itemStyles = useStyles({
      position: 'absolute',
      minWidth: '120px',
      display: 'block',
      textAlign: 'left',
      borderRadius: '2px',
    });

    return (
      <div className={classNames} {...props}>
        <Button onClick={onClick} variant="menu">
          {label}
        </Button>
        {show ? <div className={itemStyles}>{children}</div> : null}
      </div>
    );
  }
);
