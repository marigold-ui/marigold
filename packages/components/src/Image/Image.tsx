import React from 'react';
import { HtmlProps } from '@marigold/types';
import {
  cn,
  Box,
  useClassNames,
  ObjectFitProp,
  objectFit,
  ObjectPositionProp,
  objectPosition,
} from '@marigold/system';

// Props
// ---------------
export interface ImageProps
  extends HtmlProps<'img'>,
    ObjectFitProp,
    ObjectPositionProp {
  variant?: string;
  size?: string;
  children?: never;
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
    <Box
      {...props}
      as="img"
      className={cn(
        fit !== 'none' && 'h-full w-full',
        classNames,
        objectFit[fit],
        objectPosition[position]
      )}
    />
  );
};
