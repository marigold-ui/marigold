import preview from '../../../../storybook/.storybook/preview';
import { ProgressCircle } from './ProgressCircle';

const meta = preview.meta({
  title: 'Components/LoadingSpinner',
  component: ProgressCircle,
  argTypes: {
    size: {
      control: {
        type: 'range',
        min: 0,
        max: 96,
        step: 2,
      },
      table: {
        defaultValue: {
          summary: '16',
        },
      },
    },
  },
});

export const Basic = meta.story({
  render: args => (
    <div className="flex size-96 items-center justify-center bg-gray-500 p-4">
      <ProgressCircle {...args} />
    </div>
  ),
});
