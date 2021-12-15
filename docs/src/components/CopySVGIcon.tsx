import React from 'react';
import { Snackbar, Tooltip } from '@mui/material';

import { Button } from '@marigold/components';

import { copyToClipboard } from './CopyButton';

export const CopySVGIcon: React.FC = ({ children }) => {
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [copied, setCopied] = React.useState(false);
  const ref = React.createRef<any>();

  const onClick = () => {
    // get svg element and remove class prop from it
    const svgElement = ref.current.querySelector('svg').outerHTML;
    const modifiedString = svgElement.replace(
      / class="[a-zA-Z0-9:;.\s()\-,]*"/,
      ''
    );
    copyToClipboard(modifiedString);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
    setOpenSnackbar(true);
  };

  return (
    <>
      <Tooltip title={copied ? 'Copied' : 'Copy'} placement="bottom" arrow>
        <Button ref={ref} variant="icon" size="table" onClick={onClick}>
          {children}
        </Button>
      </Tooltip>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={5000}
        onClose={() => setOpenSnackbar(false)}
        message="Icon was copied as SVG to clipboard"
      />
    </>
  );
};
