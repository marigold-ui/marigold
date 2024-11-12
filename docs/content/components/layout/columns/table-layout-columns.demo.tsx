import {
  Columns,
  Headline,
  NumberField,
  Stack,
  TextField,
} from '@marigold/components';

const data = [
  {
    label: 'Standard',
    price: 2.5,
    fee: 3.0,
  },
  {
    label: 'Advanced',
    price: 2.75,
    fee: 3.0,
  },
  {
    label: 'Express',
    price: 5.5,
    fee: 6.0,
  },
];

export default () => {
  return (
    <div className="w-5/12 p-4">
      <Columns columns={[1, 1, 1]} space={2}>
        <Headline level="4">Name</Headline>
        <Headline level="4">Price</Headline>
        <Headline level="4">Fee</Headline>
      </Columns>
      <Columns columns={[1, 1, 1]} space={2}>
        <Stack>
          {data.map(({ label }) => (
            <TextField defaultValue={label} />
          ))}
        </Stack>
        <Stack>
          {data.map(({ price }) => (
            <NumberField
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
