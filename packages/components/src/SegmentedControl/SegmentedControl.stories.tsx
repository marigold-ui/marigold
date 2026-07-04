import { useState } from 'react';
import { Form } from 'react-aria-components/Form';
import { expect, userEvent, waitFor } from 'storybook/test';
import preview from '.storybook/preview';
import { Button } from '../Button/Button';
import { Stack } from '../Stack/Stack';
import { Text } from '../Text/Text';
import { SegmentedControl } from './SegmentedControl';

const meta = preview.meta({
  title: 'Components/SegmentedControl',
  component: SegmentedControl,
  argTypes: {
    variant: {
      control: {
        type: 'radio',
      },
      description: 'The visual style of the control',
      options: ['default', 'ghost'],
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'default' },
      },
    },
    label: {
      control: { type: 'text' },
      description: 'Set the control label',
    },
    description: {
      control: { type: 'text' },
      description: 'Set the field description',
    },
    error: {
      control: { type: 'boolean' },
      description: 'Set the error state',
    },
    errorMessage: {
      control: { type: 'text' },
      description: 'The message shown when the control is invalid',
    },
    required: {
      control: { type: 'boolean' },
      description: 'Whether the control is required',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Whether the control is disabled',
    },
    readOnly: {
      control: { type: 'boolean' },
      description: 'Whether the control is read-only',
    },
    width: {
      control: { type: 'text' },
      description: 'The width of the field',
    },
  },
  args: {
    label: 'Event status',
    variant: 'default',
    error: false,
    errorMessage: 'Please select an option.',
    required: false,
    disabled: false,
    readOnly: false,
  },
});

export const Basic = meta.story({
  tags: ['component-test'],
  args: {
    description: 'Choose which events to display.',
  },
  render: args => (
    <SegmentedControl {...args} defaultValue="upcoming">
      <SegmentedControl.Option value="upcoming">
        Upcoming
      </SegmentedControl.Option>
      <SegmentedControl.Option value="past">Past</SegmentedControl.Option>
      <SegmentedControl.Option value="drafts">Drafts</SegmentedControl.Option>
    </SegmentedControl>
  ),
});

Basic.test(
  'selects an option on click',
  {
    parameters: { chromatic: { disableSnapshot: true } },
  },
  async ({ canvas }) => {
    const past = canvas.getByRole('radio', { name: 'Past' });

    await userEvent.click(past);

    await expect(past).toBeChecked();
  }
);

export const Controlled = meta.story({
  tags: ['component-test'],
  parameters: { chromatic: { disableSnapshot: true } },
  args: {
    label: 'Layout',
  },
  render: args => {
    const [value, setValue] = useState('list');

    return (
      <Stack space={4} alignX="left">
        <SegmentedControl {...args} value={value} onChange={setValue}>
          <SegmentedControl.Option value="list">List</SegmentedControl.Option>
          <SegmentedControl.Option value="grid">Grid</SegmentedControl.Option>
        </SegmentedControl>
        <Text>Selected: {value}</Text>
      </Stack>
    );
  },
});

Controlled.test(
  'reflects the selected value in controlled mode',
  async ({ canvas }) => {
    const grid = canvas.getByRole('radio', { name: 'Grid' });

    await userEvent.click(grid);

    await expect(canvas.getByText('Selected: grid')).toBeVisible();
  }
);

export const DisabledOption = meta.story({
  tags: ['component-test'],
  args: {
    label: 'View',
  },
  render: args => (
    <SegmentedControl {...args} defaultValue="list">
      <SegmentedControl.Option value="list">List</SegmentedControl.Option>
      <SegmentedControl.Option value="grid" disabled>
        Grid
      </SegmentedControl.Option>
    </SegmentedControl>
  ),
});

DisabledOption.test(
  'does not select a disabled option',
  {
    parameters: { chromatic: { disableSnapshot: true } },
  },
  async ({ canvas }) => {
    const grid = canvas.getByRole('radio', { name: 'Grid' });

    await userEvent.click(grid);

    await expect(grid).toBeDisabled();
    await expect(canvas.getByRole('radio', { name: 'List' })).toBeChecked();
  }
);

// Stress test only: this intentionally exceeds the recommended 2–5 options
// (see the docs' "Number of options" guideline) to exercise the horizontal
// overflow scrolling and the "keep selected option in view" behaviour. It is
// not an example of recommended usage.
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'];

export const Overflow = meta.story({
  tags: ['component-test'],
  args: {
    label: 'Month',
  },
  render: args => (
    <div className="w-72">
      <SegmentedControl {...args} defaultValue="Jan">
        {months.map(month => (
          <SegmentedControl.Option key={month} value={month}>
            {month}
          </SegmentedControl.Option>
        ))}
      </SegmentedControl>
    </div>
  ),
});

