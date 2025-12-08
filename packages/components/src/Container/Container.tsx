import type { ReactNode } from 'react';
import type { PlaceItemsProp, SpaceProp } from '@marigold/system';
import { cn, createSpacingVar, createVar, placeItems } from '@marigold/system';
import type { AriaRegionProps } from '@marigold/types';

// Helpers
// ---------------
const containerTextLength = {
  short: '40ch',
  default: '60ch',
  long: '80ch',
};

const containerHeadlineLength = {
  short: '20ch',
  default: '25ch',
  long: '35ch',
};

export const gridColsAlign = {
  left: 'has-[[data-breakout]]:grid-cols-[minmax(0,max-content)_1fr_1fr]',
  center: 'has-[[data-breakout]]:grid-cols-[1fr_minmax(0,max-content)_1fr]',
  right: 'has-[[data-breakout]]:grid-cols-[1fr_1fr_minmax(0,max-content)]',
};

export const gridColumn = {
  left: '*:col-[1]',
  center: '*:col-[2]',
  right: '*:col-[3]',
};

// Props
// ---------------
export interface ContainerProps
  extends SpaceProp<'section' | 'fieldY' | 'container' | 'group'>,
    AriaRegionProps {
  children?: ReactNode;
  /**
   * Width of the container.
   * @default 'default'
   */
  contentLength?: keyof typeof containerTextLength;
  /**
   * Set alignment the content inside the container.
   * @default 'left'
   */
  align?: keyof typeof gridColsAlign;
  /**
   * Set alignment of the items inside the container.
   */
  alignItems?: PlaceItemsProp['align'];
}

// Component
// ---------------
export const Container = ({
  contentLength = 'default',
  align = 'left',
  alignItems = 'none',
  space = 0,
  children,
  ...props
}: ContainerProps) => (
  <div
    {...props}
    className={cn(
      'inline-grid gap-(--space)',
      placeItems[alignItems],
      gridColsAlign[align],
      gridColumn[align]
    )}
    style={{
      ...createVar({
        maxTextWidth: containerTextLength[contentLength],
        maxHeadlineWidth: containerHeadlineLength[contentLength],
      }),
      ...createSpacingVar('space', `${space}`),
    }}
  >
    {children}
  </div>
);
