'use client';
import { type ComponentProps } from 'react';
import { cn } from '@marigold/system';

export const DocsBody = (props: ComponentProps<'div'>) => {
  return (
    <div {...props} className={cn('prose', props.className)}>
      {props.children}
    </div>
  );
};

export const DocsDescription = (props: ComponentProps<'p'>) => {
  // don't render if no description provided
  if (props.children === undefined) return null;

  return (
    <p
      {...props}
      className={cn('text-fd-muted-foreground mb-8 text-lg', props.className)}
    >
      {props.children}
    </p>
  );
};

export const DocsTitle = (props: ComponentProps<'h1'>) => {
  return (
    <h1 {...props} className={cn('text-3xl font-semibold', props.className)}>
      {props.children}
    </h1>
  );
};
