import type { Dispatch, Ref, SetStateAction } from 'react';
import type RAC from 'react-aria-components';
import { GridList as RACSelectList } from 'react-aria-components';
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

const SelectListBase = ({
  onChange,
  ref,
  ...rest
}: SelectListProps & { ref?: Ref<HTMLUListElement> }) => {
  const classNames = useClassNames({ component: 'ListBox' });

  const props: RAC.GridListProps<object> = {
    onSelectionChange: onChange as any,
    ...rest,
  };

  return (
    <SelectListContext.Provider value={{ classNames }}>
      <div className={classNames.container}>
        <RACSelectList
          {...props}
          layout="grid"
          ref={ref as Ref<HTMLDivElement>}
          className={cn(
            'group/list overflow-y-auto sm:max-h-[75vh] lg:max-h-[45vh]',
            classNames.list
          )}
        >
          {props.children}
        </RACSelectList>
      </div>
    </SelectListContext.Provider>
  );
};

interface SelectListComponent {
  (props: SelectListProps & { ref?: Ref<HTMLUListElement> }): React.JSX.Element;
  Item: typeof SelectListItem;
  Action: typeof SelectListAction;
}

const SelectList = SelectListBase as SelectListComponent;
SelectList.Item = SelectListItem;
SelectList.Action = SelectListAction;

export { SelectList };
