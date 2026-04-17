import type { Ref } from 'react';
import type RAC from 'react-aria-components';
import {
  ListLayout,
  ListBox as RACListBox,
  Virtualizer,
} from 'react-aria-components';
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

const ListBoxBase = ({
  variant,
  size,
  virtualized,
  layoutOptions,
  ref,
  ...props
}: ListBoxProps & { ref?: Ref<HTMLUListElement> }) => {
  const classNames = useClassNames({ component: 'ListBox', variant, size });

  // RAC types are incorrect, this will be passed to the `useListBox` hook
  const listBoxProps: any = { shouldSelectOnPressUp: false };

  const listBox = (
    <RACListBox
      {...props}
      className={cn('overflow-y-auto', classNames.list)}
      ref={ref as Ref<HTMLDivElement>}
      // Bound the virtualized list so the Virtualizer has a viewport to
      // clip against. Without this, the list grows to fit all items and
      // virtualization has no effect.
      style={
        virtualized
          ? { display: 'block', padding: 0, maxHeight: '24rem' }
          : undefined
      }
      {...listBoxProps}
    >
      {props.children}
    </RACListBox>
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
};

export const ListBox = Object.assign(ListBoxBase, {
  Item: ListBoxItem,
  Section: Section,
});
