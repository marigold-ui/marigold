import { Children, type ReactNode, isValidElement, useId } from 'react';
import { cn, useClassNames } from '@marigold/system';
import { PanelProvider } from './Context';
import { PanelActions } from './PanelActions';
import { PanelCollapsible } from './PanelCollapsible';
import { PanelCollapsibleContent } from './PanelCollapsibleContent';
import { PanelCollapsibleTrigger } from './PanelCollapsibleTrigger';
import { PanelContent } from './PanelContent';
import { PanelDescription } from './PanelDescription';
import { PanelFooter } from './PanelFooter';
import { PanelHeader } from './PanelHeader';
import { PanelTitle } from './PanelTitle';

// Props
// ---------------
export interface PanelProps {
  variant?: 'default' | 'master' | 'admin' | 'destructive' | (string & {});
  size?: string;
  children: ReactNode;
  /** Accessible label. Required when no `Panel.Title` is present. */
  'aria-label'?: string;
}

// Helpers
// ---------------

/**
 * Walk the element tree to find a PanelTitle inside a PanelHeader.
 * Pure render-time computation — no refs or effects needed.
 */
const detectTitle = (children: ReactNode) => {
  for (const child of Children.toArray(children)) {
    if (isValidElement(child) && child.type === PanelHeader) {
      for (const headerChild of Children.toArray(
        (child.props as { children?: ReactNode }).children
      )) {
        if (isValidElement(headerChild) && headerChild.type === PanelTitle) {
          return {
            hasTitle: true as const,
            titleLevel: (headerChild.props as { level?: number }).level ?? 2,
          };
        }
      }
    }
  }
  return { hasTitle: false as const, titleLevel: 2 };
};

// Component
// ---------------
export const Panel = ({
  variant,
  size,
  children,
  'aria-label': ariaLabel,
}: PanelProps) => {
  const titleId = useId();
  const classNames = useClassNames({ component: 'Panel', variant, size });
  const { hasTitle, titleLevel } = detectTitle(children);

  return (
    <PanelProvider
      value={{ classNames, variant, titleId, titleLevel, hasTitle }}
    >
      <section
        aria-labelledby={!ariaLabel ? titleId : undefined}
        aria-label={ariaLabel}
        className={cn('[&>*:not(:first-child)]:border-t', classNames.root)}
      >
        {children}
      </section>
    </PanelProvider>
  );
};

Panel.Header = PanelHeader;
Panel.Title = PanelTitle;
Panel.Description = PanelDescription;
Panel.Actions = PanelActions;
Panel.Content = PanelContent;
Panel.Collapsible = PanelCollapsible;
Panel.CollapsibleTrigger = PanelCollapsibleTrigger;
Panel.CollapsibleContent = PanelCollapsibleContent;
Panel.Footer = PanelFooter;
