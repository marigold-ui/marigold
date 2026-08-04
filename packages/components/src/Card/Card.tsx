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
import { CardContent } from './CardContent';
import { CardContext } from './CardContext';
import { CardFooter } from './CardFooter';
import { CardHeader } from './CardHeader';
import { CardMedia } from './CardMedia';

// Props
// ---------------
interface CardBaseProps extends Omit<
  HTMLAttributes<HTMLElement>,
  'className' | 'style'
> {
  /**
   * Content of the card. Typically a combination of `Card.Media`,
   * `Card.Header`, `Card.Content`, and `Card.Footer`.
   *
   * `Card.Header` configures the slot-aware text primitives `<Title>`
   * and `<Description>`.
   */
  children?: ReactNode;
  variant?: 'default' | 'master' | 'admin' | (string & {});
  size?: string;

  /**
   * Base heading level for the card. A `<Title>` inside `Card.Header`
   * renders at this level.
   * @default 3
   */
  headingLevel?: 2 | 3 | 4 | 5 | 6;

  /**
   * Stretch to fill space horizontally.
   * @default false
   */
  stretch?: boolean;

  /**
   * Spacing between Card slots (Media, Header, Content, Footer).
   * @default 'regular'
   */
  space?: SpaceProp<SpacingTokens>['space'];
}

/**
 * Padding applied to the Card. Either set `p` for uniform padding, or use
 * `px`/`py` to control the axes separately — setting both forms is a TypeScript
 * error, mirroring the `<Panel>` component's `p` / `px`+`py` split.
 */
type CardPaddingProps =
  | {
      /** Padding on all sides. Cannot be combined with `px` or `py`. */
      p?: SpaceProp<InsetSpacingTokens>['space'];
      px?: never;
      py?: never;
    }
  | {
      p?: never;
      /** Horizontal padding applied to every slot. */
      px?: SpaceProp<PaddingSpacingTokens>['space'];
      /** Vertical padding applied at the top and bottom of the card. */
      py?: SpaceProp<PaddingSpacingTokens>['space'];
    };

export type CardProps = CardBaseProps & CardPaddingProps;

// Component
// ---------------
export const Card = ({
  children,
  variant,
  size,
  stretch,
  'aria-label': ariaLabel,
  headingLevel = 3,
  space = 'regular',
  p,
  px,
  py,
  ...props
}: CardProps) => {
  const titleId = useId();
  const classNames = useClassNames({ component: 'Card', variant, size });
  const [titleSlotRef, hasTitle] = useSlot(!ariaLabel);

  if (process.env.NODE_ENV !== 'production' && !ariaLabel && !hasTitle) {
    console.warn(
      '[Card] Renders an unnamed `article` landmark. Provide a `<Title>` ' +
        '(inside or outside `Card.Header`) or an `aria-label` so screen ' +
        'reader users can identify the card.'
    );
  }

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
          className: cn('px-(--card-px)', classNames.title),
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

  return (
    <Provider
      values={[
        [CardContext, contextValue],
        [HeadingContext, rootHeadingProps],
      ]}
    >
      <article
        {...props}
        aria-labelledby={
          !ariaLabel && hasTitle ? titleId : props['aria-labelledby']
        }
        aria-label={ariaLabel}
        className={cn(
          'flex flex-col overflow-hidden',
          'gap-y-(--card-gap) py-(--card-py)',
          stretch ? '' : 'w-fit',
          classNames.container
        )}
        style={{
          ...createSpacingVar('card-px', `${resolvedPx}`),
          ...createSpacingVar('card-py', `${resolvedPy}`),
          ...createSpacingVar('card-gap', `${space}`),
        }}
      >
        {children}
      </article>
    </Provider>
  );
};

Card.Header = CardHeader;
Card.Content = CardContent;
Card.Footer = CardFooter;
Card.Media = CardMedia;
