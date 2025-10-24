import { ReactNode } from 'react';
import { CloseButton } from './../CloseButton/CloseButton';

export interface FileFieldItemProps {
  children?: ReactNode;
  /**
   * Called when the close button is pressed to remove this item.
   */
  onRemove?: () => void;
}

export const FileFieldItem = ({ children, onRemove }: FileFieldItemProps) => {
  return (
    <div className="bg-background border-input flex items-center justify-between gap-2 rounded-lg border p-2 pe-3">
      {children}
      <CloseButton aria-label="Remove file" onPress={onRemove} />
    </div>
  );
};
