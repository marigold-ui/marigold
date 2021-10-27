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

const copyToClipboard = (codeString: string) => {
  navigator.clipboard.writeText(codeString);
};
