import {
  ForwardRefExoticComponent,
  Ref,
  RefAttributes,
  forwardRef,
} from 'react';
import type RAC from 'react-aria-components';
import { ListBox } from 'react-aria-components';
import { cn, useClassNames } from '@marigold/system';
import { ListBoxContext } from './Context';
import { ListBoxItem } from './ListBoxItem';
import { Section } from './ListBoxSection';

export interface ListBoxProps extends Omit<
  RAC.ListBoxProps<object>,
  'className' | 'style'
> {
  variant?: string;
  size?: string;
}

interface ListBoxComponent extends ForwardRefExoticComponent<
  ListBoxProps & RefAttributes<HTMLUListElement>
> {
  Item: typeof ListBoxItem;
  Section: typeof Section;
}

const _ListBox = forwardRef<HTMLUListElement, ListBoxProps>(
  ({ variant, size, ...props }, ref) => {
    const classNames = useClassNames({ component: 'ListBox', variant, size });

    // RAC types are incorrect, this will be passed to the `useListBox` hook
    const listBoxProps: any = { shouldSelectOnPressUp: false };

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
            {...listBoxProps}
          >
            {props.children}
          </ListBox>
        </div>
      </ListBoxContext.Provider>
    );
  }
) as ListBoxComponent;

_ListBox.Item = ListBoxItem;
_ListBox.Section = Section;

export { _ListBox as ListBox };
