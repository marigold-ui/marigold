import { expect } from 'storybook/test';
import preview from '.storybook/preview';
import { Badge, Button, Stack, Text } from '@marigold/components';
import { Copy, Pencil, Trash2 } from '@marigold/icons';
import { ActionButton } from '../ActionButton/ActionButton';
import { ActionGroup } from '../ActionGroup/ActionGroup';
import { Description } from '../Description/Description';
import { ActionMenu } from '../Menu/ActionMenu';
import { Title } from '../Title/Title';
import { Card } from './Card';

const meta = preview.meta({
  title: 'Components/Card',
  component: Card,
  parameters: {
    surface: false,
  },
  args: {
    variant: 'default',
    headingLevel: 3,
    space: 'regular',
  },
  argTypes: {
    children: {
      table: { disable: true },
    },
    variant: {
      control: { type: 'radio' },
      description: 'The variant of the card',
      options: ['default', 'master', 'admin'],
    },
    headingLevel: {
      control: { type: 'radio' },
      options: [2, 3, 4, 5, 6],
      description:
        'Base heading level for the card. Only changes the underlying heading tag (`h2`–`h6`) for document outline and accessibility — the visual appearance stays the same.',
      table: { defaultValue: { summary: '3' } },
    },
    stretch: {
      control: { type: 'boolean' },
      description: 'Whether the card stretches to fill its container.',
    },
  },
});

export const Basic = meta.story({
  args: { children: null as never },
  tags: ['component-test'],
  render: args => (
    <Card {...args}>
      <Card.Header>
        <Title>Professor Severus Snape</Title>
        <Description>Potions Master, Head of Slytherin House.</Description>
      </Card.Header>
      <Card.Body>
        <Text>
          <strong>Professor Severus Snape</strong> (9 January, 1960 - 2 May,
          1998) was an English half-blood wizard serving as Potions Master
          (1981-1996), Head of Slytherin House (1981-1997), Defence Against the
          Dark Arts professor (1996-1997), and Headmaster (1997-1998) of the
          Hogwarts School of Witchcraft and Wizardry as well as a member of the
          Order of the Phoenix and a Death Eater.
        </Text>
      </Card.Body>
    </Card>
  ),
});

Basic.test('renders an article labelled by the Title', async ({ canvas }) => {
  const title = canvas.getByRole('heading', {
    name: 'Professor Severus Snape',
  });
  const article = canvas.getByRole('article', {
    name: 'Professor Severus Snape',
  });

  expect(title.tagName).toBe('H3');
  expect(article.tagName).toBe('ARTICLE');
  expect(article.getAttribute('aria-labelledby')).toBe(title.id);
});

export const WithHeaderActions = meta.story({
  args: { children: null as never },
  tags: ['component-test'],
  render: args => (
    <Card {...args}>
      <Card.Header>
        <Title>Sommernachts-Konzert 2026</Title>
        <Description>
          Elbphilharmonie Hamburg · Saturday, June 14, 2026
        </Description>
        <ActionMenu aria-label="Event actions">
          <ActionMenu.Item id="duplicate">
            <Copy />
            Duplicate event
          </ActionMenu.Item>
          <ActionMenu.Item id="edit">
            <Pencil />
            Edit
          </ActionMenu.Item>
          <ActionMenu.Item id="cancel" variant="destructive">
            <Trash2 />
            Cancel event
          </ActionMenu.Item>
        </ActionMenu>
      </Card.Header>
      <Card.Body>
        <Text>1,847 / 2,100 tickets sold</Text>
      </Card.Body>
    </Card>
  ),
});

WithHeaderActions.test(
  'places the ActionMenu trigger in the actions grid area',
  async ({ canvas }) => {
    const trigger = canvas.getByRole('button', { name: 'Event actions' });
    expect(trigger).toHaveAttribute('data-grid-area', 'actions');
  }
);

export const WithActionGroup = meta.story({
  args: { children: null as never },
  tags: ['component-test'],
  render: args => (
    <Card {...args}>
      <Card.Header>
        <Title>Team Workspace</Title>
        <Description>Shared with three editors.</Description>
        <ActionGroup aria-label="Workspace actions">
          <ActionButton aria-label="Edit">
            <Pencil />
          </ActionButton>
          <ActionButton aria-label="Duplicate">
            <Copy />
          </ActionButton>
        </ActionGroup>
      </Card.Header>
      <Card.Body>
        <Text>Three editors collaborating on this workspace.</Text>
      </Card.Body>
    </Card>
  ),
});

