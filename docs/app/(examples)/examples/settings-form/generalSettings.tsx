'use client';

import {
  Accordion,
  Button,
  Card,
  Form,
  Headline,
  Inline,
  Radio,
  Select,
  Stack,
  Text,
  TextField,
  useToast,
} from '@marigold/components';

export const GeneralSettings = () => {
  const { addToast } = useToast();

  return (
    <Card p={4}>
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
        <Stack space="regular">
          <Stack space="tight">
            <Headline level={3}>General information</Headline>
            <Text>Basic details applied to all new events.</Text>
          </Stack>
          <Stack space="regular">
            <TextField
              label="Default Event Name Prefix"
              defaultValue="Riverside"
              description="Prepended to every new event title."
              errorMessage="Prefix must not be empty."
            />
            <Inline space="related">
              <Select
                label="Default Event Type"
                defaultValue="conference"
                width="fit"
              >
                <Select.Option id="conference">Conference</Select.Option>
                <Select.Option id="workshop">Workshop</Select.Option>
                <Select.Option id="meetup">Meetup</Select.Option>
                <Select.Option id="festival">Festival</Select.Option>
                <Select.Option id="concert">Concert</Select.Option>
              </Select>
              <Select label="Default Language" defaultValue="de" width="fit">
                <Select.Option id="de">German</Select.Option>
                <Select.Option id="en">English</Select.Option>
                <Select.Option id="fr">French</Select.Option>
              </Select>
            </Inline>
            <Select
              label="Default Timezone"
              defaultValue="europe-berlin"
              width="fit"
            >
              <Select.Option id="europe-berlin">Europe/Berlin</Select.Option>
              <Select.Option id="europe-zurich">Europe/Zurich</Select.Option>
              <Select.Option id="europe-vienna">Europe/Vienna</Select.Option>
              <Select.Option id="europe-london">Europe/London</Select.Option>
            </Select>
          </Stack>
          <Accordion>
            <Accordion.Item id="advanced-general">
              <Accordion.Header>Advanced defaults</Accordion.Header>
              <Accordion.Content>
                <Stack space="regular">
                  <Select
                    label="Date Format"
                    defaultValue="dd-mm-yyyy"
                    width="fit"
                  >
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
              </Accordion.Content>
            </Accordion.Item>
          </Accordion>
          <Button variant="primary" type="submit">
            Save changes
          </Button>
        </Stack>
      </Form>
    </Card>
  );
};
