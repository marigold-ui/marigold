import { expect } from 'storybook/test';
import preview from '.storybook/preview';
import { Card } from '../Card/Card';
import { Inline } from '../Inline/Inline';
import { Stack } from '../Stack/Stack';
import { Table } from '../Table/Table';
import { alphaOf } from '../contrast.utils';
import { Skeleton } from './Skeleton';

// Placeholders are aria-hidden, so role queries can't reach them. Each one
// carries its own size variables, which nothing else in these stories sets.
const skeletonsIn = (root: HTMLElement) =>
  Array.from(root.querySelectorAll<HTMLElement>('[aria-hidden="true"]')).filter(
    el => el.style.getPropertyValue('--width') !== ''
  );

const meta = preview.meta({
  title: 'Components/Skeleton',
  component: Skeleton,
  argTypes: {
    width: {
      control: { type: 'text' },
      description: 'Spacing-scale value, fraction or keyword',
    },
    height: {
      control: { type: 'text' },
      description: 'Spacing-scale value',
    },
    variant: {
      control: { type: 'radio' },
      options: ['default', 'rounded'],
    },
  },
});

export const Basic = meta.story({
  tags: ['component-test'],
  args: {
    width: '1/2',
  },
  render: args => <Skeleton {...args} />,
});

/**
 * Text lines take the default height (one line of body text). Taller blocks
 * stand in for headings, inputs and media.
 */
export const Sizes = meta.story({
  tags: ['component-test'],
  render: () => (
    <Stack space="regular">
      <Skeleton width="1/3" height={6} />
      <Stack space="related">
        <Skeleton />
        <Skeleton />
        <Skeleton width="2/3" />
      </Stack>
      <Skeleton height={32} />
    </Stack>
  ),
});

/**
 * The `rounded` variant fully rounds the ends: a circle for an avatar when
 * width and height match, a pill for a badge.
 */
export const Rounded = meta.story({
  tags: ['component-test'],
  render: () => (
    <Inline space="related" alignY="center">
      <Skeleton width={10} height={10} variant="rounded" />
      <Stack space="related">
        <Skeleton width={40} />
        <Skeleton width={24} height={3} />
      </Stack>
      <Skeleton width={16} height={5} variant="rounded" />
    </Inline>
  ),
});

Rounded.test(
  'turns a square into a circle',
  { parameters: { chromatic: { disableSnapshot: true } } },
  async ({ canvasElement }) => {
    const [avatar] = skeletonsIn(canvasElement);
    const { width, height } = avatar.getBoundingClientRect();

    await expect(width).toBe(height);
    await expect(
      parseFloat(getComputedStyle(avatar).borderTopLeftRadius)
    ).toBeGreaterThanOrEqual(width / 2);
  }
);

/**
 * The fill derives from the text colour, so the placeholder stays visible on
 * the page background, a white surface and a tinted row alike.
 */
export const OnBackgrounds = meta.story({
  tags: ['component-test'],
  render: () => (
    <Stack space="regular">
      <div className="bg-surface border-surface-border rounded border p-4">
        <Skeleton width="2/3" />
      </div>
      <div className="bg-background text-foreground border-surface-border rounded border p-4">
        <Skeleton width="2/3" />
      </div>
      <div className="bg-selected text-foreground rounded p-4">
        <Skeleton width="2/3" />
      </div>
    </Stack>
  ),
});

OnBackgrounds.test(
  'stays a translucent tint on every ground',
  { parameters: { chromatic: { disableSnapshot: true } } },
  async ({ canvasElement }) => {
    const skeletons = skeletonsIn(canvasElement);

    await expect(skeletons).toHaveLength(3);

    for (const skeleton of skeletons) {
      const alpha = alphaOf(getComputedStyle(skeleton).backgroundColor);

      await expect(alpha).toBeGreaterThan(0);
      await expect(alpha).toBeLessThan(255);
    }
  }
);

/**
 * Skeletons mirror the layout they stand in for, so nothing jumps once the
 * content arrives. Here: a field (label and input) and a card.
 *
 * Fractions are relative to the container. A card sizes itself to its
 * content, and placeholders have none, so the card takes `stretch` and a
 * width from outside, as a card grid gives it.
 */
export const Composition = meta.story({
  tags: ['component-test'],
  render: () => (
    <Stack space="group">
      <Stack space="tight">
        <Skeleton width={32} height="3.5" />
        <Skeleton height={9} />
      </Stack>
      <div className="w-80">
        <Card aria-hidden="true" stretch>
          <Card.Content>
            <Inline space="related" alignY="center" noWrap>
              <Skeleton width={12} height={12} variant="rounded" />
              <Stack space="related" stretch>
                <Skeleton width="1/2" height={5} />
                <Skeleton />
                <Skeleton width="3/4" />
              </Stack>
            </Inline>
          </Card.Content>
        </Card>
      </div>
    </Stack>
  ),
});

Composition.test(
  'keeps a fixed size in a row that has no room to spare',
  { parameters: { chromatic: { disableSnapshot: true } } },
  async ({ canvasElement }) => {
    // The avatar is the only square placeholder in the story.
    const avatar = skeletonsIn(canvasElement).find(
      el =>
        el.style.getPropertyValue('--width') ===
        el.style.getPropertyValue('--height')
    );
    const { width, height } = avatar!.getBoundingClientRect();

    await expect(width).toBeGreaterThan(0);
    await expect(width).toBe(height);
  }
);

const columns = [
  { name: 'Name', width: '3/4' },
  { name: 'Email', width: 'full' },
  { name: 'Status', width: '1/2' },
] as const;

const skeletonRows = Array.from({ length: 5 }, (_, i) => `skeleton-${i}`);

/**
 * Skeleton rows inside the real table, for the first load. The header stays
 * real, and `loading` on the table marks it busy and announces the load, so
 * the placeholders themselves stay silent.
 */
export const InTable = meta.story({
  tags: ['component-test'],
  render: () => (
    <Table
      aria-label="Orders"
      loading
      selectionMode="multiple"
      // Placeholder rows can't be selected, but the checkbox column stays.
      disabledKeys={skeletonRows}
    >
      <Table.Header>
        {columns.map(({ name }, i) => (
          <Table.Column key={name} rowHeader={i === 0}>
            {name}
          </Table.Column>
        ))}
      </Table.Header>
      <Table.Body>
        {skeletonRows.map(id => (
          <Table.Row key={id} id={id}>
            {columns.map(({ name, width }, i) => (
              // A row header needs text for type-to-select, and there is none yet.
              <Table.Cell key={name} textValue={i === 0 ? '' : undefined}>
                <Skeleton width={width} />
              </Table.Cell>
            ))}
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  ),
});

// Table's own `Loading` story guards the busy state and the announcement.
InTable.test(
  'renders one placeholder per cell',
  { parameters: { chromatic: { disableSnapshot: true } } },
  async ({ canvasElement }) => {
    await expect(skeletonsIn(canvasElement)).toHaveLength(15);
  }
);

InTable.test(
  'keeps placeholder rows out of selection',
  { parameters: { chromatic: { disableSnapshot: true } } },
  async ({ canvas, userEvent }) => {
    const [selectAll, ...rowCheckboxes] = canvas.getAllByRole('checkbox');

    await expect(rowCheckboxes).toHaveLength(5);
    for (const checkbox of rowCheckboxes) {
      await expect(checkbox).toBeDisabled();
    }

    await userEvent.click(selectAll);

    for (const row of canvas.getAllByRole('row').slice(1)) {
      await expect(row).not.toHaveAttribute('aria-selected', 'true');
    }
  }
);
