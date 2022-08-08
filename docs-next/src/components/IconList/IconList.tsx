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

export const IconList = ({ title, icons }: IconListProps) => {
  return (
    <Box css={{ width: '100%' }}>
      <Headline level="2">{title}</Headline>
      <Tiles space="small-1" itemMinWidth="100px">
        {icons.map(icon => {
          const Component = Icons[icon];
          return (
            <Center key={icon} space="small-1">
              <Button variant="outline" size="large">
                <Component size={32} />
              </Button>
              <Text variant="caption" size="small">
                {icon}
              </Text>
            </Center>
          );
        })}
      </Tiles>
    </Box>
  );
};
