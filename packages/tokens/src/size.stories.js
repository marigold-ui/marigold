import React from 'react';
import { Box, Inline, Stack } from '@marigold/components';
import * as Token from '.';
export default {
  title: 'Token/Size',
};
export const Fixed = () =>
  React.createElement(
    Inline,
    { space: '12px' },
    Object.values(Token.size.fixed).map(value =>
      React.createElement(Box, {
        css: {
          display: 'grid',
          placeItems: 'center',
          color: Token.color.gray['00'],
          bg: Token.color.gray['80'],
          blockSize: 100,
          height: Token.size.fixed['large-4'],
          width: value,
        },
      })
    )
  );
export const Fluid = () =>
  React.createElement(
    Inline,
    { space: '12px' },
    Object.values(Token.size.fluid).map(value =>
      React.createElement(Box, {
        css: {
          display: 'grid',
          placeItems: 'center',
          color: Token.color.gray['00'],
          bg: Token.color.gray['80'],
          blockSize: 100,
          height: Token.size.fixed['large-4'],
          width: value,
        },
      })
    )
  );
export const Headlines = () =>
  React.createElement(
    Stack,
    { space: '24px' },
    Object.values(Token.size.header).map(value =>
      React.createElement(
        Box,
        {
          css: {
            fontSize: Token.typography.size.fluid['medium-1'],
            fontFamily: Token.typography.font.sans,
            maxWidth: value,
          },
        },
        "You'll Be in Hot Water if You Miss This Guide to Celebrating Valentine\u2019s Day"
      )
    )
  );
export const Content = () =>
  React.createElement(
    Stack,
    { space: '24px' },
    Object.values(Token.size.content).map(value =>
      React.createElement(
        Box,
        {
          key: value,
          css: {
            fontSize: Token.typography.size.fluid['small-1'],
            fontFamily: Token.typography.font.sans,
            maxWidth: value,
          },
        },
        'In the wild, giraffes almost never lie down because of vulnerability to predators. They usually sleep standing, sometimes sitting, and they give birth standing up. When giraffes sleep, they curl their necks and sleep for about five minutes at a time, sleeping no more than 30 minutes a day.'
      )
    )
  );
//# sourceMappingURL=size.stories.js.map
