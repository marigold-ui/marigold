import { Accordion, Button, Inline, Stack, Text } from '@marigold/components';

const actions = (
  <Inline space={2}>
    <Button onPress={() => {}}>Edit</Button>
    <Button onPress={() => {}}>Delete</Button>
  </Inline>
);

const body = (
  <Stack space={4}>
    <Text>
      Scroll inside this box: the header stays pinned to the top while the text
      below moves underneath it.
    </Text>
    <Text>
      Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
      eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
      voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet
      clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit
      amet.
    </Text>
    <Text>
      Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse
      molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero
      eros et accumsan et iusto odio dignissim qui blandit praesent luptatum
      zzril delenit augue duis dolore te feugait nulla facilisi.
    </Text>
    <Text>
      Nam liber tempor cum soluta nobis eleifend option congue nihil imperdiet
      doming id quod mazim placerat facer possim assum. Ut wisi enim ad minim
      veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut
      aliquip ex ea commodo consequat.
    </Text>
  </Stack>
);

export default () => {
  return (
    <div style={{ height: 300, overflowY: 'auto', padding: '4px' }}>
      <Accordion
        stickyHeader
        iconPosition="left"
        allowsMultipleExpanded
        defaultExpandedKeys={['1', '2']}
      >
        <Accordion.Item id="1">
          <Accordion.Header actions={actions}>
            Subscription 2025/2026
          </Accordion.Header>
          <Accordion.Content>{body}</Accordion.Content>
        </Accordion.Item>
        <Accordion.Item id="2">
          <Accordion.Header actions={actions}>
            Season Pass 2026/2027
          </Accordion.Header>
          <Accordion.Content>{body}</Accordion.Content>
        </Accordion.Item>
      </Accordion>
    </div>
  );
};
