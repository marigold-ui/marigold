import type { ReactNode } from 'react';
import { Modal, ModalOverlay } from 'react-aria-components';
import { useLocalizedStringFormatter } from '@react-aria/i18n';
import { cn, useClassNames } from '@marigold/system';
import { CloseButton } from '../CloseButton/CloseButton';
import { intlMessages } from '../intl/messages';
import { useSidebar } from './Context';
import { SidebarProvider } from './Context';
import {
  SidebarGroupLabel,
  SidebarItem,
  SidebarSeparator,
} from './SidebarItem';
import { SidebarNav } from './SidebarNav';
import { SidebarContent, SidebarFooter, SidebarHeader } from './SidebarSlots';
import { SidebarToggle } from './SidebarToggle';

// Props
// ---------------
export interface SidebarProps {
  children?: ReactNode;
  variant?: string;
  size?: string;
}

// Mobile Sheet
// ---------------
const MobileSidebar = ({ children }: { children: ReactNode }) => {
  const { openMobile, setOpenMobile, side, variant, size } = useSidebar();
  const stringFormatter = useLocalizedStringFormatter(intlMessages);
  const classNames = useClassNames({
    component: 'Sidebar',
    variant,
    size,
  });

  return (
    <ModalOverlay
      isOpen={openMobile}
      onOpenChange={setOpenMobile}
      className={cn('z-50', classNames.overlay)}
      isDismissable
    >
      <Modal data-side={side} className={classNames.modal}>
        <div className={cn('h-full', classNames.root)}>
          <CloseButton
            aria-label={stringFormatter.format('closeNavigation')}
            className={classNames.closeButton}
            onPress={() => setOpenMobile(false)}
          />
          <div className="grid h-full grid-rows-[auto_1fr_auto] [grid-template-areas:'header'_'content'_'footer']">
            {children}
          </div>
        </div>
      </Modal>
    </ModalOverlay>
  );
};

// Desktop Sidebar
// ---------------
const DesktopSidebar = ({ children }: SidebarProps) => {
  const { state, side, variant, size } = useSidebar();
  const classNames = useClassNames({
    component: 'Sidebar',
    variant,
    size,
  });

  return (
    <div data-state={state} data-side={side} className={classNames.root}>
      <div className="grid h-full w-64 grid-rows-[auto_1fr_auto] [grid-template-areas:'header'_'content'_'footer']">
        {children}
      </div>
    </div>
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
Sidebar.GroupLabel = SidebarGroupLabel;
Sidebar.Nav = SidebarNav;
Sidebar.Item = SidebarItem;
Sidebar.Separator = SidebarSeparator;
Sidebar.Toggle = SidebarToggle;
