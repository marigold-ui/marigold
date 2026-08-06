import type { ReactNode } from 'react';
import { HeadingContext, Provider, TextContext } from 'react-aria-components';
import { cn } from '@marigold/system';
import { OverlayHeaderContext } from '../utils/OverlayHeaderContext';
import { useOverlayHeaderSlotProps } from '../utils/useOverlayHeaderSlotProps';
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
  const { headingProps, textProps } = useOverlayHeaderSlotProps({
    classNames,
    titleId,
    titleSlotRef,
  });

  return (
    <OverlayHeaderContext value={true}>
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
    </OverlayHeaderContext>
  );
};
