import type { FormEvent, FormHTMLAttributes, ReactNode } from 'react';
import { useLayoutEffect, useRef, useState } from 'react';
import {
  Cell,
  Popover as RACPopover,
  useTableOptions,
} from 'react-aria-components';
import { useLocalizedStringFormatter } from '@react-aria/i18n';
import { cn, textAlign, useSmallScreen } from '@marigold/system';
import { Button } from '../Button/Button';
import { Dialog } from '../Dialog/Dialog';
import { Form } from '../Form/Form';
import { Check } from '../icons/Check';
import { Pencil } from '../icons/Pencil';
import { X } from '../icons/X';
import { intlMessages } from '../intl/messages';
import { useTableViewContext } from './Context';
import { TableViewSelectableCell } from './TableViewSelectableCell';

// Props
// ---------------
export interface TableViewEditableCellProps {
  /**
   * Display content shown when the cell is not being edited.
   */
  children: ReactNode;
  /**
   * Render function that returns the editing UI (e.g. TextField, Picker).
   * Called when the edit popover/dialog opens.
   */
  renderEditing: () => ReactNode;
  /**
   * Whether the cell is currently saving. Shows a loading indicator on the save button.
   * @default false
   */
  saving?: boolean;
  /**
   * Called when the editing form is submitted, either via the save button or outside click.
   */
  onSubmit?: (e: FormEvent<HTMLFormElement>) => void;
  /**
   * Called when the user cancels editing via the cancel button.
   */
  onCancel?: () => void;
  /**
   * Whether editing is disabled. Hides the edit trigger button.
   * @default false
   */
  disabled?: boolean;
  /**
   * The action to submit the form to. Supports React 19 form actions.
   */
  action?: string | FormHTMLAttributes<HTMLFormElement>['action'];
  /**
   * Horizontal text alignment of the cell content.
   * @default 'left'
   */
  align?: keyof typeof textAlign;
}

// Component
// ---------------
export const TableViewEditableCell = ({
  children,
  renderEditing,
  saving = false,
  onSubmit,
  onCancel,
  disabled = false,
  action,
  align = 'left',
}: TableViewEditableCellProps) => {
  const {
    classNames,
    overflow = 'wrap',
    allowTextSelection = false,
  } = useTableViewContext();
  const { selectionMode } = useTableOptions();
  const isSmallScreen = useSmallScreen();
  const stringFormatter = useLocalizedStringFormatter(intlMessages);

  const [open, setOpen] = useState(false);
  const submittedRef = useRef(false);
  const cellRef = useRef<HTMLTableCellElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  const [triggerWidth, setTriggerWidth] = useState(0);
  const [verticalOffset, setVerticalOffset] = useState(0);

  // Compute popover positioning based on cell dimensions
  useLayoutEffect(() => {
    if (!open || !cellRef.current) {
      return;
    }
    const cell = cellRef.current;
    const rect = cell.getBoundingClientRect();
    const rowRect = cell.parentElement?.getBoundingClientRect();
    const offset = (rowRect?.top ?? 0) - (rowRect?.bottom ?? 0);

    setTriggerWidth(rect.width);
    setVerticalOffset(offset);
  }, [open]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    submittedRef.current = true;
    onSubmit?.(e);
    setOpen(false);
  };

  const handleCancel = () => {
    submittedRef.current = true;
    onCancel?.();
    setOpen(false);
  };

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen && !submittedRef.current) {
      // Closed by outside click — treat as submit
      const form = cellRef.current?.querySelector('form');
      if (form) {
        form.requestSubmit();
        return;
      }
    }
    submittedRef.current = false;
    setOpen(isOpen);
  };

  const formContent = (
    <Form unstyled action={action} onSubmit={handleSubmit}>
      <div className="flex flex-col gap-2 p-2">
        <div>{renderEditing()}</div>
        <div className="flex justify-end gap-1">
          <Button
            variant="ghost"
            size="small"
            type="button"
            onPress={handleCancel}
            aria-label="Cancel"
          >
            <X size={16} />
            {isSmallScreen && 'Cancel'}
          </Button>
          <Button
            variant="primary"
            size="small"
            type="submit"
            loading={saving}
            aria-label="Save"
          >
            <Check size={16} />
            {isSmallScreen && 'Save'}
          </Button>
        </div>
      </div>
    </Form>
  );

  return (
    <Cell
      ref={cellRef}
      className={cn(
        classNames.cell,
        textAlign[align],
        overflow === 'truncate' ? 'max-w-0 truncate' : 'wrap-break-word'
      )}
    >
      <div className="group/editable-cell flex items-center gap-1">
        <div className="min-w-0 flex-1">
          {allowTextSelection && selectionMode !== 'none' ? (
            <TableViewSelectableCell>{children}</TableViewSelectableCell>
          ) : (
            children
          )}
        </div>
        {!disabled && (
          <div className="shrink-0 opacity-0 group-focus-within/editable-cell:opacity-100 group-hover/editable-cell:opacity-100">
            <Button
              variant="ghost"
              size="small"
              aria-label={stringFormatter.format('edit')}
              onPress={() => setOpen(true)}
            >
              <Pencil />
            </Button>
          </div>
        )}
      </div>
      {isSmallScreen ? (
        <Dialog open={open} onOpenChange={handleOpenChange}>
          {formContent}
        </Dialog>
      ) : (
        <RACPopover
          ref={popoverRef}
          isOpen={open}
          onOpenChange={handleOpenChange}
          triggerRef={cellRef}
          offset={verticalOffset}
          placement="bottom start"
          style={{
            minWidth: triggerWidth,
          }}
          className="bg-background rounded-lg border shadow-md"
        >
          {formContent}
        </RACPopover>
      )}
    </Cell>
  );
};
