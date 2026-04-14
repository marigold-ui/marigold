import type { ReactNode } from 'react';
import { useId, useRef } from 'react';
import { cn, useClassNames } from '@marigold/system';
import type { TitleInfo } from './Context';
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
const DEFAULT_TITLE_INFO: TitleInfo = { hasTitle: false, level: 2 };

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
  const titleInfo = useRef<TitleInfo>(DEFAULT_TITLE_INFO);

  titleInfo.current = DEFAULT_TITLE_INFO;

  return (
    <PanelProvider value={{ classNames, variant, titleId, titleInfo }}>
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
