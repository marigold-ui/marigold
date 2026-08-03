import type { ReactNode } from 'react';
import { Provider } from 'react-aria-components/slots';
import { ButtonContext as MarigoldButtonContext } from '../Button/Context';
import { useListViewContext } from './Context';

export interface ListViewActionsProps {
  /**
   * The row's trailing controls: a `<Switch>`, an icon `<Button>`, an
   * `<ActionMenu>`, or several of them side by side.
   */
  children: ReactNode;
}

// A trailing action in a row is low-emphasis chrome, so a nested Marigold
// `<Button>`/`<IconButton>`/`<ActionMenu>` defaults to `ghost` (a local
// `variant` still wins). Mirrors `SelectList.Option`'s cascade.
const ITEM_BUTTON_CASCADE = { variant: 'ghost' };

/**
 * The trailing region of a `<ListView.Item>`, holding the controls the user
 * operates in place.
 *
 * It's a region rather than a per-control slot context because a `<Switch>`
 * reads no context of its own, and because several controls in one row have
 * to sit side by side — a single grid cell can't lay out more than one child.
 */
export const ListViewActions = ({ children }: ListViewActionsProps) => {
  const { classNames } = useListViewContext();

  return (
    <Provider values={[[MarigoldButtonContext, ITEM_BUTTON_CASCADE]]}>
      <div data-grid-area="actions" className={classNames?.action}>
        {children}
      </div>
    </Provider>
  );
};
