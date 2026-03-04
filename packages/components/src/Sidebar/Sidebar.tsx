import { forwardRef } from 'react';
import type {
  ForwardRefExoticComponent,
  ReactNode,
  RefAttributes,
} from 'react';
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
import { SidebarFooter, SidebarHeader } from './SidebarSlots';
import { SidebarToggle } from './SidebarToggle';

// Props
// ---------------
export interface SidebarProps {
  children?: ReactNode;
  variant?: string;
  size?: string;
}

// Compound Component Interface
// ---------------
interface SidebarComponent extends ForwardRefExoticComponent<
  SidebarProps & RefAttributes<HTMLDivElement>
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

// Mobile Sheet
// ---------------
const MobileSidebar = forwardRef<HTMLDivElement, { children: ReactNode }>(
  ({ children }, ref) => {
    const { state, toggleSidebar, variant, size } = useSidebar();
    const stringFormatter = useLocalizedStringFormatter(intlMessages);
    const classNames = useClassNames({
      component: 'Sidebar',
      variant,
      size,
    });

    return (
      <ModalOverlay
        isOpen={state === 'expanded'}
        onOpenChange={open => !open && toggleSidebar()}
        className={cn('z-50', classNames.overlay)}
        isDismissable
      >
        <Modal className={classNames.modal}>
          <div ref={ref} className={cn('h-full', classNames.root)}>
            <CloseButton
              aria-label={stringFormatter.format('closeNavigation')}
              className={classNames.closeButton}
              onPress={toggleSidebar}
            />
            <div className="grid h-full grid-rows-[auto_1fr_auto] [grid-template-areas:'header'_'content'_'footer']">
              {children}
            </div>
          </div>
        </Modal>
      </ModalOverlay>
    );
  }
);

// Desktop Sidebar
// ---------------
const DesktopSidebar = forwardRef<HTMLDivElement, SidebarProps>(
  ({ children }, ref) => {
    const { state, variant, size } = useSidebar();
    const classNames = useClassNames({
      component: 'Sidebar',
      variant,
      size,
    });

    return (
      <div ref={ref} data-state={state} className={classNames.root}>
        <div className="grid h-full w-64 grid-rows-[auto_1fr_auto] [grid-template-areas:'header'_'content'_'footer']">
          {children}
        </div>
      </div>
    );
  }
);

// Component
// ---------------
const _Sidebar = forwardRef<HTMLDivElement, SidebarProps>((props, ref) => {
  const { isMobile } = useSidebar();

  if (isMobile) {
    return <MobileSidebar ref={ref}>{props.children}</MobileSidebar>;
  }

  return <DesktopSidebar ref={ref} {...props} />;
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
