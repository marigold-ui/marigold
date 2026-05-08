import type { CSSProperties } from 'react';
import React from 'react';
import { Button } from 'react-aria-components';
import { useClassNames } from '@marigold/system';
import { ButtonProps } from '../Button/Button';
import { X } from '../icons/X';

interface CloseButtonProps extends Pick<
  ButtonProps,
  'onPress' | 'size' | 'variant' | 'slot' | 'aria-label'
> {
  className?: string;
  style?: CSSProperties;
  ref?: React.Ref<HTMLButtonElement>;
}

export const CloseButton = ({
  className,
  size,
  variant,
  ref,
  ...props
}: CloseButtonProps) => {
  const classNames = useClassNames({
    component: 'CloseButton',
    className,
    size,
    variant,
  });
  return (
    <Button ref={ref} className={classNames} {...props}>
      <X />
    </Button>
  );
};
