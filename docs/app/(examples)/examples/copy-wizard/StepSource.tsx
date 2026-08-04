'use client';

import { ArrowDown, ArrowUp } from 'lucide-react';
import { useMemo, useState } from 'react';
import {
  Badge,
  Button,
  Description,
  EmptyState,
  Inline,
  Panel,
  SectionMessage,
  Select,
  Table,
  Text,
  Title,
} from '@marigold/components';
import { bundleGroups, bundles } from './data';

/**
 * Step 1 — pick the source bundles and their transfer order.
 *
 * Three stacked Panels, each owning one topic. The first holds a single Select;
 * the two below are data Panels whose tables run edge to edge via
 * `<Panel.Content bleed>`, so the cell edges line up with the Panel title above
 * them.
 *
 * This step is why the whole wizard is full width. A table wants the room, and
 * a page where some Panels are capped and others are not reads as ragged — so
 * the measure is decided once, for the page, and every Panel in every step
 * follows it.
 */
export const StepSource = () => {
  const [groupId, setGroupId] = useState<string>('bg-1');
  const [selected, setSelected] = useState<Set<string>>(
    () => new Set(['b-1', 'b-3'])
  );
  const [order, setOrder] = useState<string[]>(['b-1', 'b-3']);

  const selectedIds = useMemo(() => [...selected], [selected]);

  // Keep the transfer order in sync with the selection: existing entries hold
  // their rank, newly checked bundles are appended.
  const ranked = useMemo(() => {
    const kept = order.filter(id => selectedIds.includes(id));
    const added = selectedIds.filter(id => !kept.includes(id));
    return [...kept, ...added]
      .map(id => bundles.find(bundle => bundle.id === id))
      .filter((bundle): bundle is (typeof bundles)[number] => Boolean(bundle));
  }, [order, selectedIds]);

  const move = (id: string, direction: -1 | 1) => {
    const ids = ranked.map(bundle => bundle.id);
    const from = ids.indexOf(id);
    const to = from + direction;
    if (to < 0 || to >= ids.length) return;
    [ids[from], ids[to]] = [ids[to], ids[from]];
    setOrder(ids);
  };

  return (
    <>
      <Panel>
        <Panel.Header>
          <Title>Bundle group</Title>
          <Description>
            Every bundle in this run comes from one group. Changing the group
            clears the selection below.
          </Description>
        </Panel.Header>
        <Panel.Content>
          <Select
            label="Bundle group"
            placeholder="Select a group"
            value={groupId}
            onChange={key => {
              setGroupId(String(key ?? ''));
              setSelected(new Set());
              setOrder([]);
            }}
            width={72}
            required
          >
            {bundleGroups.map(group => (
              <Select.Option key={group.id} id={group.id}>
                {group.name}
              </Select.Option>
            ))}
          </Select>
        </Panel.Content>
      </Panel>

      <SectionMessage variant="info">
        <SectionMessage.Content>
          <Text>
            Bundles are copied in the order below. A bundle that shares seats
            with an earlier one inherits its assignment.
          </Text>
        </SectionMessage.Content>
      </SectionMessage>

      {/*
        The two lists are stacked, not placed side by side. A transfer list
        (available on the left, chosen on the right) is space-hungry and rarely
        earns its cost — see the Pick pattern. Side by side, each table gets
        roughly half the content width, which is already below what a table with
        a selection column and three data columns wants, so the tables push
        their columns wider than the layout and the whole page needs a
        max-width hack to stay put. Stacked, each table gets the full measure
        and nothing has to be forced.
      */}
      <Panel>
        <Panel.Header>
          <Title>Available bundles</Title>
          <Description>{`${selectedIds.length} of ${bundles.length} selected`}</Description>
        </Panel.Header>
        <Panel.Content bleed>
          <Table
            aria-label="Available bundles"
            variant="muted"
            selectionMode="multiple"
            selectedKeys={selected}
            onSelectionChange={keys =>
              setSelected(
                keys === 'all'
                  ? new Set(bundles.map(bundle => bundle.id))
                  : new Set([...keys].map(String))
              )
            }
          >
            <Table.Header>
              <Table.Column rowHeader>Bundle</Table.Column>
              <Table.Column>Type</Table.Column>
              <Table.Column width={140}>Connections</Table.Column>
            </Table.Header>
            <Table.Body>
              {bundles.map(bundle => (
                <Table.Row key={bundle.id} id={bundle.id}>
                  <Table.Cell>{bundle.name}</Table.Cell>
                  <Table.Cell>
                    <Badge
                      variant={bundle.type === 'series' ? 'info' : 'default'}
                    >
                      {bundle.type === 'series' ? 'Series' : 'Single'}
                    </Badge>
                  </Table.Cell>
                  <Table.Cell>{bundle.connections}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </Panel.Content>
      </Panel>

      <Panel>
        <Panel.Header>
          <Title>Transfer order</Title>
          <Description>
            The order the bundles are processed in. Move a bundle up to give it
            priority.
          </Description>
        </Panel.Header>
        {ranked.length === 0 ? (
          <Panel.Content>
            <EmptyState
              title="No bundles selected"
              description="Pick at least one bundle above to build the transfer order."
            />
          </Panel.Content>
        ) : (
          <Panel.Content bleed>
            <Table aria-label="Transfer order" variant="muted">
              <Table.Header>
                <Table.Column width={64}>Rank</Table.Column>
                <Table.Column rowHeader>Bundle</Table.Column>
                <Table.Column width={112}>Reorder</Table.Column>
              </Table.Header>
              <Table.Body>
                {ranked.map((bundle, index) => (
                  <Table.Row key={bundle.id} id={bundle.id}>
                    <Table.Cell>{index + 1}</Table.Cell>
                    <Table.Cell>{bundle.name}</Table.Cell>
                    <Table.Cell>
                      {/*
                        Row-level controls are `variant="ghost"`, not the
                        default `secondary`. A filled button in every row of a
                        table puts a grey box next to every line of data and
                        competes with the row itself for attention; the ghost
                        variant keeps the icon and drops the box, and still
                        gives a hover and focus surface. `space="tight"` (6px)
                        rather than `collapsed` (0) so the pair reads as two
                        buttons — with no fill to separate them, touching
                        targets look like one wide control.

                        `noWrap` is not optional. `<Inline>` wraps by default,
                        which is right for content and wrong for a control pair:
                        in a fixed-width table column the second button drops
                        onto its own line and doubles the row height. Any time
                        the children are one control rather than a list, turn
                        wrapping off and give the column room for them.
                      */}
                      <Inline space="tight" noWrap>
                        <Button
                          variant="ghost"
                          size="icon"
                          aria-label={`Move ${bundle.name} up`}
                          disabled={index === 0}
                          onPress={() => move(bundle.id, -1)}
                        >
                          <ArrowUp />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          aria-label={`Move ${bundle.name} down`}
                          disabled={index === ranked.length - 1}
                          onPress={() => move(bundle.id, 1)}
                        >
                          <ArrowDown />
                        </Button>
                      </Inline>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </Panel.Content>
        )}
      </Panel>
    </>
  );
};
