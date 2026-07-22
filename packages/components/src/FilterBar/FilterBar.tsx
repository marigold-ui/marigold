import type { ReactElement, ReactNode, Ref } from 'react';
import { Children, isValidElement } from 'react';
import { cn, useClassNames } from '@marigold/system';
import { useOverflowRegion } from '../utils/useOverflowRegion';
import { FilterBarContext } from './Context';
import { FilterBarPanel } from './FilterBarPanel';
import { FilterBarQuick, FilterBarQuickProps } from './FilterBarQuick';
import { FilterBarSearch } from './FilterBarSearch';

// Props
// ---------------
export interface FilterBarProps {
  variant?: string;
  size?: string;

  /**
   * The bar's slots: an optional `<FilterBar.Search>`, any number of
   * `<FilterBar.Quick>` (highest priority first), and an optional
   * `<FilterBar.Panel>`.
   */
  children: ReactNode;

  /**
   * Accessible name for the bar.
   */
  'aria-label'?: string;
}

// Helpers
// ---------------
const isSlot = <P,>(
  child: ReactNode,
  type: (props: P) => ReactNode
): child is ReactElement<P> => isValidElement(child) && child.type === type;

// Component
// ---------------

/**
 * A single-row filter bar that never wraps. Quick filters render inside a
 * measured, clipped region; when the bar runs out of horizontal space the
 * trailing quick filters are demoted (hidden and made inert) instead of
 * wrapping the row. Search and the panel trigger are pinned and stay
 * visible at any width. The panel holds the canonical filter set, so a
 * demoted quick filter stays fully reachable.
 */
const FilterBarBase = ({
  variant,
  size,
  children,
  ref,
  ...props
}: FilterBarProps & { ref?: Ref<HTMLDivElement> }) => {
  const classNames = useClassNames({ component: 'FilterBar', variant, size });

  const items = Children.toArray(children);
  const search = items.find(item => isSlot(item, FilterBarSearch));
  const panel = items.find(item => isSlot(item, FilterBarPanel));
  const quicks = items.filter(
    (item): item is ReactElement<FilterBarQuickProps> =>
      isSlot(item, FilterBarQuick)
  );

  const { regionProps, getItemProps, visibleCount } = useOverflowRegion(
    quicks.length
  );

  const demotedActiveCount = quicks.reduce(
    (count, quick, index) =>
      count + (index >= visibleCount && quick.props.active ? 1 : 0),
    0
  );

  return (
    <FilterBarContext value={{ demotedActiveCount }}>
      <div
        {...props}
        ref={ref}
        className={cn('flex flex-nowrap items-center', classNames.container)}
      >
        {search && <div className="shrink-0">{search}</div>}
        <div
          {...regionProps}
          className={cn(regionProps.className, classNames.region)}
        >
          {quicks.map((quick, index) => {
            const { className, ...itemProps } = getItemProps(index);
            return (
              // Children.toArray assigns stable keys to all children.
              <div
                key={quick.key}
                {...itemProps}
                className={cn(className, classNames.item)}
              >
                {quick}
              </div>
            );
          })}
        </div>
        {panel && <div className="shrink-0">{panel}</div>}
      </div>
    </FilterBarContext>
  );
};

export const FilterBar = Object.assign(FilterBarBase, {
  Search: FilterBarSearch,
  Quick: FilterBarQuick,
  Panel: FilterBarPanel,
});
