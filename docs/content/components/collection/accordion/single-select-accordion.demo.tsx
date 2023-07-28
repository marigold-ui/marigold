import { Accordion, Text, TextField } from '@marigold/components';

export default () => {
  return (
    <Accordion defaultExpandedKeys={[1]}>
      <Accordion.Item key={1} title="Some Imformations">
        <TextField label="Name" />
      </Accordion.Item>
      <Accordion.Item key={2} title="Personal Settings">
        <Text>Here is some useful text with some settings to choose</Text>
      </Accordion.Item>
      <Accordion.Item key={3} title="Billing Adress">
        <Text>Some more informations</Text>
      </Accordion.Item>
    </Accordion>
  );
};
