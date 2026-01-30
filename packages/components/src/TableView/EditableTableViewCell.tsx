import type { FormEvent, ReactNode } from 'react';
import { useRef, useState } from 'react';
import {
  Cell,
  Button as RACButton,
  useTableOptions,
} from 'react-aria-components';
import { cn, textAlign, useSmallScreen } from '@marigold/system';
import { Button } from '../Button/Button';
import { Dialog } from '../Dialog/Dialog';
import { Popover } from '../Overlay/Popover';
import { Check } from '../icons/Check';
import { Pencil } from '../icons/Pencil';
import { X } from '../icons/X';
import { useTableViewContext } from './Context';
import { TableViewSelectableCell } from './TableViewSelectableCell';

// Props
// ---------------
export interface EditableTableViewCellProps {
  children: ReactNode;
  renderEditing: () => ReactNode;
  saving?: boolean;
  onSubmit?: (e: FormEvent<HTMLFormElement>) => void;
  onCancel?: () => void;
  disabled?: boolean;
  align?: keyof typeof textAlign;
}

// Component
// ---------------
export const EditableTableViewCell = ({
  children,
  renderEditing,
  saving = false,
  onSubmit,
  onCancel,
  disabled = false,
  align = 'left',
}: EditableTableViewCellProps) => {
  const {
    classNames,
    overflow = 'wrap',
    allowTextSelection = false,
  } = useTableViewContext();
  const { selectionMode } = useTableOptions();
  const isSmallScreen = useSmallScreen();

  const [open, setOpen] = useState(false);
  const submittedRef = useRef(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

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
      const form = document.querySelector(
        '[data-editable-cell-form]'
      ) as HTMLFormElement | null;
      if (form) {
        form.requestSubmit();
        return;
      }
    }
    submittedRef.current = false;
    setOpen(isOpen);
  };

  const formContent = (
    <form
      data-editable-cell-form=""
      onSubmit={handleSubmit}
      className="flex flex-col gap-2 p-2"
    >
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
    </form>
  );

  return (
    <Cell
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
          <RACButton
            ref={triggerRef}
            className="hover:bg-secondary flex size-6 shrink-0 cursor-pointer items-center justify-center rounded opacity-0 group-focus-within/editable-cell:opacity-100 group-hover/editable-cell:opacity-100"
            aria-label="Edit"
            onPress={() => setOpen(true)}
          >
            <Pencil size={14} />
          </RACButton>
        )}
      </div>
      {isSmallScreen ? (
        <Dialog open={open} onOpenChange={handleOpenChange} closeButton>
          {formContent}
        </Dialog>
      ) : (
        <Popover
          triggerRef={triggerRef}
          open={open}
          onOpenChange={handleOpenChange}
          placement="bottom start"
        >
          {formContent}
        </Popover>
      )}
    </Cell>
  );
};
