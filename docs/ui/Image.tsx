import NextImage from 'next/image';
import type { ImageProps as NextImageProps } from 'next/image';

import { cn } from '@marigold/system';

// Props
// ---------------
export interface ImageProps extends NextImageProps {
  caption?: string;
  /**
   * Use to wrap the caption with a link to the resource for
   * attributing the work.
   */
  attribution?: string;
}

// Component
// ---------------
export const Image = ({ caption, attribution, ...props }: ImageProps) => {
  if (caption) {
    return (
      <figure className="mx-auto w-fit">
        <NextImage {...props} />
        <figcaption
          className={cn(
            'text-secondary-400 not-prose mt-0.5 text-right text-[10px]',
            attribution && 'hover:text-secondary-500'
          )}
        >
          {attribution ? (
            <a href={attribution} target="_blank" rel="nofollow noreferrer">
              {caption}
            </a>
          ) : (
            caption
          )}
        </figcaption>
      </figure>
    );
  }

  return <NextImage {...props} />;
};
