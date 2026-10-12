import { expect } from 'storybook/test';
import preview from '.storybook/preview';
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

export const OverflowSmallScreen = meta.story({
  globals: {
    viewport: { value: 'extraSmallScreen' },
  },
  tags: ['component-test'],
  args: {
    children: 'Rechnungsempfängeradressenzusatzinformationen',
  },
  render: ({ children, ...args }) => <Label {...args}>{children}</Label>,
});

OverflowSmallScreen.test(
  'breaks a label without break opportunities instead of overflowing',
  { parameters: { chromatic: { disableSnapshot: true } } },
  async ({ canvasElement }) => {
    expect(canvasElement.scrollWidth).toBeLessThanOrEqual(
      canvasElement.clientWidth
    );
  }
);
