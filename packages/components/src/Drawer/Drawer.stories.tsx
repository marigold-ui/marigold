import { useState } from 'react';
import { expect, waitFor } from 'storybook/test';
import preview from '.storybook/preview';
import { Button } from '../Button/Button';
import { Checkbox } from '../Checkbox/Checkbox';
import { Form } from '../Form/Form';
import { Select } from '../Select/Select';
import { Slider } from '../Slider/Slider';
import { Stack } from '../Stack/Stack';
import { TextField } from '../TextField/TextField';
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

Basic.test('Open drawer', async ({ canvas, userEvent }) => {
  await userEvent.click(canvas.getByRole('button', { name: 'Open Drawer' }));

  await waitFor(() =>
    expect(canvas.getByText('Drawer Title')).toBeInTheDocument()
  );
});

export const WithForms = meta.story({
  parameters: { chromatic: { disableSnapshot: true } },
  render: args => (
    <Drawer.Trigger>
      <Button>Configure Filter</Button>
      <Drawer {...args}>
        <Form unstyled>
          <Drawer.Title>Filter</Drawer.Title>
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
        <Drawer.Title>Long Content</Drawer.Title>
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
      '[class*="overflow-y-auto"]'
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
  parameters: { chromatic: { disableSnapshot: true } },
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
            <Drawer.Title>Drawer Title</Drawer.Title>
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
