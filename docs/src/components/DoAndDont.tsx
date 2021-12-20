import * as React from 'react';

import { Box, Card, Divider, Inline, Text } from '@marigold/components';
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
          pt="small"
          pb="xsmall"
          css={{ color: dont ? 'red' : 'green' }}
        >
          {dont ? (
            <Inline space="xsmall">
              <Banned size={20} />
              <Text as="h4" variant="headline4">
                Don't
              </Text>
            </Inline>
          ) : (
            <Inline space="xsmall">
              <Check size={20} />
              <Text as="h4" variant="headline4" color="">
                Do
              </Text>
            </Inline>
          )}
        </Box>
        <Text variant="muted">{children}</Text>
      </Box>
      <Divider variant={dont ? 'dont' : 'do'} />
    </Card>
  );
};
