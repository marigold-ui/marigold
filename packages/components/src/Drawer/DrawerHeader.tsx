import type { ReactNode } from 'react';
import { HeadingContext, Provider, TextContext } from 'react-aria-components';
import { cn } from '@marigold/system';
import { OverlayHeaderContext } from '../utils/OverlayHeaderContext';
import { useOverlayHeaderSlotProps } from '../utils/useOverlayHeaderSlotProps';
import { useDrawerContext } from './Context';

export interface DrawerHeaderProps {
  /**
   * Content of the header. Typically a `<Drawer.Title>` (or `<Title>`) and an
   * optional `<Drawer.Description>` (or `<Description>`).
   */
  children?: ReactNode;
}

/**
 * Optional layout wrapper grouping the title and description into a single
 * header zone. A `<Drawer.Title>` works without it. Use `<Drawer.Header>`
 * when you also want a description laid out beneath the title.
 *
 * It re-publishes the title/description slot config with the header-local
 * classNames (the chrome lives on this container) while re-supplying the `id`
 * and `ref` from the root so the accessible-name wiring keeps working.
 */
export const DrawerHeader = ({ children }: DrawerHeaderProps) => {
  const { classNames, titleId, titleSlotRef } = useDrawerContext();
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
