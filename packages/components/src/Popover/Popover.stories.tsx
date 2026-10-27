import { useState } from 'react';
import { expect, fn, screen, waitFor, within } from 'storybook/test';
import preview from '.storybook/preview';
import { Archive, Bell, StickyNote, UserMinus, Users } from '@marigold/icons';
import { Button } from '../Button/Button';
import { ButtonGroup } from '../ButtonGroup/ButtonGroup';
import { Description } from '../Description/Description';
import { useConfirmation } from '../Dialog/useConfirmation';
import { EmptyState } from '../EmptyState/EmptyState';
import { Form } from '../Form/Form';
import { Inline } from '../Inline/Inline';
import { LinkButton } from '../LinkButton/LinkButton';
import { ListView } from '../ListView/ListView';
import { ActionMenu } from '../Menu/ActionMenu';
import { Stack } from '../Stack/Stack';
import { Text } from '../Text/Text';
import { TextArea } from '../TextArea/TextArea';
import { TextValue } from '../TextValue/TextValue';
import { Title } from '../Title/Title';
import { Tooltip } from '../Tooltip/Tooltip';
import { Popover } from './Popover';
import type { PopoverProps } from './Popover';

const meta = preview.meta({
  title: 'Components/Popover',
  component: Popover,
  // The popover portals into "storybook-root" (see the global
  // `OverlayContainerProvider`); this decorator provides that container so
  // the overlay mounts inside the story canvas during tests.
  decorators: [
    Story => (
      <div id="storybook-root">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    nonModal: {
      control: { type: 'boolean' },
      description:
        'Whether the popover is non-modal: focus can leave and the page stays interactive.',
      table: { defaultValue: { summary: 'false' } },
    },
    size: {
      control: { type: 'radio' },
      options: ['small', 'medium', 'large', 'fit'],
      description:
        'Width of the popover on larger screens. `fit` sizes it to its content.',
      table: { defaultValue: { summary: 'medium' } },
    },
    placement: {
      control: { type: 'select' },
      options: ['bottom', 'bottom start', 'bottom end', 'top', 'left', 'right'],
      description: 'Placement of the popover relative to its trigger.',
      table: { defaultValue: { summary: 'bottom' } },
    },
  },
  args: {
    nonModal: false,
    size: 'medium',
    placement: 'bottom',
  },
});

export const Basic = meta.story({
  tags: ['component-test'],
  render: args => (
    <Popover.Trigger>
      <Button>Show event details</Button>
      <Popover {...args}>
        <Title>Summer Open Air</Title>
        <Description>Sat, 12 July · Stadtgarten</Description>
        <Popover.Content>
          <Text>
            Doors open at 17:00. Seating is unreserved, so arrive early for a
            spot near the stage.
          </Text>
        </Popover.Content>
      </Popover>
    </Popover.Trigger>
  ),
});

Basic.test(
  'Opens a labelled dialog and returns focus to the trigger on Escape',
  { parameters: { chromatic: { disableSnapshot: true } } },
  async ({ canvas, userEvent, step }) => {
    const trigger = canvas.getByRole('button', { name: 'Show event details' });

    await step('opens on press, named by its title', async () => {
      await userEvent.click(trigger);

      const dialog = await canvas.findByRole('dialog', {
        name: 'Summer Open Air',
      });
      await expect(dialog).toBeVisible();
      await expect(trigger).toHaveAttribute('aria-expanded', 'true');
    });

    await step('modal by default: the page is hidden from AT', async () => {
      await waitFor(() =>
        expect(trigger.closest('[aria-hidden="true"], [inert]')).not.toBeNull()
      );
    });

    await step('Escape closes it and focus goes back', async () => {
      await userEvent.keyboard('{Escape}');

      await waitFor(() => expect(canvas.queryByRole('dialog')).toBeNull());
      await expect(trigger).toHaveFocus();
    });
  }
);

// Visual regression: Chromatic snapshots a story before any click, so this
// test opens the panel and keeps its snapshot.
Basic.test(
  'Open panel',
  { parameters: { chromatic: { disableSnapshot: false } } },
  async ({ canvas, userEvent }) => {
    await userEvent.click(
      canvas.getByRole('button', { name: 'Show event details' })
    );
    await expect(
      await canvas.findByRole('dialog', { name: 'Summer Open Air' })
    ).toBeVisible();
  }
);

// `dismissable` and `keyboardDismissable` on `Popover.Trigger`. Turning both
// off needs another clear way out, here the close button.
export const Dismissal = meta.story({
  tags: ['component-test', '!autodocs'],
  parameters: { chromatic: { disableSnapshot: true } },
  render: args => (
    <Popover.Trigger dismissable={false} keyboardDismissable={false}>
      <Button>Show seat map legend</Button>
      <Popover {...args}>
        <Title>Seat map legend</Title>
        <Popover.Content>
          <Text>
            Dark seats are sold. Outlined seats are wheelchair spaces.
          </Text>
          <Button slot="close">Close</Button>
        </Popover.Content>
      </Popover>
    </Popover.Trigger>
  ),
});

Dismissal.test(
  'Stays open on outside press and Escape, closes from the close slot',
  async ({ canvas, userEvent, step }) => {
    const trigger = canvas.getByRole('button', {
      name: 'Show seat map legend',
    });
    await userEvent.click(trigger);
    const dialog = await canvas.findByRole('dialog', {
      name: 'Seat map legend',
    });

    await step('outside press keeps it open', async () => {
      await userEvent.click(document.body);
      await expect(dialog).toBeVisible();
    });

    await step('Escape keeps it open', async () => {
      await userEvent.keyboard('{Escape}');
      await expect(dialog).toBeVisible();
    });

    await step('the close slot closes it', async () => {
      await userEvent.click(canvas.getByRole('button', { name: 'Close' }));
      await waitFor(() => expect(canvas.queryByRole('dialog')).toBeNull());
      await expect(trigger).toHaveFocus();
    });
  }
);

export const Controlled = meta.story({
  tags: ['component-test', '!autodocs'],
  parameters: { chromatic: { disableSnapshot: true } },
  render: args => {
    const [open, setOpen] = useState(false);

    return (
      <Stack space="related" alignX="left">
        <Text>Open: {String(open)}</Text>
        <Button onPress={() => setOpen(true)}>Open from outside</Button>
        <Popover.Trigger open={open} onOpenChange={setOpen}>
          <Button>Show event details</Button>
          <Popover {...args} aria-label="Event details">
            <Popover.Content>
              <Text>Doors open at 17:00.</Text>
            </Popover.Content>
          </Popover>
        </Popover.Trigger>
      </Stack>
    );
  },
});

Controlled.test(
  'Opens from state and reports when it closes',
  async ({ canvas, userEvent }) => {
    await userEvent.click(
      canvas.getByRole('button', { name: 'Open from outside' })
    );
    await canvas.findByRole('dialog', { name: 'Event details' });

    await userEvent.keyboard('{Escape}');

    await waitFor(() => expect(canvas.getByText('Open: false')).toBeVisible());
    await expect(canvas.queryByRole('dialog')).toBeNull();
  }
);

// Modal (the default) and non-modal side by side. They look the same; the
// difference is what the rest of the page does while one is open. Open one,
// then try Tab, scroll the page, click the page, and press the counter: it
// sits on the trigger row, so it stays visible above the popovers, which open
// downwards. The non-modal panel holds no focusable controls, as the docs
// advise.
export const Modality = meta.story({
  tags: ['component-test', '!autodocs'],
  parameters: { chromatic: { disableSnapshot: true } },
  render: args => {
    const [presses, setPresses] = useState(0);

    return (
      <Stack space="regular">
        <Inline space="related" alignY="center">
          <Popover.Trigger>
            <Button>Open modal popover</Button>
            <Popover {...args} nonModal={false}>
              <Title>Modal popover</Title>
              <Popover.Content>
                <Text>
                  Focus stays in here, and the page behind is blocked.
                </Text>
                <Button slot="close">Close</Button>
              </Popover.Content>
            </Popover>
          </Popover.Trigger>
          <Popover.Trigger>
            <Button>Open non-modal popover</Button>
            <Popover {...args} nonModal>
              <Title>Non-modal popover</Title>
              <Popover.Content>
                <Text>
                  The page stays interactive. Try the counter, or click the page
                  to close this.
                </Text>
              </Popover.Content>
            </Popover>
          </Popover.Trigger>
          <Button onPress={() => setPresses(count => count + 1)}>
            Increase counter
          </Button>
          <Text>Pressed {presses} times</Text>
        </Inline>
        <Stack space="related">
          {Array.from({ length: 40 }, (_, i) => (
            <Text key={i}>Page content, line {i + 1}</Text>
          ))}
        </Stack>
      </Stack>
    );
  },
});

Modality.test(
  'Each mode blocks exactly what it promises',
  async ({ canvas, userEvent, step }) => {
    const counter = () =>
      canvas.getByRole('button', { name: 'Increase counter' });

    await step('modal: focus stays inside, the page is blocked', async () => {
      await userEvent.click(
        canvas.getByRole('button', { name: 'Open modal popover' })
      );
      const dialog = await canvas.findByRole('dialog', {
        name: 'Modal popover',
      });
      await waitFor(() =>
        expect(document.documentElement.style.overflow).toBe('hidden')
      );

      for (let i = 0; i < 3; i++) {
        await userEvent.tab();
        await expect(dialog).toContainElement(
          document.activeElement as HTMLElement
        );
      }

      await userEvent.click(counter());

      await waitFor(() => expect(canvas.queryByRole('dialog')).toBeNull());
      await expect(canvas.getByText('Pressed 0 times')).toBeVisible();
    });

    await step('non-modal: the page stays interactive', async () => {
      await userEvent.click(
        canvas.getByRole('button', { name: 'Open non-modal popover' })
      );
      await canvas.findByRole('dialog', { name: 'Non-modal popover' });
      await expect(document.documentElement.style.overflow).not.toBe('hidden');
      await expect(
        counter().closest('[aria-hidden="true"], [inert]')
      ).toBeNull();

      await userEvent.click(counter());

      await waitFor(() => expect(canvas.queryByRole('dialog')).toBeNull());
      await expect(canvas.getByText('Pressed 1 times')).toBeVisible();
    });

    await step('non-modal: a click on the page closes it', async () => {
      await userEvent.click(
        canvas.getByRole('button', { name: 'Open non-modal popover' })
      );
      await canvas.findByRole('dialog', { name: 'Non-modal popover' });

      // Plain text takes no focus, so only the outside press closes it.
      await userEvent.click(canvas.getByText('Page content, line 5'));

      await waitFor(() => expect(canvas.queryByRole('dialog')).toBeNull());
    });

    await step('non-modal: scrolling the page closes it', async () => {
      await userEvent.click(
        canvas.getByRole('button', { name: 'Open non-modal popover' })
      );
      await canvas.findByRole('dialog', { name: 'Non-modal popover' });

      window.scrollTo(0, 100);

      await waitFor(() => expect(canvas.queryByRole('dialog')).toBeNull());
      window.scrollTo(0, 0);
    });
  }
);

// Without `<Popover.Content>`, the children are laid out as the body: the
// popover pads them itself. Fits a short panel without a title,
// named by its `aria-label`, sized to its text with `fit`.
export const WithoutContent = meta.story({
  tags: ['component-test'],
  args: { size: 'fit' },
  render: args => (
    <Popover.Trigger>
      <Button>Show opening hours</Button>
      <Popover {...args} aria-label="Opening hours">
        <Text>Box office: Monday to Friday, 10:00 to 18:00</Text>
      </Popover>
    </Popover.Trigger>
  ),
});

WithoutContent.test(
  'Pads the children like content',
  { parameters: { chromatic: { disableSnapshot: true } } },
  async ({ canvas, userEvent }) => {
    await userEvent.click(
      canvas.getByRole('button', { name: 'Show opening hours' })
    );
    const dialog = await canvas.findByRole('dialog', {
      name: 'Opening hours',
    });

    await expect(getComputedStyle(dialog).paddingTop).toBe('12px');
    await expect(getComputedStyle(dialog).paddingLeft).toBe('16px');
  }
);

// Every size side by side. `fit` follows its content, so it gets two cases:
// a short text that keeps the panel narrower than `small`, and a long one
// that wraps at the `large` width.
const SIZES = [
  { id: 'small', label: 'small', size: 'small', short: false },
  { id: 'medium', label: 'medium', size: 'medium', short: false },
  { id: 'large', label: 'large', size: 'large', short: false },
  { id: 'fit-short', label: 'fit, short text', size: 'fit', short: true },
  { id: 'fit-long', label: 'fit, long text', size: 'fit', short: false },
] as const;

// The theme's widths: `w-3xs`, `w-xs` and `w-md`. `fit` caps at `w-md`.
const SIZE_WIDTHS = { small: 256, medium: 320, large: 448 };

// Distinct line tops of an element's text, so a test can tell wrapped text.
const lineCount = (el: Element) => {
  const range = document.createRange();
  range.selectNodeContents(el);
  const tops = [...range.getClientRects()].map(rect => Math.round(rect.top));

  return new Set(tops).size;
};

export const Sizes = meta.story({
  tags: ['component-test', '!autodocs'],
  render: args => (
    <Inline space="related">
      {SIZES.map(({ id, label, size, short }) => (
        <Popover.Trigger key={id}>
          <Button>Open {label}</Button>
          <Popover {...args} size={size}>
            <Title>Box office</Title>
            <Popover.Content>
              <Text>
                {short
                  ? 'Mon to Fri, 10:00 to 18:00'
                  : 'Open Monday to Friday from 10:00 to 18:00, and two hours before every show. Tickets reserved online can be collected here until the show starts.'}
              </Text>
            </Popover.Content>
          </Popover>
        </Popover.Trigger>
      ))}
    </Inline>
  ),
});

Sizes.test(
  'Each size sets the width, fit follows its content',
  { parameters: { chromatic: { disableSnapshot: true } } },
  async ({ canvas, userEvent, step }) => {
    const open = async (label: string) => {
      await userEvent.click(
        canvas.getByRole('button', { name: `Open ${label}` })
      );
      const dialog = await canvas.findByRole('dialog', { name: 'Box office' });
      const text = dialog.querySelector('[data-slot=content] > *')!;

      return { dialog, text, width: dialog.getBoundingClientRect().width };
    };
    const close = async () => {
      await userEvent.keyboard('{Escape}');
      await waitFor(() => expect(canvas.queryByRole('dialog')).toBeNull());
    };

    for (const size of ['small', 'medium', 'large'] as const) {
      await step(size, async () => {
        const { width } = await open(size);

        await expect(Math.round(width)).toBe(SIZE_WIDTHS[size]);
        await close();
      });
    }

    await step(
      'fit, short text: narrower than small, on one line',
      async () => {
        const { dialog, text, width } = await open('fit, short text');

        await expect(width).toBeLessThan(SIZE_WIDTHS.small);
        await expect(lineCount(text)).toBe(1);
        // The content keeps its padding around the text.
        await expect(width).toBeGreaterThanOrEqual(
          text.getBoundingClientRect().width + 2 * 16
        );
        await expect(dialog.scrollWidth).toBe(dialog.clientWidth);
        await close();
      }
    );

    await step('fit, long text: wraps at the large width', async () => {
      const { text, width } = await open('fit, long text');

      await expect(Math.round(width)).toBe(SIZE_WIDTHS.large);
      await expect(lineCount(text)).toBeGreaterThan(1);
      await close();
    });
  }
);

// Must-support case: the notifications panel. Rows carry real controls, so
// they are a `ListView`, not a `Menu` (DST-1489). Same row design as the
// ListView `NotificationsFeed` story: archive plus an overflow menu. The list
// reaches the edges on its own, and the link below it keeps its spacing.
const NOTIFICATIONS = [
  { id: 'sold-out', title: 'Summer Open Air sold out', time: '2 minutes ago' },
  { id: 'payout', title: 'Payout sent', time: '1 hour ago' },
];

const onArchive = fn();

export const Notifications = meta.story({
  tags: ['component-test'],
  args: { placement: 'bottom end', size: 'large' },
  render: args => (
    <Popover.Trigger>
      <Button size="icon" aria-label="Notifications">
        <Bell />
      </Button>
      <Popover {...args}>
        <Title>Notifications</Title>
        <Description>2 unread</Description>
        <Popover.Content>
          <ListView aria-label="Notifications" items={NOTIFICATIONS}>
            {(item: (typeof NOTIFICATIONS)[number]) => (
              <ListView.Item id={item.id} textValue={item.title}>
                <TextValue>{item.title}</TextValue>
                <Description>{item.time}</Description>
                <ButtonGroup
                  aria-label={`Actions for ${item.title}`}
                  size="icon"
                >
                  <Tooltip.Trigger>
                    <Button
                      aria-label={`Archive ${item.title}`}
                      onPress={() => onArchive(item.id)}
                    >
                      <Archive />
                    </Button>
                    <Tooltip>Archive</Tooltip>
                  </Tooltip.Trigger>
                  <ActionMenu aria-label={`More actions for ${item.title}`}>
                    <ActionMenu.Item>Mark as read</ActionMenu.Item>
                    <ActionMenu.Item>Mute thread</ActionMenu.Item>
                    <ActionMenu.Item>
                      Turn off these notifications
                    </ActionMenu.Item>
                  </ActionMenu>
                </ButtonGroup>
              </ListView.Item>
            )}
          </ListView>
          <LinkButton href="#notifications" variant="ghost">
            View all notifications
          </LinkButton>
        </Popover.Content>
      </Popover>
    </Popover.Trigger>
  ),
});

Notifications.test(
  'Reaches a control inside a row without closing',
  { parameters: { chromatic: { disableSnapshot: true } } },
  async ({ canvas, userEvent }) => {
    onArchive.mockClear();
    await userEvent.click(
      canvas.getByRole('button', { name: 'Notifications' })
    );
    const dialog = await canvas.findByRole('dialog', { name: 'Notifications' });

    await userEvent.click(
      await canvas.findByRole('button', {
        name: 'Archive Summer Open Air sold out',
      })
    );

    await expect(onArchive).toHaveBeenCalledWith('sold-out');
    await expect(dialog).toBeVisible();

    // No `Popover.Search` here, so the list keeps real focus (no virtual
    // focus without a field to drive it).
    const [first, second] = canvas.getAllByRole('row');
    first.focus();
    await userEvent.keyboard('{ArrowDown}');
    await expect(second).toHaveFocus();
  }
);

Notifications.test(
  'Lays the list out edge to edge, spaced from header and link',
  { parameters: { chromatic: { disableSnapshot: true } } },
  async ({ canvas, userEvent }) => {
    await userEvent.click(
      canvas.getByRole('button', { name: 'Notifications' })
    );
    const dialog = await canvas.findByRole('dialog', { name: 'Notifications' });
    const content = dialog.querySelector<HTMLElement>('[data-slot=content]')!;
    const list = canvas.getByRole('grid').getBoundingClientRect();
    const box = content.getBoundingClientRect();
    const link = canvas
      .getByRole('link', { name: 'View all notifications' })
      .getBoundingClientRect();

    // Rows span the popover, so their dividers do too, without `bleed`.
    await expect(Math.round(list.left)).toBe(Math.round(box.left));
    await expect(Math.round(list.right)).toBe(Math.round(box.right));
    // Under a plain header (no search row and its divider) the list keeps
    // the content's top padding.
    await expect(Math.round(list.top - box.top)).toBe(12);
    // The link below keeps the content's gap and bottom padding.
    await expect(Math.round(link.top - list.bottom)).toBe(12);
    await expect(Math.round(box.bottom - link.bottom)).toBe(12);
  }
);

// Visual regression: Chromatic snapshots a story before any click, so this
// test opens the panel and keeps its snapshot.
Notifications.test(
  'Open panel',
  { parameters: { chromatic: { disableSnapshot: false } } },
  async ({ canvas, userEvent }) => {
    await userEvent.click(
      canvas.getByRole('button', { name: 'Notifications' })
    );
    await expect(
      await canvas.findByRole('dialog', { name: 'Notifications' })
    ).toBeVisible();
  }
);

// Must-support case: a searchable list. Search earns its place in a popover
// when the user acts on the rows in place. Picking one person by typing is an
// `Autocomplete` or `ComboBox`. `Popover.Search` sits next to the content it
// filters and stays in view while the results scroll.
const MEMBERS = [
  { id: 'jane', name: 'Jane Doe', email: 'jane.doe@example.com' },
  { id: 'john', name: 'John Smith', email: 'john.smith@example.com' },
  { id: 'priya', name: 'Priya Natarajan', email: 'priya.n@example.com' },
  { id: 'lukas', name: 'Lukas Weber', email: 'lukas.weber@example.com' },
  { id: 'mara', name: 'Mara Jensen', email: 'mara.jensen@example.com' },
];

type Member = (typeof MEMBERS)[number];

const onRemove = fn();
const onRoleChange = fn();

const TeamList = () => {
  const confirm = useConfirmation();

  // Removing someone can only be undone by inviting them again, so ask first.
  const remove = async (member: Member) => {
    const result = await confirm({
      variant: 'destructive',
      title: `Remove ${member.name}?`,
      content: `${member.name} loses access to this event. You can invite them again later.`,
      confirmationLabel: 'Remove member',
    });
    if (result === 'confirmed') onRemove(member.id);
  };

  return (
    <ListView
      aria-label="Team members"
      items={MEMBERS}
      emptyState={
        <EmptyState
          title="No team members found"
          description="Check the spelling or search for an email address."
        />
      }
    >
      {(member: Member) => (
        <ListView.Item id={member.id} textValue={member.name}>
          <TextValue>{member.name}</TextValue>
          <Description>{member.email}</Description>
          <ButtonGroup aria-label={`Actions for ${member.name}`} size="icon">
            <ActionMenu aria-label={`Change role of ${member.name}`}>
              <ActionMenu.Item
                onAction={() => onRoleChange(member.id, 'admin')}
              >
                Make admin
              </ActionMenu.Item>
              <ActionMenu.Item
                onAction={() => onRoleChange(member.id, 'editor')}
              >
                Make editor
              </ActionMenu.Item>
              <ActionMenu.Item
                onAction={() => onRoleChange(member.id, 'viewer')}
              >
                Make viewer
              </ActionMenu.Item>
            </ActionMenu>
            <Tooltip.Trigger>
              <Button
                variant="destructive-ghost"
                aria-label={`Remove ${member.name}`}
                onPress={() => remove(member)}
              >
                <UserMinus />
              </Button>
              <Tooltip>Remove</Tooltip>
            </Tooltip.Trigger>
          </ButtonGroup>
        </ListView.Item>
      )}
    </ListView>
  );
};

// `showTitle` is a story control, not a `Popover` prop: with a `<Title>` the
// search sits between two dividers, without one it is the popover's header
// and the popover is named by its `aria-label`.
type SearchableListArgs = PopoverProps & { showTitle?: boolean };

export const SearchableList = meta.story({
  tags: ['component-test'],
  // Storybook infers a boolean control for `showTitle` from its value.
  args: { size: 'large', showTitle: true } as SearchableListArgs,
  render: ({ showTitle, ...args }: SearchableListArgs) => (
    <Popover.Trigger>
      <Button>
        <Users /> Manage team
      </Button>
      <Popover {...args} aria-label={showTitle ? undefined : 'Team members'}>
        {showTitle ? <Title>Team members</Title> : null}
        <Popover.Search
          aria-label="Search team members"
          placeholder="Search team members"
        />
        <Popover.Content>
          <TeamList />
        </Popover.Content>
      </Popover>
    </Popover.Trigger>
  ),
});

SearchableList.test(
  'Filters the list and acts on a result in place',
  { parameters: { chromatic: { disableSnapshot: true } } },
  async ({ canvas, userEvent, step }) => {
    onRemove.mockClear();
    await userEvent.click(canvas.getByRole('button', { name: 'Manage team' }));
    const dialog = await canvas.findByRole('dialog', { name: 'Team members' });
    const search = await canvas.findByRole('searchbox', {
      name: 'Search team members',
    });

    await step('the search is a row of its own, focused on open', async () => {
      await waitFor(() => expect(search).toHaveFocus());
      await expect(search.closest('[data-slot=content]')).toBeNull();
    });

    await step('the list sits flush between search and edge', async () => {
      const row = search
        .closest<HTMLElement>('[data-slot=search]')!
        .getBoundingClientRect();
      const list = canvas.getByRole('grid').getBoundingClientRect();
      const panel = dialog.getBoundingClientRect();

      await expect(Math.round(list.top)).toBe(Math.round(row.bottom));
      await expect(Math.round(list.bottom)).toBe(Math.round(panel.bottom));
      await expect(Math.round(list.left)).toBe(Math.round(panel.left));
    });

    await step('typing filters the rows', async () => {
      await userEvent.keyboard('pri');

      await waitFor(() =>
        expect(
          canvas
            .getAllByRole('row')
            .map(row => row.querySelector('[slot=label]')?.textContent)
        ).toEqual(['Priya Natarajan'])
      );
    });

    await step('Tab moves into the results', async () => {
      // A `ListView` keeps real focus (its rows hold their own controls).
      await userEvent.tab();
      await expect(canvas.getByRole('row')).toHaveFocus();
    });

    await step(
      'a destructive row action asks first and the popover stays open',
      async () => {
        await userEvent.click(
          canvas.getByRole('button', { name: 'Remove Priya Natarajan' })
        );
        // The confirmation portals to the document body, outside the canvas.
        const confirmation = await screen.findByRole('alertdialog', {
          name: 'Remove Priya Natarajan?',
        });
        await expect(onRemove).not.toHaveBeenCalled();

        await userEvent.click(
          within(confirmation).getByRole('button', { name: 'Remove member' })
        );

        // The confirmation settles once it has closed and returned focus.
        await waitFor(() => expect(onRemove).toHaveBeenCalledWith('priya'));
        await expect(dialog).toBeVisible();
      }
    );
  }
);

SearchableList.test(
  'Shows an empty state when nothing matches',
  { parameters: { chromatic: { disableSnapshot: true } } },
  async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: 'Manage team' }));
    const search = await canvas.findByRole('searchbox', {
      name: 'Search team members',
    });
    await waitFor(() => expect(search).toHaveFocus());

    await userEvent.keyboard('zzz');

    await expect(
      await canvas.findByText('No team members found')
    ).toBeVisible();
  }
);

