import { HtmlProps } from '@marigold/types';

export interface SplitProps extends Omit<HtmlProps<'div'>, 'className'> {}

export const Split = (props: SplitProps) => (
  <div {...props} role="separator" className="grow" />
);
