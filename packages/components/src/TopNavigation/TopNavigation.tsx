import type { ForwardRefExoticComponent, ReactNode, Ref } from 'react';
import { forwardRef } from 'react';
import { cn, useClassNames } from '@marigold/system';
import { TopNavigationProvider } from './Context';
import { TopNavigationCenter } from './TopNavigationCenter';
import { TopNavigationEnd } from './TopNavigationEnd';
import { TopNavigationStart } from './TopNavigationStart';

// Props
// ---------------
export interface TopNavigationProps {
  'aria-label': string;
  variant?: string;
  size?: string;
  sticky?: boolean;
  children?: ReactNode;
}

// Component
// ---------------
interface TopNavigationComponent extends ForwardRefExoticComponent<
  TopNavigationProps & React.RefAttributes<HTMLElement>
> {
  Start: typeof TopNavigationStart;
  Center: typeof TopNavigationCenter;
  End: typeof TopNavigationEnd;
}

const _TopNavigation = forwardRef(
  (
    { variant, size, sticky, children, ...props }: TopNavigationProps,
    ref: Ref<HTMLElement>
  ) => {
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
            'grid grid-cols-[auto_1fr_auto] [grid-template-areas:"start_center_end"]',
            sticky && 'sticky top-0 z-1',
            classNames.container
          )}
        >
          {children}
        </nav>
      </TopNavigationProvider>
    );
  }
) as TopNavigationComponent;

_TopNavigation.Start = TopNavigationStart;
_TopNavigation.Center = TopNavigationCenter;
_TopNavigation.End = TopNavigationEnd;

export { _TopNavigation as TopNavigation };
