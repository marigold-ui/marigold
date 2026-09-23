import type { ReactNode } from 'react';

interface AiReviewProbeProps {
  children: ReactNode;
  className?: string;
  isDisabled?: boolean;
  showFooter?: boolean;
}

export const AiReviewProbe = ({
  children,
  className,
  isDisabled,
  showFooter,
}: AiReviewProbeProps) => {
  return (
    <div
      className={`rounded-md border border-gray-300 bg-white p-4 ${className ?? ''}`}
      aria-disabled={isDisabled}
    >
      {children}
      {showFooter ? (
        <div className="mt-2 text-sm text-gray-500">Footer</div>
      ) : null}
    </div>
  );
};