SearchableList.test(
  'Without a title, puts the search row at the top with only the divider below',
  {
    parameters: { chromatic: { disableSnapshot: true } },
    args: { showTitle: false } as SearchableListArgs,
  },
  async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: 'Manage team' }));
    const dialog = await canvas.findByRole('dialog', { name: 'Team members' });
    const row = dialog.querySelector<HTMLElement>('[data-slot=search]')!;

    await expect(dialog.firstElementChild).toBe(row);
    await expect(getComputedStyle(row).borderTopWidth).toBe('0px');
    await expect(getComputedStyle(row).borderBottomWidth).toBe('1px');
  }
);

// Visual regression: Chromatic snapshots a story before any click, so this
// test opens the panel and keeps its snapshot.
SearchableList.test(
  'Open panel',
  { parameters: { chromatic: { disableSnapshot: false } } },
  async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: 'Manage team' }));
    await expect(
      await canvas.findByRole('dialog', { name: 'Team members' })
    ).toBeVisible();
  }
);

SearchableList.test(
  'Open panel without title',
  {
    parameters: { chromatic: { disableSnapshot: false } },
    args: { showTitle: false } as SearchableListArgs,
  },
  async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: 'Manage team' }));
    await expect(
      await canvas.findByRole('dialog', { name: 'Team members' })
    ).toBeVisible();
  }
);

