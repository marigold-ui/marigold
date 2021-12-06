import * as React from 'react';

import {
  Box,
  Card,
  Divider,
  Heading,
  Inline,
  Text,
} from '@marigold/components';
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
            <Inline as="span" space="xsmall" align="center">
              <Banned size={20} />
              <Heading as="h4" variant="h4">
                Don't
              </Heading>
            </Inline>
          ) : (
            <Inline as="span" space="xsmall" align="center">
              <Check size={20} />
              <Heading as="h4" variant="h4">
                Do
              </Heading>
            </Inline>
          )}
        </Box>
        <Text variant="muted">{children}</Text>
      </Box>
      <Divider variant={dont ? 'dont' : 'do'} />
    </Card>
  );
};
