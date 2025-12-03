import type { PropsWithChildren } from 'react';
import { cn, createVar, cva } from '@marigold/system';

const classNames = {
  container: cva(['relative bg-pink-100'], {
    variants: {
      orientation: {
        horizontal: ['-mx-(--space) w-(--space) h-full'],
        vertical: ['-my-(--space) h-(--space) w-full'],
      },
    },
  }),
  icon: cva(['border-pink-600', 'before:block before:bg-pink-600'], {
    variants: {
      orientation: {
        horizontal: [
          'h-2 w-(--space)',
          'border-x-2',
          'before:top-full before:left-0 before:mt-[3px]',
          'before:h-0.5 before:w-[calc(var(--space)-2px)]',
        ],
        vertical: [
          'w-2 h-(--space)',
          'border-y-2',
          'before:left-full before:top-0 before:ml-[3px]',
          'before:w-0.5 before:h-[calc(var(--space)-2px)]',
        ],
      },
    },
  }),
  guide: cva(
    [
      'absolute flex items-center gap-1',
      'text-xs/1 font-semibold text-pink-600',
    ],
    {
      variants: {
        orientation: {
          horizontal: ['flex-col', 'left-0 right-0 top-full mt-1.5'],
          vertical: ['top-1/2 -translate-y-1/2 left-full ml-1.5'],
        },
      },
    }
  ),
};

export interface VisualSpacingProps {
  space: string;
  orientation: 'horizontal' | 'vertical';
  hideGuide?: boolean;
}

export const VisualSpacing = ({
  space,
  orientation,
  hideGuide,
}: VisualSpacingProps) => (
  <div
    className={classNames.container({ orientation })}
    style={createVar({ space: `var(--spacing-${space})` })}
  >
    {!hideGuide ? (
      <div className={classNames.guide({ orientation })}>
        <div className={classNames.icon({ orientation })} />
        {space}
      </div>
    ) : null}
  </div>
);

export interface VisualInsetProps {
  className?: string;
  spaceX: string;
  spaceY: string;
}

export const VisualInset = ({
  children,
  className,
  spaceX,
  spaceY,
}: PropsWithChildren<VisualInsetProps>) => (
  <div
    className="size-full"
    style={createVar({
      'space-y': `var(--spacing-${spaceY})`,
      'space-x': `var(--spacing-${spaceX})`,
    })}
  >
    <div
      className={cn(
        'size-full overflow-hidden bg-pink-100 px-(--space-x) py-(--space-y)',
        className
      )}
    >
      <div className="text-secondary-700 grid size-full place-items-center bg-white text-xs font-medium">
        {children}
      </div>
    </div>
    {/* left guide */}
    <div
      className={classNames.guide({
        orientation: 'vertical',
        className: [
          'right-full left-auto mr-1.5 ml-0',
          'top-auto bottom-0 translate-0',
          'flex-row-reverse',
        ],
      })}
    >
      <div
        className={classNames.icon({
          orientation: 'vertical',
          className: 'h-(--space-y) before:h-[calc(var(--space-y)-2px)]',
        })}
      />
      {spaceY}
    </div>
    {/* bottom guide */}
    <div
      className={classNames.guide({
        orientation: 'horizontal',
        className: 'items-start',
      })}
    >
      <div
        className={classNames.icon({
          orientation: 'horizontal',
          className: 'w-(--space-x) before:w-[calc(var(--space-x)-2px)]',
        })}
      />
      {spaceX}
    </div>
  </div>
);
