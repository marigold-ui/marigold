import { Eye, Pencil, Trash2 } from 'lucide-react';
import {
  ActionButton,
  Inline,
  Stack,
  Text,
  Tooltip,
} from '@marigold/components';

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
  <Stack space={1}>
    {events.map(event => (
      <Inline key={event.id} alignY="center" alignX="between" space="group">
        <Stack space="0.5">
          <Text weight="medium">{event.title}</Text>
          <Text size="xs" color="secondary">
            {event.subtitle}
          </Text>
        </Stack>
        <ActionButton.Group
          aria-label={`Actions for ${event.title}`}
          size="small"
        >
          <Tooltip.Trigger>
            <ActionButton aria-label="View">
              <Eye />
            </ActionButton>
            <Tooltip>View</Tooltip>
          </Tooltip.Trigger>
          <Tooltip.Trigger>
            <ActionButton aria-label="Edit">
              <Pencil />
            </ActionButton>
            <Tooltip>Edit</Tooltip>
          </Tooltip.Trigger>
          <Tooltip.Trigger>
            <ActionButton variant="destructive-ghost" aria-label="Delete">
              <Trash2 />
            </ActionButton>
            <Tooltip>Delete</Tooltip>
          </Tooltip.Trigger>
        </ActionButton.Group>
      </Inline>
    ))}
  </Stack>
);
