'use client';

import {
  Badge,
  Button,
  Card,
  Headline,
  Inline,
  Inset,
  LinkButton,
  Stack,
  Table,
  Text,
} from '@marigold/components';
import { type Discount, discounts } from './discounts-data';

const statusVariant: Record<Discount['status'], string> = {
  active: 'success',
  expired: 'warning',
  scheduled: 'info',
};

const DiscountsPage = () => (
  <Inset space={4}>
    <Card p={4} stretch>
      <Stack space={6}>
        <Inline alignY="center" alignX="between">
          <Stack space="tight">
            <Headline level={2}>Discounts</Headline>
            <Text size="sm" variant="muted">
              Manage discount codes and promotions for your store.
            </Text>
          </Stack>
          <LinkButton variant="primary" href="/discounts/new">
            Add discount
          </LinkButton>
        </Inline>
        <Table aria-label="Discounts" selectionMode="none">
          <Table.Header>
            <Table.Column>Code</Table.Column>
            <Table.Column>Name</Table.Column>
            <Table.Column>Type</Table.Column>
            <Table.Column>Value</Table.Column>
            <Table.Column>Usage</Table.Column>
            <Table.Column>Valid From</Table.Column>
            <Table.Column>Valid To</Table.Column>
            <Table.Column>Status</Table.Column>
            <Table.Column>Actions</Table.Column>
          </Table.Header>
          <Table.Body>
            {discounts.map(discount => (
              <Table.Row key={discount.id}>
                <Table.Cell>
                  <Text weight="bold">{discount.code}</Text>
                </Table.Cell>
                <Table.Cell>{discount.name}</Table.Cell>
                <Table.Cell>
                  {discount.type === 'percentage' ? 'Percentage' : 'Fixed'}
                </Table.Cell>
                <Table.Cell>
                  {discount.type === 'percentage'
                    ? `${discount.value}%`
                    : `$${discount.value}`}
                </Table.Cell>
                <Table.Cell>{discount.usageCount}</Table.Cell>
                <Table.Cell>{discount.validFrom}</Table.Cell>
                <Table.Cell>{discount.validTo}</Table.Cell>
                <Table.Cell>
                  <Badge variant={statusVariant[discount.status]}>
                    {discount.status}
                  </Badge>
                </Table.Cell>
                <Table.Cell>
                  <Button variant="text" size="small">
                    Edit
                  </Button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Stack>
    </Card>
  </Inset>
);

export default DiscountsPage;
