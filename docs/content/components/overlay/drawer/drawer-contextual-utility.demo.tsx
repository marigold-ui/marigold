import { Accordion, Button, Drawer, Stack, Text } from '@marigold/components';

export default function () {
  return (
    <Drawer.Trigger>
      <Button>Open Help</Button>
      <Drawer>
        <Drawer.Title>Quick Help</Drawer.Title>
        <Drawer.Content>
          <Stack space="regular">
            <Text>
              Common questions while handling tickets. Expand a section for the
              full answer.
            </Text>
            <Accordion>
              <Accordion.Item id="reset-password">
                <Accordion.Header>
                  How do I reset a user's password?
                </Accordion.Header>
                <Accordion.Content>
                  Open the user record, click <strong>Account</strong>, then{' '}
                  <strong>Send password reset</strong>. The user receives an
                  email with a one-time link valid for 24 hours.
                </Accordion.Content>
              </Accordion.Item>
              <Accordion.Item id="escalation">
                <Accordion.Header>
                  When should I escalate a ticket?
                </Accordion.Header>
                <Accordion.Content>
                  Escalate any ticket marked <strong>High priority</strong> that
                  has been open longer than four hours, or any ticket flagged by
                  the customer as a security concern.
                </Accordion.Content>
              </Accordion.Item>
              <Accordion.Item id="login-loop">
                <Accordion.Header>
                  Customer is stuck in a login loop. What now?
                </Accordion.Header>
                <Accordion.Content>
                  Most login loops resolve when the customer clears site cookies
                  and reauthenticates. If that fails, verify their SSO provider
                  status before assigning a developer.
                </Accordion.Content>
              </Accordion.Item>
              <Accordion.Item id="refund">
                <Accordion.Header>How do I issue a refund?</Accordion.Header>
                <Accordion.Content>
                  Refunds under €50 can be issued from the order detail page.
                  Anything above that amount needs manager approval. Flag the
                  ticket with <strong>refund-review</strong>.
                </Accordion.Content>
              </Accordion.Item>
            </Accordion>
          </Stack>
        </Drawer.Content>
        <Drawer.Actions>
          <Button slot="close">Close</Button>
        </Drawer.Actions>
      </Drawer>
    </Drawer.Trigger>
  );
}
