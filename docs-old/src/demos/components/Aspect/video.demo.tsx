import { Aspect } from '@marigold/components';

export const AspectVideo = () => (
  <Aspect ratio="widescreen">
    <iframe
      title="rx_video"
      src="https://www.youtube.com/embed/_ZKugGhbjLY"
      width="100%"
      height="100%"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    />
  </Aspect>
);
