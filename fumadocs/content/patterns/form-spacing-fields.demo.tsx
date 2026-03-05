'use client';

import { useState } from 'react';
import {
  Headline,
  Inline,
  Inset,
  Select,
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
            <Headline level={2}>Personal Information</Headline>
            {showSpacing && (
              <VisualSpacing space="regular" orientation="vertical" />
            )}
            <TextField
              label="Name"
              description="Enter your full name"
              required
            />
            {showSpacing && (
              <VisualSpacing space="regular" orientation="vertical" />
            )}
            <TextField
              label="Email"
              description="Enter your email address"
              type="email"
              required
            />
          </Stack>
          {showSpacing && (
            <VisualSpacing space="group" orientation="vertical" />
          )}
          <Stack space="regular">
            <Headline level={2}>Address</Headline>
            {showSpacing && (
              <VisualSpacing space="regular" orientation="vertical" />
            )}
            <TextField label="Street" />
            {showSpacing && (
              <VisualSpacing space="regular" orientation="vertical" />
            )}
            <div className={showSpacing ? 'pb-8' : ''}>
              <Inline space="related">
                <TextField label="Postcode" width={20} />
                {showSpacing && (
                  <VisualSpacing space="related" orientation="horizontal" />
                )}
                <TextField label="City" width={40} />
              </Inline>
            </div>
            {showSpacing && (
              <VisualSpacing space="regular" orientation="vertical" />
            )}
            <Select
              label="Country"
              placeholder="Select your country"
              width={'fit'}
            >
              <Select.Option id="us">United States</Select.Option>
              <Select.Option id="ca">Canada</Select.Option>
              <Select.Option id="uk">United Kingdom</Select.Option>
              <Select.Option id="de">Germany</Select.Option>
              <Select.Option id="fr">France</Select.Option>
              <Select.Option id="it">Italy</Select.Option>
              <Select.Option id="es">Spain</Select.Option>
              <Select.Option id="au">Australia</Select.Option>
              <Select.Option id="eg">Egypt</Select.Option>
              <Select.Option id="other">Other</Select.Option>
            </Select>
          </Stack>
        </Stack>
      </Inset>
    </Stack>
  );
};
