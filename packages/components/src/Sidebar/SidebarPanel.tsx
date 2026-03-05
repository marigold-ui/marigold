import { useRef } from 'react';
import { Button, Link, Separator } from 'react-aria-components';
import type { LocalizedStringFormatter } from '@react-aria/i18n';
import { cn } from '@marigold/system';
import { ChevronLeft } from '../icons/ChevronLeft';
import { ChevronRight } from '../icons/ChevronRight';
import type { SidebarNode } from './collection';
import { usePanelKeyboard } from './useSidebarNav';

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

  return (
    <div
      ref={panelRef}
      className={cn(classNames.navPanel)}
      data-position={position}
      inert={position !== 'active' || undefined}
      onKeyDown={onKeyDown}
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
          >
            <span className="flex items-center justify-center">
              <ChevronLeft size={16} />
            </span>
            <span className="truncate text-center font-medium">
              {backLabel ?? stringFormatter.format('back')}
            </span>
            <span aria-hidden="true" />
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
            <div key={node.key} className={cn(classNames.groupLabel)}>
              {node.content}
            </div>
          );
        }

        // Branch item — has children, renders as Link to first child's href
        if (node.children.length > 0) {
          return (
            <Link
              key={node.key}
              href={node.href}
              data-key={node.key}
              className={cn(classNames.navLink, 'justify-between')}
              onPress={() => {
                onBranchClick?.(node.key);
                node.onPress?.();
              }}
            >
              <span className="truncate">{node.triggerContent}</span>
              <ChevronRight size={16} />
            </Link>
          );
        }

        // Leaf item — always a Link
        return (
          <Link
            key={node.key}
            href={node.href}
            data-key={node.key}
            aria-current={node.active ? 'page' : undefined}
            data-active={node.active || undefined}
            className={cn(classNames.navLink)}
            onPress={node.onPress}
          >
            {node.triggerContent}
          </Link>
        );
      })}
    </div>
  );
};
