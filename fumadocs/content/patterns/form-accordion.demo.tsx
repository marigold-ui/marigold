'use client';

import { useState } from 'react';
import {
  Accordion,
  Checkbox,
  DatePicker,
  Headline,
  Inline,
  Inset,
  NumberField,
  Select,
  Stack,
  Switch,
  TextArea,
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
            <Headline level={2}>Event Details</Headline>
            {showSpacing && (
              <VisualSpacing orientation="vertical" space="regular" />
            )}
            <TextField label="Event Name" required />
            {showSpacing && (
              <VisualSpacing orientation="vertical" space="regular" />
            )}
            <TextArea
              label="Description"
              description="What is this event about?"
              rows={3}
              required
            />
            {showSpacing && (
              <VisualSpacing orientation="vertical" space="regular" />
            )}
            <div className={showSpacing ? 'pb-8' : ''}>
              <Inline space="related">
                <DatePicker label="Start Date" width="fit" required />
                {showSpacing && (
                  <VisualSpacing space="related" orientation="horizontal" />
                )}
                <DatePicker label="End Date" width="fit" />
              </Inline>
            </div>
            {showSpacing && (
              <VisualSpacing orientation="vertical" space="regular" />
            )}
            <Accordion variant="card">
              <Accordion.Item id="advanced-settings">
                <Accordion.Header>Advanced Event Settings</Accordion.Header>
                <Accordion.Content>
                  <Stack space="regular">
                    <Select
                      label="Event Category"
                      placeholder="Select category"
                      width="fit"
                    >
                      <Select.Option id="conference">Conference</Select.Option>
                      <Select.Option id="workshop">Workshop</Select.Option>
                      <Select.Option id="meetup">Meetup</Select.Option>
                      <Select.Option id="webinar">Webinar</Select.Option>
                    </Select>
                    <NumberField
                      label="Maximum Attendees"
                      description="Leave empty for unlimited"
                      width={44}
                    />
                    <TextField
                      label="Event Code"
                      description="Used for registration"
                      width="fit"
                    />
                    <Checkbox label="Require registration approval" />
                    <Checkbox label="Send confirmation emails" />
                  </Stack>
                </Accordion.Content>
              </Accordion.Item>
            </Accordion>
          </Stack>
          {showSpacing && (
            <VisualSpacing orientation="vertical" space="section" />
          )}
          <Stack space="regular">
            <Headline level={2}>Location</Headline>
            {showSpacing && (
              <VisualSpacing orientation="vertical" space="regular" />
            )}
            <TextField label="Venue Name" required />
            {showSpacing && (
              <VisualSpacing orientation="vertical" space="regular" />
            )}
            <TextField label="Address" required />
            {showSpacing && (
              <VisualSpacing orientation="vertical" space="regular" />
            )}
            <div className={showSpacing ? 'pb-8' : ''}>
              <Inline space="related" alignY="input">
                <TextField label="Postal Code" width={20} />
                {showSpacing && (
                  <VisualSpacing space="related" orientation="horizontal" />
                )}
                <TextField label="City" required width="1/2" />
              </Inline>
            </div>
            {showSpacing && (
              <VisualSpacing orientation="vertical" space="regular" />
            )}
            <Accordion variant="card">
              <Accordion.Item id="location-details">
                <Accordion.Header>Additional Location Details</Accordion.Header>
                <Accordion.Content>
                  <Stack space="regular">
                    <Inline space="related" alignY="input">
                      <TextField label="Floor" width={10} />
                      <TextField label="Room Number" width={16} />
                    </Inline>
                    <TextArea
                      label="Directions"
                      description="How to find the venue"
                      rows={3}
                    />
                    <Checkbox label="Wheelchair accessible" />
                    <Checkbox label="Parking available" />
                  </Stack>
                </Accordion.Content>
              </Accordion.Item>
            </Accordion>
          </Stack>
          {showSpacing && (
            <VisualSpacing orientation="vertical" space="section" />
          )}
          <Stack space="regular">
            <Accordion variant="card">
              <Accordion.Item id="contact-info">
                <Accordion.Header>Contact Information</Accordion.Header>
                <Accordion.Content>
                  <Stack space="regular">
                    <TextField label="Organizer Name" width="fit" />
                    <TextField label="Email" type="email" width="fit" />
                    <TextField label="Phone" type="tel" width="fit" />
                    <Checkbox label="Display contact info publicly" />
                  </Stack>
                </Accordion.Content>
              </Accordion.Item>
            </Accordion>
            {showSpacing && (
              <VisualSpacing orientation="vertical" space="regular" />
            )}
            <Accordion variant="card">
              <Accordion.Item id="special-requirements">
                <Accordion.Header>Special Requirements</Accordion.Header>
                <Accordion.Content>
                  <Stack space="regular">
                    <Checkbox label="Catering required" />
                    <Checkbox label="Audio/Visual equipment needed" />
                    <Checkbox label="Security required" />
                    <TextArea label="Additional Notes" rows={3} />
                  </Stack>
                </Accordion.Content>
              </Accordion.Item>
            </Accordion>
          </Stack>
        </Stack>
      </Inset>
    </Stack>
  );
};
