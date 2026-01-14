import { useContext } from 'react';
import { ToggleButton } from 'react-aria-components';
import type RAC from 'react-aria-components';
import { useClassNames } from '@marigold/system';
import { ToggleButtonContext } from './Context';

type RemovedProps = 'className' | 'style' | 'isSelected' | 'isDisabled';

export interface ToggleButtonProps
  extends Omit<RAC.ToggleButtonProps, RemovedProps> {
  /**
   * Whether the toggle button is selected.
   */
  selected?: RAC.ToggleButtonProps['isSelected'];
  /**
   * Set the toggle button disabled.
   */
  disabled?: RAC.ToggleButtonProps['isDisabled'];
  variant?: string;
  size?: string;
}

export const _ToggleButton = ({
  children,
  selected,
  disabled,
  variant,
  size,
  ...props
}: ToggleButtonProps) => {
  const context = useContext(ToggleButtonContext);

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

export { _ToggleButton as ToggleButton };
