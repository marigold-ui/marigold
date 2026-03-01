'use client';

import { useState } from 'react';
import {
  Headline,
  Inline,
  Inset,
  Stack,
  Switch,
  Text,
  TextField,
} from '@marigold/components';
import { VisualSpacing } from '@/ui/VisualSpacing';

export default () => {
  const [showSpacing, setShowSpacing] = useState(false);

  return (
    <Stack space="8">
      <Switch
        label="Show spacing"
        selected={showSpacing}
        onChange={setShowSpacing}
      />
      <Inset spaceX={20}>
        <Stack space="section">
          <Stack space="regular">
            <Stack space="tight">
              <Headline level={2}>Personal Information</Headline>
              <Text variant="muted" size="sm">
                Please provide your name and contact details.
              </Text>
            </Stack>
            {showSpacing && (
              <VisualSpacing orientation="vertical" space="regular" />
            )}
            <div className={showSpacing ? 'pb-8' : ''}>
              <Inline space="related">
                <TextField label="First Name" width="1/3" required />
                {showSpacing && (
                  <VisualSpacing space="related" orientation="horizontal" />
                )}
                <TextField label="Last Name" width="1/2" required />
              </Inline>
            </div>
            {showSpacing && (
              <VisualSpacing orientation="vertical" space="regular" />
            )}
            <TextField label="Email" type="email" width="2/3" required />
          </Stack>
          {showSpacing && (
            <VisualSpacing orientation="vertical" space="section" />
          )}
          <Stack space="regular">
            <Headline level={2}>Account Details</Headline>
            {showSpacing && (
              <VisualSpacing orientation="vertical" space="regular" />
            )}
            <TextField label="Username" required width="2/3" />
            {showSpacing && (
              <VisualSpacing orientation="vertical" space="regular" />
            )}
            <TextField label="Password" type="password" required width="2/3" />
          </Stack>
        </Stack>
      </Inset>
    </Stack>
  );
};
