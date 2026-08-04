import {
  Accordion,
  Badge,
  Description,
  Inline,
  Panel,
  Stack,
  Text,
  Title,
} from '@marigold/components';

const props = [
  {
    name: 'variant',
    total: 1284,
    values: [
      { value: 'primary', count: 812 },
      { value: 'secondary', count: 341 },
      { value: 'destructive', count: 131 },
    ],
  },
  {
    name: 'size',
    total: 1284,
    values: [
      { value: 'default', count: 1043 },
      { value: 'small', count: 241 },
    ],
  },
  {
    name: 'disabled',
    total: 1284,
    values: [
      { value: 'false', count: 1198 },
      { value: 'true', count: 86 },
    ],
  },
] as const;

export default () => (
  <Panel>
    <Panel.Header>
      <Title>Prop values</Title>
      <Description>
        Usage across all Button instances, last 30 days.
      </Description>
    </Panel.Header>
    <Panel.Content bleed>
      <Accordion defaultExpandedKeys={['variant']}>
        {props.map(prop => (
          <Accordion.Item key={prop.name} id={prop.name}>
            <Accordion.Header>
              <Inline space={2} alignY="center">
                <Text>{prop.name}</Text>
                <Badge>{prop.values.length}</Badge>
              </Inline>
            </Accordion.Header>
            <Accordion.Content>
              <Stack space={2}>
                {prop.values.map(entry => (
                  <Inline key={entry.value} alignX="between" alignY="center">
                    <Text fontSize="sm">{entry.value}</Text>
                    <Text fontSize="sm" color="secondary">
                      {Math.round((entry.count / prop.total) * 100)}%
                    </Text>
                  </Inline>
                ))}
              </Stack>
            </Accordion.Content>
          </Accordion.Item>
        ))}
      </Accordion>
    </Panel.Content>
  </Panel>
);
