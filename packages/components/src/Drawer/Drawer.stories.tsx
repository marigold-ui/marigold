import { useState } from 'react';
import { expect, waitFor } from 'storybook/test';
import preview from '.storybook/preview';
import { Copy, Download, Pencil, Trash2 } from '@marigold/icons';
import { Accordion } from '../Accordion/Accordion';
import { Button } from '../Button/Button';
import { ButtonGroup } from '../ButtonGroup/ButtonGroup';
import { Checkbox } from '../Checkbox/Checkbox';
import { Description } from '../Description/Description';
import { Form } from '../Form/Form';
import { ActionMenu } from '../Menu/ActionMenu';
import { Select } from '../Select/Select';
import { Slider } from '../Slider/Slider';
import { Stack } from '../Stack/Stack';
import { Table } from '../Table/Table';
import { TextField } from '../TextField/TextField';
import { Title } from '../Title/Title';
import { Drawer } from './Drawer';

const meta = preview.meta({
  title: 'Components/Drawer',
  component: Drawer,
  decorators: [
    Story => (
      <div id="storybook-root">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    size: {
      control: {
        type: 'radio',
      },
      description: 'The size of the drawer on the screen.',
      options: ['xsmall', 'small', 'medium'],
    },
  },
  args: {},
});

export const Basic = meta.story({
  tags: ['component-test'],
  parameters: { chromatic: { disableSnapshot: true } },
  render: args => (
    <Stack space={8} alignX="left">
      <Drawer.Trigger>
        <Button>Open Drawer</Button>
        <Drawer {...args}>
          <Drawer.Title>Drawer Title</Drawer.Title>
          <Drawer.Content>
            <p className="pb-4">
              Once upon a time in the quirky world of web design, there lived a
              lively Drawer Component named Daria. Unlike her staid companions,
              she loved to make a grand entrance by sliding in from the left,
              declaring, "Surprise! I've got filters and puns galore!"
            </p>

            <p className="pb-4">
              Every time a user clicked, Daria would pop out with flair, showing
              off her hidden treasures while her neighboring components—Header
              the Bold and Footer the Wise—watched in amused awe. They’d chuckle
              as Daria’s witty remarks filled the space between content
              sections.
            </p>

            <p className="pb-4">
              One day, Daria got a bit too excited. In a burst of enthusiasm,
              she slid out so fast that she disrupted the perfect grid layout!
              The Main Content, usually so composed, was thrown into disarray,
              muttering about lost pixels and wayward margins.
            </p>

            <p className="pb-4">
              But instead of sulking, Daria quipped, "Looks like I just broke
              the grid—guess I'm too stylish to be confined!" The users,
              entertained by her antics, cheered on as she restored order with a
              graceful slide back, proving that even a mischievous drawer could
              be the hero of responsive design.
            </p>
          </Drawer.Content>
          <Drawer.Actions>
            <Button slot="close">Close</Button>
            <Button
              slot="close"
              variant="primary"
              onPress={() => alert('Drawer will be closed')}
            >
              Save
            </Button>
          </Drawer.Actions>
        </Drawer>
      </Drawer.Trigger>
      <TextField
        label="Name"
        description="Can you interact with me when the drawer is open?"
        width={80}
      />
    </Stack>
  ),
});

Basic.test(
  'Open drawer',
  {
    parameters: { chromatic: { disableSnapshot: false } },
  },
  async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: 'Open Drawer' }));

    await waitFor(() =>
      expect(canvas.getByText('Drawer Title')).toBeInTheDocument()
    );
  }
);

