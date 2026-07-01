import type { ReactNode } from 'react';
import { useMemo } from 'react';
import { HeadingContext, Provider, TextContext } from 'react-aria-components';
import { cn } from '@marigold/system';
import { useCardContext } from './CardContext';

export interface CardHeaderProps {
  /**
   * Content of the header. Typically a `<Title>` and an optional
   * `<Description>`.
   */
  children?: ReactNode;
}

export const CardHeader = ({ children }: CardHeaderProps) => {
  const { classNames, headingLevel, titleId, titleSlotRef } = useCardContext();

  // Republishes the title slot config from the Card root with the header's
  // theme class. `level`, `id`, and `ref` are re-supplied (rather than
  // inherited) because Provider values do not merge — anything we omit
  // here would be lost for `<Title>` inside `<Card.Header>`.
  const headingProps = useMemo(
    () => ({
      slots: {
        title: {
          className: classNames.title,
          level: headingLevel,
          id: titleId,
          ref: titleSlotRef,
        },
      },
    }),
    [classNames.title, headingLevel, titleId, titleSlotRef]
  );

  const textProps = useMemo(
    () => ({
      slots: {
        description: {
          className: classNames.description,
          elementType: 'p' as const,
        },
      },
    }),
    [classNames.description]
  );

  return (
    <Provider
      values={[
        [HeadingContext, headingProps],
        [TextContext, textProps],
      ]}
    >
      <div data-card-header className={cn('px-(--card-px)', classNames.header)}>
        {children}
      </div>
    </Provider>
  );
};
