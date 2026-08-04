'use client';

import { useState } from 'react';
import {
  Badge,
  Checkbox,
  Columns,
  Description,
  Inline,
  Panel,
  SectionMessage,
  Stack,
  Text,
  Title,
} from '@marigold/components';

const summary = [
  { label: 'Bundle group', value: 'Season 2026/27 — Main stage' },
  { label: 'Source bundles', value: '2' },
  { label: 'Orders affected', value: '800' },
  { label: 'Reservation held until', value: '30.09.2026' },
  { label: 'Sales outlet', value: 'Box office' },
  { label: 'Booking filter', value: 'None' },
];

const findings = [
  {
    id: 'f-1',
    variant: 'warning' as const,
    title: 'Per-ticket free fields are dropped',
    body: '412 orders carry per-ticket free fields that this run will not copy.',
    confirmable: true,
  },
  {
    id: 'f-2',
    variant: 'warning' as const,
    title: 'Two bundles share seats',
    body: '“Premiere subscription B” inherits the assignment of “Premiere subscription A” for 96 shared seats.',
    confirmable: true,
  },
  {
    id: 'f-3',
    variant: 'success' as const,
    title: 'All targets resolved',
    body: 'Every source bundle maps to a target in the 2026/27 season.',
    confirmable: false,
  },
];

/**
 * Step 4 — review before the run starts.
 *
 * The read-only summary sits in a Panel of key/value rows; the findings are
 * plain `<SectionMessage>`s in the page flow rather than inside a Panel, so
 * they read as feedback on the whole page instead of as content of a section.
 */
export const StepReview = () => {
  const [confirmed, setConfirmed] = useState<string[]>([]);

  return (
    <>
      <Panel size="form">
        <Panel.Header>
          <Title>Run summary</Title>
          <Description>
            What this run will do once you start it. Go back to any step to
            change it.
          </Description>
        </Panel.Header>
        <Panel.Content>
          <Stack space="regular">
            {summary.map(row => (
              <Columns key={row.label} columns={[1, 1]} space="related">
                <Text variant="muted">{row.label}</Text>
                <Text weight="semibold">{row.value}</Text>
              </Columns>
            ))}
          </Stack>
        </Panel.Content>
      </Panel>

      {findings.map(finding => {
        const isConfirmed = confirmed.includes(finding.id);
        return (
          <SectionMessage
            key={finding.id}
            variant={isConfirmed ? 'success' : finding.variant}
          >
            <SectionMessage.Title>{finding.title}</SectionMessage.Title>
            <SectionMessage.Content>
              <Stack space="related">
                <Text>{finding.body}</Text>
                {finding.confirmable && (
                  <Inline space="related" alignY="center">
                    {isConfirmed ? (
                      <Badge variant="success">Acknowledged</Badge>
                    ) : (
                      /*
                        The confirm control lives inside the message, on the
                        message's own surface. Wrapping it in a second tinted
                        box would stack two fills of the same hue and read as
                        disabled rather than as actionable.
                      */
                      <Checkbox
                        label="I understand, continue anyway"
                        onChange={() =>
                          setConfirmed(prev => [...prev, finding.id])
                        }
                      />
                    )}
                  </Inline>
                )}
              </Stack>
            </SectionMessage.Content>
          </SectionMessage>
        );
      })}
    </>
  );
};
