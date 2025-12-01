import type { PropsWithChildren } from 'react';
import { cn } from '../../packages/system/src/utils/className.utils';

const variants = {
  left: 'mask-[linear-gradient(to_right,transparent,black_72px)]',
  right: 'mask-[linear-gradient(to_left,transparent,black_72px)]',
  top: 'mask-[linear-gradient(to_bottom,transparent,black_72px)]',
  bottom: 'mask-[linear-gradient(to_top,transparent,black_72px)]',
  vertical:
    'mask-[linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)]',
  horizontal:
    'mask-[linear-gradient(to_right,transparent,black_25%,black_75%,transparent)]',
};

export interface FadeContainerProps {
  fade: keyof typeof variants;
}

export const FadeContainer = ({
  children,
  fade,
}: PropsWithChildren<FadeContainerProps>) => (
  <div className={cn('size-full', variants[fade])}>{children}</div>
);
