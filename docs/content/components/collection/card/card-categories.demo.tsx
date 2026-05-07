import { eventTypes } from '@/lib/data/eventTypes';
import {
  Calendar,
  CalendarDays,
  Music2,
  PartyPopper,
  Users,
} from 'lucide-react';
import { Card, Headline, Stack, Text, Tiles } from '@marigold/components';

const icons = {
  conference: CalendarDays,
  workshop: Users,
  meetup: Calendar,
  festival: PartyPopper,
  concert: Music2,
} as const;

export default () => (
  <div className="bg-bg-surface rounded-xl p-6">
    <Tiles space={4} tilesWidth="220px" stretch>
      {eventTypes.map(type => {
        const Icon = icons[type.id];
        return (
          <Card key={type.id}>
            <Card.Header>
              <Stack space={2}>
                <span className="bg-bg-default text-text-muted inline-flex size-10 items-center justify-center rounded-md">
                  <Icon className="size-5" aria-hidden />
                </span>
                <Headline level={3}>{type.label}</Headline>
              </Stack>
            </Card.Header>
            <Card.Body>
              <Text variant="muted" size="sm">
                {type.description}
              </Text>
            </Card.Body>
          </Card>
        );
      })}
    </Tiles>
  </div>
);
