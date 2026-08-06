import { isValidElement } from 'react';
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
import { flattenChildren } from './collection';

/** True when a `Sidebar.Rail` sits among the children (two-level mode). */
const hasRailChild = (children: ReactNode): boolean =>
  flattenChildren(children).some(
    child =>
      isValidElement(child) &&
      // Brand check (not reference identity) — safe across HOCs and bundles,
      // same as the other slot markers in the collection builders.
      (child.type as { __SIDEBAR_RAIL__?: boolean }).__SIDEBAR_RAIL__ === true
  );

export interface SidebarProps {
  /**
   * The sidebar content, typically `Sidebar.Header`, `Sidebar.Nav`, and
   * `Sidebar.Footer`. With a `Sidebar.Rail` child (two-level mode), the rail
   * renders its own layout and `<Sidebar>` becomes a pure passthrough.
   */
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
        // --ui-viewport-height lets a bounded container (docs demos, embedded
        // shells) stand in for the browser viewport the sidebar normally fills.
        'sticky top-0 h-[var(--ui-viewport-height,100dvh)] self-start [grid-area:sidebar]',
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
