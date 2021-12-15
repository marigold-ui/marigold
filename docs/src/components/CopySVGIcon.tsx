import React, { Children, ReactElement, useState } from 'react';
import { renderToString } from 'react-dom/server';
import { Snackbar, Tooltip } from '@mui/material';

import { Button } from '@marigold/components';

import { copyToClipboard } from './CopyButton';

export const CopySVGIcon: React.FC = ({ children }) => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [copied, setCopied] = useState(false);

  // remove class prop from stringified html element
  const childrenArray = Children.toArray(children);
  const stringifiedIcon = renderToString(childrenArray[1] as ReactElement);
  const modifiedString = stringifiedIcon.replace(
    / class="[a-zA-Z0-9:;.\s()\-,]*"/,
    ''
  );

  return (
    <>
      <Tooltip title={copied ? 'Copied' : 'Copy'} placement="bottom" arrow>
        <Button
          variant="icon"
          size="table"
          onClick={() => {
            copyToClipboard(modifiedString);
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
