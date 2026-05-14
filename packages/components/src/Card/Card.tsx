import type { HTMLAttributes, ReactNode } from 'react';
import type {
  InsetSpacingTokens,
  PaddingSpacingTokens,
  SpaceProp,
  SpacingTokens,
} from '@marigold/system';
import { cn, createSpacingVar, useClassNames } from '@marigold/system';
import { CardBody } from './CardBody';
import { CardProvider } from './CardContext';
import { CardFooter } from './CardFooter';
import { CardHeader } from './CardHeader';
import { CardPreview } from './CardPreview';

// Props
// ---------------
interface CardBaseProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  'className' | 'style'
> {
  children?: ReactNode;
  variant?: string;
  size?: string;

  /**
   * Stretch to fill space horizontally.
   * @default false
   */
  stretch?: boolean;

  /**
   * Spacing between Card slots (Preview, Header, Body, Footer).
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
  space = 'regular',
  p,
  px,
  py,
  ...props
}: CardProps) => {
  const classNames = useClassNames({ component: 'Card', variant, size });

  const inset = p ?? 'square-regular';
  const resolvedPx = px ?? `${inset}-x`;
  const resolvedPy = py ?? `${inset}-y`;

  return (
    <CardProvider value={{ classNames }}>
      <div
        {...props}
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
      </div>
    </CardProvider>
  );
};

Card.Header = CardHeader;
Card.Body = CardBody;
Card.Footer = CardFooter;
Card.Preview = CardPreview;
