import {
  ObjectFitProp,
  ObjectPositionProp,
  cn,
  objectFit,
  objectPosition,
  useClassNames,
} from '@marigold/system';
import { HtmlProps } from '@marigold/types';

// Props
// ---------------
export interface ImageProps
  extends Omit<HtmlProps<'img'>, 'className'>,
    ObjectFitProp,
    ObjectPositionProp {
  variant?: string;
  size?: string;
  /**
   * The children of the component.
   */
  children?: never;
  /**
   * specifies an alternate text for an image, if the image cannot be displayed.
   */
  alt: string;
}

// Component
// ---------------
export const Image = ({
  variant,
  size,
  fit = 'none',
  position = 'none',
  ...props
}: ImageProps) => {
  const classNames = useClassNames({ component: 'Image', variant, size });

  return (
    <img
      {...props}
      alt={props.alt}
      className={cn(
        fit !== 'none' && 'h-full w-full',
        classNames,
        objectFit[fit],
        objectPosition[position]
      )}
    />
  );
};
