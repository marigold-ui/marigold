'use-client';

import { Button, Card, Text, Tiles, cn } from '@/ui';
import { Icons } from '@/ui';
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

  const svgRef = useRef<SVGElement>();
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
    <div className="mt-2">
      <Button onPress={handleClick} className="size-full h-auto p-0">
        <Card p={3} variant="hovering">
          <div className="relative grid h-24 place-items-center">
            <div
              className={cn(
                isCopied ? 'opacity-1' : 'opacity-0',
                'bg-bg-surface absolute flex size-full select-none items-center justify-center whitespace-nowrap font-medium tracking-wider'
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
