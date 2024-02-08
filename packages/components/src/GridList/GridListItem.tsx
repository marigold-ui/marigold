import type RAC from 'react-aria-components';
import { Button, GridListItem } from 'react-aria-components';

import { Checkbox } from '../Checkbox';

export interface GridListItemProps
  extends Omit<RAC.GridListItemProps<object>, 'className' | 'style'> {}

const _GridListItem = ({ children, ...props }: GridListItemProps) => {
  let textValue = typeof children === 'string' ? children : undefined;
  return (
    <GridListItem
      className={'m flex items-center justify-between gap-3'}
      textValue={textValue}
      {...props}
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
