import type { PropsWithChildren } from 'react';
import type { Scale, SpacingTokens } from '@marigold/system';
import { cn, createVar, cva } from '@marigold/system';

const classNames = {
  container: cva({
    base: ['relative bg-pink-100'],
    variants: {
      orientation: {
        horizontal: ['-mx-(--space) w-(--space) h-full'],
        vertical: ['-my-(--space) h-(--space) w-full'],
      },
    },
  }),
  icon: cva({
    base: ['border-pink-600', 'before:block before:bg-pink-600'],
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
  guide: cva({
    base: [
      'absolute flex items-center gap-1',
      'text-xs/1 font-semibold text-pink-600',
    ],
    variants: {
      orientation: {
        horizontal: ['flex-col', 'left-0 right-0 top-full mt-1.5'],
        vertical: ['top-1/2 -translate-y-1/2 left-full ml-1.5'],
      },
    },
  }),
};

export interface VisualSpacingProps {
  space: SpacingTokens;
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
  /**
   * We need a name here an the tokens (sadly) need to be used hardcoded
   * since for the demo we need to have a seperateed x/y value.
   */
  name: string;
  spaceX: Scale;
  spaceY: Scale;
  children: PropsWithChildren['children'];
}

export const VisualInset = ({
  className,
  name,
  spaceX,
  spaceY,
  children,
}: VisualInsetProps) => (
  <div className={cn('relative flex w-max items-center', className)}>
    <div className="p-1">
      <div className="bg-pink-100">
        <div className="flex">
          <VisualSpacing
            space={spaceX as SpacingTokens}
            orientation="horizontal"
          />
          {children}
          <VisualSpacing
            space={spaceX as SpacingTokens}
            orientation="horizontal"
          />
        </div>
        <div className="relative flex items-center">
          <VisualSpacing
            space={spaceY as SpacingTokens}
            orientation="vertical"
            hideGuide
          />
          <div className="text-xs/1 font-semibold text-pink-600">{name}</div>
        </div>
      </div>
    </div>
  </div>
);
