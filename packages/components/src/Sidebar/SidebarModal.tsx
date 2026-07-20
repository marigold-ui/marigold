import type { ReactNode, Ref } from 'react';
import { Modal, ModalOverlay } from 'react-aria-components/Modal';
import { useLocalizedStringFormatter } from '@react-aria/i18n';
import { cn } from '@marigold/system';
import { CloseButton } from '../CloseButton/CloseButton';
import { intlMessages } from '../intl/messages';
import { useSidebar } from './Context';

export interface SidebarModalProps {
  children?: ReactNode;
  ref?: Ref<HTMLElement>;
  /**
   * Renders the drawer as a partial-width sheet floating over a dimmed page
   * (the two-level rail's mobile shell) instead of the default full-width
   * sheet. Tapping the exposed backdrop dismisses.
   */
  partial?: boolean;
}

/**
 * The mobile drawer shell: a dismissable overlay + modal holding the sidebar
 * `aside` with its header/content/footer grid. Shared by the single-column
 * `Sidebar` and the two-level `Sidebar.Rail` so both collapse to the same
 * drawer on small screens.
 */
export const SidebarModal = ({ children, partial, ref }: SidebarModalProps) => {
  const { state, toggleSidebar, classNames } = useSidebar();
  const stringFormatter = useLocalizedStringFormatter(intlMessages);

  return (
    <ModalOverlay
      isOpen={state === 'expanded'}
      onOpenChange={open => !open && toggleSidebar()}
      // The theme's overlay recipe reads this to paint the dimmed backdrop.
      data-partial={partial || undefined}
      className={cn(
        'fixed inset-0 z-50 h-(--visual-viewport-height)',
        classNames.overlay
      )}
      isDismissable
    >
      {/* Partial: the theme narrows the modal so the backdrop stays exposed;
          a pointer down there is an outside interaction (dismiss). */}
      <Modal className={classNames.modal}>
        <aside
          ref={ref}
          aria-label={stringFormatter.format('sidebar')}
          data-state={state}
          className={cn('h-full [grid-area:sidebar]', classNames.root)}
        >
          <CloseButton
            aria-label={stringFormatter.format('closeNavigation')}
            className={cn('z-50', classNames.closeButton)}
            onPress={toggleSidebar}
          />
          <div
            className={cn(
              "grid h-full grid-rows-[auto_1fr_auto] [grid-template-areas:'header'_'content'_'footer']",
              classNames.content
            )}
          >
            {children}
          </div>
        </aside>
      </Modal>
    </ModalOverlay>
  );
};