export const WithForms = meta.story({
  parameters: { surface: false, chromatic: { disableSnapshot: true } },
  render: args => (
    <Drawer.Trigger>
      <Button>Configure Filter</Button>
      <Drawer {...args}>
        <Form unstyled>
          <Title>Filter</Title>
          <Drawer.Content>
            <Stack space={8}>
              <Slider
                label="Price"
                formatOptions={{ style: 'currency', currency: 'EUR' }}
                minValue={10}
                maxValue={140}
                defaultValue={[30, 60]}
                thumbLabels={['min', 'max']}
              />
              <Select label="Category">
                <Select.Option id="all">All</Select.Option>
                <Select.Option id="classic">Classic</Select.Option>
                <Select.Option id="rock">Rock</Select.Option>
                <Select.Option id="pop">Pop</Select.Option>
                <Select.Option id="jazz">Jazz</Select.Option>
              </Select>
              <Checkbox.Group label="Amenities">
                <Checkbox label="Fast Lane" value="fast-lane" />
                <Checkbox label="VIP Parking" value="parking" />
              </Checkbox.Group>
            </Stack>
          </Drawer.Content>
          <Drawer.Actions>
            <Button slot="close">Close</Button>
            <Button
              slot="close"
              variant="primary"
              onPress={() => alert('Apply filters and close dialog')}
            >
              Apply
            </Button>
          </Drawer.Actions>
        </Form>
      </Drawer>
    </Drawer.Trigger>
  ),
});

export const LongContent = meta.story({
  tags: ['component-test'],
  parameters: { chromatic: { disableSnapshot: true } },
  globals: {
    viewport: { value: 'smallScreen' },
  },
  render: args => (
    <Drawer.Trigger>
      <Button>Open Drawer</Button>
      <Drawer {...args}>
        <Title>Long Content</Title>
        <Drawer.Content>
          <Stack space={4}>
            {Array.from({ length: 16 }, (_, i) => (
              <p key={i}>
                Paragraph #{i + 1}. Lorem ipsum dolor sit amet, consectetur
                adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua.
              </p>
            ))}
            <p data-testid="end-of-content">End of content</p>
          </Stack>
        </Drawer.Content>
        <Drawer.Actions>
          <Button slot="close">Close</Button>
          <Button slot="close" variant="primary">
            Save
          </Button>
        </Drawer.Actions>
      </Drawer>
    </Drawer.Trigger>
  ),
});

LongContent.test(
  'Long content on a small screen',
  {
    parameters: { chromatic: { disableSnapshot: false } },
  },
  async ({ canvas, userEvent }) => {
    const trigger = canvas.getByRole('button', { name: 'Open Drawer' });
    await userEvent.click(trigger);
    const endMarker = await canvas.findByTestId('end-of-content');
    const scrollContainer = endMarker.closest(
      '[class*="ui-panel-content"]'
    ) as HTMLElement;
    const isWithin = (child: Element, parent: Element) => {
      const c = child.getBoundingClientRect();
      const p = parent.getBoundingClientRect();
      return c.top >= p.top && c.bottom <= p.bottom + 1;
    };

    // Mobile path renders role="dialog"; desktop NonModal renders
    // role="complementary". If useSmallScreen flakes, fail loudly here
    // rather than pass a test that didn't exercise the fix.
    expect(endMarker.closest('section')?.getAttribute('role')).toBe('dialog');

    // react-aria's focus-on-open may auto-scroll the content; reset first.
    scrollContainer.scrollTop = 0;

    // The bug let content grow the Drawer instead of clipping it, so
    // `scrollHeight` collapsed to `clientHeight`.
    expect(scrollContainer.scrollHeight).toBeGreaterThan(
      scrollContainer.clientHeight
    );
    await waitFor(() => {
      expect(isWithin(endMarker, scrollContainer)).toBe(false);
    });

    scrollContainer.scrollTop = scrollContainer.scrollHeight;

    await waitFor(() => {
      expect(isWithin(endMarker, scrollContainer)).toBe(true);
    });
    expect(window.innerWidth).toBeLessThan(640);
  }
);

export const SelectInsideDrawerSmallScreen = meta.story({
  tags: ['component-test'],
  parameters: { chromatic: { disableSnapshot: true } },
  globals: {
    viewport: { value: 'smallScreen' },
  },
  render: args => (
    <Drawer.Trigger>
      <Button>Open Drawer</Button>
      <Drawer {...args}>
        <Drawer.Title>Filter</Drawer.Title>
        <Drawer.Content>
          <Select label="Category">
            <Select.Option id="all">All</Select.Option>
            <Select.Option id="classic">Classic</Select.Option>
            <Select.Option id="rock">Rock</Select.Option>
          </Select>
        </Drawer.Content>
        <Drawer.Actions>
          <Button slot="close">Close Drawer</Button>
        </Drawer.Actions>
      </Drawer>
    </Drawer.Trigger>
  ),
});

