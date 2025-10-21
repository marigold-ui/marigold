import { ReactNode } from 'react';
import { CloseButton } from './../CloseButton/CloseButton';

export interface FileFieldItemProps {
  children?: ReactNode;
}

export const FileFieldItem = ({ children }: FileFieldItemProps) => {
  return (
    <div className="bg-background border-input flex items-center justify-between gap-2 rounded-lg border p-2 pe-3">
      {children}
      <CloseButton />
    </div>
  );
};
