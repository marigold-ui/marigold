import type { ReactNode } from 'react';
import { Label } from '../Label/Label';
import { AddonContext } from '../utils/AddonContext';
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
  return (
    <div className="in-field:mb-1.5 flex items-center gap-1">
      {labelElement}
      {/* Zero height, so the addon overhangs instead of growing the row. */}
      <span className="flex h-0 shrink-0 items-center gap-1">
        <AddonContext value={{ size: 'inline' }}>
          <span id={addonId} className="flex items-center gap-1 empty:hidden">
            {content}
          </span>
          {help}
        </AddonContext>
      </span>
    </div>
  );
};
