import type { ReactNode } from 'react';
import { forwardRef } from 'react';
import type RAC from 'react-aria-components';
import { Switch } from 'react-aria-components';
import { useId } from '@react-aria/utils';
import {
  WidthProp,
  cn,
  width as twWidth,
  useClassNames,
} from '@marigold/system';
import { HelpText } from '../HelpText/HelpText';
import { Label } from '../Label/Label';

type RemovedProps =
  | 'children'
  | 'className'
  | 'isDisabled'
  | 'isReadOnly'
  | 'isSelected'
  | 'children'
  | 'slot';

export interface SwitchProps extends Omit<RAC.SwitchProps, RemovedProps> {
  variant?: string;
  size?: string;

  /**
   * Set the label of the switch.
   */
  label?: ReactNode;

  /**
   * A helpful text.
   */
  description?: ReactNode;

  /**
   * Sets the width of the field. You can see allowed tokens here: https://tailwindcss.com/docs/width
   * @default full
   */
  width?: WidthProp['width'];

  /**
   * Disables the switch.
   * @default false
   */
  disabled?: RAC.SwitchProps['isDisabled'];

  /**
   * Set the switch to read-only.
   * @default false
   */
  readOnly?: RAC.SwitchProps['isReadOnly'];

  /**
   * With this prop you can set the switch selected.
   * @default false
   */
  selected?: RAC.SwitchProps['isSelected'];
}

const _Switch = forwardRef<HTMLLabelElement, SwitchProps>(
  (
    {
      variant,
      size,
      width = 'full',
      label,
      description,
      selected,
      disabled,
      readOnly,
      ...rest
    },
    ref
  ) => {
    const classNames = useClassNames({ component: 'Switch', size, variant });
    const descriptionId = useId();
    const props = {
      isDisabled: disabled,
      isReadOnly: readOnly,
      isSelected: selected,
      ...(description ? { 'aria-describedby': descriptionId } : {}),
      ...rest,
    } satisfies RAC.SwitchProps;
    return (
      <Switch
        {...props}
        ref={ref}
        className={cn(
          twWidth[width],
          'group/switch',
          'flex items-start gap-2',
          classNames.container
        )}
      >
        <div className="relative">
          <div className={classNames.track}>
            <div className={classNames.thumb} />
          </div>
        </div>
        {(label || description) && (
          <div>
            {label && <Label elementType="span">{label}</Label>}
            {description && (
              <div id={descriptionId} className="mt-0.5">
                <HelpText description={description} />
              </div>
            )}
          </div>
        )}
      </Switch>
    );
  }
);

export { _Switch as Switch };
