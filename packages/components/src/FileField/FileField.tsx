import { useId, useRef, useState } from 'react';
import type RAC from 'react-aria-components';
import { DropZone } from 'react-aria-components/DropZone';
import { FieldErrorContext } from 'react-aria-components/FieldError';
import { FormContext } from 'react-aria-components/Form';
import { TextContext } from 'react-aria-components/Text';
import { VisuallyHidden } from 'react-aria-components/VisuallyHidden';
import { Provider, useSlottedContext } from 'react-aria-components/slots';
import { useFormValidation } from '@react-aria/form';
import {
  useLocalizedStringFormatter,
  useNumberFormatter,
} from '@react-aria/i18n';
import { useFormReset, useLayoutEffect } from '@react-aria/utils';
import { useFormValidationState } from '@react-stately/form';
import type { ValidationError } from '@react-types/shared';
import { WidthProp, cn, useClassNames } from '@marigold/system';
import { FieldBase, type FieldBaseProps } from '../FieldBase/FieldBase';
import { intlMessages } from '../intl/messages';
import { FileFieldItem } from './FileFieldItem';
import { FileTrigger } from './FileTrigger';
import {
  FILE_SIZE_FORMAT_OPTIONS,
  type RejectedFile,
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
    Pick<FieldBaseProps<'input'>, 'label' | 'description' | 'errorMessage'> {
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
   * Associates the hidden input with a `<form>` element by id.
   */
  form?: string;

  /**
   * If `true`, the field is considered invalid and the `errorMessage` is shown.
   * @default false
   */
  error?: boolean;

  /**
   * If `true`, the field is required and an empty selection blocks submission.
   * @default false
   */
  required?: boolean;

  /**
   * The largest size a single file may have, in bytes. Files above it are
   * rejected with an error instead of being added.
   */
  maxSize?: number;

  /**
   * Custom client-side validation. Receives the selected files. Return a
   * string (or array of strings) to mark the field invalid, or
   * `true`/`null`/`undefined` for valid.
   */
  validate?: (files: File[]) => ValidationError | true | null;

  /**
   * Whether to use native HTML form validation or ARIA validation.
   * Inherits from an ancestor `<Form>` when omitted.
   */
  validationBehavior?: 'aria' | 'native';

  /**
   * Called before a file is removed. Return `false`, or a promise resolving to
   * `false`, to keep the file, which is how a confirmation goes in front of the
   * remove button. If the handler throws, the file is kept and the error
   * propagates.
   */
  onBeforeRemove?: (file: File) => boolean | Promise<boolean>;
}

const NO_FILES: File[] = [];

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
  description,
  errorMessage,
  error,
  required,
  form,
  maxSize,
  validate,
  validationBehavior: validationBehaviorProp,
  onBeforeRemove,
  ...props
}: FileFieldProps) => {
  const [files, setFiles] = useState<File[] | null>(null);
  const [rejected, setRejected] = useState<RejectedFile[]>([]);
  const descriptionId = useId();
  const errorId = useId();
  const hiddenInputRef = useRef<HTMLInputElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const stringFormatter = useLocalizedStringFormatter(intlMessages);
  const sizeFormatter = useNumberFormatter(FILE_SIZE_FORMAT_OPTIONS);
  const dropZoneLabel = stringFormatter.format('dropZoneLabel');
  const buttonLabel = stringFormatter.format('uploadLabel');

  const formCtx = useSlottedContext(FormContext);
  const validationBehavior =
    validationBehaviorProp ?? formCtx?.validationBehavior ?? 'native';

  // Mirror the current selection onto the hidden form input whenever it
  // changes, driven by the committed `files` state (single source of truth).
  useLayoutEffect(() => {
    if (!hiddenInputRef.current || typeof DataTransfer === 'undefined') return;
    const dt = new DataTransfer();
    files?.forEach(f => dt.items.add(f));
    hiddenInputRef.current.files = dt.files;
  }, [files]);

  const validationState = useFormValidationState<File[]>({
    name,
    value: files ?? NO_FILES,
    isInvalid: error,
    validate,
    validationBehavior,
  });

  useFormValidation(
    { validationBehavior, focus: () => triggerRef.current?.focus() },
    validationState,
    hiddenInputRef
  );

  useFormReset(hiddenInputRef, null, () => {
    setFiles(null);
    setRejected([]);
  });

  // Single place that mutates the selection. Takes an updater so it derives
  // from the latest state, not a stale closure - concurrent async drops can't
  // clobber each other. The hidden input is synced from `files` in an effect
  // below, so this updater stays pure.
  const updateFiles = (update: (prev: File[]) => File[]) => {
    setFiles(prev => update(prev ?? []));
    validationState.commitValidation();
  };

  const mergeFiles = (incoming: File[]) => {
    setRejected(normalizeAndLimitFiles(incoming, { accept, maxSize }).rejected);
    // When multiple is set, add to the existing selection instead of
    // replacing it, so files picked in separate interactions accumulate.
    updateFiles(
      prev =>
        normalizeAndLimitFiles(multiple ? [...prev, ...incoming] : incoming, {
          accept,
          multiple,
          maxSize,
        }).accepted
    );
  };

  const handleSelect: RAC.FileTriggerProps['onSelect'] = files => {
    mergeFiles(files ? Array.from(files) : []);
  };

  const handleRemove = async (file: File) => {
    const key = fileKey(file);
    if (!onBeforeRemove || (await onBeforeRemove(file))) {
      setRejected([]);
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

  const namesFor = (reason: RejectedFile['reason']) =>
    rejected
      .filter(r => r.reason === reason)
      .map(r => r.file.name)
      .join(', ');

  const rejectionMessages = [
    namesFor('type') &&
      stringFormatter.format('fileTypeRejected', { names: namesFor('type') }),
    namesFor('size') &&
      stringFormatter.format('fileTooLarge', {
        names: namesFor('size'),
        maxSize: formatFileSize(maxSize ?? 0, sizeFormatter),
      }),
  ].filter(Boolean) as string[];

  const displayValidation = rejectionMessages.length
    ? { ...validationState.displayValidation, isInvalid: true }
    : validationState.displayValidation;

  const describedBy = displayValidation.isInvalid
    ? errorId
    : description
      ? descriptionId
      : undefined;

  const classNames = useClassNames({
    component: 'FileField',
    size,
    variant,
  });

  const isSmall = size === 'small';

  return (
    <Provider
      values={[
        [FieldErrorContext, displayValidation],
        [FormContext, { ...formCtx, validationBehavior }],
        [
          TextContext,
          {
            slots: {
              description: { id: descriptionId },
              errorMessage: { id: errorId, role: 'alert' },
            },
          },
        ],
      ]}
    >
      {/* @ts-expect-error type intrinsic elements ("div") are not working correctly */}
      <FieldBase
        as="div"
        width={width}
        label={label}
        className={classNames.container}
        {...props}
        description={description}
        errorMessage={
          rejectionMessages.length ? rejectionMessages : errorMessage
        }
        isInvalid={displayValidation.isInvalid}
        isRequired={required}
        isDisabled={disabled}
      >
        <div className="flex w-(--field-width) max-w-full min-w-0 flex-col gap-2">
          {isSmall ? (
            <FileTrigger
              {...fileTriggerProps}
              ref={triggerRef}
              aria-describedby={describedBy}
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
              aria-describedby={describedBy}
            >
              <div className={classNames.dropZoneContent}>
                <p className={classNames.dropZoneLabel}>{dropZoneLabel}</p>
                <FileTrigger
                  {...fileTriggerProps}
                  ref={triggerRef}
                  aria-describedby={describedBy}
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
                {formatFileSize(file.size, sizeFormatter)}
              </div>
            </FileField.Item>
          ))}
        </div>
        <VisuallyHidden>
          <input
            type="file"
            ref={hiddenInputRef}
            name={name}
            form={form}
            tabIndex={-1}
            aria-hidden="true"
            disabled={disabled}
            required={validationBehavior === 'native' && required}
            multiple={multiple}
          />
        </VisuallyHidden>
      </FieldBase>
    </Provider>
  );
};

FileField.Item = FileFieldItem;
