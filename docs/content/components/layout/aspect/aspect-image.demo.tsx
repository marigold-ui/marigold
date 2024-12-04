import { Aspect, Image, Stack } from '@marigold/components';

export default () => (
  <Stack space={4}>
    <Aspect ratio="ultrawide">
      <Image
        src="/marigold-field.webp"
        fit="cover"
        position="bottom"
        alt="a field of marigold flowers and a bright blue sky"
      />
    </Aspect>
    <Aspect ratio="ultrawide">
      <Image
        src="/marigold-field.webp"
        fit="cover"
        position="top"
        alt="a field of marigold flowers and a bright blue sky"
      />
    </Aspect>
  </Stack>
);
