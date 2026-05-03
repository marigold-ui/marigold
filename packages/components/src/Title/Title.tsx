import type { ReactNode, Ref } from 'react';
import {
  Heading,
  HeadingContext,
  useContextProps,
} from 'react-aria-components';
import { cn, ensureCssVar, useClassNames } from '@marigold/system';
import type { AriaLabelingProps } from '@marigold/types';

export interface TitleProps extends AriaLabelingProps {
  /**
   * The heading level (h1-h6). The hosting container typically supplies
   * this via slot context.
   * @default 2
   */
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  /**
   * A slot name. Defaults to `'title'` so the component participates in a
   * container's slot context out of the box. Pass `null` to opt out.
   * @default 'title'
   */
  slot?: string | null;
  /**
   * The visual style. Reuses Headline's typography scale so a Title
   * shares the design system's heading vocabulary.
   * @default 'level-3'
   */
  size?:
    | 'level-1'
    | 'level-2'
    | 'level-3'
    | 'level-4'
    | 'level-5'
    | 'level-6'
    | (string & {});
  /**
   * The variant. Forwarded to the Headline theme entry.
   */
  variant?: string;
  /**
   * Set the text color.
   */
  color?: string;
  /**
   * The element id.
   */
  id?: string;
  children?: ReactNode;
  ref?: Ref<HTMLHeadingElement>;
}

const _Title = ({ ref: refProp, ...inputProps }: TitleProps) => {
  const [merged, ref] = useContextProps(
    { slot: 'title', ...inputProps } as TitleProps & { className?: string },
    refProp,
    HeadingContext
  );

  const {
    level = 2,
    slot,
    size = 'level-3',
    variant,
    color,
    children,
    className: contextClassName,
    ...rest
  } = merged;

  const classNames = useClassNames({ component: 'Headline', variant, size });

  return (
    <Heading
      level={level}
      ref={ref}
      slot={slot ?? undefined}
      {...rest}
      className={cn(contextClassName, classNames)}
      style={{ color: color && ensureCssVar(color, 'color') }}
    >
      {children}
    </Heading>
  );
};

export { _Title as Title };
