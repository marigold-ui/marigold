import React from 'react';
import { Button } from '@marigold/components';
import b2bTheme from '@marigold/theme-b2b';
import { useStyles } from '@marigold/system';

type CopyProps = {
  codeString: string;
};

const copyButtonStyles = {
  position: 'absolute',
  bottom: b2bTheme.space.none,
  right: b2bTheme.space.none,
  padding: '8px 12px',
  background: '#f6f8fa',
  color: b2bTheme.colors.gray60,
  border: 'none',
  cursor: 'pointer',
  fontSize: b2bTheme.fontSizes.xxsmall,
  fontFamily: b2bTheme.fonts.body,
  lineHeight: b2bTheme.lineHeights.heading,
};

export const CopyButton: React.FC<CopyProps> = ({ codeString }) => {
  const [isCopied, setIsCopied] = React.useState(false);
  return (
    <Button
      onClick={() => {
        copyToClipboard(codeString);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 3000);
      }}
      className={useStyles({ css: copyButtonStyles })}
    >
      {isCopied ? 'Copied 🎉' : 'Copy'}
    </Button>
  );
};

function copyToClipboard(codeString: string) {
  const element = document.createElement('textarea');
  element.value = codeString;
  element.setAttribute('readonly', '');
  element.style.position = 'absolute';
  element.style.left = '-9999px';
  document.body.appendChild(element);
  element.select();
  document.execCommand('copy');
  document.body.removeChild(element);
}
