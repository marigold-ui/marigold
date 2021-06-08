import React from 'react';
import { Button } from '@marigold/components';

type ShowHideButtonProps = {
  hide: boolean;
  onHideChange: React.Dispatch<React.SetStateAction<boolean>>;
};

export const ShowHideButton: React.FC<ShowHideButtonProps> = ({
  hide,
  onHideChange,
}) => {
  return (
    <>
      <br />
      <Button
        variant="text.small"
        onClick={() => {
          onHideChange(!hide);
        }}
      >
        {hide ? 'Show code' : 'Hide code'}
      </Button>
    </>
  );
};
