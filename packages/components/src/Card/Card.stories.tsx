import preview from '.storybook/preview';
import { Badge, Button, Stack, Text } from '@marigold/components';
import { Card } from './Card';

const meta = preview.meta({
  title: 'Components/Card',
  component: Card,
  parameters: {
    surface: false,
  },
  argTypes: {
    variant: {
      control: {
        type: 'radio',
      },
      description: 'The variant of the card',
      options: ['default', 'master', 'admin'],
    },
    stretch: {
      control: {
        type: 'boolean',
      },
      description: 'Whether the card stretches to fill its container.',
    },
  },
});

export const Basic = meta.story({
  render: args => (
    <Card {...args}>
      <Card.Header>Professor Severus Snape</Card.Header>
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

export const WithFooter = meta.story({
  render: args => (
    <Card {...args}>
      <Card.Header>Event Registration</Card.Header>
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

export const WithPreview = meta.story({
  render: args => (
    <Card {...args}>
      <Card.Preview>
        <img
          src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&h=200&fit=crop"
          alt="Landscape"
          className="block h-48 w-full object-cover"
        />
      </Card.Preview>
      <Card.Header>Mountain Landscape</Card.Header>
      <Card.Body>
        <Text>
          A breathtaking view of the mountains at sunrise, captured during a
          hiking trip in the Swiss Alps.
        </Text>
      </Card.Body>
    </Card>
  ),
});

export const Stretch = meta.story({
  args: {
    stretch: true,
  },
  render: args => (
    <Card {...args}>
      <Card.Header>Full Width Card</Card.Header>
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
      <Card.Header>Custom Padding</Card.Header>
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
  render: args => (
    <Card {...args}>
      <Card.Header>Bleed Body</Card.Header>
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
  render: args => (
    <Card {...args}>
      <Card.Header>Bleed Footer</Card.Header>
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
  render: args => (
    <Stack space={4}>
      <Card {...args}>
        <Text>
          <strong>Don&apos;t do this:</strong> bare text inside `&lt;Card&gt;`
          has no horizontal padding.
        </Text>
      </Card>
      <Card {...args}>
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
  render: args => (
    <Stack space={5}>
      <Card {...args} variant="master">
        <Card.Header>
          Master Access <Badge variant="master">Master</Badge>
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
          Admin Access <Badge variant="admin">Admin</Badge>
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
