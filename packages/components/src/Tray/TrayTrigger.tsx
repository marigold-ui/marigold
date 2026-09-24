import type RAC from 'react-aria-components';
import { DialogTrigger } from 'react-aria-components/Dialog';
import { useIsHiddenTree } from '../utils/useIsHiddenTree';

// Props
// ---------------
export interface TrayTriggerProps extends Omit<
  RAC.DialogTriggerProps,
  'isOpen'
> {
  /**
   * Whether the overlay is open (controlled).
   * @default false
   */
  open?: boolean;
}

// Component
// ---------------
export const TrayTrigger = ({ open, children, ...props }: TrayTriggerProps) => {
  const { isHidden, probe } = useIsHiddenTree();

  // RAC's `DialogTrigger` renders `null` during a collection's hidden pass
  // (since 1.21). A `Tray.Trigger` sits *inside* the collection components it
  // serves (`Select`, `ComboBox`, `Autocomplete`, `Calendar` presets), so
  // dropping it there drops the `<ListBox>` that holds the items and the
  // collection builds empty. Render the children bare instead, exactly like
  // `Tray` does, so the items still register.
  if (isHidden) {
    return children;
  }

  return (
    <>
      {probe}
      <DialogTrigger isOpen={open} {...props}>
        {children}
      </DialogTrigger>
    </>
  );
};