SelectInsideDrawerSmallScreen.test(
  'Shows values on a small screen',
  {
    parameters: { chromatic: { disableSnapshot: false } },
  },
  async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: 'Open Drawer' }));
    await waitFor(() => expect(canvas.getByText('Filter')).toBeInTheDocument());

    // On small screens, clicking the Select trigger opens a Tray.
    // The Tray must render above the Drawer overlay (z-index fix for DSTSUP-263).
    const selectTrigger = canvas.getByRole('button', { name: /category/i });
    await userEvent.click(selectTrigger);

    // Wait for the Tray to open and find an option to confirm it rendered.
    const rockOption = await canvas.findByRole('option', { name: 'Rock' });
    expect(rockOption).toBeInTheDocument();

    // Assert z-index stacking: the Tray overlay must not sit below the Drawer overlay.
    // Both portal directly to document.body; at equal z-index the later DOM node wins.
    // We read the Tailwind z-* class because getComputedStyle returns "auto" in the
    // test environment before CSS is fully resolved.
    const tailwindZ = (el: Element) => {
      const match = el.className.match(/\bz-(\d+)\b/);
      return match ? parseInt(match[1], 10) : 0;
    };

    // Walk up from a descendant to find its direct child-of-body portal root.
    const portalRoot = (el: Element): Element => {
      let node = el;
      while (node.parentElement && node.parentElement !== document.body) {
        node = node.parentElement;
      }
      return node;
    };

    // The Tray dialog contains the Rock option; the Drawer dialog contains the title.
    const trayPortal = portalRoot(rockOption.closest('[role="dialog"]')!);
    const drawerPortal = portalRoot(
      canvas.getByText('Filter').closest('[role="dialog"]')!
    );

    expect(tailwindZ(trayPortal)).toBeGreaterThanOrEqual(
      tailwindZ(drawerPortal)
    );
  }
);

export const Controlled = meta.story({
  parameters: { surface: false, chromatic: { disableSnapshot: true } },
  render: args => {
    const [open, setOpen] = useState(false);
    const onOpenChange = (open: boolean) => {
      setOpen(open);
    };
    return (
      <Stack space={8} alignX="left">
        <Drawer.Trigger open={open} onOpenChange={onOpenChange}>
          <Button>Open Drawer</Button>
          <Drawer {...args}>
            <Title>Drawer Title</Title>
            <Drawer.Content>Drawer Content</Drawer.Content>
            <Drawer.Actions>
              <Button slot="close">Close</Button>
              <Button variant="primary">Apply</Button>
            </Drawer.Actions>
          </Drawer>
        </Drawer.Trigger>
        <pre>Drawer is {open ? 'open' : 'closed'}</pre>
      </Stack>
    );
  },
});

/** Opening a second Drawer while one is open dismisses the first. */
export const OneAtATime = meta.story({
  tags: ['component-test'],
  parameters: { surface: false, chromatic: { disableSnapshot: true } },
  render: args => (
    <Stack space={8} alignX="left">
      <Drawer.Trigger>
        <Button>Open A</Button>
        <Drawer {...args}>
          <Title>Title A</Title>
          <Drawer.Content>Content A</Drawer.Content>
        </Drawer>
      </Drawer.Trigger>
      <Drawer.Trigger>
        <Button>Open B</Button>
        <Drawer {...args}>
          <Title>Title B</Title>
          <Drawer.Content>Content B</Drawer.Content>
        </Drawer>
      </Drawer.Trigger>
    </Stack>
  ),
});

OneAtATime.test(
  'Opening a second drawer dismisses the first',
  async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: 'Open A' }));
    expect(await canvas.findByText('Title A')).toBeInTheDocument();

    await userEvent.click(canvas.getByRole('button', { name: 'Open B' }));
    expect(await canvas.findByText('Title B')).toBeInTheDocument();

    await waitFor(() =>
      expect(canvas.queryByText('Title A')).not.toBeInTheDocument()
    );

    // ESC closes only the visible drawer.
    await userEvent.keyboard('{Escape}');
    await waitFor(() =>
      expect(canvas.queryByText('Title B')).not.toBeInTheDocument()
    );
  }
);

