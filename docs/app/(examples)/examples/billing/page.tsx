'use client';

import { Download } from 'lucide-react';
import {
  Badge,
  Button,
  DateFormat,
  Description,
  Divider,
  Inline,
  Page,
  Panel,
  SectionMessage,
  Stack,
  Table,
  Text,
  Title,
} from '@marigold/components';
import { invoices } from './invoices';

const statusVariant = {
  paid: 'success',
  due: 'info',
  failed: 'error',
} as const;

const BillingPage = () => {
  const failedInvoice = invoices.find(invoice => invoice.status === 'failed');

  return (
    <Page>
      <Page.Header>
        <Title>Billing</Title>
        <Description>
          Manage your plan, payment method, and invoices.
        </Description>
        <Button variant="primary">Change plan</Button>
      </Page.Header>

      {failedInvoice && (
        <SectionMessage variant="error">
          <SectionMessage.Title>Payment failed</SectionMessage.Title>
          <SectionMessage.Content>
            <Stack space="related" alignX="left">
              <Text>
                Your {failedInvoice.period} payment of {failedInvoice.amount}{' '}
                could not be processed. Update your payment method to retry and
                avoid an interruption to your service.
              </Text>
              <Button variant="primary" size="small">
                Update payment method
              </Button>
            </Stack>
          </SectionMessage.Content>
        </SectionMessage>
      )}

      <Panel>
        <Panel.Header>
          <Title>Current plan</Title>
          <Description>Team plan, billed monthly.</Description>
        </Panel.Header>
        <Panel.Content>
          <Stack space="regular">
            <Inline space="related" alignY="bottom">
              <Text fontSize="4xl" weight="semibold">
                €480
              </Text>
              <Text variant="muted">/ month</Text>
            </Inline>
            <Text variant="muted">
              Includes up to 25 team members, unlimited events, and priority
              support. Your plan renews on the 1st of every month.
            </Text>
          </Stack>
        </Panel.Content>
      </Panel>

      <Panel>
        <Panel.Header>
          <Title>Payment method</Title>
        </Panel.Header>
        <Panel.Content>
          <Stack space="regular">
            <Stack space="tight">
              <Text weight="semibold">Visa ending in 4242</Text>
              <Text variant="muted" fontSize="sm">
                Expires 08 / 2027
              </Text>
            </Stack>
            <Divider />
            <Stack space="tight">
              <Text variant="muted" fontSize="xs">
                Billing email
              </Text>
              <Text weight="semibold">billing@acme.example.com</Text>
            </Stack>
          </Stack>
        </Panel.Content>
        <Panel.Footer>
          <Button>Update payment method</Button>
        </Panel.Footer>
      </Panel>

      <Panel>
        <Panel.Header>
          <Title>Invoices</Title>
        </Panel.Header>
        <Panel.Content bleed>
          <Table aria-label="Invoices">
            <Table.Header>
              <Table.Column rowHeader>Invoice</Table.Column>
              <Table.Column>Period</Table.Column>
              <Table.Column>Date</Table.Column>
              <Table.Column alignX="right">Amount</Table.Column>
              <Table.Column>Status</Table.Column>
              <Table.Column alignX="right">&nbsp;</Table.Column>
            </Table.Header>
            <Table.Body>
              {invoices.map(invoice => (
                <Table.Row key={invoice.id}>
                  <Table.Cell>{invoice.id}</Table.Cell>
                  <Table.Cell>{invoice.period}</Table.Cell>
                  <Table.Cell>
                    <DateFormat
                      value={new Date(invoice.date)}
                      dateStyle="medium"
                    />
                  </Table.Cell>
                  <Table.Cell alignX="right">{invoice.amount}</Table.Cell>
                  <Table.Cell>
                    <Badge variant={statusVariant[invoice.status]}>
                      {invoice.status}
                    </Badge>
                  </Table.Cell>
                  <Table.Cell alignX="right">
                    <Inline space="tight" alignY="center" alignX="right">
                      {invoice.status === 'failed' && (
                        <Button
                          size="small"
                          aria-label={`Retry payment for ${invoice.period}`}
                        >
                          Retry payment
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="icon"
                        aria-label={`Download ${invoice.id}`}
                      >
                        <Download />
                      </Button>
                    </Inline>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </Panel.Content>
      </Panel>
    </Page>
  );
};

export default BillingPage;
