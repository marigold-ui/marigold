'use client';

import {
  Button,
  Form,
  Inline,
  Panel,
  Radio,
  Select,
  Stack,
  Switch,
  TextArea,
  TextField,
  useToast,
} from '@marigold/components';

export const GeneralSettings = () => {
  const { addToast } = useToast();

  return (
    <Panel size="form" headingLevel={3}>
      <Panel.Header>
        <Panel.Title>General information</Panel.Title>
        <Panel.Description>
          Defaults applied when creating new events. Existing events keep their
          current values.
        </Panel.Description>
      </Panel.Header>
      <Panel.Content>
        <Form
          id="general-settings"
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
          <Stack space="regular">
            <TextField
              label="Organization Name"
              defaultValue="Riverside Events GmbH"
              description="Shown on tickets, invoices, and public event pages."
              width={80}
            />
            <TextField
              label="Event Name Prefix"
              defaultValue="Riverside"
              description="Prepended to every new event title, e.g. 'Riverside Summer Fest'."
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
            <TextArea
              label="Default Footer Text"
              defaultValue="Powered by Riverside Events. For questions, contact info@riverside-events.de."
              description="Appears at the bottom of every event page and confirmation email."
              rows={2}
            />
          </Stack>
        </Form>
      </Panel.Content>
      <Panel.Collapsible>
        <Panel.CollapsibleHeader>
          <Panel.CollapsibleTitle>Advanced defaults</Panel.CollapsibleTitle>
          <Panel.CollapsibleDescription>
            Date formatting, visibility, and SEO settings.
          </Panel.CollapsibleDescription>
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
              description="Controls who can discover newly created events. Public events appear in search and on your organization page, private events require a direct link, and unlisted events are accessible via link but hidden from listings."
            >
              <Radio value="public">Public</Radio>
              <Radio value="private">Private</Radio>
              <Radio value="unlisted">Unlisted</Radio>
            </Radio.Group>
            <TextField
              label="URL Slug Prefix"
              defaultValue="riverside"
              description="Used in event URLs, e.g. riverside-events.de/riverside-summer-fest."
              width={56}
            />
            <Switch
              label="Enable search engine indexing"
              defaultSelected
              description="Allows search engines to index and display your public event pages in search results. Disable this for internal company events or if attendees should only register through direct links."
            />
          </Stack>
        </Panel.CollapsibleContent>
      </Panel.Collapsible>
      <Panel.Footer>
        <Button variant="primary" type="submit" form="general-settings">
          Save changes
        </Button>
      </Panel.Footer>
    </Panel>
  );
};
