import { ReactNode, createContext, useContext } from 'react';

import { useCheckboxGroup } from '@react-aria/checkbox';

import {
  CheckboxGroupState,
  useCheckboxGroupState,
} from '@react-stately/checkbox';

import { AriaCheckboxGroupProps } from '@react-types/checkbox';

import { WidthProp, useClassNames, useStateProps } from '@marigold/system';
import { HtmlProps } from '@marigold/types';

import { FieldBase } from '../FieldBase';

// Context
// ---------------
export interface CheckboxGroupContextProps extends CheckboxGroupState {
  error?: boolean;
}

/**
 * Needs to be falsy so we can check if a checkbox is used as standalone
 * or in a group.
 */
export const CheckboxGroupContext = createContext<CheckboxGroupContextProps>(
  null as any
);
export const useCheckboxGroupContext = () => useContext(CheckboxGroupContext);

// Props
// ---------------
export interface CheckboxGroupProps
  extends Omit<HtmlProps<'div'>, 'onChange' | 'className'>,
    AriaCheckboxGroupProps {
  children: ReactNode;
  variant?: string;
  size?: string;
  width?: WidthProp['width'];
  label?: ReactNode;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  error?: boolean;
  value?: string[];
  defaultValue?: string[];
  onChange?: (value: string[]) => void;
}

// Components
// ---------------
export const CheckboxGroup = ({
  variant,
  size,
  children,
  required,
  disabled,
  readOnly,
  error,
  width,
  ...rest
}: CheckboxGroupProps) => {
  const props = {
    isRequired: required,
    isDisabled: disabled,
    isReadOnly: readOnly,
    validationState: error ? 'invalid' : 'valid',
    ...rest,
  } as const;

  const state = useCheckboxGroupState(props);
  const { groupProps, labelProps, descriptionProps, errorMessageProps } =
    useCheckboxGroup(props, state);

  const classNames = useClassNames({
    component: 'Checkbox',
    variant,
    size,
    className: { group: 'flex flex-col items-start gap-[0.5ch]' },
  });
  const stateProps = useStateProps({
    disabled,
    readOnly,
    error,
  });

  return (
    <FieldBase
      label={props.label}
      labelProps={{ elementType: 'span', ...labelProps }}
      description={props.description}
      descriptionProps={descriptionProps}
      error={error}
      errorMessage={props.errorMessage}
      errorMessageProps={errorMessageProps}
      disabled={disabled}
      stateProps={stateProps}
      width={width}
      {...groupProps}
    >
      <div role="presentation" className={classNames.group}>
        <CheckboxGroupContext.Provider value={{ error, ...state }}>
          {children}
        </CheckboxGroupContext.Provider>
      </div>
    </FieldBase>
  );
};