// The search filters the popover's own list, never the items of a menu
// opened from inside it (`AutocompleteBoundary` at every overlay's edge, so
// the options of a `Select` are covered the same way).
SearchableList.test(
  'Keeps the items of a row menu unfiltered',
  { parameters: { chromatic: { disableSnapshot: true } } },
  async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: 'Manage team' }));
    const search = await canvas.findByRole('searchbox', {
      name: 'Search team members',
    });
    await waitFor(() => expect(search).toHaveFocus());
    await userEvent.keyboard('jane');
    await waitFor(() => expect(canvas.getAllByRole('row')).toHaveLength(1));

    await userEvent.click(
      canvas.getByRole('button', { name: 'Change role of Jane Doe' })
    );
    await canvas.findByRole('menu');

    await expect(
      canvas.getAllByRole('menuitem').map(item => item.textContent)
    ).toEqual(['Make admin', 'Make editor', 'Make viewer']);
  }
);

// A controlled search is the only source of truth: this one keeps at most
// three characters, so the field and the filter never see a fourth.
export const ControlledSearch = meta.story({
  tags: ['component-test', '!autodocs'],
  parameters: { chromatic: { disableSnapshot: true } },
  render: args => {
    const [query, setQuery] = useState('');

    return (
      <Stack space="related" alignX="left">
        <Text>Query: {query}</Text>
        <Popover.Trigger>
          <Button>
            <Users /> Manage team
          </Button>
          <Popover {...args} size="large" aria-label="Team members">
            <Popover.Search
              aria-label="Search team members"
              inputValue={query}
              onInputChange={value => setQuery(value.slice(0, 3))}
            />
            <Popover.Content>
              <TeamList />
            </Popover.Content>
          </Popover>
        </Popover.Trigger>
      </Stack>
    );
  },
});

