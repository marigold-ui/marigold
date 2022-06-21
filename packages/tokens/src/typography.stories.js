import React from 'react';
import { Box, Stack } from '@marigold/components';
import * as Token from '.';
export default {
  title: 'Token/Typography',
};
export const Fonts = () =>
  React.createElement(
    Stack,
    { space: '32px', alignX: 'center' },
    Object.values(Token.typography.font).map(value =>
      React.createElement(
        Box,
        { key: value, css: { fontFamily: value } },
        "A wizard's job is to vex chumps quickly in fog."
      )
    )
  );
export const LineHeights = () =>
  React.createElement(
    Stack,
    { space: '32px', alignX: 'center' },
    Object.values(Token.typography.lineHeight).map(value =>
      React.createElement(
        Box,
        {
          key: value,
          css: {
            lineHeight: value,
            fontFamily: Token.typography.font.sans,
            maxWidth: '75ch',
          },
        },
        React.createElement(
          'strong',
          null,
          'How many minutes do you boil an egg?'
        ),
        React.createElement('br', null),
        'Cook for a further minute if you like your soft boiled eggs a little firmer. For a hard-boiled egg, start the egg in cold water and bring up to the boil. Once the water is gently boiling, set the timer for between 7-10 minutes depending on how well cooked you like your eggs.'
      )
    )
  );
export const LetterSpacing = () =>
  React.createElement(
    Stack,
    { space: '32px', alignX: 'center' },
    Object.values(Token.typography.letterSpacing).map(value =>
      React.createElement(
        Box,
        {
          key: value,
          css: {
            letterSpacing: value,
            fontFamily: Token.typography.font.sans,
          },
        },
        'Streichholzsch\u00E4chtelchen'
      )
    )
  );
export const FontSizes = () =>
  React.createElement(
    Stack,
    { space: '32px', alignX: 'center' },
    Object.values(Token.typography.size.fixed).map(value =>
      React.createElement(
        Box,
        {
          key: value,
          css: {
            fontSize: value,
            fontFamily: Token.typography.font.sans,
          },
        },
        'Waldeinsamkeit'
      )
    )
  );
export const FluidFontSizes = () =>
  React.createElement(
    Stack,
    { space: '32px', alignX: 'center' },
    Object.values(Token.typography.size.fluid).map(value =>
      React.createElement(
        Box,
        {
          key: value,
          css: {
            fontSize: value,
            fontFamily: Token.typography.font.sans,
          },
        },
        'Waldeinsamkeit'
      )
    )
  );
export const FontWeights = () =>
  React.createElement(
    Stack,
    { space: '32px', alignX: 'center' },
    Object.values(Token.typography.weight).map(value =>
      React.createElement(
        Box,
        {
          key: value,
          css: {
            fontWeight: value,
            fontSize: Token.typography.size.fixed['medium-4'],
            fontFamily: Token.typography.font.sans,
          },
        },
        'Unabh\u00E4ngigkeitserkl\u00E4rungen'
      )
    )
  );
//# sourceMappingURL=typography.stories.js.map
