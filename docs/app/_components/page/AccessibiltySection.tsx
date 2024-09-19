'use client';

import { coreTheme } from '@/theme';
import {
  Button,
  Checkbox,
  CheckboxGroup,
  FieldGroup,
  Grid,
  Inline,
  MarigoldProvider,
  NumberField,
  OverlayContainerProvider,
  Switch,
  Tag,
  XLoader,
} from '@/ui';
import type { PropsWithChildren } from 'react';
import { Wifi } from '@marigold/icons';
import { BlurFade } from '@/ui/BlurFade';
import { StatusSelect } from './StatusSelect';

const Info = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="size-3"
  >
    <circle cx={12} cy={12} r={10} />
    <path d="M12 16v-4M12 8h.01" />
  </svg>
);

const Block = ({
  children,
  name,
  order,
}: PropsWithChildren<{ name: string; order: number }>) => (
  <Grid.Area name={name}>
    <BlurFade
      key={name}
      className="bg-bg-surface grid h-full place-items-center rounded-lg p-5 shadow"
      delay={0.25 + order * 0.1}
      inView
    >
      {children}
    </BlurFade>
  </Grid.Area>
);

export const AccessibiltySection = () => (
  <div data-theme="core" className="col-span-3 flex flex-col">
    <OverlayContainerProvider value="portalContainer">
      <MarigoldProvider theme={coreTheme} className="bg-transparent">
        <Grid
          areas={[
            'select select loader',
            'checkbox switch loader',
            'x button button',
            'tag tag y',
            //   'logo logo tickets',
            //   'social-media event-2 tickets',
          ]}
          columns={[4, 1, 2]}
          rows={['80px', '80px', '60px', '140px']}
          space={2}
        >
          <Block name="select" order={1}>
            <StatusSelect />
          </Block>
          <Block name="loader" order={2}>
            <XLoader width="100%" height="100%" />
          </Block>
          <Block name="checkbox" order={3}>
            <FieldGroup labelWidth="95px">
              <CheckboxGroup label="Choose whisely">
                <Checkbox value="ham">Ham</Checkbox>
                <Checkbox value="salami" disabled>
                  Salami
                </Checkbox>
                <Checkbox value="cheese">Cheese</Checkbox>
              </CheckboxGroup>
            </FieldGroup>
          </Block>
          <Block name="switch" order={4}>
            <FieldGroup labelWidth="20px">
              <Switch aria-label="WiFi" defaultSelected width="fit">
                <Wifi height="14px" width="14px" />
              </Switch>
            </FieldGroup>
          </Block>
          <Block name="button" order={5}>
            <Inline space={4}>
              <Button variant="primary">Save</Button>
              <Button variant="secondary">Cancel</Button>
            </Inline>
          </Block>
          <Block name="tag" order={6}>
            <FieldGroup labelWidth="95px">
              <Tag.Group
                label="Amenities"
                selectionMode="multiple"
                description="Choosing extras may lead to additional charges"
              >
                <Tag id="parking">Parking</Tag>
                <Tag id="locker">Locker</Tag>
                <Tag id="backstage-pass">Backstage Pass</Tag>
                <Tag id="shuttle-service">Shuttle Service</Tag>
              </Tag.Group>
            </FieldGroup>
          </Block>
          {/* <Block name="event-1">
          <Button variant="primary">Don't press</Button>
          </Block>
          <Block name="mobile-ticket">
          <FieldGroup labelWidth="95px">
          <CheckboxGroup label="Choose whisely">
          <Checkbox value="ham">Ham</Checkbox>
          <Checkbox value="salami" disabled>
          Salami
          </Checkbox>
          <Checkbox value="cheese">Cheese</Checkbox>
          </CheckboxGroup>
          </FieldGroup>
          </Block>
          <Block name="logo">
          <FieldGroup labelWidth="95px">
          <NumberField
          label="Ticket Price"
          width={48}
          defaultValue={10}
          formatOptions={{
            style: 'currency',
            currency: 'EUR',
            }}
            />
            </FieldGroup>
            </Block>
            <Block name="tickets">
            <FieldGroup labelWidth="95px">
            <Switch>Switch</Switch>
            <Tag.Group
            label="Amenities"
            selectionMode="multiple"
            description="Choosing extras may lead to additional charges"
            >
            <Tag id="laundry">Laundry</Tag>
            <Tag id="fitness">Fitness center</Tag>
            <Tag id="parking">Parking</Tag>
            <Tag id="pool">Swimming pool</Tag>
            <Tag id="breakfast">Breakfast</Tag>
            </Tag.Group>
            </FieldGroup>
            </Block> */}
        </Grid>
      </MarigoldProvider>
    </OverlayContainerProvider>
    <div className="text-text-primary/40 place-center flex justify-center gap-1 pt-1.5 text-xs">
      <Info /> Use your keyboard to explore and test the components!
    </div>
  </div>
);
