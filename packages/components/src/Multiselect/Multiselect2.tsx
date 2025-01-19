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
import { ListData } from '@react-stately/data';
import { cn, width as twWidth, useClassNames } from '@marigold/system';
import { AriaLabelingProps } from '@marigold/types';
import { FieldBaseProps } from '../FieldBase';
import { Label } from '../Label';
import { ListBox } from '../ListBox';

interface InputProps extends InputComponentProps, AriaLabelingProps {
  className: string;
  id?: string;
  placeholder?: string;
}

const Input = ({ innerRef, className, ...props }: InputProps) => {
  return <_Input {...props} ref={innerRef} className={className} />;
};

interface MultipleSelectProps<T extends object>
  extends Omit<FieldBaseProps<any>, 'children'>,
    Omit<
      ComboBoxProps<T>,
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
  items?: Array<T>;
  selectedItems: ListData<T>;
  defaultSelectedItems?: Array<T>;
  onItemInserted?: (key: Key) => void;
  onItemCleared?: (key: Key) => void;
  renderEmptyState?: (inputValue: string) => ReactNode;
  children: ReactNode | ((item: T) => ReactNode);
  errorMessage?: string | ((validation: ValidationResult) => string);
}

interface CloseButton
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  className: string;
}

export const CloseButton = (props: CloseButton) => {
  return (
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

const Multiselect2 = ({
  disabled,
  required,
  error,
  size,
  variant,
  placeholder,
  ...props
}: any) => {
  const classNames = useClassNames({
    component: 'MultiSelect',
    size,
    variant,
  });

  let { labelProps, fieldProps } = useField({
    label: props.label,
    errorMessage: props.errorMessage,
  });

  return (
    <div className={classNames.field}>
      {props.label && <Label {...labelProps}>{props.label}</Label>}
      <Select
        classNames={{
          control: () => classNames.container,
          placeholder: () => 'hidden',
          indicatorsContainer: () => 'h-5',
          indicatorSeparator: () => 'hidden',
          multiValue: () => classNames.tag,
          // multiValueRemove: () => cn('hover:hidden'),
        }}
        isClearable={false}
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
                placeholder={!props.getValue().length ? placeholder : undefined}
              />
            );
          },
          MultiValueRemove: ({ innerProps }) => {
            return (
              <CloseButton
                {...innerProps}
                className={cn('flex items-center', classNames.closeButton)}
              />
            );
          },
        }}
      />
      <p>help text</p>
    </div>
  );
};

Multiselect2.Option = ListBox.Item;

export { Multiselect2 };

const fruits = [
  { id: 10, name: 'Lemon' },
  { id: 11, name: 'Mango' },
  { id: 12, name: 'Nectarine' },
  { id: 13, name: 'Orange' },
  { id: 14, name: 'Papaya' },
  { id: 15, name: 'Quince' },
  { id: 16, name: 'Raspberry' },
  { id: 17, name: 'Strawberry' },
  { id: 18, name: 'Tangerine' },
  { id: 19, name: 'Ugli Fruit' },
  { id: 20, name: 'Watermelon' },
];

export const BasicComponent = () => {
  return (
    <>
      <Multiselect2 label="label" placeholder="Enter value" />
    </>
  );
};
