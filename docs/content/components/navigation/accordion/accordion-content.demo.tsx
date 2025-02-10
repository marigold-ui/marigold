import { Accordion } from '@marigold/components';

export default () => {
  return (
    <Accordion>
      <Accordion.Item>
        <Accordion.Header title="Section 1" />
        <Accordion.Content>Content for section 1</Accordion.Content>
      </Accordion.Item>
      <Accordion.Item>
        <Accordion.Header title="Section 2" />
        <Accordion.Content>Content for section 2</Accordion.Content>
      </Accordion.Item>
    </Accordion>
  );
};
