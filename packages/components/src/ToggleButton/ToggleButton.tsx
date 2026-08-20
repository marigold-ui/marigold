import { use } from 'react';
import type RAC from 'react-aria-components';
import { ToggleButton } from 'react-aria-components/ToggleButton';
import { cn, useClassNames } from '@marigold/system';
import { ToggleButtonContext } from './Context';
import { ToggleButtonGroup } from './ToggleButtonGroup';

type RemovedProps = 'className' | 'style' | 'isSelected' | 'isDisabled';

export interface ToggleButtonProps extends Omit<
  RAC.ToggleButtonProps,
  RemovedProps
> {
  /**
   * Whether the toggle button is selected.
   */
  selected?: RAC.ToggleButtonProps['isSelected'];
  /**
   * Set the toggle button disabled.
   */
  disabled?: RAC.ToggleButtonProps['isDisabled'];
  variant?: string;
  size?: 'small' | 'default' | 'icon' | (string & {});
}

export const _ToggleButton = ({
  children,
  selected,
  disabled,
  variant,
  size,
  ...props
}: ToggleButtonProps) => {
  const context = use(ToggleButtonContext);

  const classNames = useClassNames({
    component: 'ToggleButton',
    variant: variant ?? context.variant,
    size: size ?? context.size,
  });

  return (
    <ToggleButton
      isSelected={selected}
      isDisabled={disabled}
      // With the group no longer clipping, the standard ui-state-focus outline
      // (from ui-button-base) renders unclipped. Lift it above the neighbouring
      // segments so the full ring shows. (DST-1597)
      className={cn(classNames.button, 'in-[.group]:focus-visible:z-10')}
      {...props}
    >
      {children}
    </ToggleButton>
  );
};

_ToggleButton.Group = ToggleButtonGroup;

export { _ToggleButton as ToggleButton };
