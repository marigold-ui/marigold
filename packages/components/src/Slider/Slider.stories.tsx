import type { Meta, StoryObj } from '@storybook/react';
import { FormEvent, useState } from 'react';
import {
  Container,
  FieldBase,
  FieldGroup,
  Inline,
  Stack,
} from '@marigold/components';
import { Button } from '../Button';
import { Form } from '../Form/Form';
import { Slider } from './Slider';

const meta = {
  title: 'Components/Slider',
  component: Slider,
  argTypes: {
    children: {
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
    disabled: false,
    description: 'This is a help text description',
    thumbLabels: ['start'],
  },
} satisfies Meta<typeof Slider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = { render: args => <Slider {...args} /> };

export const ValueFormatting: Story = {
  render: args => (
    <Stack space={4}>
      <Slider {...args} formatOptions={{ style: 'currency', currency: 'EUR' }}>
        Price
      </Slider>
      <Slider
        {...args}
        formatOptions={{ style: 'percent' }}
        step={0.01}
        maxValue={1}
      >
        Percent
      </Slider>
    </Stack>
  ),
};

export const MultipleThumbs: Story = {
  render: args => (
    <Slider {...args} defaultValue={[30, 60]} thumbLabels={['start', 'end']}>
      Range
    </Slider>
  ),
};

export const Controlled: Story = {
  render: args => {
    const [value, setValue] = useState<number | number[]>(25);

    return (
      <>
        <Slider value={value} onChange={setValue} {...args}>
          Cookies to buy
        </Slider>
        <p>Current value: {value}</p>
      </>
    );
  },
};

export const MultiThumbsControlled: Story = {
  render: args => {
    const [value, setValue] = useState<number | number[]>([25, 75]);

    return (
      <>
        <Slider value={value} onChange={setValue} {...args}>
          Tickets for sale
        </Slider>
        <p>
          Current value: {typeof value !== 'number' ? value?.join(' – ') : null}
        </p>
      </>
    );
  },
};

export const Forms: Story = {
  render: args => {
    const handleSubmit = (e: FormEvent) => {
      e.preventDefault();
      let formData = new FormData(e.target as HTMLFormElement);
      alert(`Opacity is currently ${formData.get('opacity')} %`);
    };

    return (
      <Container size={'large'}>
        <Form onSubmit={handleSubmit}>
          <FieldGroup labelWidth={'100px'}>
            <Stack space={2}>
              <FieldBase label="Choose opacity:">
                <Slider
                  {...args}
                  maxValue={100}
                  thumbLabels={['opacity']}
                  width={48}
                />
              </FieldBase>
            </Stack>
          </FieldGroup>
          <Inline space={4} alignX={'right'}>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Inline>
        </Form>
      </Container>
    );
  },
};

export const MultiThumbsForm: Story = {
  render: args => {
    const handleSubmit = (e: FormEvent) => {
      e.preventDefault();
      let formData = new FormData(e.target as HTMLFormElement);
      alert(
        `Age is selected from ${formData.get('start')} to ${formData.get('end')}.`
      );
    };

    return (
      <Container size={'large'}>
        <Form onSubmit={handleSubmit}>
          <FieldGroup labelWidth={'100px'}>
            <Stack space={2}>
              <FieldBase label="Age">
                <Slider
                  {...args}
                  defaultValue={[20, 30]}
                  maxValue={100}
                  thumbLabels={['start', 'end']}
                  width={60}
                />
              </FieldBase>
            </Stack>
          </FieldGroup>
          <Inline space={4} alignX={'right'}>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Inline>
        </Form>
      </Container>
    );
  },
};

export const Disabled: Story = {
  render: args => <Slider {...args} defaultValue={20} disabled />,
};

export const MultiThumbsDisabled: Story = {
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
      <Slider {...args} defaultValue={0} maxValue={100} step={0.1}>
        Small steps
      </Slider>
      <Slider {...args} defaultValue={0} maxValue={10000} step={1000}>
        Big steps
      </Slider>
    </Stack>
  ),
};

export const MinAndMaxValue: Story = {
  render: args => (
    <Slider {...args} defaultValue={0} minValue={50} maxValue={100} />
  ),
};
