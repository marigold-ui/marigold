import { useState, useRef } from 'react';
import { useCopyToClipboard } from 'react-use';

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

  const svgRef = useRef();
  const [, copyToClipboard] = useCopyToClipboard();
  const [isHovered, setHovered] = useState(false);

  if (!Component) {
    console.warn(`${icon} is not a valid icon!`);
    return null;
  }

  return (
    <div>
      <Card
        variant="icon"
        onClick={() => copyToClipboard('hello!')}
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
              display: isHovered ? 'block' : 'none',
              fontFamily: 'headline',
              fontWeight: 'medium',
              letterSpacing: '0.5px',
            }}
          >
            COPY SVG
          </Box>
          <Component size={48} ref={svgRef} />
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
      <Tiles space="small-1" itemMinWidth="7.5rem">
        {icons.map(icon => (
          <IconListItem key={icon} icon={icon} />
        ))}
      </Tiles>
    </Box>
  );
};
