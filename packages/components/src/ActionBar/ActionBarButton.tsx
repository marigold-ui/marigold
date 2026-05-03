import type { ReactNode } from 'react';
import RAC, { Button } from 'react-aria-components';
import { useClassNames } from '@marigold/system';

export interface ActionBarButtonProps {
  /**
   * Children of the component (icon and/or text)
   */
  children?: ReactNode;
  /**
   * Handler called when the button is pressed.
   */
  onPress?: RAC.ButtonProps['onPress'];
}

export const ActionBarButton = ({
  onPress,
  children,
}: ActionBarButtonProps) => {
  const classNames = useClassNames({ component: 'ActionBar' });

  return (
    <Button onPress={onPress} className={classNames.actionButton}>
      {children}
    </Button>
  );
};
