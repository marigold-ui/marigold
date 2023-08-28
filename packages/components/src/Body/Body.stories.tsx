import type { Meta, StoryObj } from '@storybook/react';

import { Container } from '../Container';
import { Body } from './Body';

const meta = {
  title: 'Components/Body',
  component: Body,
  argTypes: {
    variant: {
      control: {
        type: 'text',
      },
      description: 'The variant of the body',
    },
    size: {
      control: {
        type: 'text',
      },
      description: 'The size of the body',
    },
  },
} satisfies Meta<typeof Body>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: args => (
    <Container contentType="content" size="medium">
      <Body {...args}>
        <strong>Professor Severus Snape</strong> (9 January, 1960[1] - 2 May,
        1998)[2] was an English half-blood[3] wizard serving as Potions Master
        (1981-1996), Head of Slytherin House (1981-1997), Defence Against the
        Dark Arts professor (1996-1997), and Headmaster (1997-1998) of the
        Hogwarts School of Witchcraft and Wizardry as well as a member of the
        Order of the Phoenix and a Death Eater. His double life played an
        extremely important role in both of the Wizarding Wars against
        Voldemort.
      </Body>
    </Container>
  ),
};
