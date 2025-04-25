import { Form } from 'react-aria-components';
import type RAC from 'react-aria-components';
import { cn } from '@marigold/system';

export interface FormProps extends Omit<RAC.FormProps, 'className' | 'style'> {
  /**
   * Removes the form's visual container so that it does not impact the layout,
   * letting child elements render naturally.
   */
  contents?: boolean;
}

const _Form = ({ contents = false, ...props }: FormProps) => (
  <Form className={cn(contents && 'contents')} {...props} />
);

export { _Form as Form };
