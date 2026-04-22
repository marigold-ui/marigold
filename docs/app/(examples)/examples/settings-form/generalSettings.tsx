'use client';

import {
  Button,
  Form,
  Inline,
  Panel,
  Radio,
  Select,
  Stack,
  TextField,
  useToast,
} from '@marigold/components';

export const GeneralSettings = () => {
  const { addToast } = useToast();

  return (
    <Form
      onSubmit={e => {
        e.preventDefault();
        addToast({
          title: 'Settings saved',
          description: 'General information updated.',
          variant: 'success',
          timeout: 5000,
        });
      }}
    >
      <Panel size="form" headingLevel={3}>
        <Panel.Header>
          <Panel.Title>General information</Panel.Title>
          <Panel.Description>
            Basic details applied to all new events.
          </Panel.Description>
        </Panel.Header>
        <Panel.Content>
          <Stack space="regular">
            <TextField
              label="Default Event Name Prefix"
              defaultValue="Riverside"
              description="Prepended to every new event title."
              errorMessage="Prefix must not be empty."
              width={56}
            />
            <Inline space="related">
              <Select
                label="Default Event Type"
                defaultValue="conference"
                width={40}
              >
                <Select.Option id="conference">Conference</Select.Option>
                <Select.Option id="workshop">Workshop</Select.Option>
                <Select.Option id="meetup">Meetup</Select.Option>
                <Select.Option id="festival">Festival</Select.Option>
                <Select.Option id="concert">Concert</Select.Option>
              </Select>
              <Select label="Default Language" defaultValue="de" width={32}>
                <Select.Option id="de">German</Select.Option>
                <Select.Option id="en">English</Select.Option>
                <Select.Option id="fr">French</Select.Option>
              </Select>
            </Inline>
            <Select
              label="Default Timezone"
              defaultValue="europe-berlin"
              width={44}
            >
              <Select.Option id="europe-berlin">Europe/Berlin</Select.Option>
              <Select.Option id="europe-zurich">Europe/Zurich</Select.Option>
              <Select.Option id="europe-vienna">Europe/Vienna</Select.Option>
              <Select.Option id="europe-london">Europe/London</Select.Option>
            </Select>
          </Stack>
        </Panel.Content>
        <Panel.Collapsible>
          <Panel.CollapsibleHeader>
            <Panel.CollapsibleTitle>Advanced defaults</Panel.CollapsibleTitle>
          </Panel.CollapsibleHeader>
          <Panel.CollapsibleContent>
            <Stack space="regular">
              <Select label="Date Format" defaultValue="dd-mm-yyyy" width={40}>
                <Select.Option id="dd-mm-yyyy">DD.MM.YYYY</Select.Option>
                <Select.Option id="mm-dd-yyyy">MM/DD/YYYY</Select.Option>
                <Select.Option id="yyyy-mm-dd">YYYY-MM-DD</Select.Option>
              </Select>
              <Radio.Group
                label="Default Event Visibility"
                defaultValue="public"
              >
                <Radio value="public">Public</Radio>
                <Radio value="private">Private</Radio>
                <Radio value="unlisted">Unlisted</Radio>
              </Radio.Group>
            </Stack>
          </Panel.CollapsibleContent>
        </Panel.Collapsible>
        <Panel.Footer>
          <Button variant="primary" type="submit">
            Save changes
          </Button>
        </Panel.Footer>
      </Panel>
    </Form>
  );
};
