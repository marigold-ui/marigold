import React, { useState } from 'react';
import { Box, system } from '@marigold/system';
import { Circle0, Circle1 } from '@marigold/icons';

type RadioProps = {};

export const Radio = system<RadioProps, 'input'>(
  ({ variant = 'radio', checked, ...props }) => {
    const [isCheckedOn, setChecked] = useState(false);
    const toggleChecked = () => setChecked(!isCheckedOn);
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
          onClick={() => toggleChecked()}
        />
        <Box
          as={isCheckedOn || checked ? Circle1 : Circle0}
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