ControlledSearch.test(
  'Shows and filters by the value the consumer keeps',
  async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: 'Manage team' }));
    const search = await canvas.findByRole('searchbox', {
      name: 'Search team members',
    });
    await waitFor(() => expect(search).toHaveFocus());

    await userEvent.keyboard('priya');

    await expect(search).toHaveValue('pri');
    await expect(canvas.getByText('Query: pri')).toBeVisible();
    await waitFor(() => expect(canvas.getAllByRole('row')).toHaveLength(1));
  }
);

// Must-support case: a short form. One optional field that is cheap to lose
// when the popover is dismissed: an empty note just removes the note. Inside
// a `<Form>` so Enter submits, with the primary action first.
const onSaveNote = fn();

export const MiniForm = meta.story({
  tags: ['component-test'],
  render: args => {
    const [open, setOpen] = useState(false);

    return (
      <Popover.Trigger open={open} onOpenChange={setOpen}>
        <Button>
          <StickyNote /> Add note
        </Button>
        <Popover {...args}>
          <Title>Order note</Title>
          <Description>Only your team sees this note.</Description>
          <Popover.Content>
            <Form
              onSubmit={event => {
                event.preventDefault();
                onSaveNote(new FormData(event.currentTarget).get('note'));
                setOpen(false);
              }}
            >
              <Stack space="regular" alignX="left">
                <TextArea label="Note" name="note" rows={3} />
                <Inline space="related">
                  <Button type="submit" variant="primary">
                    Save note
                  </Button>
                  <Button slot="close">Cancel</Button>
                </Inline>
              </Stack>
            </Form>
          </Popover.Content>
        </Popover>
      </Popover.Trigger>
    );
  },
});

