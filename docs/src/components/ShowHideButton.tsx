import React from 'react';
import { Box, Button } from '@marigold/components';
import { ArrowDown, ArrowUp } from '@marigold/icons';

type ShowHideButtonProps = {
  hide: boolean;
  onHideChange: React.Dispatch<React.SetStateAction<boolean>>;
};

export const ShowHideButton: React.FC<ShowHideButtonProps> = ({
  hide,
  onHideChange,
}) => (
  <Button
    variant="action"
    onClick={() => {
      onHideChange(!hide);
    }}
  >
    <Box
      as={hide ? ArrowDown : ArrowUp}
      size={16}
      fill="#696b78"
      mr="xxsmall"
    />
    {hide ? 'View code' : 'Hide code'}
  </Button>
);
