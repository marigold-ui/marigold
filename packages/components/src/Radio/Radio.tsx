import {
  ForwardRefExoticComponent,
  ReactNode,
  RefAttributes,
  forwardRef,
} from 'react';
import { Radio } from 'react-aria-components';
import type RAC from 'react-aria-components';

import { cn, useClassNames } from '@marigold/system';

import { useRadioGroupContext } from './Context';
import { RadioGroup } from './RadioGroup';

type RemovedProps = 'className' | 'children';

export interface RadioProps extends Omit<RAC.RadioProps, RemovedProps> {
  variant?: string;
  size?: string;
  width?: string;
  children?: ReactNode;
  disabled?: RAC.RadioProps['isDisabled'];
}

const Dot = () => (
  <svg viewBox="0 0 6 6">
    <circle fill="currentColor" cx="3" cy="3" r="3" />
  </svg>
);

interface IconProps {
  className?: string;
  checked?: boolean;
}

const Icon = ({ checked, className, ...props }: IconProps) => (
  <div
    className={cn(
      'bg-secondary-50 flex h-4 w-4 items-center justify-center rounded-[50%] border p-1',
      className
    )}
    aria-hidden="true"
    {...props}
  >
    {checked ? <Dot /> : null}
  </div>
);

const _Radio = forwardRef<HTMLInputElement, RadioProps>(
  ({ value, disabled, width, children, ...props }, ref) => {
    const { variant, size, width: groupWidth } = useRadioGroupContext();

    const classNames = useClassNames({
      component: 'Radio',
      variant: variant || props.variant,
      size: size || props.size,
    });

    return (
      <Radio
        ref={ref}
        className={cn(
          'group/radio',
          'relative flex items-center gap-[1ch]',
          width || groupWidth || 'w-full',
          classNames.container
        )}
        value={value}
        isDisabled={disabled}
        {...props}
      >
        {({ isSelected }) => (
          <>
            <Icon
              checked={isSelected}
              className={cn(
                disabled ? 'cursor-not-allowed' : 'cursor-pointer',
                classNames.radio
              )}
            />
            <div className={classNames.label}>{children}</div>
          </>
        )}
      </Radio>
    );
  }
) as RadioComponent;

export { _Radio as Radio };

_Radio.Group = RadioGroup;

/**
 * We need this so that TypeScripts allows us to add
 * additional properties to the component (function).
 */
export interface RadioComponent
  extends ForwardRefExoticComponent<
    RadioProps & RefAttributes<HTMLInputElement>
  > {
  Group: typeof RadioGroup;
}
