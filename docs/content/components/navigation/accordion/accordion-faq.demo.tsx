import { Accordion } from '@marigold/components';

export default function FAQAccordion() {
  return (
    <Accordion>
      <Accordion.Item>
        <Accordion.Header title="What is your return policy?" />
        <Accordion.Content>
          We offer a 30-day return policy with a full refund.
        </Accordion.Content>
      </Accordion.Item>
      <Accordion.Item>
        <Accordion.Header title="How do I track my order?" />
        <Accordion.Content>
          You can track your order through our tracking portal.
        </Accordion.Content>
      </Accordion.Item>
    </Accordion>
  );
}
