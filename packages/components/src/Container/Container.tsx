import type { ReactNode } from 'react';
import type {
  PlaceItemsProp,
  SpaceProp,
  SpacingTokens,
} from '@marigold/system';
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

// Props
// ---------------
export interface ContainerProps extends AriaRegionProps {
  /**
   * Set the spacing between child elements.
   */
  space?: SpaceProp<SpacingTokens>['space'];
  children?: ReactNode;
  /**
   * Width of the container.
   * @default 'default'
   */
  contentLength?: keyof typeof containerTextLength;
  /**
   * Set alignment of the items inside the container.
   */
  alignItems?: PlaceItemsProp['align'];
}

// Component
// ---------------
export const Container = ({
  contentLength = 'default',
  alignItems = 'none',
  space = 0,
  children,
  ...props
}: ContainerProps) => (
  <div
    {...props}
    className={cn('grid gap-(--space)', placeItems[alignItems])}
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
