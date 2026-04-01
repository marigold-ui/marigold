import type { PropsWithChildren, ReactNode } from 'react';
import { forwardRef } from 'react';
import type RAC from 'react-aria-components';
import {
  Provider,
  Switch,
  SwitchContext,
  TextContext,
} from 'react-aria-components';
import { useId } from '@react-aria/utils';
import {
  WidthProp,
  cn,
  width as twWidth,
  useClassNames,
} from '@marigold/system';
import { HelpText } from '../HelpText/HelpText';
import { Label } from '../Label/Label';

// Field Wrapper
// ---------------
const Field = ({
  description,
  children,
}: PropsWithChildren<{ description: ReactNode }>) => {
  const className = useClassNames({
    component: 'Field',
  });
  const descriptionId = useId();

  if (!description) return children;

  return (
    <div className={className}>
      <Provider
        values={[
          [SwitchContext, { 'aria-describedby': descriptionId }],
          [TextContext, { id: descriptionId }],
        ]}
      >
        {children}
        <HelpText description={description} />
      </Provider>
    </div>
  );
};

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
      <Field description={description}>
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
      </Field>
    );
  }
);

export { _Switch as Switch };
