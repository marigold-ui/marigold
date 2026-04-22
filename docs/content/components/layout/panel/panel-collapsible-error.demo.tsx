import { useState } from 'react';
import type { ComponentProps } from 'react';
import {
  Button,
  Form,
  Inline,
  Panel,
  Stack,
  TextField,
  parseFormData,
} from '@marigold/components';

const TRACKING_ID_PATTERN = /^G-[A-Z0-9]{10}$/;

type SubmitHandler = NonNullable<ComponentProps<typeof Form>['onSubmit']>;

export default () => {
  const [expanded, setExpanded] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit: SubmitHandler = event => {
    event.preventDefault();
    const { trackingId = '' } = parseFormData<{ trackingId: string }>(event);
    const invalid = trackingId !== '' && !TRACKING_ID_PATTERN.test(trackingId);
    setError(invalid);
    if (invalid) setExpanded(true);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Stack space="regular">
        <Panel size="form">
          <Panel.Header>
            <Panel.Title>Event details</Panel.Title>
          </Panel.Header>
          <Panel.Content>
            <TextField
              name="title"
              label="Event title"
              defaultValue="Summer Comedy Night"
            />
          </Panel.Content>
          <Panel.Collapsible expanded={expanded} onExpandedChange={setExpanded}>
            <Panel.CollapsibleHeader>
              <Panel.CollapsibleTitle>
                SEO &amp; tracking
              </Panel.CollapsibleTitle>
              <Panel.CollapsibleDescription>
                Optional metadata used on the event page and in social shares.
              </Panel.CollapsibleDescription>
            </Panel.CollapsibleHeader>
            <Panel.CollapsibleContent>
              <TextField
                name="trackingId"
                label="Analytics tracking ID"
                description="Format: G-XXXXXXXXXX"
                errorMessage="That does not look like a valid Google Analytics ID."
                defaultValue="invalid-id-123"
                onChange={() => {
                  if (error) setError(false);
                }}
                error={error}
              />
            </Panel.CollapsibleContent>
          </Panel.Collapsible>
        </Panel>
        <Inline space="related" alignY="center">
          <Button variant="primary" type="submit">
            Save
          </Button>
          <Button variant="secondary" type="button">
            Cancel
          </Button>
        </Inline>
      </Stack>
    </Form>
  );
};