/**
 * DST-1407: A trigger nested inside an open Drawer opens a second Drawer over
 * the first. The parent stays mounted because dismissing it would also tear
 * down the nested trigger and the new Drawer with it. "One at a time" still
 * holds between sibling Drawers — only nested pairs are allowed to stack.
 */
export const OneAtATimeNested = meta.story({
  tags: ['component-test'],
  parameters: { surface: false, chromatic: { disableSnapshot: true } },
  render: args => (
    <Drawer.Trigger>
      <Button>Open A</Button>
      <Drawer {...args} closeButton>
        <Title>Title A</Title>
        <Drawer.Content>
          <Drawer.Trigger>
            <Button>Open B</Button>
            <Drawer {...args} closeButton>
              <Title>Title B</Title>
              <Drawer.Content>Content B</Drawer.Content>
            </Drawer>
          </Drawer.Trigger>
        </Drawer.Content>
      </Drawer>
    </Drawer.Trigger>
  ),
});

OneAtATimeNested.test(
  'A nested drawer stacks over its parent',
  async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: 'Open A' }));
    expect(await canvas.findByText('Title A')).toBeInTheDocument();

    await userEvent.click(canvas.getByRole('button', { name: 'Open B' }));
    expect(await canvas.findByText('Title B')).toBeInTheDocument();

    // Parent stays open underneath the nested Drawer.
    expect(canvas.getByText('Title A')).toBeInTheDocument();

    // ESC closes only the topmost (nested) Drawer.
    await userEvent.keyboard('{Escape}');
    await waitFor(() =>
      expect(canvas.queryByText('Title B')).not.toBeInTheDocument()
    );
    expect(canvas.getByText('Title A')).toBeInTheDocument();
  }
);

/**
 * The slot-aware primitives `<Title>` / `<Description>` and the action
 * primitives can be used directly. `<Drawer.Header>` groups the title and
 * description; a `<ButtonGroup>` inside `<Drawer.Actions>` picks up its
 * defaults from the drawer root.
 */
export const SlotPrimitives = meta.story({
  tags: ['component-test'],
  parameters: { chromatic: { disableSnapshot: true } },
  render: args => (
    <Drawer.Trigger>
      <Button>Open Drawer</Button>
      <Drawer {...args}>
        <Drawer.Header>
          <Title>Manage event</Title>
          <Description>Update, duplicate, or remove this event.</Description>
        </Drawer.Header>
        <Drawer.Content>Choose an action below.</Drawer.Content>
        <Drawer.Actions>
          <ButtonGroup aria-label="Event actions">
            <Button>
              <Pencil />
              Edit
            </Button>
            <Button>
              <Copy />
              Duplicate
            </Button>
            <ActionMenu aria-label="More actions">
              <ActionMenu.Item id="export">
                <Download />
                Export
              </ActionMenu.Item>
              <ActionMenu.Item id="delete" variant="destructive">
                <Trash2 />
                Delete
              </ActionMenu.Item>
            </ActionMenu>
          </ButtonGroup>
        </Drawer.Actions>
      </Drawer>
    </Drawer.Trigger>
  ),
});

SlotPrimitives.test(
  'Renders slot primitives with grouped actions',
  {
    parameters: { chromatic: { disableSnapshot: false } },
  },
  async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: 'Open Drawer' }));
    await waitFor(() =>
      expect(canvas.getByText('Manage event')).toBeInTheDocument()
    );

    expect(
      canvas.getByRole('heading', { name: 'Manage event' })
    ).toBeInTheDocument();
    expect(
      canvas.getByText('Update, duplicate, or remove this event.').tagName
    ).toBe('P');
    expect(
      canvas.getByRole('toolbar', { name: 'Event actions' })
    ).toBeInTheDocument();
  }
);

