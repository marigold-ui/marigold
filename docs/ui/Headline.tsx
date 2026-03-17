import type { ComponentPropsWithoutRef, ReactElement } from 'react';

type HeadlineLevel = 1 | 2 | 3 | 4 | 5 | 6;

export interface HeadlineProps extends Omit<
  ComponentPropsWithoutRef<'h1'>,
  'as' | 'level'
> {
  level?: HeadlineLevel;
}

export const Headline = ({
  level = 2,
  ...props
}: HeadlineProps): ReactElement => {
  const Tag = `h${level}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  return <Tag {...props} />;
};
