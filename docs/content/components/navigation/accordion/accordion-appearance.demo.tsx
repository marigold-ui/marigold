import { Accordion, AccordionProps } from '@marigold/components';

export default (props: AccordionProps) => (
  <Accordion defaultExpandedKeys={[1]} {...props}>
    <Accordion.Item id={1}>
      <Accordion.Header>Informations</Accordion.Header>
      <Accordion.Content>Some Informations</Accordion.Content>
    </Accordion.Item>
    <Accordion.Item id={2}>
      <Accordion.Header>Personal Settings</Accordion.Header>
      <Accordion.Content>two</Accordion.Content>
    </Accordion.Item>
    <Accordion.Item id={3}>
      <Accordion.Header>Billing Adress</Accordion.Header>
      <Accordion.Content>Some more Informations</Accordion.Content>
    </Accordion.Item>
  </Accordion>
);
