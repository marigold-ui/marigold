import { Button, Slider, Stack } from '@marigold/components';

export default () => (
  <Stack space={4}>
    <Slider
      label={
        <>
          <>Ticket Price</>
          <Button variant="link">Reset filter</Button>
        </>
      }
      defaultValue={[30, 80]}
      step={10}
      maxValue={150}
      formatOptions={{
        style: 'currency',
        currency: 'EUR',
        minimumFractionDigits: 0,
      }}
    />
  </Stack>
);
