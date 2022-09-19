import { Header, Image, Headline, Text, Aspect } from '@marigold/components';

export const ImageHeader = () => (
  <Header>
    <Aspect ratio="landscape">
      <Image
        variant="landscape"
        src="https://images.unsplash.com/photo-1603910234616-3b5f4a6be2b4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
        alt="event_image"
      />
    </Aspect>
    <Headline level="3">Header!</Headline>
    <Text>awesome</Text>
  </Header>
);
