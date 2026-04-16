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
