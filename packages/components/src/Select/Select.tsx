import React from 'react';
import { Box, system } from '@marigold/system';
import { ArrowDown } from '@marigold/icons';

type SelectProps = {};

export const Select = system<SelectProps, 'select'>(
  ({ variant = 'select', ref, ...props }) => {
    return (
      <Box css={{ display: 'flex' }}>
        <Box
          as="select"
          ref={ref}
          themeSection="form"
          variant={variant}
          {...props}
        />
        <ArrowDown
          ml={'-28px'}
          css={{
            alignSelf: 'center',
            pointerEvents: 'none',
          }}
        />
      </Box>
    );
  }
);
