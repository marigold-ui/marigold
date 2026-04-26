import { useState } from 'react';
import {
  ActionMenu,
  Badge,
  Inline,
  Menu,
  SelectList,
  Text,
} from '@marigold/components';

const methods = [
  {
    id: 'card',
    name: 'Credit and debit cards',
    description:
      'Accept Visa, Mastercard, and Amex. Includes 3-D Secure for European customers.',
    fee: '1.4% + €0.25 per transaction',
    badge: { variant: 'success', label: 'Recommended' },
  },
  {
    id: 'paypal',
    name: 'PayPal',
    description:
      'Customers pay with their PayPal balance, linked bank account, or saved card. Funds settle within 1 business day.',
    fee: '2.5% + €0.35 per transaction',
  },
  {
    id: 'klarna',
    name: 'Klarna — Pay later',
    description:
      'Buy now and pay in 30 days, or split the order in 3 interest-free payments. Klarna takes on fraud risk.',
    fee: '2.99% + €0.30 per transaction',
    badge: { variant: 'info', label: 'New' },
  },
  {
    id: 'sepa',
    name: 'SEPA direct debit',
    description:
      'European customers pay directly from their bank account. Funds clear in 2–3 business days.',
    fee: '0.8% per transaction',
  },
];

export default () => {
  const [selected, setSelected] = useState<string[]>(['card', 'paypal']);

  return (
    <SelectList
      label="Accepted payment methods"
      description="Pick which methods customers see at checkout. Use the menu on each row to set fees, dispute defaults, or take a method offline temporarily."
      selectionMode="multiple"
      selectedKeys={selected}
      onChange={keys => setSelected(keys as string[])}
    >
      {methods.map(method => (
        <SelectList.Option
          key={method.id}
          id={method.id}
          textValue={method.name}
        >
          <Text slot="label">
            <Inline space={2} alignY="center">
              {method.name}
              {method.badge ? (
                <Badge variant={method.badge.variant}>
                  {method.badge.label}
                </Badge>
              ) : null}
            </Inline>
          </Text>
          <Text slot="description">
            {method.description} Fees: {method.fee}.
          </Text>
          <ActionMenu variant="ghost" aria-label={`Manage ${method.name}`}>
            <Menu.Item onAction={() => alert(`Configure ${method.name}`)}>
              Configure
            </Menu.Item>
            <Menu.Item
              onAction={() => alert(`View payouts for ${method.name}`)}
            >
              View payouts
            </Menu.Item>
            <Menu.Item onAction={() => alert(`Pause ${method.name}`)}>
              Pause method
            </Menu.Item>
          </ActionMenu>
        </SelectList.Option>
      ))}
    </SelectList>
  );
};
