import { Children, ReactNode } from 'react';
import type { SpaceProp, SpacingTokens } from '@marigold/system';
import { cn, createSpacingVar, createVar } from '@marigold/system';
import type { AriaRegionProps } from '@marigold/types';

export interface ColumnsProps extends AriaRegionProps {
  /**
   * Set the spacing between child elements.
   */
  space?: SpaceProp<SpacingTokens>['space'];
  /**
   * Children of the component.
   */
  children?: ReactNode;
  /**
   * An array of numbers to set the size of the children. The columns array length and the count of children must be the same. Write "fit" for the column you want to have it fitting the contents width and height.
   */
  columns: Array<number | 'fit'>;
  /**
   * Collapse children into a vertical layout at given width. Note that `collapseAt` is based on the total element width, and not the window width. With a default value of "0" columns will not collapse by default.
   */
  collapseAt?: string;
  /**
   * Stretch to height of parent container.
   * @default false
   */
  stretch?: boolean;
}

export const Columns = ({
  space = 0,
  columns,
  collapseAt = '0em',
  stretch,
  children,
  ...props
}: ColumnsProps) => {
  // The `columns` array must line up with the children one to one.
  // eslint-disable-next-line @eslint-react/no-children-count -- validating the consumer's child count against `columns` needs the flattened count
  const childCount = Children.count(children);
  if (childCount !== columns.length) {
    throw new Error(
      `Columns: expected ${columns.length} children, got ${childCount}`
    );
  }

  return (
    <div
      className={cn(
        'flex flex-wrap items-stretch gap-(--space)',
        stretch && 'h-full'
      )}
      style={createSpacingVar('space', `${space}`)}
      {...props}
    >
      {/* eslint-disable-next-line @eslint-react/no-children-map -- each child needs its own sized wrapper, indexed to match `columns` */}
      {Children.map(children, (child, idx) => (
        <div
          className={cn(
            columns[idx] === 'fit' ? 'flex h-fit w-fit' : 'flex-(--columnSize)',
            'basis-[calc((var(--collapseAt)-100%)*999)]'
          )}
          style={createVar({
            collapseAt,
            columnSize: columns[idx],
          })}
        >
          {child}
        </div>
      ))}
    </div>
  );
};
