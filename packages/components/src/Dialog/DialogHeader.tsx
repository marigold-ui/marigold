import type { ReactNode } from 'react';
import { HeadingContext, Provider, TextContext } from 'react-aria-components';
import { cn } from '@marigold/system';
import { OverlayHeaderContext } from '../utils/OverlayHeaderContext';
import { useOverlayHeaderSlotProps } from '../utils/useOverlayHeaderSlotProps';
import { useDialogSlotContext } from './Context';

export interface DialogHeaderProps {
  /**
   * Content of the header. Typically a `<Dialog.Title>` (or `<Title>`) and an
   * optional `<Dialog.Description>` (or `<Description>`).
   */
  children?: ReactNode;
}

/**
 * Optional layout wrapper grouping the title and description into a single
 * header zone. A `<Dialog.Title>` works without it — drop the title directly
 * inside `<Dialog>` and it still claims the header area. Use `<Dialog.Header>`
 * when you also want a description laid out beneath the title.
 *
 * It re-publishes the title/description slot config with the header-local
 * classNames (the chrome — padding — lives on this container) while
 * re-supplying the `id` and `ref` from the root so the accessible-name wiring
 * keeps working. `level`, `id`, and `ref` are re-published (not inherited)
 * because Provider values do not merge.
 */
export const DialogHeader = ({ children }: DialogHeaderProps) => {
  const { classNames, titleId, titleSlotRef } = useDialogSlotContext();
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
