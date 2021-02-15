import React from 'react';
import { HTMLProps } from '@marigold/types';
import { Box, BoxProps } from '../Box';
import { system } from '@marigold/system';

type ButtonProps = {
  variant?: string;
} & HTMLProps<'button'>;

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary.large',
  children,
  ...props
}) => {
  return (
    <Box as="button" {...props} variant={`button.${variant}`}>
      <Box as="span" display="inline-flex" alignItems="center">
        {children}
      </Box>
    </Box>
  );
};

// ----

const Boxx = system<BoxProps, 'div'>(({ as = 'div', children, ...props }) => {
  const Component = as;
  return <Component {...props}>{children}</Component>;
});

export const Button2 = system<ButtonProps, 'button'>(
  ({ variant = 'primary.large', children, ...props }) => (
    <Boxx as="button" {...props} variant={`button.${variant}`}>
      <Box as="span" display="inline-flex" alignItems="center">
        {children}
      </Box>
    </Boxx>
  )
);

<Button2 as="a" ref={e => e}>
  asd
</Button2>;
