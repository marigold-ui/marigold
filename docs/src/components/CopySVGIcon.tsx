import React from 'react';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/styles';
import 'open-props/style';

import { Box, Button } from '@marigold/components';

import { copyToClipboard } from './CopyButton';

// Remove this if we have an own Tooltip component
const MarigoldTooltip = styled(({ className, ...props }) => (
  <Box as={Tooltip} {...props} classes={{ popper: className }} />
))(() => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: '#1D67B6',
  },
  [`& .${tooltipClasses.tooltip}`]: {
    border: '2px solid #1D67B6',
    borderRadius: '8px',
    color: 'black',
    background: '#E8F4FA',
    fontSize: 14,
  },
}));

export const CopySVGIcon: React.FC = ({ children }) => {
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
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <MarigoldTooltip
      title={copied ? 'Copied' : 'Click to copy'}
      placement="bottom"
      arrow
    >
      <Box
        as={Button}
        ref={ref}
        variant="button.icon"
        size="table"
        onClick={onClick}
        css={{
          '> * + *': { animation: copied ? 'var(--animation-bounce)' : '' },
        }}
      >
        {children}
      </Box>
    </MarigoldTooltip>
  );
};
