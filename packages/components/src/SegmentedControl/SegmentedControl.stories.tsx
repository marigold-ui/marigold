import { useState } from 'react';
import { Form } from 'react-aria-components/Form';
import { expect, userEvent, waitFor } from 'storybook/test';
import preview from '../../../../.storybook/preview';
import { Button } from '../Button/Button';
import { SegmentedControl } from './SegmentedControl';

const meta = preview.meta({
  title: 'Components/SegmentedControl',
  component: SegmentedControl,
  parameters: {
    surface: false,
  },
  decorators: [
    Story => (
      <div className="self-start">
        <Story />
      </div>
    ),
  ],
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
    size: {
      control: {
        type: 'radio',
      },
      description: 'Size of the segments',
      options: ['default', 'small'],
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'default' },
      },
    },
    fullWidth: {
      control: {
        type: 'boolean',
      },
      description: 'Whether the items divide the available width equally',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    disabled: {
      control: {
        type: 'boolean',
      },
      description: 'Whether the segmented control is disabled',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    label: {
      control: { type: 'text' },
    },
    description: {
      control: { type: 'text' },
    },
  },
  args: {
    variant: 'default',
    size: 'default',
    fullWidth: false,
    disabled: false,
    label: 'Event status',
  },
});

export const Basic = meta.story({
  tags: ['component-test'],
  render: args => {
    const [value, setValue] = useState('upcoming');

    return (
      <>
        <SegmentedControl {...args} value={value} onChange={setValue}>
          <SegmentedControl.Item value="upcoming">
            Upcoming
          </SegmentedControl.Item>
          <SegmentedControl.Item value="past">Past</SegmentedControl.Item>
          <SegmentedControl.Item value="drafts">Drafts</SegmentedControl.Item>
        </SegmentedControl>
        <div data-testid="selected">Selected: {value}</div>
      </>
    );
  },
});

Basic.test('Clicking a segment updates selection', async ({ canvas, step }) => {
  await step('Initial state - upcoming is selected', async () => {
    expect(canvas.getByTestId('selected')).toHaveTextContent(
      'Selected: upcoming'
    );
    expect(canvas.getByRole('radiogroup')).toBeInTheDocument();
  });

  await step('Click the "Past" segment', async () => {
    await userEvent.click(canvas.getByRole('radio', { name: 'Past' }));

    await waitFor(() => {
      expect(canvas.getByTestId('selected')).toHaveTextContent(
        'Selected: past'
      );
    });
  });
});

Basic.test('Arrow keys move selection', async ({ canvas, step }) => {
  // A radiogroup selects on arrow navigation (horizontal → Left/Right).
  await step(
    'Focus the selected segment, ArrowRight selects the next',
    async () => {
      await userEvent.click(canvas.getByRole('radio', { name: 'Upcoming' }));
      await userEvent.keyboard('{ArrowRight}');

      await waitFor(() => {
        expect(canvas.getByTestId('selected')).toHaveTextContent(
          'Selected: past'
        );
      });
    }
  );
});

export const WithDescription = meta.story({
  args: {
    label: 'Density',
    description: 'Controls row height across the table.',
  },
  render: args => (
    <SegmentedControl {...args} defaultValue="comfortable">
      <SegmentedControl.Item value="comfortable">
        Comfortable
      </SegmentedControl.Item>
      <SegmentedControl.Item value="compact">Compact</SegmentedControl.Item>
    </SegmentedControl>
  ),
});

export const WithError = meta.story({
  tags: ['component-test'],
  args: {
    label: 'Visibility',
    error: true,
    errorMessage: 'Select a visibility option.',
  },
  render: args => (
    <SegmentedControl {...args} defaultValue="public">
      <SegmentedControl.Item value="public">Public</SegmentedControl.Item>
      <SegmentedControl.Item value="unlisted">Unlisted</SegmentedControl.Item>
      <SegmentedControl.Item value="private">Private</SegmentedControl.Item>
    </SegmentedControl>
  ),
});