Overflow.test(
  'keeps the selected option in view when overflowing',
  {
    parameters: { chromatic: { disableSnapshot: true } },
  },
  async ({ canvas, canvasElement }) => {
    const presentation = canvasElement.querySelector(
      '[role="presentation"]'
    ) as HTMLElement;
    const scroller = presentation.firstElementChild as HTMLElement;
    const august = canvas.getByRole('radio', { name: 'Aug' });

    await userEvent.click(august);

    await waitFor(() => expect(scroller.scrollLeft).toBeGreaterThan(0));
    expect(scroller.scrollWidth).toBeGreaterThan(scroller.clientWidth);
    expect(august).toBeChecked();
  }
);

// Regression guard for the 320px overflow report (DST-765). Pinned to the
// 320px viewport and rendered without a width wrapper so the segments overflow
// against the smallest supported screen. The control must scroll *inside* its
// track: the scroll container must not bleed horizontally past the rounded
// track edges (a negative horizontal margin used to push it 4px past each side,
// overflowing the container and the viewport at this width).
export const OverflowSmallScreen = meta.story({
  tags: ['component-test'],
  globals: {
    viewport: { value: 'extraSmallScreen' },
  },
  args: {
    label: 'Month',
  },
  render: args => (
    <SegmentedControl {...args} defaultValue="Jan">
      {months.map(month => (
        <SegmentedControl.Option key={month} value={month}>
          {month}
        </SegmentedControl.Option>
      ))}
    </SegmentedControl>
  ),
});

OverflowSmallScreen.test(
  'scrolls inside the track without bleeding past its edges',
  {
    parameters: { chromatic: { disableSnapshot: true } },
  },
  async ({ canvas, canvasElement }) => {
    const track = canvasElement.querySelector(
      '[role="presentation"]'
    ) as HTMLElement;
    const scroller = track.firstElementChild as HTMLElement;

    // The scroller overflows internally...
    expect(scroller.scrollWidth).toBeGreaterThan(scroller.clientWidth);

    // ...but must stay within the rounded track horizontally (no bleed past
    // the edges, which is what overflowed the viewport at 320px).
    const trackRect = track.getBoundingClientRect();
    const scrollerRect = scroller.getBoundingClientRect();
    expect(scrollerRect.left).toBeGreaterThanOrEqual(
      Math.floor(trackRect.left)
    );
    expect(scrollerRect.right).toBeLessThanOrEqual(Math.ceil(trackRect.right));

    const august = canvas.getByRole('radio', { name: 'Aug' });
    await userEvent.click(august);
    await expect(august).toBeChecked();
  }
);

export const WithError = meta.story({
  tags: ['component-test'],
  args: {
    label: 'Visibility',
    error: true,
    required: true,
  },
  render: args => (
    <SegmentedControl {...args} defaultValue="public">
      <SegmentedControl.Option value="public">Public</SegmentedControl.Option>
      <SegmentedControl.Option value="unlisted">
        Unlisted
      </SegmentedControl.Option>
      <SegmentedControl.Option value="private">Private</SegmentedControl.Option>
    </SegmentedControl>
  ),
});

WithError.test(
  'exposes the error message and aria-invalid',
  {
    parameters: { chromatic: { disableSnapshot: true } },
  },
  async ({ canvas, args }) => {
    const group = canvas.getByRole('radiogroup');

    await waitFor(() =>
      expect(canvas.getByText(args.errorMessage!)).toBeVisible()
    );

    expect(group).toHaveAttribute('aria-invalid', 'true');
  }
);

export const InForm = meta.story({
  tags: ['component-test'],
  parameters: { chromatic: { disableSnapshot: true } },
  args: {
    label: 'Status',
  },
  render: args => {
    const [submitted, setSubmitted] = useState('');

    return (
      <Form
        onSubmit={event => {
          event.preventDefault();
          const data = new FormData(event.currentTarget);
          setSubmitted(String(data.get('status') ?? ''));
        }}
      >
        <Stack space={4} alignX="left">
          <SegmentedControl {...args} name="status" defaultValue="active">
            <SegmentedControl.Option value="active">
              Active
            </SegmentedControl.Option>
            <SegmentedControl.Option value="archived">
              Archived
            </SegmentedControl.Option>
          </SegmentedControl>
          <Button type="submit">Save</Button>
          <Text>Submitted: {submitted}</Text>
        </Stack>
      </Form>
    );
  },
});

InForm.test(
  'submits the selected value as form data',
  {
    parameters: { chromatic: { disableSnapshot: true } },
  },
  async ({ canvas }) => {
    const archived = canvas.getByRole('radio', { name: 'Archived' });

    await userEvent.click(archived);
    await userEvent.click(canvas.getByRole('button', { name: 'Save' }));

    await waitFor(() =>
      expect(canvas.getByText('Submitted: archived')).toBeVisible()
    );
  }
);

export default meta;
