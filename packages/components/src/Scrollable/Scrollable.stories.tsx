import preview from '.storybook/preview';
import { Card } from '../Card/Card';
import { Scrollable } from './Scrollable';

const meta = preview.meta({
  title: 'Components/Scrollable',
  component: Scrollable,
  parameters: {
    surface: false,
  },
  argTypes: {
    width: {
      control: {
        type: 'text',
      },
      description:
        'Set the width of the container. For that we use the width tailwind values.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'full' },
      },
    },
    height: {
      control: {
        type: 'text',
      },
      description:
        'Set the height of the container. We use strings as pixel values.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'none' },
      },
    },
  },
  args: {},
});

export const Basic = meta.story({
  render: args => (
    <Scrollable height="200px" width="1/5" {...args}>
      <div>
        This is some additional text that is always visible! Pellentesque
        habitant morbi tristique senectus et netus et malesuada fames ac turpis
        egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor
        sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean
        ultricies mi vitae est. Mauris placerat eleifend leo. Quisque sit amet
        est et sapien ullamcorper pharetra. Vestibulum erat wisi, condimentum
        sed, commodo vitae, ornare sit amet, wisi. Aenean fermentum, elit eget
        tincidunt condimentum, eros ipsum rutrum orci, sagittis tempus lacus
        enim ac dui. Donec non enim in turpis pulvinar facilisis. Ut felis.
        Praesent dapibus, neque id cursus faucibus, tortor neque egestas augue,
        eu vulputate magna eros eu erat. Aliquam erat volutpat. Nam dui mi,
        tincidunt quis, accumsan porttitor, facilisis luctus, metus
      </div>
    </Scrollable>
  ),
});

export const Horizontal = meta.story({
  render: args => (
    <Scrollable width="1/2" {...args}>
      <div className="inline-flex gap-2">
        <Card>
          <Card.Content>
            <div className="h-[100px] w-[200px] border border-[#ced4da] bg-[#e9ecef]" />
          </Card.Content>
        </Card>
        <Card>
          <Card.Content>
            <div className="h-[100px] w-[200px] border border-[#ced4da] bg-[#e9ecef]" />
          </Card.Content>
        </Card>
        <Card>
          <Card.Content>
            <div className="h-[100px] w-[200px] border border-[#ced4da] bg-[#e9ecef]" />
          </Card.Content>
        </Card>
        <Card>
          <Card.Content>
            <div className="h-[100px] w-[200px] border border-[#ced4da] bg-[#e9ecef]" />
          </Card.Content>
        </Card>
        <Card>
          <Card.Content>
            <div className="h-[100px] w-[200px] border border-[#ced4da] bg-[#e9ecef]" />
          </Card.Content>
        </Card>
        <Card>
          <Card.Content>
            <div className="h-[100px] w-[200px] border border-[#ced4da] bg-[#e9ecef]" />
          </Card.Content>
        </Card>
      </div>
    </Scrollable>
  ),
});
