import { useEffect, useRef, useState } from 'react';
import type RAC from 'react-aria-components';
import { DropZone } from 'react-aria-components/DropZone';
import { useLocale } from 'react-aria-components/I18nProvider';
import { useLocalizedStringFormatter } from '@react-aria/i18n';
import { WidthProp, cn, useClassNames } from '@marigold/system';
import { FieldBase, type FieldBaseProps } from '../FieldBase/FieldBase';
import { intlMessages } from '../intl/messages';
import { FileFieldItem } from './FileFieldItem';
import { FileTrigger } from './FileTrigger';
import {
  fileKey,
  formatFileSize,
  isFileDropItem,
  normalizeAndLimitFiles,
} from './fileUtils';

type RemovedProps =
  'className' | 'style' | 'children' | 'isDisabled' | 'isRequired';

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

  /**
   * Called before a file is removed. Return `false`, or a promise resolving to
   * `false`, to keep the file, which is how a confirmation goes in front of the
   * remove button. If the handler throws, the file is kept and the error
   * propagates.
   */
  onBeforeRemove?: (file: File) => boolean | Promise<boolean>;
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
  onBeforeRemove,
  ...props
}: FileFieldProps) => {
  const [files, setFiles] = useState<File[] | null>(null);
  const hiddenInputRef = useRef<HTMLInputElement>(null);
  const stringFormatter = useLocalizedStringFormatter(intlMessages);
  const { locale } = useLocale();
  const dropZoneLabel = stringFormatter.format('dropZoneLabel');
  const buttonLabel = stringFormatter.format('uploadLabel');

  // Single place that mutates the selection. Takes an updater so it derives
  // from the latest state, not a stale closure - concurrent async drops can't
  // clobber each other. The hidden input is synced from `files` in an effect
  // below, so this updater stays pure.
  const updateFiles = (update: (prev: File[]) => File[]) => {
    setFiles(prev => update(prev ?? []));
  };

  // Mirror the current selection onto the hidden form input whenever it
  // changes, driven by the committed `files` state (single source of truth).
  useEffect(() => {
    if (!hiddenInputRef.current || !name || typeof DataTransfer === 'undefined')
      return;
    const dt = new DataTransfer();
    files?.forEach(f => dt.items.add(f));
    hiddenInputRef.current.files = dt.files;
  }, [files, name]);

  const mergeFiles = (incoming: File[]) => {
    // When multiple is set, add to the existing selection instead of
    // replacing it, so files picked in separate interactions accumulate.
    updateFiles(prev =>
      normalizeAndLimitFiles(multiple ? [...prev, ...incoming] : incoming, {
        accept,
        multiple,
      })
    );
  };

  const handleSelect: RAC.FileTriggerProps['onSelect'] = files => {
    mergeFiles(files ? Array.from(files) : []);
  };

  const handleRemove = async (file: File) => {
    const key = fileKey(file);
    if (!onBeforeRemove || (await onBeforeRemove(file))) {
      updateFiles(prev => prev.filter(f => fileKey(f) !== key));
    }
  };

  const handleDrop: RAC.DropZoneProps['onDrop'] = async e => {
    try {
      const filePromises = e.items
        .filter(isFileDropItem)
        .map(item => (item as RAC.FileDropItem).getFile());
      const raw = await Promise.all(filePromises);
      const files = raw.filter(Boolean) as File[];
      mergeFiles(files);
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
        {files?.map(file => (
          <FileField.Item
            key={fileKey(file)}
            size={size}
            removeLabel={stringFormatter.format('removeFileNamed', {
              name: file.name,
            })}
            onRemove={() => void handleRemove(file)}
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
              {formatFileSize(file.size, locale)}
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
