'use-client';

import { Icons, Tiles, cn } from '@/ui';
import { Card } from 'fumadocs-ui/components/card';
import type { LucideProps } from 'lucide-react';
import type { ComponentType } from 'react';
import { useRef, useState } from 'react';
import { useCopyToClipboard, useDebounce } from 'react-use';

export interface IconListProps {
  icons: string[];
}

export interface IconListItemProps {
  icon: string;
}

const IconListItem = ({ icon }: IconListItemProps) => {
  const Component = (
    Icons as unknown as Record<string, ComponentType<LucideProps>>
  )[icon];

  const svgRef = useRef<SVGElement>(undefined);
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
      <button onClick={handleClick}>
        <Card className="w-full p-3" title="">
          <div className="relative grid h-24 w-full place-items-center">
            <div
              className={cn(
                isCopied ? 'opacity-100' : 'opacity-0',
                'bg-fd-card absolute flex size-full items-center justify-center font-medium tracking-wider whitespace-nowrap select-none'
              )}
            >
              {isCopied ? 'COPIED!' : 'COPY SVG'}
            </div>
            <Component width={48} height={48} ref={svgRef as any} />
          </div>
        </Card>
      </button>
      <p className="text-center text-sm">{icon}</p>
    </div>
  );
};

export const IconList = ({ icons }: IconListProps) => (
  <div className="w-full">
    <Tiles tilesWidth="7.5rem" space={4}>
      {icons.map(icon => (
        <IconListItem key={icon} icon={icon} />
      ))}
    </Tiles>
  </div>
);
