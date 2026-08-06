import {
  Accordion,
  Badge,
  Button,
  Drawer,
  Inline,
  Stack,
  Text,
} from '@marigold/components';
import type { DrawerProps } from '@marigold/components';

const facets = [
  {
    name: 'Genre',
    options: [
      { value: 'Concert', count: 128 },
      { value: 'Theatre', count: 64 },
      { value: 'Comedy', count: 42 },
    ],
  },
  {
    name: 'Format',
    options: [
      { value: 'In person', count: 176 },
      { value: 'Livestream', count: 58 },
    ],
  },
  {
    name: 'Availability',
    options: [
      { value: 'On sale', count: 149 },
      { value: 'Waiting list', count: 31 },
      { value: 'Sold out', count: 54 },
    ],
  },
] as const;

export default function (props: DrawerProps) {
  return (
    <Drawer.Trigger>
      <Button>Filter events</Button>
      <Drawer {...props} size="medium" role="search">
        <Drawer.Title>Filter events</Drawer.Title>
        <Drawer.Content bleed>
          <Accordion defaultExpandedKeys={['Genre']}>
            {facets.map(facet => (
              <Accordion.Item key={facet.name} id={facet.name}>
                <Accordion.Header>
                  <Inline space={2} alignY="center">
                    <Text>{facet.name}</Text>
                    <Badge>{facet.options.length}</Badge>
                  </Inline>
                </Accordion.Header>
                <Accordion.Content>
                  <Stack space={2}>
                    {facet.options.map(option => (
                      <Inline
                        key={option.value}
                        alignX="between"
                        alignY="center"
                      >
                        <Text fontSize="sm">{option.value}</Text>
                        <Text fontSize="sm" color="secondary">
                          {option.count}
                        </Text>
                      </Inline>
                    ))}
                  </Stack>
                </Accordion.Content>
              </Accordion.Item>
            ))}
          </Accordion>
        </Drawer.Content>
        <Drawer.Actions>
          <Button slot="close">Reset</Button>
          <Button slot="close" variant="primary">
            Apply
          </Button>
        </Drawer.Actions>
      </Drawer>
    </Drawer.Trigger>
  );
}
