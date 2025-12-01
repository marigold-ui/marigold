import { createVar, cva } from '@marigold/system';

const className = {
  container: cva(['relative bg-pink-100'], {
    variants: {
      orientation: {
        horizontal: ['-mx-(--space) w-(--space) h-full'],
        vertical: ['-my-(--space) h-(--space) w-full'],
      },
    },
  }),
  guide: cva(['border-pink-600', 'before:block before:bg-pink-600'], {
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
  badge: cva(
    [
      'absolute flex items-center gap-1',
      'leading-0 text-xs font-semibold text-pink-600',
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
}

export const VisualSpacing = ({ space, orientation }: VisualSpacingProps) => (
  <div
    className={className.container({ orientation })}
    style={createVar({ space: `var(--spacing-${space})` })}
  >
    <div className={className.badge({ orientation })}>
      <div className={className.guide({ orientation })} />
      {space}
    </div>
  </div>
);
