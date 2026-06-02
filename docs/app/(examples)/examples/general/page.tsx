'use client';

import {
  Button,
  Description,
  Form,
  Inline,
  Page,
  Panel,
  Select,
  Stack,
  TextField,
  Title,
  useToast,
} from '@marigold/components';

const GeneralPage = () => {
  const { addToast } = useToast();

  return (
    <Page>
      <Page.Header>
        <Title>General</Title>
        <Description>
          Workspace name, address, and regional defaults.
        </Description>
      </Page.Header>

      <Form
        onSubmit={e => {
          e.preventDefault();
          addToast({
            title: 'Settings saved',
            description: 'Your workspace settings were updated.',
            variant: 'success',
          });
        }}
      >
        <Stack space="regular">
          <Panel size="form">
            <Panel.Header>
              <Title>Workspace</Title>
              <Description>
                How your workspace appears across the product.
              </Description>
            </Panel.Header>
            <Panel.Content>
              <Stack space="regular">
                <TextField
                  label="Workspace name"
                  defaultValue="Acme Inc."
                  description="Shown in the sidebar and on shared links."
                  width={80}
                />
                <TextField
                  label="Workspace URL"
                  defaultValue="acme"
                  description="Your workspace lives at acme.example.com."
                  width={56}
                />
                <Inline space="related">
                  <Select label="Region" defaultValue="eu" width={44}>
                    <Select.Option id="eu">Europe</Select.Option>
                    <Select.Option id="us">United States</Select.Option>
                    <Select.Option id="apac">Asia Pacific</Select.Option>
                  </Select>
                  <Select label="Default language" defaultValue="en" width={44}>
                    <Select.Option id="en">English</Select.Option>
                    <Select.Option id="de">German</Select.Option>
                    <Select.Option id="fr">French</Select.Option>
                  </Select>
                </Inline>
              </Stack>
            </Panel.Content>
          </Panel>
          {/* The form's primary action sits below the panel, at the end of the form. */}
          <Inline>
            <Button variant="primary" type="submit">
              Save changes
            </Button>
          </Inline>
        </Stack>
      </Form>
    </Page>
  );
};

export default GeneralPage;
