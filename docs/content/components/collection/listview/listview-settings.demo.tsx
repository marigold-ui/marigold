import { useState } from 'react';
import {
  ActionMenu,
  Button,
  Description,
  EmptyState,
  ListView,
  Switch,
  TextValue,
} from '@marigold/components';
import { GiftCard, Resale, TicketInsurance, Turnstile } from '@marigold/icons';

interface AddOn {
  id: string;
  name: string;
  detail: string;
  enabled: boolean;
  icon: typeof TicketInsurance;
}

const initialAddOns: AddOn[] = [
  {
    id: 'insurance',
    name: 'Ticket Insurance',
    detail: 'Offer refund protection at checkout',
    enabled: true,
    icon: TicketInsurance,
  },
  {
    id: 'resale',
    name: 'Resale',
    detail: 'Let ticket holders resell through the official marketplace',
    enabled: true,
    icon: Resale,
  },
  {
    id: 'gift-card',
    name: 'Gift Cards',
    detail: 'Accept gift cards as a payment method',
    enabled: false,
    icon: GiftCard,
  },
  {
    id: 'turnstile',
    name: 'Turnstile Entry',
    detail: 'Scan tickets at the gate on event day',
    enabled: false,
    icon: Turnstile,
  },
];

export default () => {
  const [addOns, setAddOns] = useState(initialAddOns);

  const toggle = (id: string) =>
    setAddOns(current =>
      current.map(item =>
        item.id === id ? { ...item, enabled: !item.enabled } : item
      )
    );

  const remove = (id: string) =>
    setAddOns(current => current.filter(item => item.id !== id));

  return (
    <ListView
      aria-label="Checkout add-ons"
      emptyState={
        <EmptyState
          title="No add-ons enabled"
          description="Turn on an add-on to offer it at checkout."
          action={
            <Button onPress={() => setAddOns(initialAddOns)}>
              Restore defaults
            </Button>
          }
        />
      }
    >
      {addOns.map(({ id, name, detail, enabled, icon: Icon }) => (
        <ListView.Item key={id} id={id} textValue={name}>
          <Icon size={20} />
          <TextValue>{name}</TextValue>
          <Description>{detail}</Description>
          <Switch
            aria-label={`Enable ${name}`}
            selected={enabled}
            onChange={() => toggle(id)}
          />
          <ActionMenu aria-label={`${name} actions`}>
            <ActionMenu.Item>Configure</ActionMenu.Item>
            <ActionMenu.Item variant="destructive" onAction={() => remove(id)}>
              Remove
            </ActionMenu.Item>
          </ActionMenu>
        </ListView.Item>
      ))}
    </ListView>
  );
};
