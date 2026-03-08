import { useLayoutEffect, useRef } from 'react';
import { Button, Separator } from 'react-aria-components';
import type { LocalizedStringFormatter } from '@react-aria/i18n';
import { isFocusVisible } from '@react-aria/interactions';
import { cn } from '@marigold/system';
import { ChevronLeft } from '../icons/ChevronLeft';
import { ChevronRight } from '../icons/ChevronRight';
import { SidebarLink } from './SidebarLink';
import type { SidebarNode } from './collection';
import {
  RovingTabIndexProvider,
  usePanelKeyboard,
  useRovingItem,
} from './useSidebarNav';

interface BackButtonProps {
  onBack: () => void;
  backLabel: string | null | undefined;
  className: string;
  stringFormatter: LocalizedStringFormatter;
}

const BackButton = ({
  onBack,
  backLabel,
  className,
  stringFormatter,
}: BackButtonProps) => {
  const { tabIndex, onFocus } = useRovingItem('__back__');

  return (
    <Button
      data-back-button
      aria-label={stringFormatter.format('backTo', {
        label: backLabel ?? stringFormatter.format('back'),
      })}
      className={cn(className)}
      onPress={onBack}
      excludeFromTabOrder={tabIndex < 0}
      onFocus={onFocus}
    >
      <span className="flex items-center justify-center">
        <ChevronLeft aria-hidden="true" size={16} />
      </span>
      <span className="truncate text-center font-medium">
        {backLabel ?? stringFormatter.format('back')}
      </span>
    </Button>
  );
};

export interface SidebarPanelProps {
  nodes: SidebarNode[];
  onBack?: () => void;
  onBranchClick?: (key: string) => void;
  backLabel?: string | null;
  classNames: Record<string, string>;
  position: 'active' | 'before' | 'after';
  stringFormatter: LocalizedStringFormatter;
  /** Key of the item to focus when this panel becomes active (fallback after active item). */
  autoFocusKey?: string | null;
}

export const SidebarPanel = ({
  nodes,
  onBack,
  onBranchClick,
  backLabel,
  classNames,
  position,
  stringFormatter,
  autoFocusKey,
}: SidebarPanelProps) => {
  const panelRef = useRef<HTMLDivElement>(null);
  const { onKeyDown } = usePanelKeyboard(panelRef);

  // Focus the right element when this panel becomes active
  const prevPositionRef = useRef(position);
  useLayoutEffect(() => {
    const wasActive = prevPositionRef.current === 'active';
    prevPositionRef.current = position;

    if (position !== 'active' || wasActive) return;
    if (!panelRef.current) return;

    const showFocusRing = isFocusVisible();

    const activeItem = panelRef.current.querySelector(
      '[aria-current="page"]'
    ) as HTMLElement | null;

    const fallbackSelector = autoFocusKey
      ? `[data-key="${CSS.escape(autoFocusKey)}"]`
      : '[data-back-button]';
    const fallback = panelRef.current.querySelector(
      fallbackSelector
    ) as HTMLElement | null;

    const target = activeItem ?? fallback;
    target?.focus({ focusVisible: showFocusRing } as FocusOptions);
  }, [position, autoFocusKey]);

  return (
    <RovingTabIndexProvider nodes={nodes}>
      <div
        ref={panelRef}
        role="region"
        aria-label={backLabel ?? stringFormatter.format('appNavigation')}
        className={cn(classNames.navPanel)}
        data-position={position}
        inert={position !== 'active' || undefined}
        onKeyDown={onKeyDown}
      >
        {onBack && (
          <BackButton
            onBack={onBack}
            backLabel={backLabel}
            className={classNames.backButton}
            stringFormatter={stringFormatter}
          />
        )}
        {nodes.map(node => {
          if (node.type === 'separator') {
            return (
              <Separator key={node.key} className={classNames.separator} />
            );
          }

          if (node.type === 'groupLabel') {
            return (
              <div
                key={node.key}
                role="heading"
                aria-level={2}
                className={classNames.groupLabel}
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
              onPress={node.onPress}
            >
              {node.triggerContent}
            </SidebarLink>
          );
        })}
      </div>
    </RovingTabIndexProvider>
  );
};
