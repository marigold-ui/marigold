import { HtmlProps } from '@marigold/types';

export interface SplitProps extends HtmlProps<'div'> {}

export const Split = (props: SplitProps) => (
  <div {...props} role="separator" className="grow" />
);
