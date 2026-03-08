import { forwardRef, useCallback, useEffect, useRef } from 'react';
import type { ReactNode } from 'react';
import { useLocalizedStringFormatter } from '@react-aria/i18n';
import { cn } from '@marigold/system';
import { intlMessages } from '../intl/messages';
import { useSidebar } from './Context';
import { SidebarPanel } from './SidebarPanel';
import { panelPosition } from './useSidebarNav';
import { useSidebarNavState } from './useSidebarNavState';

export interface SidebarNavProps {
  children?: ReactNode;
  'aria-label'?: string;
}

const SidebarNav = forwardRef<HTMLElement, SidebarNavProps>(
  ({ children, 'aria-label': ariaLabel }, forwardedRef) => {
    const { classNames } = useSidebar();
    const stringFormatter = useLocalizedStringFormatter(intlMessages);

    const { collection, branchNodes, stack, setOpenBranch } =
      useSidebarNavState({ children });

    const handleBack = useCallback(() => setOpenBranch(null), [setOpenBranch]);

    // Track previous open branch so root panel can return focus to the branch trigger
    const currentOpenBranch = stack[0] ?? null;
    const prevOpenBranchRef = useRef(currentOpenBranch);
    const returnFocusKey = prevOpenBranchRef.current;
    useEffect(() => {
      prevOpenBranchRef.current = currentOpenBranch;
    });

    return (
      <nav
        ref={forwardedRef}
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
            classNames={classNames}
            onBranchClick={setOpenBranch}
            stringFormatter={stringFormatter}
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
              classNames={classNames}
              stringFormatter={stringFormatter}
            />
          ))}
        </div>
      </nav>
    );
  }
);

export { SidebarNav };
