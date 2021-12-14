import React, { ReactElement, useState } from 'react';
import { renderToString } from 'react-dom/server';
import { Snackbar, Tooltip } from '@mui/material';

import { Button } from '@marigold/components';

import { copyToClipboard } from './CopyButton';

export const CopySVGIcon: React.FC = ({ children }) => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [copied, setCopied] = useState(false);

  // remove class prop from stringified html element
  const stringifiedChildren = renderToString(children as ReactElement);
  const removeClassRegex = / class="[a-zA-Z0-9:;.\s()\-,]*"/;
  const finalString = stringifiedChildren.replace(removeClassRegex, '');

  return (
    <>
      <Tooltip title={copied ? 'Copied' : 'Copy'} placement="bottom" arrow>
        <Button
          variant="action"
          size="table"
          onClick={() => {
            copyToClipboard(finalString);
            setCopied(true);
            setTimeout(() => setCopied(false), 3000);
            setOpenSnackbar(true);
          }}
        >
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
