'use client';

import { CSSProperties, FC, ReactNode } from 'react';
import { cn } from '@marigold/system';

interface AnimatedShinyTextProps {
  children: ReactNode;
  className?: string;
  shinyWidth?: number;
}

export const AnimatedShinyText: FC<AnimatedShinyTextProps> = ({
  children,
  className,
  shinyWidth = 100,
}) => {
  return (
    <p
      style={
        {
          '--shiny-width': `${shinyWidth}px`,
        } as CSSProperties
      }
      className={cn(
        'mx-auto max-w-md text-neutral-600/70 dark:text-transparent',
        'animate-shiny-text [background-size:var(--shiny-width)_100%] bg-clip-text [background-position:0_0] bg-no-repeat [transition:background-position_1s_cubic-bezier(.6,.6,0,1)_infinite]',
        'bg-linear-to-r from-transparent via-black/50 via-50% to-transparent',
        'dark:bg-linear-to-r dark:from-transparent dark:via-white/90 dark:via-50% dark:to-transparent',
        className
      )}
    >
      {children}
    </p>
  );
};
