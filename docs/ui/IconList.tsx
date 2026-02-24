'use client';

import { cn } from '@/lib/cn';
import { Card } from 'fumadocs-ui/components/card';
import { useRef, useState } from 'react';
import { useCopyToClipboard, useDebounce } from 'react-use';
import * as Icons from '@marigold/icons';

export interface IconListProps {
  icons: (keyof typeof Icons)[];
}

export interface IconListItemProps {
  icon: keyof typeof Icons;
}

const IconListItem = ({ icon }: IconListItemProps) => {
  const Component = Icons[icon];

  const svgRef = useRef<SVGSVGElement>(null);
  const [isCopied, setCopied] = useState(false);
  const [, copyToClipboard] = useCopyToClipboard();
  const [isReady, cancel] = useDebounce(() => setCopied(false), 2000, [
    isCopied,
  ]);

  if (!Component) {
    console.warn(`${icon} is not a valid icon!`);
    return null;
  }

  const handleClick = () => {
    if (isReady()) {
      cancel();
    }

    // Get SVG HTML and remove class attribute
    const svg = svgRef.current!.outerHTML.replace(
      / class="[a-zA-Z0-9:;.\s()\-,]*"/,
      ''
    );
    copyToClipboard(svg);
    setCopied(true);
  };

  return (
    <div className="mt-2 [&>button]:h-auto [&>button]:w-full [&>button]:p-0">
      <button
        type="button"
        onClick={handleClick}
        className="border-border-default bg-bg-surface hover:bg-bg-surface-hover focus-visible:ring-border-focus cursor-pointer rounded-md border focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
      >
        <Card className="w-full p-3" title="">
          <div className="relative grid h-24 w-full place-items-center">
            <div
              className={cn(
                isCopied ? 'opacity-100' : 'opacity-0',
                'bg-bg-surface absolute flex size-full items-center justify-center font-medium tracking-wider whitespace-nowrap select-none'
              )}
            >
              {isCopied ? 'COPIED!' : 'COPY SVG'}
            </div>
            <Component width={48} height={48} ref={svgRef} />
          </div>
        </Card>
      </button>
      <span className="block text-center text-sm">{icon}</span>
    </div>
  );
};

export const IconList = ({ icons }: IconListProps) => (
  <div className="grid w-full grid-cols-[repeat(auto-fill,minmax(7.5rem,1fr))] gap-4 *:min-w-0">
    {icons.map(icon => (
      <IconListItem key={icon} icon={icon} />
    ))}
  </div>
);
