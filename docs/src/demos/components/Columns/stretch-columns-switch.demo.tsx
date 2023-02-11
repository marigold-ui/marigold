import { useState } from 'react';
import { Box, Columns, Stack, Switch } from '@marigold/components';

export const StretchColumnsSwitch = () => {
  const [stretch, setStretch] = useState(false);

  return (
    <Stack space="medium">
      <Box css={{ p: 8, borderRadius: 12, bg: '#e9ecef' }}>
        <Switch onChange={() => setStretch(!stretch)}>Toggle stretch</Switch>
      </Box>
      <Box css={{ height: 300, bg: '#adb5bd' }}>
        <Columns columns={[1, 1, 1]} stretch={stretch}>
          <Box
            css={{
              border: '1px solid #495057',
              bg: '#e9ecef',
              height: '150px',
            }}
          />
          <Box
            css={{
              border: '1px solid #495057',
              bg: '#e9ecef',
              height: '150px',
            }}
          />
          <Box
            css={{
              border: '1px solid #495057',
              bg: '#e9ecef',
              height: '100%',
              p: 8,
            }}
          >
            I will grow, if you set <code>stretch</code> prop on the{' '}
            <code>Columns</code>!
          </Box>
        </Columns>
      </Box>
    </Stack>
  );
};
