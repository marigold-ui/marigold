/*
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
  },
});
*/

/*export const Basic = meta.story({
  render: args => (
    <Aside {...args}>
      <div>
        <Headline level={1}>How to Grow Your Own Garden</Headline>
        <Text>
          Growing your own garden is a rewarding and relaxing activity. It
          allows you to enjoy fresh produce and connect with nature. In this
          guide, we’ll walk you through the steps to get started.
        </Text>
        <Text>
          First, choose the right location for your garden. Make sure it gets
          plenty of sunlight and has good soil drainage...
        </Text>
      </div>
      <div>
        <Headline level={2}>Related Articles</Headline>
        <List>
          <List.Item>
            <a href="#">Top 10 Gardening Tips for Beginners</a>
          </List.Item>
          <List.Item>
            <a href="#">The Best Tools for Gardeners</a>
          </List.Item>
          <List.Item>
            <a href="#">How to Compost Effectively</a>
          </List.Item>
        </List>
        <Headline level={2}>Did You Know?</Headline>
        <Text>Gardening can reduce stress and improve mental health!</Text>
      </div>
    </Aside>
  ),
});*/
