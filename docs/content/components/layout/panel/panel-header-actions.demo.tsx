import { people } from '@/lib/data/people';
import {
  ActionMenu,
  Badge,
  Button,
  Description,
  Inline,
  Panel,
  Stack,
  Text,
  Title,
} from '@marigold/components';
import { UserRoundPlus } from '@marigold/icons';

const members = [
  { ...people[0], role: 'Admin', variant: 'admin' },
  { ...people[1], role: 'Editor', variant: 'default' },
  { ...people[2], role: 'Editor', variant: 'default' },
  { ...people[3], role: 'Viewer', variant: 'default' },
];

export default () => (
  <Panel>
    <Panel.Header>
      <Title>Team members</Title>
      <Description>
        People with access to this workspace and their roles.
      </Description>
      <Button size="icon" aria-label="Invite member">
        <UserRoundPlus />
      </Button>
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
              <Stack space="tight">
                <Text weight="medium">{member.name}</Text>
                <Text size="xs" color="secondary">
                  {member.position}
                </Text>
              </Stack>
            </Inline>
            <Inline space="regular" alignY="center">
              <Badge variant={member.variant}>{member.role}</Badge>
              <ActionMenu size="icon" aria-label={`Manage ${member.name}`}>
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
