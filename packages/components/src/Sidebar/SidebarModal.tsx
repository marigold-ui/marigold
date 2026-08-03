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
}

/**
 * The mobile drawer shell: a dismissable overlay + modal holding the sidebar
 * `aside` with its header/content/footer grid. Shared by the single-column
 * `Sidebar` and the two-level `Sidebar.Rail` so both collapse to the same
 * full-width drawer on small screens.
 */
export const SidebarModal = ({ children, ref }: SidebarModalProps) => {
  const { state, toggleSidebar, classNames } = useSidebar();
  const stringFormatter = useLocalizedStringFormatter(intlMessages);

  return (
    <ModalOverlay
      isOpen={state === 'expanded'}
      onOpenChange={open => !open && toggleSidebar()}
      className={cn(
        'fixed inset-0 z-50 h-(--visual-viewport-height)',
        classNames.overlay
      )}
      isDismissable
    >
      <Modal className={classNames.modal}>
        <aside
          ref={ref}
          aria-label={stringFormatter.format('sidebar')}
          data-state={state}
          // relative: anchor the absolute close button to the drawer.
          className={cn('relative h-full [grid-area:sidebar]', classNames.root)}
        >
          <CloseButton
            aria-label={stringFormatter.format('closeNavigation')}
            className={cn('z-50', classNames.closeButton)}
            onPress={toggleSidebar}
          />
          <div
            className={cn(
              // The header row never collapses below the top-bar height: with
              // no `Sidebar.Header` the empty strip still holds the absolute
              // close button clear of the first nav row.
              "grid h-full grid-rows-[minmax(var(--spacing-topbar),auto)_1fr_auto] [grid-template-areas:'header'_'content'_'footer']",
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
