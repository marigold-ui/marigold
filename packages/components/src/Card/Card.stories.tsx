import type { Meta, StoryObj } from '@storybook/react';
import { Container } from '../Container/Container';
import { Headline } from '../Headline/Headline';
import { Text } from '../Text/Text';
import { Card } from './Card';

const meta = {
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
        type: 'text',
      },
      description:
        'The space between children elements inside the card, using tailwind spacing tokens.',
    },
    p: {
      control: {
        type: 'text',
      },
      description:
        'Padding of the card, using tailwind spacing tokens. Applies to all sides unless overridden by more specific props (px, py, pt, pb, pl, pr).',
    },
    px: {
      control: {
        type: 'text',
      },
      description:
        'Horizontal padding (left and right) of the card, using tailwind spacing tokens.',
    },
    py: {
      control: {
        type: 'text',
      },
      description:
        'Vertical padding (top and bottom) of the card, using tailwind spacing tokens.',
    },
    pt: {
      control: {
        type: 'text',
      },
      description: 'Top padding of the card, using tailwind spacing tokens.',
    },
    pb: {
      control: {
        type: 'text',
      },
      description: 'Bottom padding of the card, using tailwind spacing tokens.',
    },
    pl: {
      control: {
        type: 'text',
      },
      description: 'Left padding of the card, using tailwind spacing tokens.',
    },
    pr: {
      control: {
        type: 'text',
      },
      description: 'Right padding of the card, using tailwind spacing tokens.',
    },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
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
};

export const Stretch: Story = {
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
};

export const PaddingAndSpace: Story = {
  args: {
    p: 8,
    space: 4,
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
};
