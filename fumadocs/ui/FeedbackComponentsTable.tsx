import { Scrollable, Table } from '@marigold/components';

export const FeedbackComponentsTable = () => (
  <Scrollable>
    <Table aria-label="Feedback message components comparison">
      <Table.Header>
        <Table.Column>Component</Table.Column>
        <Table.Column>Relevant use case(s)</Table.Column>
        <Table.Column>Disruption level</Table.Column>
        <Table.Column>Persistence</Table.Column>
        <Table.Column>Dismissable by the user?</Table.Column>
        <Table.Column>Display</Table.Column>
        <Table.Column>Position</Table.Column>
      </Table.Header>
      <Table.Body>
        <Table.Row key={1}>
          <Table.Cell>Dialog</Table.Cell>
          <Table.Cell>
            Interrupt the user to inform them of task-critical information
          </Table.Cell>
          <Table.Cell>High</Table.Cell>
          <Table.Cell>Permanent</Table.Cell>
          <Table.Cell>Yes (optional)</Table.Cell>
          <Table.Cell>Block</Table.Cell>
          <Table.Cell>
            Fixed as an overlay on top of the page, typically in the center of
            the viewport
          </Table.Cell>
        </Table.Row>
        <Table.Row key={2}>
          <Table.Cell>Input field validation</Table.Cell>
          <Table.Cell>
            Inform users of the status of form field inputs
          </Table.Cell>
          <Table.Cell>Medium</Table.Cell>
          <Table.Cell>Permanent</Table.Cell>
          <Table.Cell>No</Table.Cell>
          <Table.Cell>Inline</Table.Cell>
          <Table.Cell>Directly beneath the affected input field</Table.Cell>
        </Table.Row>
        <Table.Row key={3}>
          <Table.Cell>Section message</Table.Cell>
          <Table.Cell>
            Inform users of relevant information in one section/area of the
            screen
          </Table.Cell>
          <Table.Cell>Low</Table.Cell>
          <Table.Cell>Permanent</Table.Cell>
          <Table.Cell>Yes (optional)</Table.Cell>
          <Table.Cell>Block</Table.Cell>
          <Table.Cell>
            Visually near the affected content, typically directly above
          </Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  </Scrollable>
);
