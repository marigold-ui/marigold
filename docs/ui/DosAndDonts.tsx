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
      '[grid-area:title]',
      'group-data-[type=do]:bg-bg-success group-data-[type=do]:border-border-success group-data-[type=dont]:bg-bg-error group-data-[type=dont]:border-border-error',
      'flex items-center gap-2 border-t-4 px-4 pb-2 pt-4 font-bold uppercase'
    )}
  >
    {children}
  </div>
);

const Figure = ({ children }: PropsWithChildren) => (
  <div className="not-prose [grid-area:figure]">{children}</div>
);

const Description = ({ children }: PropsWithChildren) => (
  <div className="group-data-[type=do]:bg-bg-success group-data-[type=dont]:bg-bg-error px-4 pb-4 [grid-area:description] *:m-0">
    {children}
  </div>
);

// Do
// ---------------
export const Do = ({ children }: PropsWithChildren) => (
  <Container variant="do">
    <Title>
      <svg
        width="10px"
        height="10px"
        viewBox="0 0 24 24"
        className="size-5 flex-none rounded-full bg-green-600 fill-white p-1"
      >
        <path d="M8.17368 16.6154L3.19528 11.637L1.5 13.3204L8.17368 19.994L22.5 5.66772L20.8167 3.98437L8.17368 16.6154Z"></path>
      </svg>
      <h5 className="m-0 font-bold uppercase">Do</h5>
    </Title>
    {children}
  </Container>
);

Do.Figure = Figure;
Do.Description = Description;

// Dont
// ---------------
export const Dont = ({ children }: PropsWithChildren) => (
  <Container variant="dont">
    <Title>
      <svg
        width="10px"
        height="10px"
        viewBox="0 0 24 24"
        className="size-5 flex-none rounded-full bg-red-600 fill-white p-1"
      >
        <path d="M19.8281 5.74868L18.2513 4.17188L12 10.4232L5.74868 4.17188L4.17188 5.74868L10.4232 12L4.17188 18.2513L5.74868 19.8281L12 13.5768L18.2513 19.8281L19.8281 18.2513L13.5768 12L19.8281 5.74868Z"></path>
      </svg>
      <h5 className="m-0 font-bold uppercase">Don't</h5>
    </Title>
    {children}
  </Container>
);

Dont.Figure = Figure;
Dont.Description = Description;

export const GuidelineTiles = ({ children }: PropsWithChildren) => (
  <p>
    <Tiles space={5} stretch tilesWidth="300px">
      {children}
    </Tiles>
  </p>
);
