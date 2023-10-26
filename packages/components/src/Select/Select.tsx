import type { ItemProps, SelectProps } from 'react-aria-components';
import {
  Button,
  Item,
  ListBox,
  Popover,
  Select,
  SelectValue,
  Text,
} from 'react-aria-components';

import { Label } from '../Label';

interface MySelectProps<T extends object>
  extends Omit<SelectProps<T>, 'children'> {
  label?: string;
  description?: string;
  errorMessage?: string;
  items?: Iterable<T>;
  children: React.ReactNode | ((item: T) => React.ReactNode);
}

function MySelect<T extends object>({
  label,
  description,
  errorMessage,
  children,
  items,
  ...props
}: MySelectProps<T>) {
  return (
    <Select {...props}>
      <Label>{label}</Label>
      <Button>
        <SelectValue />
        <span aria-hidden="true">▼</span>
      </Button>
      {description && <Text slot="description">{description}</Text>}
      {errorMessage && <Text slot="errorMessage">{errorMessage}</Text>}
      <Popover>
        <ListBox items={items}>{children}</ListBox>
      </Popover>
    </Select>
  );
}

function MyItem(props: ItemProps) {
  return (
    <Item
      {...props}
      className={({ isFocused, isSelected }) =>
        `my-item ${isFocused ? 'focused' : ''} ${isSelected ? 'selected' : ''}`
      }
    />
  );
}

<MySelect label="Ice cream flavor">
  <MyItem>Chocolate</MyItem>
  <MyItem>Mint</MyItem>
  <MyItem>Strawberry</MyItem>
  <MyItem>Vanilla</MyItem>
</MySelect>;
