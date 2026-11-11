import type { ReactNode } from 'react';
import { Children, isValidElement, useMemo } from 'react';
import { PressResponder } from '@react-aria/interactions';
import { useControlledState } from '@react-stately/utils';
import { useKeyboardShortcut } from '../utils/keyboardShortcut';
import { CommandPaletteTriggerContext } from './Context';

// Props
// ---------------
export interface CommandPaletteTriggerProps {
  /**
   * The palette and, optionally, the button that opens it: a
   * `CommandPalette.Button` or any other button.
   */
  children: ReactNode;

  /**
   * Whether the palette is open (controlled).
   */
  open?: boolean;

  /**
   * Whether the palette is open by default (uncontrolled).
   * @default false
   */
  defaultOpen?: boolean;

  /**
   * Handler that is called when the palette opens or closes.
   */
  onOpenChange?: (open: boolean) => void;

  /**
   * The key that opens the palette together with ⌘ (macOS) or Ctrl (elsewhere).
   * Pass `false` to disable the global shortcut, e.g. when the app already
   * uses the key.
   * @default 'k'
   */
  shortcut?: string | false;
}

// Component
// ---------------
// Holds the open state and the shortcut, like `Dialog.Trigger` holds a
// dialog's. Any pressable child opens the palette. The palette itself stays
// outside the press responder: rendered without a button, for a palette that
// opens by shortcut only, the responder would have no pressable child.
export const CommandPaletteTrigger = ({
  children,
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  shortcut = 'k',
}: CommandPaletteTriggerProps) => {
  const [open, setOpen] = useControlledState(
    openProp,
    defaultOpen,
    onOpenChange
  );
  useKeyboardShortcut(shortcut, () => setOpen(!open));

  const value = useMemo(
    () => ({ open, setOpen, shortcut }),
    [open, setOpen, shortcut]
  );

  // eslint-disable-next-line @eslint-react/no-children-to-array -- the palette has to sit outside the press responder, see above
  const parts = Children.toArray(children);
  const palette = parts.filter(isPalette);
  const pressables = parts.filter(part => !isPalette(part));

  return (
    <CommandPaletteTriggerContext value={value}>
      {pressables.length > 0 && (
        <PressResponder
          onPress={() => setOpen(true)}
          isPressed={false}
          aria-haspopup="dialog"
          aria-expanded={open}
        >
          {pressables}
        </PressResponder>
      )}
      {palette}
    </CommandPaletteTriggerContext>
  );
};

// Set by `CommandPalette`, so the trigger can tell the palette from a button
// without importing it (the palette imports the trigger).
export const PALETTE = Symbol.for('marigold.CommandPalette');

const isPalette = (node: ReactNode) =>
  isValidElement(node) &&
  typeof node.type !== 'string' &&
  PALETTE in (node.type as object);
