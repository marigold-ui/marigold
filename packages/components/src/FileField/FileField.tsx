import { useState } from 'react';
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
}

// Component
// ---------------
export const FileField = ({
  disabled,
  acceptedFileTypes,
  allowsMultiple,
}: FileFieldProps) => {
  const [files, setFiles] = useState<File[] | null>(null);
  const { locale } = useLocale();
  const dropZoneLabel =
    locale == 'de-DE' ? 'Dateien hierher ziehen' : 'Drop files here';
  const buttonLabel = locale == 'de-DE' ? 'Hochladen' : 'Upload';

  const handleSelect: RAC.FileTriggerProps['onSelect'] = files => {
    const list = files ? Array.from(files) : [];
    setFiles(
      normalizeAndLimitFiles(list, { acceptedFileTypes, allowsMultiple })
    );
  };

  const handleDrop: RAC.DropZoneProps['onDrop'] = async e => {
    try {
      const filePromises = e.items
        .filter(isFileDropItem)
        .map(item => (item as any).getFile());
      const raw = await Promise.all(filePromises);
      const files = raw.filter(Boolean) as File[];

      setFiles(
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
      {files?.map((file, index) => (
        <FileField.Item
          key={index}
          onRemove={() =>
            setFiles(prev => (prev ?? []).filter((_, i) => i !== index))
          }
        >
          <div className="flex min-w-0 flex-col gap-0.5">
            <p className="truncate text-[13px] font-medium">{file.name}</p>
            <p className="text-muted-foreground text-xs">
              {Math.round(file.size / 1024).toFixed(2)} KB
            </p>
          </div>
        </FileField.Item>
      ))}
    </div>
  );
};

FileField.Item = FileFieldItem;