MiniForm.test(
  'Saves on submit and closes',
  { parameters: { chromatic: { disableSnapshot: true } } },
  async ({ canvas, userEvent }) => {
    onSaveNote.mockClear();
    await userEvent.click(canvas.getByRole('button', { name: 'Add note' }));
    await userEvent.type(
      await canvas.findByRole('textbox', { name: 'Note' }),
      'Guest list is at the side entrance.'
    );
    await userEvent.click(canvas.getByRole('button', { name: 'Save note' }));

    await expect(onSaveNote).toHaveBeenCalledWith(
      'Guest list is at the side entrance.'
    );
    await waitFor(() => expect(canvas.queryByRole('dialog')).toBeNull());
  }
);

MiniForm.test(
  'Cancel closes without saving',
  { parameters: { chromatic: { disableSnapshot: true } } },
  async ({ canvas, userEvent }) => {
    onSaveNote.mockClear();
    await userEvent.click(canvas.getByRole('button', { name: 'Add note' }));
    await userEvent.click(
      await canvas.findByRole('button', { name: 'Cancel' })
    );

    await waitFor(() => expect(canvas.queryByRole('dialog')).toBeNull());
    await expect(onSaveNote).not.toHaveBeenCalled();
  }
);

// Visual regression: Chromatic snapshots a story before any click, so this
// test opens the panel and keeps its snapshot.
MiniForm.test(
  'Open panel',
  { parameters: { chromatic: { disableSnapshot: false } } },
  async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: 'Add note' }));
    await expect(
      await canvas.findByRole('dialog', { name: 'Order note' })
    ).toBeVisible();
  }
);

