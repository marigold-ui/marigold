import {
  ForwardRefExoticComponent,
  Ref,
  RefAttributes,
  forwardRef,
} from 'react';
import type RAC from 'react-aria-components';
import { GridList } from 'react-aria-components';

import { cn, useClassNames } from '@marigold/system';

import { GridListItem } from './GridListItem';

export interface GridListProps
  extends Omit<RAC.GridListProps<object>, 'className' | 'style'> {}

interface GridListComponent
  extends ForwardRefExoticComponent<
    GridListProps & RefAttributes<HTMLUListElement>
  > {
  Item: typeof GridListItem;
  // Section: typeof Section;
}

const _GridList = forwardRef<HTMLUListElement, GridListProps>((props, ref) => {
  const classNames = useClassNames({ component: 'ListBox' });
  return (
    <div className={classNames.container}>
      <GridList
        {...props}
        ref={ref as Ref<HTMLDivElement>}
        className={cn(
          'overflow-y-auto sm:max-h-[75vh] lg:max-h-[45vh]',
          classNames.list
        )}
      >
        {props.children}
      </GridList>
    </div>
  );
}) as GridListComponent;

_GridList.Item = GridListItem;
// _ListBox.Section = Section;

export { _GridList as GridList };
