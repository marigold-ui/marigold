import {
  Dispatch,
  ForwardRefExoticComponent,
  Ref,
  RefAttributes,
  SetStateAction,
  forwardRef,
} from 'react';
import type RAC from 'react-aria-components';
import { GridList as SelectList } from 'react-aria-components';
import { cn, useClassNames } from '@marigold/system';
import { SelectListContext } from './Context';
import { SelectListAction } from './SelectListAction';
import { SelectListItem } from './SelectListItem';

type RemoveProps =
  | 'style'
  | 'className'
  | 'onSelectionChange'
  | 'dragAndDropHooks';

export interface SelectListProps extends Omit<
  RAC.GridListProps<object>,
  RemoveProps
> {
  /**
   * Handler that is called when the selection change.
   */
  onChange?:
    | RAC.GridListProps<object>['onSelectionChange']
    | Dispatch<SetStateAction<any>>;
}

interface SelectListComponent extends ForwardRefExoticComponent<
  SelectListProps & RefAttributes<HTMLUListElement>
> {
  /**
   * Items of the SelectList.
   */
  Item: typeof SelectListItem;
  Action: typeof SelectListAction;
}

const _SelectList = forwardRef<HTMLUListElement, SelectListProps>(
  ({ onChange, ...rest }, ref) => {
    const classNames = useClassNames({ component: 'ListBox' });

    const props: RAC.GridListProps<object> = {
      onSelectionChange: onChange as any,
      ...rest,
    };

    return (
      <SelectListContext.Provider value={{ classNames }}>
        <div className={classNames.container}>
          <SelectList
            {...props}
            layout="grid"
            ref={ref as Ref<HTMLDivElement>}
            className={cn(
              'group/list overflow-y-auto sm:max-h-[75vh] lg:max-h-[45vh]',
              classNames.list
            )}
          >
            {props.children}
          </SelectList>
        </div>
      </SelectListContext.Provider>
    );
  }
) as SelectListComponent;

_SelectList.Item = SelectListItem;
_SelectList.Action = SelectListAction;

export { _SelectList as SelectList };
