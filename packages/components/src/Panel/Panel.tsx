import type { ReactNode } from 'react';
import { useId } from 'react';
import type {
  InsetSpacingTokens,
  PaddingSpacingTokens,
  SpaceProp,
  SpacingTokens,
} from '@marigold/system';
import { cn, createSpacingVar, useClassNames } from '@marigold/system';
import { useSlot } from '../utils/useSlot';
import { PanelProvider } from './Context';
import { PanelCollapsible } from './PanelCollapsible';
import { PanelCollapsibleContent } from './PanelCollapsibleContent';
import { PanelCollapsibleTrigger } from './PanelCollapsibleTrigger';
import { PanelContent } from './PanelContent';
import { PanelDescription } from './PanelDescription';
import { PanelFooter } from './PanelFooter';
import { PanelHeader } from './PanelHeader';
import { PanelHeaderActions } from './PanelHeaderActions';
import { PanelTitle } from './PanelTitle';

// Props
// ---------------
interface PanelBaseProps {
  variant?: 'default' | 'master' | 'admin' | 'destructive' | (string & {});
  size?: 'form' | (string & {});
  children: ReactNode;
  /** Accessible label. Required when no `Panel.Title` is present. */
  'aria-label'?: string;
  /**
   * Base heading level for the panel. `Panel.Title` renders at this level,
   * `Panel.CollapsibleTrigger` at `headingLevel + 1`.
   * @default 2
   */
  headingLevel?: 2 | 3 | 4 | 5 | 6;
  /**
   * Spacing between Panel sections (Header, Content, Footer, etc.).
   * @default 'regular'
   */
  space?: SpaceProp<SpacingTokens>['space'];
}

/**
 * Padding applied to every subcomponent (Header, Content, CollapsibleTrigger,
 * CollapsibleContent, Footer). Either set `p` for uniform padding, or use
 * `px`/`py` to control the axes separately — setting both forms is a TypeScript
 * error, mirroring the `<Inset>` component's `space` / `spaceX`+`spaceY` split.
 */
type PanelPaddingProps =
  | {
      /** Padding on all sides. Cannot be combined with `px` or `py`. */
      p?: SpaceProp<InsetSpacingTokens>['space'];
      px?: never;
      py?: never;
    }
  | {
      p?: never;
      /** Horizontal padding applied to every subcomponent. */
      px?: SpaceProp<PaddingSpacingTokens>['space'];
      /** Vertical padding applied to every subcomponent. */
      py?: SpaceProp<PaddingSpacingTokens>['space'];
    };

export type PanelProps = PanelBaseProps & PanelPaddingProps;

// Component
// ---------------
export const Panel = ({
  variant,
  size,
  children,
  'aria-label': ariaLabel,
  headingLevel = 2,
  space = 'regular',
  p,
  px,
  py,
}: PanelProps) => {
  const titleId = useId();
  const classNames = useClassNames({ component: 'Panel', variant, size });
  const [titleSlotRef, hasTitle] = useSlot(!ariaLabel);

  const inset = p ?? 'square-regular';
  const resolvedPx = px ?? `${inset}-x`;
  const resolvedPy = py ?? `${inset}-y`;

  return (
    <PanelProvider
      value={{
        classNames,
        variant,
        titleId,
        headingLevel,
        hasTitle,
        titleSlotRef,
      }}
    >
      <section
        aria-labelledby={!ariaLabel ? titleId : undefined}
        aria-label={ariaLabel}
        className={cn(
          'flex flex-col gap-y-(--panel-gap) pt-(--panel-py) pb-(--panel-py)',
          classNames.root
        )}
        style={{
          ...createSpacingVar('panel-px', `${resolvedPx}`),
          ...createSpacingVar('panel-py', `${resolvedPy}`),
          ...createSpacingVar('panel-gap', `${space}`),
        }}
      >
        {children}
      </section>
    </PanelProvider>
  );
};

Panel.Header = PanelHeader;
Panel.Title = PanelTitle;
Panel.Description = PanelDescription;
Panel.HeaderActions = PanelHeaderActions;
Panel.Content = PanelContent;
Panel.Collapsible = PanelCollapsible;
Panel.CollapsibleTrigger = PanelCollapsibleTrigger;
Panel.CollapsibleContent = PanelCollapsibleContent;
Panel.Footer = PanelFooter;
