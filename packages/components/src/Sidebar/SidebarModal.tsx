import type { ReactNode, Ref } from 'react';
import { useLocalizedStringFormatter } from '@react-aria/i18n';
import { cn } from '@marigold/system';
import { CloseButton } from '../CloseButton/CloseButton';
import { Sheet } from '../Overlay/Sheet';
import { intlMessages } from '../intl/messages';
import { useSidebar } from './Context';

export interface SidebarModalProps {
  children?: ReactNode;
  ref?: Ref<HTMLElement>;
}

/**
 * The mobile drawer shell: a full-width sheet from the start edge (ADR-0007)
 * holding the sidebar `aside` with its header/content/footer grid. Shared by
 * the single-column `Sidebar` and the two-level `Sidebar.Rail` so both
 * collapse to the same drawer on small screens. A swipe toward the start
 * edge, Escape and the close button all close it.
 */
export const SidebarModal = ({ children, ref }: SidebarModalProps) => {
  const { state, toggleSidebar, classNames } = useSidebar();
  const stringFormatter = useLocalizedStringFormatter(intlMessages);

  return (
    <Sheet
      position="start"
      open={state === 'expanded'}
      onOpenChange={open => !open && toggleSidebar()}
      // The sheet is the dialog, so it carries the name the `aside` had.
      aria-label={stringFormatter.format('sidebar')}
    >
      <aside
        ref={ref}
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
    </Sheet>
  );
};
