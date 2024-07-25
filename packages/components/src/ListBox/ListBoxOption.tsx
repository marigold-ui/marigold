import { ListBoxItem, Text } from 'react-aria-components';
import type RAC from 'react-aria-components';

import { useListBoxContext } from './Context';

export interface ListBoxItemProps
  extends Omit<RAC.ListBoxItemProps, 'style' | 'className'> {
  description?: string;
}

export const _ListBoxItem = ({ description, ...props }: ListBoxItemProps) => {
  const { classNames } = useListBoxContext();
  console.log(description);
  return (
    <ListBoxItem {...props} className={classNames.option}>
      <Text slot="label">{props.children}</Text>
      {description && (
        <Text slot="description" className={classNames.itemDescription}>
          {description}
        </Text>
      )}
    </ListBoxItem>
  );
};

export { _ListBoxItem as ListBoxItem };
