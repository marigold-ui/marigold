import React from 'react';
import { Box, system } from '@marigold/system';
import { CircleUnchecked, CircleChecked } from '@marigold/icons';

type RadioProps = {};

export const Radio = system<RadioProps, 'input'>(
  ({ variant = 'radio', ...props }) => {
    return (
      <Box css={{ display: 'inline-block' }}>
        <Box
          as="input"
          type="radio"
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
          as={props.checked ? CircleChecked : CircleUnchecked}
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
