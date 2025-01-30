'use client';

import { ButtonHTMLAttributes, DetailedHTMLProps, HTMLAttributes } from 'react';
import {
  FieldErrorContext,
  Provider,
  type ValidationResult,
} from 'react-aria-components';
import { Button, Input as _Input } from 'react-aria-components';
import Select from 'react-select';
import { InputProps, Props as SelectProps } from 'react-select';
import { useField } from '@react-aria/label';
import { cn, useClassNames } from '@marigold/system';
import { ButtonProps } from '../Button';
import { FieldBaseProps } from '../FieldBase';
import { HelpText } from '../HelpText';
import { Label } from '../Label';
import { ChevronDown } from '../icons';

type PickedProps =
  | 'autoFocus'
  | 'noOptionsMessage'
  | 'onBlur'
  | 'onFocus'
  | 'aria-errormessage'
  | 'aria-invalid'
  | 'aria-errormessage'
  | 'aria-label'
  | 'aria-labelledby'
  | 'aria-live'
  | 'ariaLiveMessages';

interface MultipleSelectProps
  extends Pick<
      FieldBaseProps<'label'>,
      'width' | 'label' | 'description' | 'errorMessage'
    >,
    Pick<SelectProps, PickedProps> {
  disabled?: boolean;
  required?: boolean;
  readOnly?: boolean;
  error?: boolean;
  variant?: string;
  size?: string;
  items?: SelectProps['options'];
  errorMessage?: string | ((validation: ValidationResult) => string);
  placeholder?: string;
  defaultSelectedItems?: SelectProps['defaultValue'];
  defaultValue?: SelectProps['defaultInputValue'];
  onChange?: SelectProps['onInputChange'];
}

interface CloseButtonProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  isDisabled?: boolean;
  className: string;
}

export const CloseButton = (props: CloseButtonProps) => {
  return (
    <Button slot="remove" {...(props as ButtonProps)}>
      <svg viewBox="0 0 20 20" fill="currentColor" width={20} height={20}>
        <path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"></path>
      </svg>
    </Button>
  );
};

const propsToBeRemoved = [
  'clearValue',
  'getStyles',
  'getClassNames',
  'getValue',
  'hasValue',
  'isMulti',
  'isRtl',
  'selectOption',
  'selectProps',
  'setValue',
  'isDisabled',
  'isHidden',
  'cx',
];
const Input = ({ innerRef, className, ...props }: InputProps) => {
  // innerRef is needed for focusing the input
  return <_Input {...props} ref={innerRef} className={className} />;
};

export const Multiselect2 = ({
  disabled,
  readOnly = false,
  items,
  defaultSelectedItems,
  defaultValue,
  error,
  errorMessage,
  size,
  variant,
  placeholder,
  description,
  onChange,
  ...rest
}: MultipleSelectProps) => {
  const classNames = useClassNames({
    component: 'MultiSelect',
    size,
    variant,
  });

  const props = {
    options: items,
    defaultInputValue: defaultValue,
    defaultValue: defaultSelectedItems,
    ...rest,
  };

  let { labelProps, fieldProps } = useField({
    label: props.label,
    errorMessage,
    isInvalid: true,
  });

  return (
    // TODO: use provider
    <Provider
      values={[
        [
          FieldErrorContext,
          {
            isInvalid: !!error,
            validationDetails: {} as any,
            validationErrors: [],
          },
        ],
      ]}
    >
      <div
        className={cn(classNames.field, 'group/field')}
        data-required={props.required}
        data-invalid={error}
        data-readonly={readOnly}
      >
        {props.label && <Label {...labelProps}>{props.label}</Label>}
        <Select
          {...props}
          styles={{
            control: base => ({
              ...base,
              '&:hover': {
                borderColor: 'none',
              },
            }),
          }}
          aria-invalid={error}
          isClearable={false}
          isSearchable={!readOnly}
          isDisabled={disabled}
          isMulti
          closeMenuOnSelect={false}
          classNames={{
            control: () => classNames.container,
            container: () => 'pointer-events-auto',
            placeholder: () => 'hidden',
            indicatorsContainer: () => 'h-5',
            indicatorSeparator: () => 'hidden',
            menu: () => cn('shadow-none', classNames.listContainer),
            menuList: () =>
              cn(
                'overflow-y-auto sm:max-h-[75vh] lg:max-h-[45vh] p-0',
                classNames.list
              ),
            option: ({ isFocused }) =>
              cn(classNames.option, { isFocused: isFocused }),
            multiValue: () => classNames.tag,
          }}
          components={{
            // React-select
            Input: props => {
              const inputProps = Object.entries(props).reduce(
                (acc: Record<string, any>, [key, value]) => {
                  if (!propsToBeRemoved.includes(key)) {
                    acc[key] = value;
                  }
                  return acc;
                },
                {} as Record<string, any>
              );
              return (
                <Input
                  {...(inputProps as any)}
                  {...fieldProps}
                  className={classNames.input}
                  disabled={disabled}
                  hidden={props.hidden}
                  placeholder={
                    !props.getValue().length ? placeholder : undefined
                  }
                />
              );
            },
            // react-select
            MultiValueRemove: ({ innerProps }) => {
              return (
                <CloseButton
                  {...innerProps}
                  // react-select doesn't handle readonly so we had to do it manually here
                  // keep to the button disabled in read only to prevent menu from opening
                  isDisabled={disabled || readOnly}
                  className={cn('flex items-center', classNames.closeButton)}
                />
              );
            },
            DropdownIndicator: ({ innerProps }) => (
              <button
                {...(innerProps as ButtonHTMLAttributes<HTMLButtonElement>)}
                className={classNames.icon}
              >
                <ChevronDown className={'size-4'} />
              </button>
            ),
          }}
        />
        <HelpText description={description} errorMessage={errorMessage} />
      </div>
    </Provider>
  );
};
