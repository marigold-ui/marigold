import React from 'react';
import { Text } from '@marigold/components';

export const Version = () => {
  const version = process.env.version;
  return (
    <Text variant="muted" display="block" align="right" p="small-1">
      v{version}
    </Text>
  );
};
