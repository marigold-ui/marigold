import type { ReactNode } from 'react';
import { AddonContext } from './AddonContext';
import { splitAddon } from './labelAddon';

export interface LabelAdornmentProps {
  children?: ReactNode;
  /** Id of the static content, referenced as the control's description. */
  id?: string;
}

export const LabelAdornment = ({ children, id }: LabelAdornmentProps) => {
  const { content, help } = splitAddon(children);

  return (
    <span className="inline-flex h-lh shrink-0 items-center gap-1 align-top">
      <AddonContext value={{ size: 'inline' }}>
        <span id={id} className="inline-flex items-center gap-1 empty:hidden">
          {content}
        </span>
        {help}
      </AddonContext>
    </span>
  );
};
