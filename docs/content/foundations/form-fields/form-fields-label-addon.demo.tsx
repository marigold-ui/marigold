import { Badge, ContextualHelp, Inline, TextField } from '@marigold/components';

export default () => {
  return (
    <Inline space={4}>
      <TextField label="Organizer" />
      <TextField
        label="Internal note"
        addon={<Badge variant="admin">Admin</Badge>}
      />
      <TextField
        label="Promo code"
        addon={
          <ContextualHelp>
            <ContextualHelp.Title>Promo code</ContextualHelp.Title>
            <ContextualHelp.Content>
              You can find the code on the back of your ticket.
            </ContextualHelp.Content>
          </ContextualHelp>
        }
      />
    </Inline>
  );
};
