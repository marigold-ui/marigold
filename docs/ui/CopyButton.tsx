import { track } from '@vercel/analytics/react';
import useClipboard from 'react-use-clipboard';
import { Button } from '@marigold/components';

interface CopyProps {
  codeString: string;
}

export const CopyButton = ({ codeString }: CopyProps) => {
  const [isCopied, setCopied] = useClipboard(codeString, {
    successDuration: 1000,
  });

  const onPress = () => {
    setCopied();
    track('Copy Code');
  };

  return (
    <Button aria-label="Copy Code" onPress={onPress} variant="icon">
      {isCopied ? (
        <svg
          className="size-5 fill-white"
          width="48"
          height="48"
          viewBox="0 0 24 24"
        >
          <path d="M8.17368 16.6154L3.19528 11.637L1.5 13.3204L8.17368 19.994L22.5 5.66772L20.8167 3.98437L8.17368 16.6154Z"></path>
        </svg>
      ) : (
        <svg
          className="size-5 fill-white"
          viewBox="0 0 16 16"
          fill="text.regular"
        >
          <path
            d="M8.8421 0H1.26316C0.568421 0 0 0.568421 0 1.26316V10.1053H1.26316V1.26316H8.8421V0ZM10.7368 2.52632H3.78947C3.09474 2.52632 2.52632 3.09474 2.52632 3.78947V12.6316C2.52632 13.3263 3.09474 13.8947 3.78947 13.8947H10.7368C11.4316 13.8947 12 13.3263 12 12.6316V3.78947C12 3.09474 11.4316 2.52632 10.7368 2.52632ZM10.7368 12.6316H3.78947V3.78947H10.7368V12.6316Z"
            fill="text.regular"
          />
        </svg>
      )}
    </Button>
  );
};
