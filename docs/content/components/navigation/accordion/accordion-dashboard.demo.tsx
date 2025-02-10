import { Accordion } from '@marigold/components';

export default function DashboardAccordion() {
  return (
    <Accordion>
      <Accordion.Item>
        <Accordion.Header title="Sales Data" />
        <Accordion.Content>Monthly sales figures here.</Accordion.Content>
      </Accordion.Item>
      <Accordion.Item>
        <Accordion.Header title="Customer Feedback" />
        <Accordion.Content>Latest customer reviews.</Accordion.Content>
      </Accordion.Item>
    </Accordion>
  );
}
