import { Accordion } from '@marigold/components';

// Fixture for the interaction driver's disclosure-detection path: an Accordion
// item's revealed panel carries `role="group"` (react-aria-components'
// Disclosure default), not one of `OVERLAY_ROLES` — this is the widget the
// driveInteractions "fresh" detection used to be blind to.
const AccordionDisclosure = () => (
  <Accordion>
    <Accordion.Item id="item-1">
      <Accordion.Header>First item</Accordion.Header>
      <Accordion.Content>Revealed panel content.</Accordion.Content>
    </Accordion.Item>
  </Accordion>
);

export default AccordionDisclosure;
