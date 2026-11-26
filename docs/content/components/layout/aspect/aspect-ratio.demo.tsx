import { Aspect } from '@marigold/components';

export default () => (
  <div className="grid auto-rows-max grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-x-2 gap-y-4">
    <Aspect ratio="portrait">
      <img
        src="/marigold-abstract.webp"
        className="object-cover"
        alt="a marigold flower covered in morning dew"
      />
    </Aspect>
    <Aspect ratio="square">
      <img
        src="/marigold-abstract.webp"
        alt="a marigold flower covered in morning dew"
      />
    </Aspect>
    <Aspect ratio="landscape">
      <img
        src="/marigold-abstract.webp"
        className="object-cover"
        alt="a marigold flower covered in morning dew"
      />
    </Aspect>
    <Aspect ratio="golden">
      <img
        src="/marigold-abstract.webp"
        className="object-cover"
        alt="a marigold flower covered in morning dew"
      />
    </Aspect>
    <Aspect ratio="widescreen">
      <img
        src="/marigold-abstract.webp"
        className="object-cover"
        alt="a marigold flower covered in morning dew"
      />
    </Aspect>
    <Aspect ratio="ultrawide">
      <img
        src="/marigold-abstract.webp"
        className="object-cover"
        alt="a marigold flower covered in morning dew"
      />
    </Aspect>
  </div>
);
