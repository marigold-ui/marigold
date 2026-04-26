import { useState } from 'react';
import {
  ActionMenu,
  Badge,
  Inline,
  Menu,
  SelectList,
  Text,
} from '@marigold/components';

const cards = [
  {
    id: 'visa-4242',
    name: 'Visa ending in 4242',
    description:
      'Billing address: 221B Baker Street, London. Auto-charges enabled.',
    expiry: 'Expires 08/2027',
    badge: { variant: 'success', label: 'Default' },
    expired: false,
  },
  {
    id: 'mc-1881',
    name: 'Mastercard ending in 1881',
    description: 'Used for backup invoices when the default card declines.',
    expiry: 'Expires 03/2026',
    expired: false,
  },
  {
    id: 'amex-0044',
    name: 'Amex ending in 0044',
    description:
      'This card has expired and can no longer be charged. Update or remove it from your wallet to keep payments running.',
    expiry: 'Expired 02/2026',
    badge: { variant: 'error', label: 'Expired' },
    expired: true,
  },
  {
    id: 'sepa',
    name: 'SEPA direct debit',
    description: 'DE12 •••• •••• 4455 — withdraws on the 1st of every month.',
    expiry: 'Mandate signed 04/2025',
    expired: false,
  },
];

export default () => {
  const [selected, setSelected] = useState<string[]>(['visa-4242']);

  return (
    <SelectList
      label="Saved payment methods"
      description="Pick the cards your team can charge invoices to. Expired cards cannot be selected, but you can still open their menu to remove them."
      selectionMode="multiple"
      selectedKeys={selected}
      onChange={keys => setSelected(keys as string[])}
      disabledBehavior="selection"
    >
      {cards.map(card => (
        <SelectList.Option
          key={card.id}
          id={card.id}
          disabled={card.expired}
          textValue={card.name}
        >
          <Text slot="label">
            <Inline space={2} alignY="center">
              {card.name}
              {card.badge ? (
                <Badge variant={card.badge.variant}>{card.badge.label}</Badge>
              ) : null}
            </Inline>
          </Text>
          <Text slot="description">
            {card.description} {card.expiry}.
          </Text>
          <ActionMenu variant="ghost" aria-label={`Manage ${card.name}`}>
            <Menu.Item onAction={() => alert(`Edit ${card.name}`)}>
              Edit
            </Menu.Item>
            <Menu.Item onAction={() => alert(`Set default: ${card.name}`)}>
              Make default
            </Menu.Item>
            <Menu.Item onAction={() => alert(`Remove ${card.name}`)}>
              Remove
            </Menu.Item>
          </ActionMenu>
        </SelectList.Option>
      ))}
    </SelectList>
  );
};
