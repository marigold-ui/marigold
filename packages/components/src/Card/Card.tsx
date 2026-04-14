import type { HTMLAttributes, ReactNode } from 'react';
import { cn, useClassNames } from '@marigold/system';
import { CardBody } from './CardBody';
import { CardProvider } from './CardContext';
import { CardFooter } from './CardFooter';
import { CardHeader } from './CardHeader';
import { CardPreview } from './CardPreview';

// Props
// ---------------
export interface CardProps extends Omit<
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
}

// Component
// ---------------
export const Card = ({
  children,
  variant,
  size,
  stretch,
  ...props
}: CardProps) => {
  const classNames = useClassNames({ component: 'Card', variant, size });

  return (
    <CardProvider value={{ classNames }}>
      <div
        {...props}
        className={cn(
          'grid',
          "[grid-template-areas:'preview'_'header'_'body'_'footer']",
          'grid-rows-[auto_auto_1fr_auto]',
          stretch ? '' : 'w-fit',
          classNames.container
        )}
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
