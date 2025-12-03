import type { StoryObj } from '@storybook/react-vite';
import { ThemeProvider, useResponsiveValue } from '@marigold/system';

const meta = {
  title: 'System/useResponsiveValue',
};

export default meta;
type Story = StoryObj<typeof meta>;

const theme = {
  name: 'test',
  breakpoints: ['40em', '50em', '60em', '70em'],
  components: {},
};

const Component = () => {
  const value = useResponsiveValue(
    [
      'no breakpoint',
      'larger than 40em',
      'larger than 50em',
      'larger than 60em',
      'larger than 70em',
    ],
    2
  );
  return <strong>{value}</strong>;
};

export const Basic: Story = {
  render: args => {
    return (
      <ThemeProvider theme={theme}>
        <div
          {...args}
          className="w-full cursor-pointer bg-yellow-500 text-[#ffffff] sm:bg-red-500 md:bg-green-500 lg:bg-blue-500 xl:bg-gray-500"
        >
          <Component />
        </div>
      </ThemeProvider>
    );
  },
};
