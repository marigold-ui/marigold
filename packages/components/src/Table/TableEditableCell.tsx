import type {
  FormEvent,
  FormHTMLAttributes,
  ReactNode,
  RefObject,
} from 'react';
import { useCallback, useLayoutEffect, useRef, useState } from 'react';
import { Button } from 'react-aria-components/Button';
import { Popover } from 'react-aria-components/Popover';
import { Cell, useTableOptions } from 'react-aria-components/Table';
import { FocusScope } from '@react-aria/focus';
import { useLocalizedStringFormatter } from '@react-aria/i18n';
import {
  getActiveElement,
  getOwnerDocument,
  nodeContains,
} from '@react-aria/utils';
import { cn, textAlign, useSmallScreen, verticalAlign } from '@marigold/system';
import { Dialog } from '../Dialog/Dialog';
import { Form } from '../Form/Form';
import { Check } from '../icons/Check';
import { Pencil } from '../icons/Pencil';
import { X } from '../icons/X';
import { intlMessages } from '../intl/messages';
import { useTableContext } from './Context';
import { TableCellContent } from './TableCellContent';

// Props
// ---------------
export interface TableEditableCellProps {
  /**
   * Display content shown when the cell is not being edited.
   */
  children: ReactNode;
  /**
   * Form field shown when editing. Must include `name` attribute for form data.
   * Supports input elements like TextField, Select, etc.
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
  alignX?: keyof typeof textAlign;
  /**
   * Text overflow behavior for this specific cell. Overrides the table-level overflow setting.
   * @default undefined (inherits from table)
   */
  overflow?: 'truncate' | 'wrap';
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

// EditableCellInner
// ---------------
interface TableEditableCellInnerProps extends TableEditableCellProps {
  /**
   * Whether the table has selection enabled. Resolved in the outer cell because
   * `useTableOptions` is only available in React Aria's collection build pass.
   */
  hasSelection: boolean;
  /** Column index, provided by the `<Cell>` render prop. */
  columnIndex?: number | null;
  /** Ref to the `<Cell>`, used to position and anchor the editor popover. */
  cellRef: RefObject<HTMLTableCellElement | null>;
}

/**
 * Holds the editing state and renders the inline editor. This lives inside the
 * `<Cell>` render prop, i.e. in React Aria's collection *content* pass (the
 * live, portal-rendered tree). Keeping the state here rather than in the outer
 * `TableEditableCell` — which renders in React Aria's separate collection
 * *build* pass — is what makes inline editing work under SSR: the build pass's
 * rendered content is otherwise frozen to its server-render closures and never
 * reconnects after hydration, so the editor would not open until an unrelated
 * update happened to re-register the cell.
 */
const TableEditableCellInner = ({
  children,
  field,
  saving = false,
  onSubmit,
  onCancel,
  disabled = false,
  action,
  alignX,
  overflow: cellOverflow,
  hasSelection,
  columnIndex,
  cellRef,
}: TableEditableCellInnerProps) => {
  const { classNames } = useTableContext();
  const isSmallScreen = useSmallScreen();
  const stringFormatter = useLocalizedStringFormatter(intlMessages);

  const [open, setOpen] = useState(false);
  const submittedRef = useRef(false);
  const formRef = useRef<HTMLFormElement>(null);

  // Auto-select input/textarea content when popover/dialog opens
  const handleFormRef = useCallback((node: HTMLFormElement | null) => {
    formRef.current = node;
    if (node) {
      requestAnimationFrame(() => {
        const activeElement = getActiveElement(getOwnerDocument(node));
        if (
          activeElement &&
          nodeContains(node, activeElement) &&
          (activeElement instanceof HTMLInputElement ||
            activeElement instanceof HTMLTextAreaElement) &&
          typeof activeElement.select === 'function'
        ) {
          activeElement.select();
        }
      });
    }
  }, []);

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
      className={classNames.editCancel}
      onPress={handleCancel}
      aria-label={isSmallScreen ? undefined : stringFormatter.format('cancel')}
    >
      {isSmallScreen ? stringFormatter.format('cancel') : <X />}
    </Button>
  );

  const saveButton = (
    <Button
      className={classNames.editSave}
      type="submit"
      isPending={saving}
      aria-label={isSmallScreen ? undefined : stringFormatter.format('save')}
    >
      {isSmallScreen ? stringFormatter.format('save') : <Check />}
    </Button>
  );

  return (
    <>
      <div
        className={cn(
          'group/editable-cell flex items-center',
          !disabled && 'cursor-pointer'
        )}
        onClick={disabled ? undefined : () => setOpen(true)}
      >
        <TableCellContent
          columnIndex={columnIndex}
          alignX={alignX}
          cellOverflow={disabled ? cellOverflow : 'truncate'}
          className="min-w-0 flex-1"
          allowTextSelection={!hasSelection || undefined}
        >
          {children}
        </TableCellContent>
        {!disabled && (
          <div className="w-0 shrink-0 overflow-hidden group-has-[:focus-visible]/editable-cell:w-auto group-has-[:focus-visible]/editable-cell:overflow-visible [[role=row]:hover_&]:w-auto [[role=row]:hover_&]:overflow-visible">
            <Button
              className={classNames.editTrigger}
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
          <Form
            unstyled
            ref={handleFormRef}
            action={action}
            onSubmit={handleSubmit}
          >
            <Dialog.Title>{stringFormatter.format('editCell')}</Dialog.Title>
            <Dialog.Content>
              <FocusScope autoFocus restoreFocus>
                {renderField()}
              </FocusScope>
            </Dialog.Content>
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
          <Form
            unstyled
            ref={handleFormRef}
            action={action}
            onSubmit={handleSubmit}
          >
            <FocusScope autoFocus>
              {renderField()}
              {cancelButton}
              {saveButton}
            </FocusScope>
          </Form>
        </EditableCellPopover>
      )}
    </>
  );
};

// Component
// ---------------
export const TableEditableCell = (props: TableEditableCellProps) => {
  const { classNames, alignY = 'middle' } = useTableContext();
  // `useTableOptions` is only available in the collection build pass, so it is
  // read here (not in the content-pass inner) and passed down.
  const { selectionMode } = useTableOptions();
  const hasSelection = selectionMode !== 'none';
  const cellRef = useRef<HTMLTableCellElement>(null);

  return (
    <Cell ref={cellRef} className={cn(classNames.cell, verticalAlign[alignY])}>
      {({ columnIndex }) => (
        <TableEditableCellInner
          {...props}
          hasSelection={hasSelection}
          columnIndex={columnIndex}
          cellRef={cellRef}
        />
      )}
    </Cell>
  );
};
