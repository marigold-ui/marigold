import { createVar, cva } from '@marigold/system';

const className = {
  container: cva(['relative bg-pink-100'], {
    variants: {
      orientation: {
        horizontal: [],
        vertical: ['-my-(--space) h-(--space) w-full'],
      },
    },
  }),
  indicator: cva(
    [
      'w-2 h-(--space)',
      'border-y-2 border-pink-600',
      'before:block before:left-full before:top-0 before:ml-[3px]',
      'before:w-0.5 before:bg-pink-600 before:h-[calc(var(--space)-2px)]',
    ],
    {
      variants: {
        orientation: {
          horizontal: [],
          vertical: [],
        },
      },
    }
  ),
  badge: cva(
    [
      'absolute flex items-center gap-1',
      'leading-0 text-xs font-semibold text-pink-600',
    ],
    {
      variants: {
        orientation: {
          horizontal: [],
          vertical: ['top-1/2 -translate-y-1/2 left-full ml-1.5'],
        },
      },
    }
  ),
};

export interface VisualSpacingProps {
  space: string;
  orientation: 'horizontal' | 'vertical';
}

export const VisualSpacing = ({ space, orientation }: VisualSpacingProps) => (
  <div
    className={className.container({ orientation })}
    style={createVar({ space: `var(--spacing-${space})` })}
  >
    <div className={className.badge({ orientation })}>
      <div className={className.indicator({ orientation })} />
      {space}
    </div>
  </div>
);
