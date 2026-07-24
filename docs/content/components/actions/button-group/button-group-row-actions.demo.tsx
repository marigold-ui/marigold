import {
  Button,
  ButtonGroup,
  Inline,
  LinkButton,
  Stack,
  Text,
  Tooltip,
} from '@marigold/components';
import { Eye, Pencil, Trash2 } from '@marigold/icons';

const events = [
  {
    id: 'evt-1',
    title: 'Summer Comedy Night',
    subtitle: 'Sat, 14 Jun · Main Street Park',
  },
  {
    id: 'evt-2',
    title: 'Harborfront Jazz Festival',
    subtitle: 'Sun, 22 Jun · Harborfront Promenade',
  },
  {
    id: 'evt-3',
    title: 'Oak Ridge Wedding Showcase',
    subtitle: 'Sat, 5 Jul · Oak Ridge Barn',
  },
];

export default () => (
  <Stack space="related">
    {events.map(event => (
      <Inline key={event.id} alignY="center" alignX="between" space="group">
        <Stack space="tight">
          <Text weight="medium">{event.title}</Text>
          <Text size="xs" color="secondary">
            {event.subtitle}
          </Text>
        </Stack>
        <ButtonGroup
          aria-label={`Actions for ${event.title}`}
          variant="ghost"
          size="icon"
        >
          <Tooltip.Trigger>
            <Button aria-label="View">
              <Eye />
            </Button>
            <Tooltip>View</Tooltip>
          </Tooltip.Trigger>
          <Tooltip.Trigger>
            <LinkButton href="#" aria-label="Edit">
              <Pencil />
            </LinkButton>
            <Tooltip>Edit</Tooltip>
          </Tooltip.Trigger>
          <Tooltip.Trigger>
            <Button variant="destructive-ghost" aria-label="Delete">
              <Trash2 />
            </Button>
            <Tooltip>Delete</Tooltip>
          </Tooltip.Trigger>
        </ButtonGroup>
      </Inline>
    ))}
  </Stack>
);
