import React from 'react';
import { Box, system } from '@marigold/system';
import { SquareUnchecked, SquareChecked } from '@marigold/icons';

type CheckboxProps = {};

export const Checkbox = system<CheckboxProps, 'input'>(
  ({ variant = 'checkbox', ...props }) => {
    return (
      <Box css={{ display: 'inline-block' }}>
        <Box
          as="input"
          type="checkbox"
          {...props}
          css={{
            position: 'absolute',
            opacity: 0,
            zIndex: -1,
            width: 1,
            height: 1,
            overflow: 'hidden',
          }}
        />
        <Box
          as={props.checked ? SquareChecked : SquareUnchecked}
          aria-hidden="true"
          themeSection="form"
          variant={variant}
          css={{
            mr: 2,
            verticalAlign: 'middle',
            ':hover': { cursor: 'pointer' },
            'input:disabled ~ &': {
              color: 'muted',
              cursor: 'not-allowed',
            },
          }}
        />
      </Box>
    );
  }
);
