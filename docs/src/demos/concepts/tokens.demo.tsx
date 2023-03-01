import { useState } from 'react';
import {
  Aside,
  Box,
  Inset,
  MarigoldProvider,
  Radio,
} from '@marigold/components';

export const TokensDemo = () => {
  const theme = {
    colors: {
      red: '#f87171',
      blue: '#93c5fd',
      green: '#86efac',
    },
    space: {
      none: 0,
      small: 8,
      large: 32,
    },
    sizes: {
      none: 0,
      medium: 120,
      large: 240,
    },
    radii: {
      none: 0,
      medium: 20,
    },
  };

  const [currentColor, setColor] = useState(theme.colors.blue);

  return (
    <Aside space="small" sideWidth="10em">
      <Radio.Group
        label="Select Background:"
        value={currentColor}
        onChange={setColor}
      >
        {Object.entries(theme.colors).map(([color, value]) => (
          <Radio key={value} value={value}>
            {color}
          </Radio>
        ))}
      </Radio.Group>
      <Inset space="none">
        <MarigoldProvider theme={theme} selector="#token-demo">
          <Box
            css={{
              background: currentColor,
              width: 'large',
              height: 'medium',
              borderRadius: 'medium',
            }}
          />
        </MarigoldProvider>
      </Inset>
    </Aside>
  );
};
