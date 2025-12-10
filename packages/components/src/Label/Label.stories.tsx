import preview from '../../../../storybook/.storybook/preview';
import { Label } from './Label';

const meta = preview.meta({
  title: 'Components/Label',
  component: Label,
  argTypes: {
    children: {
      control: {
        type: 'text',
      },
      description: 'Text of the label',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Label' },
      },
    },
  },
  args: {
    children: 'Label',
  },
});

export const Basic = meta.story({
  render: ({ children, ...args }) => <Label {...args}>{children}</Label>,
});
