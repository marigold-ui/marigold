import type { Ref } from 'react';
import { Form } from 'react-aria-components';
import type RAC from 'react-aria-components';
import { cn, maxWidth as twMaxWidth } from '@marigold/system';
import type { MaxWidthProp } from '@marigold/system';

export interface FormProps extends Omit<RAC.FormProps, 'className' | 'style'> {
  /**
   * Removes the form's visual container so that it does not impact the layout,
   * letting child elements render naturally.
   */
  unstyled?: boolean;

  maxWidth?: MaxWidthProp['maxWidth'];
  ref?: Ref<HTMLFormElement>;
}

const _Form = ({ unstyled, maxWidth = 'full', ref, ...props }: FormProps) => (
  <Form
    {...props}
    ref={ref}
    className={cn(twMaxWidth[maxWidth], unstyled && 'contents')}
  />
);

export { _Form as Form };
