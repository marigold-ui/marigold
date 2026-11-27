import { createRef, useRef, useState } from 'react';
import { expect, waitFor } from 'storybook/test';
import { keepSheetsOpenInChromatic } from '.storybook/chromatic';
import preview from '.storybook/preview';
import { Button } from '../Button/Button';
import { useAutoFocus } from '../utils/useAutoFocus';
import { Sheet } from './Sheet';

const meta = preview.meta({
  beforeEach: keepSheetsOpenInChromatic,
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
  'Finishes the slide-in when the browser never fires scrollend',
  async ({ canvas, userEvent }) => {
    // Safari before 26.2 has no `scrollend`, and RAC's slide-in waits for it.
    const swallow = (event: Event) => {
      if (event.isTrusted) event.stopImmediatePropagation();
    };
    window.addEventListener('scrollend', swallow, true);

    try {
      await userEvent.click(canvas.getByRole('button', { name: 'Open sheet' }));
      const dialog = await waitFor(() => canvas.getByRole('dialog'));

      await waitFor(() => expect(dialog).toHaveFocus(), { timeout: 2000 });
      // RAC hides the page behind from screen readers with `inert`.
      await waitFor(() =>
        expect(
          canvas.getByRole('button', { name: 'Open sheet' })
        ).toHaveAttribute('inert')
      );
      await userEvent.keyboard('{Escape}');

      await waitFor(() =>
        expect(canvas.queryByRole('dialog')).not.toBeInTheDocument()
      );
    } finally {
      window.removeEventListener('scrollend', swallow, true);
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

// `keepSheetsOpenInChromatic` and `Sheet` key on these private RAC attributes.
Basic.test(
  'Marks the open sheet with the attributes RAC uses internally',
  async ({ canvas, userEvent }) => {
    const dialog = await openSheet({ canvas, userEvent });

    const content = dialog.closest('[data-sheet-content]');
    expect(content).not.toBeNull();
    expect(content?.closest('[data-sheet-scroll]')).not.toBeNull();
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

const AutoFocusField = () => {
  const ref = useRef<HTMLInputElement>(null);
  useAutoFocus(ref);

  return <input ref={ref} aria-label="Search" />;
};

export const WithAutoFocusField = meta.story({
  tags: ['component-test'],
  render: function Render() {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button onPress={() => setOpen(true)}>Open sheet</Button>
        <Sheet aria-label="Sheet" open={open} onOpenChange={setOpen}>
          <AutoFocusField />
        </Sheet>
      </>
    );
  },
});

WithAutoFocusField.test(
  'Focuses the field only once the sheet is on screen',
  async ({ canvas, userEvent }) => {
    // On a phone, focus opens the keyboard, which scrolls the page to the field.
    let bottomAtFocus = Infinity;
    const record = (event: FocusEvent) => {
      if ((event.target as Element).matches('input')) {
        bottomAtFocus = (event.target as Element).getBoundingClientRect()
          .bottom;
      }
    };
    document.addEventListener('focusin', record);

    try {
      await userEvent.click(canvas.getByRole('button', { name: 'Open sheet' }));

      await waitFor(() =>
        expect(canvas.getByLabelText('Search')).toHaveFocus()
      );
      expect(bottomAtFocus).toBeLessThanOrEqual(window.innerHeight);
    } finally {
      document.removeEventListener('focusin', record);
    }
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

Basic.test(
  'A bottom sheet shows a drag handle above its content',
  async ({ canvas, userEvent }) => {
    const dialog = await openSheet({ canvas, userEvent });
    const handle = dialog.firstElementChild as HTMLElement;

    // Decorative and empty, the whole sheet is swipeable.
    expect(handle).toBeEmptyDOMElement();
    expect(handle.getBoundingClientRect().height).toBeGreaterThan(0);
    expect(handle.nextElementSibling).toHaveTextContent('Sheet content');
  }
);

Basic.test(
  'A start sheet has no drag handle',
  { args: { position: 'start' } },
  async ({ canvas, userEvent }) => {
    const dialog = await openSheet({ canvas, userEvent });

    expect(dialog.firstElementChild).toHaveTextContent('Sheet content');
  }
);

Basic.test(
  'From the start edge it fills the screen and shrinks above the keyboard',
  { args: { position: 'start' } },
  async ({ canvas, userEvent, step }) => {
    const dialog = await openSheet({ canvas, userEvent });
    // RAC's `Sheet`, the surface. Its overscroll padding reaches a viewport
    // past the edge, so the dialog is what is on screen.
    const surface = dialog.parentElement as HTMLElement;
    const layoutBottom = document.documentElement.clientHeight;

    await step('slides in from the left and fills the screen', async () => {
      expect(surface).toHaveAttribute('data-position', 'left');
      expect(getComputedStyle(dialog).maxHeight).toBe('none');
      await waitFor(() => {
        const { left, top, width, bottom } = dialog.getBoundingClientRect();
        expect(left).toBeCloseTo(0, 0);
        expect(top).toBeCloseTo(0, 0);
        // One pixel short of the far edge, so RAC sees it leave (see Sheet).
        expect(width).toBeCloseTo(document.documentElement.clientWidth - 1, 0);
        expect(bottom).toBeCloseTo(layoutBottom, 0);
      });
    });

    const closeKeyboard = openKeyboard(300);
    try {
      await step('keyboard open: top stays, bottom clears it', async () => {
        await waitFor(() =>
          expect(dialog.getBoundingClientRect().bottom).toBeCloseTo(
            layoutBottom - 300,
            0
          )
        );
        expect(dialog.getBoundingClientRect().top).toBeCloseTo(0, 0);
        expect(surface.getBoundingClientRect().bottom).toBeCloseTo(
          layoutBottom - 300,
          0
        );
      });
    } finally {
      closeKeyboard();
    }
  }
);

Basic.test(
  'From the start edge it unmounts after Escape and the close button',
  { args: { position: 'start' } },
  async ({ canvas, userEvent, step }) => {
    // A full-width start sheet used to stop on the viewport edge, where RAC's
    // observer never reports it gone, and its overlay stayed over the page.
    const gone = () =>
      waitFor(() =>
        expect(document.querySelector('[data-sheet-scroll]')).toBeNull()
      );

    await step('Escape', async () => {
      await openSheet({ canvas, userEvent });
      await userEvent.keyboard('{Escape}');
      await gone();
    });

    await step('close button', async () => {
      await openSheet({ canvas, userEvent });
      await userEvent.click(canvas.getByRole('button', { name: 'Close' }));
      await gone();
    });

    expect(canvas.getByRole('button', { name: 'Open sheet' })).toHaveFocus();
  }
);

Basic.test(
  'From the start edge a swipe back to it closes the sheet',
  { args: { position: 'start' } },
  async ({ canvas, userEvent }) => {
    const dialog = await openSheet({ canvas, userEvent });
    const scroller = dialog.closest<HTMLElement>('[data-sheet-scroll]')!;

    // Focus can land before the slide-in ends. RAC marks the sheet expanded
    // once its own observer has seen it fully on screen, which is also when
    // a swipe can close it.
    await waitFor(() =>
      expect(dialog.parentElement).toHaveAttribute('data-expanded')
    );
    // A swipe is a native scroll: at rest at 0, gone at the far end.
    expect(scroller.scrollLeft).toBeCloseTo(0, 0);
    scroller.scrollTo({ left: scroller.scrollWidth });

    await waitFor(() =>
      expect(canvas.queryByRole('dialog')).not.toBeInTheDocument()
    );
    expect(canvas.getByText('Sheet is closed')).toBeInTheDocument();
  }
);
