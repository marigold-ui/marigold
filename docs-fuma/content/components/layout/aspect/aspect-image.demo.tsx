import { Aspect, Stack } from '@marigold/components';

export default () => (
  <Stack space={4}>
    <Aspect ratio="ultrawide">
      <img
        src="/marigold-field.webp"
        className="object-cover object-bottom"
        alt="a field of marigold flowers and a bright blue sky"
      />
    </Aspect>
    <Aspect ratio="ultrawide">
      <img
        src="/marigold-field.webp"
        className="object-cover object-top"
        alt="a field of marigold flowers and a bright blue sky"
      />
    </Aspect>
  </Stack>
);
