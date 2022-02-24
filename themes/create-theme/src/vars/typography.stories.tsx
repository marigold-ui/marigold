import React from 'react';
import { Box, Stack } from '@marigold/components';
import type { Meta } from '@storybook/react';

import * as Vars from '.';

export default {
  title: 'Vars/Typography',
} as Meta;

export const Fonts = () => (
  <Stack space="32px" align="center">
    {Object.values(Vars.typography.font).map(value => (
      <Box css={{ fontFamily: value }}>
        A wizard's job is to vex chumps quickly in fog.
      </Box>
    ))}
  </Stack>
);

export const LineHeights = () => (
  <Stack space="32px" align="center">
    {Object.values(Vars.typography.lineHeight).map(value => (
      <Box
        css={{
          lineHeight: value,
          fontFamily: Vars.typography.font.sans,
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
  <Stack space="32px" align="center">
    {Object.values(Vars.typography.letterSpacing).map(value => (
      <Box
        css={{
          letterSpacing: value,
          fontFamily: Vars.typography.font.sans,
        }}
      >
        Streichholzschächtelchen
      </Box>
    ))}
  </Stack>
);

export const FontSizes = () => (
  <Stack space="32px" align="center">
    {Object.values(Vars.typography.size).map(value => (
      <Box
        css={{
          fontSize: value,
          fontFamily: Vars.typography.font.sans,
        }}
      >
        Waldeinsamkeit
      </Box>
    ))}
  </Stack>
);

export const FluidFontSizes = () => (
  <Stack space="32px" align="center">
    {Object.values(Vars.typography.sizeFluid).map(value => (
      <Box
        css={{
          fontSize: value,
          fontFamily: Vars.typography.font.sans,
        }}
      >
        Waldeinsamkeit
      </Box>
    ))}
  </Stack>
);
