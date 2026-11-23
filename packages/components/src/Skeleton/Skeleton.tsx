import type { HeightProp, WidthProp } from '@marigold/system';
import {
  cn,
  createHeightVar,
  createWidthVar,
  isFraction,
  useClassNames,
} from '@marigold/system';

// Props
// ---------------
export interface SkeletonProps {
  /**
   * Width of the placeholder. Accepts spacing-scale values (`32`), fractions
   * (`"1/2"`) and `"full"`. Content-based keywords such as `"fit"` or `"auto"`
   * give an empty placeholder no width.
   * @default full
   */
  width?: WidthProp['width'];
  /**
   * Height of the placeholder, on the spacing scale. The default matches one
   * line of body text.
   * @default 4
   */
  height?: HeightProp['height'];
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
}

// Component
// ---------------
export const Skeleton = ({
  width = 'full',
  height = 4,
  variant,
  size,
}: SkeletonProps) => {
  const classNames = useClassNames({ component: 'Skeleton', variant, size });

  return (
    // Decorative only: the loading region announces, not each placeholder.
    <div
      aria-hidden="true"
      className={cn(
        'h-(--height) w-(--width)',
        // An empty box has no min-content, so a flex row would squeeze a fixed size.
        width !== 'full' && !isFraction(`${width}`) && 'shrink-0',
        classNames
      )}
      style={{
        ...createWidthVar('width', width),
        ...createHeightVar('height', height),
      }}
    />
  );
};
