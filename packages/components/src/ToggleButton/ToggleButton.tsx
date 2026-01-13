import { type ReactNode, useContext } from 'react';
import { ToggleButton } from 'react-aria-components';
import type RAC from 'react-aria-components';
import { ToggleButtonContext } from './Context';

type RemovedProps =
  | 'className'
  | 'style'
  | 'children'
  | 'isSelected'
  | 'isDisabled';

export interface ToggleButtonProps
  extends Omit<RAC.ToggleButtonProps, RemovedProps> {
  /**
   * Children of the component
   */
  children?: ReactNode;
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
  ...props
}: ToggleButtonProps) => {
  const classNames = useContext(ToggleButtonContext).classNames;

  return (
    <ToggleButton isSelected={selected} className={classNames} {...props}>
      {children}
    </ToggleButton>
  );
};

export { _ToggleButton as ToggleButton };
