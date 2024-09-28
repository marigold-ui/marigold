import { Card, Inset, MarigoldProvider } from '@marigold/components';
import theme from '@marigold/theme-core';

export default () => (
  <MarigoldProvider theme={theme} className="bg-black">
    <Inset space={6}>
      <Card p={4}>I am a Card! On a black background!? What!?</Card>
    </Inset>
  </MarigoldProvider>
);
