import { Aspect, Image } from '@marigold/components';

export const BasicImage = () => (
  <Aspect maxWidth="100%" ratio="widescreen">
    <Image
      fit="cover"
      position="center"
      src="https://images.unsplash.com/photo-1603910234616-3b5f4a6be2b4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
      alt="event_image"
    />
  </Aspect>
);