export const SmallScreen = meta.story({
  tags: ['component-test'],
  globals: {
    viewport: { value: 'smallScreen' },
  },
  args: Notifications.input.args,
  render: Notifications.input.render,
});

SmallScreen.test(
  'Renders a tray with the title above the content',
  // Keep the snapshot: the open tray is the small-screen visual state.
  { parameters: { chromatic: { disableSnapshot: false } } },
  async ({ canvas, userEvent }) => {
    await userEvent.click(
      canvas.getByRole('button', { name: 'Notifications' })
    );

    const tray = await canvas.findByRole('dialog', { name: 'Notifications' });
    await waitFor(() => expect(tray).toBeVisible());

    const content = tray.querySelector<HTMLElement>('[data-slot=content]')!;
    const title = canvas.getByRole('heading', { name: 'Notifications' });
    await expect(content).not.toContainElement(title);
    await expect(canvas.getByRole('button', { name: 'Close' })).toBeVisible();
  }
);

export const SmallScreenSearch = meta.story({
  tags: ['component-test', '!autodocs'],
  parameters: { chromatic: { disableSnapshot: true } },
  globals: {
    viewport: { value: 'smallScreen' },
  },
  args: { size: 'large', showTitle: true } as SearchableListArgs,
  render: SearchableList.input.render,
});

SmallScreenSearch.test(
  'Keeps the tray height while the search narrows the list',
  async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: 'Manage team' }));
    const tray = await canvas.findByRole('dialog', { name: 'Team members' });
    // The list renders in a second pass, wait for its rows.
    await waitFor(() => expect(canvas.getAllByRole('row')).toHaveLength(5));
    const before = tray.getBoundingClientRect().height;

    await userEvent.keyboard('mara');

    await waitFor(() => expect(canvas.getAllByRole('row')).toHaveLength(1));
    await expect(Math.round(tray.getBoundingClientRect().height)).toBe(
      Math.round(before)
    );
  }
);
