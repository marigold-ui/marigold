import { ReactNode } from 'react';
import { Box } from '@marigold/system';
import { Center } from '@marigold/components';

export const BoxAsComponentDemo = () => {
  /**
   * Image this is the <Link> component from a lib
   * like `react-router`.
   */
  const RouterLink = ({
    to,
    children,
    ...props
  }: {
    to: string;
    children: ReactNode;
    className?: string;
  }) => (
    <a href={to} {...props}>
      {children}
    </a>
  );

  return (
    <Center>
      <Box
        css={{ '&:hover': { color: '#fa8005' } }}
        as={RouterLink}
        to="https://karriere.reservix.net/"
      >
        Reservix
      </Box>
    </Center>
  );
};
