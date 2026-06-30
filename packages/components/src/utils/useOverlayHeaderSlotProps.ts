import { useMemo } from 'react';
import type { RefCallback } from 'react';

interface OverlaySlotContext {
  classNames: { title?: string; description?: string; header?: string };
  titleId?: string;
  titleSlotRef?: RefCallback<Element>;
}

export const useOverlayHeaderSlotProps = ({
  classNames,
  titleId,
  titleSlotRef,
}: OverlaySlotContext) => {
  const headingProps = useMemo(
    () => ({
      slots: {
        title: {
          className: classNames.title,
          level: 2,
          id: titleId,
          ref: titleSlotRef,
        },
      },
    }),
    [classNames.title, titleId, titleSlotRef]
  );

  const textProps = useMemo(
    () => ({
      slots: {
        description: {
          className: classNames.description,
          elementType: 'p' as const,
        },
      },
    }),
    [classNames.description]
  );

  return { headingProps, textProps };
};
