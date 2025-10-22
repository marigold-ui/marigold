import { ReactNode } from 'react';
import type RAC from 'react-aria-components';
import { DropZone } from 'react-aria-components';
import { useLocale } from '@react-aria/i18n';
import { type FieldBaseProps, FileTrigger } from '@marigold/components';
import type { WidthProp } from '@marigold/system';
import { FileFieldItem } from './FileFieldItem';
import { isFileDropItem, normalizeAndLimitFiles } from './fileUtils';

type RemovedProps =
  | 'className'
  | 'style'
  | 'children'
  | 'isDisabled'
  | 'isRequired';

export interface FileFieldProps
  extends Omit<RAC.DropZoneProps, RemovedProps>,
    Pick<FieldBaseProps<'label'>, 'label' | 'description' | 'errorMessage'> {
  variant?: string;
  size?: string;

  /**
   * Sets the width of the field. You can see allowed tokens here: https://tailwindcss.com/docs/width
   * @default full
   */
  width?: WidthProp['width'];

  /**
   * Disables the trigger.
   * @default false
   */
  disabled?: RAC.DropZoneProps['isDisabled'];

  /**
   * Accepted file types for selection, passed through to the underlying input.
   */
  acceptedFileTypes?: RAC.FileTriggerProps['acceptedFileTypes'];

  /**
   * Whether multiple files can be selected.
   */
  allowsMultiple?: RAC.FileTriggerProps['allowsMultiple'];

  /**
   * Unified change handler called with a list of File objects regardless of whether
   * the user selected files via the file picker or dropped them in the drop zone.
   */
  onChange?: (files: File[]) => void;

  /**
   * Optional label shown inside the DropZone before the trigger.
   */
  dropZoneLabel?: ReactNode;

  /**
   * Optional description shown inside the DropZone before the trigger.
   * Ignored if no dropZoneLabel is set.
   */
  dropZoneDescription?: ReactNode;

  /**
   * Custom trigger element. If not provided, a default Button is rendered.
   */
  children?: ReactNode;
}

// Component
// ---------------
export const FileField = ({
  disabled,
  acceptedFileTypes,
  allowsMultiple,
  onChange,
  children,
}: FileFieldProps) => {
  const { locale } = useLocale();
  const dropZoneLabel =
    locale == 'de-DE' ? 'Dateien hierher ziehen' : 'Drop files here';
  const buttonLabel = locale == 'de-DE' ? 'Hochladen' : 'Upload';

  const handleSelect: RAC.FileTriggerProps['onSelect'] = files => {
    if (!onChange) return;

    const list = files ? Array.from(files) : [];
    onChange(
      normalizeAndLimitFiles(list, { acceptedFileTypes, allowsMultiple })
    );
  };

  const handleDrop: RAC.DropZoneProps['onDrop'] = async e => {
    if (!onChange) return;

    try {
      const filePromises = e.items
        .filter(isFileDropItem)
        .map(item => (item as any).getFile());
      const raw = await Promise.all(filePromises);
      const files = raw.filter(Boolean) as File[];
      onChange(
        normalizeAndLimitFiles(files, { acceptedFileTypes, allowsMultiple })
      );
    } catch {
      // swallow errors from reading dropped items
    }
  };

  const fileTriggerProps: RAC.FileTriggerProps = {
    acceptedFileTypes,
    allowsMultiple,
    onSelect: handleSelect,
  };

  return (
    <div className="space-y-2">
      <DropZone
        onDrop={handleDrop}
        isDisabled={disabled}
        className="data-[drop-target=true]:bg-muted border-input has-[input:focus]:border-ring has-[input:focus]:ring-ring/50 relative flex min-h-52 flex-col items-center overflow-hidden rounded-xl border border-dashed p-4 transition-colors not-data-[files]:justify-center has-[input:focus]:ring-[3px]"
      >
        <div className="flex flex-col items-center justify-center gap-2 px-4 py-3 text-center">
          <p className="text-sm font-medium">{dropZoneLabel}</p>
          <FileTrigger
            {...fileTriggerProps}
            label={buttonLabel}
            disabled={disabled}
          />
        </div>
      </DropZone>
      {children}
    </div>
  );
};

FileField.Item = FileFieldItem;
