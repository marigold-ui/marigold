import { people } from '@/lib/data/people';
import { UserRoundPlus } from 'lucide-react';
import {
  ActionMenu,
  Badge,
  Button,
  Inline,
  Panel,
  Stack,
  Text,
} from '@marigold/components';

const members = [
  { ...people[0], role: 'Admin', variant: 'admin' },
  { ...people[1], role: 'Editor', variant: 'default' },
  { ...people[2], role: 'Editor', variant: 'default' },
  { ...people[3], role: 'Viewer', variant: 'default' },
];

export default () => (
  <Panel>
    <Panel.Header>
      <Panel.Title>Team members</Panel.Title>
      <Panel.Description>
        People with access to this workspace and their roles.
      </Panel.Description>
      <Panel.HeaderActions>
        <Button>
          <UserRoundPlus />
          Invite member
        </Button>
      </Panel.HeaderActions>
    </Panel.Header>
    <Panel.Content>
      <Stack space="regular">
        {members.map(member => (
          <Inline
            key={member.id}
            space="regular"
            alignY="center"
            alignX="between"
          >
            <Inline space="related" alignY="center">
              <img
                src={member.avatar}
                alt=""
                className="size-9 shrink-0 rounded-full object-cover"
              />
              <Stack space="0.5">
                <Text weight="medium">{member.name}</Text>
                <Text size="xs" color="secondary">
                  {member.position}
                </Text>
              </Stack>
            </Inline>
            <Inline space="regular" alignY="center">
              <Badge variant={member.variant}>{member.role}</Badge>
              <ActionMenu
                variant="ghost"
                size="icon"
                aria-label={`Manage ${member.name}`}
              >
                <ActionMenu.Item id="change-role">Change role</ActionMenu.Item>
                <ActionMenu.Item id="resend-invite">
                  Resend invite
                </ActionMenu.Item>
                <ActionMenu.Item id="remove" variant="destructive">
                  Remove from workspace
                </ActionMenu.Item>
              </ActionMenu>
            </Inline>
          </Inline>
        ))}
      </Stack>
    </Panel.Content>
  </Panel>
);
