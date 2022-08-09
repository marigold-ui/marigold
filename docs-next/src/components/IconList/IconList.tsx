import { useState } from 'react';
import {
  Box,
  Button,
  Center,
  Headline,
  Text,
  Tiles,
} from '@marigold/components';
import * as Icons from '@marigold/icons';

export interface IconListProps {
  title: string;
  icons: (keyof typeof Icons)[];
}

export interface IconListItemProps {
  icon: keyof typeof Icons;
}

const IconListItem = ({ icon }: IconListItemProps) => {
  const [isHovered, setHovered] = useState(false);
  const Component = Icons[icon];

  if (!Component) {
    console.warn(`${icon} is not a valid icon!`);
    return null;
  }
  console.log(isHovered);
  return (
    <div>
      <Center>
        <Button
          variant="outline"
          size="full"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <Box css={{ py: 'large-1' }}>
            {isHovered ? <span>hello!</span> : <Component size={48} />}
          </Box>
        </Button>
        <Text variant="caption" size="small">
          {icon}
        </Text>
      </Center>
    </div>
  );
};

export const IconList = ({ title, icons }: IconListProps) => {
  return (
    <Box css={{ width: '100%' }}>
      <Headline level="2">{title}</Headline>
      <Tiles space="small-1" itemMinWidth="120px">
        {icons.map(icon => (
          <IconListItem key={icon} icon={icon} />
        ))}
      </Tiles>
    </Box>
  );
};
