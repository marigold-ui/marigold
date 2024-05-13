'use-client';

import { Card, Text, Tiles, cn } from '@/ui';
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
  const [isHovered, setHovered] = useState(false);
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
      <Card
        p={3}
        variant="hovering"
        onClick={handleClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className="relative grid h-24 place-items-center">
          <div
            className={cn(
              isCopied || isHovered ? 'opacity-1' : 'opacity-0',
              'absolute flex size-full select-none items-center justify-center whitespace-nowrap bg-white font-medium tracking-wider'
            )}
          >
            {isCopied ? 'COPIED!' : 'COPY SVG'}
          </div>
          <Component width={48} height={48} ref={svgRef as any} />
        </div>
      </Card>
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
