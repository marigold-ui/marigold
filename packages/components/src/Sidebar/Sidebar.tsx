import type { ReactNode } from 'react';
import { Modal, ModalOverlay } from 'react-aria-components';
import { cn, useClassNames } from '@marigold/system';
import { CloseButton } from '../CloseButton/CloseButton';
import { useSidebar } from './Context';
import { SidebarProvider } from './Context';
import { SidebarContent } from './SidebarContent';
import { SidebarFooter } from './SidebarFooter';
import { SidebarGroup, SidebarGroupLabel } from './SidebarGroup';
import { SidebarHeader } from './SidebarHeader';
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from './SidebarMenu';
import { SidebarToggle } from './SidebarToggle';

// Props
// ---------------
export interface SidebarProps {
  children?: ReactNode;
  /** Accessible label for the nav landmark. */
  'aria-label'?: string;
  variant?: string;
  size?: string;
}

// Mobile Sheet
// ---------------
const MobileSidebar = ({ children }: { children: ReactNode }) => {
  const { openMobile, setOpenMobile, side, variant, size } = useSidebar();
  const classNames = useClassNames({
    component: 'Sidebar',
    variant,
    size,
  });

  return (
    <ModalOverlay
      isOpen={openMobile}
      onOpenChange={setOpenMobile}
      className="fixed inset-0 z-50 h-(--visual-viewport-height)"
      isDismissable
    >
      <Modal
        className={cn(
          'flex h-full *:flex-1',
          side === 'right' ? 'justify-end' : 'justify-start'
        )}
      >
        <nav aria-label="Sidebar" className={cn('h-full', classNames.root)}>
          <CloseButton
            aria-label="Close sidebar"
            className={classNames.closeButton}
            onPress={() => setOpenMobile(false)}
          />
          {children}
        </nav>
      </Modal>
    </ModalOverlay>
  );
};

// Desktop Sidebar
// ---------------
const DesktopSidebar = ({
  children,
  'aria-label': ariaLabel,
}: SidebarProps) => {
  const { state, side, variant, size } = useSidebar();
  const classNames = useClassNames({
    component: 'Sidebar',
    variant,
    size,
  });

  return (
    <nav
      aria-label={ariaLabel ?? 'Sidebar'}
      data-state={state}
      data-side={side}
      className={cn(
        "grid grid-rows-[auto_1fr_auto] [grid-template-areas:'header'_'content'_'footer']",
        classNames.root
      )}
    >
      {children}
    </nav>
  );
};

// Component
// ---------------
export const Sidebar = (props: SidebarProps) => {
  const { isMobile } = useSidebar();

  if (isMobile) {
    return <MobileSidebar>{props.children}</MobileSidebar>;
  }

  return <DesktopSidebar {...props} />;
};

Sidebar.Provider = SidebarProvider;
Sidebar.Header = SidebarHeader;
Sidebar.Content = SidebarContent;
Sidebar.Footer = SidebarFooter;
Sidebar.Group = SidebarGroup;
Sidebar.GroupLabel = SidebarGroupLabel;
Sidebar.Menu = SidebarMenu;
Sidebar.MenuItem = SidebarMenuItem;
Sidebar.MenuButton = SidebarMenuButton;
Sidebar.Toggle = SidebarToggle;
