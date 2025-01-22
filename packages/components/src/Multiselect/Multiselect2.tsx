'use client';

import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';
import {
  type ComboBoxProps,
  type Key,
  type ValidationResult,
} from 'react-aria-components';
import { Button, Input as _Input } from 'react-aria-components';
import Select from 'react-select';
import { InputProps as InputComponentProps } from 'react-select';
import { useField } from '@react-aria/label';
import { cn, useClassNames } from '@marigold/system';
import { AriaLabelingProps } from '@marigold/types';
import { FieldBaseProps } from '../FieldBase';
import { ChevronDown } from '../icons';
import { Label } from './Label';

interface InputProps extends InputComponentProps, AriaLabelingProps {
  className: string;
  id?: string;
  placeholder?: string;
}

const Input = ({ innerRef, className, ...props }: InputProps) => {
  // innerRef is needed for focusing the input
  console.log('propsprops', props);
  return <_Input {...props} ref={innerRef} className={className} />;
};

interface MultipleSelectProps
  extends Omit<FieldBaseProps<any>, 'children'>,
    Omit<
      ComboBoxProps<any>,
      | 'children'
      | 'validate'
      | 'allowsEmptyCollection'
      | 'inputValue'
      | 'selectedKey'
      | 'className'
      | 'value'
      | 'onSelectionChange'
      | 'onInputChange'
    > {
  disabled?: boolean;
  required?: boolean;
  readOnly?: boolean;
  error?: boolean;
  variant?: string;
  size?: string;
  items?: Array<object>;
  errorMessage?: string | ((validation: ValidationResult) => string);
  placeholder?: string;
  onItemInserted?: (key: Key) => void;
  onItemCleared?: (key: Key) => void;
  renderEmptyState?: (inputValue: string) => ReactNode;
}

interface CloseButton
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  isDisabled?: boolean;
  className: string;
}

export const CloseButton = (props: CloseButton) => {
  return (
    // @ts-ignore
    <Button slot="remove" {...props}>
      <svg viewBox="0 0 20 20" fill="currentColor" width={20} height={20}>
        <path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"></path>
      </svg>
    </Button>
  );
};

const intiOptions = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];

export const Multiselect2 = ({
  disabled,
  required,
  readOnly = false,
  error,
  size,
  variant,
  placeholder,
  ...props
}: MultipleSelectProps) => {
  const classNames = useClassNames({
    component: 'MultiSelect',
    size,
    variant,
  });

  let { labelProps, fieldProps } = useField({
    label: props.label,
    errorMessage: props.errorMessage,
  });

  console.log(classNames.labelContainer);

  return (
    <div
      className={cn(classNames.field, 'group/field')}
      data-required={required}
      data-error={error}
      data-readonly={readOnly}
    >
      {/* <p className='w-[200px]'>{props.label}</p> */}
      {props.label && (
        <Label classNames={classNames} {...labelProps}>
          {props.label}
        </Label>
      )}
      <Select
        aria-invalid={error}
        classNames={{
          control: () => classNames.container,
          placeholder: () => 'hidden',
          indicatorsContainer: () => 'h-5',
          indicatorSeparator: () => 'hidden',
          multiValue: () => classNames.tag,
          menu: () => cn('shadow-none', classNames.listContainer),
          menuList: () =>
            cn(
              'overflow-y-auto sm:max-h-[75vh] lg:max-h-[45vh] p-0',
              classNames.list
            ),
          option: ({ isFocused }) =>
            cn(classNames.option, { isFocused: isFocused }),
        }}
        isClearable={false}
        isSearchable={!readOnly}
        menuIsOpen={readOnly ? false : undefined}
        closeMenuOnSelect={false}
        isMulti
        options={intiOptions}
        defaultValue={[intiOptions[0]]}
        components={{
          Input: props => {
            return (
              // @ts-ignore
              <Input
                {...props}
                {...fieldProps}
                className={classNames.input}
                // Delete the placeholder when there's selected value
                placeholder={!props.getValue().length ? placeholder : undefined}
              />
            );
          },
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
            // @ts-ignore
            <button {...innerProps} className={classNames.icon}>
              <ChevronDown className={'size-4'} />
            </button>
          ),
        }}
      />
      <p>help text</p>
    </div>
  );
};
