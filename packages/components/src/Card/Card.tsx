import { ReactNode } from 'react';
import type {
  InsetSpacingTokens,
  PaddingSpacingTokens,
  SpaceProp,
  SpacingTokens,
} from '@marigold/system';
import { cn, createSpacingVar, useClassNames } from '@marigold/system';

// Props
// ---------------
export interface CardProps {
  children?: ReactNode;
  variant?: string;
  size?: string;

  /**
   * Stretch to fill space horizontally.
   * @default false
   */
  stretch?: boolean;

  /**
   * Set the spacing between child elements. You can see allowed tokens [here](../../foundations/spacing#relation-space).
   */
  space?: SpaceProp<SpacingTokens>['space'];

  /**
   * Padding of the component. You can see allowed tokens [here](../../foundations/spacing#inset-padding).
   */
  p?: SpaceProp<InsetSpacingTokens>['space'];

  /**
   * Padding horizontal (left and right) of the component. You can see allowed tokens [here](../../foundations/spacing#inset-padding).
   */
  px?: SpaceProp<PaddingSpacingTokens>['space'];

  /**
   * Padding vertical (top and bottom) of the component. You can see allowed tokens [here](../../foundations/spacing#inset-padding).
   */
  py?: SpaceProp<PaddingSpacingTokens>['space'];

  /**
   * Set the right padding for the element. You can see allowed tokens [here](../../foundations/spacing#inset-padding).
   */
  pr?: SpaceProp<PaddingSpacingTokens>['space'];

  /**
   * Set the left padding for the element. You can see allowed tokens [here](../../foundations/spacing#inset-padding).
   */
  pl?: SpaceProp<PaddingSpacingTokens>['space'];

  /**
   * Set the top padding for the element. You can see allowed tokens [here](../../foundations/spacing#inset-padding).
   */
  pt?: SpaceProp<PaddingSpacingTokens>['space'];

  /**
   * Set the bottom padding for the element. You can see allowed tokens [here](../../foundations/spacing#inset-padding).
   */
  pb?: SpaceProp<PaddingSpacingTokens>['space'];
}

// Component
// ---------------
export const Card = ({
  children,
  variant,
  size,
  space = '0',
  stretch,
  p,
  px,
  py,
  pt,
  pb,
  pl,
  pr,
  ...props
}: CardProps) => {
  const classNames = useClassNames({ component: 'Card', variant, size });
  return (
    <div
      {...props}
      className={cn(
        'flex flex-col gap-y-(--space)',
        stretch ? '' : 'w-fit',
        classNames,
        p !== undefined && 'p-(--p)',
        px !== undefined && 'px-(--px)',
        py !== undefined && 'py-(--py)',
        pr !== undefined && 'pr-(--pr)',
        pl !== undefined && 'pl-(--pl)',
        pb !== undefined && 'pb-(--pb)',
        pt !== undefined && 'pt-(--pt)'
      )}
      style={{
        ...createSpacingVar('space', `${space}`),
        ...(p !== undefined ? createSpacingVar('p', `${p}`) : {}),
        ...(px !== undefined ? createSpacingVar('px', `${px}`) : {}),
        ...(py !== undefined ? createSpacingVar('py', `${py}`) : {}),
        ...(pr !== undefined ? createSpacingVar('pr', `${pr}`) : {}),
        ...(pl !== undefined ? createSpacingVar('pl', `${pl}`) : {}),
        ...(pb !== undefined ? createSpacingVar('pb', `${pb}`) : {}),
        ...(pt !== undefined ? createSpacingVar('pt', `${pt}`) : {}),
      }}
    >
      {children}
    </div>
  );
};
