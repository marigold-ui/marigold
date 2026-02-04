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

  /**
   * @remarks `MaxWidthProp`
   */
  maxWidth?: MaxWidthProp['maxWidth'];
}

const _Form = ({ unstyled, maxWidth = 'full', ...props }: FormProps) => (
  <Form
    {...props}
    className={cn(twMaxWidth[maxWidth], unstyled && 'contents')}
  />
);

export { _Form as Form };
