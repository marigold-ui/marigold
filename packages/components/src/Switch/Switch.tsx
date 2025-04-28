import { ReactNode, forwardRef } from 'react';
import type RAC from 'react-aria-components';
import { Switch } from 'react-aria-components';
import {
  WidthProp,
  cn,
  width as twWidth,
  useClassNames,
} from '@marigold/system';
import { Label } from '../Label';

type RemovedProps =
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
   * The children of the switch.
   * @deprecated Will be removed in the next major version. Use `label` prop instead.
   */
  children?: ReactNode;
  /**
   * Set the label of the switch.
   */
  label?: ReactNode;

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
      selected,
      disabled,
      readOnly,
      ...rest
    },
    ref
  ) => {
    const classNames = useClassNames({ component: 'Switch', size, variant });
    const props: RAC.SwitchProps = {
      isDisabled: disabled,
      isReadOnly: readOnly,
      isSelected: selected,
      ...rest,
    };
    return (
      <Switch
        {...props}
        ref={ref}
        className={cn(
          twWidth[width],
          'group/switch',
          'flex items-center gap-[1ch]',
          classNames.container
        )}
      >
        {(props.children || label) && (
          <Label elementType="span">
            {(props.children as ReactNode) || label}
          </Label>
        )}
        <div className="relative">
          <div className={classNames.track}>
            <div className={classNames.thumb} />
          </div>
        </div>
      </Switch>
    );
  }
);

export { _Switch as Switch };
