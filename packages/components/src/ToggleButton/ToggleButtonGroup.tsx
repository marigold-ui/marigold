import type RAC from 'react-aria-components';
import { ToggleButtonGroup } from 'react-aria-components/ToggleButtonGroup';
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

  if (
    process.env.NODE_ENV !== 'production' &&
    !hasWarnedSelectionMode &&
    'selectionMode' in props
  ) {
    hasWarnedSelectionMode = true;
    console.warn(
      'Marigold: `ToggleButtonGroup` is for independent on/off actions. ' +
        'For a single-select segmented/filter control, use `SegmentedControl` instead.'
    );
  }

  return (
    <ToggleButtonContext value={{ variant, size }}>
      <ToggleButtonGroup
        className={classNames.group}
        isDisabled={disabled}
        {...props}
      >
        {children}
      </ToggleButtonGroup>
    </ToggleButtonContext>
  );
};

export { _ToggleButtonGroup as ToggleButtonGroup };
