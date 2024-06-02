import type { ReactNode } from 'react';

export interface MessageContentProps {
  children?: ReactNode;
}

export const MessageContent = ({ children }: MessageContentProps) => {
  return <div className="[grid-area:content]">{children}</div>;
};
