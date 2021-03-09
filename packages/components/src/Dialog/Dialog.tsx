import React, { Children } from 'react';
import { ComponentProps } from '@marigold/types';
import flattenChildren from 'react-keyed-flatten-children';

import { Close } from '@marigold/icons';
import { Button } from '../Button';
import { Box } from '../Box';

export type DialogProps = {
  variant?: string;
  onClose?: ComponentProps<typeof Button>['onClick'];
} & ComponentProps<'div'>;

export const Dialog: React.FC<DialogProps> = ({
  variant = 'basic',
  onClose,
  children,
  className,
  ...props
}) => {
  let dialogItems = flattenChildren(children);

  return (
    <Box display="flex" width="100%">
      <Box
        {...props}
        display="block"
        borderRadius="2px"
        pl="32px"
        pb="32px"
        variant={`dialog.${variant}`}
        className={className}
      >
        <Box display="flex">
          <Box pt="32px">
            {Children.map(dialogItems, child => (
              <Box display="block">{child}</Box>
            ))}
          </Box>
          <Box
            display="flex"
            justifyContent="flex-end"
            alignItems="start"
            pt="8px"
            px="8px"
          >
            <Button variant="text.root" onClick={onClose}>
              <Close size={16} />
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
