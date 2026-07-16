import { Children, isValidElement } from 'react';
import type { ReactNode, Ref } from 'react';
import { useLocalizedStringFormatter } from '@react-aria/i18n';
import { cn } from '@marigold/system';
import { intlMessages } from '../intl/messages';
import { SidebarProvider, useSidebar } from './Context';
import {
  SidebarGroupLabel,
  SidebarItem,
  SidebarSeparator,
} from './SidebarItem';
import { SidebarModal } from './SidebarModal';
import { SidebarNav } from './SidebarNav';
import { SidebarRail } from './SidebarRail';
import { SidebarRailItem } from './SidebarRailItem';
import { SidebarFooter, SidebarHeader } from './SidebarSlots';
import { SidebarToggle } from './SidebarToggle';

/** True when a `Sidebar.Rail` sits among the children (two-level mode). */
const hasRailChild = (children: ReactNode): boolean =>
  Children.toArray(children).some(
    child => isValidElement(child) && child.type === SidebarRail
  );

export interface SidebarProps {
  /** The sidebar content, typically `Sidebar.Header`, `Sidebar.Nav`, and `Sidebar.Footer`. */
  children?: ReactNode;
}

const SidebarBase = ({
  children,
  ref,
}: SidebarProps & { ref?: Ref<HTMLElement> }) => {
  const { isMobile, state, classNames } = useSidebar();
  const stringFormatter = useLocalizedStringFormatter(intlMessages);

  // Two-level mode: `Sidebar.Rail` renders its own aside (brand + rail + panel),
  // so pass through and let it own the layout.
  if (hasRailChild(children)) {
    return <>{children}</>;
  }

  if (isMobile) {
    return <SidebarModal ref={ref}>{children}</SidebarModal>;
  }

  return (
    <aside
      ref={ref}
      aria-label={stringFormatter.format('sidebar')}
      data-state={state}
      className={cn(
        'sticky top-0 h-dvh self-start [grid-area:sidebar]',
        classNames.root
      )}
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
  Rail: SidebarRail,
  RailItem: SidebarRailItem,
});
