import type { ReactNode } from 'react';

/**
 * how to pass variant?
 *
 * - via contenxt (like before, bad for RSC/performance)
 * - don't pass variant, use CSS (e.g. container data-variant="info",
 *   style with ":has" or tailwinds group, https://tailwindcss.com/docs/hover-focus-and-other-states#arbitrary-groups)
 *
 *
 */
export interface MessageTitleProps {
  children?: ReactNode;
}

export const MessageTitle = ({ children }: MessageTitleProps) => {
  return <div className="[grid-area:title]">{children}</div>;
};
