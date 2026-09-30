import type { ReactNode } from 'react';
import { ADDON_CONTENT, ADDON_HELP, AddonContext } from './AddonContext';
import { splitAddon } from './useLabelAddon';

export interface LabelAddonProps {
  children?: ReactNode;
  /** Id of the static content, referenced as the control's description. */
  id?: string;
}

export const LabelAddon = ({ children, id }: LabelAddonProps) => {
  const { content, help } = splitAddon(children);

  return (
    <span className="inline-flex h-lh shrink-0 items-center gap-1 align-top">
      <span id={id} className="inline-flex items-center gap-1 empty:hidden">
        <AddonContext value={ADDON_CONTENT}>{content}</AddonContext>
      </span>
      <AddonContext value={ADDON_HELP}>{help}</AddonContext>
    </span>
  );
};
