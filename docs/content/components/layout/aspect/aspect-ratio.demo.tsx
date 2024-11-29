import { Aspect, Image, Inline } from '@marigold/components';

export default () => (
  <Inline space={1}>
    <Aspect ratio="square">
      <Image src="/marigold-abstract.webp" alt="an abstract marigold flower" />
    </Aspect>
    <Aspect ratio="widescreen">
      <Image src="/marigold-abstract.webp" alt="an abstract marigold flower" />
    </Aspect>
  </Inline>
);
