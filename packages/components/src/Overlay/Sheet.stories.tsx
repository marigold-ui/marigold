import { createRef, useState } from 'react';
import { expect, waitFor } from 'storybook/test';
import preview from '.storybook/preview';
import { Button } from '../Button/Button';
import { Sheet } from './Sheet';

const meta = preview.meta({
  title: 'Components/Sheet',
  component: Sheet,
  // Internal primitive, no docs page.
  tags: ['!autodocs'],
  // Portals the overlay into the canvas, so the tests can query it.
  decorators: [
    Story => (
      <div id="storybook-root">
        <Story />
      </div>
    ),
  ],
  parameters: {
    chromatic: { disableSnapshot: true },
  },
  globals: {
    viewport: { value: 'smallScreen' },
  },
});

export const Basic = meta.story({
  tags: ['component-test'],
  render: args => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button onPress={() => setOpen(true)}>Open sheet</Button>
        <Sheet aria-label="Sheet" {...args} open={open} onOpenChange={setOpen}>
          <p>Sheet content</p>
          <Button slot="close">Close</Button>
        </Sheet>
        <p>Sheet is {open ? 'open' : 'closed'}</p>
      </>
    );
  },
});

interface SheetTestContext {
  canvas: {
    getByRole: (role: string, options?: { name: string }) => HTMLElement;
  };
  userEvent: { click: (element: Element) => Promise<void> };
}

// RAC moves focus into the sheet once it has slid in.
const openSheet = async ({ canvas, userEvent }: SheetTestContext) => {
  await userEvent.click(canvas.getByRole('button', { name: 'Open sheet' }));
  const dialog = await waitFor(() => canvas.getByRole('dialog'));
  await waitFor(() => expect(dialog).toHaveFocus());

  return dialog;
};

Basic.test(
  'Opens and closes through open and onOpenChange',
  async ({ canvas, userEvent }) => {
    await openSheet({ canvas, userEvent });

    await userEvent.click(canvas.getByRole('button', { name: 'Close' }));

    await waitFor(() =>
      expect(canvas.queryByRole('dialog')).not.toBeInTheDocument()
    );
    expect(canvas.getByText('Sheet is closed')).toBeInTheDocument();
  }
);

Basic.test(
  'Closes on Escape and on a press outside',
  async ({ canvas, userEvent, step }) => {
    await step('Escape', async () => {
      await openSheet({ canvas, userEvent });

      await userEvent.keyboard('{Escape}');

      await waitFor(() =>
        expect(canvas.queryByRole('dialog')).not.toBeInTheDocument()
      );
    });

    await step('press outside', async () => {
      await openSheet({ canvas, userEvent });

      await userEvent.click(document.body);

      await waitFor(() =>
        expect(canvas.queryByRole('dialog')).not.toBeInTheDocument()
      );
    });
  }
);

Basic.test(
  'Ignores Escape and a press outside when not dismissable',
  { args: { dismissable: false } },
  async ({ canvas, userEvent }) => {
    await openSheet({ canvas, userEvent });

    await userEvent.keyboard('{Escape}');
    await userEvent.click(document.body);

    expect(canvas.getByRole('dialog')).toBeInTheDocument();
    expect(canvas.getByText('Sheet is open')).toBeInTheDocument();
  }
);

const sheetRef = createRef<HTMLElement>();

Basic.test(
  'Forwards the ref to the dialog',
  { args: { ref: sheetRef } },
  async ({ canvas, userEvent }) => {
    const dialog = await openSheet({ canvas, userEvent });

    expect(sheetRef.current).toBe(dialog);
  }
);

Basic.test(
  'Caps its height at 95% of the visible viewport',
  async ({ canvas, userEvent }) => {
    const dialog = await openSheet({ canvas, userEvent });

    const viewport = window.visualViewport?.height ?? window.innerHeight;
    expect(parseFloat(getComputedStyle(dialog).maxHeight)).toBeCloseTo(
      viewport * 0.95,
      0
    );
  }
);
