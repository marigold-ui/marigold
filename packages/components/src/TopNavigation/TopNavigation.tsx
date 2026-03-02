import type { ForwardRefExoticComponent, ReactNode, Ref } from 'react';
import { forwardRef } from 'react';
import { cn, useClassNames, useSmallScreen } from '@marigold/system';
import { TopNavigationProvider } from './Context';
import { TopNavigationEnd } from './TopNavigationEnd';
import { TopNavigationMiddle } from './TopNavigationMiddle';
import { TopNavigationStart } from './TopNavigationStart';

// Props
// ---------------
export interface TopNavigationProps {
  /**
   * Accessible label for the navigation landmark.
   */
  'aria-label': string;
  variant?: string;
  size?: string;
  /**
   * If `true`, the navigation sticks to the top of the viewport on scroll.
   * @default false
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
    { variant, size, sticky, children, ...props }: TopNavigationProps,
    ref: Ref<HTMLElement>
  ) => {
    const isSmallScreen = useSmallScreen();
    const classNames = useClassNames({
      component: 'TopNavigation',
      variant,
      size,
    });

    return (
      <TopNavigationProvider value={{ variant, size }}>
        <nav
          ref={ref}
          {...props}
          className={cn(
            'grid',
            isSmallScreen
              ? 'grid-cols-[1fr_auto]'
              : 'grid-cols-[auto_1fr_auto]',
            sticky && 'sticky top-0 z-1',
            classNames.container
          )}
          style={{
            gridTemplateAreas: isSmallScreen
              ? '"start end" "middle middle"'
              : '"start middle end"',
          }}
        >
          {children}
        </nav>
      </TopNavigationProvider>
    );
  }
) as TopNavigationComponent;

_TopNavigation.Start = TopNavigationStart;
_TopNavigation.Middle = TopNavigationMiddle;
_TopNavigation.End = TopNavigationEnd;

export { _TopNavigation as TopNavigation };
