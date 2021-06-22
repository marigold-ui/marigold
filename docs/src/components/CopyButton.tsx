import React from 'react';
import { Button } from '@marigold/components';

type CopyProps = {
  codeString: string;
};

export const CopyButton: React.FC<CopyProps> = ({ codeString }) => {
  const [isCopied, setIsCopied] = React.useState(false);
  return (
    <>
      <br />
      <Button
        variant="copy"
        onClick={() => {
          copyToClipboard(codeString);
          setIsCopied(true);
          setTimeout(() => setIsCopied(false), 3000);
        }}
      >
        {isCopied ? 'Copied 🎉' : 'Copy'}
      </Button>
    </>
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