WithActionGroup.test(
  'renders the ActionGroup toolbar inside the actions grid cell',
  async ({ canvas }) => {
    const toolbar = canvas.getByRole('toolbar', {
      name: 'Workspace actions',
    });
    expect(toolbar).toHaveAttribute('data-grid-area', 'actions');
  }
);

export const HeadingLevels = meta.story({
  args: { children: null as never, headingLevel: 4 },
  tags: ['component-test'],
  render: args => (
    <Card {...args}>
      <Card.Header>
        <Title>Heading at level 4</Title>
      </Card.Header>
      <Card.Body>
        <Text>The Title renders as an h4 in the document outline.</Text>
      </Card.Body>
    </Card>
  ),
});

HeadingLevels.test(
  'renders the Title at the configured heading level',
  async ({ canvas }) => {
    const title = canvas.getByRole('heading', { name: 'Heading at level 4' });
    expect(title.tagName).toBe('H4');
  }
);

export const AriaLabeled = meta.story({
  args: { children: null as never },
  tags: ['component-test'],
  render: args => (
    <Card {...args} aria-label="Quick stats card">
      <Card.Body>
        <Text>
          A Card can be labelled with <code>aria-label</code> when there is no
          visible Title.
        </Text>
      </Card.Body>
    </Card>
  ),
});

AriaLabeled.test(
  'uses aria-label as the accessible name and omits aria-labelledby',
  async ({ canvas }) => {
    const article = canvas.getByRole('article', { name: 'Quick stats card' });
    expect(article).toHaveAttribute('aria-label', 'Quick stats card');
    expect(article).not.toHaveAttribute('aria-labelledby');
  }
);

export const WithFooter = meta.story({
  args: { children: null as never },
  tags: ['component-test'],
  render: args => (
    <Card {...args}>
      <Card.Header>
        <Title>Event Registration</Title>
      </Card.Header>
      <Card.Body>
        <Text>
          Register for the upcoming Hogwarts Alumni Reunion. The event will take
          place on the grounds of Hogwarts School of Witchcraft and Wizardry.
          Space is limited.
        </Text>
      </Card.Body>
      <Card.Footer>
        <Button variant="secondary">Cancel</Button>
        <Button variant="primary">Register</Button>
      </Card.Footer>
    </Card>
  ),
});

export const FooterActions = meta.story({
  args: { children: null as never },
  tags: ['component-test'],
  render: args => (
    <Card {...args}>
      <Card.Header>
        <Title>Subscription</Title>
      </Card.Header>
      <Card.Body>
        <Text>Manage the plan attached to this workspace.</Text>
      </Card.Body>
      <Card.Footer>
        <ActionButton>Manage</ActionButton>
      </Card.Footer>
    </Card>
  ),
});

FooterActions.test(
  'cascades size="small" to ActionButtons inside Card.Footer',
  async ({ canvas }) => {
    const action = canvas.getByRole('button', { name: 'Manage' });
    expect(action).toHaveAttribute('data-card-footer-action');
  }
);

export const WithMedia = meta.story({
  args: { children: null as never },
  render: args => (
    <Card {...args}>
      <Card.Media>
        <img
          src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&h=200&fit=crop"
          alt="Landscape"
          className="block h-48 w-full object-cover"
        />
      </Card.Media>
      <Card.Header>
        <Title>Mountain Landscape</Title>
        <Description>
          Captured during a hiking trip in the Swiss Alps.
        </Description>
      </Card.Header>
      <Card.Body>
        <Text>A breathtaking view of the mountains at sunrise.</Text>
      </Card.Body>
    </Card>
  ),
});

export const Stretch = meta.story({
  args: {
    children: null as never,
    stretch: true,
  },
  render: args => (
    <Card {...args}>
      <Card.Header>
        <Title>Full Width Card</Title>
      </Card.Header>
      <Card.Body>
        <Text>
          This card stretches to fill the available horizontal space in its
          parent container.
        </Text>
      </Card.Body>
    </Card>
  ),
});

