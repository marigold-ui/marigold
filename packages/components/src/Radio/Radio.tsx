import { ReactNode, Ref } from 'react';
import type RAC from 'react-aria-components';
import { RadioButton, RadioField } from 'react-aria-components/RadioGroup';
import { cn, createWidthVar, useClassNames } from '@marigold/system';
import { LabelAdornment } from '../utils/LabelAdornment';
import { useRadioGroupContext } from './Context';
import { RadioGroup } from './RadioGroup';

type RemovedProps = 'className' | 'style' | 'children' | 'isDisabled';

export interface RadioProps extends Omit<RAC.RadioFieldProps, RemovedProps> {
  variant?: string;
  size?: string;
  /**
   * Sets the width of the field. You can see allowed tokens here: https://tailwindcss.com/docs/width
   *
   * Numeric/scale values are spacing-scale tokens, not pixels: `width={64}`
   * resolves to `calc(var(--spacing) * 64)` ~= 16rem (256px), not 64px.
   * @default full
   */
  width?: string;
  children?: ReactNode;
  /**
   * A decoration shown at the end of the label's first line, e.g. a
   * `<Badge size="inline">`. Use this instead of putting the decoration in
   * `children` yourself — the slot keeps it from making the line taller than
   * the radio next to it.
   */
  labelAdornment?: ReactNode;
  /**
   * Set the radio disabled.
   * @default false
   */
  disabled?: RAC.RadioFieldProps['isDisabled'];
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
  labelAdornment,
  variant: variantProp,
  size: sizeProp,
  ref,
  ...props
}: RadioProps) => {
  const { variant, size } = useRadioGroupContext();

  const classNames = useClassNames({
    component: 'Radio',
    variant: variant || variantProp,
    size: size || sizeProp,
  });

  // `groupWidth` is already applied to the group's FieldBase container, so an
  // individual Radio only needs to compute its own CSS variable when it has
  // its own `width` (i.e. used standalone, outside a Radio.Group). Reusing
  // `groupWidth` here would resize against an already-resized container.
  return (
    <RadioField
      className={cn(width ? 'w-(--field-width) max-w-full min-w-0' : 'w-full')}
      style={width ? createWidthVar('field-width', `${width}`) : undefined}
      value={value}
      isDisabled={disabled}
      {...props}
    >
      <RadioButton
        ref={ref}
        className={cn(
          'group/radio',
          'relative flex w-full items-start',
          classNames.container
        )}
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
            <div className={classNames.label}>
              {children}
              {labelAdornment && (
                <LabelAdornment>{labelAdornment}</LabelAdornment>
              )}
            </div>
          </>
        )}
      </RadioButton>
    </RadioField>
  );
};

const _MgRadio = Object.assign(_Radio, {
  Group: RadioGroup,
});

export { _MgRadio as Radio };
