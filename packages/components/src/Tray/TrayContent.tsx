import type { ReactNode } from 'react';
import { useEffect, useRef } from 'react';
import { useViewportSize } from '@react-aria/utils';
import { cn } from '@marigold/system';
import { TRAY_CONTENT_ATTR, useTrayContext } from './Context';

// Props
// ---------------
export interface TrayContentProps {
  /**
   * Children of the component.
   */
  children?: ReactNode;
  /**
   * Additional class names to apply to the content container
   * useful when component specific styles are needed
   */
  className?: string;
}

// Component
// ---------------
export const TrayContent = ({ children, className }: TrayContentProps) => {
  const { classNames } = useTrayContext();
  const ref = useRef<HTMLDivElement>(null);
  const { height } = useViewportSize();

  useEffect(() => {
    const node = ref.current;
    if (!node) {
      return;
    }

    node.style.minHeight = '';
    node.style.minHeight = `${node.offsetHeight}px`;
  }, [height]);

  return (
    <div
      ref={ref}
      {...{ [TRAY_CONTENT_ATTR]: true }}
      className={cn('[grid-area:content]', classNames.content, className)}
    >
      {children}
    </div>
  );
};
