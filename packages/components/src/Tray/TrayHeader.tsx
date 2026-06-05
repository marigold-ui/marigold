import type { ReactNode } from 'react';
import { useMemo } from 'react';
import { HeadingContext, Provider, TextContext } from 'react-aria-components';
import { cn } from '@marigold/system';
import { useTrayContext } from './Context';

// Props
// ---------------
export interface TrayHeaderProps {
  /**
   * Content of the header. Typically a `<Tray.Title>` (or `<Title>`) and an
   * optional `<Tray.Description>` (or `<Description>`).
   */
  children?: ReactNode;
}

// Component
// ---------------
/**
 * Optional layout wrapper grouping the title and description into a single
 * header zone. A `<Tray.Title>` works without it. Use `<Tray.Header>` when you
 * also want a description laid out beneath the title.
 */
export const TrayHeader = ({ children }: TrayHeaderProps) => {
  const { classNames, titleId, titleSlotRef } = useTrayContext();

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

  return (
    <Provider
      values={[
        [HeadingContext, headingProps],
        [TextContext, textProps],
      ]}
    >
      <div className={cn('[grid-area:title]', classNames.header)}>
        {children}
      </div>
    </Provider>
  );
};
