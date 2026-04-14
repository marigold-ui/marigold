import {
  ForwardRefExoticComponent,
  Ref,
  RefAttributes,
  forwardRef,
} from 'react';
import type RAC from 'react-aria-components';
import { ListBox, ListLayout, Virtualizer } from 'react-aria-components';
import type { ListLayoutOptions } from 'react-aria-components';
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
  virtualized?: boolean;
  layoutOptions?: ListLayoutOptions;
}

const defaultLayoutOptions: ListLayoutOptions = {
  estimatedRowHeight: 32,
  padding: 4,
  gap: 1,
};

interface ListBoxComponent extends ForwardRefExoticComponent<
  ListBoxProps & RefAttributes<HTMLUListElement>
> {
  Item: typeof ListBoxItem;
  Section: typeof Section;
}

const _ListBox = forwardRef<HTMLUListElement, ListBoxProps>(
  ({ variant, size, virtualized, layoutOptions, ...props }, ref) => {
    const classNames = useClassNames({ component: 'ListBox', variant, size });

    // RAC types are incorrect, this will be passed to the `useListBox` hook
    const listBoxProps: any = { shouldSelectOnPressUp: false };

    const listBox = (
      <ListBox
        {...props}
        className={cn('overflow-y-auto', classNames.list)}
        ref={ref as Ref<HTMLDivElement>}
        style={virtualized ? { display: 'block', padding: 0 } : undefined}
        {...listBoxProps}
      >
        {props.children}
      </ListBox>
    );

    return (
      <ListBoxContext value={{ classNames, virtualized }}>
        <div className={classNames.container}>
          {virtualized ? (
            <Virtualizer
              layout={ListLayout}
              layoutOptions={{ ...defaultLayoutOptions, ...layoutOptions }}
            >
              {listBox}
            </Virtualizer>
          ) : (
            listBox
          )}
        </div>
      </ListBoxContext>
    );
  }
) as ListBoxComponent;

_ListBox.Item = ListBoxItem;
_ListBox.Section = Section;

export { _ListBox as ListBox };