WithError.test(
  'shows the error message and marks the group invalid',
  async ({ canvas }) => {
    expect(canvas.getByText('Select a visibility option.')).toBeInTheDocument();
    expect(canvas.getByRole('radiogroup')).toHaveAttribute(
      'aria-invalid',
      'true'
    );
  }
);

export const Ghost = meta.story({
  args: {
    variant: 'ghost',
    label: 'View',
  },
  render: args => (
    <SegmentedControl {...args} defaultValue="overview">
      <SegmentedControl.Item value="overview">Overview</SegmentedControl.Item>
      <SegmentedControl.Item value="activity">Activity</SegmentedControl.Item>
      <SegmentedControl.Item value="settings">Settings</SegmentedControl.Item>
    </SegmentedControl>
  ),
});

export const FullWidth = meta.story({
  args: {
    fullWidth: true,
    label: 'Range',
  },
  render: args => (
    <div className="w-96">
      <SegmentedControl {...args} defaultValue="30d">
        <SegmentedControl.Item value="7d">7d</SegmentedControl.Item>
        <SegmentedControl.Item value="30d">30d</SegmentedControl.Item>
        <SegmentedControl.Item value="90d">90d</SegmentedControl.Item>
        <SegmentedControl.Item value="1y">1y</SegmentedControl.Item>
      </SegmentedControl>
    </div>
  ),
});

export const DisabledItem = meta.story({
  tags: ['component-test'],
  args: {
    label: 'Visibility',
  },
  render: args => {
    const [value, setValue] = useState('public');

    return (
      <SegmentedControl {...args} value={value} onChange={setValue}>
        <SegmentedControl.Item value="public">Public</SegmentedControl.Item>
        <SegmentedControl.Item value="unlisted">Unlisted</SegmentedControl.Item>
        <SegmentedControl.Item value="private" disabled>
          Private
        </SegmentedControl.Item>
      </SegmentedControl>
    );
  },
});

DisabledItem.test(
  'Disabled segment cannot be selected',
  async ({ canvas, step }) => {
    await step('Private is disabled', async () => {
      expect(canvas.getByRole('radio', { name: 'Private' })).toBeDisabled();
    });

    await step('Clicking the disabled segment does nothing', async () => {
      await userEvent.click(canvas.getByRole('radio', { name: 'Private' }));

      expect(
        canvas.getByRole('radio', { name: 'Private' })
      ).not.toHaveAttribute('data-selected');
    });
  }
);

export const InForm = meta.story({
  tags: ['component-test'],
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
        <SegmentedControl {...args} name="status" defaultValue="active">
          <SegmentedControl.Item value="active">Active</SegmentedControl.Item>
          <SegmentedControl.Item value="archived">
            Archived
          </SegmentedControl.Item>
        </SegmentedControl>
        <Button type="submit">Save</Button>
        <div data-testid="submitted">Submitted: {submitted}</div>
      </Form>
    );
  },
});

InForm.test(
  'submits the selected value under its name',
  async ({ canvas, step }) => {
    await step('Select "Archived" and submit', async () => {
      await userEvent.click(canvas.getByRole('radio', { name: 'Archived' }));
      await userEvent.click(canvas.getByRole('button', { name: 'Save' }));

      await waitFor(() => {
        expect(canvas.getByTestId('submitted')).toHaveTextContent(
          'Submitted: archived'
        );
      });
    });
  }
);

export const BothSurfaces = meta.story({
  parameters: {
    surface: 'both',
  },
  args: {
    label: 'Layout',
  },
  render: args => (
    <SegmentedControl {...args} defaultValue="list">
      <SegmentedControl.Item value="list">List</SegmentedControl.Item>
      <SegmentedControl.Item value="grid">Grid</SegmentedControl.Item>
    </SegmentedControl>
  ),
});

export default meta;
