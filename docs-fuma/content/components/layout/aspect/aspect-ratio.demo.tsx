'use client';

import { Aspect } from '@marigold/components';

export default () => (
  <div className="grid auto-rows-max grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-x-2 gap-y-4">
    <Aspect ratio="portrait">
      <img
        src="/marigold-abstract.webp"
        className="object-cover"
        alt="an abstract marigold flower"
      />
    </Aspect>
    <Aspect ratio="square">
      <img src="/marigold-abstract.webp" alt="an abstract marigold flower" />
    </Aspect>
    <Aspect ratio="landscape">
      <img
        src="/marigold-abstract.webp"
        className="object-cover"
        alt="an abstract marigold flower"
      />
    </Aspect>
    <Aspect ratio="golden">
      <img
        src="/marigold-abstract.webp"
        className="object-cover"
        alt="an abstract marigold flower"
      />
    </Aspect>
    <Aspect ratio="widescreen">
      <img
        src="/marigold-abstract.webp"
        className="object-cover"
        alt="an abstract marigold flower"
      />
    </Aspect>
    <Aspect ratio="ultrawide">
      <img
        src="/marigold-abstract.webp"
        className="object-cover"
        alt="an abstract marigold flower"
      />
    </Aspect>
  </div>
);
