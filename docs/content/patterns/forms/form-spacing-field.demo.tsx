'use client';

import { useState } from 'react';
import {
  Headline,
  Inline,
  Inset,
  Stack,
  Switch,
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
        <Stack space="group">
          <Stack space="regular">
            <Headline level={2}>Shipping Address</Headline>
            {showSpacing && (
              <VisualSpacing space="regular" orientation="vertical" />
            )}
            <TextField label="Name" width="2/3" required />
            {showSpacing && (
              <VisualSpacing space="regular" orientation="vertical" />
            )}
            <TextField label="Street" width="2/3" required />
            {showSpacing && (
              <VisualSpacing space="regular" orientation="vertical" />
            )}
            <div className={showSpacing ? 'pb-8' : ''}>
              <Inline space="related">
                <TextField label="Postal Code" width={20} />
                {showSpacing && (
                  <VisualSpacing space="related" orientation="horizontal" />
                )}
                <TextField label="City" width={40} />
              </Inline>
            </div>
          </Stack>
        </Stack>
      </Inset>
    </Stack>
  );
};
