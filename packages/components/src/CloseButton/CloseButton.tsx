import { CSSProperties, Ref, forwardRef } from 'react';
import { Button } from 'react-aria-components';
import { useClassNames } from '@marigold/system';
import { ButtonProps } from '../Button';

interface CloseButtonProps
  extends Pick<
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
        <svg viewBox="0 0 20 20" fill="currentColor" width={20} height={20}>
          <path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"></path>
        </svg>
      </Button>
    );
  }
);
