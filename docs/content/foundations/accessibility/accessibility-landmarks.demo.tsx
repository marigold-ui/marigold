import { useRef } from 'react';
import type { AriaLandmarkRole } from '@marigold/components';
import { Headline, Stack, Text, useLandmark } from '@marigold/components';

interface RegionProps {
  role: AriaLandmarkRole;
  label: string;
  description: string;
}

const Region = ({ role, label, description }: RegionProps) => {
  const ref = useRef<HTMLElement>(null);
  const { landmarkProps } = useLandmark({ role, 'aria-label': label }, ref);

  return (
    <section
      ref={ref}
      {...landmarkProps}
      className="border-border focus-visible:outline-ring rounded-sm border border-dashed p-4 focus-visible:outline-2 focus-visible:outline-offset-2"
    >
      <Stack space={1}>
        <Headline level={6}>{label}</Headline>
        <Text variant="muted">role="{role}"</Text>
        <Text>{description}</Text>
      </Stack>
    </section>
  );
};

export default () => (
  <Stack space={3}>
    <Region
      role="search"
      label="Search"
      description="Click anywhere in the demo, then press F6 to jump to the next landmark."
    />
    <div className="grid grid-cols-[1fr_2fr] gap-3">
      <Region
        role="navigation"
        label="Site navigation"
        description="Top-level links."
      />
      <Region
        role="main"
        label="Main content"
        description="Primary content area of the page."
      />
    </div>
    <Region
      role="complementary"
      label="Related"
      description="Supporting links and metadata."
    />
  </Stack>
);
