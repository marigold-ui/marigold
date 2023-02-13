import React from 'react';
import { Text } from '@marigold/components';

export const Version = () => {
  const version = process.env.version;
  return (
    <Text variant="muted" align="right">
      v{version}
    </Text>
  );
};
