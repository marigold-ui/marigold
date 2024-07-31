import { ReactNode } from 'react';
import { AspectProp, aspect, cn, createVar } from '@marigold/system';

export interface AspectProps extends AspectProp {
  /**
   * The children of the component.
   */
  children?: ReactNode;

  /**
   * The maximum width of the image.
   * @default 100%
   */
  maxWidth?: string;
}

export const Aspect = ({
  ratio = 'square',
  maxWidth,
  children,
}: AspectProps) => {
  return (
    <div
      className={cn(
        'overflow-hidden',
        aspect[ratio],
        'max-w-[var(--maxWidth)]'
      )}
      style={createVar({ maxWidth })}
    >
      {children}
    </div>
  );
};
