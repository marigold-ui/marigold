import type { ReactNode } from 'react';
import { forwardRef } from 'react';
import type RAC from 'react-aria-components';
import { Switch, SwitchContext } from 'react-aria-components';
import {
  WidthProp,
  cn,
  width as twWidth,
  useClassNames,
} from '@marigold/system';
import { BooleanField } from '../FieldBase/BooleanField';
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
    const props = {
      isDisabled: disabled,
      isReadOnly: readOnly,
      isSelected: selected,
      ...rest,
    } satisfies RAC.SwitchProps;
    return (
      <BooleanField
        description={description}
        context={SwitchContext}
        descriptionClassName={size === 'large' ? 'pl-12' : 'pl-9'}
      >
        <Switch
          {...props}
          ref={ref}
          className={cn(
            twWidth[width],
            'group/switch',
            'flex items-center gap-2',
            classNames.container
          )}
        >
          <div className="relative">
            <div className={classNames.track}>
              <div className={classNames.thumb} />
            </div>
          </div>
          {label && <Label elementType="span">{label}</Label>}
        </Switch>
      </BooleanField>
    );
  }
);

export { _Switch as Switch };
