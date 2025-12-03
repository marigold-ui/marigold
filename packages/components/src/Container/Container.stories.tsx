import type { Meta, StoryObj } from '@storybook/react-vite';
import { Aspect } from '../Aspect/Aspect';
import { Breakout } from '../Breakout/Breakout';
import { Text } from '../Text/Text';
import { Container } from './Container';

const meta = {
  title: 'Components/Container',
  component: Container,
  argTypes: {
    contentLength: {
      control: {
        type: 'select',
      },
      options: ['short', 'default', 'long'],
      description: 'Length of the content',
    },
    align: {
      control: {
        type: 'select',
      },
      options: ['left', 'center', 'right'],
      description: 'Set alignment the content inside the container',
    },
    alignItems: {
      control: {
        type: 'select',
      },
      options: ['left', 'center', 'right'],
      description: 'Set alignment of the items inside the container',
    },
    space: {
      control: {
        type: 'text',
      },
      table: {
        defaultValue: { summary: '0' },
      },
      description:
        'Value representing the space between the two elements, for that we use tailwind tokens.',
    },
  },
  args: {
    space: 4,
  },
} satisfies Meta<typeof Container>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Base: Story = {
  render: args => (
    <Container {...args}>
      <Text>
        It is a dark time for the Rebellion. Although the Death Star has been
        destroyed, Imperial troops have driven the Rebel forces from their
        hidden base and pursued them across the galaxy. Evading the dreaded
        Imperial Starfleet, a group of freedom fighters led by Luke Skywalker
        has established a new secret base on the remote ice world of Hoth. The
        evil lord Darth Vader, obsessed with finding young Skywalker, has
        dispatched thousands of remote probes into the far reaches of space....
      </Text>
      <Aspect maxWidth="400px" ratio="ultrawide">
        <img
          src="https://images.unsplash.com/photo-1618336753974-aae8e04506aa?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Grogu"
          className="size-full object-cover"
        />
      </Aspect>
    </Container>
  ),
};

export const WithBreakout: Story = {
  render: args => (
    <Container {...args}>
      <Breakout>
        <Aspect ratio="ultrawide">
          <img
            src="https://images.unsplash.com/photo-1618336753974-aae8e04506aa?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Grogu"
            className="size-full object-cover"
          />
        </Aspect>
      </Breakout>
      <Text>
        It is a dark time for the Rebellion. Although the Death Star has been
        destroyed, Imperial troops have driven the Rebel forces from their
        hidden base and pursued them across the galaxy. Evading the dreaded
        Imperial Starfleet, a group of freedom fighters led by Luke Skywalker
        has established a new secret base on the remote ice world of Hoth. The
        evil lord Darth Vader, obsessed with finding young Skywalker, has
        dispatched thousands of remote probes into the far reaches of space....
      </Text>
    </Container>
  ),
};
