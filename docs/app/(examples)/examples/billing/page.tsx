'use client';

import {
  CircleCheck,
  CreditCard,
  Download,
  Plus,
  Sparkles,
} from 'lucide-react';
import {
  Badge,
  Button,
  Card,
  Columns,
  Headline,
  Inline,
  Inset,
  LinkButton,
  NumericFormat,
  Panel,
  Stack,
  Table,
  Text,
  Tiles,
} from '@marigold/components';

const plan = {
  name: 'Team',
  price: 49,
  currency: 'EUR',
  seats: 12,
  totalSeats: 20,
  renewsOn: 'May 16, 2026',
};

const usage = [
  { label: 'Active events', value: 38, limit: 50 },
  { label: 'Team members', value: plan.seats, limit: plan.totalSeats },
  { label: 'Storage', value: '14 GB', limit: '50 GB' },
];

const paymentMethods = [
  {
    id: 'visa-primary',
    brand: 'Visa',
    last4: '4242',
    expiry: '09 / 2028',
    holder: 'Jane Doe',
    primary: true,
  },
  {
    id: 'mastercard',
    brand: 'Mastercard',
    last4: '8110',
    expiry: '02 / 2027',
    holder: 'Acme Inc.',
    primary: false,
  },
  {
    id: 'amex',
    brand: 'Amex',
    last4: '1007',
    expiry: '11 / 2026',
    holder: 'Jane Doe',
    primary: false,
  },
];

const invoices = [
  {
    id: 'INV-2026-04',
    date: 'Apr 16, 2026',
    amount: 49,
    status: 'Paid' as const,
  },
  {
    id: 'INV-2026-03',
    date: 'Mar 16, 2026',
    amount: 49,
    status: 'Paid' as const,
  },
  {
    id: 'INV-2026-02',
    date: 'Feb 16, 2026',
    amount: 49,
    status: 'Paid' as const,
  },
  {
    id: 'INV-2026-01',
    date: 'Jan 16, 2026',
    amount: 39,
    status: 'Paid' as const,
  },
  {
    id: 'INV-2025-12',
    date: 'Dec 16, 2025',
    amount: 39,
    status: 'Refunded' as const,
  },
];

const statusVariant = {
  Paid: 'success',
  Refunded: 'warning',
  Failed: 'error',
} as const;

