import { useState } from 'react';
import type { ImageProps as NextImageProps } from 'next/image';
import NextImage from 'next/image';
import { Dialog } from '@marigold/components';
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
  className?: string;
}

// Component
// ---------------
export const Image = ({
  caption,
  attribution,
  className,
  ...props
}: ImageProps) => {
  const [open, setOpen] = useState(false);

  if (caption) {
    return (
      <figure className="mx-auto w-fit">
        <NextImage
          {...props}
          onClick={() => setOpen(!open)}
          className={cn(className, 'hover:cursor-zoom-in')}
        />
        {open && (
          <Dialog.Trigger
            open={open}
            onOpenChange={setOpen}
            dismissable
            keyboardDismissable
          >
            <Dialog aria-labelledby="fullsize image" closeButton variant="zoom">
              <Dialog.Content>
                <NextImage {...props} />
              </Dialog.Content>
            </Dialog>
          </Dialog.Trigger>
        )}
        <figcaption
          className={cn(
            'text-secondary-400 not-prose mt-0.5',
            attribution && 'hover:text-secondary-500'
          )}
        >
          {attribution ? (
            <a
              href={attribution}
              target="_blank"
              rel="nofollow noreferrer"
              className="text-right text-[10px]"
            >
              {caption}
            </a>
          ) : (
            <span className="text-center text-xs">{caption}</span>
          )}
        </figcaption>
      </figure>
    );
  }

  return (
    <>
      <NextImage
        {...props}
        onClick={() => setOpen(!open)}
        className={cn(className, 'hover:cursor-zoom-in')}
      />
      {open && (
        <Dialog.Trigger
          open={open}
          onOpenChange={setOpen}
          dismissable
          keyboardDismissable
        >
          <Dialog aria-labelledby="fullsize image" closeButton variant="zoom">
            <Dialog.Content>
              <NextImage {...props} />
            </Dialog.Content>
          </Dialog>
        </Dialog.Trigger>
      )}
    </>
  );
};
