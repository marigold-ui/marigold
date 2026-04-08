import preview from '.storybook/preview';
import { Badge, Stack } from '@marigold/components';
import { Container } from '../Container/Container';
import { Headline } from '../Headline/Headline';
import { Text } from '../Text/Text';
import { Card } from './Card';

const insetTokenOptions = [
  'square-tight',
  'square-snug',
  'square-regular',
  'square-relaxed',
  'square-loose',
  'squish-tight',
  'squish-snug',
  'squish-regular',
  'squish-relaxed',
  'squish-loose',
  'stretch-tight',
  'stretch-snug',
  'stretch-regular',
  'stretch-relaxed',
  'stretch-loose',
];

const relationalTokenOptions = [
  'tight',
  'related',
  'regular',
  'group',
  'section',
];

const meta = preview.meta({
  title: 'Components/Card',
  component: Card,
  argTypes: {
    variant: {
      control: {
        type: 'radio',
      },
      description: 'The variant of the card',
      options: ['default', 'master', 'admin'],
    },
    space: {
      control: {
        type: 'select',
      },
      options: relationalTokenOptions,
      description:
        'The space between children elements inside the card, using spacing tokens.',
    },
    p: {
      control: {
        type: 'select',
      },
      options: insetTokenOptions,
      description:
        'Padding of the card, using inset spacing tokens. Applies to all sides.',
    },
    px: {
      control: {
        type: 'select',
      },
      options: relationalTokenOptions,
      description: 'Horizontal padding (left and right) of the card.',
    },
    py: {
      control: {
        type: 'select',
      },
      options: relationalTokenOptions,
      description: 'Vertical padding (top and bottom) of the card.',
    },
    pt: {
      control: {
        type: 'select',
      },
      options: relationalTokenOptions,
      description: 'Top padding of the card.',
    },
    pb: {
      control: {
        type: 'select',
      },
      options: relationalTokenOptions,
      description: 'Bottom padding of the card.',
    },
    pl: {
      control: {
        type: 'select',
      },
      options: relationalTokenOptions,
      description: 'Left padding of the card.',
    },
    pr: {
      control: {
        type: 'select',
      },
      options: relationalTokenOptions,
      description: 'Right padding of the card.',
    },
  },
});

export const Basic = meta.story({
  render: args => (
    <Card {...args}>
      <Container>
        <Headline level="2">Professor Severus Snape</Headline>
      </Container>
      <Container contentLength="long">
        <Text>
          <strong>Professor Severus Snape</strong> (9 January, 1960[1] - 2 May,
          1998)[2] was an English half-blood[3] wizard serving as Potions Master
          (1981-1996), Head of Slytherin House (1981-1997), Defence Against the
          Dark Arts professor (1996-1997), and Headmaster (1997-1998) of the
          Hogwarts School of Witchcraft and Wizardry as well as a member of the
          Order of the Phoenix and a Death Eater. His double life played an
          extremely important role in both of the Wizarding Wars against
          Voldemort.
        </Text>
      </Container>
    </Card>
  ),
});

export const Stretch = meta.story({
  args: {
    stretch: true,
  },
  render: args => (
    <Card {...args}>
      <Container>
        <Headline level="2">Professor Severus Snape</Headline>
      </Container>
      <Container contentLength="long">
        <Text>
          <strong>Professor Severus Snape</strong> (9 January, 1960[1] - 2 May,
          1998)[2] was an English half-blood[3] wizard serving as Potions Master
          (1981-1996), Head of Slytherin House (1981-1997), Defence Against the
          Dark Arts professor (1996-1997), and Headmaster (1997-1998) of the
          Hogwarts School of Witchcraft and Wizardry as well as a member of the
          Order of the Phoenix and a Death Eater. His double life played an
          extremely important role in both of the Wizarding Wars against
          Voldemort.
        </Text>
      </Container>
    </Card>
  ),
});

export const PaddingAndSpace = meta.story({
  args: {
    p: 'square-regular',
    space: 'regular',
  },
  render: args => (
    <Card {...args}>
      <Container>
        <Headline level="2">Professor Severus Snape</Headline>
      </Container>
      <Text>
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
        eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
        voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet
        clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit
        amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
        nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
        sed diam voluptua. At vero eos et accusam et justo duo dolores et ea
        rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem
        ipsum dolor sit amet.
      </Text>
      <Container>
        <Text>
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
          nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
          sed diam voluptua. At vero eos et accusam et justo duo dolores et ea
          rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem
          ipsum dolor sit amet.
        </Text>
      </Container>
    </Card>
  ),
});

export const MasterAndAdmin = meta.story({
  render: args => (
    <Stack space={5}>
      <Card {...args} variant="master">
        <Container>
          <Headline level="2">
            Master Access <Badge variant="master">Master</Badge>
          </Headline>
        </Container>
        <Text>
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
          nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
          sed diam voluptua. At vero eos et accusam et justo duo dolores et ea
          rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem
          ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur
          sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
          dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam
          et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea
          takimata sanctus est Lorem ipsum dolor sit amet.
        </Text>
      </Card>
      <Card {...args} variant="admin">
        <Container>
          <Headline level="2">
            Admin Access <Badge variant="admin">Admin</Badge>
          </Headline>
        </Container>
        <Text>
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
          nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
          sed diam voluptua. At vero eos et accusam et justo duo dolores et ea
          rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem
          ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur
          sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
          dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam
          et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea
          takimata sanctus est Lorem ipsum dolor sit amet.
        </Text>
      </Card>
    </Stack>
  ),
});
