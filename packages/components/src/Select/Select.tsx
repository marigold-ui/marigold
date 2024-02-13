import {
  Children,
  ForwardRefExoticComponent,
  RefAttributes,
  forwardRef,
  useContext,
} from 'react';
import {
  Button,
  Heading,
  OverlayTriggerStateContext,
  Dialog as RACDialog,
  DialogTrigger as RACDialogTrigger,
  Modal as RACModal,
  Select,
  SelectValue,
  ValidationResult,
} from 'react-aria-components';
import type RAC from 'react-aria-components';

import { WidthProp, cn, useClassNames, useSmallScreen } from '@marigold/system';

import { ChevronDown } from '../Chevron';
import { Dialog } from '../Dialog';
import { FieldBase } from '../FieldBase/FieldBase';
import { ListBox } from '../ListBox/ListBox';
import { Underlay } from '../Overlay';
import { Popover } from '../Overlay/Popover';

// import { Item } from '@react-stately/collections';

// Props
// ---------------
type RemoveProps =
  | 'children'
  | 'isInvalid'
  | 'isDisabled'
  | 'isOpen'
  | 'isRequired'
  | 'style'
  | 'className'
  | 'onSelectionChange';

export interface SelectProps<T extends object>
  extends Omit<RAC.SelectProps<T>, RemoveProps> {
  label?: string;
  description?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
  items?: Iterable<T>;
  children: React.ReactNode | ((item: T) => React.ReactNode);
  variant?: string;
  size?: string;
  width?: WidthProp['width'];
  required?: boolean;
  disabled?: boolean;
  open?: boolean;
  error?: boolean;
  onChange?: RAC.SelectProps<object>['onSelectionChange'];
}

export interface SelectComponent
  extends ForwardRefExoticComponent<
    SelectProps<object> & RefAttributes<HTMLDivElement>
  > {
  Option: any;
  Section: any;
}

// Component
// ---------------
const _Select = forwardRef<any, SelectProps<object>>(
  (
    {
      disabled,
      required,
      items,
      variant,
      size,
      error,
      open,
      onChange,
      ...rest
    },
    ref
  ) => {
    const props: RAC.SelectProps<object> = {
      isDisabled: disabled,
      isInvalid: error,
      isOpen: open,
      isRequired: required,
      onSelectionChange: onChange,
      ...rest,
    };
    const classNames = useClassNames({ component: 'Select', variant, size });
    const isSmallScreen = useSmallScreen();

    const mappedItems = Children.map(props.children, ({ props }: any) => props);

    const ListElement = () => {
      console.log('component is rendered ');
      return (
        <ListBox
          aria-labelledby="listbox"
          selectionMode="single"
          defaultSelectedKeys={['one']}
          disabledKeys={['four']}
          key={2322222222222}
        >
          <ListBox.Item id="one">one</ListBox.Item>
          <ListBox.Item id="two">Two</ListBox.Item>
          <ListBox.Item id="three">Three</ListBox.Item>
          <ListBox.Item id="four">Four</ListBox.Item>
        </ListBox>
      );
    };

    return (
      <FieldBase isOpen as={Select} ref={ref} {...props}>
        <RACDialogTrigger>
          <Button>Open dialog</Button>
          <RACModal isDismissable>
            <RACDialog>
              <Heading slot="title">Notice</Heading>
              <ListElement />
            </RACDialog>
          </RACModal>
        </RACDialogTrigger>
        {isSmallScreen ? (
          <>
            {/* <Dialog.Trigger open={open} dismissable>
                <Button
                  className={cn(
                    'flex w-full items-center justify-between gap-1 overflow-hidden',
                    classNames.select
                  )}
                >
                  <SelectValue />
                  <ChevronDown className="size-4" />
                </Button>
                <div>
                  <ListBox
                    items={mappedItems}
                  >
                    {(item) => (
                      <ListBox.Item id={item.id}>
                        {item.children}
                      </ListBox.Item>
                    )}
                  </ListBox>
                </div>
              </Dialog.Trigger> */}
          </>
        ) : (
          <>
            <Button
              className={cn(
                'flex w-full items-center justify-between gap-1 overflow-hidden',
                classNames.select
              )}
            >
              <SelectValue />
              <ChevronDown className="size-4" />
            </Button>
            {/* <Popover> */}
            <ListBox items={items}>{props.children}</ListBox>
            {/* </Popover> */}
          </>
        )}
      </FieldBase>
    );
  }
) as SelectComponent;

_Select.Option = ListBox.Item;
// _Select.Section = ListBox.Section;

export { _Select as Select };

const Tray = ({ open, ...props }: any) => {
  const state = useContext(OverlayTriggerStateContext);
  console.log('state', state);
  return (
    <Underlay dismissable open={open}>
      {props.children}
    </Underlay>
  );
};
