import type { HTMLAttributes, ReactNode } from 'react';
import { useId, useMemo } from 'react';
import { HeadingContext, Provider } from 'react-aria-components';
import type {
  InsetSpacingTokens,
  PaddingSpacingTokens,
  SpaceProp,
  SpacingTokens,
} from '@marigold/system';
import {
  cn,
  createSpacingVar,
  resolveInsetAxes,
  useClassNames,
} from '@marigold/system';
import { useSlot } from '../utils/useSlot';
import { PanelContext } from './Context';
import { PanelCollapsible } from './PanelCollapsible';
import { PanelCollapsibleContent } from './PanelCollapsibleContent';
import { PanelCollapsibleHeader } from './PanelCollapsibleHeader';
import { PanelContent } from './PanelContent';
import { PanelFooter } from './PanelFooter';
import { PanelHeader } from './PanelHeader';

// Props
// ---------------
interface PanelBaseProps extends Omit<
  HTMLAttributes<HTMLElement>,
  'className' | 'style'
> {
  variant?: 'default' | 'master' | 'admin' | 'destructive' | (string & {});
  size?: 'form' | (string & {});
  /**
   * Content of the panel. Typically a combination of `Panel.Header`,
   * `Panel.Content`, `Panel.Collapsible`, and `Panel.Footer`.
   *
   * `Panel.Header` configures the slot-aware text and button primitives
   * (`<Title>`, `<Description>`, `<Button>`, `<ButtonGroup>`,
   * `<ActionMenu>`, `<LinkButton>`) and lays them out in a grid.
   */
  children: ReactNode;
  /** Accessible label. Required when no `<Title>` is present. */
  'aria-label'?: string;
  /**
   * Base heading level for the panel. A `<Title>` inside `Panel.Header`
   * renders at this level; a `<Title>` inside `Panel.CollapsibleHeader`
   * renders at `headingLevel + 1`.
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
 * Padding applied to every subcomponent (Header, Content, CollapsibleHeader,
 * CollapsibleContent, Footer). Either set `p` for uniform padding, or use
 * `px`/`py` to control the axes separately — setting both forms is a TypeScript
 * error, mirroring the `<Inset>` component's `p` / `px`+`py` split.
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
  ...props
}: PanelProps) => {
  const titleId = useId();
  const classNames = useClassNames({ component: 'Panel', variant, size });
  const [titleSlotRef, hasTitle] = useSlot(!ariaLabel);

  const { px: resolvedPx, py: resolvedPy } = resolveInsetAxes({
    p,
    px,
    py,
    defaultInset: 'square-regular',
  });

  const rootHeadingProps = useMemo(
    () => ({
      slots: {
        title: {
          className: cn('px-(--panel-px)', classNames.title),
          level: headingLevel,
          id: titleId,
          ref: titleSlotRef,
        },
      },
    }),
    [classNames.title, headingLevel, titleId, titleSlotRef]
  );

  const contextValue = useMemo(
    () => ({
      classNames,
      variant,
      titleId,
      headingLevel,
      hasTitle,
      titleSlotRef,
    }),
    [classNames, variant, titleId, headingLevel, hasTitle, titleSlotRef]
  );

  return (
    <Provider
      values={[
        [PanelContext, contextValue],
        [HeadingContext, rootHeadingProps],
      ]}
    >
      <section
        {...props}
        data-panel
        aria-labelledby={
          !ariaLabel && hasTitle ? titleId : props['aria-labelledby']
        }
        aria-label={ariaLabel}
        className={cn(
          'flex flex-col gap-y-(--panel-gap) pt-(--panel-py) pb-(--panel-py) has-[[data-collapsible]:last-child]:pb-0',
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
    </Provider>
  );
};

Panel.Header = PanelHeader;
Panel.Content = PanelContent;
Panel.Collapsible = PanelCollapsible;
Panel.CollapsibleHeader = PanelCollapsibleHeader;
Panel.CollapsibleContent = PanelCollapsibleContent;
Panel.Footer = PanelFooter;
