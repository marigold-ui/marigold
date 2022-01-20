import React from 'react';
import { useVisuallyHidden, VisuallyHidden } from '@react-aria/visually-hidden';

import { Box } from '../Box';

export type HiddenProps = {
  show?: boolean;
};

export const Hidden: React.FC<HiddenProps> = ({
  show = false,
  children,
  ...props
}) => {
  const { visuallyHiddenProps } = useVisuallyHidden();

  return show ? (
    <Box {...props}>{children}</Box>
  ) : (
    <VisuallyHidden {...visuallyHiddenProps} {...props}>
      {children}
    </VisuallyHidden>
  );
};
