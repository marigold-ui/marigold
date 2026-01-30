import type {
  FormEvent,
  FormHTMLAttributes,
  ReactNode,
  RefObject,
} from 'react';
import { useLayoutEffect, useRef, useState } from 'react';
import { Cell, Popover, useTableOptions } from 'react-aria-components';
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

// EditableCellPopover
// ---------------
interface EditableCellPopoverProps {
  cellRef: RefObject<HTMLTableCellElement | null>;
  open: boolean;
  onOpenChange: (isOpen: boolean) => void;
  children: ReactNode;
}

const EditableCellPopover = ({
  cellRef,
  open,
  onOpenChange,
  children,
}: EditableCellPopoverProps) => {
  const popoverRef = useRef<HTMLDivElement>(null);
  const [triggerWidth, setTriggerWidth] = useState(0);
  const [tableWidth, setTableWidth] = useState(0);
  const [verticalOffset, setVerticalOffset] = useState(0);

  // Position the popover correctly on top of the cell and matching its width
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
    setTableWidth(cell.closest('[role="grid"]')?.clientWidth ?? 0);
  }, [cellRef, open]);

  return (
    <Popover
      ref={popoverRef}
      isOpen={open}
      onOpenChange={onOpenChange}
      triggerRef={cellRef}
      offset={verticalOffset}
      placement="bottom start"
      style={{
        minWidth: `min(${triggerWidth}px, ${tableWidth}px)`,
        maxWidth: tableWidth,
      }}
      className="bg-background rounded-lg border shadow-md"
    >
      {children}
    </Popover>
  );
};

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
      // Closed by outside click, treat as cancel
      onCancel?.();
    }
    submittedRef.current = false;
    setOpen(isOpen);
  };

  const formContent = (
    <Form unstyled action={action} onSubmit={handleSubmit}>
      <div className="flex gap-2 px-2 py-1">
        <div className="flex-1">{renderEditing()}</div>
        <div className="flex justify-end gap-1">
          <Button
            variant="ghost"
            onPress={handleCancel}
            aria-label={
              isSmallScreen ? undefined : stringFormatter.format('cancel')
            }
          >
            {isSmallScreen ? stringFormatter.format('cancel') : <X size={16} />}
          </Button>
          <Button
            variant="ghost"
            type="submit"
            loading={saving}
            aria-label={
              isSmallScreen ? undefined : stringFormatter.format('save')
            }
          >
            {isSmallScreen ? (
              stringFormatter.format('save')
            ) : (
              <Check size={16} />
            )}
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
        <EditableCellPopover
          cellRef={cellRef}
          open={open}
          onOpenChange={handleOpenChange}
        >
          {formContent}
        </EditableCellPopover>
      )}
    </Cell>
  );
};
