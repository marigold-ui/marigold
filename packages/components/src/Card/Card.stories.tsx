import { expect } from 'storybook/test';
import preview from '.storybook/preview';
import { Badge, Button, Stack, Text } from '@marigold/components';
import { Description } from '../Description/Description';
import { Title } from '../Title/Title';
import { Card } from './Card';

const meta = preview.meta({
  title: 'Components/Card',
  component: Card,
  parameters: {
    surface: false,
  },
  args: {
    // `children` is composed via `render` on each story; this satisfies the
    // required prop without surfacing a control (see `argTypes` below).
    children: null as never,
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
  tags: ['component-test'],
  render: args => (
    <Card {...args}>
      <Card.Header>
        <Title>Professor Severus Snape</Title>
        <Description>Potions Master, Head of Slytherin House.</Description>
      </Card.Header>
      <Card.Content>
        <Text>
          <strong>Professor Severus Snape</strong> (9 January, 1960 - 2 May,
          1998) was an English half-blood wizard serving as Potions Master
          (1981-1996), Head of Slytherin House (1981-1997), Defence Against the
          Dark Arts professor (1996-1997), and Headmaster (1997-1998) of the
          Hogwarts School of Witchcraft and Wizardry as well as a member of the
          Order of the Phoenix and a Death Eater.
        </Text>
      </Card.Content>
    </Card>
  ),
});

Basic.test(
  'renders an article labelled by the Title',
  { parameters: { chromatic: { disableSnapshot: true } } },
  async ({ canvas }) => {
    const title = canvas.getByRole('heading', {
      name: 'Professor Severus Snape',
    });
    const article = canvas.getByRole('article', {
      name: 'Professor Severus Snape',
    });

    expect(title.tagName).toBe('H3');
    expect(article.tagName).toBe('ARTICLE');
    expect(article.getAttribute('aria-labelledby')).toBe(title.id);
  }
);

Basic.test(
  'uses aria-label as the accessible name and omits aria-labelledby',
  {
    parameters: { chromatic: { disableSnapshot: true } },
    render: args => (
      <Card {...args} aria-label="Quick stats card">
        <Card.Content>
          <Text>
            A Card can be labelled with <code>aria-label</code> when there is no
            visible Title.
          </Text>
        </Card.Content>
      </Card>
    ),
  },
  async ({ canvas }) => {
    const article = canvas.getByRole('article', { name: 'Quick stats card' });

    expect(article).toHaveAttribute('aria-label', 'Quick stats card');
    expect(article).not.toHaveAttribute('aria-labelledby');
  }
);

export const WithFooter = meta.story({
  render: args => (
    <Card {...args}>
      <Card.Header>
        <Title>Event Registration</Title>
      </Card.Header>
      <Card.Content>
        <Text>
          Register for the upcoming Hogwarts Alumni Reunion. The event will take
          place on the grounds of Hogwarts School of Witchcraft and Wizardry.
          Space is limited.
        </Text>
      </Card.Content>
      <Card.Footer>
        <Button variant="secondary">Cancel</Button>
        <Button variant="primary">Register</Button>
      </Card.Footer>
    </Card>
  ),
});

export const WithMedia = meta.story({
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
      <Card.Content>
        <Text>A breathtaking view of the mountains at sunrise.</Text>
      </Card.Content>
    </Card>
  ),
});

export const WithPaddingProp = meta.story({
  args: {
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
      <Card.Content>
        <Text>
          This card uses the `p` prop to set inset padding. Use Storybook
          controls to try different values.
        </Text>
      </Card.Content>
    </Card>
  ),
});

