import type { ReactNode, Ref } from 'react';
import { Modal, ModalOverlay } from 'react-aria-components';
import { useLocalizedStringFormatter } from '@react-aria/i18n';
import { cn } from '@marigold/system';
import { CloseButton } from '../CloseButton/CloseButton';
import { intlMessages } from '../intl/messages';
import { SidebarProvider, useSidebar } from './Context';
import {
  SidebarGroupLabel,
  SidebarItem,
  SidebarSeparator,
} from './SidebarItem';
import { SidebarNav } from './SidebarNav';
import { SidebarFooter, SidebarHeader } from './SidebarSlots';
import { SidebarToggle } from './SidebarToggle';

export interface SidebarProps {
  /** The sidebar content, typically `Sidebar.Header`, `Sidebar.Nav`, and `Sidebar.Footer`. */
  children?: ReactNode;
}

const SidebarBase = ({
  children,
  ref,
}: SidebarProps & { ref?: Ref<HTMLElement> }) => {
  const { isMobile, state, toggleSidebar, classNames } = useSidebar();
  const stringFormatter = useLocalizedStringFormatter(intlMessages);

  if (isMobile) {
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
  }

  return (
    <aside
      ref={ref}
      aria-label={stringFormatter.format('sidebar')}
      data-state={state}
      className={cn('[grid-area:sidebar]', classNames.root)}
    >
      <div
        className={cn(
          "grid h-full grid-rows-[auto_1fr_auto] [grid-template-areas:'header'_'content'_'footer']",
          classNames.content
        )}
      >
        {children}
      </div>
    </aside>
  );
};

export const Sidebar = Object.assign(SidebarBase, {
  Provider: SidebarProvider,
  Header: SidebarHeader,
  Footer: SidebarFooter,
  GroupLabel: SidebarGroupLabel,
  Nav: SidebarNav,
  Item: SidebarItem,
  Separator: SidebarSeparator,
  Toggle: SidebarToggle,
});
