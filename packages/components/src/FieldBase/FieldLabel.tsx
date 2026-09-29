import type { ReactNode } from 'react';
import { cn } from '@marigold/system';
import { Label } from '../Label/Label';
import { ADDON_CONTENT, ADDON_HELP, AddonContext } from '../utils/AddonContext';
import { splitAddon } from '../utils/useLabelAddon';

export interface FieldLabelProps {
  label?: ReactNode;
  addon?: ReactNode;
  /** Id of the addon's static content, referenced by `aria-describedby`. */
  addonId?: string;
  variant?: string;
  size?: string;
}

export const FieldLabel = ({
  label,
  addon,
  addonId,
  variant,
  size,
}: FieldLabelProps) => {
  const labelElement = label ? (
    <Label variant={variant} size={size}>
      {label}
    </Label>
  ) : null;

  if (!addon) return labelElement;

  const { content, help } = splitAddon(addon);

  // Beside the `<label>` to stay out of the name. Help sits outside the described span.
  // Inline, so the addon follows the last word. `leading-[0]` stops the strut growing the row.
  return (
    <div
      className={cn(
        'in-field:mb-1.5',
        labelElement
          ? 'leading-[0] [&>label]:inline [&>label]:after:ml-0!'
          : 'flex'
      )}
    >
      {labelElement}
      {/* Zero height beside a label, so the addon overhangs instead of growing the row. */}
      <span
        className={cn(
          'items-center gap-1 whitespace-nowrap',
          labelElement ? 'ms-1 inline-flex h-0 align-middle' : 'flex'
        )}
      >
        <span id={addonId} className="flex items-center gap-1 empty:hidden">
          <AddonContext value={ADDON_CONTENT}>{content}</AddonContext>
        </span>
        <AddonContext value={ADDON_HELP}>{help}</AddonContext>
      </span>
    </div>
  );
};
