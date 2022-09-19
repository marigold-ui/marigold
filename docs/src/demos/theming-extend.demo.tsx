import React from 'react';
import {
  extendTheme,
  Button,
  Center,
  MarigoldProvider,
} from '@marigold/components';
import theme from '@marigold/theme-b2b';

const customTheme = extendTheme(theme, {
  fonts: {
    system: 'system-ui, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
  },
  components: {
    Button: {
      variant: {
        cta: {
          // You can still use all the tokens from the theme extended theme
          color: 'gray00',
          fontSize: 'xsmall',
          borderRadius: 'large',
          // You can also use tokens defined in the theme extension
          fontFamily: 'system',
          // And if you really want to, even use hard coded values
          background:
            'linear-gradient(319deg, #663dff 0%, #aa00ff 37%, #cc4499 100%)',
          textTransform: 'uppercase',
          fontWeight: 600,
          transition: 'transform 0.25s cubic-bezier(.5, -.1, .1, 1.5)',

          '&:hover': {
            transform: 'scale(1.5)',
          },

          '&:active': {
            transform: 'scale(1.6)',
          },
        },
      },
    },
  },
});

export const App = () => (
  <MarigoldProvider theme={customTheme} selector="#key">
    <Center>
      <Button variant="cta">Buy now</Button>
    </Center>
  </MarigoldProvider>
);
