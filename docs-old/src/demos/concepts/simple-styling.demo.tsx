import { useState } from 'react';
import {
  Button,
  Center,
  Columns,
  MarigoldProvider,
  Radio,
  Stack,
} from '@marigold/components';

export const SimpleStyling = () => {
  const theme = {
    colors: {
      primary: '#93c5fd',
      secondary: '#bfdbfe',
      ghost: '#e2e8f0',
      text: '#1c1917',
    },
    space: {
      none: 0,
      small: 8,
      medium: 16,
      large: 32,
    },
    radii: {
      none: 0,
      button: 20,
    },
    components: {
      Button: {
        base: {
          color: 'text',
          bg: 'ghost', // <-- bg is a shorthand for background
          borderRadius: 'button',
          // These values should usually also use tokens!
          fontSize: 14,
          fontWeight: 'bold',
          textTransform: 'uppercase',
          border: 'none',
        },
        variant: {
          primary: {
            bg: 'primary',
          },
          secondary: {
            bg: 'secondary',
          },
        },
        size: {
          regular: {
            py: 'small', // <-- py is a shorthand for paddingTop + paddintBottom
            px: 'medium', // <-- px is a shorthand for paddingLeft + paddintRight
          },
          large: {
            py: 'medium', // <-- py is a shorthand for paddingTop + paddintBottom
            px: 'large', // <-- px is a shorthand for paddingLeft + paddintRight
          },
        },
      },
    },
  };

  const [variant, setVariant] = useState('');
  const [size, setSize] = useState('regular');

  return (
    <Columns columns={[1, 1, 1]} collapseAt="25em">
      <Radio.Group
        label="Select Variant:"
        value={variant}
        onChange={setVariant}
      >
        <Radio value="">none</Radio>
        <Radio value="primary">primary</Radio>
        <Radio value="secondary">secondary</Radio>
      </Radio.Group>
      <Radio.Group label="Select Size:" value={size} onChange={setSize}>
        <Radio value="regular">regular</Radio>
        <Radio value="large">large</Radio>
      </Radio.Group>
      <Stack alignY="center" stretch>
        <Center>
          <MarigoldProvider theme={theme} selector="#simple-styling-demo">
            <Button variant={variant} size={size}>
              Submit
            </Button>
          </MarigoldProvider>
        </Center>
      </Stack>
    </Columns>
  );
};
