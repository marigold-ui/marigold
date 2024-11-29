import { Aspect, Image } from '@marigold/components';

export default () => (
  <div className="grid auto-rows-max grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-x-2 gap-y-4">
    <Aspect ratio="portrait">
      <Image
        src="/marigold-abstract.webp"
        fit="cover"
        alt="an abstract marigold flower"
      />
    </Aspect>
    <Aspect ratio="square">
      <Image src="/marigold-abstract.webp" alt="an abstract marigold flower" />
    </Aspect>
    <Aspect ratio="landscape">
      <Image
        src="/marigold-abstract.webp"
        fit="cover"
        alt="an abstract marigold flower"
      />
    </Aspect>
    <Aspect ratio="golden">
      <Image
        src="/marigold-abstract.webp"
        fit="cover"
        alt="an abstract marigold flower"
      />
    </Aspect>
    <Aspect ratio="widescreen">
      <Image
        src="/marigold-abstract.webp"
        fit="cover"
        alt="an abstract marigold flower"
      />
    </Aspect>
    <Aspect ratio="ultrawide">
      <Image
        src="/marigold-abstract.webp"
        fit="cover"
        alt="an abstract marigold flower"
      />
    </Aspect>
  </div>
);
