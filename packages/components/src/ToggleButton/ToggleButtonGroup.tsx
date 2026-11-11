import { useEffect } from 'react';
import type RAC from 'react-aria-components';
import { ToggleButtonGroup as RACToggleButtonGroup } from 'react-aria-components/ToggleButtonGroup';
import { useClassNames } from '@marigold/system';
import { ToggleButtonContext } from './Context';

type RemovedProps = 'className' | 'style' | 'isDisabled' | 'orientation';

// Warn (once, in dev) when `ToggleButtonGroup` is used as a selection control.
// It is meant for independent on/off actions in toolbars; single-select
// segmented/filter use cases belong to `SegmentedControl` (DST-765 / DST-1430).
let hasWarnedSelectionMode = false;

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

const ToggleButtonGroup = ({
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

  // Warn from an effect: render must stay pure, and the module-level flag is a side effect.
  const hasSelectionMode = 'selectionMode' in props;
  useEffect(() => {
    if (
      process.env.NODE_ENV !== 'production' &&
      !hasWarnedSelectionMode &&
      hasSelectionMode
    ) {
      hasWarnedSelectionMode = true;
      console.warn(
        'Marigold: `ToggleButtonGroup` is for independent on/off actions. ' +
          'For a single-select segmented/filter control, use `SegmentedControl` instead.'
      );
    }
  }, [hasSelectionMode]);

  return (
    <ToggleButtonContext value={{ variant, size }}>
      <RACToggleButtonGroup
        className={classNames.group}
        isDisabled={disabled}
        {...props}
      >
        {children}
      </RACToggleButtonGroup>
    </ToggleButtonContext>
  );
};

export { ToggleButtonGroup };
