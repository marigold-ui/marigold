'use client';

import {
  Badge,
  Description,
  Panel,
  SectionMessage,
  Select,
  Table,
  Text,
  Title,
} from '@marigold/components';
import { bundles, mappings } from './data';

const STATUS: Record<
  string,
  { label: string; variant: 'success' | 'warning' | 'error' }
> = {
  ready: { label: 'Ready', variant: 'success' },
  review: { label: 'Needs review', variant: 'warning' },
  blocked: { label: 'No target', variant: 'error' },
};

/**
 * Step 3 — map each source bundle onto its target.
 *
 * One data Panel with the table as its whole body. `bleed` lets the rows run
 * to the Panel's edges while the header stays inset, so the columns still line
 * up with the title above them.
 */
export const StepAssignment = () => (
  <>
    <Panel>
      <Panel.Header>
        <Title>Target assignment</Title>
        <Description>
          Every source bundle needs a target before the run can start.
        </Description>
      </Panel.Header>
      <Panel.Content bleed>
        <Table aria-label="Target assignment" variant="muted">
          <Table.Header>
            <Table.Column rowHeader>Source bundle</Table.Column>
            <Table.Column>Target bundle</Table.Column>
            <Table.Column width={100}>Seats</Table.Column>
            <Table.Column width={140}>Status</Table.Column>
          </Table.Header>
          <Table.Body>
            {mappings.map(row => (
              <Table.Row key={row.id} id={row.id}>
                <Table.Cell>{row.source}</Table.Cell>
                <Table.Cell>
                  <Select
                    aria-label={`Target for ${row.source}`}
                    placeholder="Pick a target"
                    defaultValue={row.status === 'blocked' ? undefined : 'b-1'}
                    width="full"
                  >
                    {bundles.map(bundle => (
                      <Select.Option key={bundle.id} id={bundle.id}>
                        {`${bundle.name} (26/27)`}
                      </Select.Option>
                    ))}
                  </Select>
                </Table.Cell>
                <Table.Cell>{row.seats.toLocaleString('en-GB')}</Table.Cell>
                <Table.Cell>
                  <Badge variant={STATUS[row.status].variant}>
                    {STATUS[row.status].label}
                  </Badge>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Panel.Content>
    </Panel>

    <SectionMessage variant="error">
      <SectionMessage.Title>One bundle has no target</SectionMessage.Title>
      <SectionMessage.Content>
        <Text>
          “Youth subscription” is not mapped. Pick a target or remove the bundle
          in step 1.
        </Text>
      </SectionMessage.Content>
    </SectionMessage>
  </>
);
