/**
 * Dispatches a paste event carrying the given text on an element.
 *
 * Used by the date-input family (DateField, DatePicker, DateRangePicker): in a
 * real browser `userEvent.paste()` does not reliably reach React's `onPaste`
 * on ancestor elements, and clipboard `getData` can't be driven through
 * `userEvent`. We use `Object.defineProperty` because Firefox's
 * `ClipboardEvent` constructor ignores the `clipboardData` option.
 *
 * Lives in its own module (not `test.utils.tsx`) so story files can import it
 * without pulling in `vitest` — a bare `vitest` import in a story's graph
 * breaks the Storybook dev preview (`expect` realm / `customEqualityTesters`).
 */
export const firePaste = (element: Element, text: string) => {
  const pasteEvent = new Event('paste', {
    bubbles: true,
    cancelable: true,
  });
  Object.defineProperty(pasteEvent, 'clipboardData', {
    value: {
      getData: () => text,
    },
  });
  element.dispatchEvent(pasteEvent);
};