export const WithNumericPadding = meta.story({
  tags: ['component-test'],
  args: { p: 4 },
  render: args => (
    <Card {...args}>
      <Card.Header>
        <Title>Numeric Padding</Title>
      </Card.Header>
      <Card.Content>
        <Text>
          This card uses a numeric scale value (<code>p=&#123;4&#125;</code>)
          for inset padding. Both axes should have equal spacing.
        </Text>
      </Card.Content>
    </Card>
  ),
});

WithNumericPadding.test(
  'applies equal horizontal and vertical padding from a numeric scale value',
  { parameters: { chromatic: { disableSnapshot: true } } },
  async ({ canvas }) => {
    const article = canvas.getByRole('article');
    const style = getComputedStyle(article);
    expect(style.getPropertyValue('--card-px')).toBeTruthy();
    expect(style.getPropertyValue('--card-py')).toBeTruthy();
    expect(style.getPropertyValue('--card-px')).toBe(
      style.getPropertyValue('--card-py')
    );
  }
);

export const WithBleedContent = meta.story({
  render: args => (
    <Card {...args}>
      <Card.Header>
        <Title>Bleed Content</Title>
      </Card.Header>
      <Card.Content bleed>
        <div className="bg-info/10 border-info-accent border-y px-4 py-3">
          Edge-to-edge banner — spans the full card width.
        </div>
      </Card.Content>
      <Card.Footer>
        <Button variant="primary">Action</Button>
      </Card.Footer>
    </Card>
  ),
});

export const WithBleedFooter = meta.story({
  render: args => (
    <Card {...args}>
      <Card.Header>
        <Title>Bleed Footer</Title>
      </Card.Header>
      <Card.Content>
        <Text>The footer below uses `bleed` to span the full card width.</Text>
      </Card.Content>
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
 * Content will have no horizontal padding. Wrap content in `Card.Content` instead.
 */
export const BareChildrenAntiPattern = meta.story({
  parameters: { chromatic: { disableSnapshot: true } },
  render: args => (
    <Stack space={4}>
      <Card {...args} aria-label="Bare children anti-pattern">
        <Text>
          <strong>Don&apos;t do this:</strong> bare text inside `&lt;Card&gt;`
          has no horizontal padding.
        </Text>
      </Card>
      <Card {...args} aria-label="Wrapped in Card.Content">
        <Card.Content>
          <Text>
            <strong>Do this:</strong> wrap content in `Card.Content` to get
            proper padding.
          </Text>
        </Card.Content>
      </Card>
    </Stack>
  ),
});

export const MasterAndAdmin = meta.story({
  render: args => (
    <Stack space={5}>
      <Card {...args} variant="master">
        <Card.Header>
          <Title>Master Access</Title>
          <Badge variant="master">Master</Badge>
        </Card.Header>
        <Card.Content>
          <Text>
            This card uses the master variant to indicate master-level access
            permissions. The border and background color change to reflect the
            access level.
          </Text>
        </Card.Content>
      </Card>
      <Card {...args} variant="admin">
        <Card.Header>
          <Title>Admin Access</Title>
          <Badge variant="admin">Admin</Badge>
        </Card.Header>
        <Card.Content>
          <Text>
            This card uses the admin variant to indicate admin-level access
            permissions. The border and background color change to reflect the
            access level.
          </Text>
        </Card.Content>
      </Card>
    </Stack>
  ),
});

export const TitleOnlyWithoutHeader = meta.story({
  tags: ['component-test'],
  render: args => (
    <Card {...args}>
      <Title>Quick Settings</Title>
      <Card.Content>
        <Text>A Title used directly inside Card without a Card.Header.</Text>
      </Card.Content>
    </Card>
  ),
});

TitleOnlyWithoutHeader.test(
  'labels the article when Title is used without Card.Header',
  { parameters: { chromatic: { disableSnapshot: true } } },
  async ({ canvas }) => {
    const title = canvas.getByRole('heading', { name: 'Quick Settings' });
    const article = canvas.getByRole('article', { name: 'Quick Settings' });

    expect(title.tagName).toBe('H3');
    expect(article).toHaveAttribute('aria-labelledby', title.id);
    expect(title.closest('[data-card-header]')).toBeNull();
  }
);
