import type { ReactNode } from 'react';
import RAC, { Button } from 'react-aria-components';
import { useClassNames } from '@marigold/system';

type RemovedProps = 'isDisabled' | 'className' | 'style';

export interface ActionButtonProps extends Omit<RAC.ButtonProps, RemovedProps> {
  /**
   * Children of the component (icon and/or text)
   */
  children?: ReactNode;
  onPress?: RAC.ButtonProps['onPress'];
}

export const ActionButton = ({ onPress, children }: ActionButtonProps) => {
  const classNames = useClassNames({
    component: 'Button',
    variant: 'ghost',
    size: 'default',
  });

  return (
    <Button onPress={onPress} className={classNames}>
      {children}
    </Button>
  );
};
