import type { Meta, StoryObj } from '@storybook/react-vite';
import { Container } from '../Container/Container';
import { Text } from '../Text/Text';
import { Breakout } from './Breakout';

const meta = {
  title: 'Components/Breakout',
  component: Breakout,
} satisfies Meta<typeof Breakout>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: args => {
    return (
      <Container align="center">
        <Text>
          Life in the Star Wars universe is a mix of adventure, danger, and
          wonder, shaped by countless star systems and diverse civilizations.
          From the bustling metropolis of Coruscant, where politicians and
          traders navigate the complexities of galactic politics, to the barren
          dunes of Tatooine, where moisture farmers scrape by and bounty hunters
          lurk in the shadows, every planet offers a different story. For some,
          life means piloting a starship through hyperspace, seeking freedom
          among the stars, while for others, it's a fight for survival against
          the tyranny of the Empire or the chaos of the criminal underworld.
          Across the galaxy, there's always a sense of something greater—whether
          it's the mystical Force, the bond between allies, or the quest for
          hope in a galaxy torn by conflict.
        </Text>
        <Breakout {...args}>
          <strong>Breakout</strong>
        </Breakout>
        <Text>
          Life in the Star Wars universe is a mix of adventure, danger, and
          wonder, shaped by countless star systems and diverse civilizations.
          From the bustling metropolis of Coruscant, where politicians and
          traders navigate the complexities of galactic politics, to the barren
          dunes of Tatooine, where moisture farmers scrape by and bounty hunters
          lurk in the shadows, every planet offers a different story. For some,
          life means piloting a starship through hyperspace, seeking freedom
          among the stars, while for others, it's a fight for survival against
          the tyranny of the Empire or the chaos of the criminal underworld.
          Across the galaxy, there's always a sense of something greater—whether
          it's the mystical Force, the bond between allies, or the quest for
          hope in a galaxy torn by conflict.
        </Text>
      </Container>
    );
  },
};
