import type { ReactNode } from 'react';
import type RAC from 'react-aria-components';
import { Button } from '../Button/Button';

type RemovedProps = 'isDisabled' | 'className' | 'style';

export interface ActionButtonProps extends Omit<RAC.ButtonProps, RemovedProps> {
  /**
   * Children of the component (icon and/or text)
   */
  children?: ReactNode;
}

export const ActionButton = ({ children }: ActionButtonProps) => {
  return <Button variant="ghost">{children}</Button>;
};
