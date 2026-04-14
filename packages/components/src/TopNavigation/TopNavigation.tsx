import type { ReactNode, Ref } from 'react';
import { cn, useClassNames } from '@marigold/system';
import { TopNavigationContext } from './Context';
import { TopNavigationEnd } from './TopNavigationEnd';
import { TopNavigationMiddle } from './TopNavigationMiddle';
import { TopNavigationStart } from './TopNavigationStart';

// Props
// ---------------
export interface TopNavigationProps {
  variant?: string;
  size?: string;
  /**
   * If `true`, the navigation sticks to the top of the viewport on scroll.
   * @default true
   */
  sticky?: boolean;
  /**
   * The children of the component.
   */
  children?: ReactNode;
}

// Component
// ---------------
const TopNavigationBase = ({
  variant,
  size,
  sticky = true,
  children,
  ref,
  ...props
}: TopNavigationProps & { ref?: Ref<HTMLElement> }) => {
  const classNames = useClassNames({
    component: 'TopNavigation',
    variant,
    size,
  });

  return (
    <TopNavigationContext.Provider value={{ variant, size, classNames }}>
      <header
        ref={ref}
        className={cn(
          "grid grid-cols-[auto_1fr_auto] [grid-template-areas:'start_middle_end']",
          'w-full [grid-area:header]',
          sticky && 'bg-background sticky top-0 z-1',
          classNames.container
        )}
        {...props}
      >
        {children}
      </header>
    </TopNavigationContext.Provider>
  );
};

export const TopNavigation = Object.assign(TopNavigationBase, {
  Start: TopNavigationStart,
  Middle: TopNavigationMiddle,
  End: TopNavigationEnd,
});
