import { Accordion, Text, TextField } from '@marigold/components';

export default () => {
  return (
    <Accordion defaultExpandedKeys={[1]}>
      <Accordion.Item id={1} key={1}>
        <Accordion.Header title="Some Imformations" />
        <Accordion.Content>
          <TextField label="Name" />
        </Accordion.Content>
      </Accordion.Item>
      <Accordion.Item id={2} key={2}>
        <Accordion.Header title="Personal Settings" />
        <Accordion.Content>
          <Text>Here is some useful text with some settings to choose</Text>
        </Accordion.Content>
      </Accordion.Item>
      <Accordion.Item id={3} key={3}>
        <Accordion.Header title="Billing Adress" />
        <Accordion.Content>
          <Text>Some more informations</Text>
        </Accordion.Content>
      </Accordion.Item>
    </Accordion>
  );
};
