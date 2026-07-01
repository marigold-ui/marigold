import { I18nProvider } from 'react-aria-components';
import { expect, screen, userEvent } from 'storybook/test';
import preview from '.storybook/preview';
import { Breadcrumbs } from './Breadcrumbs';

const meta = preview.meta({
  title: 'Components/Breadcrumbs',
  component: Breadcrumbs,
  decorators: [
    Story => (
      <div id="storybook-root">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    variant: {
      control: 'radio',
      options: ['default'],
    },
    size: {
      control: 'radio',
      options: ['small', 'default', 'large'],
    },
    disabled: {
      control: 'boolean',
    },
    maxVisibleItems: {
      control: 'select',
      options: ['auto', 1, 2, 3, 4, 5],
    },
  },
  args: {
    variant: 'default',
    size: 'default',
    disabled: false,
    children: [],
  },
});

export const Basic = meta.story({
  render: args => (
    <Breadcrumbs {...args}>
      <Breadcrumbs.Item href="https://marigold-ui.io">Home</Breadcrumbs.Item>
      <Breadcrumbs.Item href="https://marigold-ui.io">
        Breadcrumb1
      </Breadcrumbs.Item>
      <Breadcrumbs.Item href="https://marigold-ui.io">
        Breadcrumb2
      </Breadcrumbs.Item>
    </Breadcrumbs>
  ),
});

export const AutoCollapse = meta.story({
  parameters: { chromatic: { disableSnapshot: true } },
  tags: ['component-test'],
  render: args => (
    // Force English so the ellipsis aria-label is stable regardless of the
    // runner's system locale (otherwise it localizes, e.g. to German).
    <I18nProvider locale="en-US">
      <div className="border-border w-75 resize-x overflow-auto border p-2">
        <Breadcrumbs {...args}>
          <Breadcrumbs.Item href="#">Home</Breadcrumbs.Item>
          <Breadcrumbs.Item href="#">Events</Breadcrumbs.Item>
          <Breadcrumbs.Item href="#">Summer Festival</Breadcrumbs.Item>
          <Breadcrumbs.Item href="#">Event Details Page</Breadcrumbs.Item>
        </Breadcrumbs>
      </div>
    </I18nProvider>
  ),
});

AutoCollapse.test(
  'Collapses overflow items and reveals them under the ellipsis',
  {
    parameters: { chromatic: { disableSnapshot: false } },
  },
  async ({ canvas }) => {
    // The middle items collapse behind an ellipsis button at this width.
    const ellipsis = await canvas.findByRole('button', {
      name: 'These breadcrumbs are hidden',
    });

    await userEvent.click(ellipsis);

    await expect(
      await screen.findByRole('menuitem', { name: 'Events' })
    ).toBeInTheDocument();
    await expect(
      screen.getByRole('menuitem', { name: 'Summer Festival' })
    ).toBeInTheDocument();
  }
);