export const WithPaddingProp = meta.story({
  args: {
    children: null as never,
    p: 'square-loose',
  },
  argTypes: {
    p: {
      control: { type: 'select' },
      options: [
        'square-tight',
        'square-snug',
        'square-regular',
        'square-relaxed',
        'square-loose',
      ],
      description:
        'Inset recipe applied uniformly. Resolves --card-px and --card-py.',
    },
  },
  render: args => (
    <Card {...args}>
      <Card.Header>
        <Title>Custom Padding</Title>
      </Card.Header>
      <Card.Body>
        <Text>
          This card uses the `p` prop to set inset padding. Use Storybook
          controls to try different values.
        </Text>
      </Card.Body>
    </Card>
  ),
});

export const WithBleedBody = meta.story({
  args: { children: null as never },
  render: args => (
    <Card {...args}>
      <Card.Header>
        <Title>Bleed Body</Title>
      </Card.Header>
      <Card.Body bleed>
        <div className="bg-info/10 border-info-accent border-y px-4 py-3">
          Edge-to-edge banner — spans the full card width.
        </div>
      </Card.Body>
      <Card.Footer>
        <Button variant="primary">Action</Button>
      </Card.Footer>
    </Card>
  ),
});

export const WithBleedFooter = meta.story({
  args: { children: null as never },
  render: args => (
    <Card {...args}>
      <Card.Header>
        <Title>Bleed Footer</Title>
      </Card.Header>
      <Card.Body>
        <Text>The footer below uses `bleed` to span the full card width.</Text>
      </Card.Body>
      <Card.Footer bleed>
        <div className="flex w-full justify-center border-t py-3">
          <Button variant="primary">Full-width action</Button>
        </div>
      </Card.Footer>
    </Card>
  ),
});

/**
 * Anti-pattern: rendering bare children inside `<Card>` is unsupported.
 * Content will have no horizontal padding. Wrap content in `Card.Body` instead.
 */
export const BareChildrenAntiPattern = meta.story({
  args: { children: null as never },
  render: args => (
    <Stack space={4}>
      <Card {...args} aria-label="Bare children anti-pattern">
        <Text>
          <strong>Don&apos;t do this:</strong> bare text inside `&lt;Card&gt;`
          has no horizontal padding.
        </Text>
      </Card>
      <Card {...args} aria-label="Wrapped in Card.Body">
        <Card.Body>
          <Text>
            <strong>Do this:</strong> wrap content in `Card.Body` to get proper
            padding.
          </Text>
        </Card.Body>
      </Card>
    </Stack>
  ),
});

export const MasterAndAdmin = meta.story({
  args: { children: null as never },
  render: args => (
    <Stack space={5}>
      <Card {...args} variant="master">
        <Card.Header>
          <Title>Master Access</Title>
          <Badge variant="master">Master</Badge>
        </Card.Header>
        <Card.Body>
          <Text>
            This card uses the master variant to indicate master-level access
            permissions. The border and background color change to reflect the
            access level.
          </Text>
        </Card.Body>
      </Card>
      <Card {...args} variant="admin">
        <Card.Header>
          <Title>Admin Access</Title>
          <Badge variant="admin">Admin</Badge>
        </Card.Header>
        <Card.Body>
          <Text>
            This card uses the admin variant to indicate admin-level access
            permissions. The border and background color change to reflect the
            access level.
          </Text>
        </Card.Body>
      </Card>
    </Stack>
  ),
});

export const TitleOnlyWithoutHeader = meta.story({
  args: { children: null as never },
  tags: ['component-test'],
  render: args => (
    <Card {...args}>
      <Title>Quick Settings</Title>
      <Card.Body>
        <Text>A Title used directly inside Card without a Card.Header.</Text>
      </Card.Body>
    </Card>
  ),
});

TitleOnlyWithoutHeader.test(
  'labels the article when Title is used without Card.Header',
  async ({ canvas }) => {
    const title = canvas.getByRole('heading', { name: 'Quick Settings' });
    const article = canvas.getByRole('article', { name: 'Quick Settings' });

    expect(title.tagName).toBe('H3');
    expect(article).toHaveAttribute('aria-labelledby', title.id);
    expect(title.closest('[data-card-header]')).toBeNull();
  }
);
