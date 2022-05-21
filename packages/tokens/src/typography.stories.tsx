import React from 'react';
import { Box, Stack } from '@marigold/components';
import type { Meta } from '@storybook/react';

import * as Token from '.';

export default {
  title: 'Token/Typography',
} as Meta;

export const Fonts = () => (
  <Stack space="32px" alignX="center">
    {Object.values(Token.typography.font).map(value => (
      <Box key={value} css={{ fontFamily: value }}>
        A wizard's job is to vex chumps quickly in fog.
      </Box>
    ))}
  </Stack>
);

export const LineHeights = () => (
  <Stack space="32px" alignX="center">
    {Object.values(Token.typography.lineHeight).map(value => (
      <Box
        key={value}
        css={{
          lineHeight: value,
          fontFamily: Token.typography.font.sans,
          maxWidth: '75ch',
        }}
      >
        <strong>How many minutes do you boil an egg?</strong>
        <br />
        Cook for a further minute if you like your soft boiled eggs a little
        firmer. For a hard-boiled egg, start the egg in cold water and bring up
        to the boil. Once the water is gently boiling, set the timer for between
        7-10 minutes depending on how well cooked you like your eggs.
      </Box>
    ))}
  </Stack>
);

export const LetterSpacing = () => (
  <Stack space="32px" alignX="center">
    {Object.values(Token.typography.letterSpacing).map(value => (
      <Box
        key={value}
        css={{
          letterSpacing: value,
          fontFamily: Token.typography.font.sans,
        }}
      >
        Streichholzschächtelchen
      </Box>
    ))}
  </Stack>
);

export const FontSizes = () => (
  <Stack space="32px" alignX="center">
    {Object.values(Token.typography.size.fixed).map(value => (
      <Box
        key={value}
        css={{
          fontSize: value,
          fontFamily: Token.typography.font.sans,
        }}
      >
        Waldeinsamkeit
      </Box>
    ))}
  </Stack>
);

export const FluidFontSizes = () => (
  <Stack space="32px" alignX="center">
    {Object.values(Token.typography.size.fluid).map(value => (
      <Box
        key={value}
        css={{
          fontSize: value,
          fontFamily: Token.typography.font.sans,
        }}
      >
        Waldeinsamkeit
      </Box>
    ))}
  </Stack>
);

export const FontWeights = () => (
  <Stack space="32px" alignX="center">
    {Object.values(Token.typography.weight).map(value => (
      <Box
        key={value}
        css={{
          fontWeight: value,
          fontSize: Token.typography.size.fixed['medium-4'],
          fontFamily: Token.typography.font.sans,
        }}
      >
        Unabhängigkeitserklärungen
      </Box>
    ))}
  </Stack>
);
