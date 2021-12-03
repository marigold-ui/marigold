import * as React from 'react';

import { Box, Card, Divider, Heading, Text } from '@marigold/components';
import { Banned, Check } from '@marigold/icons';
import { ComponentProps } from '@marigold/types';

import { MarigoldTheme } from './MarigoldTheme';

export type DoAndDontProps = {
  preview: string;
  dont?: boolean;
  variant?: string;
} & ComponentProps<'div'>;

export const DoAndDont: React.FC<DoAndDontProps> = ({
  variant = 'default',
  preview,
  dont = false,
  className,
  children,
  ...props
}) => {
  return (
    <Card className={className} {...props}>
      <Box display="flex" flexDirection="column">
        <Card variant="highlight">
          <MarigoldTheme>{preview}</MarigoldTheme>
        </Card>
        <Box
          display="flex"
          alignItems="center"
          py="xsmall"
          css={{ color: dont ? 'red' : 'green' }}
        >
          {dont ? (
            <Box as="span" mr="xsmall">
              <Banned size={20} />
            </Box>
          ) : (
            <Box as="span" mr="xsmall">
              <Check size={20} />
            </Box>
          )}
          <Heading as="h4" variant="h4">
            {dont ? "Don't" : `Do`}
          </Heading>
        </Box>
        <Text variant="muted">{children}</Text>
      </Box>
      <Divider variant={dont ? 'dont' : 'do'} />
    </Card>
  );
};
