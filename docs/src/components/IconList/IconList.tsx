import { useState, useRef } from 'react';
import { useCopyToClipboard, useDebounce } from 'react-use';

import { Box, Card, Text, Tiles } from '@marigold/components';
import * as Icons from '@marigold/icons';

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
    <div>
      <Card
        variant="hovering"
        onClick={handleClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <Box
          css={{
            display: 'grid',
            placeItems: 'center',
            height: 'large-1',
          }}
        >
          <Box
            css={{
              display: isCopied || isHovered ? 'block' : 'none',
              fontFamily: 'headline',
              fontWeight: 'medium',
              letterSpacing: '0.5px',
              userSelect: 'none',
            }}
          >
            {isCopied ? 'COPIED!' : 'COPY SVG'}
          </Box>
          <Component
            width={48}
            height={48}
            ref={svgRef as any}
            css={{ display: isHovered || isCopied ? 'none' : 'block' }}
          />
        </Box>
      </Card>
      <Text variant="caption" size="small" align="center">
        {icon}
      </Text>
    </div>
  );
};

export const IconList = ({ icons }: IconListProps) => {
  return (
    <Box css={{ width: '100%' }}>
      <Tiles space="medium-1" tilesWidth="7.5rem">
        {icons.map(icon => (
          <IconListItem key={icon} icon={icon} />
        ))}
      </Tiles>
    </Box>
  );
};
