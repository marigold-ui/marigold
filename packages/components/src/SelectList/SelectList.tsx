import type {
  Dispatch,
  ForwardRefExoticComponent,
  Ref,
  RefAttributes,
  SetStateAction,
} from 'react';
import { forwardRef } from 'react';
import type RAC from 'react-aria-components';
import { GridList as SelectList } from 'react-aria-components';
import { cn, useClassNames } from '@marigold/system';
import { SelectListContext } from './Context';
import { SelectListAction } from './SelectListAction';
import { SelectListDescription } from './SelectListDescription';
import { SelectListImage } from './SelectListImage';
import { SelectListItem } from './SelectListItem';
import { SelectListLabel } from './SelectListLabel';

type RemoveProps = 'style' | 'className' | 'onSelectionChange';

export interface SelectListProps
  extends Omit<RAC.GridListProps<object>, RemoveProps> {
  /**
   * Handler that is called when the selection change.
   */
  onChange?:
    | RAC.GridListProps<object>['onSelectionChange']
    | Dispatch<SetStateAction<unknown>>;
}

interface SelectListComponent
  extends ForwardRefExoticComponent<
    SelectListProps & RefAttributes<HTMLUListElement>
  > {
  /**
   * Items of the SelectList.
   */
  Item: typeof SelectListItem;
  Action: typeof SelectListAction;
  Image: typeof SelectListImage;
  Label: typeof SelectListLabel;
  Description: typeof SelectListDescription;
}

const _SelectList = forwardRef<HTMLUListElement, SelectListProps>(
  ({ onChange, ...rest }, ref) => {
    const classNames = useClassNames({ component: 'ListBox' });

    const props: RAC.GridListProps<object> = {
      onSelectionChange: onChange,
      ...rest,
    };

    return (
      <SelectListContext.Provider value={{ classNames }}>
        <div className={classNames.container}>
          <SelectList
            {...props}
            layout="grid"
            ref={ref as Ref<HTMLDivElement>}
            className={cn('group/list overflow-y-auto', classNames.list)}
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
_SelectList.Image = SelectListImage;
_SelectList.Label = SelectListLabel;
_SelectList.Description = SelectListDescription;

export { _SelectList as SelectList };
