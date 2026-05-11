import { people } from '@/lib/data/people';
import { Divider, Headline, Inline, Stack, Text } from '@marigold/components';

const team = people.slice(0, 5);

export default () => (
  <div className="bg-bg-surface rounded-xl p-6">
    <Stack space="regular">
      {team.map((person, index) => (
        <Stack key={person.id} space="related">
          <Inline space="related" alignY="center">
            <img
              src={person.avatar}
              alt=""
              className="size-10 shrink-0 rounded-full object-cover"
            />
            <Stack space="tight">
              <Headline level={4}>{person.name}</Headline>
              <Text variant="muted" size="sm">
                {person.position}
              </Text>
            </Stack>
          </Inline>
          {index < team.length - 1 && <Divider />}
        </Stack>
      ))}
    </Stack>
  </div>
);
