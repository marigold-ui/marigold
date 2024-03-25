import {
  Dispatch,
  ForwardRefExoticComponent,
  Ref,
  RefAttributes,
  SetStateAction,
  forwardRef,
} from 'react';
import type RAC from 'react-aria-components';
import { GridList } from 'react-aria-components';

import { cn, useClassNames } from '@marigold/system';

import { GridListContext } from './Context';
import { GridListItem } from './GridListItem';

type RemoveProps = 'style' | 'className' | 'onSelectionChange';

export interface GridListProps
  extends Omit<RAC.GridListProps<object>, RemoveProps> {
  onChange?:
    | RAC.GridListProps<object>['onSelectionChange']
    | Dispatch<SetStateAction<any[]>>;
}

interface GridListComponent
  extends ForwardRefExoticComponent<
    GridListProps & RefAttributes<HTMLUListElement>
  > {
  Item: typeof GridListItem;
}

const _GridList = forwardRef<HTMLUListElement, GridListProps>(
  ({ onChange, ...rest }, ref) => {
    const classNames = useClassNames({ component: 'ListBox' });

    const props: RAC.GridListProps<object> = {
      onSelectionChange: onChange as any,
      ...rest,
    };

    return (
      <GridListContext.Provider value={{ classNames }}>
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
      </GridListContext.Provider>
    );
  }
) as GridListComponent;

_GridList.Item = GridListItem;

export { _GridList as GridList };
