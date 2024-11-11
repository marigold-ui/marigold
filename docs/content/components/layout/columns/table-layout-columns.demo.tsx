import { Columns, Divider, Headline, Stack } from '@marigold/components';

const data = [
  {
    price: '2.50',
    fee: '3.00',
  },
  {
    price: '2.75',
    fee: '3.00',
  },
  {
    price: '5.50',
    fee: '6.00',
  },
];
export default () => {
  return (
    <Stack>
      <Columns columns={[1, 1, 1]}>
        <Headline level="4">Price</Headline>
        <div></div>
        <Headline level="4">Fee</Headline>
      </Columns>
      <Divider />
      <Columns columns={[1, 1, 1]}>
        {data.map(item => (
          <div>{item.price}</div>
        ))}
      </Columns>
    </Stack>
  );
};
