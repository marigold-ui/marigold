import { Slider, Stack } from '@marigold/components';

export default () => (
  <Stack space={5}>
    <Slider
      label="Fee split"
      thumbLabels="Organiser share"
      defaultValue={0.7}
      maxValue={1}
      step={0.05}
      formatOptions={{ style: 'percent' }}
    />
    <Slider
      label="Ticket price"
      thumbLabels={['Lowest', 'Highest']}
      defaultValue={[20, 80]}
      step={5}
      formatOptions={{ style: 'currency', currency: 'EUR' }}
    />
  </Stack>
);
