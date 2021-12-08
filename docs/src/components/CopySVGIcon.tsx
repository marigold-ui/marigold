import React, { ReactElement, useState } from 'react';
import { renderToString } from 'react-dom/server';

// if we use our own Tooltip and Snackbar remove also no-restricted-imports in eslint config rules
import Snackbar from '@mui/material/Snackbar';
import Tooltip from '@mui/material/Tooltip';

import { Button } from '@marigold/components';

import { copyToClipboard } from './CopyButton';

export const CopySVGIcon: React.FC = ({ children }) => {
  const [openSnackbar, setOpenSnackbar] = useState(false);

  // remove class prop from stringified html element
  const stringifiedChildren = renderToString(children as ReactElement);
  const removeClassRegex = / class="[a-zA-Z0-9:;.\s()\-,]*"/;
  const finalString = stringifiedChildren.replace(removeClassRegex, '');

  return (
    <>
      <Tooltip title="Copy SVG" placement="right" arrow>
        <Button
          variant="action"
          onClick={() => {
            copyToClipboard(finalString);
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
