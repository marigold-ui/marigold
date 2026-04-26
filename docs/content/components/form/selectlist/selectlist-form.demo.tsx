import { useState } from 'react';
import {
  Badge,
  Button,
  Form,
  Inline,
  SelectList,
  Stack,
  Text,
} from '@marigold/components';

const addons = [
  {
    id: 'insurance',
    name: 'Parcel insurance',
    price: '€2.50',
    description:
      'Covers loss or damage in transit up to €500. Refunds are issued to your original payment method within 7 business days.',
  },
  {
    id: 'signature',
    name: 'Signature on delivery',
    price: '€1.20',
    description:
      'The carrier collects a signature when handing over the parcel. Recommended for high-value items.',
  },
  {
    id: 'gift-wrap',
    name: 'Gift wrap',
    price: '€4.00',
    badge: 'New',
    description:
      'Premium recycled paper, hand-tied ribbon, and a printed note. Add the message at checkout.',
  },
  {
    id: 'climate',
    name: 'Climate-neutral shipping',
    price: '€0.80',
    description:
      'We offset the carbon emissions of your delivery via a verified reforestation partner.',
  },
];

export default () => {
  const [submitted, setSubmitted] = useState<string | null>(null);

  return (
    <Stack space={4} alignX="left">
      <Form
        onSubmit={event => {
          event.preventDefault();
          const data = new FormData(event.currentTarget);
          setSubmitted(data.getAll('addons').join(', ') || 'none');
        }}
      >
        <Stack space={4} alignX="left">
          <SelectList
            label="Shipping add-ons"
            description="Bundle extras with your order — you can change them later from the order details page."
            name="addons"
            selectionMode="multiple"
          >
            {addons.map(addon => (
              <SelectList.Option
                key={addon.id}
                id={addon.id}
                textValue={addon.name}
              >
                <Text slot="label">
                  <Inline space={2} alignY="center">
                    {addon.name} — {addon.price}
                    {addon.badge ? (
                      <Badge variant="info">{addon.badge}</Badge>
                    ) : null}
                  </Inline>
                </Text>
                <Text slot="description">{addon.description}</Text>
              </SelectList.Option>
            ))}
          </SelectList>
          <Button type="submit" variant="primary">
            Continue to payment
          </Button>
        </Stack>
      </Form>
      {submitted !== null && <Text>Selected add-ons: {submitted}</Text>}
    </Stack>
  );
};
