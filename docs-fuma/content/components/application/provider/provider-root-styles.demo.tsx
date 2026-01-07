'use client';

import { Card, Inset, MarigoldProvider } from '@marigold/components';
import theme from '@marigold/theme-rui';

export default () => (
  <MarigoldProvider theme={theme} className="bg-surface-sunken rounded-lg">
    <Inset space={6}>
      <Card p={4}>
        This card will always be on a sunken surface with rounded corners.
      </Card>
    </Inset>
  </MarigoldProvider>
);
