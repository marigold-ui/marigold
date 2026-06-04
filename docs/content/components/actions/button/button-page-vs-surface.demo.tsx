import { people } from '@/lib/data/people';
import {
  Badge,
  Button,
  ButtonGroup,
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
      {/* [!code highlight] */}
      <Button variant="secondary" size="default">
        <UserRoundPlus />
        Invite member
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
              <ButtonGroup
                aria-label={`Actions for ${member.name}`}
                size="small"
              >
                <Tooltip.Trigger>
                  <Button aria-label="Edit role">
                    <Pencil />
                  </Button>
                  <Tooltip>Edit role</Tooltip>
                </Tooltip.Trigger>
                <Tooltip.Trigger>
                  <Button variant="destructive-ghost" aria-label="Remove">
                    <Trash2 />
                  </Button>
                  <Tooltip>Remove</Tooltip>
                </Tooltip.Trigger>
              </ButtonGroup>
            </Inline>
          </Inline>
        ))}
      </Stack>
    </Panel.Content>
  </Panel>
);