const BillingPage = () => (
  <Inset space={4}>
    <Stack space={8}>
      <Stack space={2}>
        <Headline level={2}>Billing</Headline>
        <Text>
          Review your plan, manage payment methods, and download past invoices.
        </Text>
      </Stack>
      <Stack space="section">
        <Panel>
          <Panel.Header>
            <Panel.Title>Current plan</Panel.Title>
            <Panel.Description>
              You&apos;re on the {plan.name} plan. Renews on {plan.renewsOn}.
            </Panel.Description>
            <Panel.HeaderActions>
              <Button variant="primary">
                <Sparkles /> Upgrade plan
              </Button>
            </Panel.HeaderActions>
          </Panel.Header>
          <Panel.Content>
            <Columns columns={['fit', 1]} space={12} collapseAt="700px">
              <Stack space={1}>
                <Inline space={2} alignY="bottom">
                  <Text size="4xl" weight="bold">
                    <NumericFormat
                      value={plan.price}
                      style="currency"
                      currency={plan.currency}
                      minimumFractionDigits={0}
                    />
                  </Text>
                  <Text variant="muted">/ month</Text>
                </Inline>
                <Text variant="muted" size="sm">
                  Billed monthly. Cancel anytime.
                </Text>
              </Stack>
              <Tiles tilesWidth="180px" space={6}>
                {usage.map(item => (
                  <Stack key={item.label} space={1}>
                    <Text variant="muted" size="xs">
                      {item.label}
                    </Text>
                    <Inline space={2} alignY="bottom">
                      <Text size="xl" weight="bold">
                        {item.value}
                      </Text>
                      <Text variant="muted" size="sm">
                        / {item.limit}
                      </Text>
                    </Inline>
                  </Stack>
                ))}
              </Tiles>
            </Columns>
          </Panel.Content>
        </Panel>

        <Panel>
          <Panel.Header>
            <Panel.Title>Payment methods</Panel.Title>
            <Panel.Description>
              Cards on file. The primary card is used for recurring charges.
            </Panel.Description>
            <Panel.HeaderActions>
              <Button variant="secondary">
                <Plus /> Add card
              </Button>
            </Panel.HeaderActions>
          </Panel.Header>
          <Panel.Content>
            <Tiles tilesWidth="280px" space={4} equalHeight>
              {paymentMethods.map(method => (
                <Card key={method.id} stretch>
                  <Stack space="regular" stretch>
                    <Inline space={3} alignY="center" noWrap>
                      <div className="bg-muted grid size-10 shrink-0 place-items-center rounded-full">
                        <CreditCard className="size-5" strokeWidth={1.5} />
                      </div>
                      <Stack space={0}>
                        <Inline space={2} alignY="center">
                          <Text weight="semibold">
                            {method.brand} •••• {method.last4}
                          </Text>
                          {method.primary ? (
                            <Badge variant="success">Primary</Badge>
                          ) : null}
                        </Inline>
                        <Text variant="muted" size="sm">
                          Expires {method.expiry}
                        </Text>
                      </Stack>
                    </Inline>
                    <Text variant="muted" size="sm">
                      {method.holder}
                    </Text>
                    <Inline space={2} alignX="right">
                      {method.primary ? null : (
                        <Button variant="ghost">Make primary</Button>
                      )}
                      <Button variant="destructive-ghost">Remove</Button>
                    </Inline>
                  </Stack>
                </Card>
              ))}
            </Tiles>
          </Panel.Content>
        </Panel>

        <Panel>
          <Panel.Header>
            <Panel.Title>Invoices</Panel.Title>
            <Panel.Description>
              The last twelve months of billing activity.
            </Panel.Description>
            <Panel.HeaderActions>
              <LinkButton href="#" variant="secondary">
                View all invoices
              </LinkButton>
            </Panel.HeaderActions>
          </Panel.Header>
          <Panel.Content bleed>
            <Table aria-label="Invoices" selectionMode="none">
              <Table.Header>
                <Table.Column rowHeader>Invoice</Table.Column>
                <Table.Column>Date</Table.Column>
                <Table.Column>Amount</Table.Column>
                <Table.Column>Status</Table.Column>
                <Table.Column alignX="right">&nbsp;</Table.Column>
              </Table.Header>
              <Table.Body>
                {invoices.map(invoice => (
                  <Table.Row key={invoice.id}>
                    <Table.Cell>
                      <Text weight="semibold">{invoice.id}</Text>
                    </Table.Cell>
                    <Table.Cell>{invoice.date}</Table.Cell>
                    <Table.Cell>
                      <NumericFormat
                        value={invoice.amount}
                        style="currency"
                        currency="EUR"
                        minimumFractionDigits={2}
                      />
                    </Table.Cell>
                    <Table.Cell>
                      <Inline space={1} alignY="center">
                        {invoice.status === 'Paid' ? (
                          <CircleCheck className="size-4" strokeWidth={1.5} />
                        ) : null}
                        <Badge variant={statusVariant[invoice.status]}>
                          {invoice.status}
                        </Badge>
                      </Inline>
                    </Table.Cell>
                    <Table.Cell>
                      <Inline space={1} alignX="right" alignY="center">
                        <Button variant="ghost">
                          <Download /> PDF
                        </Button>
                      </Inline>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </Panel.Content>
        </Panel>

        <Panel variant="destructive">
          <Panel.Header>
            <Panel.Title>Danger zone</Panel.Title>
          </Panel.Header>
          <Panel.Content>
            <Stack space={1}>
              <Text weight="semibold">Cancel subscription</Text>
              <Text variant="muted" size="sm">
                Cancels the {plan.name} plan at the end of the current billing
                period ({plan.renewsOn}). Data stays read-only until the next
                renewal date.
              </Text>
            </Stack>
          </Panel.Content>
          <Panel.Footer>
            <Button variant="destructive">Cancel subscription</Button>
          </Panel.Footer>
        </Panel>
      </Stack>
    </Stack>
  </Inset>
);

export default BillingPage;
