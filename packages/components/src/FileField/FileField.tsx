import { useState } from 'react';
import RAC, { DropZone } from 'react-aria-components';
import { useLocalizedStringFormatter } from '@react-aria/i18n';
import { FieldBase, type FieldBaseProps } from '@marigold/components';
import { WidthProp, useClassNames } from '@marigold/system';
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
  extends Omit<RAC.DropZoneProps, RemovedProps>,
    Pick<FieldBaseProps<'input'>, 'label'> {
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
   * Accepted file types for selection.
   */
  accept?: RAC.FileTriggerProps['acceptedFileTypes'];

  /**
   * Whether multiple files can be selected.
   */
  multiple?: RAC.FileTriggerProps['allowsMultiple'];
}

// Component
// ---------------
export const FileField = ({
  disabled = false,
  accept = ['*'],
  multiple = false,
  width,
  label,
  ...props
}: FileFieldProps) => {
  const [files, setFiles] = useState<File[] | null>(null);
  const stringFormatter = useLocalizedStringFormatter(intlMessages);
  const dropZoneLabel = stringFormatter.format('dropZoneLabel');
  const buttonLabel = stringFormatter.format('uploadLabel');

  const handleSelect: RAC.FileTriggerProps['onSelect'] = files => {
    const list = files ? Array.from(files) : [];
    setFiles(normalizeAndLimitFiles(list, { accept, multiple }));
  };

  const handleDrop: RAC.DropZoneProps['onDrop'] = async e => {
    try {
      const filePromises = e.items
        .filter(isFileDropItem)
        .map(item => (item as any).getFile());
      const raw = await Promise.all(filePromises);
      const files = raw.filter(Boolean) as File[];

      setFiles(normalizeAndLimitFiles(files, { accept, multiple }));
    } catch {
      // swallow errors from reading dropped items
    }
  };

  const fileTriggerProps: RAC.FileTriggerProps = {
    acceptedFileTypes: accept,
    allowsMultiple: multiple,
    onSelect: handleSelect,
  };

  const classNames = useClassNames({
    component: 'FileField',
  });

  return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    /* @ts-expect-error */
    <FieldBase
      as={'div'}
      width={width}
      label={label}
      className={classNames.container}
      {...props}
    >
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
      {files?.map((file, index) => (
        <FileField.Item
          key={index}
          onRemove={() =>
            setFiles(prev => (prev ?? []).filter((_, i) => i !== index))
          }
        >
          <div className={classNames.item}>
            <p className={classNames.itemLabel}>{file.name}</p>
            <p className={classNames.itemDescription}>
              {(file.size / 1024 / 1024).toFixed(2)} MB
            </p>
          </div>
        </FileField.Item>
      ))}
    </FieldBase>
  );
};

FileField.Item = FileFieldItem;
