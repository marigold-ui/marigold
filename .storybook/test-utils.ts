import { userEvent, waitFor } from 'storybook/test';

/**
 * Clicks an option inside a virtualized popover list.
 *
 * While the virtualizer scrolls — which it does when it measures its rows and
 * brings the focused option into view after opening — react-aria sets
 * `pointer-events: none` on its content wrapper, and `userEvent.click()` refuses
 * to interact with such an element and throws. Retry the click itself inside
 * `waitFor` rather than checking `pointer-events` and clicking as two separate
 * steps: any scroll landing between those steps reopens the same window this
 * is meant to close.
 *
 * Takes a getter rather than an element: the virtualizer re-renders its rows as
 * it measures them, so a node captured up front can be detached by the time the
 * list settles.
 */
export const clickOption = async (getOption: () => HTMLElement) => {
  await waitFor(() => userEvent.click(getOption()));
};
