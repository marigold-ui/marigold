import { ReactNode, Ref } from 'react';
import type RAC from 'react-aria-components';
import { Radio as RACRadio } from 'react-aria-components';
import { cn, useClassNames } from '@marigold/system';
import { useRadioGroupContext } from './Context';
import { RadioGroup } from './RadioGroup';

type RemovedProps = 'className' | 'style' | 'children' | 'isDisabled';

export interface RadioProps extends Omit<RAC.RadioProps, RemovedProps> {
  variant?: string;
  size?: string;
  /**
   * Sets the width of the field. You can see allowed tokens here: https://tailwindcss.com/docs/width
   * @default full
   */
  width?: string;
  children?: ReactNode;
  /**
   * Set the radio disabled.
   * @default false
   */
  disabled?: RAC.RadioProps['isDisabled'];
  ref?: Ref<HTMLLabelElement>;
}

interface IconProps {
  className?: string;
  checked?: boolean;
}

const Icon = ({ checked, className, ...props }: IconProps) => (
  <div
    className={cn(
      'flex h-4 w-4 items-center justify-center rounded-full border p-1',
      className
    )}
    aria-hidden="true"
    {...props}
  >
    {checked ? <div className="size-full rounded-full bg-current" /> : null}
  </div>
);

const _Radio = ({
  value,
  disabled,
  width,
  children,
  ref,
  ...props
}: RadioProps) => {
  const { variant, size, width: groupWidth } = useRadioGroupContext();

  const classNames = useClassNames({
    component: 'Radio',
    variant: variant || props.variant,
    size: size || props.size,
  });

  return (
    <RACRadio
      ref={ref}
      className={cn(
        'group/radio',
        'relative flex items-start',
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
    </RACRadio>
  );
};

const _MgRadio = Object.assign(_Radio, {
  Group: RadioGroup,
});

export { _MgRadio as Radio };
