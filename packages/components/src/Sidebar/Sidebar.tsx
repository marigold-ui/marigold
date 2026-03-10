import { forwardRef } from 'react';
import type {
  ForwardRefExoticComponent,
  ReactNode,
  RefAttributes,
} from 'react';
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
  /** The visual style variant of the sidebar. */
  variant?: string;
  /** The size of the sidebar. */
  size?: string;
}

interface SidebarComponent extends ForwardRefExoticComponent<
  SidebarProps & RefAttributes<HTMLElement>
> {
  Provider: typeof SidebarProvider;
  Header: typeof SidebarHeader;
  Footer: typeof SidebarFooter;
  GroupLabel: typeof SidebarGroupLabel;
  Nav: typeof SidebarNav;
  Item: typeof SidebarItem;
  Separator: typeof SidebarSeparator;
  Toggle: typeof SidebarToggle;
}

const _Sidebar = forwardRef<HTMLElement, SidebarProps>(({ children }, ref) => {
  const { isMobile, state, toggleSidebar, classNames } = useSidebar();
  const stringFormatter = useLocalizedStringFormatter(intlMessages);

  const aside = (
    <aside
      ref={ref}
      aria-label={stringFormatter.format('sidebar')}
      data-state={state}
      className={cn(isMobile && 'h-full', classNames.root)}
    >
      {isMobile && (
        <CloseButton
          aria-label={stringFormatter.format('closeNavigation')}
          className={cn('z-50', classNames.closeButton)}
          onPress={toggleSidebar}
        />
      )}
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
        <Modal className={classNames.modal}>{aside}</Modal>
      </ModalOverlay>
    );
  }

  return aside;
}) as SidebarComponent;

_Sidebar.Provider = SidebarProvider;
_Sidebar.Header = SidebarHeader;
_Sidebar.Footer = SidebarFooter;
_Sidebar.GroupLabel = SidebarGroupLabel;
_Sidebar.Nav = SidebarNav;
_Sidebar.Item = SidebarItem;
_Sidebar.Separator = SidebarSeparator;
_Sidebar.Toggle = SidebarToggle;

export { _Sidebar as Sidebar };
