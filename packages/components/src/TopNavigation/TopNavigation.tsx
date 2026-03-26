import type { ForwardRefExoticComponent, ReactNode, Ref } from 'react';
import { forwardRef } from 'react';
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
interface TopNavigationComponent extends ForwardRefExoticComponent<
  TopNavigationProps & React.RefAttributes<HTMLElement>
> {
  Start: typeof TopNavigationStart;
  Middle: typeof TopNavigationMiddle;
  End: typeof TopNavigationEnd;
}

const _TopNavigation = forwardRef(
  (
    { variant, size, sticky = true, children, ...props }: TopNavigationProps,
    ref: Ref<HTMLElement>
  ) => {
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
            'grid grid-cols-[auto_1fr_auto] [grid-template-areas:"start_middle_end"]',
            'w-full [grid-area:header]',
            sticky && 'sticky top-0 z-1',
            classNames.container
          )}
          {...props}
        >
          {children}
        </header>
      </TopNavigationContext.Provider>
    );
  }
) as TopNavigationComponent;

_TopNavigation.Start = TopNavigationStart;
_TopNavigation.Middle = TopNavigationMiddle;
_TopNavigation.End = TopNavigationEnd;

export { _TopNavigation as TopNavigation };
