import { ToggleButtonGroup } from 'react-aria-components';
import type RAC from 'react-aria-components';
import { useClassNames } from '@marigold/system';
import { ToggleButtonContext } from './Context';

type RemovedProps = 'className' | 'style' | 'isDisabled' | 'orientation';

export interface ToggleButtonGroupProps extends Omit<
  RAC.ToggleButtonGroupProps,
  RemovedProps
> {
  /**
   * Whether the toggle button group is disabled.
   */
  disabled?: RAC.ToggleButtonGroupProps['isDisabled'];
  variant?: string;
  size?: 'small' | 'default' | 'icon' | (string & {});
}

export const _ToggleButtonGroup = ({
  children,
  disabled,
  variant,
  size,
  ...props
}: ToggleButtonGroupProps) => {
  const classNames = useClassNames({
    component: 'ToggleButton',
    variant,
    size,
  });

  return (
    <ToggleButtonContext.Provider value={{ variant, size }}>
      <ToggleButtonGroup
        className={classNames.group}
        isDisabled={disabled}
        {...props}
      >
        {children}
      </ToggleButtonGroup>
    </ToggleButtonContext.Provider>
  );
};

export { _ToggleButtonGroup as ToggleButtonGroup };
