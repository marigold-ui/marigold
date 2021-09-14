import React from 'react';
import { ComponentProps } from '@marigold/types';

import { Close } from '@marigold/icons';
import { Button } from '../Button';
import { Box } from '../Box';

export type DialogProps = {
  onClose?: ComponentProps<typeof Button>['onClick'];
} & ComponentProps<'div'>;

export const Dialog: React.FC<DialogProps> = ({
  onClose,
  children,
  className,
  ...props
}) => {
  return (
    <Box display="flex" width="100%">
      <Box {...props} variant="dialog.wrapper" className={className}>
        <Box display="flex">
          <Box variant="dialog.body">{children}</Box>
          <Box variant="dialog.onClose">
            <Button variant="close" size="xsmall" onClick={onClose}>
              <Close size={16} />
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
