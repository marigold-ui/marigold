import type {
  FormEvent,
  FormHTMLAttributes,
  ReactNode,
  RefObject,
} from 'react';
import { useLayoutEffect, useRef, useState } from 'react';
import { Cell, Popover } from 'react-aria-components';
import { useLocalizedStringFormatter } from '@react-aria/i18n';
import { cn, textAlign, useSmallScreen, verticalAlign } from '@marigold/system';
import { Button } from '../Button/Button';
import { Dialog } from '../Dialog/Dialog';
import { Form } from '../Form/Form';
import { Check } from '../icons/Check';
import { Pencil } from '../icons/Pencil';
import { X } from '../icons/X';
import { intlMessages } from '../intl/messages';
import { useTableContext } from './Context';
import { TableSelectableCell } from './TableSelectableCell';

// Props
// ---------------
export interface TableEditableCellProps {
  /**
   * Display content shown when the cell is not being edited.
   */
  children: ReactNode;
  /**
   * Form field shown when editing the cell. Make sure fields have a
   * "name" attribute to allow form data extraction via when submited.
   *
   * The field is automatically wrapped in a form and shown in a popover (desktop)
   * or dialog (mobile). Submission is handled via `onSubmit` or `action`.
   */
  field: ReactNode | (() => ReactNode);
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
  /**
   * Text overflow behavior for this specific cell. Overrides the table-level overflow setting.
   * @default undefined (inherits from table)
   */
  overflow?: 'truncate' | 'wrap';
  /**
   * Vertical alignment of cell content. Overrides the table-level verticalAlign setting.
   * @default undefined (inherits from table)
   */
  verticalAlign?: keyof typeof verticalAlign;
}

// EditableCellPopover
// ---------------
interface EditableCellPopoverProps {
  cellRef: RefObject<HTMLTableCellElement | null>;
  open: boolean;
  onOpenChange: (isOpen: boolean) => void;
  className?: string;
  children: ReactNode;
}

const EditableCellPopover = ({
  cellRef,
  open,
  onOpenChange,
  className,
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
      className={className}
    >
      {children}
    </Popover>
  );
};

// Component
// ---------------
export const TableEditableCell = ({
  children,
  field,
  saving = false,
  onSubmit,
  onCancel,
  disabled = false,
  action,
  align = 'left',
  overflow: cellOverflow,
  verticalAlign: cellVerticalAlign,
}: TableEditableCellProps) => {
  const {
    classNames,
    overflow: tableOverflow = 'wrap',
    allowTextSelection = false,
    verticalAlign: tableVerticalAlign = 'middle',
  } = useTableContext();
  const isSmallScreen = useSmallScreen();
  const stringFormatter = useLocalizedStringFormatter(intlMessages);

  // Cell-level overrides table-level
  const overflow = cellOverflow ?? tableOverflow;
  const vAlign = cellVerticalAlign ?? tableVerticalAlign;

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

  const renderField = () => (typeof field === 'function' ? field() : field);

  const cancelButton = (
    <Button
      variant="ghost"
      onPress={handleCancel}
      aria-label={isSmallScreen ? undefined : stringFormatter.format('cancel')}
    >
      {isSmallScreen ? stringFormatter.format('cancel') : <X size={16} />}
    </Button>
  );

  const saveButton = (
    <Button
      variant="ghost"
      type="submit"
      loading={saving}
      aria-label={isSmallScreen ? undefined : stringFormatter.format('save')}
    >
      {isSmallScreen ? stringFormatter.format('save') : <Check size={16} />}
    </Button>
  );

  return (
    <Cell
      ref={cellRef}
      className={cn(
        classNames.cell,
        textAlign[align],
        verticalAlign[vAlign],
        overflow === 'truncate' ? 'max-w-0 truncate' : 'wrap-break-word'
      )}
    >
      <div className="group/editable-cell flex items-center gap-1">
        <div className="min-w-0 flex-1">
          {allowTextSelection ? (
            <TableSelectableCell>{children}</TableSelectableCell>
          ) : (
            children
          )}
        </div>
        {!disabled && (
          <div className="shrink-0 opacity-0 not-[@media_((hover:_hover)_and_(pointer:_fine))]:opacity-100 [.group\/editable-cell:has(:focus-visible)_&]:opacity-100 [[role=row]:hover_&]:opacity-100">
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
          <Form unstyled action={action} onSubmit={handleSubmit}>
            <Dialog.Content>{renderField()}</Dialog.Content>
            <Dialog.Actions>
              {cancelButton}
              {saveButton}
            </Dialog.Actions>
          </Form>
        </Dialog>
      ) : (
        <EditableCellPopover
          cellRef={cellRef}
          open={open}
          onOpenChange={handleOpenChange}
          className={classNames.editablePopover}
        >
          <Form unstyled action={action} onSubmit={handleSubmit}>
            <div className="flex-1">{renderField()}</div>
            {cancelButton}
            {saveButton}
          </Form>
        </EditableCellPopover>
      )}
    </Cell>
  );
};
