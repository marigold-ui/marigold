import preview from '.storybook/preview';
import { Headline } from '../Headline/Headline';
import { Link } from '../Link/Link';
import { List } from '../List/List';
import { Text } from '../Text/Text';
import { Aside } from './Aside';

const meta = preview.meta({
  title: 'Components/Aside',
  component: Aside,
  argTypes: {
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
    side: {
      control: {
        type: 'select',
      },
      options: ['left', 'right'],
      table: {
        type: { summary: 'select' },
        defaultValue: { summary: 'left' },
      },
      description: 'Which element to treat as the sidebar',
    },
    sideWidth: {
      control: {
        type: 'text',
      },
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '150px' },
      },
      description: `Represents the width of the sidebar when adjacent. If not set (undefined) it defaults to the sidebar's content width, we use pixel values for that.`,
    },
    wrap: {
      control: {
        type: 'text',
      },
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '50%' },
      },
      description:
        'The narrowest the content (main) element can be before wrapping. Should be a percentage.',
    },
  },
  args: {
    side: 'right',
    space: 4,
    wrap: '50%',
    sideWidth: '150px',
    children: undefined,
  } as const,
});

const GardenMain = () => (
  <div>
    <Headline level={1}>How to Grow Your Own Garden</Headline>
    <Text>
      Growing your own garden is a rewarding and relaxing activity. It allows
      you to enjoy fresh produce and connect with nature. In this guide, we’ll
      walk you through the steps to get started.
    </Text>
    <Text>
      First, choose the right location for your garden. Make sure it gets plenty
      of sunlight and has good soil drainage...
    </Text>
  </div>
);

const GardenSidebar = () => (
  <div>
    <Headline level={2}>Related Articles</Headline>
    <List>
      <List.Item>
        <Link href="#">Top 10 Gardening Tips for Beginners</Link>
      </List.Item>
      <List.Item>
        <Link href="#">The Best Tools for Gardeners</Link>
      </List.Item>
      <List.Item>
        <Link href="#">How to Compost Effectively</Link>
      </List.Item>
    </List>
    <Headline level={2}>Did You Know?</Headline>
    <Text>Gardening can reduce stress and improve mental health!</Text>
  </div>
);

export const Basic = meta.story({
  render: args => (
    <Aside {...args}>
      <GardenMain />
      <GardenSidebar />
    </Aside>
  ),
});

export const SidebarLeft = meta.story({
  args: {
    side: 'left',
  },
  render: args => (
    <Aside {...args}>
      <GardenSidebar />
      <GardenMain />
    </Aside>
  ),
});

export const WideSidebar = meta.story({
  args: {
    sideWidth: '300px',
  },
  render: args => (
    <Aside {...args}>
      <GardenMain />
      <GardenSidebar />
    </Aside>
  ),
});
