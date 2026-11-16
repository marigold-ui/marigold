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
  render: function Render(args) {
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
  'Ignores a press outside while it slides in',
  async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: 'Open sheet' }));
    await userEvent.click(document.body);

    const dialog = await waitFor(() => canvas.getByRole('dialog'));
    await waitFor(() => expect(dialog).toHaveFocus());
    expect(canvas.getByText('Sheet is open')).toBeInTheDocument();
  }
);

Basic.test(
  'Closes on a press outside when the slide-in never settles',
  async ({ canvas, userEvent }) => {
    // Safari before 26.2 has no `scrollend`, so RAC's slide-in never ends.
    const addEventListener = EventTarget.prototype.addEventListener;
    EventTarget.prototype.addEventListener = function (
      this: EventTarget,
      ...args: Parameters<typeof addEventListener>
    ) {
      if (args[0] !== 'scrollend') {
        addEventListener.apply(this, args);
      }
    };

    try {
      await userEvent.click(canvas.getByRole('button', { name: 'Open sheet' }));
      await waitFor(() => canvas.getByRole('dialog'));
      await new Promise(resolve => setTimeout(resolve, 1200));
      await userEvent.click(document.body);

      await waitFor(() =>
        expect(canvas.queryByRole('dialog')).not.toBeInTheDocument()
      );
    } finally {
      EventTarget.prototype.addEventListener = addEventListener;
    }
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
  'Defines --sheet-chrome before any content is pinned',
  async ({ canvas, userEvent }) => {
    const dialog = await openSheet({ canvas, userEvent });

    expect(
      getComputedStyle(dialog).getPropertyValue('--sheet-chrome').trim()
    ).toBe('0px');
  }
);

/** Names of all `@keyframes` rules the page's stylesheets define. */
const keyframeNames = () => {
  const names: string[] = [];
  const collect = (rules: CSSRuleList) => {
    for (const rule of Array.from(rules)) {
      if (rule instanceof CSSKeyframesRule) names.push(rule.name);
      if ('cssRules' in rule) collect((rule as CSSGroupingRule).cssRules);
    }
  };
  for (const sheet of Array.from(document.styleSheets)) {
    // Cross-origin sheets (the test runner's own) throw on `cssRules`.
    const sameOrigin = !sheet.href || sheet.href.startsWith(location.origin);
    if (sameOrigin) collect(sheet.cssRules);
  }

  return names;
};

Basic.test(
  'Ships the keyframes its backdrop fades with',
  async ({ canvas, userEvent }) => {
    await openSheet({ canvas, userEvent });

    // `swipeAnimation` names it only in JS, which Tailwind cannot see.
    const running = Array.from(document.body.querySelectorAll('*'))
      .flatMap(el => getComputedStyle(el).animationName.split(', '))
      .filter(name => name !== 'none');
    expect(running.length).toBeGreaterThan(0);
    for (const name of running) {
      expect(keyframeNames()).toContain(name);
    }
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

/**
 * Fakes an on-screen keyboard: the visual viewport shrinks by `height` while
 * the layout viewport stays, as on iOS. Returns a function that closes it.
 */
const openKeyboard = (height: number) => {
  const viewport = window.visualViewport;
  if (!viewport) {
    throw new Error('visualViewport is not supported');
  }
  const visible = document.documentElement.clientHeight - height;
  Object.defineProperty(viewport, 'height', {
    configurable: true,
    get: () => visible,
  });
  viewport.dispatchEvent(new Event('resize'));

  return () => {
    Reflect.deleteProperty(viewport, 'height');
    viewport.dispatchEvent(new Event('resize'));
  };
};

Basic.test(
  'Moves above the on-screen keyboard',
  async ({ canvas, userEvent, step }) => {
    const dialog = await openSheet({ canvas, userEvent });
    const close = canvas.getByRole('button', { name: 'Close' });
    const layoutBottom = document.documentElement.clientHeight;
    const closeKeyboard = openKeyboard(300);

    try {
      await step('keyboard open: the sheet sits above it', async () => {
        await waitFor(() =>
          expect(dialog.getBoundingClientRect().bottom).toBeCloseTo(
            layoutBottom - 300,
            0
          )
        );
        expect(close.getBoundingClientRect().bottom).toBeLessThanOrEqual(
          layoutBottom - 300
        );
        // The surface (RAC's `Sheet`, which carries the background) moves too.
        const surface = dialog.parentElement as HTMLElement;
        expect(surface.getBoundingClientRect().top).toBeCloseTo(
          dialog.getBoundingClientRect().top,
          0
        );
      });
    } finally {
      closeKeyboard();
    }

    await step('keyboard closed: back at the bottom', async () => {
      await waitFor(() =>
        expect(dialog.getBoundingClientRect().bottom).toBeCloseTo(
          layoutBottom,
          0
        )
      );
    });
  }
);
