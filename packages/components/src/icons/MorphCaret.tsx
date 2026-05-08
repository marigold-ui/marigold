import type { CSSProperties } from 'react';
import { cn } from '@marigold/system';
import { reducedMotion } from '../utils/reducedMotion';
import type { IconProps } from './Icons.types';

const CARET_OPEN = 'M 6 16 L 12 10 L 18 16';
const CARET_CLOSED = 'M 6 10 L 12 16 L 18 10';
const MORPH_BEZIER = 'cubic-bezier(0.4, 0, 0.2, 1)';

export interface MorphCaretProps extends IconProps {
  /** Whether the caret should render in its open (up-pointing) state. */
  expanded?: boolean;
}

export const MorphCaret = ({
  size = 24,
  className,
  expanded = false,
  ...props
}: MorphCaretProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    className={cn('shrink-0', className)}
    {...props}
  >
    <path
      style={
        {
          d: `path("${expanded ? CARET_OPEN : CARET_CLOSED}")`,
          transition: reducedMotion ? 'none' : `d 250ms ${MORPH_BEZIER}`,
        } as CSSProperties
      }
    />
  </svg>
);
