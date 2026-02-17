'use-client';

import { Button, Icons, Text, Tiles, cn } from '@/ui';
import { Card } from 'fumadocs-ui/components/card';
import { useRef, useState } from 'react';
import { useCopyToClipboard, useDebounce } from 'react-use';

export interface IconListProps {
  icons: (keyof typeof Icons)[];
}

export interface IconListItemProps {
  icon: keyof typeof Icons;
}

const IconListItem = ({ icon }: IconListItemProps) => {
  const Component = Icons[icon];

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
      <Button onPress={handleClick}>
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
            <Component width={48} height={48} ref={svgRef as any} />
          </div>
        </Card>
      </Button>
      <Text size="small" align="center">
        {icon}
      </Text>
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
