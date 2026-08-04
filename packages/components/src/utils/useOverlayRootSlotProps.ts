import { useMemo } from 'react';
import type { RefCallback } from 'react';
import { cn } from '@marigold/system';

interface OverlayRootSlotContext {
  classNames: { title?: string; description?: string; header?: string };
  titleId?: string;
  titleSlotRef?: RefCallback<Element>;
}

export const useOverlayRootSlotProps = ({
  classNames,
  titleId,
  titleSlotRef,
}: OverlayRootSlotContext) => {
  const headingProps = useMemo(
    () => ({
      slots: {
        title: {
          className: cn(
            '[grid-area:title]',
            classNames.header,
            classNames.title
          ),
          level: 2,
          id: titleId,
          ref: titleSlotRef,
        },
      },
    }),
    [classNames.header, classNames.title, titleId, titleSlotRef]
  );

  const textProps = useMemo(
    () => ({
      slots: {
        description: {
          className: cn('[grid-area:content]', classNames.description),
          elementType: 'p' as const,
        },
      },
    }),
    [classNames.description]
  );

  return { headingProps, textProps };
};
