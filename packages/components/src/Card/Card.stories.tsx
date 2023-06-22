import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Link } from '../Link';
import { Card } from './Card';
import { Container } from '../Container';
import { Center } from '../Center';
import { Text } from '../Text';
import { Close, ExternalLink } from '@marigold/icons';
import { Inline } from '../Inline';
import { Split } from '../Split';
import { Tiles } from '../Tiles';

const meta = {
  title: 'Components/Card',
  argTypes: {
    variant: {
      control: {
        type: 'text',
      },
      description: 'The variant of the card',
    },
    size: {
      control: {
        type: 'text',
      },
      description: 'The size of the card',
    },
    p: {
      control: {
        type: 'text',
      },
      description: 'The padding of the card',
    },
    px: {
      control: {
        type: 'text',
      },
      description: 'The x padding of the card',
    },
    py: {
      control: {
        type: 'text',
      },
      description: 'The y padding of the card',
    },
    pr: {
      control: {
        type: 'text',
      },
      description: 'The right padding of the card',
    },
    pt: {
      control: {
        type: 'text',
      },
      description: 'The top padding of the card',
    },
    pb: {
      control: {
        type: 'text',
      },
      description: 'The bottom padding of the card',
    },
    pl: {
      control: {
        type: 'text',
      },
      description: 'The left padding of the card',
    },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: args => (
    <Container contentType="content" size="medium">
      <Card {...args}>
        <h2>Professor Severus Snape</h2>
        <section>
          <p>
            <strong>Professor Severus Snape</strong> (9 January, 1960[1] - 2
            May, 1998)[2] was an English half-blood[3] wizard serving as Potions
            Master (1981-1996), Head of Slytherin House (1981-1997), Defence
            Against the Dark Arts professor (1996-1997), and Headmaster
            (1997-1998) of the Hogwarts School of Witchcraft and Wizardry as
            well as a member of the Order of the Phoenix and a Death Eater. His
            double life played an extremely important role in both of the
            Wizarding Wars against Voldemort.
          </p>
        </section>
      </Card>
    </Container>
  ),
};

export const CoreCard: Story = {
  render: args => (
    <Tiles tilesWidth="300px" space={5}>
      <Card {...args} p={3}>
        <Inline alignY="top">
          <Link href={'#'} target="blank">
            <ExternalLink size={26} className="fill-[#990000]" />
          </Link>
          <Split />
          <Close />
        </Inline>
        <Center>
          <Link variant="cardText" href={'#'}>
            Reservix GmbH (1)
          </Link>
        </Center>
      </Card>

      <Card {...args} p={3}>
        <Inline alignY="top">
          <Link href={'#'} target="blank">
            <ExternalLink size={26} className="fill-[#990000]" />
          </Link>
          <Split />
          <Close />
        </Inline>
        <Center>
          <Text variant="bold">Interne Verkaufsstelle</Text>
          <Link variant="cardText" href={'#'}>
            Kasse 2 (9)
          </Link>
        </Center>
      </Card>
    </Tiles>
  ),
};
