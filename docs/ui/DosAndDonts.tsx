'use client';

import { CircleCheck, CircleX } from 'lucide-react';
import {
  type CSSProperties,
  Children,
  type PropsWithChildren,
  type ReactNode,
  isValidElement,
} from 'react';
import { Tiles } from '@marigold/components';

type Variant = 'do' | 'dont';

const VARIANT_COLOR: Record<Variant, string> = {
  do: 'var(--color-fd-success)',
  dont: 'var(--color-fd-error)',
};

const VARIANT_LABEL: Record<Variant, string> = {
  do: 'Do',
  dont: "Don't",
};

const FIGURE_SLOT = Symbol('guideline-figure');
const DESCRIPTION_SLOT = Symbol('guideline-description');

type SlotTag = typeof FIGURE_SLOT | typeof DESCRIPTION_SLOT;
type GuidelineComponent = React.FC<PropsWithChildren> & { __slot: SlotTag };

const makeSlot = (slot: SlotTag, className?: string): GuidelineComponent => {
  const Component: GuidelineComponent = (({ children }) => (
    <div className={className}>{children}</div>
  )) as GuidelineComponent;
  Component.__slot = slot;
  return Component;
};

export const DoFigure = makeSlot(
  FIGURE_SLOT,
  '[&_img]:mb-2 [&_img]:block [&_img]:w-full'
);
export const DoDescription = makeSlot(
  DESCRIPTION_SLOT,
  '[&_ul]:my-0 [&_ul]:list-disc [&_ul]:ps-5 [&_ol]:my-0 [&_ol]:list-decimal [&_ol]:ps-5 [&_li]:my-0.5'
);
export const DontFigure = DoFigure;
export const DontDescription = DoDescription;

const splitChildren = (children: ReactNode) => {
  const figure: ReactNode[] = [];
  const description: ReactNode[] = [];
  Children.forEach(children, child => {
    if (
      isValidElement(child) &&
      (child.type as Partial<GuidelineComponent>)?.__slot === FIGURE_SLOT
    ) {
      figure.push(child);
    } else {
      description.push(child);
    }
  });
  return { figure, description };
};

const Icon = ({ variant }: { variant: Variant }) => {
  const IconComponent = variant === 'do' ? CircleCheck : CircleX;
  return (
    <IconComponent className="text-fd-card -ms-0.5 size-6 shrink-0 fill-(--callout-color)" />
  );
};

const Guideline = ({
  variant,
  title,
  children,
}: PropsWithChildren<{ variant: Variant; title?: ReactNode }>) => {
  const { figure, description } = splitChildren(children);
  const label = title ?? VARIANT_LABEL[variant];

  return (
    <div
      data-type={variant}
      style={
        {
          '--callout-color': VARIANT_COLOR[variant],
          background:
            'color-mix(in oklab, var(--callout-color) 6%, transparent)',
          borderColor:
            'color-mix(in oklab, var(--callout-color) 30%, transparent)',
        } as CSSProperties
      }
      className="not-prose flex flex-col gap-3 overflow-hidden rounded-xl border p-3"
    >
      {figure.length > 0 && (
        <div className="bg-fd-card overflow-hidden rounded-md border">
          {figure}
        </div>
      )}
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center gap-2">
          <Icon variant={variant} />
          <p
            className="my-0! text-sm leading-none font-semibold"
            style={{ color: 'var(--callout-color)' }}
          >
            {label}
          </p>
        </div>
        {description.length > 0 && (
          <div className="text-fd-card-foreground text-sm text-pretty">
            {description}
          </div>
        )}
      </div>
    </div>
  );
};

export const Do = ({
  children,
  title,
}: PropsWithChildren<{ title?: ReactNode }>) => (
  <Guideline variant="do" title={title}>
    {children}
  </Guideline>
);

export const Dont = ({
  children,
  title,
}: PropsWithChildren<{ title?: ReactNode }>) => (
  <Guideline variant="dont" title={title}>
    {children}
  </Guideline>
);

export const GuidelineTiles = ({ children }: PropsWithChildren) => (
  <div className="my-5">
    <Tiles space={5} stretch tilesWidth="300px">
      {children}
    </Tiles>
  </div>
);
