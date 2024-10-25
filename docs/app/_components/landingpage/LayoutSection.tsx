'use client';

import { Columns, Grid, Inline, Stack } from '@/ui';
import type { ReactNode } from 'react';
import { BlurFade } from '@/ui/BlurFade';
import { Rectangle } from '@/ui/Rectangle';

const Annotation = ({ children }: { children: ReactNode }) => (
  <div className="text-text-primary-muted pt-1 text-center text-sm">
    {children}
  </div>
);

export const LayoutSection = () => (
  <div className="grid grid-cols-2 gap-6 md:col-span-3">
    <BlurFade className="grid content-between" inView delay={0.2}>
      <Inline space={2}>
        {[32, 48, 32, 64, 88, 64, 64, 48, 24].map((width, idx) => (
          <Rectangle
            key={idx}
            variant="primary"
            height="1.5rem"
            width={`${width}px`}
          />
        ))}
      </Inline>
      <Annotation>Inline</Annotation>
    </BlurFade>

    <BlurFade className="grid content-between" inView delay={0.3}>
      <Stack space={2}>
        <Rectangle variant="primary" height="1.5rem" />
        <Rectangle variant="primary" height="1.5rem" />
        <Rectangle variant="primary" height="1.5rem" />
        <Rectangle variant="primary" height="1.5rem" />
      </Stack>
      <Annotation>Stack</Annotation>
    </BlurFade>

    <BlurFade className="grid content-between" inView delay={0.4}>
      <Columns columns={[3, 1, 2]} space={2} collapseAt="0em">
        <Rectangle variant="primary" height="7.5rem" />
        <Rectangle variant="primary" height="7.5rem" />
        <Rectangle variant="primary" height="7.5rem" />
      </Columns>
      <Annotation>Columns</Annotation>
    </BlurFade>

    <BlurFade className="grid content-between" inView delay={0.5}>
      <Grid
        areas={[
          'event-1 event-1 mobile-ticket',
          'logo logo mobile-ticket',
          'logo logo tickets',
          'social-media event-2 tickets',
        ]}
        columns={[3, 2, 3]}
        rows={['2.5rem', '1rem', '0.75rem', '1.75rem']}
        space={2}
      >
        <Grid.Area name="event-1">
          <Rectangle variant="primary" height="100%" />
        </Grid.Area>
        <Grid.Area name="mobile-ticket">
          <Rectangle variant="primary" height="100%" />
        </Grid.Area>
        <Grid.Area name="logo">
          <Rectangle variant="primary" height="100%" />
        </Grid.Area>
        <Grid.Area name="social-media">
          <Rectangle variant="primary" height="100%" />
        </Grid.Area>
        <Grid.Area name="event-2">
          <Rectangle variant="primary" height="100%" />
        </Grid.Area>
        <Grid.Area name="tickets">
          <Rectangle variant="primary" height="100%" />
        </Grid.Area>
      </Grid>
      <Annotation>Grid</Annotation>
    </BlurFade>
  </div>
);
