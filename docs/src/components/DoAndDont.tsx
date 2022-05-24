import React, { ReactNode } from 'react';

import {
  Card,
  Divider,
  Headline,
  Inline,
  Stack,
  Text,
} from '@marigold/components';
import { Banned, Check } from '@marigold/icons';
import { ComponentProps } from '@marigold/types';

import { MarigoldTheme } from './MarigoldTheme';

export interface DoAndDontProps extends ComponentProps<'div'> {
  children?: ReactNode;
  preview: string;
  dont?: boolean;
}

export const DoAndDont = ({
  preview,
  dont = false,
  children,
  ...props
}: DoAndDontProps) => {
  let icon = <Check size={20} fill="success" />;
  let dividerVariant = 'do';
  let title = 'Do';
  if (dont) {
    icon = <Banned size={20} fill="error" />;
    dividerVariant = 'dont';
    title = `Don't`;
  }

  return (
    <Card {...props}>
      <Stack space="small">
        <Card variant="highlight">
          <MarigoldTheme>{preview}</MarigoldTheme>
        </Card>
        <Inline space="xsmall">
          {icon}
          <Headline level="4">{title}</Headline>
        </Inline>
        <Text variant="muted">{children}</Text>
        <Divider variant={dividerVariant} />
      </Stack>
    </Card>
  );
};
