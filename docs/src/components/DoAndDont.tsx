import * as React from 'react';

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
  preview: string;
  dont?: boolean;
}

export const DoAndDont: React.FC<DoAndDontProps> = ({
  preview,
  dont = false,
  children,
  ...props
}) => {
  var icon = <Check size={20} fill="success" />;
  var dividerVariant = 'do';
  var title = 'Do';
  if (dont) {
    icon = <Banned size={20} fill="error" />;
    var dividerVariant = 'dont';
    var title = 'Do';
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
