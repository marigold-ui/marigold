import type { Meta, StoryObj } from '@storybook/react-vite';
import { FormEvent } from 'react';
import { I18nProvider } from 'react-aria-components';
import { useState } from 'storybook/preview-api';
import { expect } from 'storybook/test';
import { Button } from '../Button/Button';
import { Form } from '../Form/Form';
import { Stack } from '../Stack/Stack';
import { Slider } from './Slider';

const meta = {
  title: 'Components/Slider',
  component: Slider,
  argTypes: {
    label: {
      control: 'text',
      description: 'The label of the slider',
      table: {
        type: { summary: 'string' },
      },
    },
    disabled: {
      control: {
        type: 'boolean',
      },
      description: 'Whether the Slider is disabled',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    maxValue: {
      control: {
        type: 'number',
      },
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '100' },
      },
      description: 'The maximum value of the slider',
    },
    step: {
      control: {
        type: 'range',
        min: 1,
        max: 100,
        step: 1,
      },
      table: {
        type: { summary: 'range' },
        defaultValue: { summary: '1' },
      },
      description: 'The step size of the slider',
    },
    width: {
      control: {
        type: 'text',
      },
      description: 'The width of the field',
    },
    description: {
      control: {
        type: 'text',
      },
      table: {
        type: { summary: 'string' },
      },
    },
  },
  args: {
    description: 'This is a help text description',
  },
} satisfies Meta<typeof Slider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: { label: 'Label' },
  render: args => <Slider {...args} />,
};

export const ValueFormatting: Story = {
  args: { label: 'Price' },
  render: args => (
    <I18nProvider locale="en-US">
      <Stack space={4}>
        <Slider
          {...args}
          formatOptions={{ style: 'currency', currency: 'EUR' }}
        />
        <Slider
          label="Percent"
          {...args}
          formatOptions={{ style: 'percent' }}
          step={0.01}
          maxValue={1}
        />
      </Stack>
    </I18nProvider>
  ),
  play: async ({ canvas }) => {
    expect(canvas.queryAllByRole('status')[0]).toHaveTextContent('€0.00');
    expect(canvas.queryAllByRole('status')[1]).toHaveTextContent('0%');
  },
};

export const MultipleThumbs: Story = {
  render: args => (
    <Slider
      label="Range"
      {...args}
      defaultValue={[20, 40]}
      thumbLabels={['start', 'end']}
    />
  ),

  play: async ({ canvas }) => {
    const slider = canvas.getAllByRole('slider');

    expect(slider[0]).toHaveValue('20');
    expect(slider[1]).toHaveValue('40');
  },
};

export const Controlled: Story = {
  args: { label: 'Cookies to buy' },
  render: args => {
    const [value, setValue] = useState<number | number[]>(25);

    return (
      <Stack space={2}>
        <Slider value={value} onChange={setValue} {...args} />
        <p>Current value: {value}</p>
      </Stack>
    );
  },
};

export const MultiThumbsControlled: Story = {
  args: { label: 'Tickets for sale' },
  render: args => {
    const [value, setValue] = useState<number | number[]>([25, 75]);

    return (
      <Stack space={2}>
        <Slider value={value} onChange={setValue} {...args} />
        <p>
          Current value: {typeof value !== 'number' ? value?.join(' - ') : null}
        </p>
      </Stack>
    );
  },
};

export const Forms: Story = {
  args: { label: 'Opacity' },
  render: args => {
    const handleSubmit = (e: FormEvent) => {
      e.preventDefault();
      let formData = new FormData(e.target as HTMLFormElement);
      alert(`Opacity is currently ${formData.get('opacity')} %`);
    };

    return (
      <Form onSubmit={handleSubmit}>
        <Stack space={6} alignX="left">
          <Slider {...args} maxValue={100} name="opacity" width={48} />
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Stack>
      </Form>
    );
  },
};

export const MultiThumbsForm: Story = {
  args: { label: 'Age' },
  render: args => {
    const handleSubmit = (e: FormEvent) => {
      e.preventDefault();
      let formData = new FormData(e.target as HTMLFormElement);
      alert(
        `Age is selected from ${formData.get('start')} to ${formData.get('end')}.`
      );
    };

    return (
      <Form onSubmit={handleSubmit}>
        <Stack space={6} alignX="left">
          <Slider
            {...args}
            defaultValue={[20, 30]}
            maxValue={100}
            name={['start', 'end']}
            width={60}
          />
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Stack>
      </Form>
    );
  },
};

export const Disabled: Story = {
  args: { label: 'Disabled' },
  render: args => <Slider {...args} defaultValue={20} disabled />,
};

export const MultiThumbsDisabled: Story = {
  args: { label: 'Disabled' },
  render: args => (
    <Slider
      {...args}
      defaultValue={[20, 30]}
      maxValue={100}
      thumbLabels={['start', 'end']}
      disabled
    />
  ),
};

export const Steps: Story = {
  render: args => (
    <Stack space={4}>
      <Slider
        {...args}
        defaultValue={0}
        maxValue={100}
        step={10}
        label="Small steps"
      />
      <Slider
        {...args}
        defaultValue={0}
        maxValue={1000}
        step={100}
        label="Big steps"
      />
    </Stack>
  ),
};

export const MinAndMaxValue: Story = {
  args: { label: 'Budget' },
  render: args => <Slider {...args} minValue={50} maxValue={100} />,
};
