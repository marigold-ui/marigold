import { Plane, Rocket, Truck } from 'lucide-react';
import { Inline, SelectList, Stack, Text } from '@marigold/components';

const speeds = [
  {
    id: 'standard',
    name: 'Standard',
    eta: '3–5 business days',
    price: '€4.99',
    Icon: Truck,
  },
  {
    id: 'express',
    name: 'Express',
    eta: '1–2 business days',
    price: '€12.99',
    Icon: Plane,
  },
  {
    id: 'overnight',
    name: 'Overnight',
    eta: 'Next business day',
    price: '€24.99',
    Icon: Rocket,
  },
];

export default () => (
  <SelectList
    label="Shipping speed"
    description="Faster options include live tracking and a signature on delivery."
    variant="bordered"
    orientation="horizontal"
    selectionMode="single"
    defaultSelectedKeys={['express']}
  >
    {speeds.map(({ id, name, eta, price, Icon }) => (
      <SelectList.Option
        key={id}
        id={id}
        textValue={`${name}, ${price}, ${eta}`}
      >
        <div className="col-start-2 row-span-2">
          <Stack space={1}>
            <Icon
              size={20}
              aria-hidden
              className="text-muted-foreground shrink-0"
            />
            <Inline space={2} alignY="center">
              <Text slot="label">{name}</Text>
              <Text weight="semibold">{price}</Text>
            </Inline>
            <Text slot="description">{eta}</Text>
          </Stack>
        </div>
      </SelectList.Option>
    ))}
  </SelectList>
);
