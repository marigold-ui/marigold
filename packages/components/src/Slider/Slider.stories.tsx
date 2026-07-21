import { FormEvent, useState } from 'react';
import { I18nProvider } from 'react-aria-components/I18nProvider';
import { expect } from 'storybook/test';
import preview from '.storybook/preview';
import { Button } from '../Button/Button';
import { Form } from '../Form/Form';
import { Stack } from '../Stack/Stack';
import { Slider } from './Slider';

const meta = preview.meta({
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
});

export const Basic = meta.story({
  tags: ['component-test'],
  args: { label: 'Label' },
  render: args => <Slider defaultValue={10} {...args} />,
});

Basic.test(
  'Moves the value with arrow keys',
  { parameters: { chromatic: { disableSnapshot: true } } },
  async ({ canvas, userEvent, step }) => {
    const slider = canvas.getByRole('slider');

    await step('Keyboard up/down moves slider value', async () => {
      await userEvent.click(canvas.getByText(/Label/));

      await userEvent.keyboard('{arrowup}');
      expect(slider).toHaveValue('11');

      await userEvent.keyboard('{arrowdown}');
      expect(slider).toHaveValue('10');
    });

    await step('Keyboard left/right moves slider value', async () => {
      await userEvent.keyboard('{arrowright}');
      expect(slider).toHaveValue('11');

      await userEvent.keyboard('{arrowleft}');
      expect(slider).toHaveValue('10');
    });
  }
);

Basic.test(
  'Increments by the configured step size',
  {
    parameters: { chromatic: { disableSnapshot: true } },
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
  },
  async ({ canvas, userEvent }) => {
    const [smallSteps, bigSteps] = canvas.getAllByRole('slider');

    await userEvent.click(canvas.getByText('Small steps'));
    await userEvent.keyboard('{arrowup}');
    expect(smallSteps).toHaveValue('10');

    await userEvent.click(canvas.getByText('Big steps'));
    await userEvent.keyboard('{arrowup}');
    expect(bigSteps).toHaveValue('100');
  }
);

Basic.test(
  'Clamps the value between the min and max',
  {
    parameters: { chromatic: { disableSnapshot: true } },
    args: { label: 'Budget' },
    render: args => <Slider {...args} minValue={50} maxValue={100} />,
  },
  async ({ canvas, userEvent }) => {
    const slider = canvas.getByRole('slider');

    // Without a default value the slider starts at the minimum
    expect(slider).toHaveValue('50');

    await userEvent.click(canvas.getByText('Budget'));

    // End jumps to the max, Home back to the min
    await userEvent.keyboard('{End}');
    expect(slider).toHaveValue('100');

    await userEvent.keyboard('{Home}');
    expect(slider).toHaveValue('50');
  }
);

Basic.test(
  'Submits the selected value with the form',
  {
    parameters: { chromatic: { disableSnapshot: true } },
    args: { label: 'Opacity' },
    render: args => {
      const [opacity, setOpacity] = useState<string | null>(null);

      return (
        <Form
          onSubmit={(e: FormEvent) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget as HTMLFormElement);
            setOpacity(formData.get('opacity') as string);
          }}
        >
          <Stack space={6} alignX="left">
            <Slider {...args} maxValue={100} name="opacity" width={48} />
            <Button variant="primary" type="submit">
              Submit
            </Button>
            {opacity !== null && (
              <pre data-testid="submitted-opacity">Opacity: {opacity}</pre>
            )}
          </Stack>
        </Form>
      );
    },
  },
  async ({ canvas, userEvent }) => {
    const slider = canvas.getByRole('slider');

    await userEvent.click(canvas.getByText('Opacity'));
    await userEvent.keyboard('{End}');
    expect(slider).toHaveValue('100');

    await userEvent.click(canvas.getByRole('button', { name: 'Submit' }));

    expect(canvas.getByTestId('submitted-opacity')).toHaveTextContent(
      'Opacity: 100'
    );
  }
);

export const ValueFormatting = meta.story({
  tags: ['component-test'],
  args: { label: 'Price', defaultValue: 0.5 },
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
});

ValueFormatting.test(
  'Formats the value as currency and percent',
  { parameters: { chromatic: { disableSnapshot: true } } },
  async ({ canvas }) => {
    expect(canvas.queryAllByRole('status')[0]).toHaveTextContent('€1.00');
    expect(canvas.queryAllByRole('status')[1]).toHaveTextContent('50%');
  }
);

export const MultipleThumbs = meta.story({
  tags: ['component-test'],
  render: args => (
    <Slider
      label="Range"
      {...args}
      defaultValue={[20, 40]}
      thumbLabels={['start', 'end']}
    />
  ),
});

MultipleThumbs.test(
  'Renders a thumb per default value',
  { parameters: { chromatic: { disableSnapshot: true } } },
  async ({ canvas }) => {
    const slider = canvas.getAllByRole('slider');

    expect(slider[0]).toHaveValue('20');
    expect(slider[1]).toHaveValue('40');
  }
);

MultipleThumbs.test(
  'Submits both thumb values with the form',
  {
    parameters: { chromatic: { disableSnapshot: true } },
    args: { label: 'Age' },
    render: args => {
      const [age, setAge] = useState<{
        start: string | null;
        end: string | null;
      }>({ start: null, end: null });

      return (
        <Form
          onSubmit={(e: FormEvent) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget as HTMLFormElement);
            setAge({
              start: formData.get('start') as string,
              end: formData.get('end') as string,
            });
          }}
        >
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
            {age.start !== null && (
              <pre data-testid="submitted-age">
                start: {age.start}, end: {age.end}
              </pre>
            )}
          </Stack>
        </Form>
      );
    },
  },
  async ({ canvas, userEvent }) => {
    const [start, end] = canvas.getAllByRole('slider');

    expect(start).toHaveValue('20');
    expect(end).toHaveValue('30');

    // Nudge the start thumb up before submitting
    await userEvent.tab();
    await userEvent.keyboard('{arrowright}');
    expect(start).toHaveValue('21');

    await userEvent.click(canvas.getByRole('button', { name: 'Submit' }));

    expect(canvas.getByTestId('submitted-age')).toHaveTextContent(
      'start: 21, end: 30'
    );
  }
);

export const MultiThumbsControlled = meta.story({
  parameters: { chromatic: { disableSnapshot: true } },
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
});

export const Disabled = meta.story({
  args: { label: 'Disabled' },
  render: args => <Slider {...args} defaultValue={20} disabled />,
});

export const MultiThumbsDisabled = meta.story({
  parameters: { chromatic: { disableSnapshot: true } },
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
});