/**
 * A bare `<Title slot="title">` (no `<Drawer.Header>`, no description) labels
 * the drawer landmark automatically via `aria-labelledby`.
 */
export const TitleOnlyWithoutHeader = meta.story({
  tags: ['component-test'],
  parameters: { chromatic: { disableSnapshot: true } },
  render: args => (
    <Drawer.Trigger>
      <Button>Open Drawer</Button>
      <Drawer {...args}>
        <Title>Notifications</Title>
        <Drawer.Content>You have no new notifications.</Drawer.Content>
      </Drawer>
    </Drawer.Trigger>
  ),
});

TitleOnlyWithoutHeader.test(
  'Labels the drawer with a bare Title',
  {
    parameters: { chromatic: { disableSnapshot: false } },
  },
  async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: 'Open Drawer' }));

    const drawer = await waitFor(() =>
      canvas.getByRole('complementary', { name: 'Notifications' })
    );
    const title = canvas.getByRole('heading', { name: 'Notifications' });

    expect(title.tagName).toBe('H2');
    expect(drawer).toHaveAttribute('aria-labelledby', title.id);
  }
);

/**
 * `<Drawer.Content bleed>` drops the horizontal padding and publishes
 * `--bleed-px`, letting edge-aware children like `Accordion` span the full
 * width: item dividers reach the Drawer edges while the header text stays
 * aligned with the Drawer title.
 */
export const BleedAccordion = meta.story({
  tags: ['component-test'],
  parameters: { chromatic: { disableSnapshot: true } },
  render: args => (
    <Drawer.Trigger>
      <Button>Open Drawer</Button>
      <Drawer {...args}>
        <Title>Settings</Title>
        <Drawer.Content bleed>
          <Accordion defaultExpandedKeys={['general']}>
            <Accordion.Item id="general">
              <Accordion.Header>General</Accordion.Header>
              <Accordion.Content>
                Language, timezone and appearance.
              </Accordion.Content>
            </Accordion.Item>
            <Accordion.Item id="notifications">
              <Accordion.Header>Notifications</Accordion.Header>
              <Accordion.Content>
                Email and push notification preferences.
              </Accordion.Content>
            </Accordion.Item>
            <Accordion.Item id="privacy">
              <Accordion.Header>Privacy</Accordion.Header>
              <Accordion.Content>
                Control who can see your activity.
              </Accordion.Content>
            </Accordion.Item>
          </Accordion>
        </Drawer.Content>
      </Drawer>
    </Drawer.Trigger>
  ),
});

BleedAccordion.test(
  'Opens the drawer with a full-width Accordion',
  {
    parameters: { chromatic: { disableSnapshot: false } },
  },
  async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: 'Open Drawer' }));

    expect(
      await canvas.findByRole('button', { name: 'General' })
    ).toBeInTheDocument();
  }
);

/**
 * A `Table` is the other edge-aware child: in a bled content area its row
 * dividers span the full width while cell text stays aligned with the title.
 */
export const BleedTable = meta.story({
  tags: ['component-test'],
  parameters: { chromatic: { disableSnapshot: true } },
  render: args => (
    <Drawer.Trigger>
      <Button>Open Drawer</Button>
      <Drawer {...args}>
        <Title>Attendees</Title>
        <Drawer.Content bleed>
          <Table aria-label="Attendees">
            <Table.Header>
              <Table.Column rowHeader>Name</Table.Column>
              <Table.Column>Role</Table.Column>
            </Table.Header>
            <Table.Body>
              <Table.Row>
                <Table.Cell>Ada Lovelace</Table.Cell>
                <Table.Cell>Organizer</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Alan Turing</Table.Cell>
                <Table.Cell>Speaker</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Grace Hopper</Table.Cell>
                <Table.Cell>Guest</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </Drawer.Content>
      </Drawer>
    </Drawer.Trigger>
  ),
});

BleedTable.test(
  'Opens the drawer with a full-width Table',
  {
    parameters: { chromatic: { disableSnapshot: false } },
  },
  async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: 'Open Drawer' }));

    expect(
      await canvas.findByRole('grid', { name: 'Attendees' })
    ).toBeInTheDocument();
  }
);
