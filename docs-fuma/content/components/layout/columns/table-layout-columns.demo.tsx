'use client';

import {
  Columns,
  Headline,
  NumberField,
  Stack,
  TextField,
} from '@marigold/components';

const data = [
  {
    name: 'Standard',
    price: 2.5,
    fee: 3.0,
  },
  {
    name: 'Advanced',
    price: 2.75,
    fee: 3.0,
  },
  {
    name: 'Express',
    price: 5.5,
    fee: 6.0,
  },
];

export default () => {
  return (
    <div className="w-1/2 p-4">
      <Columns columns={[1, 1, 1]} space={2}>
        <Headline level="5">Name</Headline>
        <Headline level="5">Price</Headline>
        <Headline level="5">Fee</Headline>
      </Columns>
      <Columns columns={[1, 1, 1]} space={2}>
        <Stack>
          {data.map(({ name }) => (
            <TextField key={crypto.randomUUID()} defaultValue={name} />
          ))}
        </Stack>
        <Stack>
          {data.map(({ price }) => (
            <NumberField
              key={crypto.randomUUID()}
              defaultValue={price}
              hideStepper
              width={20}
              formatOptions={{ style: 'currency', currency: 'EUR' }}
            />
          ))}
        </Stack>
        <Stack>
          {data.map(({ fee }) => (
            <NumberField
              key={crypto.randomUUID()}
              defaultValue={fee}
              hideStepper
              width={20}
              formatOptions={{
                style: 'currency',
                currency: 'EUR',
              }}
            />
          ))}
        </Stack>
      </Columns>
    </div>
  );
};
