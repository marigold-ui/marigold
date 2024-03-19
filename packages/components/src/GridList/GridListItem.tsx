import type RAC from 'react-aria-components';
import { Button, GridListItem } from 'react-aria-components';

import { useClassNames } from '@marigold/system';

import { Checkbox } from '../Checkbox';

export interface GridListItemProps
  extends Omit<RAC.GridListItemProps<object>, 'className' | 'style'> {}

const _GridListItem = ({ children, ...props }: GridListItemProps) => {
  const classNames = useClassNames({
    component: 'ListBox',
  });
  let textValue = typeof children === 'string' ? children : undefined;
  return (
    <GridListItem
      textValue={textValue}
      {...props}
      className={classNames.option}
    >
      {({ selectionMode, selectionBehavior, allowsDragging }) => (
        <>
          {/* Add elements for drag and drop and selection. */}
          {allowsDragging && <Button slot="drag">≡</Button>}
          {selectionMode === 'multiple' && selectionBehavior === 'toggle' && (
            <Checkbox slot="selection" />
          )}
          {children}
        </>
      )}
    </GridListItem>
  );
};

export { _GridListItem as GridListItem };
