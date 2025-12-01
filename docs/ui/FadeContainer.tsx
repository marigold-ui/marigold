import type { PropsWithChildren } from 'react';

const variants = {
  left: 'h-full mask-[linear-gradient(to_right,transparent,black_72px)]',
  right: 'h-full mask-[linear-gradient(to_left,transparent,black_72px)]',
  top: 'w-full mask-[linear-gradient(to_bottom,transparent,black_72px)]',
  bottom: 'w-full mask-[linear-gradient(to_top,transparent,black_72px)]',
  vertical:
    'w-full mask-[linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)]',
  horizontal:
    'h-full mask-[linear-gradient(to_right,transparent,black_25%,black_75%,transparent)]',
};

export interface FadeContainerProps {
  fade: keyof typeof variants;
}

export const FadeContainer = ({
  children,
  fade,
}: PropsWithChildren<FadeContainerProps>) => (
  <div className={variants[fade]}>{children}</div>
);
