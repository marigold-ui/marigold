import type { Meta, StoryObj } from '@storybook/react';
import { SVG } from './SVG';

const meta = {
  title: 'Components/SVG',
  argTypes: {
    variant: {
      control: {
        type: 'text',
      },
      table: {
        defaultValue: {
          summary: 'icon',
        },
      },
    },
    size: {
      control: {
        type: 'range',
        min: 0,
        max: 96,
        step: 2,
      },
      table: {
        defaultValue: {
          summary: '24',
        },
      },
    },
    color: {
      control: {
        type: 'text',
      },
      table: {
        defaultValue: {
          summary: undefined,
        },
      },
    },
  },
  args: {
    size: 24,
    variant: 'icon',
    color: undefined,
  },
} satisfies Meta;

export default meta;

export const Basic: StoryObj<typeof SVG> = {
  render: args => (
    <SVG {...args} viewBox="0 0 24 24">
      <path d="M9.9 20.113V13.8415H14.1V20.113H19.35V11.751H22.5L12 2.34375L1.5 11.751H4.65V20.113H9.9Z" />
    </SVG>
  ),
};

export const Filled: StoryObj<typeof SVG> = {
  render: args => (
    <SVG {...args} viewBox="0 0 24 24" className="fill-primary-600">
      <path d="M9.9 20.113V13.8415H14.1V20.113H19.35V11.751H22.5L12 2.34375L1.5 11.751H4.65V20.113H9.9Z" />
    </SVG>
  ),
};

export const Responsive: StoryObj<typeof SVG> = {
  render: args => (
    <SVG
      {...args}
      viewBox="0 0 24 24"
      className="w-[24px] sm:w-[32px] md:w-[64px]"
    >
      <path d="M9.9 20.113V13.8415H14.1V20.113H19.35V11.751H22.5L12 2.34375L1.5 11.751H4.65V20.113H9.9Z" />
    </SVG>
  ),
};
