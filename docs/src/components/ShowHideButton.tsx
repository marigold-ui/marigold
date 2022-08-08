import React from 'react';
import { Box, Button } from '@marigold/components';
import { ChevronDown, ChevronUp } from '@marigold/icons';

interface ShowHideButtonProps {
  hide: boolean;
  onHideChange: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ShowHideButton = ({ hide, onHideChange }: ShowHideButtonProps) => (
  <Button
    variant="action"
    onClick={() => {
      onHideChange(!hide);
    }}
  >
    <Box
      as={hide ? ChevronDown : ChevronUp}
      size={16}
      fill="#696b78"
      mr="xxsmall"
    />
    {hide ? 'View code' : 'Hide code'}
  </Button>
);
