import { Columns, Headline, Stack, Text } from '@marigold/components';

export const OurMission = () => (
  <Stack space={4}>
    <Headline level="1">Our Mission</Headline>
    <Columns columns={[2, 1]} space={20} collapseAt="1000px">
      <Stack space={4}>
        <Text variant="muted" fontSize="lg" weight="light">
          Our mission is to accelerate human discovery by building the
          world&apos;s most powerful and accessible data platform. We provide
          the critical infrastructure that allows scientists, researchers, and
          innovators to process, analyze, and share information on a global
          scale. We believe in the power of data to solve complex challenges.
        </Text>
        <Text variant="muted" weight="light">
          We are dedicated to fostering a collaborative ecosystem built on
          integrity, security, and relentless innovation. By simplifying complex
          data pipelines, we empower organizations to unlock new insights, drive
          progress, and build a better future for everyone.
        </Text>
      </Stack>
      <Stack space={8}>
        <Stack>
          <Text fontSize="4xl" weight="semibold">
            44 million
          </Text>
          <Text variant="muted" fontSize="sm" weight="light">
            Data queries processed every 24 hours
          </Text>
        </Stack>
        <Stack>
          <Text fontSize="4xl" weight="semibold">
            119 trillion
          </Text>
          <Text variant="muted" fontSize="sm" weight="light">
            Data points analyzed
          </Text>
        </Stack>
        <Stack>
          <Text fontSize="4xl" weight="semibold">
            46,000
          </Text>
          <Text variant="muted" fontSize="sm" weight="light">
            New researchers joining annually
          </Text>
        </Stack>
      </Stack>
    </Columns>
  </Stack>
);
