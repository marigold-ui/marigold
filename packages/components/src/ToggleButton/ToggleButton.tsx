import { use } from 'react';
import { ToggleButton } from 'react-aria-components';
import type RAC from 'react-aria-components';
import { useClassNames } from '@marigold/system';
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

export const ToggleButtonComp = ({
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
      className={classNames.button}
      {...props}
    >
      {children}
    </ToggleButton>
  );
};

ToggleButtonComp.Group = ToggleButtonGroup;

export { ToggleButtonComp as ToggleButton };
