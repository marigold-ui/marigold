import type { ReactNode } from 'react';
import { forwardRef } from 'react';
import type RAC from 'react-aria-components';
import { DropZone } from 'react-aria-components';
import {
  FieldBase,
  type FieldBaseProps,
  FileTrigger,
} from '@marigold/components';
import type { WidthProp } from '@marigold/system';

// Props
// ---------------
// Keep prop names aligned with other Marigold field components
// and map them to RAC props internally.

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
   * Called when files are selected from the dialog.
   */
  onSelect?: RAC.FileTriggerProps['onSelect'];

  /**
   * Optional drag and drop support. If true, wraps the trigger in a DropZone.
   * For advanced control, also provide onDrop.
   */
  dropZone?: boolean;

  /**
   * Handler when files are dropped via drag and drop.
   */
  onDrop?: RAC.DropZoneProps['onDrop'];

  /**
   * Optional label shown inside the DropZone before the trigger.
   * Ignored if dropZone is false.
   */
  dropZoneLabel?: ReactNode;

  /**
   * Optional description shown inside the DropZone before the trigger.
   * Ignored if dropZone is false and no dropZoneLabel set.
   */
  dropZoneLabelDescription?: ReactNode;

  /**
   * Custom trigger element. If not provided, a default Button is rendered.
   */
  children?: ReactNode;
}

// Component
// ---------------
const _FileField = forwardRef<HTMLDivElement, FileFieldProps>(
  ({
    label,
    description,
    errorMessage,
    variant,
    size,
    width = 'full',
    disabled,
    acceptedFileTypes,
    allowsMultiple,
    onSelect,
    dropZone,
    onDrop,
    dropZoneLabel = 'Drop files here',
    dropZoneLabelDescription = 'JPG or GIF (max 2MB)',
    children,
    ...rest
  }) => {
    // Map our simplified props to RAC FileTrigger props
    const fileTriggerProps: RAC.FileTriggerProps = {
      acceptedFileTypes,
      allowsMultiple,
      onSelect,
    };

    return (
      <FieldBase
        as="div"
        label={label}
        description={description}
        errorMessage={errorMessage}
        variant={variant}
        size={size}
        width={width}
      >
        {dropZone ? (
          <DropZone onDrop={onDrop}>
            <div className="border-input has-[input:focus]:border-ring has-[input:focus]:ring-ring/50 data-[dragging=true]:bg-accent/50 relative flex min-h-52 flex-col items-center overflow-hidden rounded-xl border border-dashed p-4 transition-colors not-data-[files]:justify-center has-[input:focus]:ring-[3px]">
              {dropZoneLabel ? (
                <p className="mb-2 text-sm font-medium">{dropZoneLabel}</p>
              ) : null}
              {dropZoneLabelDescription && dropZoneLabel ? (
                <p className="text-muted-foreground text-xs">
                  {dropZoneLabelDescription}
                </p>
              ) : null}
              <FileTrigger {...fileTriggerProps} label="Upload" />
            </div>
            {children}
          </DropZone>
        ) : (
          <FileTrigger {...fileTriggerProps} label="Upload" />
        )}
      </FieldBase>
    );
  }
);

export { _FileField as FileField };
