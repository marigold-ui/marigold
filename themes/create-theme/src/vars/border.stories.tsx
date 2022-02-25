import React from 'react';
import { Box, Inline } from '@marigold/components';
import type { Meta } from '@storybook/react';

import * as Vars from '.';

export default {
  title: 'Vars/Border',
} as Meta;

export const Size = () => (
  <Inline space="12px">
    {Object.values(Vars.border.size).map(value => (
      <Box
        key={value}
        css={{
          width: 100,
          height: 100,
          bg: Vars.color.gray['20'],
          borderStyle: 'solid',
          borderColor: Vars.color.gray['80'],
          borderWidth: value,
        }}
      />
    ))}
  </Inline>
);

export const Radius = () => (
  <Inline space="12px">
    {Object.values(Vars.border.radius).map(value => (
      <Box
        key={value}
        css={{
          width: 100,
          height: 100,
          borderStyle: 'solid',
          borderColor: Vars.color.gray['80'],
          borderWidth: Vars.border.size.medium,
          borderRadius: value,
        }}
      />
    ))}
  </Inline>
);
