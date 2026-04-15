import { useCallback } from 'react';
import type { ReactNode, Ref } from 'react';
import { useLocalizedStringFormatter } from '@react-aria/i18n';
import { cn } from '@marigold/system';
import { intlMessages } from '../intl/messages';
import { useSidebar } from './Context';
import { SidebarPanel } from './SidebarPanel';
import type { SidebarCurrent } from './collection';
import { panelPosition, useLastDistinctValue } from './useSidebarNav';
import { useSidebarNavState } from './useSidebarNavState';

export interface SidebarNavProps {
  /** Navigation items, typically `Sidebar.Item`, `Sidebar.Separator`, and `Sidebar.GroupLabel`. */
  children?: ReactNode;
  /** Accessible label for the navigation landmark. Defaults to a localized "App Navigation" string. */
  'aria-label'?: string;
  /**
   * Marks the active nav item automatically. Pass a string (typically the
   * current pathname) for smart segment-aware path matching, or a predicate
   * `(href, key) => boolean` for full control. Per-item `active` props still
   * win locally and can stack with the resolved match.
   */
  current?: SidebarCurrent;
}

const SidebarNav = ({
  children,
  'aria-label': ariaLabel,
  current,
  ref,
}: SidebarNavProps & { ref?: Ref<HTMLElement> }) => {
  const { classNames } = useSidebar();
  const stringFormatter = useLocalizedStringFormatter(intlMessages);

  const { collection, branchNodes, stack, setOpenBranch } = useSidebarNavState({
    children,
    current,
  });

  const handleBack = useCallback(() => setOpenBranch(null), [setOpenBranch]);

  // Track previous open branch so root panel can return focus to the branch trigger.
  const currentOpenBranch = stack[0] ?? null;
  const prevOpenBranch = useLastDistinctValue(currentOpenBranch);
  const returnFocusKey =
    currentOpenBranch === null && prevOpenBranch != null
      ? prevOpenBranch
      : null;

  return (
    <nav
      ref={ref}
      aria-label={ariaLabel || stringFormatter.format('appNavigation')}
      className={cn(
        'min-h-0 overflow-y-auto [grid-area:content]',
        classNames.nav
      )}
    >
      <div className="relative shrink-0 overflow-hidden">
        <SidebarPanel
          nodes={collection.rootNodes}
          position={panelPosition('root', stack)}
          onBranchClick={setOpenBranch}
          autoFocusKey={returnFocusKey}
        />
        {branchNodes.map(branch => (
          <SidebarPanel
            key={branch.key}
            nodes={branch.children}
            position={panelPosition(branch.key, stack)}
            onBack={handleBack}
            onBranchClick={setOpenBranch}
            backLabel={branch.textValue}
          />
        ))}
      </div>
    </nav>
  );
};

export { SidebarNav };
