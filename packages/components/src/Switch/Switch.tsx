import type { ReactNode, Ref } from 'react';
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
  ref?: Ref<HTMLLabelElement>;
}

const _Switch = ({
  variant,
  size,
  width = 'full',
  label,
  description,
  selected,
  disabled,
  readOnly,
  ref,
  ...rest
}: SwitchProps) => {
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
      variant={variant}
      context={SwitchContext}
    >
      <Switch
        {...props}
        ref={ref}
        className={cn(twWidth[width], 'group/switch', classNames.container)}
      >
        {variant === 'settings' && label && (
          <Label elementType="span">{label}</Label>
        )}
        <div className="relative">
          <div className={classNames.track}>
            <div className={classNames.thumb} />
          </div>
        </div>
        {variant !== 'settings' && label && (
          <Label elementType="span">{label}</Label>
        )}
      </Switch>
    </BooleanField>
  );
};

export { _Switch as Switch };
