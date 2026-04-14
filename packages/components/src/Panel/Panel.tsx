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
 * Inspect children to detect whether a `PanelTitle` is rendered inside a
 * `PanelHeader`, and if so, extract its heading level. This is a pure
 * render-time computation on the React element tree (not the DOM).
 */
const detectTitle = (children: ReactNode) => {
  let hasTitle = false;
  let titleLevel = 2;

  for (const child of Children.toArray(children)) {
    if (isValidElement(child) && child.type === PanelHeader) {
      const headerChildren = Children.toArray(
        (child.props as { children?: ReactNode }).children
      );
      for (const headerChild of headerChildren) {
        if (isValidElement(headerChild) && headerChild.type === PanelTitle) {
          hasTitle = true;
          titleLevel = (headerChild.props as { level?: number }).level ?? 2;
        }
      }
    }
  }

  return { hasTitle, titleLevel };
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

  if (!hasTitle && !ariaLabel) {
    throw new Error(
      'Panel requires either a <Panel.Title> within <Panel.Header> or an "aria-label" prop for accessible labeling.'
    );
  }

  return (
    <PanelProvider
      value={{ classNames, variant, titleId, titleLevel, hasTitle }}
    >
      <section
        aria-labelledby={hasTitle ? titleId : undefined}
        aria-label={!hasTitle ? ariaLabel : undefined}
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
