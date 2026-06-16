import { useRef, useState } from 'react';
import type RAC from 'react-aria-components';
import { DropZone } from 'react-aria-components/DropZone';
import { useLocalizedStringFormatter } from '@react-aria/i18n';
import { WidthProp, cn, useClassNames } from '@marigold/system';
import { FieldBase, type FieldBaseProps } from '../FieldBase/FieldBase';
import { intlMessages } from '../intl/messages';
import { FileFieldItem } from './FileFieldItem';
import { FileTrigger } from './FileTrigger';
import { isFileDropItem, normalizeAndLimitFiles } from './fileUtils';

type RemovedProps =
  | 'className'
  | 'style'
  | 'children'
  | 'isDisabled'
  | 'isRequired';

export interface FileFieldProps
  extends
    Omit<RAC.DropZoneProps, RemovedProps>,
    Pick<FieldBaseProps<'input'>, 'label'> {
  variant?: string;
  size?: 'default' | 'small' | (string & {});

  /**
   * Sets the width of the field. You can see allowed tokens here: https://tailwindcss.com/docs/width
   *
   * Numeric/scale values are spacing-scale tokens, not pixels: `width={64}`
   * resolves to `calc(var(--spacing) * 64)` ~= 16rem (256px), not 64px.
   * @default full
   */
  width?: WidthProp['width'];

  /**
   * Disables the trigger.
   * @default false
   */
  disabled?: RAC.DropZoneProps['isDisabled'];

  /**
   * Accepted file types for selection.
   */
  accept?: RAC.FileTriggerProps['acceptedFileTypes'];

  /**
   * Whether multiple files can be selected.
   */
  multiple?: RAC.FileTriggerProps['allowsMultiple'];

  /**
   * The name of the field for form submission.
   */
  name?: string;
}

// Component
// ---------------
export const FileField = ({
  disabled = false,
  accept = ['*'],
  multiple = false,
  width,
  label,
  name,
  size,
  variant,
  ...props
}: FileFieldProps) => {
  const [files, setFiles] = useState<File[] | null>(null);
  const hiddenInputRef = useRef<HTMLInputElement>(null);
  const stringFormatter = useLocalizedStringFormatter(intlMessages);
  const dropZoneLabel = stringFormatter.format('dropZoneLabel');
  const buttonLabel = stringFormatter.format('uploadLabel');

  const syncHiddenInput = (newFiles: File[] | null) => {
    if (!hiddenInputRef.current || !name || typeof DataTransfer === 'undefined')
      return;
    const dt = new DataTransfer();
    newFiles?.forEach(f => dt.items.add(f));
    hiddenInputRef.current.files = dt.files;
  };

  const handleSelect: RAC.FileTriggerProps['onSelect'] = files => {
    const list = files ? Array.from(files) : [];
    const normalized = normalizeAndLimitFiles(list, { accept, multiple });
    setFiles(normalized);
    syncHiddenInput(normalized);
  };

  const handleDrop: RAC.DropZoneProps['onDrop'] = async e => {
    try {
      const filePromises = e.items
        .filter(isFileDropItem)
        .map(item => (item as RAC.FileDropItem).getFile());
      const raw = await Promise.all(filePromises);
      const files = raw.filter(Boolean) as File[];
      const normalized = normalizeAndLimitFiles(files, { accept, multiple });
      setFiles(normalized);
      syncHiddenInput(normalized);
    } catch {
      // Intentionally ignore - dropped files that can't be read are skipped.
      // User sees no file appear, which is acceptable UX for invalid drops.
    }
  };

  const fileTriggerProps: RAC.FileTriggerProps = {
    acceptedFileTypes: accept,
    allowsMultiple: multiple,
    onSelect: handleSelect,
  };

  const classNames = useClassNames({
    component: 'FileField',
    size,
    variant,
  });

  const isSmall = size === 'small';

  return (
    /* @ts-expect-error type intrinsic elements ("div") are not working correctly */
    <FieldBase
      as="div"
      width={width}
      label={label}
      className={classNames.container}
      {...props}
    >
      <div className="flex w-(--field-width) max-w-full min-w-0 flex-col gap-2">
        {isSmall ? (
          <FileTrigger
            {...fileTriggerProps}
            label={buttonLabel}
            disabled={disabled}
            size={size}
            fullWidth
          />
        ) : (
          <DropZone
            onDrop={handleDrop}
            isDisabled={disabled}
            className={classNames.dropZone}
            data-testid="dropzone"
            {...props}
          >
            <div className={classNames.dropZoneContent}>
              <p className={classNames.dropZoneLabel}>{dropZoneLabel}</p>
              <FileTrigger
                {...fileTriggerProps}
                label={buttonLabel}
                disabled={disabled}
              />
            </div>
          </DropZone>
        )}
        {files?.map((file, index) => (
          <FileField.Item
            key={index}
            size={size}
            onRemove={() => {
              const updated = (files ?? []).filter((_, i) => i !== index);
              setFiles(updated);
              syncHiddenInput(updated);
            }}
          >
            <div className={cn('[grid-area:label]', classNames.itemLabel)}>
              {file.name}
            </div>
            <div
              className={cn(
                '[grid-area:description]',
                classNames.itemDescription
              )}
            >
              {(file.size / 1024 / 1024).toFixed(2)} MB
            </div>
          </FileField.Item>
        ))}
      </div>
      {name && (
        <input
          type="file"
          ref={hiddenInputRef}
          name={name}
          hidden
          multiple={multiple}
        />
      )}
    </FieldBase>
  );
};

FileField.Item = FileFieldItem;
