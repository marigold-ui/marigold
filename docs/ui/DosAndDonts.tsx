'use client';

import type { PropsWithChildren } from 'react';
import { Tiles } from '@marigold/components';
import { cn } from '@marigold/system';

// Shared Child Components
// ---------------
const Container = ({
  variant,
  children,
}: PropsWithChildren<{ variant: 'do' | 'dont' }>) => (
  <div
    className="group grid grid-cols-[1fr] grid-rows-[minmax(0,min-content)_min-content_auto] [grid-template-areas:'figure''title''description']"
    data-type={variant}
  >
    {children}
  </div>
);

const Title = ({ children }: PropsWithChildren) => (
  <div
    className={cn(
      'text-neutral-900 [grid-area:title] dark:text-neutral-900',
      'group-data-[type=do]:border-green-600 group-data-[type=do]:bg-green-50 group-data-[type=dont]:border-red-600 group-data-[type=dont]:bg-red-50',
      'flex items-center gap-2 border-t-4 px-4 pt-4 pb-2 font-bold uppercase'
    )}
  >
    {children}
  </div>
);

export const DoFigure = ({ children }: PropsWithChildren) => (
  <div className="not-prose [grid-area:figure]">{children}</div>
);

export const DoDescription = ({ children }: PropsWithChildren) => (
  <div className="not-prose px-4 pb-4 text-sm text-pretty text-neutral-900 [grid-area:description] *:m-0 *:leading-relaxed group-data-[type=do]:bg-green-50 group-data-[type=dont]:bg-red-50 dark:text-neutral-900 [&_a]:font-medium [&_a]:text-neutral-900 [&_a]:underline [&_a]:decoration-neutral-900/40 [&_a]:underline-offset-4 [&_a:hover]:text-neutral-900 [&_a:hover]:decoration-neutral-900/70 [&_a:visited]:text-neutral-900 [&_code]:rounded [&_code]:border [&_code]:border-neutral-300 [&_code]:bg-neutral-100 [&_code]:px-1 [&_code]:py-0.5 [&_code]:text-[13px] [&_code]:font-normal [&_code]:text-neutral-900">
    {children}
  </div>
);

// Alias for Dont (same components)
export const DontFigure = DoFigure;
export const DontDescription = DoDescription;

// Do
// ---------------
export const Do = ({ children }: PropsWithChildren) => (
  <Container variant="do">
    <Title>
      <svg
        viewBox="0 0 24 24"
        className="size-4 flex-none rounded-full bg-green-600 fill-white p-1"
      >
        <path d="M8.17368 16.6154L3.19528 11.637L1.5 13.3204L8.17368 19.994L22.5 5.66772L20.8167 3.98437L8.17368 16.6154Z"></path>
      </svg>
      <div className="m-0 text-sm font-bold uppercase">Do</div>
    </Title>
    {children}
  </Container>
);

// Dont
// ---------------
export const Dont = ({ children }: PropsWithChildren) => (
  <Container variant="dont">
    <Title>
      <svg
        viewBox="0 0 24 24"
        className="size-4 flex-none rounded-full bg-red-600 fill-white p-1"
      >
        <path d="M19.8281 5.74868L18.2513 4.17188L12 10.4232L5.74868 4.17188L4.17188 5.74868L10.4232 12L4.17188 18.2513L5.74868 19.8281L12 13.5768L18.2513 19.8281L19.8281 18.2513L13.5768 12L19.8281 5.74868Z"></path>
      </svg>
      <div className="m-0 text-sm font-bold uppercase">Don't</div>
    </Title>
    {children}
  </Container>
);

export const GuidelineTiles = ({ children }: PropsWithChildren) => (
  <div className="my-5">
    <Tiles space={5} stretch tilesWidth="300px">
      {children}
    </Tiles>
  </div>
);
