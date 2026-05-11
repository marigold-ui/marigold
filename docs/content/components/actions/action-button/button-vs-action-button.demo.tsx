import { people } from '@/lib/data/people';
import {
  ActionButton,
  ActionGroup,
  Badge,
  Description,
  Inline,
  Panel,
  Stack,
  Text,
  Title,
  Tooltip,
} from '@marigold/components';
import { Pencil, Trash2, UserRoundPlus } from '@marigold/icons';

const members = [
  { ...people[0], role: 'Admin', variant: 'admin' },
  { ...people[1], role: 'Editor', variant: 'default' },
  { ...people[2], role: 'Viewer', variant: 'default' },
];

export default () => (
  <Panel>
    <Panel.Header>
      <Title>Team members</Title>
      <Description>
        People with access to this workspace and their roles.
      </Description>
      {/* Primary commitment for this surface — a real "ask" of the user. */}
      <ActionButton variant="primary" size="default" aria-label="Invite member">
        <UserRoundPlus />
        Invite member
      </ActionButton>
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
              {/* Per-row chrome — recedes until scanned for. */}
              <ActionGroup
                aria-label={`Actions for ${member.name}`}
                size="small"
              >
                <Tooltip.Trigger>
                  <ActionButton aria-label="Edit role">
                    <Pencil />
                  </ActionButton>
                  <Tooltip>Edit role</Tooltip>
                </Tooltip.Trigger>
                <Tooltip.Trigger>
                  <ActionButton variant="destructive-ghost" aria-label="Remove">
                    <Trash2 />
                  </ActionButton>
                  <Tooltip>Remove</Tooltip>
                </Tooltip.Trigger>
              </ActionGroup>
            </Inline>
          </Inline>
        ))}
      </Stack>
    </Panel.Content>
  </Panel>
);
