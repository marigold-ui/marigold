import { useRef } from 'react';
import { Button, Separator } from 'react-aria-components';
import type { LocalizedStringFormatter } from '@react-aria/i18n';
import { cn } from '@marigold/system';
import { ChevronLeft } from '../icons/ChevronLeft';
import { ChevronRight } from '../icons/ChevronRight';
import { SidebarLink } from './SidebarLink';
import type { SidebarNode } from './collection';
import { usePanelKeyboard, useRovingTabIndex } from './useSidebarNav';

export interface SidebarPanelProps {
  nodes: SidebarNode[];
  onBack?: () => void;
  onBranchClick?: (key: string) => void;
  backLabel?: string | null;
  classNames: Record<string, string>;
  position: 'active' | 'before' | 'after';
  stringFormatter: LocalizedStringFormatter;
}

export const SidebarPanel = ({
  nodes,
  onBack,
  onBranchClick,
  backLabel,
  classNames,
  position,
  stringFormatter,
}: SidebarPanelProps) => {
  const panelRef = useRef<HTMLDivElement>(null);
  const { onKeyDown } = usePanelKeyboard(panelRef);
  const { onFocus, tabIndexForKey } = useRovingTabIndex({ nodes });

  return (
    <div
      ref={panelRef}
      role="region"
      aria-label={backLabel ?? stringFormatter.format('appNavigation')}
      className={cn(classNames.navPanel)}
      data-position={position}
      inert={position !== 'active' || undefined}
      onKeyDown={onKeyDown}
      onFocus={onFocus}
    >
      {onBack && (
        <div>
          <Button
            data-back-button
            aria-label={stringFormatter.format('backTo', {
              label: backLabel ?? stringFormatter.format('back'),
            })}
            className={cn(classNames.backButton)}
            onPress={onBack}
            excludeFromTabOrder={tabIndexForKey('__back__') < 0}
          >
            <span className="flex items-center justify-center">
              <ChevronLeft aria-hidden="true" size={16} />
            </span>
            <span className="truncate text-center font-medium">
              {backLabel ?? stringFormatter.format('back')}
            </span>
          </Button>
        </div>
      )}
      {nodes.map(node => {
        if (node.type === 'separator') {
          return (
            <Separator key={node.key} className={cn(classNames.separator)} />
          );
        }

        if (node.type === 'groupLabel') {
          return (
            <div
              key={node.key}
              role="heading"
              aria-level={2}
              className={cn(classNames.groupLabel)}
            >
              {node.content}
            </div>
          );
        }

        // Branch item — has children, renders as Link to first child's href
        if (node.children.length > 0) {
          return (
            <SidebarLink
              key={node.key}
              href={node.href}
              data-key={node.key}
              className={cn(classNames.navLink, 'justify-between')}
              tabIndex={tabIndexForKey(node.key)}
              onPress={() => {
                onBranchClick?.(node.key);
                node.onPress?.();
              }}
            >
              <span className="truncate">{node.triggerContent}</span>
              <ChevronRight aria-hidden="true" size={16} />
            </SidebarLink>
          );
        }

        // Leaf item — always a Link
        return (
          <SidebarLink
            key={node.key}
            href={node.href}
            data-key={node.key}
            aria-current={node.active ? 'page' : undefined}
            data-active={node.active || undefined}
            className={cn(classNames.navLink)}
            tabIndex={tabIndexForKey(node.key)}
            onPress={node.onPress}
          >
            {node.triggerContent}
          </SidebarLink>
        );
      })}
    </div>
  );
};
