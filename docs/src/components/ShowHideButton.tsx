import React from 'react';
import { Button } from '@marigold/components';
import b2bTheme from '@marigold/theme-b2b';
import { useStyles } from '@marigold/system';

type ShowHideButtonProps = {
  hide: boolean;
  onHideChange: React.Dispatch<React.SetStateAction<boolean>>;
};

const showHideButtonStyles = {
  position: 'absolute',
  bottom: 'none',
  right: 'none',
  padding: '8px 12px',
  background: b2bTheme.colors.gray00,
  color: b2bTheme.colors.gray60,
  borderStyle: 'solid',
  borderColor: b2bTheme.colors.gray30,
  borderWidth: '1px 0px 0px 1px',
  borderRadius: '4px 0px 4px 0px',
  cursor: 'pointer',
  fontSize: b2bTheme.fontSizes.xxsmall,
  fontFamily: b2bTheme.fonts.body,
  lineHeight: b2bTheme.lineHeights.heading,
};

export const ShowHideButton: React.FC<ShowHideButtonProps> = ({
  hide,
  onHideChange,
}) => {
  return (
    <Button
      onClick={() => {
        onHideChange(!hide);
      }}
      className={useStyles({ css: showHideButtonStyles })}
    >
      {hide ? 'Show code' : 'Hide code'}
    </Button>
  );
};
