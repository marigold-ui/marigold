import React from 'react';
import { Box, Button } from '@marigold/components';
import { SVG } from '@marigold/system';

interface CopyProps {
  codeString: string;
}

export const CopyButton = ({ codeString }: CopyProps) => {
  const [isCopied, setIsCopied] = React.useState(false);
  return (
    <Button
      variant="copy"
      onPress={() => {
        copyToClipboard(codeString);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 3000);
      }}
    >
      <Box
        as={SVG}
        size={16}
        viewBox="0 0 16 16"
        fill="text.regular"
        css={{
          mr: 'xxsmall',
        }}
      >
        <path
          d="M8.8421 0H1.26316C0.568421 0 0 0.568421 0 1.26316V10.1053H1.26316V1.26316H8.8421V0ZM10.7368 2.52632H3.78947C3.09474 2.52632 2.52632 3.09474 2.52632 3.78947V12.6316C2.52632 13.3263 3.09474 13.8947 3.78947 13.8947H10.7368C11.4316 13.8947 12 13.3263 12 12.6316V3.78947C12 3.09474 11.4316 2.52632 10.7368 2.52632ZM10.7368 12.6316H3.78947V3.78947H10.7368V12.6316Z"
          fill="text.regular"
        />
      </Box>
      {isCopied ? 'Copied 🎉' : 'Copy'}
    </Button>
  );
};

export const copyToClipboard = (codeString: string) => {
  navigator.clipboard.writeText(codeString);
};
