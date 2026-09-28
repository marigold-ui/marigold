import type { ReactNode } from 'react';
import { Label } from '../Label/Label';
import { AddonContext } from '../utils/AddonContext';
import { splitAddon } from '../utils/labelAddon';

export interface FieldLabelProps {
  label?: ReactNode;
  addon?: ReactNode;
  /**
   * Id of the element holding the addon's static content, which the field
   * references through `aria-describedby`.
   */
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

  // The addon sits beside the `<label>`, so it stays out of the field's name.
  // Its static content describes the field. A ContextualHelp is left out, or
  // its "Help" would be read as part of the description.
  return (
    <div className="in-field:mb-1.5 flex items-center gap-1">
      {labelElement}
      {/* Zero height, so the addon overhangs instead of growing the row. */}
      <span className="flex h-0 shrink-0 items-center gap-1">
        <AddonContext value={{ size: 'inline' }}>
          <span id={addonId} className="flex items-center gap-1">
            {content}
          </span>
          {help}
        </AddonContext>
      </span>
    </div>
  );
};
