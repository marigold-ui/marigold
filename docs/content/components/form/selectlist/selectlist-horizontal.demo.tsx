import { Inline, SelectList, Stack, Text } from '@marigold/components';
import { Pickup, Truck } from '@marigold/icons';

const options = [
  {
    id: 'pickup',
    name: 'Store pickup',
    price: 'Free',
    eta: 'Ready in 2 hours',
    note: 'Pick up at any of our 12 stores. We hold orders for 5 days.',
    Icon: Pickup,
  },
  {
    id: 'standard',
    name: 'Standard',
    price: '€4.99',
    eta: '3 to 5 business days',
    note: 'Tracked delivery via local carrier. No signature required.',
    Icon: Truck,
  },
  {
    id: 'express',
    name: 'Express',
    price: '€12.99',
    eta: '1 to 2 business days',
    note: 'Live tracking and SMS updates as your parcel moves.',
    Icon: Truck,
  },
  {
    id: 'overnight',
    name: 'Overnight',
    price: '€24.99',
    eta: 'Next business day',
    note: 'Signature on delivery. Order before 5 pm to ship today.',
    Icon: Truck,
  },
];

export default () => (
  <SelectList
    label="Shipping speed"
    description="Faster options include live tracking and a signature on delivery."
    orientation="horizontal"
    selectionMode="single"
    defaultSelectedKeys={['standard']}
  >
    {options.map(({ id, name, price, eta, note, Icon }) => (
      <SelectList.Option key={id} id={id} textValue={name}>
        <div className="col-start-2 row-span-2">
          <Stack space={1}>
            <Inline space={2} alignY="center">
              <Icon size={16} />
              <Text slot="label">{name}</Text>
            </Inline>
            <Text fontSize="sm" weight="bold">
              {price}
            </Text>
            <Text slot="description">
              {eta}. {note}
            </Text>
          </Stack>
        </div>
      </SelectList.Option>
    ))}
  </SelectList>
);
