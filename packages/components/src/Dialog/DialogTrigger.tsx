import { DialogTrigger } from 'react-aria-components';
import type RAC from 'react-aria-components';

// Props
// ---------------

export interface DialogTriggerProps
  extends Omit<RAC.DialogTriggerProps, 'isOpen'> {
  open?: boolean;
}
// Component
// ---------------
const _DialogTrigger = ({ open, ...rest }: DialogTriggerProps) => {
  const props: RAC.DialogTriggerProps = {
    isOpen: open,
    ...rest,
  };

  return <DialogTrigger {...props}>{props.children}</DialogTrigger>;
};

export { _DialogTrigger as DialogTrigger };
