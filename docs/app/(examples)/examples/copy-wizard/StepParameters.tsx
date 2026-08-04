'use client';

import { useState } from 'react';
import {
  Checkbox,
  Columns,
  Description,
  Headline,
  NumberField,
  Panel,
  SectionMessage,
  SegmentedControl,
  Select,
  Stack,
  Switch,
  Text,
  TextArea,
  TextField,
  Title,
} from '@marigold/components';
import {
  branches,
  deliveryTypes,
  orderTags,
  paymentTypes,
  salesOutlets,
} from './data';

type TagMode = 'none' | 'all' | 'custom';

/**
 * Step 2 — the parameters that apply to the whole run.
 *
 * This is the step that goes wrong most often, because it is the one with the
 * most fields. Four Panels, one topic each, all `size="form"` so the
 * label/input pairs stay inside a comfortable reading measure instead of
 * stretching across a wide screen.
 *
 * Sub-grouping *inside* a Panel is a plain `<Headline level={3} size="level-5">` over a
 * `<Stack>` — no nested surface, no hand-drawn rule. The Panel already draws
 * the boundary; a box inside a box just adds noise.
 */
export const StepParameters = () => {
  const [restrictBookings, setRestrictBookings] = useState(false);
  const [orderFeatures, setOrderFeatures] = useState<TagMode>('all');
  const [cancellation, setCancellation] = useState<'none' | 'custom'>('none');

  return (
    <>
      <Panel size="form">
        <Panel.Header>
          <Title>Sales parameters</Title>
          <Description>Applied to every order created by this run.</Description>
        </Panel.Header>
        <Panel.Content>
          <Stack space="regular">
            <TextField
              label="Reservation held until"
              type="date"
              defaultValue="2026-09-30"
              description="Orders that are not paid by this date are released."
              width={40}
              required
            />
            <NumberField
              label="Shipping costs"
              defaultValue={4.9}
              width={32}
              formatOptions={{ style: 'currency', currency: 'EUR' }}
            />
          </Stack>
        </Panel.Content>
      </Panel>

      <Panel size="form">
        <Panel.Header>
          <Title>Internal bookings</Title>
          <Description>
            The outlet and channel the copied orders are booked against.
          </Description>
        </Panel.Header>
        <Panel.Content>
          <Stack space="regular">
            <Columns columns={[1, 1]} space="related" collapseAt="40rem">
              <Select label="Sales outlet" defaultValue="so-1" required>
                {salesOutlets.map(outlet => (
                  <Select.Option key={outlet.id} id={outlet.id}>
                    {outlet.name}
                  </Select.Option>
                ))}
              </Select>
              <Select label="Branch" defaultValue="br-1" required>
                {branches.map(branch => (
                  <Select.Option key={branch.id} id={branch.id}>
                    {branch.name}
                  </Select.Option>
                ))}
              </Select>
            </Columns>
            <Columns columns={[1, 1]} space="related" collapseAt="40rem">
              <Select label="Payment type" defaultValue="pt-1">
                {paymentTypes.map(type => (
                  <Select.Option key={type.id} id={type.id}>
                    {type.name}
                  </Select.Option>
                ))}
              </Select>
              <Select label="Delivery type" defaultValue="dt-2">
                {deliveryTypes.map(type => (
                  <Select.Option key={type.id} id={type.id}>
                    {type.name}
                  </Select.Option>
                ))}
              </Select>
            </Columns>
          </Stack>
        </Panel.Content>
      </Panel>

      <Panel size="form">
        <Panel.Header>
          <Title>Data transfer</Title>
          <Description>
            Which parts of the source order travel with the copy.
          </Description>
        </Panel.Header>
        <Panel.Content>
          <Stack space="group">
            <Stack space="regular">
              <Headline level={3} size="level-5">
                Order data
              </Headline>
              {/*
                `<Switch>` already places the toggle before the label and puts
                the description in the label's column. Passing `description`
                directly keeps that grid intact — a wrapper that flips the
                label/toggle order breaks the alignment instead of fixing it.
              */}
              <Switch label="Copy order remarks" defaultSelected />
              <Switch
                label="Copy booking reference"
                description="Keeps the reference from the source order so finance can reconcile the two."
              />
            </Stack>

            <Stack space="regular">
              <Headline level={3} size="level-5">
                Free fields
              </Headline>
              <Switch label="Copy free fields per order" defaultSelected />
              <Switch label="Copy free fields per ticket" />
            </Stack>

            <Stack space="regular">
              <Headline level={3} size="level-5">
                Delivery address
              </Headline>
              <Switch
                label="Copy delivery address"
                description="When off, the address on file for the customer is used instead."
                defaultSelected
              />
            </Stack>
          </Stack>
        </Panel.Content>

        {/*
          Order tags are the periphery of "Data transfer": most runs leave them
          alone, and nothing here is required. That is exactly what a single
          Collapsible is for — one per Panel, never a stack of them.
        */}
        <Panel.Collapsible>
          <Panel.CollapsibleHeader>
            <Title>Order tags</Title>
            <Description>
              Carry tags over to the copy, or exclude orders that carry one.
            </Description>
          </Panel.CollapsibleHeader>
          <Panel.CollapsibleContent>
            <Stack space="group">
              <Stack space="regular">
                <SegmentedControl
                  label="Order features"
                  value={orderFeatures}
                  onChange={value => setOrderFeatures(value as TagMode)}
                >
                  <SegmentedControl.Option value="none">
                    None
                  </SegmentedControl.Option>
                  <SegmentedControl.Option value="all">
                    All
                  </SegmentedControl.Option>
                  <SegmentedControl.Option value="custom">
                    Selected
                  </SegmentedControl.Option>
                </SegmentedControl>
                {orderFeatures === 'custom' && (
                  <Checkbox.Group
                    label="Tags to copy"
                    defaultValue={['tag-2']}
                    description="At least one tag is required for this mode."
                  >
                    {orderTags.map(tag => (
                      <Checkbox key={tag.id} value={tag.id} label={tag.name} />
                    ))}
                  </Checkbox.Group>
                )}
              </Stack>

              <Stack space="regular">
                <SegmentedControl
                  label="Cancellation"
                  value={cancellation}
                  onChange={value =>
                    setCancellation(value as 'none' | 'custom')
                  }
                  description="Orders carrying an excluded tag are skipped."
                >
                  <SegmentedControl.Option value="none">
                    Copy all orders
                  </SegmentedControl.Option>
                  <SegmentedControl.Option value="custom">
                    Exclude by tag
                  </SegmentedControl.Option>
                </SegmentedControl>
                {cancellation === 'custom' && (
                  <Checkbox.Group
                    label="Tags to exclude"
                    defaultValue={['tag-4']}
                  >
                    {orderTags.map(tag => (
                      <Checkbox key={tag.id} value={tag.id} label={tag.name} />
                    ))}
                  </Checkbox.Group>
                )}
              </Stack>
            </Stack>
          </Panel.CollapsibleContent>
        </Panel.Collapsible>
      </Panel>

      <Panel size="form">
        <Panel.Header>
          <Title>Booking filter</Title>
          <Description>
            Restrict the run to a list of orders instead of the whole bundle.
          </Description>
        </Panel.Header>
        <Panel.Content>
          <Stack space="regular">
            <Switch
              label="Restrict to specific orders"
              selected={restrictBookings}
              onChange={setRestrictBookings}
            />
            {restrictBookings ? (
              <Stack space="regular">
                <SegmentedControl label="Filter mode" defaultValue="include">
                  <SegmentedControl.Option value="include">
                    Only these orders
                  </SegmentedControl.Option>
                  <SegmentedControl.Option value="exclude">
                    All but these orders
                  </SegmentedControl.Option>
                </SegmentedControl>
                <TextArea
                  label="Order numbers"
                  description="Separate with spaces, commas, or semicolons."
                  placeholder="104233, 104240, 104255"
                  rows={3}
                />
              </Stack>
            ) : (
              <Text variant="muted" fontSize="sm">
                All orders in the selected bundles are copied.
              </Text>
            )}
          </Stack>
        </Panel.Content>
      </Panel>

      <SectionMessage variant="warning">
        <SectionMessage.Title>
          Free fields per ticket are not copied
        </SectionMessage.Title>
        <SectionMessage.Content>
          <Text>
            The source bundles carry per-ticket free fields that this run will
            drop. Turn the switch on above if the copies need them.
          </Text>
        </SectionMessage.Content>
      </SectionMessage>
    </>
  );
};
