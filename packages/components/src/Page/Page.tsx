import type { ReactNode } from 'react';
import { useEffect, useId, useMemo } from 'react';
import { HeadingContext, Provider } from 'react-aria-components';
import type {
  InsetSpacingTokens,
  PaddingSpacingTokens,
  SpaceProp,
  SpacingTokens,
} from '@marigold/system';
import { cn, createSpacingVar, useClassNames } from '@marigold/system';
import { useSlot } from '../utils/useSlot';
import { PageContext } from './Context';
import { PageContent } from './PageContent';
import { PageHeader } from './PageHeader';

// Props
// ---------------
interface PageBaseProps {
  /**
   * Content of the page. Typically a `<Page.Header>` followed by `<Panel>`s
   * (and other page sections).
   */
  children: ReactNode;
  /** Accessible label for the page's `<main>`. Required when no `<Title>` is present. */
  'aria-label'?: string;
  /**
   * Base heading level for the page. A `<Title>` inside `<Page.Header>` (or a
   * bare `<Title>` directly under `<Page>`) renders at this level.
   * @default 1
   */
  headingLevel?: 1 | 2 | 3 | 4 | 5 | 6;
  /**
   * Vertical rhythm between page sections (the `<Page.Header>` and the
   * `<Panel>`s below it).
   * @default 'group'
   */
  space?: SpaceProp<SpacingTokens>['space'];
}

/**
 * Padding around the page content. Either set `p` for uniform padding, or use
 * `px`/`py` to control the axes separately — setting both forms is a TypeScript
 * error, mirroring the `<Inset>` component's `p` / `px`+`py` split.
 */
type PagePaddingProps =
  | {
      /** Padding on all sides. Cannot be combined with `px` or `py`. */
      p?: SpaceProp<InsetSpacingTokens>['space'];
      px?: never;
      py?: never;
    }
  | {
      p?: never;
      /** Horizontal padding. */
      px?: SpaceProp<PaddingSpacingTokens>['space'];
      /** Vertical padding. */
      py?: SpaceProp<PaddingSpacingTokens>['space'];
    };

export type PageProps = PageBaseProps & PagePaddingProps;

// Component
// ---------------
/**
 * `<Page>` is the content area of an `<AppShell>`. It renders the `<main>`
 * landmark in the grid's `main` area and owns the page's padding and vertical
 * rhythm. It does not own scroll (the document scrolls) and does not enforce a
 * max-width — content width is driven by `<Panel size="form">`.
 */
export const Page = ({
  children,
  'aria-label': ariaLabel,
  headingLevel = 1,
  space = 'group',
  p,
  px,
  py,
}: PageProps) => {
  const titleId = useId();
  const classNames = useClassNames({ component: 'Page' });
  const [titleSlotRef, hasTitle] = useSlot(!ariaLabel);

  const inset = p ?? 'square-relaxed';
  const resolvedPx = px ?? `${inset}-x`;
  const resolvedPy = py ?? `${inset}-y`;

  const rootHeadingProps = useMemo(
    () => ({
      slots: {
        title: {
          className: cn(classNames.title),
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
      titleId,
      headingLevel,
      hasTitle,
      titleSlotRef,
    }),
    [classNames, titleId, headingLevel, hasTitle, titleSlotRef]
  );

  // The `<main>` landmark must have an accessible name. It is named by the
  // page `<Title>` (via `aria-labelledby`); when there is no title the consumer
  // must pass `aria-label`. Warn in development if neither is present so the
  // landmark is never silently unnamed.
  useEffect(() => {
    if (process.env.NODE_ENV !== 'production' && !hasTitle && !ariaLabel) {
      console.error(
        '<Page>: the `<main>` landmark has no accessible name. Either render a ' +
          '`<Title>` inside the page (e.g. in `<Page.Header>`) or pass an ' +
          '`aria-label` to `<Page>`.'
      );
    }
  }, [hasTitle, ariaLabel]);

  return (
    <Provider
      values={[
        [PageContext, contextValue],
        [HeadingContext, rootHeadingProps],
      ]}
    >
      <main
        data-page
        aria-labelledby={hasTitle ? titleId : undefined}
        aria-label={!hasTitle ? ariaLabel : undefined}
        className={cn(
          'flex min-w-0 flex-col gap-y-(--page-gap) px-(--page-px) py-(--page-py) [grid-area:main]',
          classNames.root
        )}
        style={{
          ...createSpacingVar('page-px', `${resolvedPx}`),
          ...createSpacingVar('page-py', `${resolvedPy}`),
          ...createSpacingVar('page-gap', `${space}`),
        }}
      >
        {children}
      </main>
    </Provider>
  );
};

Page.Header = PageHeader;
Page.Content = PageContent;
