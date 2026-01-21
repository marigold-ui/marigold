import type { ReactNode } from 'react';
import type RAC from 'react-aria-components';
import { Button } from '../Button/Button';

type RemovedProps = 'isDisabled' | 'className' | 'style';

export interface ActionButtonProps extends Omit<RAC.ButtonProps, RemovedProps> {
  /**
   * Children of the component (icon and/or text)
   */
  children?: ReactNode;
  onPress?: RAC.ButtonProps['onPress'];
}

export const ActionButton = ({ onPress, children }: ActionButtonProps) => {
  return (
    <Button onPress={onPress} variant="ghost">
      {children}
    </Button>
  );
};
