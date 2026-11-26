import type { Ref } from 'react';
import type { HeightProp, WidthProp } from '@marigold/system';
import {
  cn,
  createHeightVar,
  createWidthVar,
  isFraction,
  useClassNames,
} from '@marigold/system';

// Content-based sizes give an empty box no size, so a placeholder can't use them.
type ContentSize = 'auto' | 'fit' | 'min' | 'max';

// Props
// ---------------
export interface SkeletonProps {
  /**
   * Width of the placeholder. Accepts spacing-scale values (`32`), fractions
   * (`"1/2"`) and `"full"`.
   * @default full
   */
  width?: Exclude<WidthProp['width'], ContentSize>;
  /**
   * Height of the placeholder, on the spacing scale. Half steps are strings
   * (`"3.5"`). The default matches one line of body text.
   * @default 4
   */
  height?: Exclude<HeightProp['height'], ContentSize>;
  /**
   * Visual variant of the component. `rounded` fully rounds the ends, for
   * avatars (equal `width` and `height`) and pills. Which values exist is
   * defined by the theme and listed in the "Appearance" section of the
   * component's documentation.
   * @default default
   */
  variant?: 'default' | 'rounded' | (string & {});
  /**
   * Size of the component. Which values exist is defined by the theme
   * and listed in the "Appearance" section of the component's documentation.
   */
  size?: string & {};
  /** Ref to the DOM element the component renders. */
  ref?: Ref<HTMLDivElement>;
}

// Component
// ---------------
export const Skeleton = ({
  ref,
  width = 'full',
  height = 4,
  variant,
  size,
}: SkeletonProps) => {
  const classNames = useClassNames({ component: 'Skeleton', variant, size });

  return (
    // Decorative only: the loading region announces, not each placeholder.
    <div
      ref={ref}
      aria-hidden="true"
      className={cn(
        'h-(--height) w-(--width)',
        // An empty box has no min-content, so a flex row would squeeze a fixed size.
        width !== 'full' && !isFraction(`${width}`) && 'shrink-0',
        // A block ignores text-align, so follow an aligned table cell by margin.
        '[[data-cell-content].text-center_&]:mx-auto [[data-cell-content].text-right_&]:ml-auto',
        classNames
      )}
      style={{
        ...createWidthVar('width', width),
        ...createHeightVar('height', height),
      }}
    />
  );
};
