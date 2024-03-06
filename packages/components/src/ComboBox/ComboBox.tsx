import { forwardRef } from 'react';
import type {
  ForwardRefExoticComponent,
  ReactNode,
  RefAttributes,
} from 'react';
import { ComboBox } from 'react-aria-components';
import type RAC from 'react-aria-components';

import { useClassNames } from '@marigold/system';

import { Button } from '../Button';
import { ChevronDown } from '../Chevron';
import { FieldBase, FieldBaseProps } from '../FieldBase';
import { Input } from '../Input';
import { ListBox } from '../ListBox/ListBox';
import { Popover } from '../Overlay/Popover';

// Props
// ---------------
type RemovedProps =
  | 'className'
  | 'style'
  | 'children'
  | 'isDisabled'
  | 'isRequired'
  | 'isInvalid'
  | 'isReadOnly'
  | 'defaultInputValue'
  | 'inputValue'
  | 'onInputChange';

export interface ComboBoxProps
  extends Omit<RAC.ComboBoxProps<any>, RemovedProps>,
    Pick<
      FieldBaseProps<'label'>,
      'width' | 'label' | 'description' | 'errorMessage'
    > {
  variant?: string;
  size?: string;
  disabled?: RAC.ComboBoxProps<any>['isDisabled'];
  required?: RAC.ComboBoxProps<any>['isRequired'];
  readOnly?: RAC.ComboBoxProps<any>['isReadOnly'];
  error?: RAC.ComboBoxProps<any>['isInvalid'];
  defaultValue?: RAC.ComboBoxProps<any>['defaultInputValue'];
  value?: RAC.ComboBoxProps<any>['inputValue'];
  onChange?: RAC.ComboBoxProps<any>['onInputChange'];
  children: ReactNode | ((item: any) => ReactNode);
  placeholder?: string;
}

interface ComboBoxComponent
  extends ForwardRefExoticComponent<
    ComboBoxProps & RefAttributes<HTMLInputElement>
  > {
  Item: typeof ListBox.Item;
}

// Component
// ---------------
const _ComboBox = forwardRef<HTMLInputElement, ComboBoxProps>(
  (
    {
      variant,
      size,
      required,
      disabled,
      readOnly,
      error,
      defaultValue,
      value,
      onChange,
      children,
      ...rest
    },
    ref
  ) => {
    const props: RAC.ComboBoxProps<any> = {
      isDisabled: disabled,
      isReadOnly: readOnly,
      isRequired: required,
      isInvalid: error,
      defaultInputValue: defaultValue,
      inputValue: value,
      onInputChange: onChange,
      ...rest,
    };

    const classNames = useClassNames({ component: 'ComboBox', variant, size });

    return (
      <FieldBase as={ComboBox} ref={ref} {...props}>
        <Input
          action={
            <Button className={classNames}>
              <ChevronDown className="size-4" />
            </Button>
          }
        />
        <Popover>
          <ListBox>{children}</ListBox>
        </Popover>
      </FieldBase>
    );
  }
) as ComboBoxComponent;

_ComboBox.Item = ListBox.Item;

export { _ComboBox as ComboBox };
