import React from 'react';
import { Box } from '../Box';
const ALIGNMENT_X = {
  left: 'flex-start',
  center: 'center',
  right: 'flex-end',
};
const ALIGNMENT_Y = {
  top: 'flex-start',
  center: 'center',
  bottom: 'flex-end',
};
// Component
// ---------------
export const Stack = ({
  children,
  space = 'none',
  alignX = 'left',
  alignY = 'top',
  stretch = false,
  ...props
}) =>
  React.createElement(
    Box,
    {
      css: {
        display: 'flex',
        flexDirection: 'column',
        p: 0,
        gap: space,
        alignItems: ALIGNMENT_X[alignX],
        justifyContent: ALIGNMENT_Y[alignY],
        blockSize: stretch ? '100%' : 'auto',
      },
      ...props,
    },
    children
  );
//# sourceMappingURL=Stack.js.map
