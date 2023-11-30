import {
  ForwardRefExoticComponent,
  Ref,
  RefAttributes,
  forwardRef,
} from 'react';
import { ListBox } from 'react-aria-components';
import type RAC from 'react-aria-components';

import { cn, useClassNames } from '@marigold/system';

import { ListBoxContext } from './Context';
import { Item } from './ListBoxOption';
import { Section } from './ListBoxSection';

export interface ListBoxProps
  extends Omit<RAC.ListBoxProps<object>, 'className' | 'style'> {
  variant?: string;
  size?: string;
}

interface ListBoxComponent
  extends ForwardRefExoticComponent<
    ListBoxProps & RefAttributes<HTMLUListElement>
  > {
  Item: typeof Item;
  Section: typeof Section;
}

const _ListBox = forwardRef<HTMLUListElement, ListBoxProps>(
  ({ variant, size, ...props }, ref) => {
    const classNames = useClassNames({ component: 'ListBox', variant, size });
    return (
      <ListBoxContext.Provider value={{ classNames }}>
        <div className={classNames.container}>
          <ListBox
            {...props}
            className={cn(
              'overflow-y-auto sm:max-h-[75vh] lg:max-h-[45vh]',
              classNames.list
            )}
            ref={ref as Ref<HTMLDivElement>}
          >
            {props.children}
          </ListBox>
        </div>
      </ListBoxContext.Provider>
    );
  }
) as ListBoxComponent;

_ListBox.Item = Item;
_ListBox.Section = Section;

export { _ListBox as ListBox };
