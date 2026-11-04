import { use, useId, useLayoutEffect, useRef } from 'react';
import { Button } from 'react-aria-components/Button';
import { Separator } from 'react-aria-components/Separator';
import { useLocalizedStringFormatter } from '@react-aria/i18n';
import { isFocusVisible } from '@react-aria/interactions';
import { cn } from '@marigold/system';
import { ChevronLeft } from '../icons/ChevronLeft';
import { ChevronRight } from '../icons/ChevronRight';
import { intlMessages } from '../intl/messages';
import { SidebarHeadingLevelContext, useSidebar } from './Context';
import { SidebarLink, SidebarRowIcon } from './SidebarLink';
import { containsActive } from './collection';
import type { SidebarNode } from './collection';
import {
  RovingTabIndexProvider,
  usePanelKeyboard,
  useRovingItem,
} from './useSidebarNav';

interface BackButtonProps {
  onBack: () => void;
  backLabel: string | null | undefined;
  headingId: string;
  headingLevel: HeadingLevel;
  className: string;
}

type HeadingLevel = 2 | 3 | 4 | 5 | 6;

const toHeadingLevel = (level: number): HeadingLevel =>
  Math.min(Math.max(level, 2), 6) as HeadingLevel;

// The section name is the panel's heading, so it sits beside the back button
// rather than inside it: heading navigation finds it, and the button keeps its
// own "Back to …" name. The button's hit area is stretched over the whole row
// (`after:inset-0` against the `relative` row), so tapping the name still goes
// back.
const BackButton = ({
  onBack,
  backLabel,
  headingId,
  headingLevel,
  className,
}: BackButtonProps) => {
  const Heading = `h${headingLevel}` as const;
  const stringFormatter = useLocalizedStringFormatter(intlMessages);
  const { tabIndex, onFocus } = useRovingItem('__back__');
  const label = backLabel ?? stringFormatter.format('back');

  return (
    <div data-back-row className={cn('relative', className)}>
      <Button
        data-back-button
        aria-label={stringFormatter.format('backTo', { label })}
        className="flex items-center justify-center outline-none after:absolute after:inset-0"
        onPress={onBack}
        excludeFromTabOrder={tabIndex < 0}
        onFocus={onFocus}
      >
        <ChevronLeft aria-hidden="true" size={16} />
      </Button>
      <Heading
        id={headingId}
        data-slot="title"
        className="truncate text-center"
      >
        {label}
      </Heading>
    </div>
  );
};

export interface SidebarPanelProps {
  nodes: SidebarNode[];
  onBack?: () => void;
  onBranchClick?: (key: string) => void;
  backLabel?: string | null;
  position: 'active' | 'before' | 'after';
  /** Key of the item to focus when this panel becomes active (fallback after active item). */
  autoFocusKey?: string | null;
}

export const SidebarPanel = ({
  nodes,
  onBack,
  onBranchClick,
  backLabel,
  position,
  autoFocusKey,
}: SidebarPanelProps) => {
  const { classNames, isMobile, toggleSidebar } = useSidebar();
  const stringFormatter = useLocalizedStringFormatter(intlMessages);
  const panelRef = useRef<HTMLDivElement>(null);
  const { onKeyDown } = usePanelKeyboard(panelRef);
  const headingId = useId();
  // A drilled-in level is headed one step below the enclosing heading, and
  // its group labels one step below that.
  const parentLevel = use(SidebarHeadingLevelContext);
  const sectionLevel = toHeadingLevel(parentLevel + 1);
  const groupLabelLevel = toHeadingLevel(
    onBack ? sectionLevel + 1 : sectionLevel
  );

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
        // A drilled-in level is named by its visible heading; the root level
        // has none, so it falls back to the generic landmark name.
        aria-labelledby={onBack ? headingId : undefined}
        aria-label={
          onBack ? undefined : stringFormatter.format('appNavigation')
        }
        className={classNames.navPanel}
        data-position={position}
        inert={position !== 'active' || undefined}
        onKeyDown={onKeyDown}
      >
        {onBack && (
          <BackButton
            onBack={onBack}
            backLabel={backLabel}
            headingId={headingId}
            headingLevel={sectionLevel}
            className={classNames.backButton}
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
                aria-level={groupLabelLevel}
                className={classNames.groupLabel}
              >
                {node.content}
              </div>
            );
          }

          if (node.children.length > 0) {
            return (
              <SidebarLink
                key={node.key}
                href={node.href}
                data-key={node.key}
                // Mobile drawer only: the ancestor of the current page. On this
                // level the leaf itself is out of view, so the branch row is
                // the only "you are here".
                aria-current={
                  isMobile && containsActive(node.children) ? 'true' : undefined
                }
                className={classNames.navLink}
                onPress={() => {
                  onBranchClick?.(node.key);
                  node.onPress?.();
                }}
              >
                <SidebarRowIcon icon={node.icon} />
                <span className="flex-1 truncate">{node.triggerContent}</span>
                <ChevronRight aria-hidden="true" size={16} />
              </SidebarLink>
            );
          }

          return (
            <SidebarLink
              key={node.key}
              href={node.href}
              data-key={node.key}
              aria-current={node.active ? 'page' : undefined}
              data-active={node.active || undefined}
              className={classNames.navLink}
              onPress={() => {
                node.onPress?.();
                if (isMobile) toggleSidebar();
              }}
            >
              <SidebarRowIcon icon={node.icon} />
              {node.triggerContent}
            </SidebarLink>
          );
        })}
      </div>
    </RovingTabIndexProvider>
  );
};
