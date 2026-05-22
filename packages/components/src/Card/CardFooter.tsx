import type { ReactNode } from 'react';
import { Provider } from 'react-aria-components';
import { cn } from '@marigold/system';
import { ActionButtonContext } from '../ActionButton/Context';
import { ActionGroupContext } from '../ActionGroup/Context';
import { useCardContext } from './CardContext';

// Card footers host labelled CTAs more often than icon-only buttons, so
// cascade `size: 'small'` to both `<ActionButton>` and `<ActionGroup>`
// descendants — keeping the footer visually compact next to the body.
// A bare `<Button>` is intentionally not slot-aware and is unaffected.
const actionProps = { size: 'small' as const };

export interface CardFooterProps {
  /** Content rendered in the card footer, typically actions like buttons or metadata. */
  children?: ReactNode;
  /**
   * Render the footer edge-to-edge horizontally, skipping the Card's horizontal
   * padding.
   * @default false
   */
  bleed?: boolean;
}

export const CardFooter = ({ children, bleed }: CardFooterProps) => {
  const { classNames } = useCardContext();

  return (
    <Provider
      values={[
        [ActionButtonContext, actionProps],
        [ActionGroupContext, actionProps],
      ]}
    >
      <div
        data-card-footer
        className={cn(!bleed && 'px-(--card-px)', classNames.footer)}
      >
        {children}
      </div>
    </Provider>
  );
};
