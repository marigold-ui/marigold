'use client';

import { ruiTheme } from '@/theme';
import {
  Badge,
  Button,
  Grid,
  Loader,
  MarigoldProvider,
  NumberField,
  OverlayContainerProvider,
  Radio,
  Stack,
  Switch,
  Tag,
} from '@/ui';
import type { PropsWithChildren } from 'react';
import { useResponsiveValue } from '@marigold/system';
import { BlurFade } from '@/ui/BlurFade';
import { StatusSelect } from './StatusSelect';

const Block = ({
  children,
  name,
  order,
}: PropsWithChildren<{ name: string; order: number }>) => (
  <Grid.Area name={name}>
    <BlurFade
      key={name}
      className="grid h-full place-items-center rounded-lg border border-black/5 px-2 py-2 shadow-xs"
      delay={0.2 + order * 0.05}
      inView
    >
      {children}
    </BlurFade>
  </Grid.Area>
);

export const AccessibilitySection = () => {
  const isLargeScreeen = useResponsiveValue([false, false, false, true], 3);

  const areas = isLargeScreeen
    ? [
        'select select radio radio',
        'button badge radio radio',
        'button badge loader switch',
        'number-field badge loader switch',
        'tag tag tag tag',
      ]
    : [
        'select select select select',
        'button button badge badge',
        'button button badge badge',
        'number-field number-field badge badge',
        'tag tag tag tag',
      ];
  return (
    <div data-theme="rui" className="flex flex-col">
      <OverlayContainerProvider container="portalContainer">
        <MarigoldProvider theme={ruiTheme} className="bg-transparent">
          <Grid
            areas={areas}
            columns={[3, 2, 2, 1]}
            rows={['100px', '40px', '10px', '100px', '100px']}
            space={2}
          >
            <Block name="select" order={1}>
              <StatusSelect />
            </Block>
            {isLargeScreeen ? (
              <Block name="loader" order={2}>
                <Loader />
              </Block>
            ) : null}
            {isLargeScreeen ? (
              <Block name="radio" order={3}>
                <Radio.Group label="Event type" defaultValue="concerts">
                  <Radio value="concerts">Concerts</Radio>
                  <Radio value="festival">Festival</Radio>
                  <Radio value="sports">Sport</Radio>
                  <Radio value="exhibition">Exhibition</Radio>
                </Radio.Group>
              </Block>
            ) : null}
            {isLargeScreeen ? (
              <Block name="switch" order={4}>
                <Switch aria-label="WiFi" defaultSelected width="fit" />
              </Block>
            ) : null}
            <Block name="button" order={5}>
              <Button variant="primary">Buy ticket</Button>
            </Block>
            <Block name="number-field" order={7}>
              <NumberField
                label="Price"
                width={36}
                defaultValue={10}
                formatOptions={{
                  style: 'currency',
                  currency: 'EUR',
                }}
              />
            </Block>
            <Block name="badge" order={6}>
              <Stack space={2} alignX="center">
                <Badge variant="success">New arrival</Badge>
                <Badge variant="warning">Selling fast</Badge>
                <Badge variant="error">Sold out</Badge>
              </Stack>
            </Block>
            <Block name="tag" order={8}>
              <Tag.Group label="Perks" selectionMode="multiple">
                <Tag id="parking-pass">Parking Pass</Tag>
                <Tag id="vip">VIP Access</Tag>
                <Tag id="glamping">Glamping Package</Tag>
                <Tag id="shuttle-service">Shuttle Service</Tag>
              </Tag.Group>
            </Block>
          </Grid>
        </MarigoldProvider>
      </OverlayContainerProvider>
    </div>
  );
};
