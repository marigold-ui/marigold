import { CSSProperties, Ref, forwardRef } from 'react';
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
}

export const CloseButton = forwardRef(
  (
    { className, size, variant, ...props }: CloseButtonProps,
    ref: Ref<HTMLButtonElement> | undefined
  ) => {
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
  }
);
